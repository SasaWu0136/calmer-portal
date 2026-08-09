import { CrowdZone } from './types';

/**
 * Simulated pedestrian-density areas for the Week 3 MVP.
 * These zones are not connected to live City of Melbourne data.
 */
export const MOCK_CROWD_ZONES: CrowdZone[] = [
  {
    id: 'crowd-flinders-street',
    name: 'Flinders Street Station',
    level: 'high',
    lat: -37.8183,
    lng: 144.9671,
    radiusMeters: 180,
    reason: 'High pedestrian movement around station entrances and platforms'
  },
  {
    id: 'crowd-federation-square',
    name: 'Federation Square',
    level: 'high',
    lat: -37.818,
    lng: 144.969,
    radiusMeters: 150,
    reason: 'Event and visitor activity may increase pedestrian density'
  },
  {
    id: 'crowd-melbourne-central',
    name: 'Melbourne Central',
    level: 'high',
    lat: -37.8112,
    lng: 144.9629,
    radiusMeters: 170,
    reason: 'Busy station, shopping centre and Swanston Street interchange'
  },
  {
    id: 'crowd-southern-cross',
    name: 'Southern Cross Station',
    level: 'medium',
    lat: -37.8183,
    lng: 144.9524,
    radiusMeters: 160,
    reason: 'Moderate pedestrian movement around station entrances'
  },
  {
    id: 'crowd-queen-victoria-market',
    name: 'Queen Victoria Market',
    level: 'medium',
    lat: -37.8076,
    lng: 144.9568,
    radiusMeters: 140,
    reason: 'Market activity can increase pedestrian traffic'
  }
];