import './App.css';
import Intro from "./components/Intro";
import Sections from "./components/sections/Sections";
import Contact from "./components/Contact";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useRef, useState, useEffect } from 'react';


function App() {
    const [aboutPaddingTop, setAboutPaddingTop] = useState("");

    const aboutRef = useRef(null);
    const experienceRef = useRef(null);
    const projectsRef = useRef(null);

    function handleScrollToAbout() {
        aboutRef.current.scrollIntoView({behavior: 'smooth'});
    }

    function handleScrollToExperience() {
        experienceRef.current.scrollIntoView({behavior: 'smooth'});
    }

    function handleScrollToProjects() {
        projectsRef.current.scrollIntoView({behavior: 'smooth'});
    }

    useEffect( () => {
        // Initialize paddingTop after first render
        updateAboutPaddingTop();
        return () => {
            // Cleanup logic (if any)
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            updateAboutPaddingTop();
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    function updateAboutPaddingTop() {
        if (window.innerWidth > 992) {
            const containerHeight = document.querySelector('.LeftColumn').offsetHeight;
            const introItem = document.querySelector('.LeftColumn_TopContainer').offsetHeight;
            const contactItem = document.querySelector('.Contact').offsetHeight;
            const paddingTop = (containerHeight - introItem - contactItem) / 3.65;
            if (paddingTop > 0) {
                setAboutPaddingTop(`${paddingTop}px`);
            }
        } else {
            setAboutPaddingTop("40px");
        }
    }

    return (
        <Row className="App">
            <Col lg={5} className="LeftColumn">
                    <div className="LeftColumn_TopContainer">
                        <Intro/>
                        <Sections
                            handleScrollToAbout={handleScrollToAbout}
                            handleScrollToExperience={handleScrollToExperience}
                            handleScrollToProjects={handleScrollToProjects}
                        />
                    </div>
                    <Contact/>
            </Col>
            <Col lg={7} className="RightColumn">
                <About ref={aboutRef} aboutPaddingTop={aboutPaddingTop}/>
                <Experience ref={experienceRef}/>
                <Projects ref={projectsRef}/>
            </Col>
        </Row>
    );
}

export default App;
