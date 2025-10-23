import { NextResponse } from 'next/server';

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const { id } = params;
  // TODO: fetch from Supabase
  return NextResponse.json({
    id,
    title: 'Panier surprise',
    description: 'Assortiment anti-gaspi',
    images: [],
    original_price: 80,
    discounted_price: 40,
    qty: 5,
    vendor: {
      id: 'vnd_1',
      name: 'Boulangerie Al Amal'
    }
  });
}
