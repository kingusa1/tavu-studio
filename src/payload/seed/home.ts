// Stub — package A replaces this with the real seed: home-page (16 social fallback images,
// 5 explorer items, 2 pillars), about-page, method-page, 3 inactive testimonials (§6).

import type { Payload } from 'payload';

export async function seedHome(payload: Payload): Promise<void> {
  payload.logger.info('seedHome: no seed data defined yet (package A)');
}
