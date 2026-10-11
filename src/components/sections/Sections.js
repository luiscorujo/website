import React, { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Line from "./Line";
import SectionsTitle from "./SectionsTitle";

const ITEMS = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
];

function Sections(props) {
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        const sections = ITEMS.map((item) => document.getElementById(item.id));
        if (sections.some((el) => !el)) return undefined;

        const onScroll = () => {
            const marker = window.innerHeight * 0.28;
            let next = 0;
            sections.forEach((el, i) => {
                if (el.getBoundingClientRect().top <= marker) next = i;
            });
            setActiveSection(next);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handlers = [
        props.handleScrollToAbout,
        props.handleScrollToExperience,
        props.handleScrollToProjects,
    ];

    return (
        <div className="Sections">
            <ListGroup variant="flush" className="Sections_List">
                {ITEMS.map((item, i) => (
                    <ListGroup.Item
                        key={item.id}
                        className="Sections_Item"
                        active={activeSection === i}
                        href={`#${item.id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handlers[i]();
                        }}
                    >
                        <Line/>
                        <SectionsTitle text={item.label}/>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default Sections;
