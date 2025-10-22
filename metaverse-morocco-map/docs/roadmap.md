# Metaverse Morocco Map v2 Roadmap

## Features
- 3D movement & avatars with Babylon.js
- WebXR VR mode with Enter VR button
- AI Guide 2.0 via OpenAI/Gemini
- Eco & Tourism zones (Noor Solar, Atlas, Essaouira, Sahara)
- Mobile bottom navigation and layout tweaks
- Performance: dynamic imports for 3D

## Setup
1. Copy `.env.example` to `.env` and set:
   - VITE_MAPBOX_TOKEN
   - VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
   - STRIPE_SECRET_KEY
   - OPENAI_API_KEY and/or GEMINI_API_KEY
2. Install deps and run dev:
```bash
npm install
npm run dev
```

## Screenshots
- Place screenshots in `docs/screenshots/`
  - `map.png`, `metaverse.png`, `explore_guide.png`, `mobile_nav.png`
