import React, { useCallback, useEffect, useRef, useState } from 'react';
import './retro.css';
import Boot from './Boot';
import TopBar from './TopBar';
import AboutWs from './workspaces/AboutWs';
import ExperienceWs from './workspaces/ExperienceWs';
import ProjectsWs from './workspaces/ProjectsWs';
import ContactWs from './workspaces/ContactWs';
import { sfx, setSoundEnabled } from './sound';

const WORKSPACES = [
    { name: 'about', Component: AboutWs },
    { name: 'work', Component: ExperienceWs },
    { name: 'projects', Component: ProjectsWs },
    { name: 'contact', Component: ContactWs },
];

const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap';

function ensureFonts() {
    if (document.getElementById('retro-fonts')) return;
    const link = document.createElement('link');
    link.id = 'retro-fonts';
    link.rel = 'stylesheet';
    link.href = FONTS_URL;
    document.head.appendChild(link);
}

export default function RetroView({ onExit }) {
    const [stage, setStage] = useState('boot'); // boot | on | off
    const [active, setActive] = useState(1);
    const [soundOn, setSoundOn] = useState(true);
    const poweringOff = useRef(false);

    useEffect(() => {
        ensureFonts();
        setSoundEnabled(true);
        document.body.classList.add('retro-active');
        return () => document.body.classList.remove('retro-active');
    }, []);

    const powerOff = useCallback(() => {
        if (poweringOff.current) return;
        poweringOff.current = true;
        sfx.powerOff();
        setStage('off');
        setTimeout(onExit, 650);
    }, [onExit]);

    const bootDone = useCallback(() => {
        setStage((s) => (s === 'boot' ? 'on' : s));
    }, []);

    const switchWorkspace = useCallback(
        (n) => {
            if (n !== active) sfx.switch();
            setActive(n);
        },
        [active]
    );

    const toggleSound = () => {
        const next = !soundOn;
        setSoundEnabled(next);
        setSoundOn(next);
        if (next) sfx.click();
    };

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') {
                powerOff();
                return;
            }
            if (stage === 'boot') {
                bootDone();
                return;
            }
            if (stage !== 'on') return;
            const n = Number(e.key);
            if (n >= 1 && n <= WORKSPACES.length) switchWorkspace(n);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [stage, powerOff, bootDone, switchWorkspace]);

    const Active = WORKSPACES[active - 1].Component;

    return (
        <div className={`Retro Retro--${stage}`} role="dialog" aria-label="Retro mode">
            <div className="Retro_Screen">
                {stage === 'boot' ? (
                    <Boot onDone={bootDone} />
                ) : (
                    <>
                        <TopBar
                            workspaces={WORKSPACES}
                            active={active}
                            onSelect={switchWorkspace}
                            soundOn={soundOn}
                            onToggleSound={toggleSound}
                            onPower={powerOff}
                        />
                        <main className="Retro_Main" key={active}>
                            <Active />
                        </main>
                        <footer className="Retro_Hints">
                            <span><kbd>1</kbd>–<kbd>4</kbd> switch workspace</span>
                            <span><kbd>ARROWS</kbd> + <kbd>ENTER</kbd> pick &amp; insert</span>
                            <span><kbd>ESC</kbd> power off</span>
                        </footer>
                    </>
                )}
            </div>
            <div className="Retro_Scanlines" aria-hidden="true" />
        </div>
    );
}
