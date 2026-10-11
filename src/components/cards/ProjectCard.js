import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import Skills from "./Skill";
import Links from "./Links";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

function ProjectCard(props) {
    return (
        <Row className="ProjectCard">
            <Col xs={12} sm={4} className="ProjectCard_ImageCol order-last order-sm-first">
                <a className="ProjectCard_Url" href={props.url} target="_blank" rel="noopener noreferrer">
                    <Image className="ProjectCard_Image" src={props.imageSrc} alt="" fluid/>
                </a>
            </Col>
            <Col xs={12} sm={8} className="ProjectCard_Info">
                <a className="ProjectCard_Url" href={props.url} target="_blank" rel="noopener noreferrer">
                    <div className="ProjectCard_Title">
                        <h5>{props.title}</h5>
                        <FontAwesomeIcon className="ArrowIconProjects" icon={faArrowRight} size="1x"/>
                    </div>
                    <div className="ProjectCard_Description">{props.description}</div>
                </a>
                {props.links && <Links links={props.links}/>}
                <Skills skills={props.skills}/>
            </Col>
        </Row>
    );
}

export default ProjectCard;
