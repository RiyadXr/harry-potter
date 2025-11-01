
import { GoogleGenAI, Type } from "@google/genai";
import { House, SortingResult } from '../types';

export async function getSortingHatDecision(answers: string[]): Promise<SortingResult> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    const prompt = `
    You are the Sorting Hat from Harry Potter. Based on these personality traits revealed from a quiz, sort the user into one of the four Hogwarts houses: Gryffindor, Hufflepuff, Ravenclaw, or Slytherin.

    The user's answers point towards these characteristics: ${answers.join(', ')}.

    Analyze these traits and make your decision. Provide your decision and a detailed, in-character explanation of why you chose that house for the user. Be wise and thoughtful, like the real Sorting Hat.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        house: {
                            type: Type.STRING,
                            description: "The Hogwarts house you have chosen. Must be one of 'Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'.",
                            enum: Object.values(House),
                        },
                        reasoning: {
                            type: Type.STRING,
                            description: "Your in-character reasoning for sorting the user into this house."
                        }
                    },
                    required: ["house", "reasoning"],
                }
            }
        });

        const jsonString = response.text.trim();
        const result: SortingResult = JSON.parse(jsonString);

        if (!Object.values(House).includes(result.house)) {
            throw new Error(`Invalid house returned: ${result.house}`);
        }
        
        return result;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        // Fallback in case of API error
        return {
            house: House.Hufflepuff,
            reasoning: "The magic of the API seems to be on the fritz! But fear not, for every wizard and witch has a place at Hogwarts. For your patience and good nature in the face of this technical trouble, I place you in Hufflepuff! Where they are just and loyal."
        };
    }
}
