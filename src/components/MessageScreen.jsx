import React from 'react';

export const MessageScreen = ({ isActive, title, message, onContinue }) => {
    return (
        <div className={`screen ${isActive ? 'active' : ''}`}>
            <div className="screen-content">
                <h2>{title}</h2>
                <p className="custom-message">{message}</p>
                <button className="btn-primary" onClick={onContinue}>
                    Continue 💖
                </button>
            </div>
        </div>
    );
};
