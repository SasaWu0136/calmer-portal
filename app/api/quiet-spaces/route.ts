import { NextResponse } from 'next/server';
import { z } from 'zod';
import { QUIET_SPACES } from '@/lib/quietSpacesData';
import { addQuietSpace, getAdditionalQuietSpaces } from '@/lib/adminStore';
import { isSupabaseConfigured } from '@/lib/supabase';
import { distanceMeters } from '@/lib/geo';

const newSpaceSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['Library', 'Park', 'Community Centre', 'Station rest area', 'Gallery']),
  address: z.string().min(1),
  lat: z.number(),
  lng: z.number(),
  openingHours: z.string().min(1),
  accessibilityNotes: z.string().default(''),
  sensoryNotes: z.string().default('')
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  let quietSpaces = [...QUIET_SPACES, ...getAdditionalQuietSpaces()];

  if (lat && lng) {
    const here = { lat: parseFloat(lat), lng: parseFloat(lng) };
    quietSpaces = [...quietSpaces].sort(
      (a, b) => distanceMeters(here, { lat: a.lat, lng: a.lng }) - distanceMeters(here, { lat: b.lat, lng: b.lng })
    );
  }

  return NextResponse.json({
    quietSpaces,
    curatedCount: QUIET_SPACES.length,
    adminAddedCount: getAdditionalQuietSpaces().length,
    supabaseConfigured: isSupabaseConfigured()
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = newSpaceSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid quiet space', details: parsed.error.flatten() }, { status: 400 });
  }

  const space = { id: `admin-${Date.now()}`, ...parsed.data };
  addQuietSpace(space);

  return NextResponse.json({ space }, { status: 201 });
}
