// Server-side speech helpers (Whisper STT, ElevenLabs TTS)

export async function transcribeWithWhisper(audioBase64: string, mimeType: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const binary = Buffer.from(audioBase64, "base64");
  const blob = new Blob([binary], { type: mimeType || "audio/webm" });

  const form = new FormData();
  form.append("file", blob, "audio.webm");
  form.append("model", "whisper-1");

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: form,
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Whisper transcription failed: ${res.status} ${errText}`);
  }
  const data = (await res.json()) as { text?: string };
  return data.text ?? "";
}

export async function synthesizeWithElevenLabs(text: string, voiceId?: string): Promise<{ mimeType: string; base64: string }> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new Error("ELEVENLABS_API_KEY is not set");
  }
  const voice = voiceId || "21m00Tcm4TlvDq8ikWAM"; // default voice
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      accept: "audio/mpeg",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      output_format: "mp3_44100_128",
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`ElevenLabs synthesis failed: ${res.status} ${errText}`);
  }

  const buffer = Buffer.from(new Uint8Array(await res.arrayBuffer()));
  const base64 = buffer.toString("base64");
  return { mimeType: "audio/mpeg", base64 };
}
