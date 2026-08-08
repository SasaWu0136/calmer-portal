import { FeedbackEntry, QuietSpace } from './types';

/**
 * Ephemeral, in-memory demo storage. This persists for as long as the
 * server process stays warm (reliable in `next dev`, and during a warm
 * serverless instance in production) but is NOT durable - a redeploy or
 * cold start clears it. This is intentional for the MVP (Phase 1) - see
 * README.md "Connecting Supabase" for how to swap this for real
 * persistence without changing any page or component.
 */

declare global {
  // eslint-disable-next-line no-var
  var __calmerAdminStore:
    | {
        additionalQuietSpaces: QuietSpace[];
        feedbackEntries: FeedbackEntry[];
      }
    | undefined;
}

function getStore() {
  if (!global.__calmerAdminStore) {
    global.__calmerAdminStore = {
      additionalQuietSpaces: [],
      feedbackEntries: []
    };
  }
  return global.__calmerAdminStore;
}

export function getAdditionalQuietSpaces(): QuietSpace[] {
  return getStore().additionalQuietSpaces;
}

export function addQuietSpace(space: QuietSpace): void {
  getStore().additionalQuietSpaces.push(space);
}

export function getFeedbackEntries(): FeedbackEntry[] {
  return getStore().feedbackEntries;
}

export function addFeedbackEntry(entry: FeedbackEntry): void {
  getStore().feedbackEntries.unshift(entry);
}
