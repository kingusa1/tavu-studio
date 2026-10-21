// Server-only — STUB (package C owns the real implementation, §5.2).

import { cache } from 'react';

import type { Class } from '@/payload-types';

/** STUB — returns `[]` until package C implements the real Classes collection (§2.5). */
export const getClasses = cache(async (_type?: string): Promise<Class[]> => {
  return [];
});
