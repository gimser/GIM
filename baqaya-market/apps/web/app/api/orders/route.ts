import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  // TODO: create order in Supabase
  return NextResponse.json({ ok: true, order: { id: 'ord_123', ...body } }, { status: 201 });
}
