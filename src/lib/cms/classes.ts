// Server-only (§5.2, package C). Filters active rows, optionally by `type`, sorted by
// `sortOrder` then `createdAt` (§2 conventions).

import { cache } from 'react';

import { getPayloadClient } from './payload';
import type { Class } from '@/payload-types';

/** `getClasses(type)` — active Reformer or Breathing Room class rows (§2.5, §5.2). */
export const getClasses = cache(async (type?: string): Promise<Class[]> => {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: 'classes',
    where: {
      and: [{ active: { equals: true } }, ...(type ? [{ type: { equals: type } }] : [])],
    },
    sort: ['sortOrder', 'createdAt'],
    depth: 1,
    limit: 100,
  });
  return result.docs;
});
