import React from "react";
import ProjectCard from './cards/ProjectCard';
import projects from './data/projects.json';
import {forwardRef} from 'react';
import tfgImage from './images/tradertoolbar.webp'
import nuriarevueltaImage from './images/nuriarevuelta.webp'
import hhmImage from './images/hhm.webp'
import tsotwImage from './images/tsotwImage.webp'
import gameOfLife from './images/gameoflife.webp'


const Projects = forwardRef(function Projects(props, ref) {
    const images = [hhmImage, tfgImage, tsotwImage, nuriarevueltaImage, gameOfLife]
    // TODO: Add rest of projects
    // TODO: Add page for all projects
    return (
        <div className="Projects" id="projects" ref={ref}>
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