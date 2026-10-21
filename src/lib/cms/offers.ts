// Server-only — STUB (package B owns the real implementation, §5.2). Signature is final;
// callers (globals.ts's token resolution, future page components) never need to change when
// B replaces the body.

import { cache } from 'react';

import type { Offer } from '@/payload-types';

export type OfferSurface = 'home' | 'pricing' | 'classes' | 'servicePage' | 'appointments' | 'llms';

export type GetOffersArgs = {
  category?: string;
  surface?: OfferSurface;
};

/**
 * STUB — returns `[]` until package B implements the real Offers collection and query:
 * `where: active = true AND (availableFrom null OR <= now) AND (availableUntil null OR >= now)
 * AND visibility.showOn<Surface> = true`, sorted by `sortOrder` (§5.2).
 */
export const getOffers = cache(async (_args: GetOffersArgs = {}): Promise<Offer[]> => {
  return [];
});
