'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import RouteCard from '@/components/RouteCard';
import { getStoredPreferences, hasStoredPreferences, setChosenRoute } from '@/lib/preferences';
import { JourneyPreference, ScoredRoute } from '@/lib/types';

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const origin = searchParams.get('origin') ?? '';
  const destination = searchParams.get('destination') ?? '';
  const originLat = searchParams.get('originLat');
const originLng = searchParams.get('originLng');

const detectedOriginCoords =
  originLat !== null &&
  originLng !== null &&
  Number.isFinite(Number(originLat)) &&
  Number.isFinite(Number(originLng))
    ? {
        lat: Number(originLat),
        lng: Number(originLng)
      }
    : undefined;
  const preference = (searchParams.get('preference') as JourneyPreference) ?? 'calmest';

  const [scoredRoutes, setScoredRoutes] = useState<ScoredRoute[]>([]);
  const [usingDefaults, setUsingDefaults] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  useEffect(() => {
    if (!origin || !destination) return;

    setStatus('loading');
    const preferences = getStoredPreferences();
    setUsingDefaults(!hasStoredPreferences());

    fetch('/api/journey/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin, destination, preference, preferences,   originCoords: detectedOriginCoords })
    })
      .then((res) => {
        if (!res.ok) throw new Error('Search failed');
        return res.json();
      })
      .then((data) => {
        setScoredRoutes(data.routes ?? []);
        setStatus('done');
      })
      .catch(() => setStatus('error'));
  }, [origin, destination, preference, originLat, originLng]);

  function handleChoose(route: ScoredRoute) {
    setChosenRoute(route);
    router.push('/map');
  }

  if (!origin || !destination) {
    return (
      <div className="mx-auto max-w-content px-5 sm:px-8 py-14">
        <h1 className="font-display text-3xl text-ink mb-3">No journey to show yet</h1>
        <p className="text-inkSoft mb-6 max-w-lg">Search for a journey first, and your route comparison will appear here.</p>
        <Link
          href="/journey"
          className="focus-ring inline-flex items-center rounded-full bg-tram px-6 py-3 text-white font-medium hover:bg-tram-dark transition-colors"
        >
          Search a journey
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-content px-5 sm:px-8 py-14">
      <p className="text-sm font-medium tracking-wide text-tram-dark uppercase mb-3">Route comparison</p>
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-2">
        {origin} <span className="text-inkSoft font-normal">to</span> {destination}
      </h1>
      <p className="text-inkSoft mb-4">
        Sorted by <strong className="text-ink font-medium">{preferenceLabel(preference)}</strong>.
      </p>

      {usingDefaults && (
        <div className="mb-8 rounded-card bg-dusk-light border border-dusk/20 px-5 py-4 text-sm text-dusk-dark">
          Showing scores based on default (neutral) sensitivity.{' '}
          <Link href="/preferences" className="underline underline-offset-2 font-medium">
            Set your preferences
          </Link>{' '}
          for a more personal comparison.
        </div>
      )}

      {status === 'loading' && <p className="text-inkSoft">Comparing routes...</p>}
      {status === 'error' && (
        <p className="text-caution-dark">Something went wrong comparing routes - please try searching again.</p>
      )}

      <div className="space-y-5">
        {scoredRoutes.map((route, i) => (
          <RouteCard key={route.id} route={route} rank={i + 1} onChoose={handleChoose} />
        ))}
      </div>

      <p className="text-xs text-inkSoft mt-8 max-w-xl">
        Routes shown here come from a curated mock dataset, not a live PTV feed - see the admin page for data
        status.
      </p>
    </div>
  );
}

function preferenceLabel(preference: JourneyPreference): string {
  switch (preference) {
    case 'fewest_transfers':
      return 'fewest transfers';
    case 'shortest_walking':
      return 'shortest walking';
    case 'fastest':
      return 'fastest';
    default:
      return 'calmest';
  }
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-content px-5 sm:px-8 py-14">
          <p className="text-inkSoft">Comparing routes...</p>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
