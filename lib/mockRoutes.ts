import { Coordinates, CrowdLevel, RouteOption } from './types';
import { QUIET_SPACES } from './quietSpacesData';
import { distanceMeters, hashString, seededRandom } from './geo';

const MELBOURNE_CBD: Coordinates = { lat: -37.8136, lng: 144.9631 };

/**
 * A small set of well-known Melbourne stations / suburbs, used to resolve
 * free-text origin/destination input to approximate coordinates for the
 * MVP. Unmatched input falls back to the CBD with a deterministic jitter,
 * so results stay stable for a given search but are never identical for
 * two different unmatched place names.
 */
const KNOWN_PLACES: Record<string, Coordinates> = {
  'flinders street': { lat: -37.8183, lng: 144.9671 },
  'flinders st': { lat: -37.8183, lng: 144.9671 },
  'southern cross': { lat: -37.8183, lng: 144.9524 },
  'melbourne central': { lat: -37.8112, lng: 144.9629 },
  parliament: { lat: -37.8109, lng: 144.9732 },
  'flagstaff': { lat: -37.8117, lng: 144.9573 },
  richmond: { lat: -37.8232, lng: 144.9930 },
  'south yarra': { lat: -37.8390, lng: 144.9922 },
  docklands: { lat: -37.8154, lng: 144.9455 },
  'north melbourne': { lat: -37.8074, lng: 144.9424 },
  clayton: { lat: -37.9151, lng: 145.1307 },
  caulfield: { lat: -37.8774, lng: 145.0442 },
  footscray: { lat: -37.7997, lng: 144.9004 },
  'box hill': { lat: -37.8194, lng: 145.1225 },
  brunswick: { lat: -37.7666, lng: 144.9599 },
  carlton: { lat: -37.8000, lng: 144.9670 },
  'south melbourne': { lat: -37.8323, lng: 144.9598 }
};

function resolveCoords(placeName: string): Coordinates {
  const normalized = placeName.trim().toLowerCase();
  for (const key of Object.keys(KNOWN_PLACES)) {
    if (normalized.includes(key)) {
      return KNOWN_PLACES[key];
    }
  }
  // Unmatched place: jitter around the CBD, deterministically per name.
  const seed = hashString(normalized || 'unknown');
  const jitterLat = (seededRandom(seed) - 0.5) * 0.06;
  const jitterLng = (seededRandom(seed + 1) - 0.5) * 0.06;
  return { lat: MELBOURNE_CBD.lat + jitterLat, lng: MELBOURNE_CBD.lng + jitterLng };
}

function nearestQuietSpace(point: Coordinates) {
  let best: { name: string; distance: number } | null = null;
  for (const space of QUIET_SPACES) {
    const distance = distanceMeters(point, { lat: space.lat, lng: space.lng });
    if (!best || distance < best.distance) {
      best = { name: space.name, distance };
    }
  }
  return best;
}

const CROWD_LEVELS: CrowdLevel[] = ['low', 'medium', 'high'];
const MODES: RouteOption['mode'][] = ['Train', 'Tram', 'Bus', 'Train + Tram', 'Train + Walk'];

/**
 * Generates a small, stable set of mock route options for a given
 * origin/destination pair. Deterministic per input (same search always
 * returns the same options), but varies naturally between searches.
 *
 * This stands in for a real PTV Timetable / GTFS Realtime lookup - see
 * README, "Connecting real data", for how to swap this out later without
 * touching the scoring engine or the UI.
 */
export function generateMockRoutes(origin: string, destination: string, detectedOriginCoords?: Coordinates): RouteOption[] {
  const originCoords = detectedOriginCoords ?? resolveCoords(origin);
  const destCoords = resolveCoords(destination);
  const baseSeed = hashString(`${origin.toLowerCase()}->${destination.toLowerCase()}`);
  const straightLineKm = distanceMeters(originCoords, destCoords) / 1000;

  const routeCount = 3;
  const routes: RouteOption[] = [];

  for (let i = 0; i < routeCount; i++) {
    const seed = baseSeed + i * 97;
    const r = (offset: number) => seededRandom(seed + offset);

    const transfers = Math.max(0, Math.round(r(1) * 3) - i * (i === 2 ? 1 : 0));
    const walkingMeters = Math.round(150 + r(2) * 900);
    const baseTime = Math.max(12, straightLineKm * (3.5 + r(3) * 2));
    const travelTimeMinutes = Math.round(baseTime + transfers * 6 + r(4) * 8);
    const crowdLevel = CROWD_LEVELS[Math.floor(r(5) * CROWD_LEVELS.length)];
    const hasDisruption = r(6) < 0.28;
    const hasConstruction = r(7) < 0.22;
    const busyZone = r(8) < 0.3;
    const mode = MODES[Math.floor(r(9) * MODES.length)];

    // Simulate a slightly different alighting point per route option, so
    // quiet-space proximity varies meaningfully between alternatives.
    const alightPoint: Coordinates = {
      lat: destCoords.lat + (r(10) - 0.5) * 0.006,
      lng: destCoords.lng + (r(11) - 0.5) * 0.006
    };
    const nearest = nearestQuietSpace(alightPoint);
    const quietSpaceNearby = !!nearest && nearest.distance <= 350;

    routes.push({
      id: `route-${i + 1}-${baseSeed}`,
      name: `${mode} via ${destination.trim() || 'city'}${i > 0 ? ` (option ${i + 1})` : ''}`,
      mode,
      travelTimeMinutes,
      transfers,
      walkingMeters,
      crowdLevel,
      hasDisruption,
      hasConstruction,
      busyZone,
      quietSpaceNearby,
      quietSpaceName: nearest?.name,
      quietSpaceDistanceMeters: nearest ? Math.round(nearest.distance) : undefined,
      origin,
      destination,
      originCoords,
      destCoords
    });
  }

  return routes;
}
