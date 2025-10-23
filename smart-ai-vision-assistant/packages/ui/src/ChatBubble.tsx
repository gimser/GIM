import React from "react";

type ChatBubbleProps = {
  role: "user" | "assistant";
  text: string;
};

export function ChatBubble({ role, text }: ChatBubbleProps) {
  const isUser = role === "user";
  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-2 rounded-2xl mb-2 text-sm whitespace-pre-wrap ${
          isUser
            ? "bg-blue-600 text-white rounded-tr-sm"
            : "bg-zinc-800 text-zinc-100 rounded-tl-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
