import React, { useState } from 'react';
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
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<SortingResult | null>(null);

    const handleAnswer = async (value: string) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (currentQuestion < SORTING_QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setIsLoading(true);
            const decision = await getSortingHatDecision(newAnswers);
            setResult(decision);
            setIsLoading(false);
        }
    };

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

    const question = SORTING_QUIZ_QUESTIONS[currentQuestion];

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