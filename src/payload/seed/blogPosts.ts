// Five real-content blog articles (owner request 2026-10-21: "create 5 blogs with real images
// from tavu ... the blog must be real 100%"). Every studio fact (prices, durations, capacities,
// booking method, policies) is copied verbatim from this repo's own seed data — `pricing.ts`
// (offers/rituals), `classes.ts` (class names/descriptions/page globals) and `site.ts`
// (facts/hours/address) — never invented. General wellness statements are each backed by one
// reputable external source (NHS, Mayo Clinic, Cochrane, a PubMed-indexed review), verified with
// WebFetch/WebSearch before writing and linked via the post's own `sources` field; no "cures" or
// "treats" language, and each article that discusses health carries a "check with your doctor"
// line (LAW #1 — accuracy, no invented claims).
//
// Written and upserted as DRAFTS (`draft: true`, same Local API option `seedBlog`'s
// `upsertDraftPost` uses — see blog.ts) so the conductor reviews and publishes each one; this
// module intentionally runs *after* `seedBlog` in `index.ts` and re-upserts the same
// `what-is-contrast-therapy` slug with a longer, completed article (improving the existing
// draft in place rather than creating a second contrast-therapy post), so the final content for
// that slug is whichever of the two seed steps ran last — this module, always.

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical';
import type { Payload } from 'payload';

import { mediaId } from './media';

const context = { disableRevalidate: true };

async function findCategoryId(payload: Payload, slug: string): Promise<number | undefined> {
  const { docs } = await payload.find({ collection: 'categories', where: { slug: { equals: slug } }, limit: 1, depth: 0, overrideAccess: true });
  return docs[0]?.id;
}

async function findAuthorId(payload: Payload, slug: string): Promise<number | undefined> {
  const { docs } = await payload.find({ collection: 'authors', where: { slug: { equals: slug } }, limit: 1, depth: 0, overrideAccess: true });
  return docs[0]?.id;
}

/** Same pattern as `seedBlog`'s `upsertDraftPost` (blog.ts) — a draft is a Local API *option*
 * (`draft: true`), never a `_status` value, so re-running this never publishes a post on its own. */
async function upsertDraftPost(payload: Payload, slug: string, data: Record<string, unknown>): Promise<number> {
  const existing = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, depth: 0, overrideAccess: true });
  const existingDoc = existing.docs[0];
  if (existingDoc) {
    const updated = await payload.update({ collection: 'posts', id: existingDoc.id, data, draft: true, context, overrideAccess: true });
    return (updated as { id: number }).id;
  }
  const created = await payload.create({ collection: 'posts', data: { slug, ...data }, draft: true, context, overrideAccess: true });
  return (created as { id: number }).id;
}

type ArticleSeed = {
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  coverFilename: string;
  coverAlt: string;
  markdownFile: string;
  faq: Array<{ question: string; answer: string }>;
  sources: Array<{ title: string; url: string }>;
  /** Other articles in this module, cross-linked once every post exists (pass 2 below). */
  relatedSlugs: string[];
};

const ARTICLES: ArticleSeed[] = [
  {
    slug: 'what-is-contrast-therapy',
    title: 'What Is Contrast Therapy?',
    excerpt:
      "TAVÚ's Contrast Therapy sessions alternate sauna heat with a 5–8°C ice bath over 60 minutes — solo, as a couple, trio or group of up to six.",
    categorySlug: 'recovery',
    coverFilename: 'service-ice-baths.webp',
    coverAlt: 'Ice bath at TAVÚ Studio',
    markdownFile: 'what-is-contrast-therapy.md',
    faq: [
      { question: 'How long is a Contrast Therapy session?', answer: 'Every Contrast Therapy session at TAVÚ runs for 60 minutes, alternating between sauna heat and the ice bath.' },
      { question: 'How cold is the ice bath at TAVÚ?', answer: "TAVÚ's ice bath sits at 5–8°C, used in short, guided rounds rather than one long plunge." },
      {
        question: 'Can I book Contrast Therapy with a partner or group?',
        answer: 'Yes — Couple, Trio (AED 600) and Group sessions for up to six guests (AED 1,050) are all available, with a choice of private or shared suites. Current prices are on the pricing page.',
      },
      {
        question: 'What does Contrast Therapy cost at TAVÚ?',
        answer: 'An Individual session is AED 275, Trio AED 600 and Group (up to six) AED 1,050, all excluding VAT. The Couple price is on the TAVÚ pricing page.',
      },
      {
        question: 'How do I book a Contrast Therapy session?',
        answer: 'Book through the TAVÚ website or the Mindbody app and arrive 10 minutes before your session. Cancellation terms are listed on the Appointments page.',
      },
    ],
    sources: [
      {
        title: 'Cold-water immersion for preventing and treating muscle soreness after exercise — Cochrane',
        url: 'https://www.cochrane.org/evidence/CD008262_cold-water-immersion-preventing-and-treating-muscle-soreness-after-exercise',
      },
    ],
    relatedSlugs: ['normatec-compression-therapy-at-tavu', 'massage-rituals-at-tavu'],
  },
  {
    slug: 'reformer-pilates-at-tavu',
    title: 'Reformer Pilates at TAVÚ: A First-Class Guide',
    excerpt: 'Reformer Pilates at TAVÚ is a small-group, 50-minute class on the reformer machine, capped at 8 participants, from gentle flow to advanced work.',
    categorySlug: 'reformer-pilates',
    coverFilename: 'reformer-room-new.webp',
    coverAlt: 'Client on the reformer in the TAVÚ Reformer Room',
    markdownFile: 'reformer-pilates-at-tavu.md',
    faq: [
      { question: 'How many people are in a Reformer Pilates class at TAVÚ?', answer: 'TAVÚ keeps every Reformer Pilates class to a maximum of 8 participants.' },
      { question: 'How long is a Reformer Pilates class?', answer: 'Each Reformer Pilates class at TAVÚ runs for 50 minutes.' },
      {
        question: 'What class packs are available?',
        answer: '10, 20 and 50-class packs, valid for 2, 3 and 6 months, each including complimentary Contrast Therapy sessions.',
      },
      {
        question: 'What should I know before my first class?',
        answer: "Arrive at least 10 minutes early — each class needs a minimum of 4 participants, and arriving 10+ minutes late means entry won't be permitted.",
      },
      {
        question: 'Which reformer class should a beginner start with?',
        answer: 'TA: Gentle Flow is the slowest, most controlled class and the best starting point for anyone new to the reformer.',
      },
    ],
    sources: [{ title: 'Pilates for beginners — NHS', url: 'https://www.nhs.uk/live-well/exercise/pilates-and-yoga/pilates-for-beginners/' }],
    relatedSlugs: ['the-breathing-room-at-tavu', 'what-is-contrast-therapy'],
  },
  {
    slug: 'the-breathing-room-at-tavu',
    title: 'The Breathing Room at TAVÚ: Mat, Release and Stretch',
    excerpt: "The Breathing Room is TAVÚ's mat-based space for TAVÚ MAT, RELEASE and STRETCH — 11 signature classes to build strength and release tension.",
    categorySlug: 'breathing-room',
    coverFilename: 'service-breathing-props.webp',
    coverAlt: 'TAVÚ Breathing Room class props',
    markdownFile: 'the-breathing-room-at-tavu.md',
    faq: [
      { question: 'What classes are offered in the Breathing Room?', answer: 'TAVÚ MAT, RELEASE and STRETCH — 11 signature classes in total, covering strength, mobility and flexibility.' },
      { question: 'What does a Breathing Room Drop-In cost?', answer: 'AED 120, valid for any TAVÚ MAT, RELEASE or STRETCH class.' },
      {
        question: 'What class packs are available?',
        answer: '10, 20 and 50-class packs valid for 2, 3 and 6 months, each including complimentary Contrast Therapy sessions.',
      },
      { question: 'Is the Breathing Room machine-based like the Reformer Room?', answer: 'No — every Breathing Room class is mat-based; no reformer equipment is used.' },
      {
        question: 'Which Breathing Room class should I try first?',
        answer: 'TAVÚ MAT: Core is a good start for building core strength; TAVÚ RELEASE: Stretch & Release suits anyone wanting a gentler, calming session.',
      },
    ],
    sources: [{ title: 'How to stretch after exercising — NHS', url: 'https://www.nhs.uk/live-well/exercise/how-to-stretch-after-exercising/' }],
    relatedSlugs: ['reformer-pilates-at-tavu', 'what-is-contrast-therapy'],
  },
  {
    slug: 'normatec-compression-therapy-at-tavu',
    title: 'NormaTec Compression Therapy at TAVÚ: How a Session Works',
    excerpt: 'NormaTec Compression Therapy at TAVÚ is a 45-minute pulsing-compression recovery session, available alone or as an add-on to Contrast Therapy.',
    categorySlug: 'recovery',
    coverFilename: 'service-recovery-equipment.webp',
    coverAlt: 'NormaTec compression therapy equipment at TAVÚ Studio',
    markdownFile: 'normatec-compression-therapy-at-tavu.md',
    faq: [
      { question: 'How long is a Compression Therapy session at TAVÚ?', answer: 'A full Individual Session is 45 minutes. A shorter 20-minute Compression Flush add-on is also available.' },
      { question: 'What does Compression Therapy cost?', answer: 'An Individual Session is AED 160, valid 7 days. A Recovery Pack of 6 sessions (5+1) is AED 660, valid 45 days.' },
      {
        question: 'Can I add Compression Therapy to a Contrast Therapy session?',
        answer: 'Yes — the 20-minute Compression Flush add-on can be booked onto any Contrast Therapy session for AED 50.',
      },
      {
        question: 'What is Compression Therapy used for?',
        answer: "It's used as a recovery aid after intense training, for heavy or tight legs, injury recovery, and swelling or fluid retention.",
      },
      {
        question: 'How do I book Compression Therapy?',
        answer: 'Through the TAVÚ website or the Mindbody app; arrive 10 minutes before your session. Cancellation terms are listed on the Appointments page.',
      },
    ],
    sources: [
      {
        title: 'Effects of lower-limb intermittent pneumatic compression on sports recovery: A systematic review and meta-analysis — PMC',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11475002/',
      },
    ],
    relatedSlugs: ['what-is-contrast-therapy', 'massage-rituals-at-tavu'],
  },
  {
    slug: 'massage-rituals-at-tavu',
    title: 'Massage Rituals at TAVÚ: A Guide to Every Treatment',
    excerpt: "TAVÚ's ladies-only massage rituals span full-body FLOW, RELEASE, RECOVER and DRAIN treatments, targeted rituals, ROOTED foot care and the Recovery Escape.",
    categorySlug: 'massage',
    coverFilename: 'service-massage-towels.webp',
    coverAlt: 'Massage Room at TAVÚ Studio',
    markdownFile: 'massage-rituals-at-tavu.md',
    faq: [
      { question: 'Is massage at TAVÚ for everyone?', answer: 'No — massage services at TAVÚ are ladies-only.' },
      {
        question: 'What massage rituals are offered?',
        answer: 'FLOW, RELEASE, RECOVER and DRAIN full-body rituals; RESET, GROUND, LIFT and two RECOVER/RELEASE targeted rituals; ROOTED foot reflexology; and the Recovery Escape.',
      },
      { question: 'How long are the full-body rituals?', answer: 'Sixty or ninety minutes, from AED 350.' },
      { question: 'Is there a pack option?', answer: 'Yes — every ritual has a 5+1 Ritual Pack, valid 45 days.' },
      {
        question: 'What is the TAVÚ Recovery Escape?',
        answer: 'A 3-hour ritual combining exclusive Main Contrast Suite access with a 60-minute full-body massage, for AED 800. Appointments are limited.',
      },
    ],
    sources: [{ title: 'Housecall: The benefits of massage — Mayo Clinic News Network', url: 'https://newsnetwork.mayoclinic.org/discussion/housecall-the-benefits-of-massage/' }],
    relatedSlugs: ['what-is-contrast-therapy', 'normatec-compression-therapy-at-tavu'],
  },
];

export async function seedBlogPosts(payload: Payload): Promise<void> {
  const editorConfig = await editorConfigFactory.default({ config: payload.config });

  const ids: Record<string, number> = {};

  // Pass 1 — create/update every post without `relatedPosts` (the other posts' ids don't exist
  // in `ids` yet on the very first run of this seed).
  for (const article of ARTICLES) {
    const categoryId = await findCategoryId(payload, article.categorySlug);
    const authorId = await findAuthorId(payload, 'tavu-studio');
    if (!categoryId || !authorId) {
      throw new Error(`seedBlogPosts: category "${article.categorySlug}" or author "tavu-studio" not found — seedBlog must run first.`);
    }

    const markdown = await readFile(path.resolve(process.cwd(), 'src/payload/seed/blog', article.markdownFile), 'utf-8');

    const id = await upsertDraftPost(payload, article.slug, {
      title: article.title,
      excerpt: article.excerpt,
      coverImage: { media: mediaId(article.coverFilename), alt: article.coverAlt },
      body: convertMarkdownToLexical({ editorConfig, markdown }),
      categories: [categoryId],
      author: authorId,
      faq: article.faq,
      sources: article.sources,
    });
    ids[article.slug] = id;
  }

  // Pass 2 — now every slug in this module has an id, wire up `relatedPosts`.
  for (const article of ARTICLES) {
    const relatedIds = article.relatedSlugs.map((slug) => ids[slug] ?? null).filter((id): id is number => id !== null);
    if (relatedIds.length === 0) continue;
    await payload.update({
      collection: 'posts',
      id: ids[article.slug],
      data: { relatedPosts: relatedIds },
      draft: true,
      context,
      overrideAccess: true,
    });
  }

  payload.logger.info(`seedBlogPosts: ${ARTICLES.length} articles upserted (drafts — publish from the admin when reviewed)`);
}
