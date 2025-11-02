import { GoogleGenAI, Type } from "@google/genai";
import { House, SortingResult, DailyProphetArticle, CharacterMatchResult } from '../types';
import { HARRY_POTTER_CHARACTERS } from "../constants";

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
