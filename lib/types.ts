export type SensitivityLevel = 1 | 2 | 3 | 4 | 5;

export interface SensoryPreferences {
  crowd: SensitivityLevel;
  noise: SensitivityLevel;
  disruptions: SensitivityLevel;
  walking: SensitivityLevel;
  transfers: SensitivityLevel;
  visualLoad: SensitivityLevel;
}

export const DEFAULT_PREFERENCES: SensoryPreferences = {
  crowd: 3,
  noise: 3,
  disruptions: 3,
  walking: 3,
  transfers: 3,
  visualLoad: 3
};

export type CrowdLevel = 'low' | 'medium' | 'high';

export interface CrowdZone {
  id: string;
  name: string;
  level: CrowdLevel;
  lat: number;
  lng: number;
  radiusMeters: number;
  reason: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface RouteOption {
  id: string;
  name: string;
  mode: 'Train' | 'Tram' | 'Bus' | 'Train + Tram' | 'Train + Walk';
  travelTimeMinutes: number;
  transfers: number;
  walkingMeters: number;
  crowdLevel: CrowdLevel;
  hasDisruption: boolean;
  hasConstruction: boolean;
  busyZone: boolean;
  quietSpaceNearby: boolean;
  quietSpaceName?: string;
  quietSpaceDistanceMeters?: number;
  origin: string;
  destination: string;
  originCoords: Coordinates;
  destCoords: Coordinates;
}

export type SensoryLabel = 'Low sensory load' | 'Medium sensory load' | 'High sensory load' | 'Very high sensory load';

export interface ScoreResult {
  score: number;
  label: SensoryLabel;
  explanation: string[];
}

export interface ScoredRoute extends RouteOption {
  scoreResult: ScoreResult;
}

export type JourneyPreference = 'calmest' | 'fewest_transfers' | 'shortest_walking' | 'fastest';

export interface QuietSpace {
  id: string;
  name: string;
  type: 'Library' | 'Park' | 'Community Centre' | 'Station rest area' | 'Gallery';
  address: string;
  lat: number;
  lng: number;
  openingHours: string;
  accessibilityNotes: string;
  sensoryNotes: string;
}

export interface Disruption {
  id: string;
  source: string;
  title: string;
  description: string;
  disruptionType: 'Transport' | 'Roadworks' | 'Event';
  severity: 1 | 2 | 3;
  lat: number;
  lng: number;
  startTime: string;
  endTime: string;
}

export interface FeedbackEntry {
  id: string;
  routeName: string;
  origin: string;
  destination: string;
  rating: number;
  feltOverwhelmed: boolean;
  cause?: string;
  comment?: string;
  wouldChooseAgain: boolean;
  createdAt: string;
}
