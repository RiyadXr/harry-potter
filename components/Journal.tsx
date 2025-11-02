import React, { useState } from 'react';
import { JournalEntry, HouseTheme, DailyProphetArticle, TriviaQuestion } from '../types';
import { POTIONS, ICONS, TRIVIA_QUESTIONS } from '../constants';
import Modal from './Modal';
import { generateDailyProphetArticle } from '../services/geminiService';

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

    // State for the generator
    const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState(false);
    const [generatorInput, setGeneratorInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedArticle, setGeneratedArticle] = useState<DailyProphetArticle | null>(null);
    
    // State for the delete confirmation
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [entryToDeleteId, setEntryToDeleteId] = useState<number | null>(null);
    const [triviaQuestion, setTriviaQuestion] = useState<TriviaQuestion | null>(null);
    const [selectedTriviaAnswer, setSelectedTriviaAnswer] = useState<string | null>(null);
    const [triviaFeedback, setTriviaFeedback] = useState('');

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
    
    const handleOpenGenerator = () => {
        setIsGeneratorModalOpen(true);
        setGeneratedArticle(null);
        setGeneratorInput('');
    };

    const handleCloseGenerator = () => {
        setIsGeneratorModalOpen(false);
    };

    const handleGenerateArticle = async () => {
        if (!generatorInput.trim()) return;

        setIsGenerating(true);
        setGeneratedArticle(null);
        const apiKey = localStorage.getItem('geminiApiKey');
        if (!apiKey) {
            setGeneratedArticle({
                headline: "Quill Runs Dry!",
                article: "The magical Quick-Quotes Quill has sputtered to a halt. It seems the Headmaster's secret key is required to replenish its ink. Please ensure the key is correctly configured in the Sorting Hat screen."
            });
            setIsGenerating(false);
            return;
        }

        const article = await generateDailyProphetArticle(generatorInput, userName, apiKey);
        setGeneratedArticle(article);
        setIsGenerating(false);
    };

    const handleScribeArticle = () => {
        if (!generatedArticle) return;

        const content = `## ${generatedArticle.headline}\n\n${generatedArticle.article}`;

        const entry: JournalEntry = {
            id: Date.now(),
            date: new Date().toDateString(),
            content: content,
            mood: mood,
        };
        setEntries([entry, ...entries]);
        handleCloseGenerator();
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
    
    const handleStartDelete = (id: number) => {
        const randomQuestion = TRIVIA_QUESTIONS[Math.floor(Math.random() * TRIVIA_QUESTIONS.length)];
        setTriviaQuestion(randomQuestion);
        setEntryToDeleteId(id);
        setSelectedTriviaAnswer(null);
        setTriviaFeedback('');
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setTimeout(() => { // Delay state reset to allow modal fade out animation
            setEntryToDeleteId(null);
            setTriviaQuestion(null);
            setSelectedTriviaAnswer(null);
            setTriviaFeedback('');
        }, 300);
    };

    const confirmDelete = () => {
        if (!entryToDeleteId) return;
        setEntries(entries.filter(e => e.id !== entryToDeleteId));
        handleCloseDeleteModal();
    };
    
    const handleTriviaSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTriviaAnswer || !triviaQuestion) return;

        if (selectedTriviaAnswer === triviaQuestion.correctAnswer) {
            setTriviaFeedback('Correct! The memory fades...');
            setTimeout(confirmDelete, 1500);
        } else {
            setTriviaFeedback('Incorrect! The memory holds fast. Try again another time.');
            setTimeout(handleCloseDeleteModal, 2000);
        }
    };
    
    const renderContent = (content: string) => {
        if (content.startsWith('## ')) {
            const parts = content.split('\n\n');
            const headline = parts.shift()?.replace('## ', '');
            const body = parts.join('\n\n');
            return (
                <>
                    <h4 className={`font-magic text-xl ${theme.accent} mt-2`}>{headline}</h4>
                    <p className="mt-2 whitespace-pre-wrap">{body}</p>
                </>
            )
        }
        return <p className="mt-2 whitespace-pre-wrap">{content}</p>;
    };
    
    const inputBg = theme.primary.replace('bg-', 'bg-opacity-20 ');
    const isEditing = editingId !== null;

    return (
        <div className={`${theme.text}`}>
            <h2 className="text-3xl font-magic mb-4 border-b-2 pb-2 ${theme.border}">Daily Prophet</h2>
            <form onSubmit={handleSubmit} className={`mb-6 transition-opacity duration-300 ${isEditing ? 'opacity-50 pointer-events-none' : ''}`}>
                <textarea
                    className={`w-full p-3 rounded-md bg-transparent border-2 ${theme.border} ${inputBg} focus:outline-none focus:ring-2 ${theme.border} transition-all-smooth`}
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
                        className={`p-2 rounded-md bg-transparent border-2 ${theme.border} ${inputBg} focus:outline-none focus:ring-2 ${theme.border} transition-all-smooth`}
                        disabled={isEditing}>
                         {POTIONS.map(p => <option key={p.name} value={p.name} className={`${theme.secondary} ${theme.text}`}>{p.name}</option>)}
                     </select>
                     <div className="flex items-center space-x-2">
                        <button type="button" onClick={handleOpenGenerator} className={`flex items-center px-4 py-2 ${theme.secondary} rounded-lg shadow-md hover:scale-105 transition-all-smooth`} disabled={isEditing} aria-label="Use Quick-Quotes Quill">
                            {ICONS.SPARKLES}
                            <span className="hidden sm:inline ml-2">Quick-Quotes</span>
                        </button>
                        <button type="submit" className={`flex items-center px-4 py-2 ${theme.primary} rounded-lg shadow-md hover:scale-105 transition-all-smooth`} disabled={isEditing}>
                            {ICONS.QUILL}
                            <span className="hidden sm:inline ml-2">Scribe</span>
                        </button>
                    </div>
                </div>
            </form>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {entries.length === 0 ? (
                    <p className="text-center opacity-70">Your scroll is empty. Write your first entry!</p>
                ) : (
                    entries.map((entry, index) => (
                        <div key={entry.id} className={`p-4 border-l-4 ${theme.border} rounded-r-lg ${inputBg} animate-fade-in-up`} style={{ animationDelay: `${index * 75}ms` }}>
                           <div className="flex justify-between items-start">
                                <p className="text-sm ${theme.accent} font-magic">{entry.date} - Mood: {entry.mood}</p>
                                {editingId !== entry.id && (
                                    <div className="flex items-center -mr-2">
                                        <button 
                                            onClick={() => handleStartEdit(entry)} 
                                            disabled={isEditing} 
                                            className={`p-1 rounded-full ${isEditing ? 'opacity-50' : `hover:${theme.primary}`} transition-all-smooth`}
                                            aria-label="Edit entry"
                                        >
                                            {ICONS.EDIT}
                                        </button>
                                         <button 
                                            onClick={() => handleStartDelete(entry.id)} 
                                            disabled={isEditing} 
                                            className={`p-1 rounded-full text-red-400 ${isEditing ? 'opacity-50' : `hover:text-red-600`} transition-all-smooth`}
                                            aria-label="Delete entry"
                                        >
                                            {ICONS.DELETE}
                                        </button>
                                    </div>
                                )}
                           </div>

                           {editingId === entry.id ? (
                               <div className="mt-2">
                                   <textarea 
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className={`w-full p-2 rounded-md bg-transparent border-2 ${theme.border} focus:outline-none focus:ring-2 ${theme.border} transition-all-smooth`}
                                        rows={4}
                                   />
                                   <div className="flex justify-end space-x-2 mt-2">
                                       <button onClick={handleCancelEdit} className={`px-3 py-1 rounded ${theme.secondary} hover:opacity-80 transition-all-smooth`}>Cancel</button>
                                       <button onClick={handleSaveEdit} className={`px-3 py-1 rounded ${theme.primary} hover:opacity-80 transition-all-smooth`}>Save</button>
                                   </div>
                               </div>
                           ) : (
                                renderContent(entry.content)
                           )}
                        </div>
                    ))
                )}
            </div>
            {isGeneratorModalOpen && (
                <Modal
                    title="The Quick-Quotes Quill"
                    onClose={handleCloseGenerator}
                    theme={theme}
                    showFooterButton={false}
                >
                    {!generatedArticle && !isGenerating && (
                        <div>
                            <p className="mb-4">Provide a few key points about your day, and the Quick-Quotes Quill will do the rest!</p>
                            <textarea
                                className={`w-full p-3 rounded-md bg-transparent border-2 ${theme.border} ${inputBg} focus:outline-none focus:ring-2 ${theme.border} transition-all-smooth`}
                                rows={3}
                                placeholder="e.g., passed my potions exam, celebrated with butterbeer"
                                value={generatorInput}
                                onChange={(e) => setGeneratorInput(e.target.value)}
                            />
                            <div className="text-center mt-4">
                                <button onClick={handleGenerateArticle} className={`px-6 py-2 rounded-lg shadow-md transition-all-smooth transform hover:scale-105 ${theme.primary} ${theme.text} font-magic`}>
                                    Generate Article
                                </button>
                            </div>
                        </div>
                    )}
                    {isGenerating && (
                         <div className="text-center p-8 flex flex-col items-center justify-center space-y-4 min-h-[150px]">
                            <div className={`animate-magical-glow ${theme.accent} text-4xl`}>✒️</div>
                            <p className={`${theme.text}`}>The Quill is scribbling furiously...</p>
                        </div>
                    )}
                    {generatedArticle && (
                        <div>
                            <div className="max-h-64 overflow-y-auto pr-2 p-2 border border-dashed ${theme.border} rounded-md bg-black/10">
                                <h3 className={`font-magic text-2xl ${theme.accent} mb-2`}>{generatedArticle.headline}</h3>
                                <p className="whitespace-pre-wrap">{generatedArticle.article}</p>
                            </div>
                             <div className="text-center mt-4 flex justify-center space-x-4">
                                <button onClick={handleScribeArticle} className={`px-6 py-2 rounded-lg shadow-md transition-all-smooth transform hover:scale-105 ${theme.primary} ${theme.text} font-magic`}>
                                    Scribe to Journal
                                </button>
                                <button onClick={() => setGeneratedArticle(null)} className={`px-6 py-2 rounded-lg shadow-md transition-all-smooth transform hover:scale-105 ${theme.secondary} ${theme.text} font-magic`}>
                                    Try Again
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>
            )}
            
            {isDeleteModalOpen && triviaQuestion && (
                <Modal
                    title="A Memory Charm"
                    onClose={handleCloseDeleteModal}
                    theme={theme}
                    showFooterButton={false}
                >
                    <form onSubmit={handleTriviaSubmit}>
                        <p className="mb-4">To erase this memory, you must first prove your knowledge. Answer correctly, or the memory remains.</p>
                        <p className="mb-4 font-bold">{triviaQuestion.question}</p>

                        <div className="space-y-2 mb-4">
                            {triviaQuestion.options.map(option => (
                                <label key={option} className={`flex items-center p-3 rounded-lg bg-black/20 transition-all-smooth ${!!triviaFeedback ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                                    <input 
                                        type="radio" 
                                        name="trivia-option" 
                                        value={option}
                                        checked={selectedTriviaAnswer === option}
                                        onChange={() => setSelectedTriviaAnswer(option)}
                                        className="appearance-none h-5 w-5 rounded-full border-2 border-current checked:bg-yellow-400 checked:border-yellow-600 focus:outline-none transition-colors"
                                        disabled={!!triviaFeedback}
                                    />
                                    <span className="ml-3">{option}</span>
                                </label>
                            ))}
                        </div>
                        {!triviaFeedback && (
                            <div className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={handleCloseDeleteModal}
                                    className={`w-full sm:w-auto px-4 py-2 rounded-lg shadow-md transition-all-smooth ${theme.secondary} hover:opacity-80`}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={!selectedTriviaAnswer}
                                    className={`w-full sm:w-auto px-4 py-2 rounded-lg shadow-md transition-all-smooth ${!selectedTriviaAnswer ? 'bg-gray-500 cursor-not-allowed' : `${theme.primary} hover:opacity-80`}`}
                                >
                                    Cast Charm
                                </button>
                            </div>
                        )}
                        {triviaFeedback && (
                            <p className={`mt-4 text-center font-bold animate-fade-in ${triviaFeedback.includes('Correct') ? 'text-green-400' : 'text-red-400'}`}>
                                {triviaFeedback}
                            </p>
                        )}
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default Journal;