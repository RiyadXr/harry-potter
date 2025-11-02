

import React from 'react';
import { HouseTheme } from '../types';

interface ModalProps {
    title: string;
    onClose: () => void;
    theme: HouseTheme;
    children: React.ReactNode;
    showFooterButton?: boolean;
    footerButtonText?: string;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, theme, children, showFooterButton = true, footerButtonText }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className={`relative p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-md border-4 ${theme.border} ${theme.secondary} ${theme.text} animate-fade-in-up`}>
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className={`absolute top-2 right-2 p-1 rounded-full text-current opacity-70 hover:opacity-100 hover:bg-black/20 transition-all-smooth focus:outline-none focus:ring-2 focus:ring-current`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className={`text-3xl font-magic mb-4 ${theme.accent}`}>{title}</h2>
                <div className="mb-6">
                    {children}
                </div>
                {showFooterButton && (
                    <div className="text-center">
                        <button
                            onClick={onClose}
                            className={`px-6 py-2 rounded-lg shadow-md transition-all-smooth transform hover:scale-105 ${theme.primary} ${theme.text} font-magic`}
                        >
                            {footerButtonText || 'Continue to the Great Hall'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;