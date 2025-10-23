# Baqaya Market

A monorepo for Morocco’s food rescue platform (web + mobile), featuring dynamic pricing, a Morocco-focused map, Supabase backend, FCM notifications, and bilingual UI (FR/AR with RTL).

## Structure

```
baqaya-market/
  apps/
    web/        # Next.js 14 app router + Tailwind
    mobile/     # Expo (React Native) app
  packages/
    ui/         # Shared UI components (web + native entrypoints)
    lib/        # Shared hooks/utils/constants
    types/      # Shared TypeScript types
  supabase/
    schema.sql  # Database schema
    seed.sql    # Sample data
    functions/  # Edge Functions (priceOptimizer, notifyUsers)
```

## Quickstart

- Install deps (from repo root):

```bash
npm install
```

- Web dev:

```bash
npm run dev:web
```

- Mobile dev (Expo):

```bash
npm run dev:mobile
```

## Environment

Copy `.env.example` to your local `.env` files inside each app with your Supabase and Firebase keys.

## License

MIT
