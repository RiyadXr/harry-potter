import React from 'react';
import { House, HouseTheme, TriviaQuestion } from './types';

export const HOUSE_THEMES: Record<House, HouseTheme> = {
    [House.Gryffindor]: {
        primary: 'bg-[#740001]',
        secondary: 'bg-[#AE0001]',
        text: 'text-[#EEBA30]',
        accent: 'text-[#D3A625]',
        border: 'border-[#D3A625]',
    },
    [House.Slytherin]: {
        primary: 'bg-[#1A472A]',
        secondary: 'bg-[#2A623D]',
        text: 'text-[#AAAAAA]',
        accent: 'text-[#AAAAAA]',
        border: 'border-[#555555]',
    },
    [House.Ravenclaw]: {
        primary: 'bg-[#0E1A40]',
        secondary: 'bg-[#222F5B]',
        text: 'text-[#946B2D]',
        accent: 'text-[#BEBEBE]',
        border: 'border-[#946B2D]',
    },
    [House.Hufflepuff]: {
        primary: 'bg-[#FFDB00]',
        secondary: 'bg-[#FFED86]',
        text: 'text-black',
        accent: 'text-black',
        border: 'border-black',
    },
};

export const WIZARDING_FACTS: string[] = [
    "Dumbledore's full name is Albus Percival Wulfric Brian Dumbledore.",
    "A Patronus is a magical guardian that takes the shape of an animal.",
    "There are 700 possible Quidditch fouls.",
    "The Hogwarts motto is 'Draco Dormiens Nunquam Titillandus', which means 'Never tickle a sleeping dragon'.",
    "The core of Harry Potter's wand is a phoenix feather from Fawkes.",
    "Voldemort's real name is Tom Marvolo Riddle.",
    "There are three Unforgivable Curses: Avada Kedavra, Cruciatus, and Imperius."
];

export const ICONS = {
    JOURNAL: <span className="text-2xl">📖</span>,
    REMEMBERALL: <span className="text-2xl">🔮</span>,
    DECREES: <span className="text-2xl">📜</span>,
    POTIONS: <span className="text-2xl">🧪</span>,
    SETTINGS: <span className="text-2xl">⚙️</span>,
    QUILL: <span className="mr-2">✒️</span>,
    EDIT: <span className="text-lg">✏️</span>,
    SPARKLES: <span className="text-6xl">✨</span>
};

export const POTIONS = [
    { name: 'Felix Felicis', color: 'bg-yellow-300' },
    { name: 'Draught of Peace', color: 'bg-blue-300' },
    { name: 'Amortentia', color: 'bg-pink-300' },
    { name: 'Polyjuice Potion', color: 'bg-green-300' },
    { name: 'Veritaserum', color: 'bg-gray-300' },
    { name: 'Elixir of Life', color: 'bg-red-300' },
];

export const SORTING_QUIZ_QUESTIONS = [
    {
        question: "Which quality do you value most?",
        options: [
            { text: "Courage", value: "courage" },
            { text: "Ambition", value: "ambition" },
            { text: "Wisdom", value: "wisdom" },
            { text: "Loyalty", value: "loyalty" },
        ]
    },
    {
        question: "You're late for a class. What do you do?",
        options: [
            { text: "Run, and hope for the best.", value: "daring" },
            { text: "Find a clever shortcut.", value: "cunning" },
            { text: "Apologize profusely to the professor.", value: "fairness" },
            { text: "Accept the consequences and plan better next time.", value: "patience" },
        ]
    },
    {
        question: "What kind of magical creature fascinates you most?",
        options: [
            { text: "Phoenix", value: "bravery" },
            { text: "Dragon", value: "power" },
            { text: "Sphinx", value: "wit" },
            { text: "Hippogriff", value: "friendship" },
        ]
    },
    {
        question: "If you could have one magical item, what would it be?",
        options: [
            { text: "The Sword of Gryffindor", value: "chivalry" },
            { text: "A powerful, ancient spellbook", value: "knowledge" },
            { text: "A time-turner to fix mistakes", value: "justice" },
            { text: "A pensieve to store memories", value: "introspection" },
        ]
    }
];

export const WIZARDING_TASKS_POOL = [
    { id: 'task_1', text: 'Brew a Calming Draught', realTask: 'make a cup of tea or coffee' },
    { id: 'task_2', text: 'Consult the Marauder\'s Map', realTask: 'plan out your day\'s schedule' },
    { id: 'task_3', text: 'Tidy your Potions ingredients', realTask: 'organize a shelf or drawer' },
    { id: 'task_4', text: 'Send a message by Owl Post', realTask: 'text or call a friend' },
    { id: 'task_5', text: 'Practice a Levitation Charm', realTask: 'do a quick 5-minute tidy up' },
    { id: 'task_6', text: 'Read a passage from "Fantastic Beasts"', realTask: 'read for 10 minutes' },
    { id: 'task_7', text: 'Tend to a Mandrake', realTask: 'water a houseplant' },
    { id: 'task_8', text: 'Polish your Quidditch broom', realTask: 'clean something you use daily' },
    { id: 'task_9', text: 'Attend Divination class', realTask: 'write down one goal for the week' },
    { id: 'task_10', text: 'Defend Against the Dark Arts', realTask: 'do something that makes you feel strong' },
    { id: 'task_11', text: 'Visit the Hogwarts Library', realTask: 'learn one new thing today' },
    { id: 'task_12', text: 'Feed a Hippogriff', realTask: 'give a pet a treat or feed the birds' },
    { id: 'task_13', text: 'Use a Mending Charm', realTask: 'fix something small that is broken' },
    { id: 'task_14', text: 'Study Herbology', realTask: 'spend 5 minutes in nature' },
    { id: 'task_15', text: 'Escape the Dursleys\'', realTask: 'go for a short walk outside' },
];

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
    {
        question: "What is the name of Hagrid's pet Acromantula?",
        options: ["Norbert", "Aragog", "Buckbeak", "Fang"],
        correctAnswer: "Aragog"
    },
    {
        question: "Which of these is NOT one of the Unforgivable Curses?",
        options: ["Cruciatus Curse", "Imperius Curse", "Sectumsempra", "Avada Kedavra"],
        correctAnswer: "Sectumsempra"
    },
    {
        question: "What does the charm 'Wingardium Leviosa' do?",
        options: ["Unlocks doors", "Summons objects", "Makes objects fly", "Creates light"],
        correctAnswer: "Makes objects fly"
    },
    {
        question: "Who is the Half-Blood Prince?",
        options: ["Harry Potter", "Tom Riddle", "Severus Snape", "Albus Dumbledore"],
        correctAnswer: "Severus Snape"
    },
    {
        question: "What position does Harry Potter play in Quidditch?",
        options: ["Seeker", "Chaser", "Beater", "Keeper"],
        correctAnswer: "Seeker"
    }
];
