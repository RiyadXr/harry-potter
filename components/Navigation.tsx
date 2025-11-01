import React from 'react';
import { View, HouseTheme, House } from '../types';
import { ICONS } from '../constants';

interface NavigationProps {
    currentView: View;
    setView: (view: View) => void;
    theme: HouseTheme;
    house: House | null;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, theme, house }) => {
    const navItems = [
        { view: View.Journal, icon: ICONS.JOURNAL, label: 'Journal' },
        { view: View.Remembrall, icon: ICONS.REMEMBERALL, label: 'Tasks' },
        { view: View.Decrees, icon: ICONS.DECREES, label: 'Decrees' },
        { view: View.Potions, icon: ICONS.POTIONS, label: 'Moods' },
        { view: View.Settings, icon: ICONS.SETTINGS, label: 'Room of Req.' },
    ];
    
    const activeTextClass = house === House.Hufflepuff ? 'text-white' : theme.text;
    const inactiveTextClass = house === House.Hufflepuff ? theme.text : `${theme.accent} hover:${theme.text}`;

    return (
        <nav className={`fixed bottom-0 left-0 right-0 z-50 p-2 ${theme.secondary} ${theme.border} border-t-2 shadow-lg flex justify-around items-center`}>
            {navItems.map(item => (
                <button
                    key={item.view}
                    onClick={() => setView(item.view)}
                    className={`flex flex-col items-center justify-center p-2 w-20 sm:w-24 rounded-lg transition-all duration-300 font-magic transform hover:scale-105 ${
                        currentView === item.view
                            ? `${theme.primary} ${activeTextClass} shadow-inner`
                            : `${inactiveTextClass}`
                    }`}
                >
                    {item.icon}
                    <span className="mt-1 text-xs text-center">{item.label}</span>
                </button>
            ))}
        </nav>
    );
};

export default Navigation;