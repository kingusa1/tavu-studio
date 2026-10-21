// Stub — package D replaces this with the real seed: 4 events, 5 page globals, 2 legal pages
// converted from src/payload/seed/legal/{terms-of-service,privacy-policy}.md (§6).

import type { Payload } from 'payload';

export async function seedCommunity(payload: Payload): Promise<void> {
  payload.logger.info('seedCommunity: no seed data defined yet (package D)');
}
