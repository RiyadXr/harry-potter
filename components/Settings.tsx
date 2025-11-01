
import React, { useState, useMemo } from 'react';
import { HouseTheme, House, View, TriviaQuestion } from '../types';
import { TRIVIA_QUESTIONS } from '../constants';
import Modal from './Modal';

interface SettingsProps {
    theme: HouseTheme;
    house: House | null;
    setView: (view: View) => void;
    onLeaveHouse: () => void;
}

const Settings: React.FC<SettingsProps> = ({ theme, house, onLeaveHouse }) => {
    const [isTriviaModalOpen, setIsTriviaModalOpen] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState('');

    const currentQuestion = useMemo(() => {
        // Pick a new random question each time the modal opens
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
                    <h3 className={`font-magic text-xl mb-2 ${theme.accent}`}>Your House</h3>
                    <p>You are currently a proud member of {house ? <strong>{house}</strong> : 'no house yet'}.</p>
                </div>

                <div className="p-4 rounded-lg bg-black bg-opacity-10">
                    <h3 className={`font-magic text-xl mb-2 ${theme.accent}`}>Re-Sorting Ceremony</h3>
                    <p className="mb-3">To leave your house, you must first prove your knowledge. Answer the question correctly to proceed.</p>
                    <button 
                        onClick={handleStartTrivia}
                        disabled={!house}
                        className={`px-4 py-2 rounded-lg shadow-md transition-all ${!house ? 'bg-gray-500 cursor-not-allowed' : `${theme.primary} hover:opacity-80`}`}
                    >
                        Attempt the Challenge
                    </button>
                    {!house && <p className="mt-2 text-sm opacity-70">You must be sorted into a house first!</p>}
                </div>
            </div>

            {isTriviaModalOpen && (
                <Modal title="A Challenge Appears!" onClose={handleCloseModal} theme={theme} showFooterButton={false}>
                    <form onSubmit={handleTriviaSubmit}>
                        <p className="mb-4">{currentQuestion.question}</p>

                        <div className="space-y-2 mb-4">
                            {currentQuestion.options.map(option => (
                                <label key={option} className="flex items-center p-3 rounded-lg bg-black/20 cursor-pointer">
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
                                className={`px-6 py-2 rounded-lg shadow-md transition-all ${!!feedback ? 'bg-gray-500 cursor-not-allowed' : `${theme.secondary} hover:opacity-80`}`}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={!selectedAnswer || !!feedback}
                                className={`px-6 py-2 rounded-lg shadow-md transition-all ${!selectedAnswer || !!feedback ? 'bg-gray-500 cursor-not-allowed' : `${theme.primary} hover:opacity-80`}`}
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