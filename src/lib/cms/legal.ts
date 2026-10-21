// Server-only — STUB (package D owns the real implementation, §5.2).

import { cache } from 'react';

import type { LegalPage } from '@/payload-types';

/** STUB — returns `null` until package D implements the real LegalPages collection (§2.9). */
export const getLegalPage = cache(async (_slug: string): Promise<LegalPage | null> => {
  return null;
});
