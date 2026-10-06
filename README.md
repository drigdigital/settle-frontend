# Settle Furnitures — Frontend

Premium furniture showcase site for Vaanam Furniture Private Limited. Next.js App Router, TypeScript,
Tailwind CSS. Full project brief and working agreements live in [CLAUDE.md](./CLAUDE.md) — read that
first.

## Status

This is the Phase 2 technical scaffold: routing, data model, design tokens, forms, and the admin shell
are in place and build-verified. The Settle brand palette/type have not been approved yet (Phase 1), so
`tailwind.config.ts` currently holds neutral warm-toned placeholders — swap those once design signs off.
Catalog pages render from `lib/placeholder-data.ts` until `MONGODB_URI` is set; the data-access layer in
`services/` reads from MongoDB when it's configured and falls back to that placeholder data otherwise.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in MONGODB_URI, JWT_SECRET, etc. as they become available
npm run dev
```

Without `MONGODB_URI` set, the site still runs fully against the placeholder catalog — useful for UI
work before the database is provisioned.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run format` / `format:check` | Prettier |
| `npm run typecheck` | `tsc --noEmit` |

## What's built

- Public site: home, about, collections (filterable listing + product detail), for-businesses,
  experience-center, dealers, contact — all server-rendered, with metadata, Schema.org JSON-LD,
  `sitemap.ts`/`robots.ts`.
- Enquiry forms (B2C/B2B/dealer/walkthrough) — React Hook Form + Zod, validated client and server side,
  honeypot + rate-limited API route, persisted via Mongoose, GA4 event on submit.
- Admin shell at `/admin` — JWT session in an httpOnly cookie, route-guarded by `proxy.ts`; overview,
  product list + create form, enquiry list.
- Product data model (`types/`, `models/`) matching the CLAUDE.md §5 schema, including partial pricing,
  mixed dimension units, and category-level size charts (cots, dining).

## What's next

- Swap placeholder palette/fonts in `tailwind.config.ts` and `lib/fonts.ts` once Phase 1 design is
  approved.
- Wire the notification hook in `services/enquiries.ts` (email/WhatsApp) once a provider is chosen.
- Admin: category management, image upload, and user/role management aren't built yet — `products` and
  `enquiries` establish the pattern to extend.
- Replace the in-memory rate limiter (`lib/rateLimit.ts`) with Redis/Upstash before running multi-instance.
