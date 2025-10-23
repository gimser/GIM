import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { originalPrice = 100, timeLeftHours = 6 } = body ?? {};
  // Simple heuristic placeholder for AI pricing
  const discountFactor = Math.min(0.7, Math.max(0.2, (12 - timeLeftHours) / 12));
  const suggested = Math.round(originalPrice * (1 - discountFactor));
  return NextResponse.json({ suggestedPrice: suggested });
}
