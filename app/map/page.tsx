'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { getChosenRoute } from '@/lib/preferences';
import { QuietSpace, Disruption, ScoredRoute } from '@/lib/types';
import SensoryBadge from '@/components/SensoryBadge';
import type { StopMarker } from '@/components/MapView';
import { MOCK_CROWD_ZONES } from '@/lib/crowdZonesData';

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
    ? (route.routePath ?? [
        route.originCoords,
        route.destCoords
      ]).map((point) => [point.lat, point.lng])
    : undefined;

  const center: [number, number] = route ? [route.originCoords.lat, route.originCoords.lng] : MELBOURNE_CBD;

  return (
    <div className="mx-auto max-w-content px-5 sm:px-8 py-14">
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-3">Map view</h1>

      {route ? (
        <section
          aria-label="Selected navigation route"
          className="mb-6 rounded-card border border-tram/30 bg-tram-light px-5 py-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-tram-dark">
                Navigation preview · Selected route
              </p>

              <h2 className="mt-1 font-medium text-ink">
                {route.name}
              </h2>

              <p className="mt-1 text-sm text-inkSoft">
                {route.origin} → {route.destination}
              </p>

              <p className="mt-2 text-sm text-inkSoft">
                {route.travelTimeMinutes} min · {route.walkingMeters}m walking ·{' '}
                <span className="capitalize">
                  {route.crowdLevel} crowd
                </span>
              </p>
            </div>

            <SensoryBadge
              score={route.scoreResult.score}
              label={route.scoreResult.label}
              size="sm"
            />
          </div>
        </section>
      ) : (
        <p className="text-inkSoft mb-6 max-w-xl">
          No route selected yet - showing quiet spaces and current disruptions around Melbourne.{' '}
          <Link href="/journey" className="underline underline-offset-2 font-medium text-tram-dark">
            Search a journey
          </Link>{' '}
          to plot it here.
        </p>
      )}

      <MapView center={center} zoom={13} quietSpaces={quietSpaces} disruptions={disruptions} stops={stops} routeLine={routeLine} crowdZones={MOCK_CROWD_ZONES}/>

      {route && (
        <p className="text-xs text-inkSoft mt-3 max-w-xl">
          The displayed route is a simulated MVP path, not an official PTV navigation route. 
          Live GTFS route shapes will replace it in a later iteration.
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
