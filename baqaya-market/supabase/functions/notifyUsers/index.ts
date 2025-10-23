import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req) => {
  try {
    const body = await req.json();
    const { offer } = body ?? {};
    if (!offer) {
      return new Response(JSON.stringify({ error: 'Missing offer' }), { status: 400 });
    }

    // Placeholder: integrate FCM to send notifications by location/topic
    console.log('Notify users about offer', offer.id);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (_e) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
});
