import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
