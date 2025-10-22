# Metaverse Morocco Map

An interactive 3D metaverse of Morocco combining e-commerce, tourism, and environmental innovation.

## Tech
- React + TypeScript + Vite + TailwindCSS
- Mapbox GL JS, Three.js
- Node.js (Express) server for Stripe and AI endpoints
- Supabase (Auth, Database, Realtime)

## Development
1. Copy `.env.example` to `.env` in project root and set keys.
2. Install deps at repo root:
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

## Deploy
- Frontend: Vercel (build command `npm -w apps/web run build`)
- Server: Vercel/Render/Fly (start `npm -w apps/server run start`)
- Database/Auth: Supabase
