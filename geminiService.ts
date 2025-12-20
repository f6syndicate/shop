
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIStylistAdvice = async (userPrompt: string, availableProducts: any[]) => {
  try {
    const productsContext = availableProducts.map(p => `${p.name} (₹${p.price}) - ${p.description}`).join('\n');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are the Lead Stylist for 'F6 Syndicate', a premium Indian street-wear brand.
      The user is asking for fashion advice. Recommend specific products from our list based on their needs.
      
      Available Products:
      ${productsContext}
      
      User request: "${userPrompt}"
      
      Keep the response stylish, edgy, and helpful. Suggest at least 2 products. Always mention prices in ₹ (INR).`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini AI Stylist Error:", error);
    return "The Syndicate AI is temporarily offline. Please explore our shop manually.";
  }
};
