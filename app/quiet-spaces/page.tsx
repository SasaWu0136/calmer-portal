'use client';

import { useEffect, useState } from 'react';
import { LocateFixed } from 'lucide-react';
import QuietSpaceCard from '@/components/QuietSpaceCard';
import { QuietSpace } from '@/lib/types';
import { distanceMeters } from '@/lib/geo';

export default function QuietSpacesPage() {
  const [spaces, setSpaces] = useState<QuietSpace[]>([]);
  const [distances, setDistances] = useState<Record<string, number>>({});
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/quiet-spaces')
      .then((res) => res.json())
      .then((data) => setSpaces(data.quietSpaces ?? []))
      .catch(() => setSpaces([]));
  }, []);

  function findNearMe() {
    if (!('geolocation' in navigator)) {
      setLocationError("This browser can't share your location - showing all quiet spaces instead.");
      return;
    }
    setLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const here = { lat: position.coords.latitude, lng: position.coords.longitude };
        const next: Record<string, number> = {};
        for (const space of spaces) {
          next[space.id] = distanceMeters(here, { lat: space.lat, lng: space.lng });
        }
        setDistances(next);
        setLocating(false);
      },
      () => {
        setLocationError("Location wasn't shared - showing all quiet spaces instead.");
        setLocating(false);
      }
    );
  }

  const sorted = [...spaces].sort((a, b) => {
    if (distances[a.id] !== undefined && distances[b.id] !== undefined) {
      return distances[a.id] - distances[b.id];
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="mx-auto max-w-content px-5 sm:px-8 py-14">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
        <h1 className="font-display text-3xl sm:text-4xl text-ink">Quiet spaces</h1>
        <button
          type="button"
          onClick={findNearMe}
          disabled={locating}
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink hover:bg-paperDim transition-colors disabled:opacity-60"
        >
          <LocateFixed className="w-4 h-4" aria-hidden="true" />
          {locating ? 'Locating...' : 'Find near me'}
        </button>
      </div>
      <p className="text-inkSoft max-w-xl mb-2 leading-relaxed">
        Lower-stimulation libraries, parks and rest areas around Melbourne. None of these are guaranteed to be
        quiet at all times - treat them as a reasonable bet, not a promise.
      </p>
      {locationError && <p className="text-sm text-caution-dark mb-4">{locationError}</p>}

      <div className="grid sm:grid-cols-2 gap-5 mt-8">
        {sorted.map((space) => (
          <QuietSpaceCard key={space.id} space={space} distanceMeters={distances[space.id]} />
        ))}
      </div>

      {sorted.length === 0 && <p className="text-inkSoft mt-6">Loading quiet spaces...</p>}
    </div>
  );
}
