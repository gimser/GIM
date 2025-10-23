import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  // TODO: fetch from Supabase
  return NextResponse.json({ id, title: 'Offer', price: 60 });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  // TODO: update in Supabase
  return NextResponse.json({ ok: true, id, ...body });
}
