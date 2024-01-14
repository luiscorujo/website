import React from "react";
import ProjectCard from './cards/ProjectCard';
import projects from './data/projects.json';
import {forwardRef} from 'react';
import tfgImage from './images/tradertoolbar.png'
import nuriarevueltaImage from './images/nuriarevuelta.png'
import hhmImage from './images/hhm.png'
import luiscorujoImage from './images/luiscorujo.png'
import gameOfLife from './images/gameoflife.png'


const Projects = forwardRef(function Projects(props, ref) {
    const images = [tfgImage, hhmImage, gameOfLife, nuriarevueltaImage]
    // TODO: Add rest of projects
    // TODO: Add page for all projects
    return (
        <div className="Projects" ref={ref}>
            <h5 className="Projects_Title">Projects</h5>
            {projects.map((item) => (
                    <ProjectCard
                        key={item.id}
                        url={item.url}
                        imageSrc={images[item.id]}
                        title={item.title}
                        description={item.description}
                        links={item.links}
                        skills={item.skills}
                    />
            ))}
        </div>
    )

});

export default Projects;