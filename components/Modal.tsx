
import React from 'react';
import { HouseTheme } from '../types';

interface ModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    theme: HouseTheme;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose, theme }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className={`p-8 rounded-lg shadow-2xl max-w-lg w-full m-4 border-4 ${theme.border} ${theme.secondary} animate-fade-in-up`}>
                <h2 className={`text-3xl font-magic mb-6 text-center ${theme.accent}`}>{title}</h2>
                <div className="mb-8">
                    {children}
                </div>
                <div className="text-center">
                    <button onClick={onClose} className={`px-6 py-2 ${theme.primary} ${theme.text} rounded-lg shadow-md hover:scale-105 transition-transform`}>
                        Enter the Great Hall
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
