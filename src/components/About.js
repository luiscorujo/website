import React from "react";
import { forwardRef } from 'react';


const About = forwardRef(function About(props, ref) {
    return(
        <div className="About" ref={ref} style={{paddingTop: props.aboutPaddingTop}}>
            <p>
                My fascination with engineering and science traces back to my childhood,
                where my love for computers ignited during countless hours immersed in video games.
                As I grew older, this passion seamlessly evolved and it continues to thrive today.
            </p>
            <p>
                These days, I enjoy the challenges from my job at AWS.
                Problem-solving is not just a job requirement but a source of satisfaction for me.
                I thrive when presented complex issues and pushing the boundaries of what's possible.
                Beyond the workplace, I'm curious about the latest trends in AI and advances in space exploration. 🚀
            </p>
            <p>
                Away from the screens, I am an adventurer at heart, always seeking the thrill of adrenaline.
                I'm a certified scuba diver and skydiver. I run marathons, and I love the mountains,
                whether it's snowboarding down their slopes or hiking to their peaks.
            </p>
        </div>
    );
});

export default About;
