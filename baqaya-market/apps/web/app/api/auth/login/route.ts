import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  // TODO: connect with Supabase Auth
  return NextResponse.json({ ok: true, session: { id: 'sess_1', user: body.email } });
}
