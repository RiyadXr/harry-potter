import React from 'react';
import { House, HouseTheme, TriviaQuestion, DailyTask } from './types';

export const HOUSE_THEMES: Record<House, HouseTheme> = {
    [House.Gryffindor]: {
        primary: 'bg-[#740001]',
        secondary: 'bg-[#ae0001]',
        text: 'text-[#f0c564]',
        accent: 'text-[#d3a625]',
        border: 'border-[#d3a625]',
    },
    [House.Slytherin]: {
        primary: 'bg-[#1a472a]',
        secondary: 'bg-[#2a623d]',
        text: 'text-[#aaaaaa]',
        accent: 'text-[#c0c0c0]',
        border: 'border-[#c0c0c0]',
    },
    [House.Ravenclaw]: {
        primary: 'bg-[#0e1a40]',
        secondary: 'bg-[#222f5b]',
        text: 'text-[#946b2d]',
        accent: 'text-[#be8a3e]',
        border: 'border-[#be8a3e]',
    },
    [House.Hufflepuff]: {
        primary: 'bg-[#f0c75e]',
        secondary: 'bg-[#e3b55a]',
        text: 'text-[#372e29]',
        accent: 'text-[#000000]',
        border: 'border-[#000000]',
    },
};

export const WIZARDING_FACTS: string[] = [
    "The Hogwarts motto is 'Draco Dormiens Nunquam Titillandus', which means 'Never tickle a sleeping dragon'.",
    "Dementors don't breed, but grow like fungi where there is decay.",
    "There are 700 possible Quidditch fouls.",
    "The spell 'Avada Kedavra' is derived from an Aramaic phrase meaning 'I will destroy as I speak'.",
    "Fred and George Weasley were born on April Fool's Day.",
    "A wizard who cannot perform magic is known as a Squib.",
    "The Knight Bus emergency number is 6-2-4-4-2 (MAGIC on a phone keypad).",
];

export const POTIONS: { name: string, color: string }[] = [
    { name: 'Felix Felicis', color: 'bg-yellow-400' },
    { name: 'Amortentia', color: 'bg-pink-400' },
    { name: 'Polyjuice Potion', color: 'bg-green-400' },
    { name: 'Draught of Living Death', color: 'bg-purple-400' },
    { name: 'Veritaserum', color: 'bg-blue-300' },
    { name: 'Calming Draught', color: 'bg-teal-300' },
    { name: 'Skele-Gro', color: 'bg-white' },
    { name: 'Wolfsbane Potion', color: 'bg-gray-400' },
];

export const ICONS = {
    QUILL: <span className="mr-2">✒️</span>,
    EDIT: <>✏️</>,
    SPARKLES: <>✨</>
};

export const SORTING_QUIZ_QUESTIONS = [
    {
        question: "You're locked out of a room. Do you...",
        options: [
            { text: "Find the key, no matter how long it takes.", value: "patience" },
            { text: "Blast the lock off. What's the point in waiting?", value: "bravery" },
            { text: "Look for another way in, perhaps a secret passage.", value: "cunning" },
            { text: "Knock and ask politely if someone could open it.", value: "wisdom" }
        ],
    },
    {
        question: "Which magical creature do you find most fascinating?",
        options: [
            { text: "A Phoenix, for its loyalty and healing tears.", value: "bravery" },
            { text: "A Basilisk, for its sheer power and influence.", value: "cunning" },
            { text: "A Sphinx, for its intellect and riddles.", value: "wisdom" },
            { text: "A Niffler, for its adorable and determined nature.", value: "patience" }
        ],
    },
    {
        question: "What would you rather be known for?",
        options: [
            { text: "Your ambition and leadership.", value: "cunning" },
            { text: "Your courage and daring.", value: "bravery" },
            { text: "Your intelligence and wit.", value: "wisdom" },
            { text: "Your kindness and fairness.", value: "patience" }
        ],
    },
    {
        question: "A troll has gone berserk in the dungeons. You...",
        options: [
            { text: "Go straight to the troll to face it.", value: "bravery" },
            { text: "Inform a professor immediately.", value: "wisdom" },
            { text: "Use it as a diversion to explore a restricted area.", value: "cunning" },
            { text: "Make sure everyone else is safe.", value: "patience" }
        ],
    },
];


export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
    {
        question: "What is the core of Harry Potter's wand?",
        options: ["Dragon heartstring", "Unicorn hair", "Phoenix feather", "Thestral tail hair"],
        correctAnswer: "Phoenix feather"
    },
    {
        question: "Which of these is NOT one of the Unforgivable Curses?",
        options: ["Crucio", "Imperio", "Sectumsempra", "Avada Kedavra"],
        correctAnswer: "Sectumsempra"
    },
    {
        question: "What position does Harry Potter play on his Quidditch team?",
        options: ["Seeker", "Chaser", "Beater", "Keeper"],
        correctAnswer: "Seeker"
    },
    {
        question: "Who was the heir of Slytherin?",
        options: ["Draco Malfoy", "Harry Potter", "Tom Riddle", "Severus Snape"],
        correctAnswer: "Tom Riddle"
    },
];

export const WIZARDING_TASKS_POOL: Omit<DailyTask, 'completed'>[] = [
    { id: '1', text: "Polish the House Trophies", realTask: "Tidy up your room" },
    { id: '2', text: "Feed the Hippogriffs", realTask: "Feed a pet (or a plant)" },
    { id: '3', text: "Practice 'Wingardium Leviosa' on a feather", realTask: "Do 5 minutes of stretching" },
    { id: '4', text: "Re-pot a Mandrake", realTask: "Water the plants" },
    { id: '5', text: "Brew a Calming Draught", realTask: "Make a cup of tea/coffee" },
    { id: '6', text: "Send an Owl to a friend", realTask: "Text a friend you haven't spoken to in a while" },
    { id: '7', text: "Study for your O.W.L.s", realTask: "Read a chapter of a book" },
    { id: '8', text: "Organize your potion ingredients", realTask: "Organize your desk or a drawer" },
    { id: '9', text: "Escape the Devil's Snare", realTask: "Untangle some headphones or cables" },
    { id: '10', text: "Defend against a Boggart", realTask: "Think of something you're grateful for" },
];
