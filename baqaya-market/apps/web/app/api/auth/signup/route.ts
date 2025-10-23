import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  // TODO: connect with Supabase Auth
  return NextResponse.json({ ok: true, user: { id: 'usr_1', ...body } }, { status: 201 });
}
