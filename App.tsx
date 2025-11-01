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
import { House, View, JournalEntry, Task, Mood } from './types';
import { HOUSE_THEMES, WIZARDING_FACTS, ICONS } from './constants';

const App: React.FC = () => {
    const [view, setView] = useState<View>(View.Journal);
    const [house, setHouse] = useState<House | null>(null);
    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [moods, setMoods] = useState<Mood[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [footerFact, setFooterFact] = useState('');
    const [isBroomVisible, setIsBroomVisible] = useState(false);
    const [showFactModal, setShowFactModal] = useState(false);
    const [currentFact, setCurrentFact] = useState('');
    const userName = "Onamika";

    // Load all data from local storage on initial render
    useEffect(() => {
        try {
            // --- House Data Validation ---
            const storedHouse = localStorage.getItem('hogwartsHouse') as House | null;
            if (storedHouse && Object.values(House).includes(storedHouse)) {
                setHouse(storedHouse);
                setView(View.Journal);
            } else {
                setView(View.Sorting);
            }

            // --- Journal Entries Validation ---
            const storedEntries = localStorage.getItem('journalEntries');
            if (storedEntries) {
                const parsedEntries = JSON.parse(storedEntries);
                if (Array.isArray(parsedEntries)) {
                    setJournalEntries(parsedEntries);
                }
            }
            
            // --- Tasks Validation ---
            const storedTasks = localStorage.getItem('remembrallTasks');
            if (storedTasks) {
                const parsedTasks = JSON.parse(storedTasks);
                if (Array.isArray(parsedTasks)) {
                    setTasks(parsedTasks);
                }
            }

            // --- Moods Validation ---
            const storedMoods = localStorage.getItem('potionMoods');
            if (storedMoods) {
                const parsedMoods = JSON.parse(storedMoods);
                if(Array.isArray(parsedMoods)) {
                    setMoods(parsedMoods);
                }
            }
        } catch (e) {
            console.error("Error hydrating app from localStorage. Resetting state.", e);
            // If any critical error happens during hydration, reset to a clean slate.
            localStorage.clear();
            setHouse(null);
            setView(View.Sorting);
        } finally {
            // This will always run, ensuring the app becomes interactive.
            const randomIndex = Math.floor(Math.random() * WIZARDING_FACTS.length);
            setFooterFact(WIZARDING_FACTS[randomIndex]);
            setIsLoading(false);
        }
    }, []);

    // Save journal entries when they change
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
        }
    }, [journalEntries, isLoading]);

    // Save tasks when they change
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('remembrallTasks', JSON.stringify(tasks));
        }
    }, [tasks, isLoading]);

    // Save moods when they change
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('potionMoods', JSON.stringify(moods));
        }
    }, [moods, isLoading]);
    
    // useEffect for the floating broom
    useEffect(() => {
        let intervalId: ReturnType<typeof setTimeout>;
        let timeoutId: ReturnType<typeof setTimeout>;

        const showBroom = () => {
            if (view !== View.Sorting && !showFactModal) {
                setIsBroomVisible(true);
                timeoutId = setTimeout(() => {
                    setIsBroomVisible(false);
                }, 15000); // Broom disappears after 15 seconds
            }
        };

        const setRandomInterval = () => {
            const randomDelay = Math.random() * 30000 + 30000; // 30s to 60s
            intervalId = setTimeout(() => {
                showBroom();
                setRandomInterval();
            }, randomDelay);
        };
        
        setRandomInterval();

        return () => {
            clearTimeout(intervalId);
            clearTimeout(timeoutId);
        };
    }, [view, showFactModal]);

    const theme = useMemo(() => {
        return house ? HOUSE_THEMES[house] : {
            primary: 'bg-[#4a2c2a]',
            secondary: 'bg-[#6d4c41]',
            text: 'text-[#f3e9d2]',
            accent: 'text-[#c8a97e]',
            border: 'border-[#c8a97e]'
        };
    }, [house]);
    
    const handleSort = (result: { house: House, reasoning: string }) => {
        setHouse(result.house);
        localStorage.setItem('hogwartsHouse', result.house);
        localStorage.setItem('lastSortTimestamp', new Date().getTime().toString());
        setView(View.Journal);
    };

    const handleLeaveHouse = () => {
        setHouse(null);
        localStorage.removeItem('hogwartsHouse');
        localStorage.removeItem('lastSortTimestamp'); 
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

    if(isLoading) {
        return <LoadingScreen userName={userName} />;
    }

    const renderView = () => {
        switch (view) {
            case View.Journal:
                return <Journal entries={journalEntries} setEntries={setJournalEntries} theme={theme} userName={userName} />;
            case View.Remembrall:
                return <Remembrall tasks={tasks} setTasks={setTasks} theme={theme} userName={userName} />;
            case View.Potions:
                return <MoodTracker moods={moods} setMoods={setMoods} theme={theme} />;
            case View.Decrees:
                return <DailyDecrees theme={theme} userName={userName} house={house} />;
            case View.Settings:
                return <Settings theme={theme} house={house} setView={setView} onLeaveHouse={handleLeaveHouse} />;
            case View.Sorting:
                return <SortingHat onSort={handleSort} theme={theme} userName={userName} />;
            default:
                return house ? <Journal entries={journalEntries} setEntries={setJournalEntries} theme={theme} userName={userName} /> : <SortingHat onSort={handleSort} theme={theme} userName={userName} />;
        }
    };

    return (
        <div className="min-h-screen">
            <div className="p-4 pb-28 sm:max-w-4xl sm:mx-auto">
                <Header house={house} theme={theme} />
                <main className={`mt-4 p-4 sm:p-6 rounded-lg shadow-2xl transition-all duration-500 ${theme.secondary} ${theme.border} border-2`}>
                    {renderView()}
                </main>
                <footer className={`font-magic text-center mt-6 ${theme.accent} opacity-70 px-4`}>
                    <p>"{footerFact}"</p>
                </footer>
            </div>
            
            {isBroomVisible && (
                <button
                    onClick={handleBroomClick}
                    aria-label="Get a wizarding world fact"
                    className="fixed bottom-24 right-4 sm:right-8 z-40 p-3 bg-yellow-600 rounded-full shadow-lg cursor-pointer animate-float transform hover:scale-110 transition-transform"
                >
                    <span className="text-3xl">{ICONS.BROOM}</span>
                </button>
            )}
            
            {showFactModal && (
                <Modal
                    title="Did you know?"
                    onClose={() => setShowFactModal(false)}
                    theme={theme}
                    footerButtonText="Brilliant!"
                >
                    <p className="text-lg text-center">{currentFact}</p>
                </Modal>
            )}

            {view !== View.Sorting && (
                <Navigation currentView={view} setView={handleSetView} theme={theme} house={house} />
            )}
        </div>
    );
};

export default App;