import React, { useState, useEffect } from 'react';
import { HouseTheme, DailyTask, House } from '../types';
import { WIZARDING_TASKS_POOL } from '../constants';

interface DailyDecreesProps {
    theme: HouseTheme;
    userName: string;
    house: House | null;
}

const getTodayStorageKey = () => {
    const today = new Date();
    return `decrees-${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
}

const DailyDecrees: React.FC<DailyDecreesProps> = ({ theme, userName, house }) => {
    const [tasks, setTasks] = useState<DailyTask[]>([]);

    useEffect(() => {
        const storageKey = getTodayStorageKey();
        const storedTasks = localStorage.getItem(storageKey);

        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        } else {
            // New day, shuffle and pick 5 new random tasks
            const shuffled = [...WIZARDING_TASKS_POOL].sort(() => 0.5 - Math.random());
            const newTasks = shuffled.slice(0, 5).map(task => ({ ...task, completed: false }));

            setTasks(newTasks);
            localStorage.setItem(storageKey, JSON.stringify(newTasks));
            
            // Clean up old decree keys to prevent localStorage bloat
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('decrees-') && key !== storageKey) {
                    localStorage.removeItem(key);
                }
            });
        }
    }, []);

    const toggleTask = (id: string) => {
        const newTasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
        localStorage.setItem(getTodayStorageKey(), JSON.stringify(newTasks));
    };
    
    const allTasksCompleted = tasks.length > 0 && tasks.every(t => t.completed);

    return (
        <div className={`${theme.text}`}>
            <h2 className={`text-3xl font-magic mb-4 border-b-2 pb-2 ${theme.border}`}>Ministry Decrees</h2>
            <p className={`mb-6 opacity-80`}>
                Educational Decree No. 24: All students are required to complete the following tasks to ensure a proper magical education.
            </p>
            
            <div className="space-y-4">
                {tasks.map(task => (
                    <div 
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`p-4 rounded-lg flex items-center cursor-pointer transition-all duration-300 border-2 ${theme.border} ${task.completed ? `bg-green-800/30` : `bg-black/10`}`}
                    >
                        <input
                            type="checkbox"
                            readOnly
                            checked={task.completed}
                            className="form-checkbox h-6 w-6 rounded-full bg-transparent border-2 border-current text-yellow-400 focus:ring-0 focus:ring-offset-0 flex-shrink-0"
                        />
                        <span className={`ml-4 text-lg ${task.completed ? 'line-through opacity-70' : ''}`}>
                            {task.text} <span className="text-sm opacity-80">({task.realTask})</span>
                        </span>
                    </div>
                ))}
            </div>

            {allTasksCompleted && (
                 <div className="mt-8 text-center p-4 rounded-lg bg-yellow-500/20 animate-fade-in-up">
                    <p className={`text-xl font-magic ${theme.accent}`}>Excellent work, {userName}! Ten points to {house || 'your House'}!</p>
                 </div>
            )}
        </div>
    );
};

export default DailyDecrees;