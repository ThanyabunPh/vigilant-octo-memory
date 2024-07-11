import React from 'react';
import './TextShadow.css';

const TextShadows = ({ text, onClick, visible }) => {
    if (!visible) {
        return null;
    }

    return (
        <div className="content" onClick={onClick}>
            <h2 className="text_shadows">{text}</h2>
        </div>
    );
};

export default TextShadows;
