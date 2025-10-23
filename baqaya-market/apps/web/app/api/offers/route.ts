import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Replace with Supabase query and geo filter
  return NextResponse.json({
    offers: [
      {
        id: 'ofr_1',
        title: 'Panier surprise pâtisserie',
        vendor: 'Boulangerie Al Amal',
        lat: 33.5899,
        lng: -7.6039,
        original_price: 80,
        discounted_price: 40,
        expires_at: new Date(Date.now() + 1000 * 60 * 60).toISOString()
      }
    ]
  });
}
