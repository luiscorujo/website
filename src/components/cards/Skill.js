import React from "react";

function Skills(props) {
    if (!props.skills || props.skills.length === 0) return null;
    return (
        <div className="Skills">
            {props.skills.map((item) => (
                <div className="Skill_Item" key={item}>
                    {item}
                </div>
            ))}
        </div>
    );
}

export default Skills;
