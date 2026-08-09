import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateMockRoutes } from '@/lib/mockRoutes';
import { computeSensoryScore, sortRoutesByPreference } from '@/lib/scoring';
import { DEFAULT_PREFERENCES, SensoryPreferences } from '@/lib/types';

const preferencesSchema = z.object({
  crowd: z.number().min(1).max(5),
  noise: z.number().min(1).max(5),
  disruptions: z.number().min(1).max(5),
  walking: z.number().min(1).max(5),
  transfers: z.number().min(1).max(5),
  visualLoad: z.number().min(1).max(5)
});

const requestSchema = z.object({
  originCoords: z
  .object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180)
  })
  .optional(),
  origin: z.string().min(1),
  destination: z.string().min(1),
  preference: z.enum(['calmest', 'fewest_transfers', 'shortest_walking', 'fastest']).default('calmest'),
  preferences: preferencesSchema.optional(),
  mode: z.enum(['any', 'train', 'tram', 'bus']).default('any'),
  travelTime: z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
  .optional()
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.flatten() }, { status: 400 });
  }

  const { origin, destination, preference, preferences, originCoords, mode, travelTime } = parsed.data;
  const prefs = (preferences ?? DEFAULT_PREFERENCES) as SensoryPreferences;

  const routes = generateMockRoutes(origin, destination, originCoords, mode, travelTime);
  const scored = routes.map((route) => ({ ...route, scoreResult: computeSensoryScore(route, prefs) }));
  const sorted = sortRoutesByPreference(scored, preference);

  return NextResponse.json({ routes: sorted, usingDefaultPreferences: !preferences });
}
