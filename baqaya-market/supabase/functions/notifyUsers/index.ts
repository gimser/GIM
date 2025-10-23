// Supabase Edge Function: notifyUsers (stub)
// deno-lint-ignore-file no-explicit-any
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  }
  try {
    const body = await req.json();
    const { offer_id, lat, lng, radius_km = 5 } = body ?? {};
    // TODO: query users near (lat,lng) and enqueue push via FCM
    return new Response(JSON.stringify({ ok: true, notified: 0, offer_id, radius_km }), { headers: corsHeaders });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? 'unknown error' }), { status: 400, headers: corsHeaders });
  }
});

const corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, OPTIONS',
  'access-control-allow-headers': 'authorization, x-client-info, apikey, content-type',
};
