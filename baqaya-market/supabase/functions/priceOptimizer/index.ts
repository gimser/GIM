import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req) => {
  try {
    const body = await req.json();
    const { originalPrice, timeToExpireMinutes, demandScore } = body ?? {};
    if (
      typeof originalPrice !== 'number' ||
      typeof timeToExpireMinutes !== 'number' ||
      typeof demandScore !== 'number'
    ) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
    }

    // Simple heuristic fallback; replace with OpenAI call if desired
    const timeFactor = Math.max(0.2, Math.min(1, timeToExpireMinutes / 480));
    const demandFactor = 0.5 + 0.5 * demandScore; // 0.5..1.0
    const base = originalPrice * 0.7 * timeFactor * demandFactor;
    const suggested = Math.max(originalPrice * 0.2, Math.min(base, originalPrice * 0.9));

    return new Response(JSON.stringify({ suggested: Math.round(suggested) }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
});
