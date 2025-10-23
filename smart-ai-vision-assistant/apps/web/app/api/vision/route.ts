import { NextRequest, NextResponse } from "next/server";
import { analyzeVision } from "@sava/api";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, text } = await req.json();
    const reply = await analyzeVision(imageBase64 ?? "", text ?? undefined);
    return NextResponse.json({ text: reply ?? "" });
  } catch (e) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
