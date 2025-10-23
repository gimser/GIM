# smart-ai-vision-assistant

Multimodal AI assistant (web + mobile) powered by Google Gemini 1.5 Pro. See, listen, speak.

## Quick start

1. Copy `.env.example` to `.env` and set `GEMINI_API_KEY`.
2. Install deps: `npm install`
3. Run web: `npm run dev:web`
4. Run mobile (Expo): `npm run dev:mobile`

## Monorepo
- apps/web: Next.js 14 web client and API route
- apps/mobile: Expo React Native app
- packages/api: Gemini client and audio/image utils
- packages/ui: Shared UI components
- packages/utils: Helpers and i18n

## Deploy
- Web: Vercel (set `GEMINI_API_KEY`)
- Mobile: Expo Go / EAS

## Privacy
- Camera/mic consent, clear history option, local-only mode available in UI.
