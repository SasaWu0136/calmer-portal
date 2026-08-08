import { Disruption } from './types';

/**
 * Mock disruption feed (stand-in for PTV / GTFS Realtime / Data Vic
 * roadworks feeds - see README, "Connecting real data"). Times are
 * generated relative to "now" so the demo always looks current.
 */
export function getMockDisruptions(): Disruption[] {
  const now = Date.now();
  const hour = 60 * 60 * 1000;

  return [
    {
      id: 'd-1',
      source: 'PTV Disruptions (mock)',
      title: 'Signal fault near Flinders Street',
      description: 'Trains on the City Loop are running with delays of up to 10 minutes.',
      disruptionType: 'Transport',
      severity: 2,
      lat: -37.8183,
      lng: 144.9671,
      startTime: new Date(now - hour).toISOString(),
      endTime: new Date(now + 2 * hour).toISOString()
    },
    {
      id: 'd-2',
      source: 'Data Vic Roadworks (mock)',
      title: 'Roadworks on Swanston Street',
      description: 'Lane closures and construction noise between Flinders St and La Trobe St.',
      disruptionType: 'Roadworks',
      severity: 1,
      lat: -37.8136,
      lng: 144.9648,
      startTime: new Date(now - 3 * hour).toISOString(),
      endTime: new Date(now + 5 * hour).toISOString()
    },
    {
      id: 'd-3',
      source: 'PTV Disruptions (mock)',
      title: 'Trams replaced by buses on Route 96',
      description: 'Track maintenance between Southbank and East Brunswick.',
      disruptionType: 'Transport',
      severity: 2,
      lat: -37.8226,
      lng: 144.9648,
      startTime: new Date(now - hour).toISOString(),
      endTime: new Date(now + 6 * hour).toISOString()
    },
    {
      id: 'd-4',
      source: 'City of Melbourne Events (mock)',
      title: 'Federation Square event crowding',
      description: 'A public event is drawing large crowds through Fed Square and Flinders St Station.',
      disruptionType: 'Event',
      severity: 2,
      lat: -37.8180,
      lng: 144.9690,
      startTime: new Date(now - 30 * 60 * 1000).toISOString(),
      endTime: new Date(now + 3 * hour).toISOString()
    }
  ];
}
