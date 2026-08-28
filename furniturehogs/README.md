# IAS Build 023 — Furniture Hogs

Residential furniture removal booking site. Next.js 14 (App Router) + TypeScript + Tailwind, deployed on Vercel. Live volume-based quote, HubSpot-owned availability via n8n, online booking.

- **Subdomain:** furniturehogs.iasbootcamp.com
- **Repo:** ias-build-023-furniturehogs
- **Status:** Demo mode (runs fully clickable with zero credentials)

## Architecture (Baseline Stack — Article VIII)

```
Presentation   Next.js 14 App Router + Tailwind (Vercel serverless)
Orchestration  n8n Cloud (webhooks) — availability read + booking upsert
Data           HubSpot (source of truth for availability + contacts)
Delivery       Resend (email) + A2P SMS
```

**No `output: 'export'`.** This build has live API routes (`/api/availability`, `/api/booking`) that proxy to n8n. Static export would silently disable them. See `next.config.mjs`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (proves Vercel deployability)
npm run typecheck  # tsc --noEmit
```

Runs in **demo mode** out of the box — no env vars needed. Availability returns generated slots; booking echoes the payload n8n would receive.

## Go live (wire the seams)

Set in `.env.local` / Vercel env:

| Var | Purpose |
|-----|---------|
| `N8N_AVAILABILITY_URL` | GET → returns open `Slot[]` from HubSpot |
| `N8N_BOOKING_URL`      | POST ← booking payload → HubSpot upsert-by-email |
| `N8N_WEBHOOK_SECRET`   | Optional signing header (`x-fh-signature`) |

When these are set, the API routes switch from demo to live automatically.

## Open gaps (honesty signals — TodoChip)

- `TODO_HUBSPOT_AVAILABILITY` — n8n workflow reading booked windows from HubSpot
- `TODO_N8N_BOOKING` — upsert-by-email (`idProperty:email`) + Resend + SMS
- `TODO_A2P_VERIFY` — A2P 10DLC brand/campaign registration before live SMS

## Retune pricing

Edit `lib/quote.ts` — `CATALOG` (volume weights) and `TIERS` ($ ranges). Current values are placeholders, not Furniture Hogs' operating numbers.

## File map

```
app/
  layout.tsx                    fonts, metadata
  page.tsx                      assembles sections in BookingProvider
  globals.css
  api/availability/route.ts     GET → n8n (demo fallback)
  api/booking/route.ts          POST → n8n (validation + demo echo)
components/
  Hero, QuoteCard, BookingBlock, BookingContext, Sections,
  Header, Footer, HogMark, Button, StatusChip, TodoChip
lib/
  build.config.ts               config-as-data: all page content + governance
  quote.ts                      deterministic volume pricing (no LLM)
  availability.ts               slot contract + demo generator
```
