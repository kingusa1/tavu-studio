// Stub — package C replaces this with the real seed: 17 classes and 8 page globals (§6).

import type { Payload } from 'payload';

export async function seedClasses(payload: Payload): Promise<void> {
  payload.logger.info('seedClasses: no seed data defined yet (package C)');
}
