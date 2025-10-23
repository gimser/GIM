import { franc } from "franc-min";

export type DetectedLang = "ar" | "en" | "fr" | "unknown";

export function detectLanguage(text: string): DetectedLang {
  const code = franc(text || "");
  if (code === "arb" || code === "ara") return "ar";
  if (code === "eng") return "en";
  if (code === "fra" || code === "fre") return "fr";
  return "unknown";
}

export function isRTL(lang: DetectedLang) {
  return lang === "ar";
}
