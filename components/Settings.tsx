import React, { useState, useEffect } from 'react';
import { House, HouseTheme, View } from '../types';

interface SettingsProps {
    theme: HouseTheme;
    house: House | null;
    setView: (view: View) => void;
    onLeaveHouse: () => void;
}

const Settings: React.FC<SettingsProps> = ({ theme, house, setView, onLeaveHouse }) => {
    const [canResort, setCanResort] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');

    const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

    useEffect(() => {
        const lastSortTimestamp = localStorage.getItem('lastSortTimestamp');
        if (!lastSortTimestamp) {
            setCanResort(true);
            return;
        }

        const checkCooldown = () => {
            const now = new Date().getTime();
            const timeSinceSort = now - parseInt(lastSortTimestamp, 10);
            
            if (timeSinceSort >= COOLDOWN_MS) {
                setCanResort(true);
                setTimeLeft('');
                if (interval) clearInterval(interval);
            } else {
                setCanResort(false);
                const remaining = COOLDOWN_MS - timeSinceSort;
                const hours = Math.floor(remaining / (1000 * 60 * 60));
                const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft(`${hours}h ${minutes}m`);
            }
        };

        checkCooldown();
        const interval = setInterval(checkCooldown, 60000); // Check every minute
        
        return () => clearInterval(interval);
    }, []);

    const handleResort = () => {
        setView(View.Sorting);
    };
    
    return (
        <div className={`${theme.text}`}>
            <h2 className={`text-3xl font-magic mb-6 border-b-2 pb-2 ${theme.border}`}>Room of Requirement</h2>
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-magic mb-2">Re-Sorting Ceremony</h3>
                    <p className="mb-4 opacity-80">Feel the Sorting Hat may have erred? You may request a re-sorting once every 24 hours.</p>
                    <button 
                        onClick={handleResort}
                        disabled={!canResort}
                        className={`w-full px-4 py-3 rounded-lg shadow-md transition-all font-magic text-lg ${
                            canResort 
                            ? `${theme.primary} hover:scale-105 transform` 
                            : `${theme.primary.replace('bg-','bg-opacity-50')} cursor-not-allowed`
                        }`}
                    >
                        {canResort ? "Visit the Sorting Hat" : `Available in ${timeLeft}`}
                    </button>
                </div>

                {house && (
                     <div>
                        <h3 className="text-xl font-magic mb-2">Leave Your House</h3>
                        <p className="mb-4 opacity-80">If you wish to part ways with your current house, you may do so here. The Sorting Hat will await your return.</p>
                        <button 
                            onClick={onLeaveHouse}
                            className={`w-full px-4 py-3 rounded-lg shadow-md transition-all font-magic text-lg bg-red-900/50 border-2 ${theme.border} hover:bg-red-800/80`}
                        >
                            Leave {house}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;