// Server-only — STUB (package D owns the real implementation, §5.2).

import { cache } from 'react';

import type { Event } from '@/payload-types';

/** STUB — returns `[]` until package D implements the real Events collection (§2.7). */
export const getEvents = cache(async (_kind?: string): Promise<Event[]> => {
  return [];
});
