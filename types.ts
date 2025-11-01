export enum House {
    Gryffindor = 'Gryffindor',
    Slytherin = 'Slytherin',
    Ravenclaw = 'Ravenclaw',
    Hufflepuff = 'Hufflepuff',
}

export enum View {
    Journal = 'Journal',
    Remembrall = 'Remembrall',
    Potions = 'Potions',
    Decrees = 'Decrees',
    Settings = 'Settings',
    Sorting = 'Sorting',
}

export interface JournalEntry {
    id: number;
    date: string;
    content: string;
    mood: string;
}

export interface Task {
    id: number;
    text: string;
    completed: boolean;
}

export interface Mood {
    id: number;
    date: string;
    potion: string;
    color: string;
}

export interface HouseTheme {
    primary: string;
    secondary: string;
    text: string;
    accent: string;
    border: string;
}

export interface SortingResult {
    house: House;
    reasoning: string;
}

export interface DailyTask {
    id: string;
    text: string;
    realTask: string;
    completed: boolean;
}

export interface TriviaQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}
