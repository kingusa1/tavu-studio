// Server-only (package B, §5.2).

import { cache } from 'react';

import type { MassageRitual } from '@/payload-types';

import { getCatalog } from './catalog';
import { buildPackageSummary } from './offerText';
import type { PackageSummaryRow, RitualLike } from './offerText';
import { resolveTokensDeep } from './tokens';

export type GetRitualsArgs = {
  group?: 'full-body' | 'targeted' | 'signature-foot' | 'escape';
};

/**
 * Tokens (§4.5) are resolved here exactly like `getOffers()` — a ritual's `llmsLine` is
 * self-referencing (e.g. `{price:flow-relaxation.pack}`), so the index needs every offer and
 * ritual, not just the ones this call returns.
 */
export const getRituals = cache(async ({ group }: GetRitualsArgs = {}): Promise<MassageRitual[]> => {
  const { rituals: allRituals, index } = await getCatalog();

  const filtered = allRituals.filter((ritual) => {
    if (ritual.active === false) return false;
    if (group && ritual.group !== group) return false;
    return true;
  });

  return filtered.map((ritual) => resolveTokensDeep(ritual, index));
});

/** The Package Pricing Summary table (§2.4) — computed from active rituals, never stored. */
export const getPackageSummary = cache(async (): Promise<PackageSummaryRow[]> => {
  const rituals = await getRituals();
  return buildPackageSummary(rituals as unknown as RitualLike[]);
});
