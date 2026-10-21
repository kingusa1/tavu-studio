// Server-only (package B, §5.2).

import { cache } from 'react';
import type { Where } from 'payload';

import type { Policy } from '@/payload-types';

import { getPayloadClient } from './payload';

/** `where: active = true [AND showOn in [surface]]`, sorted by `sortOrder` then `createdAt`. */
export const getPolicies = cache(async (surface?: string): Promise<Policy[]> => {
  const payload = await getPayloadClient();

  const and: Where[] = [{ active: { equals: true } }];
  if (surface) and.push({ showOn: { in: [surface] } });

  const result = await payload.find({
    collection: 'policies',
    where: { and },
    sort: ['sortOrder', 'createdAt'],
    limit: 0,
    depth: 0,
    overrideAccess: true,
  });

  return result.docs;
});
