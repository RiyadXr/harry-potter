import React from 'react';
import { Mood, HouseTheme } from '../types';

interface MoodCalendarProps {
    moods: Mood[];
    theme: HouseTheme;
}

const MoodCalendar: React.FC<MoodCalendarProps> = ({ moods, theme }) => {

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
                    <span className={`${mood ? 'text-black' : 'text-current'}`}>{day}</span>
                </div>
            );
        }

        return calendarDays;
    };

    return (
        <div className={`${theme.text}`}>
            <p className="mb-6 text-center">Your mood potions from the last month.</p>
             <div className="grid grid-cols-7 gap-1 p-2 sm:p-4 rounded-lg bg-black bg-opacity-10 place-items-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day} className="font-bold text-xs">{day}</div>)}
                {renderCalendar()}
            </div>
        </div>
    );
};

export default MoodCalendar;
