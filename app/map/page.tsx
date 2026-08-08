'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { getChosenRoute } from '@/lib/preferences';
import { QuietSpace, Disruption, ScoredRoute } from '@/lib/types';
import SensoryBadge from '@/components/SensoryBadge';
import type { StopMarker } from '@/components/MapView';

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="h-[480px] rounded-card border border-line bg-paperDim animate-pulse" aria-hidden="true" />
  )
});

const MELBOURNE_CBD: [number, number] = [-37.8136, 144.9631];

export default function MapPage() {
  const [route, setRoute] = useState<ScoredRoute | null>(null);
  const [quietSpaces, setQuietSpaces] = useState<QuietSpace[]>([]);
  const [disruptions, setDisruptions] = useState<Disruption[]>([]);

  useEffect(() => {
    setRoute(getChosenRoute());

    fetch('/api/quiet-spaces')
      .then((res) => res.json())
      .then((data) => setQuietSpaces(data.quietSpaces ?? []))
      .catch(() => setQuietSpaces([]));

    fetch('/api/disruptions')
      .then((res) => res.json())
      .then((data) => setDisruptions(data.disruptions ?? []))
      .catch(() => setDisruptions([]));
  }, []);

  const stops: StopMarker[] = route
    ? [
        { id: 'origin', position: [route.originCoords.lat, route.originCoords.lng], label: route.origin, kind: 'origin' },
        { id: 'destination', position: [route.destCoords.lat, route.destCoords.lng], label: route.destination, kind: 'destination' }
      ]
    : [];

  const routeLine: [number, number][] | undefined = route
    ? [
        [route.originCoords.lat, route.originCoords.lng],
        [route.destCoords.lat, route.destCoords.lng]
      ]
    : undefined;

  const center: [number, number] = route ? [route.originCoords.lat, route.originCoords.lng] : MELBOURNE_CBD;

  return (
    <div className="mx-auto max-w-content px-5 sm:px-8 py-14">
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-3">Map view</h1>

      {route ? (
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <p className="text-inkSoft">
            Showing <strong className="text-ink font-medium">{route.name}</strong> from {route.origin} to{' '}
            {route.destination}.
          </p>
          <SensoryBadge score={route.scoreResult.score} label={route.scoreResult.label} size="sm" />
        </div>
      ) : (
        <p className="text-inkSoft mb-6 max-w-xl">
          No route selected yet - showing quiet spaces and current disruptions around Melbourne.{' '}
          <Link href="/journey" className="underline underline-offset-2 font-medium text-tram-dark">
            Search a journey
          </Link>{' '}
          to plot it here.
        </p>
      )}

      <MapView center={center} zoom={route ? 13 : 13} quietSpaces={quietSpaces} disruptions={disruptions} stops={stops} routeLine={routeLine} />

      {route && (
        <p className="text-xs text-inkSoft mt-3 max-w-xl">
          The line between stops is a straight-line approximation for the MVP, not the actual transport path - a
          live GTFS shape feed would replace this in a later iteration.
        </p>
      )}

      {route && (
        <div className="mt-10 rounded-card border border-line bg-white p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-caution-dark shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-inkSoft max-w-md">
              Keep an eye on this page for disruptions near your stops. When you finish your trip, quick feedback
              helps improve future scores.
            </p>
          </div>
          <Link
            href="/feedback"
            className="focus-ring shrink-0 inline-flex items-center rounded-full bg-tram px-5 py-2.5 text-sm text-white font-medium hover:bg-tram-dark transition-colors"
          >
            Give feedback on this trip
          </Link>
        </div>
      )}
    </div>
  );
}
