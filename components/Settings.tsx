
import React from 'react';
import { HouseTheme, House, View } from '../types';

interface SettingsProps {
    theme: HouseTheme;
    house: House | null;
    setView: (view: View) => void;
    onLeaveHouse: () => void;
}

const Settings: React.FC<SettingsProps> = ({ theme, house, onLeaveHouse }) => {
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
                    <p className="mb-3">Feel the Sorting Hat may have made a mistake? You can ask to be re-sorted.</p>
                    <button 
                        onClick={onLeaveHouse}
                        disabled={!house}
                        className={`px-4 py-2 rounded-lg shadow-md transition-all ${!house ? 'bg-gray-500 cursor-not-allowed' : `${theme.primary} hover:opacity-80`}`}
                    >
                        Visit the Sorting Hat Again
                    </button>
                    {!house && <p className="mt-2 text-sm opacity-70">You must be sorted into a house first!</p>}
                </div>
            </div>
        </div>
    );
};

export default Settings;
