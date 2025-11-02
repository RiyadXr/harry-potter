import React from 'react';
import { House, HouseTheme } from '../types';
import { HOUSE_DETAILS } from '../constants';

interface HouseDetailsProps {
    house: House;
    theme: HouseTheme;
}

const HouseDetails: React.FC<HouseDetailsProps> = ({ house, theme }) => {
    const details = HOUSE_DETAILS[house];

    if (!details) return null;

    return (
        <div className="max-h-[60vh] overflow-y-auto pr-2">
            <p className="italic mb-4">{details.description}</p>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6 text-sm">
                <div><strong>Founder:</strong> {details.founder}</div>
                <div><strong>Animal:</strong> {details.animal}</div>
                <div><strong>Colours:</strong> {details.colors}</div>
                <div><strong>Element:</strong> {details.element}</div>
                <div className="col-span-2"><strong>Core Trait:</strong> {details.trait}</div>
            </div>

            <h3 className={`font-magic text-xl mb-3 border-t-2 pt-3 ${theme.border}`}>Notable Witches & Wizards</h3>
            <ul className="list-disc list-inside space-y-1">
                {details.students.map(student => <li key={student}>{student}</li>)}
            </ul>
        </div>
    );
};

export default HouseDetails;
