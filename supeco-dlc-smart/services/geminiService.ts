import { GoogleGenAI, Type } from "@google/genai";
import { Product, AISuggestion, AISuggestionType } from '../types';
import { supabase } from './supabaseClient';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

if (!API_KEY) {
  console.warn("VITE_GEMINI_API_KEY is not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || '' });

export const getAIsuggestions = async (products: Product[]): Promise<AISuggestion[]> => {
  if (!API_KEY) {
    // Return mock data if API key is not available
    // FIX: Use AISuggestionType enum for the 'type' property to match the expected type.
    return Promise.resolve([
        { type: AISuggestionType.PROMOTION, title: 'Promote Dairy Products', recommendation: 'Several yogurts and milk cartons are expiring within 7 days. Suggest a "2-for-1" deal.' },
        { type: AISuggestionType.ORDER, title: 'Reduce Bread Order', recommendation: 'High quantity of Whole Wheat Bread is consistently expiring. Consider reducing the next order by 15%.' },
        { type: AISuggestionType.WASTE, title: 'High Waste in Produce', recommendation: 'Lettuce and Tomatoes in the Produce Section are major contributors to waste. Review stock levels and display conditions.'},
        { type: AISuggestionType.SHORTAGE, title: 'Potential Salmon Shortage', recommendation: 'Salmon Fillets are low in stock and selling fast. Predict a potential shortage and recommend placing a new order soon.' },
    ]);
  }

  const prompt = `
    You are a smart retail management assistant for 'Supeco'.
    Analyze the following list of products with their expiration dates and quantities.
    Provide actionable recommendations to reduce waste, suggest promotions for near-expiration items,
    warn about potential stock shortages for high-demand items, and identify categories with recurring waste issues.
    Keep recommendations concise and to the point.
    
    Product Data:
    ${JSON.stringify(products.map(p => ({name: p.name, category: p.category, status: p.status, quantity: p.quantity, location: p.location})), null, 2)}
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
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { 
                    type: Type.STRING,
                    enum: ['promotion', 'order', 'waste', 'shortage'],
                    description: 'The type of suggestion.'
                  },
                  title: { 
                    type: Type.STRING,
                    description: 'A short, catchy title for the recommendation.'
                  },
                  recommendation: { 
                    type: Type.STRING,
                    description: 'The detailed recommendation text.'
                  }
                },
                required: ['type', 'title', 'recommendation']
              }
            }
          }
        }
      }
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    const suggestions: AISuggestion[] = result.suggestions || [];
    return suggestions;
  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
    throw new Error("Failed to generate AI suggestions.");
  }
};

export const saveAISuggestionsForProduct = async (
  productId: string,
  suggestions: AISuggestion[]
): Promise<void> => {
  if (!suggestions || suggestions.length === 0) return;
  const rows = suggestions.map((s) => ({
    product_id: productId,
    type: s.type,
    suggestion: `${s.title}: ${s.recommendation}`,
  }));
  const { error } = await supabase.from('ai_recommendations').insert(rows);
  if (error) {
    console.error('Failed to save AI recommendations:', error);
  }
};
