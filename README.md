# Calmer - Sensory-Friendly Melbourne Journey Portal

A deployable MVP web portal that helps sensory-sensitive commuters compare Melbourne public
transport journeys by **sensory load** - crowding, disruptions, transfers, walking distance and
noise - not just speed, and points to nearby lower-stimulation spaces.

This is Iteration 1 from the build plan: a fully working product on curated + mock data, ready to
deploy today, with clear seams for plugging in real PTV/GTFS data and persistent storage later.

## What's included

- Landing, preferences, journey search, results, map, quiet-space finder, feedback and admin pages
- A rule-based sensory scoring engine (`lib/scoring.ts`) with a plain-language explanation per route
- A mock route generator (`lib/mockRoutes.ts`) standing in for the PTV Timetable / GTFS Realtime APIs
- A curated dataset of 12 real Melbourne quiet spaces (`lib/quietSpacesData.ts`)
- A mock disruption feed (`lib/disruptionsData.ts`) standing in for PTV Disruptions / Data Vic
- An interactive Leaflet map (no API key required - OpenStreetMap tiles)
- API routes for journey search, scoring, quiet spaces, disruptions and feedback
- An admin dashboard for adding quiet spaces and reviewing feedback

No external API keys or accounts are required to run or deploy this MVP.

## Getting started locally

Requires Node.js 18.18+ (Node 20 LTS recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploying

The fastest path is Vercel, with zero environment variables required:

1. Push this project to a GitHub repository.
2. Import the repository at https://vercel.com/new.
3. Deploy - no environment variables are needed for the MVP to work.

Any other Node.js host that supports Next.js 14 (Netlify, Render, a plain Node server via
`npm run build && npm run start`) will also work.

## Project structure

```
app/
  page.tsx                 Landing page
  preferences/page.tsx      Sensory preference form (saved to localStorage)
  journey/page.tsx          Journey search form
  results/page.tsx          Scored, sorted route comparison
  map/page.tsx              Leaflet map: quiet spaces, disruptions, chosen route
  quiet-spaces/page.tsx      Quiet space finder, with optional "near me"
  feedback/page.tsx         Post-journey feedback form
  admin/page.tsx            Data status, add quiet spaces, review feedback
  api/
    journey/search/route.ts POST - generate + score routes for a journey
    score/route.ts          POST - score a single route object
    quiet-spaces/route.ts   GET/POST - list and add quiet spaces
    disruptions/route.ts    GET - current mock disruptions
    feedback/route.ts       GET/POST - list and submit feedback
components/                  Reusable UI (RouteCard, SensoryBadge, MapView, etc.)
lib/
  scoring.ts                The sensory scoring engine
  mockRoutes.ts              Deterministic mock route generator
  quietSpacesData.ts         Curated quiet space dataset
  disruptionsData.ts         Mock disruption dataset
  adminStore.ts              Ephemeral in-memory store for admin-added data
  supabase.ts                Optional Supabase client (see below)
  preferences.ts              localStorage helpers for preferences & chosen route
  types.ts                   Shared TypeScript types
```

## How the sensory score works

Every route option accumulates points from risk factors (high crowding, active disruptions, more
than two transfers, long walking segments, construction noise, busy CBD/event zones), each one
weighted by how much that factor affects the person, based on their saved 1-5 sensitivity
preferences. Being near a quiet space, or having a direct journey with no transfers, subtracts
points. The total maps to a label:

| Score | Label |
|------:|-------|
| 0-2   | Low sensory load |
| 3-5   | Medium sensory load |
| 6-8   | High sensory load |
| 9+    | Very high sensory load |

Every score comes with a plain-language explanation (`scoreResult.explanation`), and the UI never
relies on colour alone to communicate it. This is an *estimate*, not a guarantee or a medical
claim - the UI is careful to frame it that way throughout.

## Known limitations of this MVP (by design)

- **Routes are mock data.** `lib/mockRoutes.ts` deterministically generates plausible route
  options from an origin/destination pair - it is not connected to a live PTV or GTFS feed yet.
- **Disruptions are mock data.** `lib/disruptionsData.ts` generates a small, always-current-looking
  set of disruptions rather than calling the real PTV Disruptions or Data Vic roadworks APIs.
- **Admin-added quiet spaces and feedback are stored in memory**, not a database. They persist
  while the server process stays warm (reliably in local dev; unreliably across a cold start in
  serverless production) and are lost on redeploy. Connect Supabase (below) for real persistence.
- **The map route line is a straight line** between the origin and destination, not the real
  transport path - a live GTFS shape feed would replace this later.
- **No authentication** on the admin page. Add real auth before using this beyond a demo.

These match the "Iteration 1: Working MVP" scope from the original build plan - Iteration 2 adds
real data; Iteration 3 adds personalisation and prediction.

## Connecting real data (Iteration 2)

### Supabase (persistent storage)

1. Create a project at https://supabase.com and enable the **PostGIS** extension.
2. Create tables matching `lib/types.ts` (`quiet_spaces`, `disruptions`, `feedback`,
   `sensory_preferences`, `route_results` - see the original design doc for exact DDL).
3. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` (and `SUPABASE_SERVICE_ROLE_KEY` for server-side writes).
4. In `app/api/quiet-spaces/route.ts` and `app/api/feedback/route.ts`, replace the
   `lib/adminStore.ts` calls with reads/writes through `getSupabaseClient()` from `lib/supabase.ts`.
   No other file needs to change - pages already read from these API routes.

### PTV Timetable API / GTFS Realtime / Data Vic

1. Register for API access (PTV Timetable API needs a Developer ID + API key; Data Vic roadworks
   data is generally open).
2. Add the keys to `.env.local` (placeholders already in `.env.example`).
3. Replace the body of `generateMockRoutes()` in `lib/mockRoutes.ts` with a real API call, keeping
   the same `RouteOption` return shape - `lib/scoring.ts` and every page that renders routes will
   keep working unchanged.
4. Do the same for `getMockDisruptions()` in `lib/disruptionsData.ts`.

## Accessibility notes

- Sensory load is always shown as a text label plus a wave visual, never colour alone.
- All interactive controls are keyboard reachable with a visible focus ring.
- The preference form asks "what affects your journey", never for a diagnosis.
- Map markers use colour **and** a text legend, matching the source design spec.
- `prefers-reduced-motion` is respected globally (see `app/globals.css`).

## Testing

No automated tests are included yet. The build plan calls for Jest (scoring logic, unit) and
Playwright (search → results → map flow, integration) - `lib/scoring.ts` and
`lib/mockRoutes.ts` are pure functions and are the easiest place to start.
