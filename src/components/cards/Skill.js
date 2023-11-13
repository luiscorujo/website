import React from "react";

function Skills(props) {
    return (
        <div className="Skills">
            {props.skills && props.skills.map((item) => (
                <div className="Skill_Item">
                    {item}
                </div>
            ))}
        </div>
    );
}

export default Skills;
