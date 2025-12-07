import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { House, HouseTheme, QuidditchScores } from '../types';
import { HOUSE_THEMES, ICONS } from '../constants';
import Modal from './Modal';

interface QuidditchProps {
    house: House | null;
    theme: HouseTheme;
    rewards: number;
    onMatchEnd: (score: number) => void;
    scores: QuidditchScores;
    lastWinner: House | null;
    quidditchPlaysToday: number;
}

const HouseCrest: React.FC<{ house: House }> = ({ house }) => {
    const crests: Record<House, string> = {
        [House.Gryffindor]: '🦁',
        [House.Slytherin]: '🐍',
        [House.Ravenclaw]: '🦅',
        [House.Hufflepuff]: '🦡',
    };
    return <span className="text-4xl">{crests[house]}</span>;
};

// --- Game Component ---
type Bludger = { id: number; x: number; y: number; vx: number; vy: number; };

const QuidditchGame: React.FC<{ onGameEnd: (score: number) => void, difficultyLevel: number }> = ({ onGameEnd, difficultyLevel }) => {
    const [timeLeft, setTimeLeft] = useState(30);
    const [score, setScore] = useState(0);
    const [snitch, setSnitch] = useState<{ x: number; y: number; visible: boolean }>({ x: 50, y: 50, visible: false });
    const [bludgers, setBludgers] = useState<Bludger[]>([]);
    const [isStunned, setIsStunned] = useState(false);
    
    const [gameState, setGameState] = useState<'instructions' | 'countdown' | 'playing'>('instructions');
    const [startCountdown, setStartCountdown] = useState(3);
    
    const gameAreaRef = useRef<HTMLDivElement>(null);
    const snitchTimerRef = useRef<ReturnType<typeof setTimeout>>();

    // Initialize Bludgers with difficulty
    useEffect(() => {
        const createBludger = (id: number): Bludger => {
            const baseSpeed = 2;
            const speed = (Math.random() * 2) + baseSpeed + (difficultyLevel * 0.4);
            const angle = Math.random() * Math.PI * 2;
            return {
                id,
                x: Math.random() * 100,
                y: Math.random() * 100,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
            };
        };
        setBludgers([createBludger(1), createBludger(2)]);
    }, [difficultyLevel]);

    const moveSnitch = useCallback(() => {
        setSnitch({
            x: Math.random() * 85 + 7.5,
            y: Math.random() * 80 + 10,
            visible: true,
        });
        const baseHideDelay = 1200;
        const hideTimeReduction = difficultyLevel * 100;
        const randomHideTime = Math.random() * 800;
        const hideDelay = Math.max(300, baseHideDelay - hideTimeReduction) + randomHideTime;

        snitchTimerRef.current = setTimeout(() => {
            setSnitch(s => ({ ...s, visible: false }));
        }, hideDelay);
    }, [difficultyLevel]);

    // Game State Machine
    useEffect(() => {
        if (gameState === 'countdown') {
            if (startCountdown > 0) {
                const timer = setTimeout(() => setStartCountdown(c => c - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                setGameState('playing');
                moveSnitch();
            }
        }
    }, [gameState, startCountdown, moveSnitch]);

    // Bludger movement interval
    useEffect(() => {
        if (gameState !== 'playing') return;
        const gameLoop = setInterval(() => {
            setBludgers(prevBludgers => prevBludgers.map(b => {
                let newX = b.x + b.vx;
                let newY = b.y + b.vy;
                let newVx = b.vx;
                let newVy = b.vy;
                // Bounce off walls
                if (newX < 0 || newX > 95) newVx = -newVx;
                if (newY < 0 || newY > 95) newVy = -newVy;
                return { ...b, x: newX, y: newY, vx: newVx, vy: newVy };
            }));
        }, 50);
        return () => clearInterval(gameLoop);
    }, [gameState]);
    
    // Main game timer countdown
    useEffect(() => {
        if (gameState !== 'playing') return;

        const timerId = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime > 0) {
                    return prevTime - 1;
                }
                clearInterval(timerId);
                return 0;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [gameState]);
    
    // Game end handler
    useEffect(() => {
        if (timeLeft <= 0 && gameState === 'playing') {
            if (snitchTimerRef.current) clearTimeout(snitchTimerRef.current);
            onGameEnd(score);
        }
    }, [timeLeft, gameState, score, onGameEnd]);

    // Snitch appearance loop
    useEffect(() => {
        if (gameState !== 'playing') return;
        if (!snitch.visible && timeLeft > 0) {
            const appearDelay = Math.random() * 500 + 200;
            const timer = setTimeout(moveSnitch, appearDelay);
            return () => clearTimeout(timer);
        }
    }, [snitch.visible, moveSnitch, timeLeft, gameState]);

    const handleSnitchClick = () => {
        if (isStunned || gameState !== 'playing') return;
        if (snitchTimerRef.current) clearTimeout(snitchTimerRef.current);
        setScore(s => s + 1);
        setSnitch(s => ({ ...s, visible: false }));
    };
    
    const handleBludgerClick = () => {
        if (isStunned || gameState !== 'playing') return;
        setIsStunned(true);
        setTimeout(() => setIsStunned(false), 1500); // 1.5 second stun
    };

    if (gameState === 'instructions') {
        return (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white font-magic z-50 text-center p-4">
                <h2 className="text-4xl mb-4">Quidditch Rules</h2>
                <div className="flex items-center justify-center space-x-4 mb-4 text-2xl">
                    <span>Catch the Snitch! {ICONS.SNITCH}</span>
                </div>
                <div className="flex items-center justify-center space-x-4 mb-8 text-2xl text-red-400">
                    <span>Avoid the Bludgers! {ICONS.BLUDGER}</span>
                </div>
                <button 
                    onClick={() => setGameState('countdown')}
                    className="px-8 py-4 bg-yellow-600 rounded-lg text-2xl hover:bg-yellow-500 transition-colors"
                >
                    Start Match!
                </button>
            </div>
        )
    }

    if (gameState === 'countdown') {
        return (
             <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-white font-magic z-50">
                <span className="text-9xl animate-ping opacity-75 absolute">{startCountdown}</span>
                <span className="text-9xl relative">{startCountdown}</span>
            </div>
        )
    }

    return (
        <div ref={gameAreaRef} className="absolute inset-0 bg-sky-300/80 z-50 overflow-hidden cursor-crosshair">
            {isStunned && <div className="absolute inset-0 animate-hit z-50 pointer-events-none"></div>}
            <div className="absolute top-2 left-2 text-white font-magic text-2xl bg-black/50 px-3 py-1 rounded">Time: {timeLeft}</div>
            <div className="absolute top-2 right-2 text-white font-magic text-2xl bg-black/50 px-3 py-1 rounded">Score: {score}</div>
            
            {snitch.visible && (
                <button
                    onClick={handleSnitchClick}
                    className="absolute text-4xl animate-float"
                    style={{ left: `${snitch.x}%`, top: `${snitch.y}%`, transform: 'translate(-50%, -50%)', filter: 'drop-shadow(0 0 10px gold)' }}
                    aria-label="Golden Snitch"
                >
                    {ICONS.SNITCH}
                </button>
            )}

            {bludgers.map(bludger => (
                 <button
                    key={bludger.id}
                    onClick={handleBludgerClick}
                    className="absolute text-5xl"
                    style={{ left: `${bludger.x}%`, top: `${bludger.y}%`, transform: 'translate(-50%, -50%)', filter: 'drop-shadow(0 0 5px black)' }}
                    aria-label="Bludger"
                >
                    {ICONS.BLUDGER}
                </button>
            ))}
        </div>
    );
};


const Quidditch: React.FC<QuidditchProps> = ({ house, theme, rewards, onMatchEnd, scores, lastWinner, quidditchPlaysToday }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [lastScore, setLastScore] = useState(0);

    const matchFee = quidditchPlaysToday === 0 ? 5 : 10 + Math.max(0, quidditchPlaysToday - 1) * 10;

    const handleGameEnd = (score: number) => {
        setLastScore(score);
        onMatchEnd(score);
        setIsPlaying(false);
        setShowResults(true);
    };

    const sortedHouses = useMemo(() => {
        return (Object.keys(scores) as House[]).sort((a, b) => (Number(scores[b]) || 0) - (Number(scores[a]) || 0));
    }, [scores]);

    const maxScore = useMemo(() => {
        const allScores = Object.values(scores).map(v => Number(v) || 0);
        if (!allScores.length) return 1;
        const max = Math.max(...allScores);
        return max > 0 ? max : 1;
    }, [scores]);

    const canPlay = rewards >= matchFee;
    
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const calculateCountdown = () => {
            const now = new Date();
            const endOfDay = new Date(now);
            endOfDay.setHours(23, 59, 59, 999);

            const diff = endOfDay.getTime() - now.getTime();
            if (diff < 0) {
                setCountdown("00:00:00");
                return;
            }

            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            
            setCountdown(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
        };
        calculateCountdown();
        const interval = setInterval(calculateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`relative ${theme.text}`}>
            <h2 className={`text-3xl font-magic mb-4 border-b-2 pb-2 ${theme.border}`}>Quidditch Pitch</h2>

            {lastWinner && (
                <div className="mb-4 p-3 text-center rounded-lg bg-yellow-500/20 animate-fade-in">
                    <p className={`font-magic ${theme.accent}`}>🏆 Yesterday's Quidditch Cup was won by {lastWinner}! 🏆</p>
                </div>
            )}
            
            <div className="mb-6">
                <h3 className="font-magic text-xl text-center mb-2">Daily Cup Standings</h3>
                <div className="flex justify-around items-end gap-2 p-4 bg-black/10 rounded-lg h-48">
                    {sortedHouses.map(h => (
                         <div key={h} className="flex flex-col items-center w-1/4">
                            <HouseCrest house={h} />
                            <span className="text-xs font-bold">{scores[h]}</span>
                            <div 
                                className={`w-10 rounded-t-md transition-all duration-500 ${HOUSE_THEMES[h].primary}`}
                                style={{ height: `${Math.max(5, ((Number(scores[h]) || 0) / maxScore) * 100)}%` }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center">
                 <p className="mb-2 font-magic">Daily Cup ends in: {countdown}</p>
                 {quidditchPlaysToday > 0 && <p className="text-sm opacity-80 mb-2">Difficulty: +{quidditchPlaysToday} | Next match will be harder!</p>}
                <button
                    onClick={() => setIsPlaying(true)}
                    disabled={!canPlay}
                    className={`px-8 py-4 rounded-lg shadow-xl transition-all-smooth transform hover:scale-105 font-magic text-2xl ${
                        canPlay ? `${theme.primary} ${theme.text}` : 'bg-gray-500/50 cursor-not-allowed'
                    }`}
                >
                    Play Match ({matchFee} 💰)
                </button>
                {!canPlay && <p className="text-red-400 mt-2 text-sm">Not enough Galleons to play!</p>}
            </div>

            {isPlaying && <QuidditchGame onGameEnd={handleGameEnd} difficultyLevel={quidditchPlaysToday} />}
            
            {showResults && (
                <Modal
                    title="Match Results"
                    onClose={() => setShowResults(false)}
                    theme={theme}
                    footerButtonText="Back to the Pitch"
                >
                    <div className="text-center">
                        <h3 className={`text-5xl font-magic ${theme.accent} mb-4`}>{lastScore} Points!</h3>
                        <p className="mb-2">You caught {lastScore} Snitch{lastScore !== 1 ? 'es' : ''} for {house}!</p>
                        {lastScore >= 5 ? (
                            <p className="text-green-400">A brilliant performance! You've earned 20 Galleons.</p>
                        ) : (
                            <p className="text-yellow-400">A valiant effort! Keep practicing, seeker!</p>
                        )}
                         <p className="text-sm opacity-70 mt-4">({matchFee} Galleon match fee has been deducted.)</p>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Quidditch;