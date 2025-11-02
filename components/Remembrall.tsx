import React, { useState } from 'react';
import { Task, HouseTheme } from '../types';

interface RemembrallProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    theme: HouseTheme;
    userName: string;
}

const Remembrall: React.FC<RemembrallProps> = ({ tasks, setTasks, theme, userName }) => {
    const [newTask, setNewTask] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTask.trim() === '') return;
        const task: Task = {
            id: Date.now(),
            text: newTask,
            completed: false,
        };
        setTasks([task, ...tasks]);
        setNewTask('');
    };

    const toggleTask = (id: number) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };
    
    const inputBg = theme.primary.replace('bg-', 'bg-opacity-20 ');
    const incompleteTasks = tasks.filter(t => !t.completed);

    return (
        <div className={`${theme.text}`}>
            <h2 className={`text-3xl font-magic mb-4 border-b-2 pb-2 ${theme.border}`}>Remembrall</h2>
            <p className={`mb-4 ${theme.accent}`}>
                {incompleteTasks.length > 0
                    ? `The smoke is red, ${userName}! You have ${incompleteTasks.length} task(s) to complete.`
                    : `Mischief Managed, ${userName}! Your list is clear.`
                }
            </p>
            <form onSubmit={handleSubmit} className="flex mb-6 space-x-2">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a magical task..."
                    className={`flex-grow p-2 rounded-md bg-transparent border-2 ${theme.border} ${inputBg} focus:outline-none focus:ring-2 ${theme.border} transition-all-smooth`}
                />
                <button type="submit" className={`px-4 py-2 ${theme.primary} rounded-lg shadow-md hover:scale-105 transition-all-smooth`}>
                    Add
                </button>
            </form>
            <ul className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {tasks.map((task, index) => (
                    <li
                        key={task.id}
                        className={`flex items-center justify-between p-3 rounded-lg animate-fade-in-up transition-all-smooth ${
                            task.completed ? `${inputBg} opacity-60` : `${inputBg}`
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <span
                            className={`cursor-pointer ${task.completed ? 'line-through' : ''}`}
                            onClick={() => toggleTask(task.id)}
                        >
                            {task.text}
                        </span>
                        <button onClick={() => deleteTask(task.id)} className="text-red-400 hover:text-red-600 transition-all-smooth">
                            &times;
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Remembrall;