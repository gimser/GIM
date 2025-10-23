import "./globals.css";
import React from "react";

export const metadata = {
  title: "Smart AI Vision Assistant",
  description: "See, listen, speak with Gemini",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-zinc-100">
        {children}
      </body>
    </html>
  );
}
