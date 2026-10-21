// Server-only — STUB (package B owns the real implementation, §5.2).

import { cache } from 'react';

import type { Policy } from '@/payload-types';

/** STUB — returns `[]` until package B implements the real Policies collection (§2.6). */
export const getPolicies = cache(async (_surface?: string): Promise<Policy[]> => {
  return [];
});
