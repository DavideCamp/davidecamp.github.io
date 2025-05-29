import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_API_KEY_GEMINI as string

const ai = new GoogleGenAI({ apiKey: apiKey });

export async function getSimpleResponse(input: string) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: input,
    });
    return response
}
