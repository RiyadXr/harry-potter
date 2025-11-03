import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Journal from './components/Journal';
import Remembrall from './components/Remembrall';
import MoodTracker from './components/MoodTracker';
import SortingHat from './components/SortingHat';
import Settings from './components/Settings';
import DailyDecrees from './components/DailyDecrees';
import LoadingScreen from './components/LoadingScreen';
import Modal from './components/Modal';
import Test from './components/Test';
import Shop from './components/Shop';
import HouseDetails from './components/HouseDetails';
import Menagerie from './components/Menagerie';
import { House, View, JournalEntry, Task, Mood, ShopItem, FloatingReward, CreatureState, CreatureType, FoodItem } from './types';
import { HOUSE_THEMES, WIZARDING_FACTS, ICONS, CREATURES } from './constants';
import { getOwlAnswer, generateRewardMessage } from './services/geminiService';

const App: React.FC = () => {
    const [view, setView] = useState<View>(View.Journal);
    const [house, setHouse] = useState<House | null>(null);
    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [moods, setMoods] = useState<Mood[]>([]);
    const [rewards, setRewards] = useState<number>(0);
    const [purchasedItems, setPurchasedItems] = useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [footerFact, setFooterFact] = useState('');
    
    // Menagerie state
    const [adoptedCreature, setAdoptedCreature] = useState<CreatureState | null>(null);
    const [foodInventory, setFoodInventory] = useState<Record<string, number>>({});
    const [showWiseOwl, setShowWiseOwl] = useState(true);

    // Ask the Owl state
    const [isOwlModalOpen, setIsOwlModalOpen] = useState(false);
    const [owlQuestion, setOwlQuestion] = useState('');
    const [owlAnswer, setOwlAnswer] = useState('');
    const [isOwlThinking, setIsOwlThinking] = useState(false);

    // House Details Modal state
    const [isHouseModalOpen, setIsHouseModalOpen] = useState(false);

    // Floating Reward state
    const [floatingReward, setFloatingReward] = useState<FloatingReward | null>(null);
    const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
    const [rewardMessage, setRewardMessage] = useState<string>('');
    const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
    const [lastReward, setLastReward] = useState(0);

    const rewardTimerRef = useRef<ReturnType<typeof setTimeout>>();
    const rewardDisappearTimerRef = useRef<ReturnType<typeof setTimeout>>();

    const userName = "Onamika";

    // Load all data from local storage on initial render
    useEffect(() => {
        try {
            const storedHouse = localStorage.getItem('hogwartsHouse') as House | null;
            if (storedHouse && Object.values(House).includes(storedHouse)) {
                setHouse(storedHouse);
                setView(View.Journal);
            } else {
                setView(View.Sorting);
            }
            const storedEntries = localStorage.getItem('journalEntries');
            if (storedEntries) setJournalEntries(JSON.parse(storedEntries));
            
            const storedTasks = localStorage.getItem('remembrallTasks');
            if (storedTasks) setTasks(JSON.parse(storedTasks));
           
            const storedMoods = localStorage.getItem('potionMoods');
            if (storedMoods) setMoods(JSON.parse(storedMoods));
            
            const storedRewards = localStorage.getItem('potterJournalRewards');
            if (storedRewards) setRewards(parseInt(storedRewards, 10));
            
            const storedPurchasedItems = localStorage.getItem('potterJournalPurchases');
            if (storedPurchasedItems) setPurchasedItems(JSON.parse(storedPurchasedItems));

            const storedCreature = localStorage.getItem('adoptedCreature');
            if (storedCreature) setAdoptedCreature(JSON.parse(storedCreature));

            const storedFood = localStorage.getItem('foodInventory');
            if (storedFood) setFoodInventory(JSON.parse(storedFood));

            const storedShowOwl = localStorage.getItem('showWiseOwl');
            setShowWiseOwl(storedShowOwl ? JSON.parse(storedShowOwl) : true);

        } catch (e) {
            console.error("Error hydrating app from localStorage. Resetting state.", e);
            localStorage.clear();
            setHouse(null);
            setView(View.Sorting);
        } finally {
            const randomIndex = Math.floor(Math.random() * WIZARDING_FACTS.length);
            setFooterFact(WIZARDING_FACTS[randomIndex]);
            setIsLoading(false);
        }
    }, []);

    // Save data hooks
    useEffect(() => { if (!isLoading) localStorage.setItem('journalEntries', JSON.stringify(journalEntries)); }, [journalEntries, isLoading]);
    useEffect(() => { if (!isLoading) localStorage.setItem('remembrallTasks', JSON.stringify(tasks)); }, [tasks, isLoading]);
    useEffect(() => { if (!isLoading) localStorage.setItem('potionMoods', JSON.stringify(moods)); }, [moods, isLoading]);
    useEffect(() => { if (!isLoading) localStorage.setItem('potterJournalRewards', rewards.toString()); }, [rewards, isLoading]);
    useEffect(() => { if (!isLoading) localStorage.setItem('potterJournalPurchases', JSON.stringify(purchasedItems)); }, [purchasedItems, isLoading]);
    useEffect(() => { if (!isLoading) localStorage.setItem('adoptedCreature', JSON.stringify(adoptedCreature)); }, [adoptedCreature, isLoading]);
    useEffect(() => { if (!isLoading) localStorage.setItem('foodInventory', JSON.stringify(foodInventory)); }, [foodInventory, isLoading]);
    useEffect(() => { if (!isLoading) localStorage.setItem('showWiseOwl', JSON.stringify(showWiseOwl)); }, [showWiseOwl, isLoading]);
    
    // Pet energy decay logic
    useEffect(() => {
        if (!adoptedCreature || isLoading) return;

        const energyDecayInterval = setInterval(() => {
            setAdoptedCreature(creature => {
                if (!creature) return null;
                const newEnergy = Math.max(0, creature.energy - 1);
                if (newEnergy === creature.energy) return creature; // No change
                return { ...creature, energy: newEnergy };
            });
        }, 10 * 60 * 1000); // Decrease energy every 10 minutes

        return () => clearInterval(energyDecayInterval);
    }, [adoptedCreature, isLoading]);


    const theme = useMemo(() => {
        return house ? HOUSE_THEMES[house] : {
            primary: 'bg-[#4a2c2a]', secondary: 'bg-[#6d4c41]', text: 'text-[#f3e9d2]',
            accent: 'text-[#c8a97e]', border: 'border-[#c8a97e]'
        };
    }, [house]);
    
    const handleSort = (result: { house: House, reasoning: string }) => {
        setHouse(result.house);
        localStorage.setItem('hogwartsHouse', result.house);
        setView(View.Journal);
    };

    const handleLeaveHouse = () => {
        setHouse(null);
        localStorage.removeItem('hogwartsHouse');
        setView(View.Sorting);
    };
    
    const handleSetView = (newView: View) => {
        setView(newView);
        const randomIndex = Math.floor(Math.random() * WIZARDING_FACTS.length);
        setFooterFact(WIZARDING_FACTS[randomIndex]);
    };

    const handleAskOwl = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!owlQuestion.trim()) return;

        setIsOwlThinking(true);
        setOwlAnswer('');
        const apiKey = localStorage.getItem('geminiApiKey');
        if (!apiKey) {
            setOwlAnswer("The owl huffs, unable to find the path. The Headmaster's secret key is required for this magic.");
            setIsOwlThinking(false);
            return;
        }
        const answer = await getOwlAnswer(owlQuestion, apiKey);
        setOwlAnswer(answer);
        setIsOwlThinking(false);
    };

    const handleCloseOwlModal = () => {
        setIsOwlModalOpen(false);
        setOwlQuestion('');
        setOwlAnswer('');
    };

    const addRewards = (amount: number) => {
        setRewards(prev => prev + amount);
    };

    const handlePurchaseItem = (item: ShopItem) => {
        if (rewards >= item.price) {
            setRewards(prev => prev - item.price);
            setPurchasedItems(prev => ({
                ...prev,
                [item.id]: (prev[item.id] || 0) + 1
            }));
        }
    };

    const handlePurchaseFood = (item: FoodItem) => {
        if (rewards >= item.price) {
            setRewards(prev => prev - item.price);
            setFoodInventory(prev => ({
                ...prev,
                [item.id]: (prev[item.id] || 0) + 1
            }));
        }
    };

    const handleAdoptCreature = (creatureId: CreatureType) => {
        const creatureData = CREATURES.find(c => c.id === creatureId);
        if (!creatureData) return;
        const newCreature: CreatureState = {
            id: creatureData.id,
            name: creatureData.name,
            energy: 100,
            lastFed: new Date().toISOString(),
            lastPlayed: new Date().toISOString(),
        };
        setAdoptedCreature(newCreature);
        setView(View.Menagerie);
    };
    
    // --- Floating Reward Logic ---
    const clearRewardTimers = () => {
        if (rewardTimerRef.current) clearTimeout(rewardTimerRef.current);
        if (rewardDisappearTimerRef.current) clearTimeout(rewardDisappearTimerRef.current);
    };
    
    const scheduleNextReward = useCallback(() => {
        clearRewardTimers();
        const randomDelay = Math.random() * 60000 + 45000; // 45-105 seconds
        rewardTimerRef.current = setTimeout(() => {
            const rewardAmount = (Math.random() < 0.5 ? 50 : 100) as 50 | 100;
            setFloatingReward({
                id: Date.now(),
                x: Math.random() * 80 + 10,
                y: Math.random() * 70 + 15,
                reward: rewardAmount,
                icon: '✨'
            });
            rewardDisappearTimerRef.current = setTimeout(() => {
                setFloatingReward(null);
                scheduleNextReward();
            }, 12000); // Disappear after 12 seconds
        }, randomDelay);
    }, []);

    useEffect(() => {
        const isAnyModalOpen = isRewardModalOpen || isOwlModalOpen || isHouseModalOpen;
        if (view !== View.Sorting && !isAnyModalOpen && !floatingReward) {
            scheduleNextReward();
        } else {
            clearRewardTimers();
            if (isAnyModalOpen && floatingReward) {
                setFloatingReward(null);
            }
        }
        return () => clearRewardTimers();
    }, [view, isRewardModalOpen, isOwlModalOpen, isHouseModalOpen, floatingReward, scheduleNextReward]);

    const handleFloatingRewardClick = async (reward: FloatingReward) => {
        clearRewardTimers();
        setFloatingReward(null);
        addRewards(reward.reward);
        setLastReward(reward.reward);
        setIsRewardModalOpen(true);
        setIsGeneratingMessage(true);

        const apiKey = localStorage.getItem('geminiApiKey');
        if (!apiKey) {
            setRewardMessage("You caught a spark of magic! A brilliant display of reflexes.");
            setIsGeneratingMessage(false);
            return;
        }

        const message = await generateRewardMessage(reward.reward, userName, apiKey);
        setRewardMessage(message);
        setIsGeneratingMessage(false);
    };

    const handleCloseRewardModal = () => {
        setIsRewardModalOpen(false);
        setRewardMessage('');
        scheduleNextReward();
    };

    if(isLoading) {
        return <LoadingScreen userName={userName} />;
    }

    const renderView = () => {
        switch (view) {
            case View.Journal: return <Journal entries={journalEntries} setEntries={setJournalEntries} theme={theme} userName={userName} addRewards={addRewards} />;
            case View.Remembrall: return <Remembrall tasks={tasks} setTasks={setTasks} theme={theme} userName={userName} addRewards={addRewards} />;
            case View.Potions: return <MoodTracker moods={moods} setMoods={setMoods} theme={theme} addRewards={addRewards} />;
            case View.Decrees: return <DailyDecrees theme={theme} userName={userName} house={house} addRewards={addRewards} />;
            case View.Requirement: return <Settings theme={theme} house={house} setView={setView} onLeaveHouse={handleLeaveHouse} purchasedItems={purchasedItems} adoptedCreature={adoptedCreature} onAdoptCreature={handleAdoptCreature} showWiseOwl={showWiseOwl} setShowWiseOwl={setShowWiseOwl} />;
            case View.Sorting: return <SortingHat onSort={handleSort} theme={theme} userName={userName} />;
            case View.Test: return <Test theme={theme} userName={userName} house={house} addRewards={addRewards} />;
            case View.Shop: return <Shop theme={theme} rewards={rewards} purchasedItems={purchasedItems} onPurchase={handlePurchaseItem} foodInventory={foodInventory} onPurchaseFood={handlePurchaseFood} />;
            case View.Menagerie: 
                if (!adoptedCreature) {
                    // Fallback if trying to access menagerie without a pet
                    setView(View.Requirement);
                    return null;
                }
                return <Menagerie creatureState={adoptedCreature} setCreatureState={setAdoptedCreature} foodInventory={foodInventory} setFoodInventory={setFoodInventory} theme={theme} addRewards={addRewards} userName={userName} />;
            default: return house ? <Journal entries={journalEntries} setEntries={setJournalEntries} theme={theme} userName={userName} addRewards={addRewards}/> : <SortingHat onSort={handleSort} theme={theme} userName={userName} />;
        }
    };

    return (
        <div className="min-h-screen">
            <div className="p-4 pb-28 sm:max-w-4xl sm:mx-auto">
                <Header house={house} theme={theme} rewards={rewards} setView={handleSetView} onCrestClick={() => setIsHouseModalOpen(true)} />
                <main className={`mt-4 p-4 sm:p-6 rounded-lg shadow-2xl transition-all-smooth ${theme.secondary} ${theme.border} border-2`}>
                    <div key={view} className="animate-fade-in">
                        {renderView()}
                    </div>
                </main>
                <footer className={`font-magic text-center mt-6 ${theme.accent} opacity-70 px-4`}>
                    <p>"{footerFact}"</p>
                </footer>
            </div>
            
            {view !== View.Sorting && showWiseOwl && (
                <button
                    onClick={() => { setIsOwlModalOpen(true); }}
                    aria-label="Ask the wise owl a question"
                    className="fixed bottom-24 left-4 sm:left-8 z-40 p-2 bg-gray-700 rounded-full shadow-lg cursor-pointer animate-float transform hover:scale-110 transition-all-smooth"
                >
                    <span className="text-2xl">{ICONS.OWL}</span>
                </button>
            )}
            
            {adoptedCreature && view !== View.Sorting && (
                <button
                    onClick={() => setView(View.Menagerie)}
                    aria-label={`Visit your ${adoptedCreature.name}`}
                    className="fixed bottom-24 right-4 sm:right-8 z-40 p-1 bg-yellow-900/70 border-2 border-yellow-600 rounded-full shadow-lg cursor-pointer animate-float transform hover:scale-110 transition-all-smooth"
                >
                    <img 
                        src={CREATURES.find(c => c.id === adoptedCreature.id)?.image} 
                        alt={adoptedCreature.name}
                        className="w-10 h-10 object-cover rounded-full"
                    />
                </button>
            )}

            {isOwlModalOpen && (
                 <Modal
                    title="Ask the Wise Owl"
                    onClose={handleCloseOwlModal}
                    theme={theme}
                    showFooterButton={false}
                >
                    {!owlAnswer && !isOwlThinking && (
                        <form onSubmit={handleAskOwl}>
                            <textarea
                                className={`w-full p-3 rounded-md bg-transparent border-2 ${theme.border} ${theme.primary.replace('bg-', 'bg-opacity-20 ')} focus:outline-none focus:ring-2 ${theme.border} transition-all-smooth`}
                                rows={3}
                                placeholder="Ask about anything in the wizarding world..."
                                value={owlQuestion}
                                onChange={(e) => setOwlQuestion(e.target.value)}
                            />
                            <div className="text-center mt-4">
                                <button type="submit" className={`px-6 py-2 rounded-lg shadow-md transition-all-smooth transform hover:scale-105 ${theme.primary} ${theme.text} font-magic`}>
                                    Send Owl Post
                                </button>
                            </div>
                        </form>
                    )}
                    {isOwlThinking && (
                         <div className="text-center p-8 flex flex-col items-center justify-center space-y-4">
                            <div className={`animate-spin-slow ${theme.accent}`}>{ICONS.OWL}</div>
                            <p className={`${theme.text}`}>The owl is fetching your answer...</p>
                        </div>
                    )}
                    {owlAnswer && (
                        <div>
                            <div className="max-h-64 overflow-y-auto pr-2">
                                <p className="whitespace-pre-wrap">{owlAnswer}</p>
                            </div>
                             <div className="text-center mt-4 flex justify-center space-x-4">
                                <button onClick={() => setOwlAnswer('')} className={`px-6 py-2 rounded-lg shadow-md transition-all-smooth transform hover:scale-105 ${theme.primary} ${theme.text} font-magic`}>
                                    Ask Another
                                </button>
                                <button onClick={handleCloseOwlModal} className={`px-6 py-2 rounded-lg shadow-md transition-all-smooth transform hover:scale-105 ${theme.secondary} ${theme.text} font-magic`}>
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>
            )}
            
            {isHouseModalOpen && house && (
                <Modal
                    title={`${house} Common Room`}
                    onClose={() => setIsHouseModalOpen(false)}
                    theme={theme}
                    footerButtonText="Return"
                >
                    <HouseDetails house={house} theme={theme} />
                </Modal>
            )}

             {floatingReward && (
                <button
                    onClick={() => handleFloatingRewardClick(floatingReward)}
                    className="fixed z-40 text-5xl animate-float animate-pop-in cursor-pointer"
                    style={{
                        left: `${floatingReward.x}%`,
                        top: `${floatingReward.y}%`,
                        transform: 'translate(-50%, -50%)',
                        filter: 'drop-shadow(0 0 15px #fef08a)'
                    }}
                    aria-label={`Claim a magical reward`}
                >
                    {floatingReward.icon}
                </button>
            )}

            {isRewardModalOpen && (
                <Modal
                    title="A Magical Boon!"
                    onClose={handleCloseRewardModal}
                    theme={theme}
                    footerButtonText="Wonderful!"
                >
                    {isGeneratingMessage ? (
                        <div className="text-center p-8 flex flex-col items-center justify-center space-y-4 min-h-[120px]">
                            <div className={`animate-spin-slow ${theme.accent}`}>✨</div>
                            <p className={`${theme.text}`}>The magic is revealing its message...</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-lg italic mb-4">"{rewardMessage}"</p>
                            <p className={`font-magic text-2xl ${theme.accent}`}>You've been awarded {lastReward} Galleons!</p>
                        </div>
                    )}
                </Modal>
            )}

            {view !== View.Sorting && (
                <Navigation currentView={view} setView={handleSetView} theme={theme} house={house} />
            )}
        </div>
    );
};

export default App;