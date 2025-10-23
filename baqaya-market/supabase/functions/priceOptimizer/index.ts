// Supabase Edge Function: priceOptimizer
// deno-lint-ignore-file no-explicit-any
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

function suggestDiscountedPrice(originalPrice: number, hoursLeft: number, demandScore = 0.5) {
  const timeFactor = Math.max(0.2, Math.min(1, hoursLeft / 24));
  const demandFactor = 0.5 + demandScore * 0.5; // 0.5..1
  const baseDiscount = 0.5; // target ~50%
  const dynamic = baseDiscount * (1 - timeFactor * 0.7) * (1 / demandFactor);
  const price = Math.max(5, originalPrice * (1 - Math.min(0.8, dynamic)));
  return Math.round(price * 2) / 2;
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  try {
    const body = await req.json();
    const { original_price, hours_left, demand_score } = body ?? {};
    const suggested_price = suggestDiscountedPrice(Number(original_price), Number(hours_left), Number(demand_score ?? 0.5));
    return new Response(JSON.stringify({ suggested_price }), {
      headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? 'unknown error' }), { status: 400 });
  }
});
