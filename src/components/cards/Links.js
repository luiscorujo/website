import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons';

function Links(props) {
    if (!props.links || props.links.length === 0) return null;
    return (
        <div className="Links">
            {props.links.map((link) => (
                <a
                    key={link.url}
                    className="Links_Item"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                >
                    <FontAwesomeIcon className="Link_Icon" icon={faLink} size="1x"/>
                    <span className="Link_Text">{link.text}</span>
                </a>
            ))}
        </div>
    );
}

export default Links;
