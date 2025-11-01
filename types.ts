// FIX: Removed self-import of `House` which was causing a circular dependency.
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
  Sorting = 'Sorting',
  Settings = 'Settings',
  Decrees = 'Decrees',
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

export interface DailyTask {
    id: string;
    text: string;
    completed: boolean;
}

export interface Mood {
  id: number;
  date: string;
  potion: string;
  color: string;
}

export interface Potion {
  name: string;
  description: string;
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