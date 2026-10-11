import './App.css';
import Intro from "./components/Intro";
import Sections from "./components/sections/Sections";
import Contact from "./components/Contact";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import RetroView from "./retro/RetroView";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useRef, useState, useEffect } from 'react';


function App() {
    const [aboutPaddingTop, setAboutPaddingTop] = useState("");
    const [retroMode, setRetroMode] = useState(false);

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

    useEffect(() => {
        updateAboutPaddingTop();
        const handleResize = () => updateAboutPaddingTop();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function updateAboutPaddingTop() {
        if (window.innerWidth > 992) {
            const left = document.querySelector('.LeftColumn');
            const intro = document.querySelector('.Intro');
            const sections = document.querySelector('.Sections');
            const contact = document.querySelector('.Contact');
            if (!left || !intro || !contact) return;
            const stackHeight = intro.offsetHeight
                + (sections ? sections.offsetHeight : 0)
                + contact.offsetHeight;
            // Same offset the old space-around layout used, so the name lines up with About.
            const paddingTop = (left.clientHeight - stackHeight) / 3.65;
            if (paddingTop > 0) {
                setAboutPaddingTop(`${paddingTop}px`);
            }
        } else {
            setAboutPaddingTop("40px");
        }
    }

    return (
        <>
        {retroMode && <RetroView onExit={() => setRetroMode(false)}/>}
        <Row className="App" aria-hidden={retroMode}>
            <Col lg={5} className="LeftColumn" style={{ '--align-pad': aboutPaddingTop }}>
                    <div className="LeftColumn_TopContainer">
                        <Intro onRocketClick={() => setRetroMode(true)}/>
                        <Sections
                            handleScrollToAbout={handleScrollToAbout}
                            handleScrollToExperience={handleScrollToExperience}
                            handleScrollToProjects={handleScrollToProjects}
                        />
                        <Contact/>
                    </div>
            </Col>
            <Col lg={7} className="RightColumn">
                <About ref={aboutRef} aboutPaddingTop={aboutPaddingTop}/>
                <Experience ref={experienceRef}/>
                <Projects ref={projectsRef}/>
            </Col>
        </Row>
        </>
    );
}

export default App;
