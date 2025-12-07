import { GoogleGenAI, Type, Content } from "@google/genai";
import { House, SortingResult, DailyProphetArticle, CharacterMatchResult, MagicalCreature, PetChatMessage, CreatureType } from '../types';
import { HARRY_POTTER_CHARACTERS, CREATURES } from "../constants";

export const getSortingHatDecision = async (answers: string[], apiKey: string): Promise<SortingResult> => {
    
    if (!apiKey) {
        console.error("API key was not provided to the Sorting Hat.");
        return {
            house: House.Hufflepuff,
            reasoning: "The Sorting Hat's connection is weak. The Headmaster must provide the secret key (API_KEY) to the castle's magic."
        };
    }
    
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
        You are the Sorting Hat from Harry Potter.
        A student has answered the following questions based on their choices with values like 'patience', 'bravery', 'cunning', 'wisdom':
        1. "You're locked out of a room. Do you..." - Answer: ${answers[0] || 'not answered'}
        2. "Which magical creature do you find most fascinating?" - Answer: ${answers[1] || 'not answered'}
        3. "What would you rather be known for?" - Answer: ${answers[2] || 'not answered'}
        4. "A troll has gone berserk in the dungeons. You..." - Answer: ${answers[3] || 'not answered'}

        Based on these answers, sort the student into one of the four Hogwarts houses: Gryffindor, Slytherin, Ravenclaw, or Hufflepuff.
        Provide your decision and a brief, wise, and slightly poetic reasoning for your choice, as the Sorting Hat would.
        Return the response in JSON format.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        house: {
                            type: Type.STRING,
                            description: 'The Hogwarts house.',
                            enum: [House.Gryffindor, House.Slytherin, House.Ravenclaw, House.Hufflepuff]
                        },
                        reasoning: {
                            type: Type.STRING,
                            description: 'The reasoning for the sorting decision.'
                        }
                    },
                    required: ['house', 'reasoning']
                }
            }
        });

        const text = response.text;
        const result = JSON.parse(text);

        if (Object.values(House).includes(result.house) && typeof result.reasoning === 'string') {
            return result as SortingResult;
        } else {
            console.error("Invalid response format from Gemini:", result);
            return { house: House.Hufflepuff, reasoning: "The Sorting Hat is feeling indecisive today, but sees a loyal heart. Welcome to Hufflepuff!" };
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return {
            house: House.Hufflepuff,
            reasoning: "The connection to the headmaster's office is fuzzy... but I sense great loyalty in you. Better be... Hufflepuff!"
        };
    }
};

export const generateDailyProphetArticle = async (summary: string, userName: string, apiKey: string): Promise<DailyProphetArticle> => {
    if (!apiKey) {
        console.error("API key was not provided to the Quick-Quotes Quill.");
        return {
            headline: "Quill Runs Dry!",
            article: "The magical Quick-Quotes Quill has sputtered to a halt. It seems the Headmaster's secret key is required to replenish its ink. Please ensure the key is correctly configured in the Sorting Hat screen."
        };
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are a witty, slightly dramatic journalist for the Daily Prophet, the premier newspaper of the wizarding world. Your task is to take a brief summary of a witch or wizard's day and turn it into a short, sensationalized newspaper article. The witch's name is ${userName}. Always maintain a magical, Harry Potter-esque tone. Be creative and whimsical.

Here is the summary of ${userName}'s day: "${summary}".

Now, write a Daily Prophet article about it.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        headline: {
                            type: Type.STRING,
                            description: 'A catchy, sensationalized headline for the article.'
                        },
                        article: {
                            type: Type.STRING,
                            description: 'The body of the newspaper article, written in a dramatic, wizarding-world style.'
                        }
                    },
                    required: ['headline', 'article']
                }
            }
        });

        const text = response.text;
        const result = JSON.parse(text);

        if (typeof result.headline === 'string' && typeof result.article === 'string') {
            return result as DailyProphetArticle;
        } else {
            console.error("Invalid response format from Gemini for Daily Prophet:", result);
            return {
                headline: "Communication Disruption!",
                article: "An owl carrying our correspondent's report seems to have been caught in a magical squall. The message is scrambled. Please try again later."
            };
        }

    } catch (error) {
        console.error("Error calling Gemini API for Daily Prophet:", error);
        return {
            headline: "Communication Disruption!",
            article: "An owl carrying our correspondent's report seems to have been caught in a magical squall. The message is scrambled. Please try again later."
        };
    }
};

export const getOwlAnswer = async (question: string, apiKey: string): Promise<string> => {
     if (!apiKey) {
        return "The owl seems unable to find its way. It needs the Headmaster's secret key to navigate the magical currents."
    }
    const ai = new GoogleGenAI({ apiKey });
    
    const systemInstruction = `You are a wise, ancient owl delivering messages and knowledge from the heart of the wizarding world. Your name is Errol, and you've seen many things. A witch named Onamika has asked you a question. Answer her question based *only* on the lore from the Harry Potter books and movies. If the question is about the real world or anything outside of the Harry Potter universe, you must politely decline, stating that your vision is clouded for matters beyond the magical realm. Your tone should be wise, slightly archaic, and deeply thematic.`

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: question,
            config: {
                systemInstruction: systemInstruction,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching owl answer from Gemini:", error);
        return "The owl returns with a ruffled feather, the message seemingly lost in a magical crosswind. Please try again.";
    }
};

export const getCharacterMatch = async (answers: { question: string, answer: string }[], apiKey: string): Promise<CharacterMatchResult> => {
    if (!apiKey) {
        return {
            characterName: "Squib",
            reasoning: "The magical connection required for this divination is faint. The Headmaster's secret key must be provided to reveal your true magical counterpart."
        };
    }

    const ai = new GoogleGenAI({ apiKey });
    const characterNames = HARRY_POTTER_CHARACTERS.map(c => c.name);

    const prompt = `You are a magical personality analyst from the wizarding world, an expert in Legilimency. Your task is to determine which Harry Potter character a user most resembles based on their answers to a personality quiz.

Here is the list of possible characters you can match them with: ${characterNames.join(', ')}. You MUST choose a character's full name from this list.

Here are the user's answers:
${answers.map(a => `Q: ${a.question}\nA: ${a.answer}`).join('\n\n')}

Analyze these responses deeply. Consider the traits, motivations, and underlying personality they reveal.

Provide your analysis in a JSON format.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        characterName: {
                            type: Type.STRING,
                            description: 'The full name of the matched character from the provided list.',
                            enum: characterNames,
                        },
                        reasoning: {
                            type: Type.STRING,
                            description: "A detailed, insightful, and slightly whimsical explanation for why the user matches this character, written as if you are revealing a profound truth about their inner self."
                        }
                    },
                    required: ['characterName', 'reasoning']
                }
            }
        });
        
        const text = response.text;
        const result = JSON.parse(text);

        if (characterNames.includes(result.characterName) && typeof result.reasoning === 'string') {
            return result as CharacterMatchResult;
        } else {
            console.error("Invalid character match response from Gemini:", result);
            return { characterName: "Peeves", reasoning: "Mischief is afoot! The connection was scrambled, resulting in a chaotic and unpredictable match. Perhaps try gazing into the crystal ball again?" };
        }

    } catch (error) {
        console.error("Error calling Gemini API for character match:", error);
         return { characterName: "Nearly Headless Nick", reasoning: "A ghostly interference has clouded the divination. It seems the magical wires were crossed. Please try to connect with the spirits again later." };
    }
};

export const generateRewardMessage = async (rewardAmount: number, userName: string, apiKey: string): Promise<string> => {
    if (!apiKey) {
        return "You caught a spark of magic! A brilliant display of reflexes.";
    }
    const ai = new GoogleGenAI({ apiKey });
    
    const systemInstruction = `You are Albus Dumbledore, the wise Headmaster of Hogwarts. You are writing a short, encouraging, and unique message to a student named ${userName}. They have just caught a fleeting magical spark and were awarded ${rewardAmount} Galleons for their quick reflexes. Your tone should be wise, whimsical, and never longer than two sentences.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Craft the message.",
            config: {
                systemInstruction: systemInstruction,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating reward message from Gemini:", error);
        return "It seems you've found a bit of wandering magic! Well done.";
    }
};

export const generateQuidditchCupMessage = async (userName: string, houseName: string, apiKey: string): Promise<string> => {
    if (!apiKey) {
        return `Congratulations, ${userName}! Your skill has brought great honour to ${houseName}. Well done on winning the Quidditch Cup!`;
    }
    const ai = new GoogleGenAI({ apiKey });
    
    const systemInstruction = `You are Albus Dumbledore, the wise Headmaster of Hogwarts. You are writing a short, congratulatory message to a student named ${userName} whose house, ${houseName}, has just won the Daily Quidditch Cup. Your tone should be wise, inspiring, and whimsical, celebrating their house's skill and valor. Keep it to about two or three sentences.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Craft the message of congratulations.",
            config: {
                systemInstruction: systemInstruction,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating Quidditch Cup message from Gemini:", error);
        return `Well done, ${userName}! The courage and skill displayed by ${houseName} on the pitch today were truly a sight to behold. A well-deserved victory!`;
    }
};

export const getPetMatch = async (answers: string[], apiKey: string): Promise<{ creature: CreatureType, reasoning: string }> => {
    if (!apiKey) {
        // This should not happen if called correctly, but as a fallback
        return {
            creature: CreatureType.PygmyPuff,
            reasoning: "The Room of Requirement is a bit foggy today, but it senses a desire for a simple, cuddly friend. So, a Pygmy Puff appears!"
        };
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const creatureDescriptions = CREATURES.map(c => `- ${c.name} (${c.id}): ${c.description}`).join('\n');

    const prompt = `You are the Room of Requirement, providing a student named Onamika with a magical companion. Based on her answers to a few questions, you must decide which creature is the best fit for her. The answers correspond to these traits: 'shiny' (for a Niffler), 'loyal' (for a Bowtruckle), or 'cuddly' (for a Pygmy Puff).

The available creatures are:
${creatureDescriptions}

The student's answers revealed these traits: ${answers.join(', ')}.

Analyze these traits and choose the most suitable creature companion. Provide your decision and a short, magical reasoning for your choice, as the Room of Requirement would.
Return the response in JSON format.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        creature: {
                            type: Type.STRING,
                            description: 'The creature type.',
                            enum: [CreatureType.Niffler, CreatureType.Bowtruckle, CreatureType.PygmyPuff]
                        },
                        reasoning: {
                            type: Type.STRING,
                            description: 'The reasoning for the choice, as if spoken by the Room of Requirement.'
                        }
                    },
                    required: ['creature', 'reasoning']
                }
            }
        });

        const text = response.text;
        const result = JSON.parse(text);

        if (Object.values(CreatureType).includes(result.creature) && typeof result.reasoning === 'string') {
            return result as { creature: CreatureType, reasoning: string };
        } else {
            throw new Error("Invalid response format from Gemini");
        }
    } catch (error) {
        console.error("Error calling Gemini API for pet match:", error);
        // Fallback logic
        const counts: Record<string, number> = { shiny: 0, loyal: 0, cuddly: 0 };
        answers.forEach(ans => {
            if(ans in counts) (counts as any)[ans]++;
        });
        const majorityTrait = Object.keys(counts).reduce((a, b) => (counts as any)[a] > (counts as any)[b] ? a : b);
        let creature: CreatureType;
        if (majorityTrait === 'shiny') creature = CreatureType.Niffler;
        else if (majorityTrait === 'loyal') creature = CreatureType.Bowtruckle;
        else creature = CreatureType.PygmyPuff;

        return {
            creature,
            reasoning: "The magical connection fizzled, but the Room sensed your heart's desire and provided a suitable companion."
        };
    }
};

export const getPetResponse = async (
    creature: MagicalCreature, 
    userMessage: string, 
    chatHistory: PetChatMessage[], 
    apiKey: string
): Promise<string> => {
    if (!apiKey) {
        return "The creature looks at you, but seems unable to understand, as if the magical connection is weak."
    }
    const ai = new GoogleGenAI({ apiKey });
    
    const contents: Content[] = [
        ...chatHistory.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
        })),
        {
            role: 'user',
            parts: [{ text: userMessage }]
        }
    ];

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: creature.personality,
                maxOutputTokens: 100,
                temperature: 0.9,
            }
        });
        const text = response.text;
        
        if (text && text.trim()) {
            return text.trim();
        }

        // Fallback for empty responses
        switch (creature.id) {
            case CreatureType.Niffler:
                return "*The Niffler twitches its nose, distracted by a faint glimmer in the corner.*";
            case CreatureType.Bowtruckle:
                return "*The Bowtruckle makes a soft clicking sound and shuffles its twig-like feet.*";
            case CreatureType.PygmyPuff:
                return "*The Pygmy Puff lets out a happy squeak and rolls in a little circle.*";
            default:
                return "*The creature stares blankly for a moment, as if lost in thought.*";
        }

    } catch (error) {
        console.error("Error fetching pet response from Gemini:", error);
        return "*The creature makes a confused noise, the magic seems to have fizzled out.*";
    }
};