import React, { useEffect, useState } from 'react';
import Win from '../Win';
import { sfx } from '../sound';
import cv from '../../components/data/resume.pdf';

const ITEMS = [
    { label: 'GITHUB', value: 'github.com/luiscorujo', href: 'https://github.com/luiscorujo' },
    { label: 'LINKEDIN', value: 'linkedin.com/in/luis-corujo', href: 'https://www.linkedin.com/in/luis-corujo/' },
    { label: 'RESUME', value: 'resume.pdf', href: cv },
    { label: 'EMAIL', value: 'luis3zc@gmail.com', href: 'mailto:luis3zc@gmail.com' },
];

const SCORES = [
    { name: 'AMZ', score: '2025' },
    { name: 'AWS', score: '2023' },
    { name: 'AWS', score: '2021' },
    { name: 'MIT', score: '2019' },
    { name: 'TEL', score: '2019' },
];

export default function ContactWs() {
    const [cursor, setCursor] = useState(0);
    const [countdown, setCountdown] = useState(9);

    // Arcade "continue?" countdown that loops forever.
    useEffect(() => {
        const id = setInterval(() => setCountdown((c) => (c === 0 ? 9 : c - 1)), 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowDown') {
                sfx.blip();
                setCursor((c) => (c + 1) % ITEMS.length);
            } else if (e.key === 'ArrowUp') {
                sfx.blip();
                setCursor((c) => (c - 1 + ITEMS.length) % ITEMS.length);
            } else if (e.key === 'Enter') {
                sfx.click();
                window.open(ITEMS[cursor].href, '_blank', 'noopener');
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [cursor]);

    return (
        <div className="Ws">
            <div className="Deck Deck--contact">
                <Win title="continue?" accent="yellow">
                    <div className="Arcade">
                        <div className="Arcade_Title">CONTINUE?</div>
                        <div className="Arcade_Count">{countdown}</div>
                        <div className="Arcade_Coin Blink">INSERT COIN TO CONTACT</div>
                    </div>
                    <ul className="Menu">
                        {ITEMS.map((it, i) => (
                            <li key={it.label}>
                                <a
                                    className={`Menu_Item ${i === cursor ? 'Menu_Item--active' : ''}`}
                                    href={it.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => { if (i !== cursor) { sfx.blip(); setCursor(i); } }}
                                    onFocus={() => setCursor(i)}
                                    onClick={() => sfx.click()}
                                >
                                    <span className="Menu_Ptr" aria-hidden="true">▶</span>
                                    <span className="Menu_Label">{it.label}</span>
                                    <span className="Menu_Val">{it.value}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="c-muted Term_Small">↑ ↓ to move · ENTER to select</div>
                </Win>

                <Win title="high scores" accent="red">
                    <table className="Scores">
                        <thead>
                            <tr><th>RANK</th><th>NAME</th><th>YEAR</th></tr>
                        </thead>
                        <tbody>
                            {SCORES.map((s, i) => (
                                <tr key={i} className={i === 0 ? 'Scores_Top' : ''}>
                                    <td>{i + 1}{['ST', 'ND', 'RD'][i] || 'TH'}</td>
                                    <td>{s.name}</td>
                                    <td>{s.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="Scores_Footer c-muted">
                        1UP · LUIS CORUJO · SOFTWARE ENGINEER
                    </div>
                </Win>
            </div>
        </div>
    );
}
