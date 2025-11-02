import React from 'react';
import { House, HouseTheme } from '../types';

interface HeaderProps {
    house: House | null;
    theme: HouseTheme;
}

const HouseCrest: React.FC<{ house: House }> = ({ house }) => {
    const crests: Record<House, string> = {
        [House.Gryffindor]: '🦁',
        [House.Slytherin]: '🐍',
        [House.Ravenclaw]: '🦅',
        [House.Hufflepuff]: '🦡',
    };
    return <span className="text-4xl">{crests[house]}</span>;
};

const Header: React.FC<HeaderProps> = ({ house, theme }) => {
    return (
        <header className={`p-3 sm:p-4 rounded-t-lg shadow-lg flex justify-between items-center transition-colors duration-500 ${theme.primary} ${theme.text} animate-slide-down`}>
            <div className="flex items-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-magic">
                    Onamika's Potter Journal
                </h1>
            </div>
            {house && (
                <div className={`flex items-center space-x-3 p-2 rounded-lg ${theme.secondary} transition-all-smooth`}>
                    <HouseCrest house={house} />
                    <span className="hidden md:block font-magic">{house}</span>
                </div>
            )}
        </header>
    );
};

export default Header;