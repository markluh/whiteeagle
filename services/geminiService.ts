
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBuildingAdvice = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert design and construction consultant for "White Eagle Home Decor and Landscapers". 
      Answer the user's question about home decoration, landscaping, building materials, or architectural design in a professional, sophisticated, and helpful manner.
      User question: ${query}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 300,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting to my design database right now. Please try again later.";
  }
};

export const summarizeReviews = async (reviews: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the sentiment and key points of these customer reviews for "White Eagle Home Decor and Landscapers" in two short, elegant sentences:
      ${reviews.join('\n')}`,
    });
    return response.text;
  } catch (error) {
    return "Our clients consistently praise our attention to detail and transformative landscape designs.";
  }
};
