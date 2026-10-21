// Stub — run with `npm run seed` (`payload run src/seed/index.ts`). The content architect's
// collections will add real seed data here; for now this only confirms the Local API boots.
import { getPayload } from 'payload';

import config from '@payload-config';

async function seed() {
  const payload = await getPayload({ config });
  payload.logger.info('Seed script ran — no seed data defined yet.');
}

await seed();
