import React, { useState } from 'react';
import Win, { Prompt } from '../Win';
import Typewriter from '../Typewriter';
import about from '../../components/data/about.json';

const COMMAND = 'cat ~/about.txt';

const ROCKET_BODY = String.raw`
         /\
        /  \
       /    \
      |      |
      | (  ) |
      |      |
      |      |
     /|      |\
    / |      | \
   /__|______|__\
`;
const ROCKET_FLAME = String.raw`      /_/\/\_\
       ^^^^^^
        ^^^^
         ^^`;

const PALETTE = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'fg'];

const ACHIEVEMENTS = [
    { icon: '🤿', label: 'SCUBA DIVER', hint: 'Certified scuba diver' },
    { icon: '🪂', label: 'SKYDIVER', hint: 'Certified skydiver' },
    { icon: '🏃', label: 'MARATHONER', hint: 'Runs marathons' },
    { icon: '🥾', label: 'HIKER', hint: 'Always up for the mountains' },
    { icon: '🏂', label: 'SNOWBOARDER', hint: 'Snowboarding down' },
    { icon: '🎮', label: 'GAMER', hint: 'Where it all started' },
];

export default function AboutWs() {
    // 0: typing the command, 1..n: typing paragraph n, n+1: done
    const [step, setStep] = useState(0);
    const total = about.length;
    const next = () => setStep((s) => s + 1);
    const skipAll = () => setStep(total + 1);

    // Counting from the first AWS job (Jan 2021).
    const yearsInIndustry = ((Date.now() - new Date(2021, 0, 1)) / (365.25 * 864e5)).toFixed(1);
    const rows = [
        ['OS', 'Odyssey 1.0'],
        ['Host', 'Amazon — Software Development Engineer\u00A0II'],
        ['Kernel', 'Software Engineer'],
        ['Uptime', `${yearsInIndustry} years in industry`],
        ['Shell', 'zsh'],
        ['Packages', 'Java, Python, JavaScript, Rust, AWS'],
        ['Theme', 'Tokyo Night'],
    ];

    return (
        <div className="Ws">
            <div className="Deck Deck--about">
                <div className="AboutCol">
                    {/* Invisible full transcript so the OS window can sit at its final height from the start. */}
                    <div className="AboutSizer" aria-hidden="true">
                        <Win title="~/about.txt — zsh" accent="blue">
                            <div className="Term">
                                <div className="Term_Line"><Prompt /> {COMMAND}</div>
                                {about.map((paragraph, i) => (
                                    <p key={i} className="Term_P">{paragraph}</p>
                                ))}
                                <div className="Term_Line"><Prompt /> <span className="Cursor" /></div>
                            </div>
                        </Win>
                    </div>
                    <Win className="AboutWin" title="~/about.txt — zsh" accent="blue">
                        <div className="Term" onClick={skipAll} title="Click to skip typing">
                            <div className="Term_Line">
                                <Prompt />{' '}
                                {step === 0 ? <Typewriter text={COMMAND} speed={55} chunk={1} onDone={next} /> : COMMAND}
                            </div>
                            {about.map((paragraph, i) => {
                                const idx = i + 1;
                                if (step < idx) return null;
                                return (
                                    <p key={i} className="Term_P">
                                        {step === idx ? (
                                            <Typewriter text={paragraph} speed={9} chunk={3} onDone={next} />
                                        ) : (
                                            paragraph
                                        )}
                                    </p>
                                );
                            })}
                            {step > total && (
                                <div className="Term_Line">
                                    <Prompt /> <span className="Cursor" />
                                </div>
                            )}
                        </div>
                    </Win>
                </div>

                <Win className="NeofetchWin" title="neofetch" accent="purple">
                    <div className="Fetch">
                        <pre className="Fetch_Art" aria-hidden="true">
                            <span className="c-blue">{ROCKET_BODY}</span>
                            <span className="c-orange">{ROCKET_FLAME}</span>
                        </pre>
                        <div className="Fetch_Info">
                            <div>
                                <span className="c-green">luiscorujo</span>@<span className="c-green">odyssey</span>
                            </div>
                            <div className="c-muted">-------------------</div>
                            {rows.map(([key, value]) => (
                                <div key={key} className={key === 'Host' ? 'Fetch_Host' : undefined}>
                                    <span className="c-blue">{key}</span>: {value}
                                </div>
                            ))}
                            <div className="Fetch_Palette" aria-hidden="true">
                                {PALETTE.map((c) => (
                                    <span key={c} style={{ background: `var(--${c})` }} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="Achievements">
                        <div className="Achievements_Title">ACHIEVEMENTS UNLOCKED</div>
                        <div className="Achievements_List">
                            {ACHIEVEMENTS.map((a) => (
                                <span className="Ach" key={a.label}>
                                    <span className="Ach_Icon" aria-hidden="true">{a.icon}</span>
                                    {a.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </Win>
            </div>
        </div>
    );
}
