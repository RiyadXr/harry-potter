import React, { useState, useEffect } from 'react';
import { HouseTheme, House, TriviaQuestion, CharacterQuizQuestion, CharacterMatchResult, HarryPotterCharacter, View } from '../types';
import { ALL_EXAM_QUESTIONS, EXAM_TITLES, CHARACTER_QUIZ_QUESTIONS, HARRY_POTTER_CHARACTERS } from '../constants';
import { getCharacterMatch } from '../services/geminiService';

interface TestProps {
    theme: HouseTheme;
    userName: string;
    house: House | null;
    addRewards: (amount: number) => void;
    addHousePoints: (amount: number) => void;
    setView: (view: View) => void;
}

interface CurrentExam {
    name: string;
    questions: TriviaQuestion[];
}

// --- Character Quiz Sub-Component ---
const CharacterQuiz: React.FC<{ theme: HouseTheme, userName: string, onBack: () => void }> = ({ theme, userName, onBack }) => {
    const [questions, setQuestions] = useState<CharacterQuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<{ question: string; answer: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<CharacterMatchResult | null>(null);

    useEffect(() => {
        // Start a new quiz on mount
        const shuffled = [...CHARACTER_QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 5)); // Select 5 random questions
    }, []);

    const handleAnswer = async (answer: string) => {
        const newAnswers = [...answers, { question: questions[currentIndex].question, answer }];
        setAnswers(newAnswers);

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsLoading(true);
            const apiKey = localStorage.getItem('geminiApiKey');
            if (!apiKey) {
                setResult({
                    characterName: "Squib",
                    reasoning: "The magical connection is faint. The Headmaster's secret key must be provided to reveal your true magical counterpart. Please set it via the Sorting Hat screen."
                });
            } else {
                const matchResult = await getCharacterMatch(newAnswers, apiKey);
                setResult(matchResult);
            }
            setIsLoading(false);
        }
    };

    const resetQuiz = () => {
        const shuffled = [...CHARACTER_QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 5));
        setCurrentIndex(0);
        setAnswers([]);
        setResult(null);
    };

    if (isLoading) {
        return (
            <div className={`${theme.text} text-center p-8 flex flex-col items-center justify-center space-y-6 min-h-[300px]`}>
                <div className={`animate-spin-slow animate-magical-glow ${theme.accent} text-2xl`}>✨</div>
                <h2 className={`text-3xl font-magic ${theme.accent} animate-pulse`}>Gazing into the Crystal Ball...</h2>
                <p>The mists are clearing...</p>
            </div>
        );
    }

    if (result) {
        const characterDetails = HARRY_POTTER_CHARACTERS.find(c => c.name === result.characterName);
        return (
            <div className={`${theme.text} text-center animate-fade-in-up`}>
                <h2 className={`text-3xl font-magic mb-4 border-b-2 pb-2 ${theme.border}`}>Your Magical Twin is...</h2>
                <div className={`p-4 rounded-lg bg-black/20`}>
                    <h3 className={`text-5xl font-magic ${theme.accent} mb-2`}>{result.characterName}</h3>
                    {characterDetails && (
                        <>
                            <p className="font-bold mb-1">({characterDetails.house} | {characterDetails.keyTraits})</p>
                            <p className="text-sm italic opacity-80 mb-4">{characterDetails.description}</p>
                        </>
                    )}
                    <p className="whitespace-pre-wrap text-left">{result.reasoning}</p>
                </div>
                <div className="mt-6 flex justify-center space-x-4">
                    <button onClick={onBack} className={`px-6 py-2 rounded-lg shadow-md transition-all-smooth transform hover:scale-105 ${theme.secondary} ${theme.text} font-magic`}>
                        Back to Menu
                    </button>
                    <button onClick={resetQuiz} className={`px-6 py-2 rounded-lg shadow-md transition-all-smooth transform hover:scale-105 ${theme.primary} ${theme.text} font-magic`}>
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    if (questions.length === 0) return <div>Preparing the divination...</div>;

    const question = questions[currentIndex];
    return (
        <div className={`${theme.text} animate-fade-in`} key={currentIndex}>
            <h2 className={`text-3xl font-magic mb-4 border-b-2 pb-2 ${theme.border}`}>Character Divination</h2>
            <p className="mb-6 text-sm opacity-80">Question {currentIndex + 1} of {questions.length}</p>

            <div className={`p-4 sm:p-6 rounded-lg border-2 ${theme.border} bg-black bg-opacity-10`}>
                <h3 className="text-xl sm:text-2xl mb-6">{question.question}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map(option => (
                        <button
                            key={option.trait}
                            onClick={() => handleAnswer(option.text)}
                            className={`p-4 rounded-lg shadow-md transition-all-smooth transform hover:scale-105 ${theme.primary} ${theme.text}`}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            </div>
             <button onClick={onBack} className={`mt-6 text-sm ${theme.accent} opacity-70 hover:opacity-100`}>
                &larr; Back to Test Menu
            </button>
        </div>
    );
};


// --- Main Test Component ---
const Test: React.FC<TestProps> = ({ theme, userName, house, addRewards, addHousePoints, setView }) => {
    const [testView, setTestView] = useState<'main' | 'exam' | 'character'>('main');
    
    // State for Examination Hall
    const [currentExam, setCurrentExam] = useState<CurrentExam | null>(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [examCooldownEndTime, setExamCooldownEndTime] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState('');

    // Load and manage cooldown timer
    useEffect(() => {
        const storedCooldownEnd = localStorage.getItem('examCooldownEndTime');
        if (storedCooldownEnd) {
            const endTime = parseInt(storedCooldownEnd, 10);
            if (endTime > Date.now()) {
                setExamCooldownEndTime(endTime);
            }
        }
    }, []);

    useEffect(() => {
        if (!examCooldownEndTime) return;

        const timer = setInterval(() => {
            const now = Date.now();
            const remaining = examCooldownEndTime - now;

            if (remaining <= 0) {
                clearInterval(timer);
                setTimeLeft('');
                setExamCooldownEndTime(null);
                localStorage.removeItem('examCooldownEndTime');
            } else {
                const hours = Math.floor(remaining / (1000 * 60 * 60));
                const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
                setTimeLeft(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [examCooldownEndTime]);

    const startCooldown = () => {
        const twoHours = 2 * 60 * 60 * 1000;
        const endTime = Date.now() + twoHours;
        localStorage.setItem('examCooldownEndTime', String(endTime));
        setExamCooldownEndTime(endTime);
    };

    const handleBeginExam = () => {
        if (examCooldownEndTime && examCooldownEndTime > Date.now()) return;

        const randomTitle = EXAM_TITLES[Math.floor(Math.random() * EXAM_TITLES.length)];
        const shuffledQuestions = [...ALL_EXAM_QUESTIONS].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffledQuestions.slice(0, 5);

        setCurrentExam({ name: randomTitle, questions: selectedQuestions });
        setQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsFinished(false);
        setTestView('exam');
    };

    const handleAnswerSubmit = () => {
        if (!selectedAnswer || !currentExam) return;
        const isCorrect = selectedAnswer === currentExam.questions[questionIndex].correctAnswer;
        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
        }

        if (questionIndex < currentExam.questions.length - 1) {
            setSelectedAnswer(null);
            setQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            const finalScore = score + (isCorrect ? 1 : 0);
             if (finalScore > currentExam.questions.length / 2) {
                addRewards(50);
                addHousePoints(50);
            }
            setIsFinished(true);
            startCooldown();
        }
    };

    // FIX: Define isExamOnCooldown to resolve "Cannot find name" errors.
    const isExamOnCooldown = !!examCooldownEndTime && examCooldownEndTime > Date.now();

    if (testView === 'character') {
        return <CharacterQuiz theme={theme} userName={userName} onBack={() => setTestView('main')} />;
    }

    if (testView === 'exam') {
        if (isFinished && currentExam) {
            const passed = score > currentExam.questions.length / 2;
            const rewardMessage = `Outstanding, ${userName}! Your knowledge is truly impressive. You've earned 50 Galleons and 50 points for ${house}!`;
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
                        onClick={() => setView(View.GreatHall)}
                        className={`mt-6 px-6 py-2 rounded-lg shadow-md transition-all-smooth transform hover:scale-105 ${theme.primary} ${theme.text} font-magic`}
                    >
                        Back to Great Hall
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
                                    <input type="radio" name="exam-option" value={option} checked={selectedAnswer === option} onChange={() => setSelectedAnswer(option)} className="sr-only" />
                                    <div className={`h-5 w-5 rounded-full border-2 flex-shrink-0 transition-all-smooth ${theme.border} ${selectedAnswer === option ? 'bg-yellow-400' : ''}`}></div>
                                    <span className="ml-3">{option}</span>
                                </label>
                            ))}
                        </div>
                        <div className="text-right">
                            <button onClick={handleAnswerSubmit} disabled={!selectedAnswer} className={`px-6 py-2 rounded-lg shadow-md transition-all-smooth ${!selectedAnswer ? 'bg-gray-500 cursor-not-allowed' : `${theme.primary} hover:opacity-80`}`}>
                                {questionIndex === currentExam.questions.length - 1 ? 'Finish Exam' : 'Next Question'}
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    }

    // Main menu view, which is now part of another component (GreatHall).
    // This direct return is for when Test is rendered standalone, which it shouldn't be anymore.
    return (
        <div className={`${theme.text} text-center`}>
             <h2 className={`text-3xl font-magic mb-4 border-b-2 pb-2 ${theme.border}`}>Divination & Examinations</h2>
            <p className="mb-6">Test your knowledge in the Examination Hall or discover your magical counterpart through Divination.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                 <button 
                    onClick={handleBeginExam} 
                    disabled={isExamOnCooldown}
                    className={`p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center transition-all-smooth ${isExamOnCooldown ? 'bg-gray-700/50 cursor-not-allowed' : `${theme.primary} transform hover:scale-105`} w-full sm:w-52 h-40`}
                >
                    <span className="text-5xl mb-3">📜</span>
                    <h3 className="font-magic text-xl">
                        {isExamOnCooldown ? timeLeft : 'Examination Hall'}
                    </h3>
                </button>
                <button onClick={() => setTestView('character')} className={`p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center transform hover:scale-105 transition-all-smooth ${theme.primary} w-full sm:w-52 h-40`}>
                    <span className="text-5xl mb-3">✨</span>
                    <h3 className="font-magic text-xl">Character Divination</h3>
                </button>
            </div>
        </div>
    );
};

export default Test;
