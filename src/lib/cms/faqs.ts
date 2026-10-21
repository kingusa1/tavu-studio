// Server-only (package E owns this, FAQ brief §C). `faqs` read access is logged-in only
// (brief §0); public pages filter `active: true` themselves through the Local API with
// `overrideAccess: true`.

import { cache } from 'react';

import type { Faq } from '@/payload-types';

import { getOffers } from './offers';
import { getRituals } from './massageRituals';
import { getPayloadClient } from './payload';
import { buildTokenIndex, resolveTokensDeep } from './tokens';
import type { TokenFact, TokenOffer, TokenRitual } from './tokens';

/** Same token-resolution pattern as `getOffers`/`getGlobal` (§4.5) — `answer` may contain `{price:slug}`. */
async function resolveFaqTokens(docs: Faq[]): Promise<Faq[]> {
  const payload = await getPayloadClient();
  const [offers, rituals, settings] = await Promise.all([
    getOffers(),
    getRituals(),
    payload.findGlobal({ slug: 'site-settings', depth: 0, overrideAccess: true }).catch(() => null),
  ]);
  const index = buildTokenIndex({
    offers: offers as unknown as TokenOffer[],
    rituals: rituals as unknown as TokenRitual[],
    settings: settings as unknown as { facts?: TokenFact[] | null } | null,
  });
  return resolveTokensDeep(docs, index);
}

export type FaqTopic =
  | 'general'
  | 'reformer-pilates'
  | 'breathing-room'
  | 'contrast-therapy'
  | 'compression-therapy'
  | 'massage'
  | 'memberships-pricing'
  | 'booking';

/** Every active FAQ, sorted by topic then sortOrder — `/faq` groups them by topic client-side. */
export const getActiveFaqs = cache(async (): Promise<Faq[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'faqs',
    where: { active: { equals: true } },
    depth: 0,
    limit: 0,
    sort: 'sortOrder',
    overrideAccess: true,
  });
  return resolveFaqTokens(docs as Faq[]);
});

/** Active FAQs for one topic — the section rendered on each service page. */
export const getActiveFaqsByTopic = cache(async (topic: FaqTopic): Promise<Faq[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'faqs',
    where: { and: [{ active: { equals: true } }, { topic: { equals: topic } }] },
    depth: 0,
    limit: 0,
    sort: 'sortOrder',
    overrideAccess: true,
  });
  return resolveFaqTokens(docs as Faq[]);
});
