import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CreatureState, HouseTheme, FoodItem, PetChatMessage } from '../types';
import { CREATURES, FOOD_ITEMS } from '../constants';
import { getPetResponse } from '../services/geminiService';
import Modal from './Modal';

interface MenagerieProps {
    creatureState: CreatureState;
    setCreatureState: React.Dispatch<React.SetStateAction<CreatureState | null>>;
    foodInventory: Record<string, number>;
    setFoodInventory: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    theme: HouseTheme;
    addRewards: (amount: number) => void;
    userName: string;
}

const Menagerie: React.FC<MenagerieProps> = ({ creatureState, setCreatureState, foodInventory, setFoodInventory, theme, addRewards, userName }) => {
    const creatureDetails = useMemo(() => CREATURES.find(c => c.id === creatureState.id), [creatureState.id]);

    const [chatHistory, setChatHistory] = useState<PetChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isPetThinking, setIsPetThinking] = useState(false);
    const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
    const [notification, setNotification] = useState<string>('');
    
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    if (!creatureDetails) return <p>Magical creature not found...</p>;

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => {
            setNotification('');
        }, 2500);
    };

    const handlePlay = async () => {
        if (creatureState.energy < 2) {
            showNotification(`${creatureDetails.name} is too tired to play.`);
            return;
        }
    
        showNotification(`You played with ${creatureDetails.name}!`);
        setIsPetThinking(true);
        setCreatureState(prev => prev ? { ...prev, energy: Math.max(0, prev.energy - 2), lastPlayed: new Date().toISOString() } : null);
        addRewards(2);
    
        const messageForGemini = `*${userName} plays with me.*`;
        const historyForGemini = [...chatHistory, { role: 'user' as const, content: messageForGemini }];
    
        const apiKey = localStorage.getItem('geminiApiKey');
        const petResponse = await getPetResponse(creatureDetails, messageForGemini, historyForGemini, apiKey || '');
        
        setChatHistory(prev => [...prev, { role: 'model', content: petResponse }]);
        setIsPetThinking(false);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim()) return;
    
        const message = userInput;
        setUserInput('');
        
        if (creatureState.energy < 1) {
            setChatHistory(prev => [...prev, {role: 'user', content: message}, { role: 'model', content: `*${creatureDetails.name} lets out a tired squeak and doesn't respond.*` }]);
            return;
        }
    
        setIsPetThinking(true);
        const newHistory = [...chatHistory, { role: 'user' as const, content: message }];
        setChatHistory(newHistory);
        setCreatureState(prev => prev ? { ...prev, energy: Math.max(0, prev.energy - 1) } : null);
    
        const apiKey = localStorage.getItem('geminiApiKey');
        const petResponse = await getPetResponse(creatureDetails, message, newHistory, apiKey || '');
    
        setChatHistory(prev => [...prev, { role: 'model', content: petResponse }]);
        setIsPetThinking(false);
    };

    const handleFeed = async (food: FoodItem) => {
        if (!foodInventory[food.id] || foodInventory[food.id] <= 0) return;

        // Decrease food count
        setFoodInventory(prev => {
            const newInventory = { ...prev };
            newInventory[food.id]--;
            if (newInventory[food.id] <= 0) {
                delete newInventory[food.id];
            }
            return newInventory;
        });

        // Increase energy
        setCreatureState(prev => prev ? { 
            ...prev, 
            energy: Math.min(100, prev.energy + food.energyBoost),
            lastFed: new Date().toISOString()
        } : null);

        setIsFeedModalOpen(false);
        showNotification(`You fed ${creatureDetails.name} some ${food.name}.`);
        addRewards(1);
        setIsPetThinking(true);
        
        const messageForGemini = `*${userName} feeds me some ${food.name}.*`;
        const historyForGemini = [...chatHistory, { role: 'user' as const, content: messageForGemini }];

        const apiKey = localStorage.getItem('geminiApiKey');
        const petResponse = await getPetResponse(creatureDetails, messageForGemini, historyForGemini, apiKey || '');

        setChatHistory(prev => [...prev, { role: 'model', content: petResponse }]);
        setIsPetThinking(false);
    };

    const energyPercentage = (creatureState.energy / 100) * 100;
    const energyColor = energyPercentage > 60 ? 'bg-green-500' : energyPercentage > 30 ? 'bg-yellow-500' : 'bg-red-600';

    const availableFood = FOOD_ITEMS.filter(food => (foodInventory[food.id] || 0) > 0 && food.forCreature.includes(creatureState.id));

    return (
        <div className={`relative ${theme.text}`}>
            {notification && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full shadow-lg animate-fade-in z-20 text-sm">
                    {notification}
                </div>
            )}
            <h2 className={`text-3xl font-magic mb-4 border-b-2 pb-2 ${theme.border}`}>The Menagerie</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Left Panel: Pet Portrait & Actions */}
                <div className="md:col-span-1 flex flex-col items-center p-4 rounded-lg bg-black/10">
                    <div className={`relative w-36 h-36 rounded-full flex items-center justify-center border-4 ${theme.border} ${theme.secondary} shadow-lg overflow-hidden`}>
                         <img src={creatureDetails.image} alt={creatureDetails.name} className="w-full h-full object-cover animate-float"/>
                    </div>
                    <h3 className={`text-4xl font-magic mt-4 ${theme.accent}`}>{creatureDetails.name}</h3>
                    
                    <div className="w-full mt-4">
                        <p className="text-sm mb-1 text-center">Energy</p>
                        <div className={`w-full bg-black/20 rounded-full h-5 border-2 ${theme.border} p-0.5`}>
                            <div 
                                className={`h-full rounded-full transition-all duration-500 ${energyColor} flex items-center justify-center text-xs font-bold text-black/70`} 
                                style={{ width: `${energyPercentage}%` }}
                            >
                                {Math.round(energyPercentage)}%
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-around w-full mt-6">
                        <button onClick={() => setIsFeedModalOpen(true)} className={`w-16 h-16 rounded-full shadow-md transition-all-smooth transform hover:scale-110 ${theme.primary} ${theme.text} font-magic flex flex-col items-center justify-center`}>
                            <span className="text-2xl">🍎</span>
                            <span className="text-xs">Feed</span>
                        </button>
                        <button onClick={handlePlay} className={`w-16 h-16 rounded-full shadow-md transition-all-smooth transform hover:scale-110 ${theme.primary} ${theme.text} font-magic flex flex-col items-center justify-center`}>
                             <span className="text-2xl">🎾</span>
                            <span className="text-xs">Play</span>
                        </button>
                    </div>
                </div>

                {/* Right Panel: Conversation */}
                <div className="md:col-span-2 h-[50vh] md:h-auto p-2 rounded-lg bg-black/10 border-2 ${theme.border} flex flex-col">
                    <div className="flex-grow overflow-y-auto pr-2 space-y-3 p-2">
                        {chatHistory.length === 0 && (
                            <div className="h-full flex items-center justify-center text-center opacity-60">
                                <p>Talk to your new friend, {creatureDetails.name}!</p>
                            </div>
                        )}
                        {chatHistory.map((msg, index) => (
                            <div key={index} className={`flex items-end ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'model' && <img src={creatureDetails.image} alt={creatureDetails.name} className="w-8 h-8 rounded-full mr-2 object-cover self-end" />}
                                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? `${theme.primary} ${theme.text} rounded-br-none` : `${theme.secondary} ${theme.text} rounded-bl-none`}`}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {isPetThinking && (
                            <div className="flex items-end justify-start">
                                 <img src={creatureDetails.image} alt={creatureDetails.name} className="w-8 h-8 rounded-full mr-2 object-cover self-end" />
                                <div className={`p-3 rounded-2xl rounded-bl-none ${theme.secondary} ${theme.text}`}>
                                    <div className="flex space-x-1">
                                        <span className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
                                        <span className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                                        <span className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="mt-2 flex space-x-2 p-1">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder={`Talk to ${creatureDetails.name}...`}
                            className={`flex-grow p-2 rounded-lg bg-transparent border-2 ${theme.border} focus:outline-none focus:ring-2 ${theme.border} transition-all-smooth`}
                        />
                        <button type="submit" className={`px-4 py-2 ${theme.primary} rounded-lg shadow-md hover:scale-105 transition-all-smooth font-magic`}>
                            Send
                        </button>
                    </form>
                </div>
            </div>
            
            {isFeedModalOpen && (
                <Modal
                    title={`Feed ${creatureDetails.name}`}
                    onClose={() => setIsFeedModalOpen(false)}
                    theme={theme}
                    showFooterButton={false}
                >
                    {availableFood.length > 0 ? (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {availableFood.map(food => (
                                <button key={food.id} onClick={() => handleFeed(food)} className={`w-full p-3 rounded-lg flex items-center justify-between text-left transition-all-smooth ${theme.primary} hover:opacity-80`}>
                                    <div>
                                        <p>{food.icon} {food.name} (x{foodInventory[food.id]})</p>
                                        <p className="text-xs opacity-70">+{food.energyBoost} energy</p>
                                    </div>
                                    <span className="font-magic">Feed</span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center">
                             <p>You have no food for your creature!</p>
                             <p className="text-sm opacity-80 mt-2">Visit the Diagon Alley Emporium by tapping your Galleons in the header to buy some.</p>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
};

export default Menagerie;