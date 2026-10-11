import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function TopBar({ workspaces, active, onSelect, soundOn, onToggleSound, onPower }) {
    const [time, setTime] = useState(() => formatTime(new Date()));

    useEffect(() => {
        const id = setInterval(() => setTime(formatTime(new Date())), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <header className="TopBar">
            <nav className="TopBar_Ws" aria-label="Workspaces">
                {workspaces.map((ws, i) => (
                    <button
                        key={ws.name}
                        type="button"
                        className={`TopBar_WsBtn ${active === i + 1 ? 'TopBar_WsBtn--active' : ''}`}
                        onClick={() => onSelect(i + 1)}
                        title={`Workspace ${i + 1}: ${ws.name} (press ${i + 1})`}
                    >
                        {i + 1}
                        <span className="TopBar_WsName"> {ws.name}</span>
                    </button>
                ))}
            </nav>
            <div className="TopBar_Title">luiscorujo@odyssey — ~/{workspaces[active - 1].name}</div>
            <div className="TopBar_Right">
                <button
                    type="button"
                    className={`TopBar_Btn TopBar_Btn--icon ${soundOn ? '' : 'TopBar_Btn--muted'}`}
                    onClick={onToggleSound}
                    title={soundOn ? 'Mute sound effects' : 'Unmute sound effects'}
                    aria-label={soundOn ? 'Mute sound effects' : 'Unmute sound effects'}
                    aria-pressed={soundOn}
                >
                    <FontAwesomeIcon icon={soundOn ? faVolumeHigh : faVolumeXmark} fixedWidth />
                </button>
                <span className="TopBar_Clock">{time}</span>
                <button type="button" className="TopBar_Btn TopBar_Btn--power" onClick={onPower} title="Power off (Esc)">
                    POWER
                </button>
            </div>
        </header>
    );
}
