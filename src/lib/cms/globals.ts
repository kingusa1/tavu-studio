// Server-only: a single cached, token-resolved global reader used by every global (§5.2).

import { cache } from 'react';
import type { GlobalSlug } from 'payload';

import { getCatalog } from './catalog';
import { getPayloadClient } from './payload';
import { resolveTokensDeep } from './tokens';

/**
 * Fetches one global at `depth`, then resolves every §4.5 token it contains against the
 * current offers, massage rituals and site-settings facts — components never see a token.
 * `cache()`-deduped per request-render pass, like `getPayloadClient`/`findCached` (src/lib/cms/payload.ts).
 * DB-02: offers/rituals/site-settings come from the shared `getCatalog()` (one fetch per
 * request) instead of each re-querying Postgres through `getOffers()`/`getRituals()`.
 */
export const getGlobal = cache(async <T = unknown>(slug: GlobalSlug, { depth = 1 }: { depth?: number } = {}): Promise<T> => {
  const payload = await getPayloadClient();
  const [doc, { index }] = await Promise.all([
    payload.findGlobal({ slug, depth }),
    getCatalog(),
  ]);

  return resolveTokensDeep(doc, index) as T;
});
