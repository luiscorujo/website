import React from "react";
import { forwardRef } from 'react';
import about from './data/about.json';


const About = forwardRef(function About(props, ref) {
    return (
        <div className="About" id="about" ref={ref} style={{ paddingTop: props.aboutPaddingTop }}>
            {about.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
        </div>
    );
});

export default About;
