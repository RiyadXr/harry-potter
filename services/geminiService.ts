import { GoogleGenAI, Type } from "@google/genai";
import { House, SortingResult } from '../types';

// FIX: Initialize GoogleGenAI with API key from environment variable as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSortingHatDecision = async (answers: string[]): Promise<SortingResult> => {
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
        // FIX: Use ai.models.generateContent to query the Gemini API.
        const response = await ai.models.generateContent({
            // FIX: Use a recommended model for text tasks.
            model: 'gemini-2.5-flash',
            contents: prompt,
            // FIX: Configure response to be JSON and define a schema for reliable output.
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        house: {
                            type: Type.STRING,
                            description: 'The Hogwarts house.',
                            // FIX: Provide enum for valid house names to constrain the model's output.
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

        // FIX: Extract text from response using the .text property as per guidelines.
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
