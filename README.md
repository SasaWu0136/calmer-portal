# Calmer Route Planner

Calmer is a sensory-friendly journey-planning prototype for Melbourne commuters. It compares public transport routes by sensory load—such as crowding, disruptions, walking distance, transfers and environmental activity—rather than travel time alone.

The project currently uses simulated and curated MVP data. It does not provide live PTV navigation, real-time pedestrian monitoring or medical advice.

## Project background

This project began from a team-developed MVP baseline containing the initial Next.js structure, core pages, sensory-scoring concept, mock route generator, quiet-space dataset and disruption dataset.

The project has since been extended with individual development focused on completing FIT5120 User Stories US1.1 and US1.2.

## Current features

### US1.1 — Sensory-load route comparison

- Detect the user’s current location as the journey origin
- Allow manual origin entry when location access is unavailable
- Generate three alternative route options
- Filter generated routes by transport type
- Adjust simulated crowd conditions according to travel time
- Display Low, Medium, High or Very High sensory-load ratings
- Explain the factors contributing to each rating
- Communicate ratings with text and visual indicators, not colour alone
- Save personal sensory preferences in the browser

### US1.2 — Lower-crowd route planning

- Display simulated High and Medium pedestrian-density zones
- Generate alternative routes with different simulated paths
- Calculate route crowd exposure from proximity to crowd zones
- Prioritise lower-crowd options when sorting by “Calmest”
- Display each route’s crowd level
- Show the selected route on an interactive map
- Display a navigation preview with route time, walking distance, crowd level and sensory rating

### Additional MVP features

- Interactive Leaflet map using OpenStreetMap tiles
- Curated Melbourne quiet-space dataset
- Simulated disruption markers
- Post-journey feedback
- Admin dashboard for reviewing mock-data status and feedback
- Optional Supabase configuration scaffold

## Individual contributions

The following improvements were implemented after the initial team baseline:

- Current-location detection and coordinate propagation
- Manual-location fallback
- Transport-mode filtering
- Time-sensitive simulated crowd levels
- Visible crowd-level information on route cards
- Minimum crowd impact in sensory scoring
- Pedestrian-density zones on the map
- Alternative simulated route geometries
- Spatial route-to-crowd-zone exposure calculation
- Lower-crowd route recommendation
- Selected-route navigation preview
- Fix for preferences not being saved before journey planning
- Fix for empty location coordinates producing unrealistic journey times

## Sensory scoring

Each route receives an explainable sensory-load score based on:

- Crowd exposure
- Service disruptions
- Transfers
- Walking distance
- Construction activity
- Busy CBD or event areas
- Nearby lower-stimulation spaces
- Direct journeys

The user’s saved sensitivity preferences adjust the weight of relevant factors.

The score is converted into one of four labels:

| Score | Sensory-load label |
|---:|---|
| 0–2 | Low |
| 3–5 | Medium |
| 6–8 | High |
| 9+ | Very High |

These scores are comparative estimates, not guarantees or medical assessments.

## Data status

| Data | Current implementation |
|---|---|
| Public transport routes | Deterministic simulated routes |
| Route geometry | Simulated alternative paths |
| Pedestrian density | Simulated Melbourne CBD crowd zones |
| Travel-time crowd effects | Rule-based peak/off-peak adjustment |
| Disruptions | Mock feed |
| Quiet spaces | Curated local dataset |
| User preferences | Browser local storage |
| Feedback and admin-added spaces | Temporary server memory |
| Map tiles | OpenStreetMap |

## Known limitations

- Routes are not connected to live PTV or GTFS services.
- Route paths are simulated and must not be treated as official navigation.
- Crowd zones are simulated and are not real-time pedestrian observations.
- Quiet-space suitability and availability are not guaranteed.
- Quiet-space distance is calculated as straight-line distance.
- Admin-added data and feedback are not permanently stored.
- The admin page does not have authentication.
- Automated tests have not yet been added.

## Remaining roadmap

### US1.3 — Crowd-threshold rerouting

- Detect when an active route exceeds the user’s crowd threshold
- Identify the affected route section
- Suggest a lower-stimulation alternative
- Display sensory level and additional travel time
- Allow the user to accept or reject the suggestion

### US2.1 — Quiet-space navigation

- Add a dedicated quiet-space map
- Allow users to select a refuge location
- Display a route from the current location to that space

### US2.2 — Predictive alerts

- Display a simulated one-hour crowd forecast
- Show increasing, decreasing or stable trends
- Recommend a better departure time

## Technology

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Leaflet and React Leaflet
- OpenStreetMap
- Zod
- Optional Supabase client

## Running locally

Requirements:

- Node.js 18.18 or newer
- Node.js 20 LTS recommended

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Create a production build:

```bash
npm run build
```

## Project status

US1.1 and US1.2 are implemented at simulated MVP level. US1.3, complete quiet-space navigation and US2.2 predictive alerts remain future work.
