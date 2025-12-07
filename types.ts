export enum House {
    Gryffindor = 'Gryffindor',
    Slytherin = 'Slytherin',
    Ravenclaw = 'Ravenclaw',
    Hufflepuff = 'Hufflepuff',
}

export enum View {
    Journal = 'Journal',
    Remembrall = 'Remembrall',
    Potions = 'Potions', // Kept for mood data, but removed from nav
    Decrees = 'Decrees',
    Requirement = 'Requirement',
    Sorting = 'Sorting',
    Shop = 'Shop',
    Menagerie = 'Menagerie',
    GreatHall = 'GreatHall',
    Quidditch = 'Quidditch',
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

export interface FloatingReward {
    id: number;
    x: number;
    y: number;
    reward: 50 | 100;
    icon: string;
}

// --- Menagerie Types ---
export enum CreatureType {
    Niffler = 'Niffler',
    Bowtruckle = 'Bowtruckle',
    PygmyPuff = 'PygmyPuff',
}

export interface MagicalCreature {
    id: CreatureType;
    name: string;
    description: string;
    personality: string;
}

export interface CreatureState {
    id: CreatureType;
    name: string;
    energy: number; // 0-100
    lastFed: string;
    lastPlayed: string;
}

export interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: number;
    icon: string;
    energyBoost: number;
    forCreature: CreatureType[];
}

export interface PetChatMessage {
    role: 'user' | 'model';
    content: string;
}

export interface PetQuizQuestion {
    question: string;
    options: {
        text: string;
        value: 'shiny' | 'loyal' | 'cuddly';
    }[];
}

export type HousePoints = Record<House, number>;

export type QuidditchScores = Record<House, number>;