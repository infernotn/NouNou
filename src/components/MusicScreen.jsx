import React, { useState, useRef, useEffect } from 'react';

export const MusicScreen = ({ isActive, onContinue }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(70);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');
    const audioRef = useRef(null);
    const [usesGlobalAudio, setUsesGlobalAudio] = useState(false);

    useEffect(() => {
        // If the global bgAudio exists (in App.jsx), use it so there's only one audio source.
        const globalAudio = typeof document !== 'undefined' ? document.getElementById('bgAudio') : null;
        if (globalAudio) {
            audioRef.current = globalAudio;
            setUsesGlobalAudio(true);
            // Sync initial state
            setIsPlaying(!globalAudio.paused && !globalAudio.muted);
            setVolume(Math.round((globalAudio.volume || 0.6) * 100));
        }
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            if (audio.duration) {
                const percent = (audio.currentTime / audio.duration) * 100;
                setProgress(percent);
                setCurrentTime(formatTime(audio.currentTime));
                setDuration(formatTime(audio.duration));
            }
        };

        const handleEnded = () => {
            setIsPlaying(false);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);

        // also handle loadedmetadata to get duration when loaded
        const handleLoaded = () => {
            setDuration(formatTime(audio.duration || 0));
        };
        audio.addEventListener('loadedmetadata', handleLoaded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('loadedmetadata', handleLoaded);
        };
    }, [audioRef.current]);

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleMusic = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().then(() => {
                setIsPlaying(true);
            }).catch(() => {
                console.log('Audio play failed - file may be missing or autoplay blocked');
            });
        }
    };

    const seekMusic = (value) => {
        const audio = audioRef.current;
        if (audio && audio.duration) {
            audio.currentTime = (value / 100) * audio.duration;
            setProgress(value);
        }
    };

    const setVolumeHandler = (value) => {
        setVolume(value);
        const audio = audioRef.current;
        if (audio) {
            audio.volume = value / 100;
        }
    };

    return (
        <div className={`screen ${isActive ? 'active' : ''}`}>
            <div className="screen-content">
                <h2>Our Song 🎵</h2>
                <p className="subtitle">A soundtrack to our love</p>
                <div className="music-player">
                    <div className="player-display">
                        <div className="now-playing">Now Playing</div>
                        <h3 id="songTitle">Love.mp3</h3>
                    </div>
                    <div className="player-controls">
                        <button className="player-btn" onClick={toggleMusic}>
                            <span className="icon">{isPlaying ? '⏸' : '▶'}</span>
                        </button>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                            <input
                                type="range"
                                id="progressSlider"
                                min="0"
                                max="100"
                                value={progress}
                                onChange={(e) => seekMusic(e.target.value)}
                            />
                        </div>
                        <div className="volume-control">
                            <span className="vol-icon">🔊</span>
                            <input
                                type="range"
                                id="volumeSlider"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={(e) => setVolumeHandler(e.target.value)}
                            />
                            <span id="volumeDisplay">{volume}%</span>
                        </div>
                    </div>
                    <div className="player-info">
                        <span id="currentTime">{currentTime}</span> / <span id="duration">{duration}</span>
                    </div>
                </div>
                <button className="btn-primary" onClick={onContinue}>
                    Let's Celebrate 💖
                </button>

                {/* Render an internal audio element only if global bgAudio is not present */}
                {!usesGlobalAudio && (
                    <audio ref={audioRef} id="bgSound" src={import.meta.env.BASE_URL + 'love.mp3'} preload="auto" />
                )}
            </div>
        </div>
    );
};
