import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  return NextResponse.json({ id, status: 'confirmed', total_amount: 60, pickup_code: 'ABCD-1234' });
}
