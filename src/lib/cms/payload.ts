// Server-only: this module talks to the database via the Payload Local API and must
// never be imported from a Client Component. (The `server-only` package isn't installed
// in this project; this comment is the documented fallback per the build brief.)
import { cache } from 'react';
import { getPayload, type CollectionSlug, type GlobalSlug, type Payload, type Where } from 'payload';

import config from '@payload-config';

let payloadPromise: Promise<Payload> | null = null;

/** Memoised Payload client — Payload itself pools the underlying DB connection. */
export function getPayloadClient(): Promise<Payload> {
  if (!payloadPromise) {
    payloadPromise = getPayload({ config });
  }
  return payloadPromise;
}

/**
 * Cached global read for a single request-render pass (React `cache` dedupes repeated calls
 * with the same arguments within one render, the same pattern Next.js Server Components use
 * for fetch deduping).
 */
export const getGlobalCached = cache(async <T = unknown>(slug: GlobalSlug, depth = 1): Promise<T> => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug, depth }) as Promise<T>;
});

/** Cached collection read for a single request-render pass — see getGlobalCached. */
export const findCached = cache(async <T = unknown>(
  collection: CollectionSlug,
  options: { depth?: number; limit?: number; where?: Where } = {},
): Promise<T> => {
  const payload = await getPayloadClient();
  return payload.find({ collection, depth: options.depth ?? 1, limit: options.limit, where: options.where }) as Promise<T>;
});
