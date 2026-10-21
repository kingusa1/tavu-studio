// Package E seed: blog categories/author/example post, FAQs, and the Editorial Policy legal
// page (brief §A/§B/§C). Every fact below is copied from today's seeded content (site-settings
// facts, pricing/classes/service-page seeds) or is a plain description of the site's own
// structure — nothing is invented (package-e.md "Facts only").

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical';
import type { Payload } from 'payload';

import type { Author, Category, Faq, LegalPage } from '@/payload-types';

import { mediaId } from './media';

const context = { disableRevalidate: true };

// One dedicated upsert per collection (matching the established pattern in seed/community.ts's
// `upsertEvent`/`upsertLegalPage`) rather than a generic union-typed helper — Payload's Local
// API overloads resolve a *union* of collection slugs against the strictest member's signature
// (e.g. requiring `draft` whenever any member has a drafts config), which a literal slug avoids.

type CategoryInput = Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'slug'>;
async function upsertCategory(payload: Payload, slug: string, data: CategoryInput): Promise<Category> {
  const existing = await payload.find({ collection: 'categories', where: { slug: { equals: slug } }, limit: 1, depth: 0, overrideAccess: true });
  const existingDoc = existing.docs[0];
  if (existingDoc) return payload.update({ collection: 'categories', id: existingDoc.id, data, context, overrideAccess: true });
  return payload.create({ collection: 'categories', data: { slug, ...data }, context, overrideAccess: true });
}

type AuthorInput = Omit<Author, 'id' | 'createdAt' | 'updatedAt' | 'slug'>;
async function upsertAuthor(payload: Payload, slug: string, data: AuthorInput): Promise<Author> {
  const existing = await payload.find({ collection: 'authors', where: { slug: { equals: slug } }, limit: 1, depth: 0, overrideAccess: true });
  const existingDoc = existing.docs[0];
  if (existingDoc) return payload.update({ collection: 'authors', id: existingDoc.id, data, context, overrideAccess: true });
  return payload.create({ collection: 'authors', data: { slug, ...data }, context, overrideAccess: true });
}

type FaqInput = Omit<Faq, 'id' | 'createdAt' | 'updatedAt'>;
async function upsertFaq(payload: Payload, question: string, data: Omit<FaqInput, 'question'>): Promise<Faq> {
  const existing = await payload.find({ collection: 'faqs', where: { question: { equals: question } }, limit: 1, depth: 0, overrideAccess: true });
  const existingDoc = existing.docs[0];
  if (existingDoc) return payload.update({ collection: 'faqs', id: existingDoc.id, data, context, overrideAccess: true });
  return payload.create({ collection: 'faqs', data: { question, ...data }, context, overrideAccess: true });
}

type LegalPageInput = Omit<LegalPage, 'id' | 'createdAt' | 'updatedAt' | 'slug'>;
async function upsertLegalPage(payload: Payload, slug: NonNullable<LegalPage['slug']>, data: LegalPageInput): Promise<LegalPage> {
  const existing = await payload.find({ collection: 'legal-pages', where: { slug: { equals: slug } }, limit: 1, depth: 0, overrideAccess: true });
  const existingDoc = existing.docs[0];
  if (existingDoc) return payload.update({ collection: 'legal-pages', id: existingDoc.id, data, context, overrideAccess: true });
  return payload.create({ collection: 'legal-pages', data: { slug, ...data }, context, overrideAccess: true });
}

/**
 * Posts have `versions.drafts` enabled (CMS-Content-Model.md D9-style, brief §A), so writing a
 * draft is a Local API *option* (`draft: true`), not a `_status` value inside `data` — Payload
 * saves a draft version without ever creating a published one (payloadcms.com/docs/versions/drafts).
 * That is how the example post stays "never published" (brief "Seed").
 */
async function upsertDraftPost(payload: Payload, slug: string, data: Record<string, unknown>): Promise<void> {
  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const existingDoc = existing.docs[0];
  if (existingDoc) {
    await payload.update({ collection: 'posts', id: existingDoc.id, data, draft: true, context, overrideAccess: true });
  } else {
    await payload.create({ collection: 'posts', data: { slug, ...data }, draft: true, context, overrideAccess: true });
  }
}

async function seedCategories(payload: Payload): Promise<Record<string, number>> {
  const categories: Array<{ slug: string; title: string; description: string }> = [
    { slug: 'reformer-pilates', title: 'Reformer Pilates', description: 'Small-group reformer classes, limited to 8 participants.' },
    { slug: 'breathing-room', title: 'Breathing Room', description: 'TAVÚ MAT, RELEASE and STRETCH mat-based classes.' },
    { slug: 'recovery', title: 'Recovery', description: 'Contrast Therapy, Compression Therapy and recovery memberships.' },
    { slug: 'massage', title: 'Massage', description: 'Ladies-only massage rituals.' },
    { slug: 'studio-news', title: 'Studio News', description: 'Updates from TAVÚ Studio.' },
  ];

  const ids: Record<string, number> = {};
  for (const { slug, title, description } of categories) {
    const doc = await upsertCategory(payload, slug, { title, description });
    ids[slug] = doc.id;
  }
  payload.logger.info(`seedBlog: ${categories.length} categories upserted`);
  return ids;
}

async function seedAuthor(payload: Payload): Promise<number> {
  const doc = await upsertAuthor(payload, 'tavu-studio', {
    name: 'TAVÚ Studio',
    kind: 'organization',
    role: 'TAVÚ Studio Team',
    bio: 'Written by the team at TAVÚ Wellness Studio, Al Raha, Abu Dhabi.',
    photo: { media: mediaId('logo.png'), alt: 'TAVÚ Wellness logo' },
    sameAs: [{ url: 'https://www.instagram.com/tavuwellness.studio' }],
  });
  payload.logger.info('seedBlog: 1 author upserted (tavu-studio)');
  return doc.id;
}

async function seedExamplePost(payload: Payload, categoryIds: Record<string, number>, authorId: number): Promise<void> {
  const editorConfig = await editorConfigFactory.default({ config: payload.config });
  const markdown = await readFile(path.resolve(process.cwd(), 'src/payload/seed/blog/what-is-contrast-therapy.md'), 'utf-8');

  await upsertDraftPost(payload, 'what-is-contrast-therapy', {
    title: 'What Is Contrast Therapy?',
    excerpt: "A guide to TAVÚ's sauna and ice bath sessions — what each session includes, how long it runs, and who it's for.",
    coverImage: { media: mediaId('service-ice-baths.webp'), alt: 'Ice bath at TAVÚ Studio' },
    body: convertMarkdownToLexical({ editorConfig, markdown }),
    categories: [categoryIds['recovery']],
    author: authorId,
    faq: [
      { question: 'How long is a Contrast Therapy session?', answer: 'Sessions run for 60 minutes.' },
      { question: 'How cold is the ice bath?', answer: 'The ice bath sits at 5–8°C.' },
    ],
  });
  payload.logger.info('seedBlog: 1 example post upserted (what-is-contrast-therapy, draft — never published)');
}

type FaqSeed = { question: string; answer: string; topic: NonNullable<Faq['topic']>; sortOrder: number; sourceNote: string };

const FAQS: FaqSeed[] = [
  // general
  {
    question: 'Where is TAVÚ Studio located?',
    answer: 'TAVÚ is at Shop 1, Crescent Residence, Plot 12, Sector RBW4, Shatie Al Raha, Abu Dhabi, UAE.',
    topic: 'general',
    sortOrder: 1,
    sourceNote: 'site-settings.location.addressLines',
  },
  {
    question: 'What are your opening hours?',
    answer: 'TAVÚ is open 9:00 AM – 9:00 PM, 7 days a week.',
    topic: 'general',
    sortOrder: 2,
    sourceNote: 'site-settings.hours',
  },
  {
    question: 'Do your prices include VAT?',
    answer: 'No. All prices on the website are in AED and exclude VAT.',
    topic: 'general',
    sortOrder: 3,
    sourceNote: 'site-settings.pricing.vatNote',
  },
  {
    question: 'How do I book a class or session?',
    answer: 'Bookings are made through the website or the Mindbody app.',
    topic: 'general',
    sortOrder: 4,
    sourceNote: 'site-settings.llms.policiesBlock',
  },
  {
    question: 'Is TAVÚ a ladies-only studio?',
    answer:
      'Massage services and recovery bundles at TAVÚ are ladies-only. Reformer Pilates, Breathing Room classes, Contrast Therapy and Compression Therapy are open to everyone.',
    topic: 'general',
    sortOrder: 5,
    sourceNote: 'massage-page badge "Ladies Only"; site-settings.llms.notesForAi',
  },
  // reformer-pilates
  {
    question: 'How many people are in a Reformer Pilates class?',
    answer: 'Reformer Pilates classes are small-group, limited to 8 participants.',
    topic: 'reformer-pilates',
    sortOrder: 1,
    sourceNote: 'site-settings.facts.reformer-capacity',
  },
  {
    question: 'How long is a Reformer Pilates class?',
    answer: 'Each Reformer Pilates class is 50 minutes.',
    topic: 'reformer-pilates',
    sortOrder: 2,
    sourceNote: 'site-settings.facts.reformer-duration',
  },
  {
    question: 'What class packs are available for Reformer Pilates?',
    answer: 'Reformer Pilates class packs come in 10, 20 and 50-class packs, valid for 2, 3 and 6 months respectively.',
    topic: 'reformer-pilates',
    sortOrder: 3,
    sourceNote: 'seed/pricing.ts reformer-10/20/50-class-pack validity',
  },
  {
    question: 'What should I know before booking a Reformer Pilates class?',
    answer:
      'Please arrive at least 10 minutes before your class. A minimum of 4 participants is required for the class to proceed, and arriving 10 minutes or more after the start time means entry will not be permitted.',
    topic: 'reformer-pilates',
    sortOrder: 4,
    sourceNote: 'site-settings.llms.policiesBlock',
  },
  // breathing-room
  {
    question: 'What classes are offered in the Breathing Room?',
    answer: 'The Breathing Room offers TAVÚ MAT, RELEASE and STRETCH classes.',
    topic: 'breathing-room',
    sortOrder: 1,
    sourceNote: 'site-settings.llms.sectionHeadings',
  },
  {
    question: 'What class packs are available for the Breathing Room?',
    answer: 'Breathing Room class packs come in 10, 20 and 50-class packs, valid for 2, 3 and 6 months respectively.',
    topic: 'breathing-room',
    sortOrder: 2,
    sourceNote: 'seed/pricing.ts breathing-10/20/50-class-pack validity',
  },
  {
    question: 'Is there a drop-in option for Breathing Room classes?',
    answer: 'Yes — a single drop-in class is available alongside the class packs.',
    topic: 'breathing-room',
    sortOrder: 3,
    sourceNote: 'seed/pricing.ts breathing-drop-in',
  },
  {
    question: 'Where do Breathing Room classes take place?',
    answer: 'At TAVÚ Studio, Shop 1, Crescent Residence, Al Raha, Abu Dhabi.',
    topic: 'breathing-room',
    sortOrder: 4,
    sourceNote: 'site-settings.location',
  },
  // contrast-therapy
  {
    question: 'What does a Contrast Therapy session include?',
    answer: "Alternating sauna and ice bath sessions, using TAVÚ's Himalayan Salt Sauna, Infrared Sauna and Ice Bath facilities.",
    topic: 'contrast-therapy',
    sortOrder: 1,
    sourceNote: 'contrast-therapy-page.overview',
  },
  {
    question: 'How long is a Contrast Therapy session?',
    answer: 'Sessions run for 60 minutes.',
    topic: 'contrast-therapy',
    sortOrder: 2,
    sourceNote: 'site-settings.facts.contrast-duration',
  },
  {
    question: 'How cold is the ice bath?',
    answer: 'The ice bath sits at 5–8°C.',
    topic: 'contrast-therapy',
    sortOrder: 3,
    sourceNote: 'site-settings.facts.cold-plunge-temp',
  },
  {
    question: 'Can I book Contrast Therapy with a partner or group?',
    answer:
      'Yes — individual, couple, trio and group (up to six guests) sessions are available, with a choice of private or shared suites.',
    topic: 'contrast-therapy',
    sortOrder: 4,
    sourceNote: 'seed/pricing.ts contrast-couple/trio/group; contrast-therapy-page.overview.card',
  },
  {
    question: 'Can I add anything to my Contrast Therapy session?',
    answer: 'Yes — Compression Flush is available as an optional add-on.',
    topic: 'contrast-therapy',
    sortOrder: 5,
    sourceNote: 'contrast-therapy-page.overview.card.bullets',
  },
  // compression-therapy
  {
    question: 'What is Compression Therapy at TAVÚ?',
    answer: 'NormaTec compression recovery therapy.',
    topic: 'compression-therapy',
    sortOrder: 1,
    sourceNote: 'header dropdown "NormaTec recovery"',
  },
  {
    question: 'How long is a Compression Therapy session?',
    answer:
      'A full Individual Session is 45 minutes. A shorter 20-minute Compression Flush is also available as an add-on.',
    topic: 'compression-therapy',
    sortOrder: 2,
    sourceNote: 'site-settings.facts.compression-duration; seed/pricing.ts compression-flush durationShort',
  },
  {
    question: 'Is there a pack option for Compression Therapy?',
    answer: 'Yes — a Recovery Pack of 6 × 45-minute sessions is available.',
    topic: 'compression-therapy',
    sortOrder: 3,
    sourceNote: 'seed/pricing.ts compression-recovery-pack durationShort',
  },
  // massage
  {
    question: 'Is massage at TAVÚ for everyone?',
    answer: 'No — massage services at TAVÚ are ladies-only.',
    topic: 'massage',
    sortOrder: 1,
    sourceNote: 'massage-page badge "Ladies Only"',
  },
  {
    question: 'What massage rituals are offered?',
    answer: 'FLOW Relaxation, RELEASE Deep Tissue, RECOVER Sports and DRAIN Lymphatic full-body rituals, targeted recovery rituals, ROOTED foot reflexology, and the Recovery Escape.',
    topic: 'massage',
    sortOrder: 2,
    sourceNote: 'site-settings.structuredData.aggregates (massage)',
  },
  {
    question: 'How long are the full-body massage rituals?',
    answer: 'Full-body rituals are offered in 60 or 90-minute sessions.',
    topic: 'massage',
    sortOrder: 3,
    sourceNote: 'site-settings.llms.massageGroupIntros',
  },
  {
    question: 'Is there a massage pack option?',
    answer: 'Yes — a Ritual Pack of 5 + 1 sessions is included, valid 45 days.',
    topic: 'massage',
    sortOrder: 4,
    sourceNote: 'site-settings.llms.massageGroupIntros',
  },
  // memberships-pricing
  {
    question: 'What memberships does TAVÚ offer?',
    answer: 'Reset Membership and Ritual Unlimited Membership.',
    topic: 'memberships-pricing',
    sortOrder: 1,
    sourceNote: 'site-settings.structuredData.aggregates (membership)',
  },
  {
    question: 'What does the Reset Membership include?',
    answer: 'Valid 30 days: 4 Contrast Therapy sessions, 1 Compression Therapy session, and a complimentary chair massage.',
    topic: 'memberships-pricing',
    sortOrder: 2,
    sourceNote: 'seed/pricing.ts membership-reset; site-settings.structuredData.aggregates',
  },
  {
    question: 'What does the Ritual Unlimited Membership include?',
    answer:
      'Valid 45 days: Contrast Therapy with 2 × 30-minute Compression Therapy sessions and 2 complimentary 30-minute chair massages, with a choice of Main or Private Contrast.',
    topic: 'memberships-pricing',
    sortOrder: 3,
    sourceNote: 'seed/pricing.ts membership-ritual-unlimited; site-settings.structuredData.aggregates',
  },
  {
    question: 'Do membership prices include VAT?',
    answer: 'No — all prices, including memberships, are in AED and exclude VAT.',
    topic: 'memberships-pricing',
    sortOrder: 4,
    sourceNote: 'site-settings.pricing.vatNote',
  },
  // booking
  {
    question: 'How do I book at TAVÚ?',
    answer: 'Through the website or the Mindbody app.',
    topic: 'booking',
    sortOrder: 1,
    sourceNote: 'site-settings.llms.policiesBlock',
  },
  {
    question: 'How early should I arrive for a class?',
    answer: 'At least 10 minutes before your scheduled class time.',
    topic: 'booking',
    sortOrder: 2,
    sourceNote: 'site-settings.llms.policiesBlock',
  },
  {
    question: "What happens if a class doesn't have enough people booked?",
    answer: 'A minimum of 4 participants is required for each class to proceed; classes that do not meet the minimum may be cancelled.',
    topic: 'booking',
    sortOrder: 3,
    sourceNote: 'site-settings.llms.policiesBlock',
  },
  {
    question: 'What if I arrive late for a class?',
    answer: 'Arriving 10 minutes or more after the start time means entry to the class will not be permitted.',
    topic: 'booking',
    sortOrder: 4,
    sourceNote: 'site-settings.llms.policiesBlock',
  },
];

async function seedFaqs(payload: Payload): Promise<void> {
  for (const { question, answer, topic, sortOrder, sourceNote } of FAQS) {
    await upsertFaq(payload, question, { answer, topic, sortOrder, active: true, sourceNote });
  }
  payload.logger.info(`seedBlog: ${FAQS.length} FAQs upserted`);
}

async function seedEditorialPolicy(payload: Payload): Promise<void> {
  const editorConfig = await editorConfigFactory.default({ config: payload.config });
  const markdown = await readFile(path.resolve(process.cwd(), 'src/payload/seed/legal/editorial-policy.md'), 'utf-8');

  await upsertLegalPage(payload, 'editorial-policy', {
    title: 'Editorial Policy',
    lastUpdated: new Date('2026-10-21').toISOString(),
    body: convertMarkdownToLexical({ editorConfig, markdown }),
    contactCard: {
      enabled: true,
      organisationName: 'TAVU Wellness Studio',
      addressLines: [{ line: 'Al Raha Blvd, Al Seef' }, { line: 'Abu Dhabi, United Arab Emirates' }],
      showEmail: true,
      showWhatsapp: true,
      hoursNote: '',
    },
    seo: {
      title: 'Editorial Policy',
      description: 'How TAVÚ Studio writes, reviews and corrects the articles on its blog, including the use of AI assistance.',
      ogTitle: 'Editorial Policy | TAVÚ Studio',
      ogDescription: 'How TAVÚ Studio writes, reviews and corrects its blog articles.',
      robots: 'index-follow',
    },
  });
  payload.logger.info('seedBlog: 1 legal page upserted (editorial-policy)');
}

export async function seedBlog(payload: Payload): Promise<void> {
  const categoryIds = await seedCategories(payload);
  const authorId = await seedAuthor(payload);
  await seedExamplePost(payload, categoryIds, authorId);
  await seedFaqs(payload);
  await seedEditorialPolicy(payload);

  await payload.updateGlobal({
    slug: 'blog-page',
    context,
    overrideAccess: true,
    data: {
      hero: {
        eyebrow: 'Journal',
        title: 'The TAVÚ Blog',
        intro: 'Articles on Reformer Pilates, Breathing Room, Contrast Therapy, Compression Therapy and recovery, from the team at TAVÚ Studio.',
      },
      emptyState: {
        heading: 'New articles are on the way',
        text: "We're preparing our first articles. Check back soon, or explore our services in the meantime.",
      },
      seo: {
        title: 'Blog',
        description: "Articles on Reformer Pilates, Breathing Room, Contrast Therapy, Compression Therapy and recovery from TAVÚ Studio in Abu Dhabi.",
        ogTitle: 'The TAVÚ Blog',
      },
    },
  });

  payload.logger.info('seedBlog: blog-page global upserted');
}
