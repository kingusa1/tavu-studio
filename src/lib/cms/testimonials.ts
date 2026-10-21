// Server-only: real implementation of the Testimonials query (§2.8, §5.2), replacing the F0
// stub. Signature is unchanged so callers written against the stub need no changes.

import { cache } from 'react';

import type { Testimonial } from '@/payload-types';

import { getPayloadClient } from './payload';

/**
 * Active testimonials, sorted by `sortOrder` ascending then `createdAt` (§2 convention). All 3
 * seeded rows are `active: false` (§2.8) — this returns `[]` until the owner activates one.
 */
export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'testimonials',
    where: { active: { equals: true } },
    sort: ['sortOrder', 'createdAt'],
    depth: 1,
  });
  return docs;
});
