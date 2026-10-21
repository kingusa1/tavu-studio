// Server-only (DB-02): one shared, request-cached fetch of the three datasets every reader
// in this directory needs (all offers, all massage rituals, site-settings for token facts),
// replacing three separate copies of the same Promise.all in offers.ts, massageRituals.ts and
// globals.ts. Zero arguments on purpose — object-literal arguments always miss React `cache()`
// (compared via Object.is), which is exactly why those three call sites were re-querying
// Postgres on every call instead of sharing one result within a request-render pass.

import { cache } from 'react';

import type { MassageRitual, Offer } from '@/payload-types';

import { getPayloadClient } from './payload';
import { buildTokenIndex } from './tokens';
import type { TokenFact, TokenIndex, TokenOffer, TokenRitual } from './tokens';

export type Catalog = {
  offers: Offer[];
  rituals: MassageRitual[];
  index: TokenIndex;
};

export const getCatalog = cache(async (): Promise<Catalog> => {
  const payload = await getPayloadClient();

  const [allOffers, allRituals, settings] = await Promise.all([
    payload.find({ collection: 'offers', sort: ['sortOrder', 'createdAt'], limit: 0, depth: 1, overrideAccess: true }),
    payload.find({ collection: 'massage-rituals', sort: ['sortOrder', 'createdAt'], limit: 0, depth: 1, overrideAccess: true }),
    payload.findGlobal({ slug: 'site-settings', depth: 0 }).catch(() => null),
  ]);

  const index = buildTokenIndex({
    offers: allOffers.docs as unknown as TokenOffer[],
    rituals: allRituals.docs as unknown as TokenRitual[],
    settings: settings as unknown as { facts?: TokenFact[] | null } | null,
  });

  return { offers: allOffers.docs, rituals: allRituals.docs, index };
});
