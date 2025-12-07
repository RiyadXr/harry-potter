import React, { useState } from 'react';
import { House, HouseTheme, HousePoints, View } from '../types';
import Test from './Test';

interface GreatHallProps {
    house: House | null;
    theme: HouseTheme;
    housePoints: HousePoints;
    userContribution: number;
    setView: (view: View) => void;
    userName: string;
    addRewards: (amount: number) => void;
    addHousePoints: (amount: number) => void;
}

const HouseHourglass: React.FC<{ house: House; points: number; maxPoints: number; theme: HouseTheme; isUserHouse: boolean }> = ({ house, points, maxPoints, theme, isUserHouse }) => {
    const crests: Record<House, string> = {
        [House.Gryffindor]: '🦁',
        [House.Slytherin]: '🐍',
        [House.Ravenclaw]: '🦅',
        [House.Hufflepuff]: '🦡',
    };
    const gems: Record<House, string> = {
        [House.Gryffindor]: 'bg-red-600',
        [House.Slytherin]: 'bg-emerald-600',
        [House.Ravenclaw]: 'bg-blue-600',
        [House.Hufflepuff]: 'bg-yellow-500',
    };
    const heightPercentage = maxPoints > 0 ? (points / maxPoints) * 100 : 0;

    return (
        <div className={`flex flex-col items-center p-2 rounded-lg ${isUserHouse ? `bg-black/20 border-2 ${theme.border}` : ''}`}>
            <span className="text-4xl mb-2">{crests[house]}</span>
            <div className={`w-16 h-40 bg-black/10 rounded-lg border-2 ${theme.border} flex flex-col justify-end relative overflow-hidden`}>
                <div className={`absolute bottom-0 left-0 right-0 ${gems[house]} transition-all duration-1000 ease-in-out`} style={{ height: `${heightPercentage}%` }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            </div>
            <p className={`font-magic text-2xl mt-2 ${isUserHouse ? theme.accent : ''}`}>{points}</p>
            <p className="text-sm">{house}</p>
        </div>
    );
};

const GreatHall: React.FC<GreatHallProps> = (props) => {
    const { house, theme, housePoints, userContribution, setView, userName, addRewards, addHousePoints } = props;
    const [showExams, setShowExams] = useState(false);

    // FIX: Ensure values from housePoints are treated as numbers to prevent runtime errors from JSON.parse.
    const maxPoints = Math.max(...Object.values(housePoints).map(p => Number(p) || 0), 100);

    if (showExams) {
        return <Test 
            theme={theme} 
            userName={userName} 
            house={house} 
            addRewards={addRewards} 
            addHousePoints={addHousePoints} 
            setView={setView} 
        />;
    }

    return (
        <div className={`${theme.text}`}>
            <h2 className={`text-3xl font-magic mb-4 border-b-2 pb-2 ${theme.border}`}>The Great Hall</h2>
            <p className="mb-6 text-center">Behold the House Points standings! Every point earned brings your house closer to winning the House Cup.</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {(Object.keys(housePoints) as House[]).map(h => (
                    <HouseHourglass 
                        key={h}
                        house={h}
                        points={housePoints[h]}
                        maxPoints={maxPoints}
                        theme={theme}
                        isUserHouse={h === house}
                    />
                ))}
            </div>

            <div className={`p-4 rounded-lg bg-black/10 text-center border-2 ${theme.border}`}>
                <h3 className={`font-magic text-xl mb-2 ${theme.accent}`}>Your Contribution</h3>
                <p>You have earned <span className="font-bold text-lg">{userContribution}</span> points for {house}!</p>
            </div>
            
            <div className="mt-8 text-center">
                 <button 
                    onClick={() => setShowExams(true)}
                    className={`px-6 py-3 rounded-lg shadow-md transition-all-smooth transform hover:scale-105 ${theme.primary} ${theme.text} font-magic text-xl`}
                >
                    Go to Examinations
                </button>
            </div>
        </div>
    );
};

export default GreatHall;