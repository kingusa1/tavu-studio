// Seed runner — `npm run seed` -> `payload run src/payload/seed/index.ts` (confirmed valid in
// 3.91: node_modules/payload/dist/bin/index.js lists `run` as a script command). Every step
// upserts by slug and passes `context: { disableRevalidate: true }` (§5.4), so re-running
// this is always safe and never triggers a Next revalidation from outside a request.

import { getPayload } from 'payload';

import config from '@payload-config';

import { seedClasses } from './classes';
import { seedCommunity } from './community';
import { seedHome } from './home';
import { seedMedia } from './media';
import { seedPricing } from './pricing';
import { seedSite } from './site';

async function seed() {
  const payload = await getPayload({ config });

  await seedMedia(payload);
  await seedSite(payload);

  // Package stubs — each only logs until its package lands (§6).
  await seedHome(payload);
  await seedPricing(payload);
  await seedClasses(payload);
  await seedCommunity(payload);

  payload.logger.info('Seed complete.');
}

await seed();
