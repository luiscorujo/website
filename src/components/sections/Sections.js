import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Line from "./Line";
import SectionsTitle from "./SectionsTitle";
import { useState } from 'react';


function Sections(props) {

    const [activeSection, setActiveSection] = useState(0);
    window.addEventListener("scroll", () => {
        if(window.pageYOffset >= 1150) {
            console.log("activating projects")
            setActiveSection(2);
        }
        else if (window.pageYOffset >= 300) {
            console.log("activating experience")
            setActiveSection(1);
        } else {
            console.log("activating about")

            setActiveSection(0);
        }
    });

    return (
        <div className="Sections">
            <ListGroup variant="flush" className="Sections_List" defaultActiveKey="#About">
                <ListGroup.Item className="Sections_Item" active={activeSection === 0} href="#About"
                                onClick={props.handleScrollToAbout}>
                    <Line/>
                    <SectionsTitle text="About"/>
                </ListGroup.Item>
                <ListGroup.Item className="Sections_Item" active={activeSection === 1} href="#Experience"
                                onClick={props.handleScrollToExperience}>
                    <Line/>
                    <SectionsTitle text="Experience"/>
                </ListGroup.Item>
                <ListGroup.Item className="Sections_Item" active={activeSection === 2} href="#Projects"
                                onClick={props.handleScrollToProjects}>
                    <Line/>
                    <SectionsTitle text="Projects"/>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default Sections;