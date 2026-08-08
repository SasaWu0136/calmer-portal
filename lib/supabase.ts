import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Optional persistence layer (Phase 2 in the build plan). The app runs
 * fully on curated/mock data without this configured - preferences live
 * in localStorage, and quiet spaces / disruptions / feedback are served
 * from lib/*Data.ts and in-memory API stores.
 *
 * To switch on real persistence:
 *   1. Create a Supabase project and enable the PostGIS extension.
 *   2. Create the tables described in README.md ("Connecting Supabase").
 *   3. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 *      (and SUPABASE_SERVICE_ROLE_KEY for server-side writes) in .env.local.
 *   4. Swap the in-memory reads/writes in app/api/** for calls to
 *      getSupabaseClient() - each route already notes where to do this.
 */

let cachedClient: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (cachedClient) return cachedClient;

  cachedClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  return cachedClient;
}
