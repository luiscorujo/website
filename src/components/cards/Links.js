import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons';

function Links(props) {
    return (
        <div className="Links">
            {props.links && props.links.map((link) => (
                <div className="Links_Item">
                    {/*<FontAwesomeIcon icon="coffee" />*/}
                    <FontAwesomeIcon className="Link_Icon" icon={faLink} size="1x"/>
                    <a className="Link_Text" href={link.url} target="_blankthesitewizard.com">{link.text}</a>
                </div>
            ))}
        </div>
    );
}

export default Links;
