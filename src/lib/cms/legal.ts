// Server-only (package D owns the real implementation, §5.2, §2.9).

import { cache } from 'react';

import type { LegalPage } from '@/payload-types';

import { getPayloadClient } from './payload';

export type LegalPageSlug = 'terms-of-service' | 'privacy-policy';

/** The one `legal-pages` doc matching `slug`, or `null` if it has not been seeded yet. */
export const getLegalPage = cache(async (slug: LegalPageSlug): Promise<LegalPage | null> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'legal-pages',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });
  return docs[0] ?? null;
});
