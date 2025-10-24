import { NextRequest, NextResponse } from "next/server";
import { transcribeWithWhisper } from "@sava/api";

export async function POST(req: NextRequest) {
  try {
    const { audioBase64, mimeType } = await req.json();
    const text = await transcribeWithWhisper(audioBase64 ?? "", mimeType ?? "audio/webm");
    return NextResponse.json({ text });
  } catch (e) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
