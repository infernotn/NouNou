import React, { useState, useEffect, useRef } from 'react';
import {
    ParticleSystem,
    GameScreen,
    MessageScreen,
    MemoriesScreen,
    FinalScreen,
    SuccessOverlay,
} from './components';
import { customMessages } from './config';
import './App.css';

const THEMES = ['', 'theme-purple', 'theme-cyan', 'theme-gold'];

function App() {
    const [currentScreen, setCurrentScreen] = useState('gameScreen');
    const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
    const [isCelebrated, setIsCelebrated] = useState(false);
    const bgAudioRef = useRef(null);

    useEffect(() => {
        document.body.className = '';
        if (THEMES[currentThemeIndex]) {
            document.body.classList.add(THEMES[currentThemeIndex]);
        }
    }, [currentThemeIndex]);

    // Try autoplaying background music on mount; if blocked by browser, play on first user interaction
    useEffect(() => {
        const audio = bgAudioRef.current;
        if (!audio) return;
        audio.volume = 0.6;
        audio.loop = true;

        const tryPlay = () => {
            audio.play().catch(() => {
                // Autoplay blocked. We'll wait for user interaction.
            });
        };

        tryPlay();

        const onFirstInteraction = () => {
            audio.play().catch(() => {});
            window.removeEventListener('pointerdown', onFirstInteraction);
            window.removeEventListener('keydown', onFirstInteraction);
        };

        window.addEventListener('pointerdown', onFirstInteraction);
        window.addEventListener('keydown', onFirstInteraction);

        return () => {
            window.removeEventListener('pointerdown', onFirstInteraction);
            window.removeEventListener('keydown', onFirstInteraction);
            try { audio.pause(); } catch (e) {}
        };
    }, []);

    const cycleTheme = () => {
        setCurrentThemeIndex((prev) => (prev + 1) % THEMES.length);
    };

    const goToMemories = () => {
        cycleTheme();
        setCurrentScreen('memoriesScreen');
    };

    const goToMessage2 = () => {
        cycleTheme();
        setCurrentScreen('messageScreen2');
    };



    const goToFinalProposal = () => {
        cycleTheme();
        setCurrentScreen('finalScreen');
    };

    const celebrate = () => {
        setIsCelebrated(true);
        cycleTheme();
    };

    return (
        <>
            {/* Background music: place your file in public/love.mp3 */}
            <audio ref={bgAudioRef} id="bgAudio" src="/love.mp3" preload="auto" />
            <ParticleSystem isCelebrated={isCelebrated} />

            {/* SCREEN 1: MEMORY MATCHING GAME */}
            <GameScreen
                isActive={currentScreen === 'gameScreen'}
                onComplete={goToMemories}
            />

            {/* SCREEN 2: CUSTOM MESSAGE */}
            <MessageScreen
                isActive={currentScreen === 'messageScreen1'}
                title="Between Us 💌"
                message={customMessages.msg1}
                onContinue={goToMemories}
            />

            {/* SCREEN 3: MEMORIES SLIDER */}
            <MemoriesScreen
                isActive={currentScreen === 'memoriesScreen'}
                onContinue={goToMessage2}
            />

            {/* SCREEN 4: CUSTOM MESSAGE */}
            <MessageScreen
                isActive={currentScreen === 'messageScreen2'}
                title="What's Next 💝"
                message={customMessages.msg2}
                onContinue={goToFinalProposal}
            />



            {/* SCREEN 6: FINAL PROPOSAL */}
            <FinalScreen
                isActive={currentScreen === 'finalScreen'}
                onCelebrate={celebrate}
            />

            {/* Success Celebration */}
            <SuccessOverlay isActive={isCelebrated} />
        </>
    );
}

export default App;
