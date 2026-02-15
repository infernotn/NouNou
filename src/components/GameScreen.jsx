import React, { useState, useEffect } from 'react';
import { memories } from '../config';

export const GameScreen = ({ isActive, onComplete }) => {
    const [gameCards, setGameCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [moveCount, setMoveCount] = useState(0);
    const [isGameLocked, setIsGameLocked] = useState(false);

    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        const cardPairs = [];
        memories.forEach((memory, index) => {
            cardPairs.push({ id: index, type: 'title', text: memory.title, fullMemory: memory });
            cardPairs.push({ id: index, type: 'emoji', emoji: memory.emoji, fullMemory: memory });
        });

        const shuffled = cardPairs.sort(() => Math.random() - 0.5);
        setGameCards(shuffled.map((card, index) => ({ ...card, index })));
        setFlippedCards([]);
        setMatchedPairs(0);
        setMoveCount(0);
        setIsGameLocked(false);
    };

    const flipCard = (index) => {
        if (isGameLocked || flippedCards.includes(index)) return;
        if (gameCards[index]?.matched) return;

        const newFlipped = [...flippedCards, index];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoveCount(moveCount + 1);
            checkMatch(newFlipped);
        }
    };

    const checkMatch = (flipped) => {
        setIsGameLocked(true);
        const [first, second] = flipped;
        const isMatch = gameCards[first]?.id === gameCards[second]?.id;

        setTimeout(() => {
            if (isMatch) {
                setGameCards((prev) =>
                    prev.map((card) =>
                        card.index === first || card.index === second ? { ...card, matched: true } : card
                    )
                );
                const newMatched = matchedPairs + 1;
                setMatchedPairs(newMatched);

                if (newMatched === memories.length )  {
                    setTimeout(onComplete, 800);
                }
            }

            setFlippedCards([]);
            setIsGameLocked(false);
        }, 800);
    };

    return (
        <div className={`screen ${isActive ? 'active' : ''}`}>
            <div className="screen-content">
                <h2>Test Your Love 💭</h2>
                <p className="subtitle">Match the memory pairs to unlock the next chapter</p>
                <div className="game-container">
                    <div className="game-board">
                        {gameCards.map((card, idx) => (
                            <button
                                key={idx}
                                className={`game-card ${card.type === 'emoji'?'emoji':""} ${flippedCards.includes(idx) ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
                                onClick={() => flipCard(idx)}
                                disabled={card.matched}
                            >
                                {flippedCards.includes(idx) || card.matched
                                    ? card.type === 'emoji'
                                        ? card.emoji
                                        : card.text
                                    : '?'}
                            </button>
                        ))}
                    </div>
                    <div className="game-stats">
                        <div className="stat">
                            <span id="pairsFound">{matchedPairs}</span> / {memories.length} pairs found
                        </div>
                        <div className="stat">
                            Moves: <span id="moveCount">{moveCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
