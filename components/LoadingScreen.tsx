import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
    userName: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ userName }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 500),
            setTimeout(() => setStep(2), 1500),
            setTimeout(() => setStep(3), 2500),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    const textClass = "transition-opacity duration-1000";

    return (
        <div className="fixed inset-0 bg-[#f3e9d2] flex flex-col items-center justify-center font-magic text-[#4a2c2a] text-center p-4">
            <p className={`${textClass} ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                I solemnly swear that I, {userName}, am up to no good.
            </p>
            <div className={`mt-8 text-5xl transition-opacity duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                🐾
            </div>
            <p className={`mt-8 ${textClass} ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                Mischief Managed
            </p>
        </div>
    );
};

export default LoadingScreen;