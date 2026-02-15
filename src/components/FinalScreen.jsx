import React, { useState, useEffect } from 'react';
import { finalMessage } from '../config';

export const FinalScreen = ({ isActive, onCelebrate }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (!isActive) {
            setDisplayedText('');
            return;
        }

        let i = 0;
        const timer = setInterval(() => {
            setDisplayedText((prev) => prev + finalMessage.charAt(i));
            i++;
            if (i >= finalMessage.length) clearInterval(timer);
        }, 40);

        return () => clearInterval(timer);
    }, [isActive]);

    return (
        <div className={`screen ${isActive ? 'active' : ''}`}>
            <div className="screen-content final-content">
                <h2>Nihed ❤️</h2>
                <p id="loveMessage" style={{ whiteSpace: 'pre-wrap' }}>{displayedText}</p>
                <button className="btn-primary" onClick={onCelebrate}>
                    Yes, Always! 💖
                </button>
            </div>
        </div>
    );
};
