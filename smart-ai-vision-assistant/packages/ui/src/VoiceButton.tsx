import React from "react";

type VoiceButtonProps = {
  recording?: boolean;
  onClick?: () => void;
};

export function VoiceButton({ recording, onClick }: VoiceButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
        "h-12 w-12 rounded-full grid place-items-center text-white shadow-lg transition-colors " +
        (recording ? "bg-red-600" : "bg-indigo-600 hover:bg-indigo-500")
      }
      aria-label="Voice"
    >
      🎙️
    </button>
  );
}
