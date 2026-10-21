// Stub — package B replaces this with the real seed: 24 offers, 11 rituals, 9 policies, 4
// page globals, every `llmsLine`, and the site-settings `llms` group update (§6).

import type { Payload } from 'payload';

export async function seedPricing(payload: Payload): Promise<void> {
  payload.logger.info('seedPricing: no seed data defined yet (package B)');
}
