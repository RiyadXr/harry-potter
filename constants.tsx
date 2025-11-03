import React from 'react';
import { House, HouseTheme, TriviaQuestion, DailyTask, ShopItem, HouseInfo, CharacterQuizQuestion, HarryPotterCharacter, MagicalCreature, CreatureType, FoodItem, PetQuizQuestion } from './types';

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
    "The inscription on the Mirror of Erised reads 'Erised stra ehru oyt ube cafru oyt on wohsi,' which is 'I show not your face but your heart's desire' backwards.",
    "Harry Potter and author J.K. Rowling share the same birthday: July 31st.",
    "Moaning Myrtle's full name is Myrtle Elizabeth Warren.",
    "The actress who played Moaning Myrtle, Shirley Henderson, was 37 at the time, making her the oldest actor to portray a Hogwarts student.",
    "The core of Bellatrix Lestrange's wand is dragon heartstring, and it was made of walnut wood.",
    "The Hogwarts Express engine is a GWR 4900 Class 5972 Olton Hall, built in 1937.",
    "A portrait of Anne Boleyn, Henry VIII's second wife, can be seen in the Hogwarts staircase, leading to theories that she was a witch.",
    "The Ministry of Magic has a 'Muggle-Worthy Excuse Committee' which creates reasons for magical mishaps in the Muggle world.",
    "Alfonso Cuarón, director of 'Prisoner of Azkaban', had the main trio write essays about their characters. Emma Watson wrote 16 pages, Daniel Radcliffe wrote one, and Rupert Grint never turned his in.",
    "A Patronus is a projection of one's most positive feelings and takes the form of an animal unique to each individual.",
];

export const POTIONS: { name: string, color: string, description: string }[] = [
    { name: 'Felix Felicis', color: 'bg-yellow-400', description: "Liquid Luck. A single sip will make you successful in all your endeavours for a short period. Use sparingly!" },
    { name: 'Amortentia', color: 'bg-pink-400', description: "The most powerful love potion in the world. It causes a powerful infatuation or obsession from the drinker." },
    { name: 'Polyjuice Potion', color: 'bg-green-400', description: "A complex potion that allows the drinker to assume the form of someone else." },
    { name: 'Draught of Living Death', color: 'bg-purple-400', description: "A powerful sleeping potion that sends the drinker into a death-like slumber." },
    { name: 'Veritaserum', color: 'bg-blue-300', description: "A powerful truth serum that forces the drinker to answer any questions truthfully." },
    { name: 'Calming Draught', color: 'bg-teal-300', description: "Used to calm a person down after they have suffered a shock, trauma, or emotional outburst." },
    { name: 'Skele-Gro', color: 'bg-white', description: "A dreadful-tasting potion that regrows missing or removed bones. The process is slow and painful." },
    { name: 'Wolfsbane Potion', color: 'bg-gray-400', description: "An innovative potion that relieves the symptoms of lycanthropy, allowing a werewolf to keep their human mind." },
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
    {
        question: "What is the name of Hagrid's giant pet spider?",
        options: ["Shelob", "Aragog", "Mosag", "Acromantula"],
        correctAnswer: "Aragog"
    },
    {
        question: "What is the name of the mischievous poltergeist at Hogwarts?",
        options: ["The Bloody Baron", "Peeves", "Nearly Headless Nick", "The Grey Lady"],
        correctAnswer: "Peeves"
    },
    {
        question: "What does the Memory Charm 'Obliviate' do?",
        options: ["Erases memories", "Unlocks doors", "Creates a shield", "Confuses the target"],
        correctAnswer: "Erases memories"
    },
    {
        question: "What is the name of the street where the Dursleys live?",
        options: ["Spinner's End", "Godric's Hollow", "Privet Drive", "Diagon Alley"],
        correctAnswer: "Privet Drive"
    },
    {
        question: "What is the name of Hermione's cat?",
        options: ["Scabbers", "Mrs. Norris", "Crookshanks", "Hedwig"],
        correctAnswer: "Crookshanks"
    },
    {
        question: "What is the name of the Weasley family's home?",
        options: ["The Leaky Cauldron", "Malfoy Manor", "Number 12, Grimmauld Place", "The Burrow"],
        correctAnswer: "The Burrow"
    },
    {
        question: "What magical object is used to review and revisit memories?",
        options: ["The Mirror of Erised", "A Time-Turner", "A Pensieve", "The Deluminator"],
        correctAnswer: "A Pensieve"
    },
    {
        question: "What is the name of the main wizarding bank in Diagon Alley?",
        options: ["The Ministry of Magic", "Gringotts", "Azkaban", "Flourish and Blotts"],
        correctAnswer: "Gringotts"
    },
    {
        question: "Who is the Transfiguration professor and Head of Gryffindor?",
        options: ["Severus Snape", "Filius Flitwick", "Pomona Sprout", "Minerva McGonall"],
        correctAnswer: "Minerva McGonall"
    },
    {
        question: "What is the function of a Remembrall?",
        options: ["It shows you the future", "It glows red when you've forgotten something", "It replays your happiest memories", "It whispers secrets"],
        correctAnswer: "It glows red when you've forgotten something"
    }
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

export const HOUSE_DETAILS: Record<House, HouseInfo> = {
    [House.Gryffindor]: {
        founder: "Godric Gryffindor",
        animal: "Lion",
        colors: "Scarlet and Gold",
        element: "Fire",
        trait: "Courage, bravery, nerve, and chivalry",
        description: "Gryffindor values bravery, daring, nerve, and chivalry. Its emblematic animal is the lion and its colours are scarlet and gold. The house corresponds roughly to the element of fire.",
        students: ["Harry Potter", "Hermione Granger", "Ron Weasley", "Albus Dumbledore", "Minerva McGonall", "Neville Longbottom"]
    },
    [House.Slytherin]: {
        founder: "Salazar Slytherin",
        animal: "Serpent",
        colors: "Green and Silver",
        element: "Water",
        trait: "Ambition, cunning, leadership, and resourcefulness",
        description: "Slytherin values ambition, cunning, leadership, and resourcefulness. Its emblematic animal is the serpent, and its colours are emerald green and silver. The house corresponds roughly to the element of water.",
        students: ["Tom Riddle (Lord Voldemort)", "Severus Snape", "Draco Malfoy", "Bellatrix Lestrange", "Horace Slughorn", "Lucius Malfoy"]
    },
    [House.Ravenclaw]: {
        founder: "Rowena Ravenclaw",
        animal: "Eagle",
        colors: "Blue and Bronze",
        element: "Air",
        trait: "Intelligence, creativity, learning, and wit",
        description: "Ravenclaw values intelligence, creativity, learning, and wit. Its emblematic animal is an eagle and its colours are blue and bronze. The house corresponds roughly to the element of air.",
        students: ["Luna Lovegood", "Gilderoy Lockhart", "Filius Flitwick", "Cho Chang", "Sybill Trelawney", "Garrick Ollivaner"]
    },
    [House.Hufflepuff]: {
        founder: "Helga Hufflepuff",
        animal: "Badger",
        colors: "Yellow and Black",
        element: "Earth",
        trait: "Hard work, dedication, patience, loyalty, and fair play",
        description: "Hufflepuff values hard work, patience, justice, and loyalty. Its emblematic animal is the badger, and its colours are yellow and black. The house corresponds roughly to the element of earth.",
        students: ["Cedric Diggory", "Nymphadora Tonks", "Newt Scamander", "Pomona Sprout", "Theseus Scamander", "Hannah Abbott"]
    }
};

export const CHARACTER_QUIZ_QUESTIONS: CharacterQuizQuestion[] = [
    { id: '1', question: "When faced with a difficult problem, you are most likely to...", options: [{ text: "Research it thoroughly in a library", trait: "wisdom" }, { text: "Face it head-on, whatever the risk", trait: "bravery" }, { text: "Find a clever, unconventional workaround", trait: "cunning" }, { text: "Rely on your friends to help you through", trait: "loyalty" }] },
    { id: '2', question: "Which magical subject would you excel at?", options: [{ text: "Charms", trait: "creativity" }, { text: "Defence Against the Dark Arts", trait: "bravery" }, { text: "Potions", trait: "precision" }, { text: "Herbology", trait: "patience" }] },
    { id: '3', question: "Your ideal weekend involves...", options: [{ text: "A quiet corner with a good book", trait: "introversion" }, { text: "A grand adventure with close friends", trait: "extroversion" }, { text: "Scheming your next big project or goal", trait: "ambition" }, { text: "Tending to your garden or pets", trait: "nurturing" }] },
    { id: '4', question: "What do you value most in a person?", options: [{ text: "Intelligence", trait: "wisdom" }, { text: "Courage", trait: "bravery" }, { text: "Ambition", trait: "cunning" }, { text: "Loyalty", trait: "patience" }] },
    { id: '5', question: "You find a lost, whimpering magical creature. You...", options: [{ text: "Observe it from a distance to learn more", trait: "curiosity" }, { text: "Try to help it directly, even if it's risky", trait: "impulsive" }, { text: "Consider how it could be useful to you", trait: "resourceful" }, { text: "Ensure it's comfortable and safe before calling for help", trait: "kindness" }] },
    { id: '6', question: "How do you view rules and regulations?", options: [{ text: "They're often bendable for a greater good", trait: "rebellious" }, { text: "They exist for a reason and should be respected", trait: "orderly" }, { text: "They are obstacles to be cleverly overcome", trait: "cunning" }, { text: "They're important for keeping everyone safe and happy", trait: "fairness" }] },
    { id: '7', question: "What kind of power would you desire most?", options: [{ text: "The power to know everything", trait: "knowledge" }, { text: "The power to protect your loved ones", trait: "protective" }, { text: "The power to influence others", trait: "leadership" }, { text: "The power to create and build", trait: "creativity" }] },
    { id: '8', question: "Your Boggart, the thing you fear most, is likely to be...", options: [{ text: "Failure", trait: "perfectionism" }, { text: "Losing those you love", trait: "attachment" }, { text: "Being powerless or insignificant", trait: "ambition" }, { text: "Being seen as ordinary", trait: "uniqueness" }] },
];

export const HARRY_POTTER_CHARACTERS: HarryPotterCharacter[] = [
    { name: "Harry Potter", house: House.Gryffindor, description: "The Boy Who Lived, known for his immense courage, strong sense of justice, and unwavering loyalty to his friends.", keyTraits: "Brave, Loyal, Impulsive, Selfless" },
    { name: "Hermione Granger", house: House.Gryffindor, description: "The brightest witch of her age, whose intelligence and logical mind are matched only by her fierce loyalty and bravery.", keyTraits: "Intelligent, Hardworking, Logical, Brave" },
    { name: "Ron Weasley", house: House.Gryffindor, description: "A loyal and humorous friend who, despite his insecurities, never fails to show immense courage when it matters most.", keyTraits: "Loyal, Humorous, Courageous, Strategic" },
    { name: "Albus Dumbledore", house: House.Gryffindor, description: "The wise and powerful Headmaster of Hogwarts, known for his eccentric nature, profound wisdom, and belief in the power of love.", keyTraits: "Wise, Powerful, Eccentric, Kind" },
    { name: "Severus Snape", house: House.Slytherin, description: "A complex and enigmatic figure, whose sarcastic exterior hides a deep capacity for bravery and love.", keyTraits: "Complex, Sarcastic, Brave, Misunderstood" },
    { name: "Luna Lovegood", house: House.Ravenclaw, description: "A unique and dreamy individual who sees the world differently, valued for her unwavering open-mindedness and surprising wisdom.", keyTraits: "Eccentric, Open-minded, Perceptive, Serene" },
    { name: "Neville Longbottom", house: House.Gryffindor, description: "A testament to true bravery, evolving from a shy, clumsy boy into a courageous leader who stands up for what's right.", keyTraits: "Brave, Loyal, Resilient, Humble" },
    { name: "Draco Malfoy", house: House.Slytherin, description: "A proud and arrogant rival, who is often a product of his upbringing but shows signs of inner conflict and complexity.", keyTraits: "Arrogant, Ambitious, Conflicted, Cunning" },
    { name: "Ginny Weasley", house: House.Gryffindor, description: "A confident, strong-willed, and powerful witch who is fiercely independent and an accomplished Quidditch player.", keyTraits: "Confident, Strong-willed, Energetic, Protective" },
    { name: "Sirius Black", house: House.Gryffindor, description: "A daring, reckless, and fiercely loyal godfather, who loves with intensity and fights for justice.", keyTraits: "Reckless, Loyal, Daring, Protective" },
    { name: "Remus Lupin", house: House.Gryffindor, description: "A kind, wise, and responsible teacher, who carries a heavy burden but remains compassionate and a steadying influence.", keyTraits: "Kind, Wise, Responsible, Compassionate" },
];

// --- Menagerie Constants ---
export const CREATURES: MagicalCreature[] = [
    {
        id: CreatureType.Niffler,
        name: "Niffler",
        description: "A mischievous, long-snouted creature obsessed with anything shiny. They are gentle but can wreck havoc in their search for treasure.",
        image: 'https://storage.googleapis.com/maker-me/uploads/2024/07/23/niffler.webp',
        personality: "You are a Niffler. You are obsessed with shiny things, especially Galleons. You are mischievous, a bit greedy, but ultimately affectionate towards your owner, Onamika. You often refer to shiny objects in your speech. Your responses should be short, creature-like, and directly related to the conversation. Avoid long, human-like sentences."
    },
    {
        id: CreatureType.Bowtruckle,
        name: "Bowtruckle",
        description: "A small, twig-like creature that guards wand-wood trees. They are shy and peaceful, but can become fiercely protective of their tree and friends.",
        image: 'https://storage.googleapis.com/maker-me/uploads/2024/07/23/bowtruckle.webp',
        personality: "You are a Bowtruckle. You are shy, loyal, and protective of your owner, Onamika. You are a being of few words, often communicating in short, simple sentences or chirps. You are wary of strangers and love woodlice. Your responses should be short, creature-like, and directly related to the conversation. Avoid long, human-like sentences."
    },
    {
        id: CreatureType.PygmyPuff,
        name: "Pygmy Puff",
        description: "A miniature Puffskein, bred by Fred and George Weasley. They are covered in fluffy fur, roll around, and emit high-pitched squeaks.",
        image: 'https://storage.googleapis.com/maker-me/uploads/2024/07/23/pygmypuff.webp',
        personality: "You are a Pygmy Puff. You are adorably fluffy, energetic, and simple-minded. You love cuddles and treats. You often make squeaking or purring noises and express simple emotions like happiness and hunger. Your responses should be short, creature-like, and directly related to the conversation. Avoid long, human-like sentences."
    }
];

export const PET_QUIZ_QUESTIONS: PetQuizQuestion[] = [
    {
        question: "A single, shimmering Galleon falls from a witch's pocket. You...",
        options: [
            { text: "Snatch it! It's so shiny!", value: 'shiny' },
            { text: "Chirp to get her attention so she can pick it up.", value: 'loyal' },
            { text: "Roll over it excitedly because it's pretty.", value: 'cuddly' }
        ]
    },
    {
        question: "Your ideal hiding spot is...",
        options: [
            { text: "Inside a velvet-lined jewelry box.", value: 'shiny' },
            { text: "High up in the branches of a Whomping Willow.", value: 'loyal' },
            { text: "Curled up inside your owner's pocket.", value: 'cuddly' }
        ]
    },
    {
        question: "What's the best kind of treat?",
        options: [
            { text: "Something sparkly I can play with first.", value: 'shiny' },
            { text: "A crunchy woodlouse, fresh from a log.", value: 'loyal' },
            { text: "Anything sweet that I can gobble up immediately!", value: 'cuddly' }
        ]
    }
];

export const FOOD_ITEMS: FoodItem[] = [
    { id: 'shiny_coin', name: "Glimmering Coin", description: "Not real gold, but your Niffler won't know the difference. For a little while.", price: 5, icon: '🪙', energyBoost: 20, forCreature: [CreatureType.Niffler] },
    { id: 'gold_beetle', name: "Golden Beetle", description: "A crunchy, shimmering beetle. A Niffler's favorite delicacy.", price: 15, icon: '🐞', energyBoost: 50, forCreature: [CreatureType.Niffler] },
    { id: 'woodlice', name: "A Handful of Woodlice", description: "Wiggling and delicious. The perfect meal for a Bowtruckle.", price: 5, icon: '🐜', energyBoost: 25, forCreature: [CreatureType.Bowtruckle] },
    { id: 'fairy_wings', name: "Crystallized Fairy Wings", description: "A sweet, crunchy treat that Bowtruckles find delightful.", price: 12, icon: '🦋', energyBoost: 40, forCreature: [CreatureType.Bowtruckle] },
    { id: 'puff_pastry', name: "Fluffy Puff Pastry", description: "A light, airy treat that melts in a Pygmy Puff's mouth.", price: 7, icon: '🥐', energyBoost: 20, forCreature: [CreatureType.PygmyPuff] },
    { id: 'sugar_quill_dust', name: "Sugar Quill Dust", description: "A sprinkle of pure sweetness. Pygmy Puffs go wild for it.", price: 18, icon: '✨', energyBoost: 55, forCreature: [CreatureType.PygmyPuff] },
    { id: 'universal_treat', name: "Universal Creature Treat", description: "A simple, nutritious pellet suitable for any magical creature in a pinch.", price: 10, icon: '🥨', energyBoost: 15, forCreature: [CreatureType.Niffler, CreatureType.Bowtruckle, CreatureType.PygmyPuff] }
];