import React from "react";
import { forwardRef } from 'react';


const About = forwardRef(function About(props, ref) {
    return (
        <div className="About" ref={ref} style={{ paddingTop: props.aboutPaddingTop }}>
            <p>
                I've been passionate about engineering and science since I was a kid.
                I spent hours playing video games, which sparked my love for computers.
                Over the years, that interest kept growing, and it's still a big part of my life today.
            </p>
            <p>
                Right now, I work at Amazon, and I really enjoy the problem-solving aspect of my job.
                I like tackling tough challenges and figuring things out—it's what keeps things interesting for me.
            </p>
            <p>
                When I'm not at my computer, I seek adventure. I'm a certified scuba diver and skydiver,
                I run marathons, and I'm always up for the mountains—whether it's hiking up or snowboarding down.
            </p>
        </div>
    );
});

export default About;
