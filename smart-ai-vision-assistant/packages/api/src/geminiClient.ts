import axios from "axios";

export type GeminiContentPart =
  | { text: string }
  | {
      inline_data: {
        mime_type: string;
        data: string; // base64 without data URL prefix
      };
    };

export async function geminiGenerateContent(parts: GeminiContentPart[], model = "gemini-1.5-pro") {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  const payload = {
    contents: [
      {
        role: "user",
        parts,
      },
    ],
  };
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  const res = await axios.post(url, payload);
  const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text as string | undefined;
  return text ?? "";
}

export async function analyzeVision(base64Image: string, userText?: string) {
  const parts: GeminiContentPart[] = [
    { text: userText || "حلل محتوى الصورة وأجب بشكل ذكي." },
    { inline_data: { mime_type: "image/jpeg", data: base64Image } },
  ];
  return geminiGenerateContent(parts);
}

export async function chatText(userText: string, context?: string) {
  const parts: GeminiContentPart[] = [{ text: [context, userText].filter(Boolean).join("\n\n") }];
  return geminiGenerateContent(parts);
}
