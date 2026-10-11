import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import cv from "./data/resume.pdf";

const LINKS = [
    { href: 'https://github.com/luiscorujo', label: 'GitHub', icon: faGithub },
    { href: 'https://www.linkedin.com/in/luis-corujo/', label: 'LinkedIn', icon: faLinkedin },
    { href: cv, label: 'Resume', icon: faAddressCard },
    { href: 'mailto:luis3zc@gmail.com', label: 'Email', icon: faEnvelope },
];

function Contact() {
    return(
        <div className="Contact">
            {LINKS.map((link) => (
                <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    title={link.label}
                >
                    <FontAwesomeIcon className="Contact_Icon" icon={link.icon} size="2x" />
                </a>
            ))}
        </div>
    )
}

export default Contact;
