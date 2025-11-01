import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Journal from './components/Journal';
import Remembrall from './components/Remembrall';
import MoodTracker from './components/MoodTracker';
import SortingHat from './components/SortingHat';
import Settings from './components/Settings';
import DailyDecrees from './components/DailyDecrees';
import LoadingScreen from './components/LoadingScreen';
import Modal from './components/Modal';
import Test from './components/Test';
import { House, View, JournalEntry, Task, Mood } from './types';
import { HOUSE_THEMES, WIZARDING_FACTS, ICONS } from './constants';
import { getOwlAnswer } from './services/geminiService';

const App: React.FC = () => {
    const [view, setView] = useState<View>(View.Journal);
    const [house, setHouse] = useState<House | null>(null);
    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [moods, setMoods] = useState<Mood[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [footerFact, setFooterFact] = useState('');
    
    // Floating broom state
    const [isBroomVisible, setIsBroomVisible] = useState(false);
    const [showFactModal, setShowFactModal] = useState(false);
    const [currentFact, setCurrentFact] = useState('');
    
    // Ask the Owl state
    const [isOwlModalOpen, setIsOwlModalOpen] = useState(false);
    const [owlQuestion, setOwlQuestion] = useState('');
    const [owlAnswer, setOwlAnswer] = useState('');
    const [isOwlThinking, setIsOwlThinking] = useState(false);

    const userName = "Onamika";

    // Load all data from local storage on initial render
    useEffect(() => {
        try {
            const storedHouse = localStorage.getItem('hogwartsHouse') as House | null;
            if (storedHouse && Object.values(House).includes(storedHouse)) {
                setHouse(storedHouse);
                setView(View.Journal);
            } else {
                setView(View.Sorting);
            }
            const storedEntries = localStorage.getItem('journalEntries');
            if (storedEntries) {
                const parsedEntries = JSON.parse(storedEntries);
                if (Array.isArray(parsedEntries)) setJournalEntries(parsedEntries);
            }
            const storedTasks = localStorage.getItem('remembrallTasks');
            if (storedTasks) {
                const parsedTasks = JSON.parse(storedTasks);
                if (Array.isArray(parsedTasks)) setTasks(parsedTasks);
            }
            const storedMoods = localStorage.getItem('potionMoods');
            if (storedMoods) {
                const parsedMoods = JSON.parse(storedMoods);
                if(Array.isArray(parsedMoods)) setMoods(parsedMoods);
            }
        } catch (e) {
            console.error("Error hydrating app from localStorage. Resetting state.", e);
            localStorage.clear();
            setHouse(null);
            setView(View.Sorting);
        } finally {
            const randomIndex = Math.floor(Math.random() * WIZARDING_FACTS.length);
            setFooterFact(WIZARDING_FACTS[randomIndex]);
            setIsLoading(false);
        }
    }, []);

    // Save data hooks
    useEffect(() => { if (!isLoading) localStorage.setItem('journalEntries', JSON.stringify(journalEntries)); }, [journalEntries, isLoading]);
    useEffect(() => { if (!isLoading) localStorage.setItem('remembrallTasks', JSON.stringify(tasks)); }, [tasks, isLoading]);
    useEffect(() => { if (!isLoading) localStorage.setItem('potionMoods', JSON.stringify(moods)); }, [moods, isLoading]);
    
    // Floating broom effect
    useEffect(() => {
        let intervalId: ReturnType<typeof setTimeout>;
        let timeoutId: ReturnType<typeof setTimeout>;
        const showBroom = () => {
            if (view !== View.Sorting && !showFactModal && !isOwlModalOpen) {
                setIsBroomVisible(true);
                timeoutId = setTimeout(() => setIsBroomVisible(false), 15000);
            }
        };
        const setRandomInterval = () => {
            const randomDelay = Math.random() * 30000 + 30000;
            intervalId = setTimeout(() => { showBroom(); setRandomInterval(); }, randomDelay);
        };
        setRandomInterval();
        return () => { clearTimeout(intervalId); clearTimeout(timeoutId); };
    }, [view, showFactModal, isOwlModalOpen]);

    const theme = useMemo(() => {
        return house ? HOUSE_THEMES[house] : {
            primary: 'bg-[#4a2c2a]', secondary: 'bg-[#6d4c41]', text: 'text-[#f3e9d2]',
            accent: 'text-[#c8a97e]', border: 'border-[#c8a97e]'
        };
    }, [house]);
    
    const handleSort = (result: { house: House, reasoning: string }) => {
        setHouse(result.house);
        localStorage.setItem('hogwartsHouse', result.house);
        setView(View.Journal);
    };

    const handleLeaveHouse = () => {
        setHouse(null);
        localStorage.removeItem('hogwartsHouse');
        setView(View.Sorting);
    };
    
    const handleBroomClick = () => {
        const randomIndex = Math.floor(Math.random() * WIZARDING_FACTS.length);
        setCurrentFact(WIZARDING_FACTS[randomIndex]);
        setShowFactModal(true);
        setIsBroomVisible(false);
    };
    
    const handleSetView = (newView: View) => {
        setView(newView);
        const randomIndex = Math.floor(Math.random() * WIZARDING_FACTS.length);
        setFooterFact(WIZARDING_FACTS[randomIndex]);
    };

    const handleAskOwl = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!owlQuestion.trim()) return;

        setIsOwlThinking(true);
        setOwlAnswer('');
        const apiKey = localStorage.getItem('geminiApiKey');
        if (!apiKey) {
            setOwlAnswer("The owl huffs, unable to find the path. The Headmaster's secret key is required for this magic.");
            setIsOwlThinking(false);
            return;
        }
        const answer = await getOwlAnswer(owlQuestion, apiKey);
        setOwlAnswer(answer);
        setIsOwlThinking(false);
    };

    const handleCloseOwlModal = () => {
        setIsOwlModalOpen(false);
        setOwlQuestion('');
        setOwlAnswer('');
    };

    if(isLoading) {
        return <LoadingScreen userName={userName} />;
    }

    const renderView = () => {
        switch (view) {
            case View.Journal: return <Journal entries={journalEntries} setEntries={setJournalEntries} theme={theme} userName={userName} />;
            case View.Remembrall: return <Remembrall tasks={tasks} setTasks={setTasks} theme={theme} userName={userName} />;
            case View.Potions: return <MoodTracker moods={moods} setMoods={setMoods} theme={theme} />;
            case View.Decrees: return <DailyDecrees theme={theme} userName={userName} house={house} />;
            case View.Settings: return <Settings theme={theme} house={house} setView={setView} onLeaveHouse={handleLeaveHouse} />;
            case View.Sorting: return <SortingHat onSort={handleSort} theme={theme} userName={userName} />;
            case View.Test: return <Test theme={theme} userName={userName} house={house} />;
            default: return house ? <Journal entries={journalEntries} setEntries={setJournalEntries} theme={theme} userName={userName} /> : <SortingHat onSort={handleSort} theme={theme} userName={userName} />;
        }
    };

    return (
        <div className="min-h-screen">
             <button
                onClick={() => window.location.reload()}
                aria-label="Force refresh page"
                className={`fixed top-3 right-3 z-50 w-8 h-8 flex items-center justify-center ${theme.secondary} bg-opacity-70 backdrop-blur-sm rounded-full shadow-lg cursor-pointer hover:bg-opacity-90 transition-all`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${theme.accent}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.182-3.182m0-11.667a8.25 8.25 0 00-11.667 0L2.985 7.982" />
                </svg>
            </button>
            <div className="p-4 pb-28 sm:max-w-4xl sm:mx-auto">
                <Header house={house} theme={theme} />
                <main className={`mt-4 p-4 sm:p-6 rounded-lg shadow-2xl transition-all duration-500 ${theme.secondary} ${theme.border} border-2`}>
                    {renderView()}
                </main>
                <footer className={`font-magic text-center mt-6 ${theme.accent} opacity-70 px-4`}>
                    <p>"{footerFact}"</p>
                </footer>
            </div>
            
            {view !== View.Sorting && (
                <>
                    <button
                        onClick={() => { setIsOwlModalOpen(true); setIsBroomVisible(false); }}
                        aria-label="Ask the wise owl a question"
                        className="fixed bottom-24 left-4 sm:left-8 z-40 p-3 bg-gray-700 rounded-full shadow-lg cursor-pointer animate-float transform hover:scale-110 transition-transform"
                    >
                        <span className="text-3xl">{ICONS.OWL}</span>
                    </button>
                    {isBroomVisible && (
                        <button
                            onClick={handleBroomClick}
                            aria-label="Get a wizarding world fact"
                            className="fixed bottom-24 right-4 sm:right-8 z-40 p-3 bg-yellow-600 rounded-full shadow-lg cursor-pointer animate-float transform hover:scale-110 transition-transform"
                        >
                            <span className="text-3xl">{ICONS.BROOM}</span>
                        </button>
                    )}
                </>
            )}
            
            {showFactModal && (
                <Modal title="Did you know?" onClose={() => setShowFactModal(false)} theme={theme} footerButtonText="Brilliant!">
                    <p className="text-lg text-center">{currentFact}</p>
                </Modal>
            )}

            {isOwlModalOpen && (
                 <Modal
                    title="Ask the Wise Owl"
                    onClose={handleCloseOwlModal}
                    theme={theme}
                    showFooterButton={false}
                >
                    {!owlAnswer && !isOwlThinking && (
                        <form onSubmit={handleAskOwl}>
                            <textarea
                                className={`w-full p-3 rounded-md bg-transparent border-2 ${theme.border} ${theme.primary.replace('bg-', 'bg-opacity-20 ')} focus:outline-none focus:ring-2 ${theme.border} transition-all`}
                                rows={3}
                                placeholder="Ask about anything in the wizarding world..."
                                value={owlQuestion}
                                onChange={(e) => setOwlQuestion(e.target.value)}
                            />
                            <div className="text-center mt-4">
                                <button type="submit" className={`px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 ${theme.primary} ${theme.text} font-magic`}>
                                    Send Owl Post
                                </button>
                            </div>
                        </form>
                    )}
                    {isOwlThinking && (
                         <div className="text-center p-8 flex flex-col items-center justify-center space-y-4">
                            <div className={`animate-spin-slow ${theme.accent}`}>{ICONS.OWL}</div>
                            <p className={`${theme.text}`}>The owl is fetching your answer...</p>
                        </div>
                    )}
                    {owlAnswer && (
                        <div>
                            <div className="max-h-64 overflow-y-auto pr-2">
                                <p className="whitespace-pre-wrap">{owlAnswer}</p>
                            </div>
                             <div className="text-center mt-4 flex justify-center space-x-4">
                                <button onClick={() => setOwlAnswer('')} className={`px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 ${theme.primary} ${theme.text} font-magic`}>
                                    Ask Another
                                </button>
                                <button onClick={handleCloseOwlModal} className={`px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 ${theme.secondary} ${theme.text} font-magic`}>
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>
            )}

            {view !== View.Sorting && (
                <Navigation currentView={view} setView={handleSetView} theme={theme} house={house} />
            )}
        </div>
    );
};

export default App;