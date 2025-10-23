"use client";

import React, { useEffect, useRef, useState } from "react";
import { Avatar, CameraView, ChatBubble, VoiceButton } from "@sava/ui";
import { detectLanguage, isRTL } from "@sava/utils";

type Message = { role: "user" | "assistant"; text: string };

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [rtl, setRtl] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const lang = detectLanguage(input);
    setRtl(isRTL(lang));
  }, [input]);

  async function sendText() {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    const reply = data.text || "";
    setMessages((m) => [...m, { role: "assistant", text: reply }]);
    speak(reply);
  }

  async function captureAndAnalyze() {
    const canvas = document.createElement("canvas");
    const video = document.querySelector("video");
    if (!video) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    const base64 = dataUrl.split(",")[1] ?? "";

    setMessages((m) => [...m, { role: "user", text: "📸" }]);
    const res = await fetch("/api/vision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64: base64, text: input })
    });
    const data = await res.json();
    const reply = data.text || "";
    setMessages((m) => [...m, { role: "assistant", text: reply }]);
    speak(reply);
  }

  function speak(text: string) {
    if (!("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  async function toggleRecord() {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setRecording((r) => !r);
      return;
    }
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = rtl ? "ar" : "";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    setRecording(true);
    rec.onresult = async (e: any) => {
      const text = e.results?.[0]?.[0]?.transcript || "";
      setMessages((m) => [...m, { role: "user", text }]);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      const reply = data.text || "";
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
      speak(reply);
    };
    rec.onerror = () => setRecording(false);
    rec.onend = () => setRecording(false);
    rec.start();
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="flex items-center gap-3">
        <Avatar speaking={speaking} />
        <div>
          <h1 className="text-xl font-semibold">Smart AI Vision Assistant</h1>
          <p className="text-zinc-400 text-sm">See, listen, speak with Gemini</p>
        </div>
      </header>

      <div className="glow rounded-2xl border border-zinc-800 p-4 bg-gradient-to-b from-zinc-900/60 to-zinc-900/20">
        <CameraView />
        <div className="flex gap-2 mt-3">
          <button onClick={captureAndAnalyze} className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm">📸 Analyze</button>
          <VoiceButton recording={recording} onClick={toggleRecord} />
        </div>
      </div>

      <section className="glow rounded-2xl border border-zinc-800 p-4 bg-gradient-to-b from-zinc-900/60 to-zinc-900/20">
        <div className="max-h-[40vh] overflow-y-auto mb-3 pr-1">
          {messages.map((m, i) => (
            <ChatBubble key={i} role={m.role} text={m.text} />
          ))}
        </div>
        <div className="flex items-end gap-2" dir={rtl ? "rtl" : "ltr"}>
          <textarea
            ref={textAreaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 resize-none rounded-xl bg-black/40 border border-zinc-800 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-600"
            rows={2}
          />
          <button onClick={sendText} className="h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm">Send</button>
        </div>
      </section>

      <footer className="text-center text-xs text-zinc-500">Privacy: camera/mic consent required. Clear chat anytime.</footer>
    </main>
  );
}
