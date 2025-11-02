
import React, { useState, useMemo } from 'react';
import { HouseTheme, House, View } from '../types';
import { TRIVIA_QUESTIONS, ICONS } from '../constants';
import Modal from './Modal';

interface SettingsProps {
    theme: HouseTheme;
    house: House | null;
    setView: (view: View) => void;
    onLeaveHouse: () => void;
}

const Sparkles: React.FC = () => {
    const sparkleData = useMemo(() => Array.from({ length: 12 }).map(() => ({
        style: {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 1.5}s`,
            transform: `scale(${Math.random() * 0.8 + 0.5})`,
        },
    })), []);

    return (
        <div className="absolute inset-0 pointer-events-none">
            {sparkleData.map((sparkle, i) => (
                <span
                    key={i}
                    className="absolute text-yellow-300 sparkle"
                    style={sparkle.style}
                >
                    {ICONS.SPARKLES}
                </span>
            ))}
        </div>
    );
};


const Settings: React.FC<SettingsProps> = ({ theme, house, onLeaveHouse }) => {
    const [isTriviaModalOpen, setIsTriviaModalOpen] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState('');
    const [isLetterOpen, setIsLetterOpen] = useState(false);

    const currentQuestion = useMemo(() => {
        return TRIVIA_QUESTIONS[Math.floor(Math.random() * TRIVIA_QUESTIONS.length)];
    }, [isTriviaModalOpen]);

    const handleStartTrivia = () => {
        if (!house) return;
        setSelectedAnswer(null);
        setFeedback('');
        setIsTriviaModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsTriviaModalOpen(false);
    };

    const handleTriviaSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setFeedback('Correct! The path is open.');
            setTimeout(() => {
                handleCloseModal();
                onLeaveHouse();
            }, 1500);
        } else {
            setFeedback('Incorrect. The path remains barred. Try again!');
        }
    };

    return (
        <div className={`${theme.text}`}>
            <h2 className={`text-3xl font-magic mb-6 border-b-2 pb-2 ${theme.border}`}>Room of Requirement</h2>
            
            <div className="space-y-4">
                 <div className="p-4 rounded-lg bg-black bg-opacity-10">
                    <h3 className={`font-magic text-xl mb-2 ${theme.accent}`}>A Special Letter</h3>
                    <p className="mb-3">A message has arrived for you by owl post.</p>
                    <button 
                        onClick={() => setIsLetterOpen(true)}
                        className={`px-4 py-2 rounded-lg shadow-md transition-all-smooth ${theme.primary} hover:opacity-80 flex items-center space-x-2`}
                    >
                        <span>Open the Letter</span>
                        <span>{ICONS.ENVELOPE}</span>
                    </button>
                </div>

                <div className="p-4 rounded-lg bg-black bg-opacity-10">
                    <h3 className={`font-magic text-xl mb-2 ${theme.accent}`}>Your House</h3>
                    <p>You are currently a proud member of {house ? <strong>{house}</strong> : 'no house yet'}.</p>
                </div>

                <div className="p-4 rounded-lg bg-black bg-opacity-10">
                    <h3 className={`font-magic text-xl mb-2 ${theme.accent}`}>Re-Sorting Ceremony</h3>
                    <p className="mb-3">To leave your house, you must first prove your knowledge. Answer the question correctly to proceed.</p>
                    <button 
                        onClick={handleStartTrivia}
                        disabled={!house}
                        className={`px-4 py-2 rounded-lg shadow-md transition-all-smooth ${!house ? 'bg-gray-500 cursor-not-allowed' : `${theme.primary} hover:opacity-80`}`}
                    >
                        Attempt the Challenge
                    </button>
                    {!house && <p className="mt-2 text-sm opacity-70">You must be sorted into a house first!</p>}
                </div>
            </div>

            {isLetterOpen && (
                 <Modal title="A Letter for Onamika" onClose={() => setIsLetterOpen(false)} theme={theme} footerButtonText="Close">
                    <div className="relative">
                        <Sparkles />
                        <div className="max-h-[60vh] overflow-y-auto pr-4 font-serif text-lg italic leading-relaxed">
                            <p className="mb-4">My dearest Onamika,</p>
                            <p className="mb-4">
                                If magic were real beyond books and spells, I think this would be mine — creating something for you. Something born from hundreds of sleepless nights, quiet cups of tea at dawn, and a heart that refused to rest until it found a way to make you smile.
                            </p>
                            <p className="mb-4">
                                You’ve always loved the world of Harry Potter — the stories, the courage, the wonder that makes the impossible feel close. I wanted to build a little piece of that world just for you. Not copied, not imagined, but created with my own hands, with love and courage stitched into every line of code.
                            </p>
                            <p className="mb-4">
                                This app is more than just an app. It’s the result of all the moments I stayed awake thinking of you, all the times I believed that love itself could be a kind of magic. Maybe I haven’t given you something truly special before, but I hope this shows how much you mean to me.
                            </p>
                            <p className="mb-4">
                                You are my spell that never breaks, my Patronus in dark times, the reason I dared to dream a little bigger.
                            </p>
                            <p className="mt-8 text-right">
                                Always,
                                <br />
                                Riyad
                            </p>
                        </div>
                    </div>
                </Modal>
            )}

            {isTriviaModalOpen && (
                <Modal title="A Challenge Appears!" onClose={handleCloseModal} theme={theme} showFooterButton={false}>
                    <form onSubmit={handleTriviaSubmit}>
                        <p className="mb-4">{currentQuestion.question}</p>

                        <div className="space-y-2 mb-4">
                            {currentQuestion.options.map(option => (
                                <label key={option} className="flex items-center p-3 rounded-lg bg-black/20 cursor-pointer transition-all-smooth">
                                    <input 
                                        type="radio" 
                                        name="trivia-option" 
                                        value={option}
                                        checked={selectedAnswer === option}
                                        onChange={() => setSelectedAnswer(option)}
                                        className="appearance-none h-5 w-5 rounded-full border-2 border-current checked:bg-yellow-400 checked:border-yellow-600 focus:outline-none transition-colors"
                                    />
                                    <span className="ml-3">{option}</span>
                                </label>
                            ))}
                        </div>
                        <div className="flex justify-center items-center space-x-4">
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                disabled={!!feedback}
                                className={`px-6 py-2 rounded-lg shadow-md transition-all-smooth ${!!feedback ? 'bg-gray-500 cursor-not-allowed' : `${theme.secondary} hover:opacity-80`}`}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={!selectedAnswer || !!feedback}
                                className={`px-6 py-2 rounded-lg shadow-md transition-all-smooth ${!selectedAnswer || !!feedback ? 'bg-gray-500 cursor-not-allowed' : `${theme.primary} hover:opacity-80`}`}
                            >
                                Submit Answer
                            </button>
                        </div>
                        {feedback && (
                            <p className={`mt-4 text-center font-bold ${feedback.includes('Correct') ? 'text-green-400' : 'text-red-400'}`}>
                                {feedback}
                            </p>
                        )}
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default Settings;