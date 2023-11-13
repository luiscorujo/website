import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';


function Contact() {
    return(
        <div className="Contact">
            <a href="https://github.com/luiscorujo" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className="Contact_Icon" icon={faGithub} size="2x" />
            </a>
            <a href="https://www.linkedin.com/in/luis-corujo/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className="Contact_Icon" icon={faLinkedin} size="2x" />
            </a>
            <a href='./data/tempcv.pdf' target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className="Contact_Icon" icon={faAddressCard} size="2x" />
            </a>
            <a href="mailto: luis3zc@gmail.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className="Contact_Icon" icon={faEnvelope} size="2x" />
            </a>
        </div>
    )
}

export default Contact;
