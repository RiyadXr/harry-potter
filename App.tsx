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
import { House, View, JournalEntry, Task, Mood } from './types';
import { HOUSE_THEMES, WIZARDING_FACTS } from './constants';

const App: React.FC = () => {
    const [view, setView] = useState<View>(View.Journal);
    const [house, setHouse] = useState<House | null>(null);
    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [moods, setMoods] = useState<Mood[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [footerFact, setFooterFact] = useState('');
    const userName = "Onamika";

    // Load all data from local storage on initial render
    useEffect(() => {
        const storedHouse = localStorage.getItem('hogwartsHouse') as House | null;
        if (storedHouse) {
            setHouse(storedHouse);
            setView(View.Journal);
        } else {
            setView(View.Sorting);
        }

        try {
            const storedEntries = localStorage.getItem('journalEntries');
            if (storedEntries) setJournalEntries(JSON.parse(storedEntries));
        } catch (e) { console.error("Could not parse journal entries", e); }
        
        try {
            const storedTasks = localStorage.getItem('remembrallTasks');
            if (storedTasks) setTasks(JSON.parse(storedTasks));
        } catch (e) { console.error("Could not parse remembrall tasks", e); }

        try {
            const storedMoods = localStorage.getItem('potionMoods');
            if (storedMoods) setMoods(JSON.parse(storedMoods));
        } catch (e) { console.error("Could not parse potion moods", e); }

        const randomIndex = Math.floor(Math.random() * WIZARDING_FACTS.length);
        setFooterFact(WIZARDING_FACTS[randomIndex]);
        
        setIsLoading(false);
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
                 // Fallback to sorting if no house is set, otherwise to journal
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
            {view !== View.Sorting && (
                <Navigation currentView={view} setView={setView} theme={theme} house={house} />
            )}
        </div>
    );
};

export default App;