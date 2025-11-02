import React from 'react';
import { House, HouseTheme, TriviaQuestion, DailyTask, ShopItem } from './types';

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
    DELETE: <>🗑️</>,
    SPARKLES: <>✨</>,
    BROOM: <>🧹</>,
    OWL: <>🦉</>,
    TESTS: <>🎓</>,
    ENVELOPE: <>✉️</>,
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

export const EXAM_TITLES: string[] = [
    "O.W.L. Practice Paper",
    "Ministry of Magic Competency Exam",
    "Witchcraft & Wizardry Aptitude Test",
    "Standard Book of Spells Quiz",
    "Triwizard Tournament Trivia Challenge"
];

export const ALL_EXAM_QUESTIONS: TriviaQuestion[] = [
    // DADA
    { question: "What is the incantation for the Shield Charm?", options: ["Protego", "Expelliarmus", "Stupefy", "Expecto Patronum"], correctAnswer: "Protego" },
    { question: "What does the Riddikulus charm do?", options: ["Repels Dementors", "Forces a Boggart to take a comical form", "Disarms an opponent", "Unlocks doors"], correctAnswer: "Forces a Boggart to take a comical form" },
    { question: "Which of these is NOT a Dark Mark component?", options: ["A skull", "A serpent", "A lightning bolt", "A tongue protruding from the serpent's mouth"], correctAnswer: "A lightning bolt" },
    { question: "What is the most effective way to repel a Dementor?", options: ["The Stunning Spell", "The Patronus Charm", "The Disarming Charm", "The Killing Curse"], correctAnswer: "The Patronus Charm" },
    { question: "What creature pulls the Hogwarts carriages?", options: ["Hippogriffs", "Thestrals", "Unicorns", "Centaurs"], correctAnswer: "Thestrals" },
    { question: "What is a known side effect of the Cruciatus Curse?", options: ["Instant death", "Intense, unbearable pain", "Total memory loss", "Loss of free will"], correctAnswer: "Intense, unbearable pain" },
    // Potions
    { question: "Which ingredient is NOT in the Polyjuice Potion?", options: ["Lacewing flies", "Leeches", "Fluxweed", "Mandrake root"], correctAnswer: "Mandrake root" },
    { question: "What is the primary effect of Felix Felicis?", options: ["It induces love", "It forces the drinker to tell the truth", "It grants the drinker extreme luck", "It allows one to breathe underwater"], correctAnswer: "It grants the drinker extreme luck" },
    { question: "What is a bezoar?", options: ["A stone from the stomach of a goat that protects from most poisons", "A magical plant used in sleeping draughts", "A type of magical egg", "A powerful truth serum"], correctAnswer: "A stone from the stomach of a goat that protects from most poisons" },
    { question: "The Draught of Living Death puts the drinker into...", options: ["A deep, death-like sleep", "A fit of uncontrollable laughter", "A state of extreme anger", "A trance where they reveal secrets"], correctAnswer: "A deep, death-like sleep" },
    { question: "What is the main ingredient in a Calming Draught?", options: ["Lavender", "Wormwood", "Asphodel", "Bezoar"], correctAnswer: "Lavender" },
    // Charms
    { question: "What is the incantation to summon an object?", options: ["Accio", "Alohomora", "Lumos", "Expelliarmus"], correctAnswer: "Accio" },
    { question: "The Levitation Charm is 'Wingardium Leviosa'. What is the correct wand movement?", options: ["A sharp jab", "A swirl and a flick", "Swish and flick", "Point and hold"], correctAnswer: "Swish and flick" },
    { question: "What does the spell 'Lumos' do?", options: ["Creates a loud bang", "Creates light at the wand tip", "Opens locked doors", "Repels water"], correctAnswer: "Creates light at the wand tip" },
    { question: "Which charm would you use to repair a pair of broken glasses?", options: ["Reparo", "Reducio", "Engorgio", "Diffindo"], correctAnswer: "Reparo" },
    { question: "What does the charm 'Alohomora' do?", options: ["Unlocks doors", "Summons objects", "Creates a shield", "Makes things float"], correctAnswer: "Unlocks doors" },
    { question: "The Muffliato charm fills the ears of those nearby with what?", options: ["Unidentifiable buzzing", "Beautiful music", "Complete silence", "The caster's voice"], correctAnswer: "Unidentifiable buzzing" },
];

export const SHOP_ITEMS: ShopItem[] = [
    { id: 'beans', name: "Bertie Bott's Beans", description: "A risky treat. Will you get toffee or earwax?", price: 15, icon: '🍬' },
    { id: 'frog', name: "Chocolate Frog", description: "Comes with a collectible card of a famous witch or wizard!", price: 20, icon: '🐸' },
    { id: 'ticket', name: "Hogwarts Express Ticket", description: "A one-way trip on the famed scarlet steam engine.", price: 50, icon: '🎟️' },
    { id: 'scarf', name: "House Scarf", description: "Show your house pride, no matter the weather.", price: 60, icon: '🧣' },
    { id: 'map', name: "Marauder's Map", description: "I solemnly swear that I am up to no good.", price: 75, icon: '🗺️' },
    { id: 'snitch', name: "Golden Snitch", description: "The most important ball of the lot. Worth 150 points.", price: 100, icon: '✨' },
    { id: 'remembrall', name: "Remembrall", description: "The smoke turns red when you've forgotten something.", price: 120, icon: '🔮' },
    { id: 'howler', name: "Howler", description: "Deliver a message with... emphasis. Best opened in private.", price: 180, icon: '🧧' },
    { id: 'timeturner', name: "Time Turner", description: "Use with caution. Three turns should do it.", price: 250, icon: '⏳' },
    { id: 'potionbook', name: "Advanced Potion-Making", description: "Property of the Half-Blood Prince.", price: 300, icon: '📖' },
    { id: 'cloak', name: "Invisibility Cloak", description: "A true heirloom, passed down through generations.", price: 500, icon: '👻' },
    { id: 'nimbus', name: "Nimbus 2000", description: "State-of-the-art racing broom. Outstrips the Cleansweep series.", price: 750, icon: '🧹' },
    { id: 'stone', name: "Philosopher's Stone", description: "An alchemical marvel that grants eternal life.", price: 1500, icon: '💎' },
    { id: 'sword', name: "Sword of Gryffindor", description: "Only a true Gryffindor could have pulled that out of the hat.", price: 2000, icon: '⚔️' },
    { id: 'elderwand', name: "The Elder Wand", description: "The most powerful wand ever made. The Wand of Destiny.", price: 5000, icon: '🪄' },
];