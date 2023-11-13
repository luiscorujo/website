import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Skills from "./Skill";
import Links from "./Links";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

function ExperienceCard(props) {
    return (
        <a className="ExperienceCard_Url" href={props.url} target="_blank" rel="noopener noreferrer">
            <Row className="ExperienceCard">
                <Col xs={12} sm={3} className="ExperienceCard_DateCol">
                    <p>{props.startDate} - {props.endDate}</p>
                </Col>
                <Col xs={12} sm={9} className="ExperienceCard_Info">
                    <div className="ExperienceCard_Title">
                        <p><b>{props.title} &bull;&nbsp;</b>{props.company}</p>
                        <FontAwesomeIcon className="ArrowIconExperience" icon={faArrowRight} size="1x"/>
                    </div>
                    <div className="ExperienceCard_Description">{props.description}</div>
                    {props.links && <Links links={props.links}/>}
                    <Skills skills={props.skills}/>
                </Col>
            </Row>
        </a>
    );
}

export default ExperienceCard;
