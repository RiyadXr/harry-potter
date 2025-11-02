import React from 'react';
import { House, HouseTheme } from '../types';

interface HeaderProps {
    house: House | null;
    theme: HouseTheme;
    rewards: number;
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

const Header: React.FC<HeaderProps> = ({ house, theme, rewards }) => {
    return (
        <header className={`p-3 sm:p-4 rounded-t-lg shadow-lg flex justify-between items-center transition-colors duration-500 ${theme.primary} ${theme.text} animate-slide-down`}>
            <div className="flex items-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-magic">
                    Onamika's Potter Journal
                </h1>
            </div>
            {house && (
                <div className={`flex items-center space-x-2 px-2 py-1 rounded-lg ${theme.secondary} transition-all-smooth`}>
                    <div className="flex items-center space-x-1 border-r-2 pr-2" style={{ borderColor: 'rgba(255,255,255,0.2)'}}>
                        <span className="font-bold text-base">{rewards}</span>
                        <span className="text-xl" role="img" aria-label="Galleons">💰</span>
                    </div>
                    <HouseCrest house={house} />
                    <span className="hidden md:block font-magic text-sm">{house}</span>
                </div>
            )}
        </header>
    );
};

export default Header;