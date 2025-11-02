import React, { useState, useEffect } from 'react';
import { HouseTheme, DailyTask, House } from '../types';
import { WIZARDING_TASKS_POOL } from '../constants';

interface DailyDecreesProps {
    theme: HouseTheme;
    userName: string;
    house: House | null;
    addRewards: (amount: number) => void;
}

const getTodayDateKey = () => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
}

const DailyDecrees: React.FC<DailyDecreesProps> = ({ theme, userName, house, addRewards }) => {
    const [tasks, setTasks] = useState<DailyTask[]>([]);
    const [rewardClaimed, setRewardClaimed] = useState(false);

    const dateKey = getTodayDateKey();
    const taskStorageKey = `decrees-${dateKey}`;
    const rewardStorageKey = `decrees-reward-${dateKey}`;

    useEffect(() => {
        const storedTasks = localStorage.getItem(taskStorageKey);
        const isClaimed = localStorage.getItem(rewardStorageKey) === 'true';
        setRewardClaimed(isClaimed);

        if (storedTasks) {
            try {
                const parsedTasks = JSON.parse(storedTasks);
                 if (Array.isArray(parsedTasks)) {
                    setTasks(parsedTasks);
                 } else {
                    throw new Error("Stored tasks are not an array");
                 }
            } catch {
                generateNewTasks();
            }
        } else {
            generateNewTasks();
        }
    }, []);

    const generateNewTasks = () => {
        const shuffled = [...WIZARDING_TASKS_POOL].sort(() => 0.5 - Math.random());
        const newTasks = shuffled.slice(0, 5).map(task => ({ ...task, completed: false }));

        setTasks(newTasks);
        localStorage.setItem(taskStorageKey, JSON.stringify(newTasks));
        
        Object.keys(localStorage).forEach(key => {
            if ((key.startsWith('decrees-') && key !== taskStorageKey) || (key.startsWith('decrees-reward-') && key !== rewardStorageKey)) {
                localStorage.removeItem(key);
            }
        });
    };

    const toggleTask = (id: string) => {
        const newTasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
        localStorage.setItem(taskStorageKey, JSON.stringify(newTasks));
    };
    
    const allTasksCompleted = tasks.length > 0 && tasks.every(t => t.completed);

    useEffect(() => {
        if (allTasksCompleted && !rewardClaimed) {
            addRewards(10);
            localStorage.setItem(rewardStorageKey, 'true');
            setRewardClaimed(true);
        }
    }, [allTasksCompleted, rewardClaimed, addRewards, rewardStorageKey]);

    return (
        <div className={`${theme.text}`}>
            <h2 className={`text-3xl font-magic mb-4 border-b-2 pb-2 ${theme.border}`}>Ministry Decrees</h2>
            <p className={`mb-6 opacity-80`}>
                Educational Decree No. 24: All students are required to complete the following tasks to ensure a proper magical education.
            </p>
            
            <div className="space-y-4">
                {tasks.map((task, index) => (
                    <label 
                        key={task.id}
                        className={`p-4 rounded-lg flex items-center cursor-pointer transition-all-smooth border-2 ${theme.border} ${task.completed ? `bg-green-800/30` : `bg-black/10`} animate-fade-in-up`}
                        style={{ animationDelay: `${index * 75}ms` }}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="sr-only" // Visually hide the real checkbox but keep it functional
                        />
                         {/* Custom checkbox visual */}
                        <div className="relative h-6 w-6 flex-shrink-0">
                            <div className={`h-6 w-6 rounded-md bg-transparent border-2 ${theme.border} transition-all-smooth`}></div>
                            {task.completed && (
                                <span className={`absolute inset-0 flex items-center justify-center text-2xl ${theme.accent} animate-pop-in`}>
                                    ✓
                                </span>
                            )}
                        </div>
                        <span className={`ml-4 text-lg transition-all-smooth ${task.completed ? 'line-through opacity-70' : ''}`}>
                            {task.text} <span className="text-sm opacity-80">({task.realTask})</span>
                        </span>
                    </label>
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
