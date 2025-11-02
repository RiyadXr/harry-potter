import React from 'react';
import { Mood, HouseTheme } from '../types';
import { POTIONS } from '../constants';

interface MoodTrackerProps {
    moods: Mood[];
    setMoods: React.Dispatch<React.SetStateAction<Mood[]>>;
    theme: HouseTheme;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ moods, setMoods, theme }) => {
    
    const addMood = (potion: typeof POTIONS[0]) => {
        const today = new Date().toDateString();
        const newMood: Mood = { id: Date.now(), date: today, potion: potion.name, color: potion.color };

        // Replace today's mood if it already exists
        const otherDaysMoods = moods.filter(m => m.date !== today);
        setMoods([newMood, ...otherDaysMoods].slice(0, 35)); // Limit to 35 entries
    };

    const getMoodForDate = (day: number, month: number, year: number): Mood | undefined => {
        const dateStr = new Date(year, month, day).toDateString();
        return moods.find(m => m.date === dateStr);
    };

    const renderCalendar = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const calendarDays = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="w-full aspect-square border border-transparent"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const mood = getMoodForDate(day, month, year);
            const isToday = day === today.getDate();
            calendarDays.push(
                <div key={day} className={`w-full aspect-square rounded-full flex items-center justify-center text-xs border-2 transition-all-smooth ${isToday ? theme.border : 'border-transparent'} ${mood ? mood.color : theme.primary.replace('bg-','bg-opacity-20 ')}`}>
                    {day}
                </div>
            );
        }

        return calendarDays;
    };

    return (
        <div className={`${theme.text}`}>
            <h2 className={`text-3xl font-magic mb-4 border-b-2 pb-2 ${theme.border}`}>Potions Class: Moods</h2>
            <p className="mb-6 text-center">Select today's potion to record your mood.</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4 mb-8">
                {POTIONS.map(potion => (
                    <button
                        key={potion.name}
                        onClick={() => addMood(potion)}
                        className={`p-2 rounded-lg shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition-all-smooth ${potion.color}`}
                    >
                        <span className="text-2xl sm:text-4xl">🧪</span>
                        <span className="mt-2 text-center text-black font-bold font-magic text-xs sm:text-sm">{potion.name}</span>
                    </button>
                ))}
            </div>
            
            <h3 className="text-xl sm:text-2xl font-magic mb-4 text-center">This Month's Moods</h3>
             <div className="grid grid-cols-7 gap-1 p-2 sm:p-4 rounded-lg bg-black bg-opacity-10 place-items-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day} className="font-bold text-xs">{day}</div>)}
                {renderCalendar()}
            </div>
        </div>
    );
};

export default MoodTracker;