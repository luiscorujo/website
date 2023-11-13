import React from "react";
import ExperienceCard from './cards/ExperienceCard';
import experience from './data/experience.json';
import { forwardRef } from 'react';


const Experience = forwardRef(function Experience(props, ref) {
    return (
        <div className="Experience" ref={ref}>
            <h5 className="Experience_Title">Experience</h5>
            {experience.map((item) => (
                <ExperienceCard
                    key={item.id}
                    url={item.url}
                    title={item.title}
                    company={item.company}
                    description={item.description}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    links={item.links}
                    skills={item.skills}
                />
            ))}
        </div>
    );
});

export default Experience;
