import React from "react";


function Intro(props) {
    return (
        <div className="Intro">
            <h1>Luis Corujo</h1>
            <h4>Software Engineer</h4>
            <p style={{ maxWidth: "32ch" }}>
                Passionate about Science, Engineering, and Space Exploration{' '}
                <button
                    className="Rocket"
                    type="button"
                    onClick={props.onRocketClick}
                    title="Launch retro mode"
                    aria-label="Launch retro mode"
                >
                    🚀
                </button>
            </p>
        </div>
    );
}

export default Intro;
