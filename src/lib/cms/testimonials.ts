// Server-only — STUB (package A owns the real implementation, §5.2).

import { cache } from 'react';

import type { Testimonial } from '@/payload-types';

/** STUB — returns `[]` until package A implements the real Testimonials collection (§2.8). */
export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  return [];
});
