import React, { useEffect, useRef, useState } from 'react';
import Win, { Prompt } from '../Win';
import Typewriter from '../Typewriter';
import { sfx } from '../sound';
import { revealOnSmallScreens } from '../viewport';
import useShelfKeys from '../useShelfKeys';
import experience from '../../components/data/experience.json';

const COLORS = ['orange', 'blue', 'cyan', 'red', 'green', 'purple', 'yellow'];
const BUSY = ['inserting', 'reading', 'ejecting'];

function slug(item) {
    return `${item.company.toLowerCase().replace(/\s+/g, '')}_${item.startDate.split(' ').pop()}`;
}

function shortYears(item) {
    const start = item.startDate.split(' ').pop();
    const end = item.endDate === 'Present' ? 'now' : item.endDate.split(' ').pop();
    return `${start}–${end}`;
}

/** A 3.5" floppy disk drawn with CSS. `decorative` renders a non-interactive copy. */
export function Floppy({ item, color, onClick, className = '', decorative = false }) {
    const Tag = decorative ? 'div' : 'button';
    return (
        <Tag
            className={`Floppy ${className}`}
            style={{ '--c': `var(--${color})` }}
            onClick={onClick}
            type={decorative ? undefined : 'button'}
            title={decorative ? undefined : `Insert ${item.company} disk`}
            aria-hidden={decorative || undefined}
        >
            <span className="Floppy_Shutter" />
            <span className="Floppy_Label">
                <span className="Floppy_Company">{item.company}</span>
                <span className="Floppy_Dates">{shortYears(item)}</span>
                <span className="Floppy_Size">1.44 MB</span>
            </span>
            <span className="Floppy_Notch" />
        </Tag>
    );
}

function DriveOutput({ item, phase }) {
    if (!item || phase === 'idle') {
        return (
            <>
                <div className="Term_Line"><Prompt /> ls /mnt/fd0</div>
                <div className="c-muted">ls: no disk in drive A: — pick one from the shelf above</div>
                <div className="Term_Line"><Prompt /> <span className="Cursor" /></div>
            </>
        );
    }
    const mount = (
        <div className="Term_Line"><Prompt /> mount /dev/fd0 /mnt/{slug(item)}</div>
    );
    if (phase === 'inserting') {
        return (
            <>
                {mount}
                <div className="c-muted">disk detected, spinning up<span className="Dots" /></div>
            </>
        );
    }
    if (phase === 'reading') {
        return (
            <>
                {mount}
                <div className="c-muted">reading 80 tracks × 18 sectors<span className="Dots" /></div>
                <div className="Bar"><div className="Bar_Fill" /></div>
            </>
        );
    }
    if (phase === 'ejecting') {
        return (
            <>
                <div className="Term_Line"><Prompt /> umount /mnt/{slug(item)}</div>
                <div className="c-muted">disk ejected</div>
            </>
        );
    }
    return (
        <>
            {mount}
            <div className="Term_Line"><Prompt /> cat /mnt/{slug(item)}/README.md</div>
            <h3 className="Term_H"><span className="c-yellow"># </span>{item.title}</h3>
            <div className="Term_Meta">
                <span className="c-cyan">@{item.company}</span> · {item.startDate} → {item.endDate}
            </div>
            <p className="Term_P"><Typewriter text={item.description} speed={6} chunk={3} /></p>
            {item.links && item.links.length > 0 && (
                <div className="Term_Row">
                    <span className="Term_RowKey">LINKS</span>
                    {item.links.map((link) => (
                        <a key={link.url} className="Tag Tag--link" href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.text} ↗
                        </a>
                    ))}
                </div>
            )}
            {item.skills && item.skills.length > 0 && (
                <div className="Term_Row">
                    <span className="Term_RowKey">SKILLS</span>
                    {item.skills.map((skill) => (
                        <span key={skill} className="Tag">{skill}</span>
                    ))}
                </div>
            )}
            <a className="Btn Btn--primary" href={item.url} target="_blank" rel="noopener noreferrer">
                OPEN {item.company.toUpperCase()} ↗
            </a>
            <div className="Term_Line"><Prompt /> <span className="Cursor" /></div>
        </>
    );
}

export default function ExperienceWs() {
    const [selected, setSelected] = useState(null);
    const [phase, setPhase] = useState('idle'); // idle | inserting | reading | ready | ejecting
    const [cursor, setCursor] = useState(0);
    const deckRef = useRef(null);

    useEffect(() => {
        let t;
        if (phase === 'inserting') {
            t = setTimeout(() => { sfx.seek(); setPhase('reading'); }, 750);
        } else if (phase === 'reading') {
            t = setTimeout(() => { sfx.ready(); setPhase('ready'); }, 1300);
        } else if (phase === 'ejecting') {
            t = setTimeout(() => { setPhase('idle'); setSelected(null); }, 650);
        }
        return () => clearTimeout(t);
    }, [phase]);

    const insert = (i) => {
        if (BUSY.includes(phase)) return;
        if (i === selected && phase === 'ready') return;
        sfx.insert();
        setSelected(i);
        setPhase('inserting');
        revealOnSmallScreens(deckRef.current);
    };

    const eject = () => {
        if (phase !== 'ready') return;
        sfx.eject();
        setPhase('ejecting');
    };

    // Enter toggles: inserts the highlighted disk, or ejects it if it's the one in the drive.
    const activate = (i) => {
        if (i === selected && phase === 'ready') eject();
        else insert(i);
    };

    useShelfKeys({ count: experience.length, cursor, setCursor, onEnter: activate });

    const item = selected != null ? experience[selected] : null;
    const color = selected != null ? COLORS[selected % COLORS.length] : 'blue';
    const loaded = phase === 'reading' || phase === 'ready';

    return (
        <div className="Ws">
            <p className="Ws_Intro">
                Work history is archived on floppies. Pick one with the mouse or ← →, then click or press ENTER to insert it into drive A:.
            </p>

            <div className="Shelf">
                {experience.map((e, i) => (
                    <div
                        key={e.id}
                        className={`Slot ${i === selected ? 'Slot--empty' : ''} ${i === cursor ? 'Slot--cursor' : ''}`}
                        data-empty="IN DRIVE"
                        onMouseEnter={() => setCursor(i)}
                    >
                        {i === cursor && <span className="Slot_Ptr" aria-hidden="true">▼</span>}
                        <Floppy item={e} color={COLORS[i % COLORS.length]} onClick={() => insert(i)} />
                    </div>
                ))}
            </div>

            <div className="Deck" ref={deckRef}>
                <div className="DriveUnit">
                    <div className="Drive_Mouth">
                        {item && <Floppy item={item} color={color} className={`Floppy--${phase}`} decorative />}
                    </div>
                    <div className="Drive" style={{ '--c': `var(--${color})` }}>
                        {loaded && <span className="Drive_Edge" />}
                        <span
                            className={`Led ${phase === 'reading' ? 'Led--busy' : ''} ${phase === 'ready' ? 'Led--on' : ''}`}
                        />
                        <span className="Drive_Label">FLOPPY DRIVE A:</span>
                        <button type="button" className="Btn" onClick={eject} disabled={phase !== 'ready'}>
                            EJECT
                        </button>
                    </div>
                </div>

                <Win title={item ? `/mnt/${slug(item)}` : '/dev/fd0'} accent={color}>
                    <div className="Term">
                        <DriveOutput item={item} phase={phase} />
                    </div>
                </Win>
            </div>
        </div>
    );
}
