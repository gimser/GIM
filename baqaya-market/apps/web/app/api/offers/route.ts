import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: fetch from Supabase
  const offers = [
    { id: '1', title: 'Surprise Bag - Bakery', city: 'Casablanca', price: 40 },
    { id: '2', title: 'Veggie Box', city: 'Casablanca', price: 55 }
  ];
  return NextResponse.json({ offers });
}

export async function POST(req: Request) {
  const body = await req.json();
  // TODO: validate and insert to Supabase
  return NextResponse.json({ ok: true, offer: body }, { status: 201 });
}
