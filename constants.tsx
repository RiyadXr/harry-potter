import React from 'react';
import { House, HouseTheme, Potion } from './types';

export const ICONS = {
  JOURNAL: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  REMEMBERALL: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  POTIONS: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l-2.387-.477a2 2 0 01-.547-1.806zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  SORTING: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  QUILL: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>,
  SPARKLES: <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  SETTINGS: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  DECREES: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
};

export const HOUSE_THEMES: Record<House, HouseTheme> = {
  [House.Gryffindor]: {
    primary: 'bg-[#740001]', secondary: 'bg-[#ae0001]', text: 'text-[#eeba30]', accent: 'text-[#d3a625]', border: 'border-[#d3a625]',
  },
  [House.Slytherin]: {
    primary: 'bg-[#1a472a]', secondary: 'bg-[#2a623d]', text: 'text-[#aaaaaa]', accent: 'text-[#c0c0c0]', border: 'border-[#c0c0c0]',
  },
  [House.Ravenclaw]: {
    primary: 'bg-[#0e1a40]', secondary: 'bg-[#222f5b]', text: 'text-[#946b2d]', accent: 'text-[#be8500]', border: 'border-[#946b2d]',
  },
  [House.Hufflepuff]: {
    primary: 'bg-[#ecb939]', secondary: 'bg-[#f0c75e]', text: 'text-[#372e29]', accent: 'text-[#000000]', border: 'border-[#372e29]',
  },
};

export const POTIONS: Potion[] = [
  { name: 'Felix Felicis', description: 'Liquid Luck', color: 'bg-yellow-400' },
  { name: 'Amortentia', description: 'Love Potion', color: 'bg-pink-400' },
  { name: 'Polyjuice Potion', description: 'Transforming', color: 'bg-green-600' },
  { name: 'Veritaserum', description: 'Truth Serum', color: 'bg-blue-300' },
  { name: 'Draught of Peace', description: 'Calming Potion', color: 'bg-indigo-400' },
  { name: 'Draught of Living Death', description: 'Sleepy', color: 'bg-gray-600' },
  { name: 'Pepperup Potion', description: 'Energized', color: 'bg-red-500' },
];

export const SORTING_QUIZ_QUESTIONS = [
    {
        question: "You find a magical creature in distress. What do you do?",
        options: [
            { text: "Rush in to help, consequences be damned!", value: "brave" },
            { text: "Assess the situation carefully before acting.", value: "wise" },
            { text: "Use your knowledge of magical creatures to find a clever solution.", value: "cunning" },
            { text: "Offer it comfort and try to get others to help.", value: "loyal" }
        ]
    },
    {
        question: "Which magical subject are you most excited to study at Hogwarts?",
        options: [
            { text: "Defence Against the Dark Arts", value: "brave" },
            { text: "Ancient Runes", value: "wise" },
            { text: "Potions", value: "cunning" },
            { text: "Herbology", value: "loyal" }
        ]
    },
    {
        question: "You're faced with a locked door. What's your first instinct?",
        options: [
            { text: "Try to force it open.", value: "brave" },
            { text: "Look for clues or a hidden key.", value: "wise" },
            { text: "Use a spell to unlock it, even if it's forbidden.", value: "cunning" },
            { text: "Ask a friend if they know how to open it.", value: "loyal" }
        ]
    },
    {
        question: "What kind of pet would you bring to Hogwarts?",
        options: [
            { text: "An owl, for its nobility and usefulness.", value: "brave" },
            { text: "A cat, for its independence and intelligence.", value: "wise" },
            { text: "A snake, for its misunderstood nature and power.", value: "cunning" },
            { text: "A toad, because every creature deserves a friend.", value: "loyal" }
        ]
    },
    {
        question: "Your friend is accused of a crime they didn't commit. What do you do?",
        options: [
            { text: "Defend them publicly, no matter the risk.", value: "brave" },
            { text: "Gather evidence to prove their innocence.", value: "wise" },
            { text: "Find a way to manipulate the situation to your friend's advantage.", value: "cunning" },
            { text: "Stand by them, offering unwavering support.", value: "loyal" }
        ]
    }
];

export const DAILY_TASKS = [
    { id: 'charm', text: 'Practice a charm (compliment someone).' },
    { id: 'potion', text: 'Brew a simple potion (make a cup of tea or coffee).' },
    { id: 'creature', text: 'Tend to a magical creature (pet an animal).' },
    { id: 'divination', text: 'Look into the future (plan one thing for tomorrow).' }
];

export const WIZARDING_FACTS = [
    "Dementors do not breed; they grow like fungi in dark, damp places.",
    "The Hogwarts motto is 'Draco Dormiens Nunquam Titillandus', which means 'Never tickle a sleeping dragon'.",
    "There are 700 possible Quidditch fouls.",
    "Fred and George Weasley were born on April Fools' Day.",
    "Nicolas Flamel, the creator of the Philosopher's Stone, was 665 years old when he decided to destroy it.",
    "A wizard who cannot perform magic is known as a Squib.",
    "The Knight Bus emergency number is 5-4-3-2-1 (FIVE-W-I-C-K-E-D).",
    "The core of Bellatrix Lestrange's wand is Dragon heartstring, and Hermione's is the same.",
    "Onamika is destined for great things!",
];