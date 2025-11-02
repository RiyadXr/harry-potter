import React, { useState } from 'react';
import { HouseTheme, ShopItem } from '../types';
import { SHOP_ITEMS } from '../constants';
import { getAnimationForItem } from '../utils/animations';

interface ShopProps {
    theme: HouseTheme;
    rewards: number;
    purchasedItems: Record<string, number>;
    onPurchase: (item: ShopItem) => void;
}

const Shop: React.FC<ShopProps> = ({ theme, rewards, purchasedItems, onPurchase }) => {
    const [animatingItemId, setAnimatingItemId] = useState<string | null>(null);

    const handlePurchase = (item: ShopItem) => {
        if (animatingItemId) return;
        onPurchase(item);
        setAnimatingItemId(item.id);
        setTimeout(() => setAnimatingItemId(null), 2000); // Animation duration
    };
    
    return (
        <div className={`${theme.text}`}>
            {animatingItemId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pointer-events-none">
                    <div className={`text-8xl ${getAnimationForItem(animatingItemId)}`}>
                        {SHOP_ITEMS.find(i => i.id === animatingItemId)?.icon}
                    </div>
                </div>
            )}

            <h2 className={`text-3xl font-magic mb-4 border-b-2 pb-2 ${theme.border}`}>Diagon Alley Emporium</h2>
            <p className="mb-6 opacity-80">Spend your hard-earned Galleons on magical artifacts and treasures!</p>

            <div className="space-y-4">
                {SHOP_ITEMS.map((item, index) => {
                    const canAfford = rewards >= item.price;
                    const isDisabled = !canAfford || !!animatingItemId;
                    const count = purchasedItems[item.id] || 0;

                    return (
                        <div
                            key={item.id}
                            className={`p-4 rounded-lg flex items-center justify-between transition-all-smooth border-2 ${theme.border} bg-black/10 animate-fade-in-up`}
                            style={{ animationDelay: `${index * 75}ms` }}
                        >
                            <div className="flex items-center">
                                <div className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg ${theme.primary} flex items-center justify-center text-3xl sm:text-4xl mr-4 flex-shrink-0`}>
                                    {item.icon}
                                    {count > 0 && (
                                         <span className={`absolute -top-1 -right-1 bg-yellow-500 text-black font-sans text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 ${theme.border}`}>
                                            {count}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <h3 className={`font-magic text-lg ${theme.accent}`}>{item.name}</h3>
                                    <p className="text-sm opacity-90">{item.description}</p>
                                </div>
                            </div>

                            <div className="text-right ml-2 flex-shrink-0">
                                <button
                                    onClick={() => handlePurchase(item)}
                                    disabled={isDisabled}
                                    className={`px-3 py-2 sm:px-4 rounded-lg shadow-md transition-all-smooth font-magic text-sm w-24
                                        ${canAfford ? `${theme.primary} hover:opacity-80` : 'bg-red-900/50 text-red-300 cursor-not-allowed'}
                                        ${animatingItemId ? 'cursor-wait' : ''}
                                    `}
                                >
                                    <div className="flex items-center justify-center">
                                        <span>{item.price}</span>
                                        <span className="text-lg ml-1" role="img" aria-label="Galleons">💰</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Shop;