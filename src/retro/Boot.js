import React, { useEffect, useState } from 'react';
import { sfx } from './sound';

const LINES = [
    { text: 'ODYSSEY BIOS v1.0   (C) 2026 Corujo Systems' },
    { text: '' },
    { text: 'CPU: Human Brain @ 1 coffee/hr', ok: true },
    { text: 'Memory test: 640K', ok: true },
    { text: 'Detecting drives... FD0: 3.5" 1.44MB   CART0: 8-bit', ok: true },
    { text: 'Loading kernel modules: curiosity.ko science.ko space.ko', ok: true },
    { text: 'Mounting /home/luiscorujo', ok: true },
    { text: 'Starting window manager', ok: true },
    { text: 'Igniting rocket boosters', ok: true },
    { text: '' },
    { text: 'Welcome, visitor. Click anywhere to skip.' },
];

export default function Boot({ onDone }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count >= LINES.length) {
            const t = setTimeout(onDone, 900);
            return () => clearTimeout(t);
        }
        const delay = count === 0 ? 350 : 160 + Math.random() * 220;
        const t = setTimeout(() => {
            if (LINES[count].ok) sfx.blip();
            setCount(count + 1);
        }, delay);
        return () => clearTimeout(t);
    }, [count, onDone]);

    return (
        <div className="Boot" onClick={onDone}>
            <pre className="Boot_Log">
                {LINES.slice(0, count).map((line, i) => (
                    <div key={i}>
                        {line.ok && <span className="Boot_Ok">[ OK ] </span>}
                        {line.text || '\u00a0'}
                    </div>
                ))}
                <span className="Cursor" />
            </pre>
        </div>
    );
}
