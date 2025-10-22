# Metaverse Morocco Map (v2)

Interactive 3D metaverse of Morocco combining e‑commerce, tourism, and environmental innovation.

## Highlights
- 3D map with cities, ecommerce per city, chat, avatars
- Metaverse scene (Babylon.js) with movement, presence, and WebXR VR mode
- AI Guide 2.0 using OpenAI/Gemini with in‑app chat
- Eco/Tourism zones (Noor Solar, Atlas, Essaouira, Sahara)

## Tech
- React + TypeScript + Vite + TailwindCSS
- Mapbox GL JS, Babylon.js (dynamic import), WebXR
- Node.js (Express) server for Stripe and AI endpoints
- Supabase (Auth, Database, Realtime)

## Development
1. Copy `.env.example` to `.env` and set keys.
2. Install deps:
   ```bash
   npm install
   ```
3. Run dev (web + server):
   ```bash
   npm run dev
   ```

## Environment
- `VITE_MAPBOX_TOKEN`: Mapbox public token
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`: Supabase project keys
- `STRIPE_SECRET_KEY`: Stripe secret (test mode)
- `OPENAI_API_KEY` / `GEMINI_API_KEY`: AI Guide 2.0

## Routes
- `/map` base map, `/city/:cityId` products, `/metaverse` Babylon scene, `/explore` AI guide, `/admin` admin

## Docs
See `docs/roadmap.md`. Place screenshots in `docs/screenshots/`.
