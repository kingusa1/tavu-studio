// Server-only (package D owns the real implementation, §5.2, §2.7).

import { cache } from 'react';

import type { Event } from '@/payload-types';

import { getPayloadClient } from './payload';

export type EventKind = 'upcoming' | 'highlight';

/**
 * Active events of the given `kind` (or every active event when omitted), sorted by
 * `sortOrder` then `createdAt` (§2 conventions). An `upcoming` event whose `endDate` has
 * already passed is hidden — `highlight` events (past collaborations) are never date-filtered.
 */
export const getEvents = cache(async (kind?: EventKind): Promise<Event[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'events',
    where: {
      active: { equals: true },
      ...(kind ? { kind: { equals: kind } } : {}),
    },
    sort: ['sortOrder', 'createdAt'],
    depth: 1,
    limit: 100,
  });

  const now = Date.now();
  return docs.filter((event) => {
    if (event.kind !== 'upcoming' || !event.endDate) return true;
    return new Date(event.endDate).getTime() >= now;
  });
});
