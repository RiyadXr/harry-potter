import React, { useState, useMemo } from 'react';
import { HouseTheme, House, View, ShopItem, CreatureType } from '../types';
import { TRIVIA_QUESTIONS, ICONS, SHOP_ITEMS, CREATURES, PET_QUIZ_QUESTIONS, PET_ICONS } from '../constants';
import Modal from './Modal';
import { getAnimationForItem } from '../utils/animations';
import { getPetMatch } from '../services/geminiService';

interface SettingsProps {
    theme: HouseTheme;
    house: House | null;
    setView: (view: View) => void;
    onLeaveHouse: () => void;
    purchasedItems: Record<string, number>;
    adoptedCreature: any; // Using 'any' to avoid breaking changes if type is not available
    onAdoptCreature: (creatureId: CreatureType) => void;
    showWiseOwl: boolean;
    setShowWiseOwl: (show: boolean) => void;
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

// --- Pet Quiz Modal Component ---
interface PetQuizModalProps {
    theme: HouseTheme;
    onClose: () => void;
    onAdopt: (creatureId: CreatureType) => void;
}

const PetQuizModal: React.FC<PetQuizModalProps> = ({ theme, onClose, onAdopt }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{ creature: CreatureType, reasoning: string } | null>(null);
    
    const handleAnswer = async (value: string) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (currentQuestion < PET_QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setIsLoading(true);
            const apiKey = localStorage.getItem('geminiApiKey');
            if(!apiKey) { 
                setResult({ creature: CreatureType.PygmyPuff, reasoning: "The Room of Requirement's magic is faint without the Headmaster's key, but it has provided a simple, cuddly friend for you." });
            } else {
                const decision = await getPetMatch(newAnswers, apiKey);
                setResult(decision);
            }
            setIsLoading(false);
        }
    };

    const handleConfirmAdoption = () => {
        if (result) {
            onAdopt(result.creature);
        }
    };

    if (isLoading) {
        return (
            <Modal title="The Room is Deciding..." onClose={onClose} theme={theme} showFooterButton={false}>
                <div className="text-center p-8 flex flex-col items-center justify-center space-y-6 min-h-[200px]">
                    <div className={`animate-spin-slow animate-magical-glow ${theme.accent} text-2xl`}>✨</div>
                    <p className={`${theme.text}`}>A companion is materializing...</p>
                </div>
            </Modal>
        );
    }

    if (result) {
        const creatureDetails = CREATURES.find(c => c.id === result.creature);
        return (
            <Modal title="A Companion Appears!" onClose={onClose} theme={theme} showFooterButton={false}>
                <div className="text-center">
                    <div className={`w-40 h-40 rounded-full mx-auto mb-4 flex items-center justify-center ${theme.secondary}`}>
                        <span className="text-8xl">{creatureDetails && PET_ICONS[creatureDetails.id]}</span>
                    </div>
                    <h3 className={`text-5xl font-magic ${theme.accent} mb-4`}>{creatureDetails?.name}!</h3>
                    <p className={`${theme.text} mb-6`}>{result.reasoning}</p>
                    <button onClick={handleConfirmAdoption} className={`px-6 py-2 rounded-lg shadow-md transition-all-smooth transform hover:scale-105 ${theme.primary} ${theme.text} font-magic`}>
                        Welcome them!
                    </button>
                </div>
            </Modal>
        );
    }
    
    const question = PET_QUIZ_QUESTIONS[currentQuestion];
    return (
        <Modal title="Choose a Companion" onClose={onClose} theme={theme} showFooterButton={false}>
            <div key={currentQuestion} className={`p-4 rounded-lg bg-black bg-opacity-10 animate-fade-in`}>
                <h3 className="text-xl mb-6">{question.question}</h3>
                <div className="grid grid-cols-1 gap-4">
                    {question.options.map(option => (
                        <button
                            key={option.value}
                            onClick={() => handleAnswer(option.value)}
                            className={`p-4 rounded-lg shadow-md transition-all-smooth transform hover:scale-105 ${theme.primary} ${theme.text}`}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            </div>
        </Modal>
    );
};


const Settings: React.FC<SettingsProps> = ({ theme, house, onLeaveHouse, purchasedItems, adoptedCreature, onAdoptCreature, showWiseOwl, setShowWiseOwl }) => {
    const [isTriviaModalOpen, setIsTriviaModalOpen] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState('');
    const [isLetterOpen, setIsLetterOpen] = useState(false);
    const [animatingItemId, setAnimatingItemId] = useState<string | null>(null);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isPetQuizOpen, setIsPetQuizOpen] = useState(false);

    const currentQuestion = useMemo(() => {
        return TRIVIA_QUESTIONS[Math.floor(Math.random() * TRIVIA_QUESTIONS.length)];
    }, [isTriviaModalOpen]);
    
    const userTrophies = useMemo(() => {
        return SHOP_ITEMS.filter(item => (purchasedItems[item.id] || 0) > 0);
    }, [purchasedItems]);

    const handleTrophyClick = (item: ShopItem) => {
        if (animatingItemId) return; // Prevent re-triggering animation
        setAnimatingItemId(item.id);
        setTimeout(() => setAnimatingItemId(null), 2000); // Animation duration
    };

    const getTrophyStyle = (count: number): string => {
        if (count >= 10) return 'shadow-[0_0_15px_3px_rgba(255,215,0,0.8)] animate-magical-glow'; // Legendary
        if (count >= 5) return 'shadow-[0_0_12px_2px_rgba(192,192,192,0.7)]'; // Precious
        if (count >= 2) return 'shadow-[0_0_8px_1px_rgba(255,255,255,0.5)]'; // Valuable
        return '';
    };

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
             {animatingItemId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pointer-events-none">
                    <div className={`text-8xl ${getAnimationForItem(animatingItemId)}`}>
                        {SHOP_ITEMS.find(i => i.id === animatingItemId)?.icon}
                    </div>
                </div>
            )}
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
                    <h3 className={`font-magic text-xl mb-2 ${theme.accent}`}>{adoptedCreature ? 'Find a New Companion' : 'Adopt a Magical Creature'}</h3>
                    <p className="mb-3">{adoptedCreature ? 'Perhaps another creature is calling to you?' : 'The Room has provided a path to the Menagerie. Answer its call to find a companion!'}</p>
                    <button 
                        onClick={() => setIsPetQuizOpen(true)}
                        className={`px-4 py-2 rounded-lg shadow-md transition-all-smooth ${theme.primary} hover:opacity-80 flex items-center space-x-2`}
                    >
                        <span>{adoptedCreature ? 'Start the Search' : 'Begin the Quiz'}</span>
                        <span>🐾</span>
                    </button>
                </div>

                <div className="p-4 rounded-lg bg-black bg-opacity-10">
                    <h3 className={`font-magic text-xl mb-2 ${theme.accent}`}>Trophy Room</h3>
                    {userTrophies.length === 0 ? (
                        <p className="opacity-75">Your collection is empty. Visit the Diagon Alley Emporium by tapping your Galleons in the header!</p>
                    ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                            {userTrophies.map(trophy => {
                                const count = purchasedItems[trophy.id] || 0;
                                const trophyStyle = getTrophyStyle(count);

                                return (
                                <button 
                                    key={trophy.id} 
                                    onClick={() => handleTrophyClick(trophy)}
                                    className="flex flex-col items-center text-center group transform hover:scale-110 transition-transform duration-300" 
                                    title={`${trophy.name} (x${count}): ${trophy.description}`}
                                >
                                    <div className={`relative w-16 h-16 rounded-lg ${theme.primary} flex items-center justify-center text-4xl group-hover:shadow-lg transition-all duration-300 ${trophyStyle}`}>
                                        {trophy.icon}
                                        {count > 1 && (
                                            <span className={`absolute -top-2 -right-2 bg-yellow-500 text-black font-sans text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 ${theme.border}`}>
                                                {count}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs mt-1 font-magic">{trophy.name}</p>
                                </button>
                            )})}
                        </div>
                    )}
                </div>

                <div className="p-4 rounded-lg bg-black bg-opacity-10">
                    <h3 className={`font-magic text-xl mb-2 ${theme.accent}`}>Magical Preferences</h3>
                    <div className="flex items-center justify-between">
                        <p className="pr-4">Show the Wise Owl for questions.</p>
                        <label className="switch">
                            <input type="checkbox" checked={showWiseOwl} onChange={() => setShowWiseOwl(!showWiseOwl)} />
                            <span className="slider"></span>
                        </label>
                    </div>
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

            <div className="text-center mt-8">
                <button
                    onClick={() => setIsInfoModalOpen(true)}
                    className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center ${theme.primary} ${theme.text} font-serif italic text-lg animate-magical-glow transition-transform duration-300 hover:scale-110`}
                    aria-label="Show credits"
                >
                    i
                </button>
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

             {isPetQuizOpen && (
                <PetQuizModal 
                    theme={theme}
                    onClose={() => setIsPetQuizOpen(false)}
                    onAdopt={onAdoptCreature}
                />
            )}

            {isInfoModalOpen && (
                <Modal
                    title="A Secret Note"
                    onClose={() => setIsInfoModalOpen(false)}
                    theme={theme}
                    footerButtonText="❤️"
                >
                    <p className="text-center text-xl italic p-4">
                        Made only for you by Riyad &lt;3
                    </p>
                </Modal>
            )}
        </div>
    );
};

export default Settings;