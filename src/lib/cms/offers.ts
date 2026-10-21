// Server-only (package B, §5.2).

import { cache } from 'react';

import type { Offer } from '@/payload-types';

import { getCatalog } from './catalog';
import { resolveTokensDeep } from './tokens';

export type OfferSurface = 'home' | 'pricing' | 'classes' | 'servicePage' | 'appointments' | 'llms';

export type GetOffersArgs = {
  category?: string;
  surface?: OfferSurface;
};

const SURFACE_VISIBILITY_FIELD: Record<OfferSurface, keyof NonNullable<Offer['visibility']>> = {
  home: 'showOnHome',
  pricing: 'showOnPricing',
  classes: 'showOnClasses',
  servicePage: 'showOnServicePage',
  appointments: 'showOnAppointments',
  llms: 'showOnLlms',
};

function isWithinAvailabilityWindow(offer: Offer, now: number): boolean {
  if (offer.availableFrom && new Date(offer.availableFrom).getTime() > now) return false;
  if (offer.availableUntil && new Date(offer.availableUntil).getTime() < now) return false;
  return true;
}

/**
 * Tokens (§4.5) are resolved here, in the query layer, exactly like `getGlobal()` — offers'
 * own text fields (`description`, `note`, `bonus`, `includes[].text`, `llmsLine`,
 * `structuredData.description`, `featureCard.subtitle`) are allowed to contain `{price:…}`,
 * `{from:…}` and `{fact:…}` tokens (§4.5), so building the index needs every offer and ritual
 * (not just the ones this call will return) plus `site-settings.facts`.
 */
export const getOffers = cache(async ({ category, surface }: GetOffersArgs = {}): Promise<Offer[]> => {
  const { offers: allOffers, index } = await getCatalog();

  const now = Date.now();
  const filtered = allOffers.filter((offer) => {
    if (offer.active === false) return false;
    if (!isWithinAvailabilityWindow(offer, now)) return false;
    if (category && offer.category !== category) return false;
    if (surface && !offer.visibility?.[SURFACE_VISIBILITY_FIELD[surface]]) return false;
    return true;
  });

  return filtered.map((offer) => resolveTokensDeep(offer, index));
});
