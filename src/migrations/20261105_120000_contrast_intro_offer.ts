import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres';

import { contrastIntroOffer } from '../payload/data/contrastIntroOffer';

// Data-only migration (no schema change). Runs on the production deploy (scripts/vercel-build.mjs).
// 1. Adds the Contrast Intro Offer if no offer with its slug exists yet (never overwrites one an
//    editor already created).
// 2. Compression Flush add-on is now 15 min — only rewrites text that still says "20 min", so any
//    other edit made in the CMS is left alone.
const context = { disableRevalidate: true };

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const existing = await payload.find({
    collection: 'offers',
    where: { slug: { equals: contrastIntroOffer.slug } },
    limit: 1,
    req,
    context,
  });
  if (existing.docs.length === 0) {
    // llmsLine references this offer's own price token, which the token validator only accepts
    // once the row exists — create first, then set it (same two-pass as the seed, seed/pricing.ts).
    const { llmsLine, ...withoutSelfToken } = contrastIntroOffer;
    const created = await payload.create({ collection: 'offers', data: withoutSelfToken, req, context });
    await payload.update({ collection: 'offers', id: created.id, data: { llmsLine }, req, context });
  }

  const flush = await payload.find({
    collection: 'offers',
    where: { slug: { equals: 'compression-flush' } },
    limit: 1,
    req,
    context,
  });
  const flushDoc = flush.docs[0];
  if (flushDoc) {
    const data: Record<string, string> = {};
    if (flushDoc.durationShort === '20 min') data.durationShort = '15 min';
    if (typeof flushDoc.llmsLine === 'string' && flushDoc.llmsLine.includes('(20 min)')) {
      data.llmsLine = flushDoc.llmsLine.replace('(20 min)', '(15 min)');
    }
    if (Object.keys(data).length > 0) {
      await payload.update({ collection: 'offers', id: flushDoc.id, data, req, context });
    }
  }

  const contrastNotes = await payload.find({
    collection: 'offers',
    where: { note: { like: 'Compression Flush (20 min)' } },
    limit: 50,
    req,
    context,
  });
  for (const doc of contrastNotes.docs) {
    if (typeof doc.note !== 'string') continue;
    await payload.update({
      collection: 'offers',
      id: doc.id,
      data: { note: doc.note.replace('Compression Flush (20 min)', 'Compression Flush (15 min)') },
      req,
      context,
    });
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.delete({
    collection: 'offers',
    where: { slug: { equals: contrastIntroOffer.slug } },
    req,
    context,
  });
}
