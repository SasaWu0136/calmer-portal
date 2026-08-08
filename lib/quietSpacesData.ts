import { QuietSpace } from './types';

/**
 * Curated MVP dataset (Phase 9 of the build plan). Coordinates are
 * approximate, for demo purposes - verify against an authoritative source
 * (e.g. Vicmap / City of Melbourne open data) before relying on this in
 * production. None of these locations are guaranteed to be quiet at all
 * times - they are offered as "lower-stimulation options", not promises.
 */
export const QUIET_SPACES: QuietSpace[] = [
  {
    id: 'qs-1',
    name: 'State Library Victoria',
    type: 'Library',
    address: '328 Swanston St, Melbourne',
    lat: -37.8098,
    lng: 144.9654,
    openingHours: '10:00 - 18:00 daily (varies by area)',
    accessibilityNotes: 'Step-free entrance on Swanston St, lifts to all levels',
    sensoryNotes: 'La Trobe Reading Room and upper floors are usually quieter than the entrance hall'
  },
  {
    id: 'qs-2',
    name: 'Carlton Gardens',
    type: 'Park',
    address: 'Carlton Gardens, Carlton',
    lat: -37.8057,
    lng: 144.9713,
    openingHours: 'Open 24 hours',
    accessibilityNotes: 'Paved paths, mostly flat',
    sensoryNotes: 'Open lawns away from the main fountain are usually low-stimulation'
  },
  {
    id: 'qs-3',
    name: 'Melbourne Central Quiet Seating',
    type: 'Station rest area',
    address: 'Melbourne Central Station concourse',
    lat: -37.8112,
    lng: 144.9629,
    openingHours: 'Station operating hours',
    accessibilityNotes: 'Step-free from street and platform level',
    sensoryNotes: 'Seating away from the shot tower atrium is calmer than the main concourse'
  },
  {
    id: 'qs-4',
    name: 'Federation Square Atrium (quiet edge)',
    type: 'Gallery',
    address: 'Fed Square, Melbourne',
    lat: -37.8180,
    lng: 144.9690,
    openingHours: '10:00 - 17:00 (varies by event)',
    accessibilityNotes: 'Ramps throughout the main square',
    sensoryNotes: 'Can be very busy during events - check what is on before relying on this one'
  },
  {
    id: 'qs-5',
    name: 'Docklands Library',
    type: 'Library',
    address: '107 Bourke St, Docklands',
    lat: -37.8154,
    lng: 144.9455,
    openingHours: '10:00 - 18:00 Mon-Fri, shorter on weekends',
    accessibilityNotes: 'Step-free entrance, accessible toilets',
    sensoryNotes: 'Small, community-scale library - generally low crowd'
  },
  {
    id: 'qs-6',
    name: 'Flagstaff Gardens',
    type: 'Park',
    address: 'Flagstaff Gardens, West Melbourne',
    lat: -37.8107,
    lng: 144.9564,
    openingHours: 'Open 24 hours',
    accessibilityNotes: 'Paved and grass paths, mostly flat',
    sensoryNotes: 'Northern lawns tend to be quieter than the King St edge'
  },
  {
    id: 'qs-7',
    name: 'Treasury Gardens',
    type: 'Park',
    address: 'Treasury Gardens, East Melbourne',
    lat: -37.8121,
    lng: 144.9765,
    openingHours: 'Open 24 hours',
    accessibilityNotes: 'Paved paths around the lake',
    sensoryNotes: 'Shaded benches around the lake are a reliable low-stimulation spot'
  },
  {
    id: 'qs-8',
    name: 'Fitzroy Gardens Conservatory',
    type: 'Park',
    address: 'Fitzroy Gardens, East Melbourne',
    lat: -37.8127,
    lng: 144.9797,
    openingHours: '9:00 - 17:00 daily',
    accessibilityNotes: 'Step-free entrance to the conservatory',
    sensoryNotes: 'Indoor conservatory is climate-controlled and rarely crowded'
  },
  {
    id: 'qs-9',
    name: 'Queen Victoria Market - Market Building corner',
    type: 'Community Centre',
    address: 'Queen Victoria Market, 513 Elizabeth St',
    lat: -37.8076,
    lng: 144.9568,
    openingHours: 'Market trading days only - check current hours',
    accessibilityNotes: 'Step-free, wide aisles in the indoor building',
    sensoryNotes: 'Busy on trading days - the enclosed Market Building is calmer than the outdoor sheds'
  },
  {
    id: 'qs-10',
    name: 'Kathleen Syme Library, Carlton',
    type: 'Library',
    address: '251 Faraday St, Carlton',
    lat: -37.8007,
    lng: 144.9686,
    openingHours: '9:30 - 20:00 Mon-Thu, shorter Fri-Sun',
    accessibilityNotes: 'Step-free entrance, accessible toilets',
    sensoryNotes: 'Small neighbourhood library, generally quiet reading areas'
  },
  {
    id: 'qs-11',
    name: 'South Melbourne Library',
    type: 'Library',
    address: '66 Emerald Hill Cnr Bank St, South Melbourne',
    lat: -37.8323,
    lng: 144.9598,
    openingHours: '10:00 - 20:00 Mon-Thu, shorter Fri-Sun',
    accessibilityNotes: 'Step-free entrance, lift to upper floor',
    sensoryNotes: 'Upper floor reading room is quieter than the ground-floor entrance'
  },
  {
    id: 'qs-12',
    name: 'Royal Botanic Gardens (Melbourne Gate)',
    type: 'Park',
    address: 'Birdwood Ave, South Yarra',
    lat: -37.8304,
    lng: 144.9796,
    openingHours: '7:30 - sunset daily',
    accessibilityNotes: 'Mostly flat paved paths near the main gates',
    sensoryNotes: 'Large enough to always find a quiet corner, even on busy days'
  }
];
