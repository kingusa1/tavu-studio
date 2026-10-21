// Server-only — STUB (package B owns the real implementation, §5.2).

import { cache } from 'react';

import type { MassageRitual } from '@/payload-types';
import type { PackageSummaryRow } from './offerText';

export type GetRitualsArgs = {
  group?: 'full-body' | 'targeted' | 'signature-foot' | 'escape';
};

/** STUB — returns `[]` until package B implements the real MassageRituals collection (§2.4). */
export const getRituals = cache(async (_args: GetRitualsArgs = {}): Promise<MassageRitual[]> => {
  return [];
});

/** STUB — returns `[]`; the real implementation computes the Package Pricing Summary (§2.4). */
export const getPackageSummary = cache(async (): Promise<PackageSummaryRow[]> => {
  return [];
});
