// Server-only: a single cached, token-resolved global reader used by every global (§5.2).

import { cache } from 'react';
import type { GlobalSlug } from 'payload';

import { getOffers } from './offers';
import { getRituals } from './massageRituals';
import { getPayloadClient } from './payload';
import { buildTokenIndex, resolveTokensDeep } from './tokens';
import type { TokenFact, TokenOffer, TokenRitual } from './tokens';

/**
 * Fetches one global at `depth`, then resolves every §4.5 token it contains against the
 * current offers, massage rituals and site-settings facts — components never see a token.
 * `cache()`-deduped per request-render pass, like `getPayloadClient`/`findCached` (src/lib/cms/payload.ts).
 */
export const getGlobal = cache(async <T = unknown>(slug: GlobalSlug, { depth = 1 }: { depth?: number } = {}): Promise<T> => {
  const payload = await getPayloadClient();
  const [doc, offers, rituals, settings] = await Promise.all([
    payload.findGlobal({ slug, depth }),
    getOffers(),
    getRituals(),
    payload
      .findGlobal({ slug: 'site-settings' as GlobalSlug, depth: 0 })
      .catch(() => null),
  ]);

  const index = buildTokenIndex({
    offers: offers as unknown as TokenOffer[],
    rituals: rituals as unknown as TokenRitual[],
    settings: settings as unknown as { facts?: TokenFact[] | null } | null,
  });

  return resolveTokensDeep(doc, index) as T;
});
