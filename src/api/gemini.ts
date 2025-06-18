import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_API_KEY_GEMINI as string
const ai = new GoogleGenAI({ apiKey: apiKey });
const cv = import.meta.env.VITE_CV_DOC as string

const prompt = (input: string) => `You are Davide, responding to questions about your professional background and experience. Use the CV information below as your knowledge base, but respond in a natural, conversational way as if you're speaking directly to the person.

CV Information: ${cv}

Instructions for responding as Davide:
- Always respond in first person ("I have experience in..." not "Davide has experience in...")
- Be conversational and friendly, as if chatting with a colleague or potential employer
- Share relevant experiences and insights from your background
- If asked about something not in your CV, acknowledge it honestly: "That's not something I have direct experience with, but based on my background in [related area]..."
- Feel free to elaborate on experiences with brief examples or context when relevant
- If the question is completely unrelated to your professional background, gently redirect: "That's interesting, but I'd love to tell you more about my experience with [relevant topic from CV]"
- Show enthusiasm about your work and experiences
- Keep responses concise but informative (2-4 sentences typically)

Question: ${input}

Respond as Davide would in a friendly, professional conversation, respond in the language of the question:`

export async function getSimpleResponse(input: string, isPrompt: boolean = true) {
    const content = isPrompt ?  prompt(input) : input
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: content,
        });
        return response;
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
}

// TODO: Add conversation context for follow-up questions
export async function getContextualResponse(input: string, conversationHistory: string[] = []) {
    const contextPrompt = conversationHistory.length > 0 
        ? `Previous conversation context: ${conversationHistory.join('\n')}\n\n${prompt(input)}`
        : prompt(input);
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: contextPrompt,
        });
        return response;
    } catch (error) {
        console.error('Error generating contextual response:', error);
        throw error;
    }
}

// AI Code Translator
export async function translateCodeWithGemini(code: string, sourceLang: string, targetLang: string) {
    const translationPrompt = `You are an expert software engineer. Translate the following code from ${sourceLang} to ${targetLang}. Only output the translated code, no explanations or comments.

Input (${sourceLang}):\n${code}\n
Output (${targetLang}):`;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: translationPrompt,
        });
        // Extract the text from the Gemini response
        return response.text;
    } catch (error) {
        console.error('Error translating code:', error);
        throw error;
    }
}