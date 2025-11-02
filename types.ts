// FIX: Removed a self-import of 'House' that was causing a conflict with its own declaration.
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
    Requirement = 'Requirement',
    Sorting = 'Sorting',
    Test = 'Test',
    Shop = 'Shop',
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

export interface Exam {
    name: string;
    description: string;
    icon: string;
    questions: TriviaQuestion[];
}

export interface DailyProphetArticle {
    headline: string;
    article: string;
}

export interface ShopItem {
    id:string;
    name: string;
    description: string;
    price: number;
    icon: string;
}

export interface HouseInfo {
    founder: string;
    animal: string;
    colors: string;
    element: string;
    trait: string;
    description: string;
    students: string[];
}

export interface CharacterQuizQuestion {
    id: string;
    question: string;
    options: { text: string; trait: string }[];
}

export interface HarryPotterCharacter {
    name: string;
    house: House | 'Unknown';
    description: string;
    keyTraits: string;
}

export interface CharacterMatchResult {
    characterName: string;
    reasoning: string;
}
