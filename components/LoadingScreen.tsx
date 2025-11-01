import React from 'react';

interface LoadingScreenProps {
    userName: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ userName }) => {
    return (
        <div className="fixed inset-0 bg-[#f3e9d2] flex flex-col items-center justify-center font-magic text-[#4a2c2a] text-center p-4">
            <style>
                {`
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    .fade-in-1 { animation: fadeIn 0.8s ease-out forwards; }
                    .fade-in-2 { animation: fadeIn 0.8s ease-out 0.5s forwards; opacity: 0; }
                    .fade-in-3 { animation: fadeIn 0.8s ease-out 1.0s forwards; opacity: 0; }
                `}
            </style>
            <p className="fade-in-1">
                I solemnly swear that I, {userName}, am up to no good.
            </p>
            <div className="mt-8 text-5xl fade-in-2">
                🐾
            </div>
            <p className="mt-8 fade-in-3">
                Mischief Managed
            </p>
        </div>
    );
};

export default LoadingScreen;