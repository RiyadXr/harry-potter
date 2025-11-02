import React from 'react';
import { View, HouseTheme, House } from '../types';
import { ICONS } from '../constants';

interface NavigationProps {
    currentView: View;
    setView: (view: View) => void;
    theme: HouseTheme;
    house: House | null;
}

const NavButton: React.FC<{
    label: string;
    icon: string | React.ReactNode;
    view: View;
    currentView: View;
    setView: (view: View) => void;
    theme: HouseTheme;
}> = ({ label, icon, view, currentView, setView, theme }) => {
    const isActive = currentView === view;
    return (
        <button
            onClick={() => setView(view)}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-all-smooth ${isActive ? theme.accent : 'opacity-70'}`}
        >
            <span className="text-2xl">{icon}</span>
            <span className={`text-xs font-magic ${isActive ? 'font-bold' : ''}`}>{label}</span>
        </button>
    );
};


const Navigation: React.FC<NavigationProps> = ({ currentView, setView, theme, house }) => {
    if (!house) return null;

    const navItems = [
        { label: 'Journal', icon: '📖', view: View.Journal },
        { label: 'Remembrall', icon: '🔮', view: View.Remembrall },
        { label: 'Potions', icon: '🧪', view: View.Potions },
        { label: 'Decrees', icon: '📜', view: View.Decrees },
        { label: 'Tests', icon: ICONS.TESTS, view: View.Test },
        { label: 'Settings', icon: '⚙️', view: View.Settings },
    ];

    return (
        <nav className={`fixed bottom-0 left-0 right-0 h-20 shadow-top-lg grid grid-cols-6 justify-around items-center sm:max-w-4xl sm:mx-auto sm:rounded-b-lg ${theme.primary} ${theme.text} animate-slide-up`}>
           {navItems.map(item => (
                <NavButton
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                    view={item.view}
                    currentView={currentView}
                    setView={setView}
                    theme={theme}
                />
           ))}
        </nav>
    );
};

export default Navigation;