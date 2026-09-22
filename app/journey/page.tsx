'use client';

import { useState } from 'react';
import { LocateFixed } from 'lucide-react';

export default function JourneySearchPage() {
  const [origin, setOrigin] = useState('');
  const [originCoords, setOriginCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationStatus, setLocationStatus] = useState<
    'idle' | 'locating' | 'success' | 'error'
  >('idle');

  function detectLocation() {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      return;
    }

    setLocationStatus('locating');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setOriginCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setOrigin('Current location');
        setLocationStatus('success');
      },
      (error) => {
        console.error('Location error:', error.message);
        setLocationStatus('error');
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  }

  return (
    <div className="mx-auto max-w-content px-5 sm:px-8 py-14">
      <p className="text-sm font-medium tracking-wide text-tram-dark uppercase mb-3">Step 2 of 2</p>
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-3">Search a journey</h1>
      <p className="text-inkSoft max-w-xl mb-10 leading-relaxed">
        Enter where you&apos;re travelling from and to. Calmer will compare route options and explain the sensory
        load of each one - no need to set preferences first, but results are far more useful if you have.
      </p>

      <form
        method="GET"
        action="/results"
        className="surface-card max-w-3xl rounded-[1.5rem] px-6 py-7 sm:px-8 sm:py-8 space-y-7"
      >
        <input type="hidden" name="originLat" value={originCoords?.lat ?? ''} />
        <input type="hidden" name="originLng" value={originCoords?.lng ?? ''} />

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="origin" className="block text-sm font-medium text-ink mb-1.5">
              From
            </label>
            <input
              id="origin"
              name="origin"
              type="text"
              required
              value={origin}
              onChange={(event) => {
                setOrigin(event.target.value);
                setOriginCoords(null);
                setLocationStatus('idle');
              }}
              placeholder="e.g. Clayton Station"
              className="focus-ring w-full rounded-lg border border-line px-3.5 py-2.5 text-ink placeholder:text-inkSoft/70"
            />
            <button
              type="button"
              onClick={detectLocation}
              disabled={locationStatus === 'locating'}
              className="focus-ring mt-2 inline-flex items-center gap-2 text-sm font-medium text-tram-dark disabled:opacity-60"
            >
              <LocateFixed className="h-4 w-4" aria-hidden="true" />
              {locationStatus === 'locating' ? 'Detecting location...' : 'Use my current location'}
            </button>

            {locationStatus === 'success' && (
              <p role="status" className="mt-1 text-xs text-tram-dark">
                Current location detected.
              </p>
            )}

            {locationStatus === 'error' && (
              <p role="alert" className="mt-1 text-xs text-caution-dark">
                We could not access your location. Enter your starting point manually.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-ink mb-1.5">
              To
            </label>
            <input
              id="destination"
              name="destination"
              type="text"
              required
              placeholder="e.g. Flinders Street Station"
              className="focus-ring w-full rounded-lg border border-line px-3.5 py-2.5 text-ink placeholder:text-inkSoft/70"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-ink mb-1.5">
              Travel time
            </label>
            <input
              id="time"
              name="time"
              type="time"
              className="focus-ring w-full rounded-lg border border-line px-3.5 py-2.5 text-ink"
            />
          </div>
          <div>
            <label htmlFor="mode" className="block text-sm font-medium text-ink mb-1.5">
              Transport type
            </label>
            <select
              id="mode"
              name="mode"
              defaultValue="any"
              className="focus-ring w-full rounded-lg border border-line px-3.5 py-2.5 text-ink bg-white"
            >
              <option value="any">Any</option>
              <option value="train">Train</option>
              <option value="tram">Tram</option>
              <option value="bus">Bus</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="preference" className="block text-sm font-medium text-ink mb-1.5">
            Sort routes by
          </label>
          <select
            id="preference"
            name="preference"
            defaultValue="calmest"
            className="focus-ring w-full sm:w-64 rounded-lg border border-line px-3.5 py-2.5 text-ink bg-white"
          >
            <option value="calmest">Calmest</option>
            <option value="fewest_transfers">Fewest transfers</option>
            <option value="shortest_walking">Shortest walking</option>
            <option value="fastest">Fastest</option>
          </select>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="focus-ring rounded-full bg-tram px-6 py-3 text-white font-medium hover:bg-tram-dark transition-colors"
          >
            Compare routes
          </button>
        </div>
      </form>

      <p className="text-xs text-inkSoft mt-6 max-w-xl">
        Route options are currently generated from a curated mock dataset while Calmer&apos;s live transport
        integration is being built - see the admin page for data status.
      </p>
    </div>
  );
}
