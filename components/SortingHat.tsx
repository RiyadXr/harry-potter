import React, { useState, useEffect } from 'react';
import { HouseTheme, SortingResult } from '../types';
import { SORTING_QUIZ_QUESTIONS, ICONS } from '../constants';
import { getSortingHatDecision } from '../services/geminiService';
import Modal from './Modal';

interface SortingHatProps {
    onSort: (result: SortingResult) => void;
    theme: HouseTheme;
    userName: string;
}

const SortingHat: React.FC<SortingHatProps> = ({ onSort, theme, userName }) => {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [keyInput, setKeyInput] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<SortingResult | null>(null);
    const [shuffledQuestions, setShuffledQuestions] = useState<(typeof SORTING_QUIZ_QUESTIONS)>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const savedKey = localStorage.getItem('geminiApiKey');
        if (savedKey) {
            setApiKey(savedKey);
        }

        const shuffled = [...SORTING_QUIZ_QUESTIONS];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setShuffledQuestions(shuffled);
    }, []);
    
    const handleKeySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (keyInput.trim()) {
            localStorage.setItem('geminiApiKey', keyInput);
            setApiKey(keyInput);
            setError('');
        } else {
            setError('Please enter a valid API Key.');
        }
    };

    const handleAnswer = async (value: string) => {
        if (!apiKey) {
            setError('The API Key is missing. Cannot proceed.');
            return;
        }
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (currentQuestion < shuffledQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setIsLoading(true);
            const decision = await getSortingHatDecision(newAnswers, apiKey);
            // Check if the API key was invalid
            if (decision.reasoning.includes("secret key (API_KEY)")) {
                 setError("The provided API Key is invalid or not configured correctly. Please check your key and try again.");
                 setApiKey(null); // Force user to re-enter key
                 localStorage.removeItem('geminiApiKey');
            } else {
                setResult(decision);
            }
            setIsLoading(false);
        }
    };
    
    if (!apiKey) {
        return (
            <div className={`p-4 sm:p-6 text-center ${theme.text}`}>
                <h2 className="text-2xl sm:text-3xl font-magic mb-4">Activate the Sorting Hat</h2>
                <p className="mb-6">Please provide your Google AI Studio API Key to awaken the magic of the Sorting Hat. This key will be saved securely in your browser.</p>
                <form onSubmit={handleKeySubmit} className="flex flex-col items-center space-y-4 max-w-sm mx-auto">
                     <input
                        type="password"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder="Paste your API Key here"
                        className={`w-full p-2 rounded-md bg-transparent border-2 ${theme.border} focus:outline-none focus:ring-2 ${theme.border}`}
                    />
                    <button type="submit" className={`px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 ${theme.primary} ${theme.text} font-magic`}>
                        Save Key & Begin
                    </button>
                    {error && <p className="text-red-400 mt-2">{error}</p>}
                </form>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="text-center p-8 flex flex-col items-center justify-center space-y-6 min-h-[300px]">
                <div className={`animate-spin-slow ${theme.accent}`}>
                    {ICONS.SPARKLES}
                </div>
                <h2 className={`text-3xl font-magic ${theme.accent} animate-pulse`}>The Sorting Hat is thinking...</h2>
                <p className={`${theme.text}`}>Hmm, difficult. VERY difficult...</p>
            </div>
        );
    }
    
    if (result) {
        return (
            <Modal title="The Sorting Hat has decided!" onClose={() => onSort(result)} theme={theme}>
                <div className="text-center">
                     <h3 className={`text-5xl font-magic ${theme.accent} mb-4`}>{result.house}!</h3>
                     <p className={`${theme.text}`}>{result.reasoning}</p>
                </div>
            </Modal>
        )
    }

    if (shuffledQuestions.length === 0) {
        return (
            <div className="text-center p-8">
                <p className={`${theme.text}`}>The Sorting Hat is clearing its throat...</p>
            </div>
        );
    }

    const question = shuffledQuestions[currentQuestion];

    return (
        <div className={`p-2 sm:p-4 text-center ${theme.text}`}>
            <h2 className="text-2xl sm:text-3xl font-magic mb-2">Welcome to Hogwarts, {userName}!</h2>
            <p className="mb-6">Answer the questions to be sorted into your house.</p>
            
            <div className={`p-4 sm:p-6 rounded-lg border-2 ${theme.border} bg-black bg-opacity-10`}>
                <h3 className="text-xl sm:text-2xl mb-6">{question.question}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map(option => (
                        <button
                            key={option.value}
                            onClick={() => handleAnswer(option.value)}
                            className={`p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${theme.primary} ${theme.text}`}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SortingHat;