import { RouteOption, SensoryPreferences, ScoreResult, SensoryLabel } from './types';

/**
 * Converts a 1-5 sensitivity level into a weight around 1.0.
 * Level 3 (neutral) => 1.0, level 5 (very sensitive) => ~1.67, level 1 => ~0.33
 */
function weight(level: number): number {
  return level / 3;
}

function labelForScore(score: number): SensoryLabel {
  const rounded = Math.round(score);
  if (rounded <= 2) return 'Low sensory load';
  if (rounded <= 5) return 'Medium sensory load';
  if (rounded <= 8) return 'High sensory load';
  return 'Very high sensory load';
}

/**
 * Computes a sensory load score for a single route, given a user's
 * sensory preferences. Higher score = more overwhelming.
 *
 * This mirrors the rule-based MVP scoring engine: every factor adds or
 * subtracts points, weighted by how much that factor affects this user.
 * Nothing here is a medical or diagnostic claim - it is a rough, explainable
 * estimate the person can compare routes with.
 */
export function computeSensoryScore(route: RouteOption, prefs: SensoryPreferences): ScoreResult {
  let score = 0;
  const explanation: string[] = [];

  if (route.crowdLevel === 'high') {
    score += 3 * weight(prefs.crowd);
    explanation.push('Passes through a busy, high-crowd station or platform');
  } else if (route.crowdLevel === 'medium') {
    score += 1.5 * weight(prefs.crowd);
    explanation.push('Moderate crowds expected along this route');
  }

  if (route.hasDisruption) {
    score += 3 * weight(prefs.disruptions);
    explanation.push('An active service disruption is affecting this route');
  }

  if (route.transfers > 2) {
    score += 2 * weight(prefs.transfers);
    explanation.push(`Requires ${route.transfers} transfers`);
  } else if (route.transfers === 2) {
    score += 1 * weight(prefs.transfers);
    explanation.push('Requires 2 transfers');
  }

  if (route.walkingMeters > 800) {
    score += 2 * weight(prefs.walking);
    explanation.push(`Includes a long walking segment (${route.walkingMeters}m)`);
  }

  if (route.hasConstruction) {
    score += 2 * weight(prefs.disruptions);
    explanation.push('Roadworks or construction noise near the route');
  }

  if (route.busyZone) {
    score += 2 * weight(prefs.noise);
    explanation.push('Route passes through a busy CBD or event zone');
  }

  if (route.quietSpaceNearby) {
    score -= 2;
    explanation.push(
      route.quietSpaceName
        ? `${route.quietSpaceName} is within easy reach if you need a break`
        : 'A lower-stimulation space is within easy reach'
    );
  }

  if (route.transfers === 0) {
    score -= 1;
    explanation.push('Direct journey with no transfers');
  }

  const minimumCrowdScore =
    route.crowdLevel === 'high'
      ? 3 * weight(prefs.crowd)
      : route.crowdLevel === 'medium'
        ? 1.5 * weight(prefs.crowd)
        : 0;

  score = Math.max(score, minimumCrowdScore);
  score = Math.max(0, Math.round(score * 10) / 10);

  return {
    score,
    label: labelForScore(score),
    explanation
  };
}

/**
 * Sorts scored routes according to the user's stated preference for
 * this particular journey (calmest, fewest transfers, etc).
 */
export function sortRoutesByPreference<T extends RouteOption & { scoreResult: ScoreResult }>(
  routes: T[],
  preference: 'calmest' | 'fewest_transfers' | 'shortest_walking' | 'fastest'
): T[] {
  const sorted = [...routes];
  switch (preference) {
    case 'fewest_transfers':
      sorted.sort((a, b) => a.transfers - b.transfers || a.scoreResult.score - b.scoreResult.score);
      break;
    case 'shortest_walking':
      sorted.sort((a, b) => a.walkingMeters - b.walkingMeters || a.scoreResult.score - b.scoreResult.score);
      break;
    case 'fastest':
      sorted.sort((a, b) => a.travelTimeMinutes - b.travelTimeMinutes || a.scoreResult.score - b.scoreResult.score);
      break;
    case 'calmest':
    default:
      sorted.sort((a, b) => a.scoreResult.score - b.scoreResult.score || a.travelTimeMinutes - b.travelTimeMinutes);
      break;
  }
  return sorted;
}
