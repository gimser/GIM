import React from "react";

type AvatarProps = {
  speaking?: boolean;
};

export function Avatar({ speaking }: AvatarProps) {
  return (
    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 shadow-lg">
      <div
        className={
          "absolute inset-1 rounded-full bg-black/60 flex items-center justify-center text-white text-xl font-semibold transition-transform " +
          (speaking ? "scale-95" : "scale-100")
        }
      >
        AI
      </div>
      <div
        className={
          "absolute inset-0 rounded-full animate-ping opacity-40 bg-indigo-400 " +
          (speaking ? "block" : "hidden")
        }
      />
    </div>
  );
}
