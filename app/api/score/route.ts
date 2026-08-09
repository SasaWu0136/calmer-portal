import { NextResponse } from 'next/server';
import { z } from 'zod';
import { computeSensoryScore } from '@/lib/scoring';
import { RouteOption, SensoryPreferences } from '@/lib/types';

const routeSchema = z.object({
  id: z.string(),
  name: z.string(),
  mode: z.string(),
  travelTimeMinutes: z.number(),
  transfers: z.number(),
  walkingMeters: z.number(),
  crowdLevel: z.enum(['low', 'medium', 'high']),
  hasDisruption: z.boolean(),
  hasConstruction: z.boolean(),
  busyZone: z.boolean(),
  quietSpaceNearby: z.boolean(),
  quietSpaceName: z.string().optional(),
  quietSpaceDistanceMeters: z.number().optional(),
  origin: z.string(),
  destination: z.string(),
  originCoords: z.object({ lat: z.number(), lng: z.number() }),
  destCoords: z.object({ lat: z.number(), lng: z.number() }),
  routePath: z.array(
    z.object({
      lat: z.number(),
      lng: z.number()
    })
  ).min(2)
});

const preferencesSchema = z.object({
  crowd: z.number().min(1).max(5),
  noise: z.number().min(1).max(5),
  disruptions: z.number().min(1).max(5),
  walking: z.number().min(1).max(5),
  transfers: z.number().min(1).max(5),
  visualLoad: z.number().min(1).max(5)
});

const requestSchema = z.object({
  route: routeSchema,
  preferences: preferencesSchema
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.flatten() }, { status: 400 });
  }

  const result = computeSensoryScore(
    parsed.data.route as unknown as RouteOption,
    parsed.data.preferences as unknown as SensoryPreferences
  );
  return NextResponse.json(result);
}
