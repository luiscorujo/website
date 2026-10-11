import React from 'react';

/** A tiling-WM style window with a thin accent border and a title tab. */
export default function Win({ title, accent = 'blue', className = '', children }) {
    return (
        <section className={`Win ${className}`} style={{ '--accent': `var(--${accent})` }}>
            <header className="Win_Bar">
                <span className="Win_Dots" aria-hidden="true">
                    <span style={{ background: 'var(--red)' }} />
                    <span style={{ background: 'var(--yellow)' }} />
                    <span style={{ background: 'var(--green)' }} />
                </span>
                <span className="Win_Title">{title}</span>
            </header>
            <div className="Win_Body">{children}</div>
        </section>
    );
}

export function Prompt({ path = '~' }) {
    return (
        <span className="Prompt">
            <span className="c-green">luiscorujo@odyssey</span>:<span className="c-blue">{path}</span>$
        </span>
    );
}
