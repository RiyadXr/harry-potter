import React from 'react';
import { House, HouseTheme, View } from '../types';

interface HeaderProps {
    house: House | null;
    theme: HouseTheme;
    rewards: number;
    setView: (view: View) => void;
    onCrestClick: () => void;
    isMuted: boolean;
    toggleMute: () => void;
}

const HouseCrest: React.FC<{ house: House }> = ({ house }) => {
    const crests: Record<House, string> = {
        [House.Gryffindor]: '🦁',
        [House.Slytherin]: '🐍',
        [House.Ravenclaw]: '🦅',
        [House.Hufflepuff]: '🦡',
    };
    return <span className="text-2xl">{crests[house]}</span>;
};

const Header: React.FC<HeaderProps> = ({ house, theme, rewards, setView, onCrestClick, isMuted, toggleMute }) => {
    return (
        <header className={`p-3 sm:p-4 rounded-t-lg shadow-lg flex justify-between items-center transition-colors duration-500 ${theme.primary} ${theme.text} animate-slide-down`}>
            <div className="flex items-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-magic">
                    Onamika's Potter Journal
                </h1>
            </div>
            {house && (
                <div className="flex items-center space-x-2">
                     <button
                        onClick={toggleMute}
                        aria-label={isMuted ? "Unmute music" : "Mute music"}
                        className={`flex items-center justify-center p-2 rounded-lg ${theme.secondary} transition-all-smooth hover:shadow-inner hover:brightness-110`}
                     >
                        <span className="text-xl">{isMuted ? '🔇' : '🔊'}</span>
                    </button>
                     <button 
                        onClick={() => setView(View.Shop)}
                        aria-label="Open the shop"
                        className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${theme.secondary} transition-all-smooth hover:shadow-inner hover:brightness-110`}
                     >
                        <span className="font-bold text-base">{rewards}</span>
                        <span className="text-xl" role="img" aria-label="Galleons">💰</span>
                    </button>
                    <button
                        onClick={onCrestClick}
                        aria-label={`View details for ${house} house`}
                        className={`flex items-center space-x-2 px-2 py-1 rounded-lg ${theme.secondary} transition-all-smooth hover:shadow-inner hover:brightness-110`}
                    >
                        <HouseCrest house={house} />
                        <span className="hidden md:block font-magic text-sm">{house}</span>
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;