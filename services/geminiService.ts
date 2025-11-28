import { GoogleGenAI, Type } from "@google/genai";
import { Opportunity, UserProfile, AIMatchResult } from '../types';

// Safely access the API key
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const getSmartMatches = async (
  user: UserProfile,
  opportunities: Opportunity[]
): Promise<AIMatchResult[]> => {
  if (!apiKey) {
    console.warn("No API Key found. Returning empty matches.");
    return [];
  }

  // Minimize data sent to token limit
  const simplifiedOpportunities = opportunities.map(o => ({
    id: o.id,
    title: o.title,
    category: o.category,
    availability: o.availability,
    skills: o.skills,
    description: o.description
  }));

  const prompt = `
    You are an expert volunteer coordinator.
    
    User Profile:
    - Bio: ${user.bio}
    - Interests: ${user.interests.join(', ')}
    - Availability: ${user.availability.join(', ')}
    - Skills: ${user.skills.join(', ')}

    Available Opportunities:
    ${JSON.stringify(simplifiedOpportunities)}

    Task:
    Analyze the user profile and the list of opportunities.
    Select the top 3 best matches for this user.
    Return a score (0-100) and a short, encouraging reason why it's a good fit.
    If no good matches, return the best possible ones with lower scores.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              opportunityId: { type: Type.STRING },
              score: { type: Type.NUMBER },
              reason: { type: Type.STRING }
            },
            required: ['opportunityId', 'score', 'reason']
          }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) return [];

    const matches: AIMatchResult[] = JSON.parse(jsonStr);
    
    // Sort by score descending
    return matches.sort((a, b) => b.score - a.score);

  } catch (error) {
    console.error("Error fetching AI matches:", error);
    return [];
  }
};