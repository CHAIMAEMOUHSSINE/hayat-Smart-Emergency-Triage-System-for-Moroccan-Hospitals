
import { GoogleGenAI, Type } from "@google/genai";
import { PriorityLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface TriageResult {
  priority: PriorityLevel;
  explanation: string;
}

export const analyzePatientTriage = async (vitals: any, symptoms: string): Promise<TriageResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an AI Clinical Triage Specialist, emulating a multivariate regression model.
      Vitals: ${JSON.stringify(vitals)}
      Symptoms: ${symptoms}
      Return JSON with 'priority' (P1-P5) and 'explanation'.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            priority: { type: Type.STRING, enum: ['P1', 'P2', 'P3', 'P4', 'P5'] },
            explanation: { type: Type.STRING }
          },
          required: ['priority', 'explanation']
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Triage Error:", error);
    return { priority: 'P3', explanation: 'Manual triage required.' };
  }
};

export const medicalSearch = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a medical knowledge assistant for Hayat, a Moroccan health platform. 
      Answer this query briefly and professionally for a doctor: ${query}`,
    });
    return response.text || "No results found.";
  } catch (error) {
    return "Service temporarily unavailable.";
  }
};
