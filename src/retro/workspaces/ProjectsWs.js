import React, { useEffect, useRef, useState } from 'react';
import Win, { Prompt } from '../Win';
import Typewriter from '../Typewriter';
import PixelImage from '../PixelImage';
import { sfx } from '../sound';
import { revealOnSmallScreens } from '../viewport';
import useShelfKeys from '../useShelfKeys';
import projects from '../../components/data/projects.json';
import tfgImage from '../../components/images/tradertoolbar.png';
import nuriarevueltaImage from '../../components/images/nuriarevuelta.png';
import hhmImage from '../../components/images/hhm.png';
import tsotwImage from '../../components/images/tsotwImage.png';
import gameOfLife from '../../components/images/gameoflife.png';

const IMAGES = [hhmImage, tfgImage, tsotwImage, nuriarevueltaImage, gameOfLife];
const COLORS = ['green', 'purple', 'cyan', 'red', 'yellow', 'orange', 'blue'];
const BUSY = ['inserting', 'booting', 'ejecting'];

/** A handheld-console cartridge drawn with CSS. */
export function Cartridge({ item, color, onClick, className = '', decorative = false }) {
    const Tag = decorative ? 'div' : 'button';
    return (
        <Tag
            className={`Cart ${className}`}
            style={{ '--c': `var(--${color})` }}
            onClick={onClick}
            type={decorative ? undefined : 'button'}
            title={decorative ? undefined : `Insert ${item.title}`}
            aria-hidden={decorative || undefined}
        >
            <span className="Cart_Grip" />
            <span className="Cart_Label">
                <img className="Cart_Img" src={IMAGES[item.id]} alt="" />
                <span className="Cart_Title">{item.title}</span>
            </span>
            <span className="Cart_Pins" />
        </Tag>
    );
}

function Screen({ item, phase }) {
    if (phase === 'idle' || !item) {
        return <div className="Console_Off">NO CARTRIDGE<br />INSERT TO PLAY</div>;
    }
    if (phase === 'booting') {
        return <div className="Console_Boot">LUISTENDO<sup>®</sup></div>;
    }
    if (phase === 'ready') {
        return <PixelImage src={IMAGES[item.id]} alt={`${item.title} screenshot`} />;
    }
    return null;
}

function Info({ item, phase }) {
    if (!item || phase === 'idle') {
        return (
            <>
                <div className="Term_Line"><Prompt /> ls /dev/cart0</div>
                <div className="c-muted">no cartridge — highlight one with the arrow keys and press ENTER, or just click it</div>
                <div className="Term_Line"><Prompt /> <span className="Cursor" /></div>
            </>
        );
    }
    if (phase !== 'ready') {
        return (
            <>
                <div className="Term_Line"><Prompt /> load cart://{item.title}</div>
                <div className="c-muted">{phase === 'ejecting' ? 'cartridge ejected' : 'powering on'}<span className="Dots" /></div>
            </>
        );
    }
    return (
        <>
            <div className="Term_Line"><Prompt /> load cart://{item.title}</div>
            <h3 className="Term_H"><span className="c-yellow"># </span>{item.title}</h3>
            <p className="Term_P"><Typewriter text={item.description} speed={8} chunk={2} /></p>
            {item.skills && item.skills.length > 0 && (
                <div className="Term_Row">
                    <span className="Term_RowKey">STACK</span>
                    {item.skills.map((skill) => (
                        <span key={skill} className="Tag">{skill}</span>
                    ))}
                </div>
            )}
            <a className="Btn Btn--primary Pulse" href={item.url} target="_blank" rel="noopener noreferrer">
                ▶ PRESS START
            </a>
            <div className="c-muted Term_Small">ARROWS = highlight · ENTER = insert</div>
        </>
    );
}

export default function ProjectsWs() {
    const [selected, setSelected] = useState(null);
    const [phase, setPhase] = useState('idle'); // idle | inserting | booting | ready | ejecting
    const [cursor, setCursor] = useState(0);
    const deckRef = useRef(null);

    useEffect(() => {
        let t;
        if (phase === 'inserting') {
            t = setTimeout(() => setPhase('booting'), 700);
        } else if (phase === 'booting') {
            t = setTimeout(() => { sfx.ready(); setPhase('ready'); }, 1300);
        } else if (phase === 'ejecting') {
            t = setTimeout(() => { setPhase('idle'); setSelected(null); }, 600);
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

    // D-pad / arrow keys only move the highlight; ENTER or START inserts.
    const moveCursor = (dir) => {
        sfx.blip();
        setCursor((c) => (c + dir + projects.length) % projects.length);
    };

    // Enter toggles: inserts the highlighted cartridge, or ejects it if it's the one loaded.
    const activate = (i) => {
        if (i === selected && phase === 'ready') eject();
        else insert(i);
    };

    useShelfKeys({ count: projects.length, cursor, setCursor, onEnter: activate });

    const item = selected != null ? projects[selected] : null;
    const ready = phase === 'ready';
    const color = selected != null ? COLORS[selected % COLORS.length] : 'green';

    return (
        <div className="Ws">
            <p className="Ws_Intro">
                Pick one with the mouse or the arrow keys, then click or press ENTER to slot it in.
            </p>

            <div className="Shelf">
                {projects.map((p, i) => (
                    <div
                        key={p.id}
                        className={`Slot ${i === selected ? 'Slot--empty' : ''} ${i === cursor ? 'Slot--cursor' : ''}`}
                        data-empty="IN CONSOLE"
                        onMouseEnter={() => setCursor(i)}
                    >
                        {i === cursor && <span className="Slot_Ptr" aria-hidden="true">▼</span>}
                        <Cartridge item={p} color={COLORS[i % COLORS.length]} onClick={() => insert(i)} />
                    </div>
                ))}
            </div>

            <div className="Deck" ref={deckRef}>
                <div className="ConsoleUnit">
                    <div className="Console_Mouth">
                        {item && <Cartridge item={item} color={color} className={`Cart--${phase}`} decorative />}
                    </div>
                    <div className="Console" style={{ '--c': `var(--${color})` }}>
                        <div className="Console_Bezel">
                            <div className="Console_Screen">
                                <Screen item={item} phase={phase} />
                            </div>
                            <div className="Console_Power">
                                <span className={`Led ${phase !== 'idle' ? 'Led--on' : ''}`} /> POWER
                            </div>
                        </div>
                        <div className="Console_Controls">
                            <div className="Dpad" aria-label="D-pad">
                                <span className="Dpad_Btn Dpad_Btn--up" />
                                <button type="button" className="Dpad_Btn Dpad_Btn--left" onClick={() => moveCursor(-1)} title="Highlight previous cartridge" aria-label="Highlight previous cartridge" />
                                <span className="Dpad_Center" />
                                <button type="button" className="Dpad_Btn Dpad_Btn--right" onClick={() => moveCursor(1)} title="Highlight next cartridge" aria-label="Highlight next cartridge" />
                                <span className="Dpad_Btn Dpad_Btn--down" />
                            </div>
                            <div className="AB">
                                <button type="button" className="AB_Btn AB_Btn--b" onClick={eject} disabled={!ready} title="Eject (B)">B</button>
                                {ready ? (
                                    <a className="AB_Btn AB_Btn--a" href={item.url} target="_blank" rel="noopener noreferrer" title="Open project (A)">A</a>
                                ) : (
                                    <button type="button" className="AB_Btn AB_Btn--a" disabled title="Open project (A)">A</button>
                                )}
                            </div>
                        </div>
                        <div className="Console_StartSelect">
                            <button type="button" className="Pill" onClick={() => moveCursor(1)} title="Highlight next cartridge">
                                SELECT
                            </button>
                            <button type="button" className="Pill" onClick={() => activate(cursor)} title="Insert highlighted cartridge (Enter)">
                                START
                            </button>
                        </div>
                    </div>
                </div>

                <Win title={item ? `cart://${item.title}` : 'cart://'} accent={color}>
                    <div className="Term">
                        <Info item={item} phase={phase} />
                    </div>
                </Win>
            </div>
        </div>
    );
}
