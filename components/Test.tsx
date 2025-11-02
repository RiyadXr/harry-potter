import React, { useState } from 'react';
import { HouseTheme, House, TriviaQuestion } from '../types';
import { ALL_EXAM_QUESTIONS, EXAM_TITLES } from '../constants';

interface TestProps {
    theme: HouseTheme;
    userName: string;
    house: House | null;
    addRewards: (amount: number) => void;
}

interface CurrentExam {
    name: string;
    questions: TriviaQuestion[];
}

const Test: React.FC<TestProps> = ({ theme, userName, house, addRewards }) => {
    const [currentExam, setCurrentExam] = useState<CurrentExam | null>(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleBeginExam = () => {
        // Generate a new random exam
        const randomTitle = EXAM_TITLES[Math.floor(Math.random() * EXAM_TITLES.length)];
        const shuffledQuestions = [...ALL_EXAM_QUESTIONS].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffledQuestions.slice(0, 5);

        setCurrentExam({
            name: randomTitle,
            questions: selectedQuestions
        });
        
        // Reset state for the new exam
        setQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsFinished(false);
    };

    const handleAnswerSubmit = () => {
        if (!selectedAnswer || !currentExam) return;
    
        const isCorrect = selectedAnswer === currentExam.questions[questionIndex].correctAnswer;
    
        if (questionIndex < currentExam.questions.length - 1) {
            if (isCorrect) {
                setScore(prevScore => prevScore + 1);
            }
            setSelectedAnswer(null);
            setQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            // This is the last question. Finalize score and check for pass.
            const finalScore = score + (isCorrect ? 1 : 0);
            setScore(finalScore);
            if (finalScore > currentExam.questions.length / 2) {
                addRewards(10);
            }
            setIsFinished(true);
        }
    };

    const handleTakeAnotherExam = () => {
        setCurrentExam(null);
    };

    if (isFinished && currentExam) {
        const passed = score > currentExam.questions.length / 2;
        const rewardMessage = `Outstanding, ${userName}! Your knowledge is truly impressive. 10 points to ${house}!`;
        const curseMessage = `Oh dear, ${userName}! You've been cursed with Babbling! Your answers were all over the place. Better hit the books!`;

        return (
            <div className={`${theme.text} text-center animate-fade-in-up`}>
                <h2 className={`text-3xl font-magic mb-4 border-b-2 pb-2 ${theme.border}`}>Results for {currentExam.name}</h2>
                <p className="text-xl mb-4">You answered {score} out of {currentExam.questions.length} questions correctly.</p>
                <div className={`p-4 rounded-lg ${passed ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    <p className={`text-2xl font-magic mb-2 ${theme.accent}`}>{passed ? 'Excellent!' : 'Troll!'}</p>
                    <p>{passed ? rewardMessage : curseMessage}</p>
                </div>
                <button
                    onClick={handleTakeAnotherExam}
                    className={`mt-6 px-6 py-2 rounded-lg shadow-md transition-all-smooth transform hover:scale-105 ${theme.primary} ${theme.text} font-magic`}
                >
                    Take Another Exam
                </button>
            </div>
        );
    }

    if (currentExam) {
        const question = currentExam.questions[questionIndex];
        return (
            <div className={`${theme.text} animate-fade-in`} key={questionIndex}>
                <h2 className={`text-3xl font-magic mb-4 border-b-2 pb-2 ${theme.border}`}>{currentExam.name}</h2>
                <p className="mb-6 text-sm opacity-80">Question {questionIndex + 1} of {currentExam.questions.length}</p>
                
                <div className={`p-4 sm:p-6 rounded-lg border-2 ${theme.border} bg-black bg-opacity-10`}>
                    <h3 className="text-xl sm:text-2xl mb-6">{question.question}</h3>
                    <div className="space-y-3 mb-6">
                        {question.options.map(option => (
                            <label key={option} className={`flex items-center p-3 rounded-lg cursor-pointer transition-all-smooth ${selectedAnswer === option ? `${theme.primary}` : 'bg-black/20'}`}>
                                <input 
                                    type="radio" 
                                    name="exam-option" 
                                    value={option}
                                    checked={selectedAnswer === option}
                                    onChange={() => setSelectedAnswer(option)}
                                    className="sr-only"
                                />
                                <div className={`h-5 w-5 rounded-full border-2 flex-shrink-0 transition-all-smooth ${theme.border} ${selectedAnswer === option ? 'bg-yellow-400' : ''}`}></div>
                                <span className="ml-3">{option}</span>
                            </label>
                        ))}
                    </div>
                     <div className="text-right">
                        <button
                            onClick={handleAnswerSubmit}
                            disabled={!selectedAnswer}
                            className={`px-6 py-2 rounded-lg shadow-md transition-all-smooth ${!selectedAnswer ? 'bg-gray-500 cursor-not-allowed' : `${theme.primary} hover:opacity-80`}`}
                        >
                            Next Question
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`${theme.text} text-center`}>
            <h2 className={`text-3xl font-magic mb-4 border-b-2 pb-2 ${theme.border}`}>Examination Hall</h2>
            <p className="mb-6">Welcome, {userName}. It is time to test your knowledge. A surprise exam awaits you.</p>
            <div className="flex justify-center">
                 <button
                    onClick={handleBeginExam}
                    className={`p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center transform hover:scale-105 transition-all-smooth ${theme.primary}`}
                >
                    <span className="text-5xl mb-3">📜</span>
                    <h3 className="font-magic text-xl">Begin Examination</h3>
                </button>
            </div>
        </div>
    );
};

export default Test;
