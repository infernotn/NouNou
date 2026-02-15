import React, { useState } from 'react';
import { memories } from '../config';

export const MemoriesScreen = ({ isActive, onContinue }) => {
    const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);
    const [photoError, setPhotoError] = useState(false);

    const nextMemory = () => {
        if (currentMemoryIndex !== memories.length - 1) {

            setCurrentMemoryIndex( currentMemoryIndex + 1);
            setPhotoError(false);
        }
    };

    const prevMemory = () => {
        if (currentMemoryIndex !== 0) {
        setCurrentMemoryIndex((currentMemoryIndex - 1 + memories.length) % memories.length);
        setPhotoError(false);}
    };

    const memory = memories[currentMemoryIndex];

    const handlePhotoError = () => {
        setPhotoError(true);
    };

    return (
        <div className={`screen ${isActive ? 'active' : ''}`}>
            <div className="screen-content">
                <h2>Our Memories ✨</h2>
                <div className="memories-container">
                    <div className="memory-card">
                        <h3>{memory.title}</h3>
                        {/* Photo Display */}
                        <div className="memory-photo-container">
                            {memory.photo && !photoError ? (
                                <img
                                    src={memory.photo}
                                    alt={memory.title}
                                    className="memory-photo"
                                    onError={handlePhotoError}
                                />
                            ) : (
                                <div className="memory-photo-placeholder">
                                    <div className="memory-emoji">{memory.emoji}</div>
                                    <p className="placeholder-text">Photo not found</p>
                                </div>
                            )}
                        </div>

                        {/* Text Content */}

                        <p>{memory.description}</p>
                    </div>

                    {/* Navigation */}
                    <div className="memory-nav">
                        <button className="nav-btn" onClick={prevMemory}>
                            ← Previous
                        </button>
                        <span id="memoryCounter">
                            {currentMemoryIndex + 1} / {memories.length}
                        </span>
                        <button className="nav-btn" onClick={nextMemory}>
                            Next →
                        </button>
                    </div>
                </div>
                <button className="btn-primary" onClick={onContinue}>
                    Continue 💖
                </button>
            </div>
        </div>
    );
};
