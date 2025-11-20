import { GoogleGenAI } from "@google/genai";

export const solveWithGemini = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "錯誤：未偵測到 API 金鑰。";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "你是一個專業的數學和工程助手。請用正體中文回答。如果使用者輸入數學問題，請提供逐步解題過程並最後給出答案。如果使用者輸入一般文字，請友善回應。請使用 markdown 格式。",
      }
    });

    return response.text || "無法產生回應。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "連線發生錯誤，請稍後再試。";
  }
};
