'use client';

import { DEFAULT_PREFERENCES, SensoryPreferences, ScoredRoute } from './types';

const PREFERENCES_KEY = 'calmer:preferences';
const CHOSEN_ROUTE_KEY = 'calmer:chosen-route';

export function getStoredPreferences(): SensoryPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  try {
    const raw = window.localStorage.getItem(PREFERENCES_KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PREFERENCES, ...parsed };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function setStoredPreferences(prefs: SensoryPreferences): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
}

export function hasStoredPreferences(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(PREFERENCES_KEY) !== null;
}

export function setChosenRoute(route: ScoredRoute): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CHOSEN_ROUTE_KEY, JSON.stringify(route));
}

export function getChosenRoute(): ScoredRoute | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CHOSEN_ROUTE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
