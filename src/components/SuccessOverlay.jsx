import React, { useEffect, useState } from 'react';
import { celebrationMessage } from '../config';

export const SuccessOverlay = ({ isActive }) => {
    const [heartsCount, setHeartsCount] = useState([]);

    useEffect(() => {
        if (!isActive) {
            setHeartsCount([]);
            return;
        }

        const hearts = ['❤️', '💖', '💕', '💗'];
        const rainInterval = setInterval(() => {
            const h = {
                id: Math.random(),
                emoji: hearts[Math.floor(Math.random() * hearts.length)],
                left: Math.random() * 100,
                size: 14 + Math.random() * 20,
                duration: 3 + Math.random() * 2,
            };
            setHeartsCount((prev) => [...prev, h]);

            setTimeout(() => {
                setHeartsCount((prev) => prev.filter((heart) => heart.id !== h.id));
            }, h.duration * 1000);
        }, 120);

        setTimeout(() => clearInterval(rainInterval), 5000);

        // Vibration
        if (navigator.vibrate) navigator.vibrate([40, 60, 40]);

        return () => clearInterval(rainInterval);
    }, [isActive]);

    return (
        <>
            <div className={`success-overlay ${isActive ? 'active' : ''}`}>
                <h2>We did it! 💕</h2>
                <p id="celebrationMessage">{celebrationMessage}</p>
            </div>
            {heartsCount.map((heart) => (
                <div
                    key={heart.id}
                    className="heart-rain"
                    style={{
                        left: `${heart.left}vw`,
                        fontSize: `${heart.size}px`,
                        animationDuration: `${heart.duration}s`,
                    }}
                >
                    {heart.emoji}
                </div>
            ))}
        </>
    );
};
