import React, { useState } from 'react';
import { JournalEntry, HouseTheme } from '../types';
import { POTIONS, ICONS } from '../constants';

interface JournalProps {
    entries: JournalEntry[];
    setEntries: React.Dispatch<React.SetStateAction<JournalEntry[]>>;
    theme: HouseTheme;
    userName: string;
}

const Journal: React.FC<JournalProps> = ({ entries, setEntries, theme, userName }) => {
    const [newEntry, setNewEntry] = useState('');
    const [mood, setMood] = useState(POTIONS[0].name);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editText, setEditText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newEntry.trim() === '') return;

        const entry: JournalEntry = {
            id: Date.now(),
            date: new Date().toDateString(),
            content: newEntry,
            mood: mood,
        };
        setEntries([entry, ...entries]);
        setNewEntry('');
    };

    const handleStartEdit = (entry: JournalEntry) => {
        setEditingId(entry.id);
        setEditText(entry.content);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditText('');
    };

    const handleSaveEdit = () => {
        if (!editingId) return;
        setEntries(entries.map(e => e.id === editingId ? { ...e, content: editText } : e));
        handleCancelEdit();
    };
    
    const inputBg = theme.primary.replace('bg-', 'bg-opacity-20 ');
    const isEditing = editingId !== null;

    return (
        <div className={`${theme.text}`}>
            <h2 className="text-3xl font-magic mb-4 border-b-2 pb-2 ${theme.border}">Daily Prophet</h2>
            <form onSubmit={handleSubmit} className={`mb-6 transition-opacity duration-300 ${isEditing ? 'opacity-50 pointer-events-none' : ''}`}>
                <textarea
                    className={`w-full p-3 rounded-md bg-transparent border-2 ${theme.border} ${inputBg} focus:outline-none focus:ring-2 ${theme.border} transition-all`}
                    rows={5}
                    placeholder={`What mischief did you manage today, ${userName}?`}
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    disabled={isEditing}
                />
                <div className="flex justify-between items-center mt-4">
                     <select 
                        value={mood}
                        onChange={e => setMood(e.target.value)}
                        className={`p-2 rounded-md bg-transparent border-2 ${theme.border} ${inputBg} focus:outline-none focus:ring-2 ${theme.border}`}
                        disabled={isEditing}>
                         {POTIONS.map(p => <option key={p.name} value={p.name} className={`${theme.secondary} ${theme.text}`}>{p.name}</option>)}
                     </select>
                    <button type="submit" className={`flex items-center px-4 py-2 ${theme.primary} rounded-lg shadow-md hover:scale-105 transition-transform`} disabled={isEditing}>
                        {ICONS.QUILL}
                        Scribe
                    </button>
                </div>
            </form>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {entries.length === 0 ? (
                    <p className="text-center opacity-70">Your scroll is empty. Write your first entry!</p>
                ) : (
                    entries.map(entry => (
                        <div key={entry.id} className={`p-4 border-l-4 ${theme.border} rounded-r-lg ${inputBg}`}>
                           <div className="flex justify-between items-start">
                                <p className="text-sm ${theme.accent} font-magic">{entry.date} - Mood: {entry.mood}</p>
                                {editingId !== entry.id && (
                                     <button 
                                        onClick={() => handleStartEdit(entry)} 
                                        disabled={isEditing} 
                                        className={`p-1 rounded-full ${isEditing ? 'opacity-50' : `hover:${theme.primary}`}`}
                                        aria-label="Edit entry"
                                     >
                                        {ICONS.EDIT}
                                    </button>
                                )}
                           </div>

                           {editingId === entry.id ? (
                               <div className="mt-2">
                                   <textarea 
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className={`w-full p-2 rounded-md bg-transparent border-2 ${theme.border} focus:outline-none focus:ring-2 ${theme.border}`}
                                        rows={4}
                                   />
                                   <div className="flex justify-end space-x-2 mt-2">
                                       <button onClick={handleCancelEdit} className={`px-3 py-1 rounded ${theme.secondary} hover:opacity-80`}>Cancel</button>
                                       <button onClick={handleSaveEdit} className={`px-3 py-1 rounded ${theme.primary} hover:opacity-80`}>Save</button>
                                   </div>
                               </div>
                           ) : (
                                <p className="mt-2 whitespace-pre-wrap">{entry.content}</p>
                           )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Journal;