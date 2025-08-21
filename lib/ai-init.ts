// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
  Type,
} from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_AI_API,
});

const config: Record<string, any> = {
    eval_meta: {
        config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            required: ["tags", "overall_ratings"],
            properties: {
            tags: {
                type: Type.ARRAY,
                items: {
                type: Type.OBJECT,
                required: ["name", "analysis", "rating", "recommendations", "fixed_tags"],
                properties: {
                    name: { type: Type.STRING },
                    analysis: { type: Type.STRING },
                    rating: { type: Type.NUMBER, minimum: 1, maximum: 10 },
                    recommendations: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    },
                    fixed_tags: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    },
                },
                },
            },
            overall_ratings: {
                type: Type.NUMBER,
                minimum: 1,
                maximum: 10
            },
            },
        },
        systemInstruction: {
        text: `You are an expert SEO and web performance analyst. 
    Your task is to evaluate a webpage's metadata, 
    and provide a quality rating from 1 to 10 and actionable recommendations and fixed html tags with missing details. 
    Analyze each tag's presence, syntax, and content quality.
    Also include missing tags. 
    For instance, check if the title is an optimal length and if it's unique, and if the description is compelling. 

    Your final output must be ONLY a valid JSON object (no explanations, no prose) with 2 properties: 
    - tags (array of objects for each metadata tag) 
    - overall_ratings (number).`
        }
        }
    },
    eval_perf: {
        config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            required: ["result", "overall_ratings"],
            properties: {
            result: {
                type: Type.OBJECT,
                required: ["analysis", "recommendations"],
                properties: {
                    analysis: { type: Type.STRING },
                    recommendations: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                    }
                },
            },
            overall_ratings: {
                type: Type.NUMBER,
                minimum: 1,
                maximum: 10
            },
            },
        },
        systemInstruction: {
        text: `
        You are an expert SEO and web performance analyst. 
        You will receive performance metrics (such as TTFB, DOMContentLoaded, Load time, LCP, CLS, etc.). 
        Your task is to interpret these metrics and return ONLY a valid JSON object that matches the given schema. Do not add greetings or explanations. Give direct answer
        `
        }
        }
    }
};

export const runAI = async function runAI(prompt: any, type: any) {
  const model = "gemini-2.0-flash";
  const contents = [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    ...config[type],
    contents,
  });

  return response.text;
};
