import { NextRequest, NextResponse } from "next/server";
import { chatText } from "@sava/api";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    const reply = await chatText(text ?? "");
    return NextResponse.json({ text: reply ?? "" });
  } catch (e) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
