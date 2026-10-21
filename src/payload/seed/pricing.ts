// Package B seed: 24 offers, 11 massage rituals, 9 policies, and the 4 page globals this
// package owns (CMS-Content-Model.md §6). Every row is upserted by a stable key so re-running
// `npm run seed` never duplicates data. `llmsLine` is copied verbatim from `public/llms.txt`
// with each price replaced by its `{price:slug}` token (§5.8 point 4).
//
// Note on `site-settings.llms`: the common brief for this package also calls for a partial
// update of that group, but F0 already seeded it in full in `seed/site.ts` with content that
// matches `public/llms.txt` verbatim (checked line by line) — `site-settings` is an F0 file
// this package must not touch, so nothing further is done here. See the build report.

import type { Payload } from 'payload';

import type { MassageRitual, Offer, Policy } from '@/payload-types';

type OfferSeed = Omit<Offer, 'id' | 'updatedAt' | 'createdAt' | 'adminLabel'>;
type RitualSeed = Omit<MassageRitual, 'id' | 'updatedAt' | 'createdAt'>;
type PolicySeed = Omit<Policy, 'id' | 'updatedAt' | 'createdAt'>;

const context = { disableRevalidate: true };

async function findIdBySlug(payload: Payload, collection: 'offers' | 'massage-rituals', slug: string | null | undefined): Promise<number | undefined> {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  return existing.docs[0]?.id;
}

async function upsertOffer(payload: Payload, data: OfferSeed): Promise<'created' | 'updated'> {
  const existingId = await findIdBySlug(payload, 'offers', data.slug);
  if (existingId) {
    await payload.update({ collection: 'offers', id: existingId, data, context, overrideAccess: true });
    return 'updated';
  }
  await payload.create({ collection: 'offers', data, context, overrideAccess: true });
  return 'created';
}

async function upsertRitual(payload: Payload, data: RitualSeed): Promise<'created' | 'updated'> {
  const existingId = await findIdBySlug(payload, 'massage-rituals', data.slug);
  if (existingId) {
    await payload.update({ collection: 'massage-rituals', id: existingId, data, context, overrideAccess: true });
    return 'updated';
  }
  await payload.create({ collection: 'massage-rituals', data, context, overrideAccess: true });
  return 'created';
}

/** Policies have no slug (§2.6) — `sortOrder` is the stable seed key instead. */
async function upsertPolicyByOrder(payload: Payload, data: PolicySeed): Promise<'created' | 'updated'> {
  const existing = await payload.find({
    collection: 'policies',
    where: { sortOrder: { equals: data.sortOrder } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });

  const existingDoc = existing.docs[0];
  if (existingDoc) {
    await payload.update({
      collection: 'policies',
      id: existingDoc.id,
      data,
      context,
      overrideAccess: true,
    });
    return 'updated';
  }

  await payload.create({
    collection: 'policies',
    data,
    context,
    overrideAccess: true,
  });
  return 'created';
}

const OFFERS: OfferSeed[] = [
  // Reformer (today's prices, 2026-10-21) ----------------------------------------------------
  {
    name: 'Drop-In',
    slug: 'reformer-drop-in',
    category: 'reformer',
    kind: 'drop-in',
    price: 160,
    description: 'Single reformer session. VAT excluded.',
    display: { fullName: 'Reformer Drop-In', compactDescription: 'Single reformer session' },
    visibility: { showOnHome: true, showOnPricing: true, showOnClasses: true, showOnServicePage: true, showOnAppointments: false, showOnLlms: true },
    structuredData: {
      mode: 'offer',
      name: 'Reformer Pilates — Drop-In',
      description: 'Small-group reformer class, limited to {fact:reformer-capacity} participants. {fact:reformer-duration} minutes.',
    },
    llmsLine: '- Drop-In: {price:reformer-drop-in}',
    active: true,
    sortOrder: 10,
  },
  {
    name: '10-Class Pack',
    slug: 'reformer-10-class-pack',
    category: 'reformer',
    kind: 'class-pack',
    price: 1550,
    validity: '2 months',
    complimentary: '2 complimentary Contrast Therapy sessions',
    visibility: { showOnHome: true, showOnPricing: true, showOnClasses: true, showOnServicePage: true, showOnAppointments: false, showOnLlms: true },
    llmsLine: '- 10-Class Pack: {price:reformer-10-class-pack} (valid 2 months, includes 2 complimentary Contrast Therapy sessions)',
    active: true,
    sortOrder: 20,
  },
  {
    name: '20-Class Pack',
    slug: 'reformer-20-class-pack',
    category: 'reformer',
    kind: 'class-pack',
    price: 3000,
    validity: '3 months',
    complimentary: '4 complimentary Contrast Therapy sessions',
    visibility: { showOnHome: true, showOnPricing: true, showOnClasses: true, showOnServicePage: true, showOnAppointments: false, showOnLlms: true },
    llmsLine: '- 20-Class Pack: {price:reformer-20-class-pack} (valid 3 months, includes 4 complimentary Contrast Therapy sessions)',
    active: true,
    sortOrder: 30,
  },
  {
    name: '50-Class Pack',
    slug: 'reformer-50-class-pack',
    category: 'reformer',
    kind: 'class-pack',
    price: 7100,
    validity: '6 months',
    complimentary: '8 complimentary Contrast Therapy sessions',
    visibility: { showOnHome: true, showOnPricing: true, showOnClasses: true, showOnServicePage: true, showOnAppointments: false, showOnLlms: true },
    llmsLine: '- 50-Class Pack: {price:reformer-50-class-pack} (valid 6 months, includes 8 complimentary Contrast Therapy sessions)',
    active: true,
    sortOrder: 40,
  },

  // Breathing Room ----------------------------------------------------------------------------
  {
    name: 'Drop-In',
    slug: 'breathing-drop-in',
    category: 'breathing-room',
    kind: 'drop-in',
    price: 120,
    description: 'Single session valid for any Breathing Room class (TAVÚ MAT, RELEASE and STRETCH).',
    note: 'Non-transferable & non-refundable',
    display: { compactDescription: 'Any class: TAVÚ MAT, RELEASE and STRETCH' },
    visibility: { showOnHome: true, showOnPricing: true, showOnClasses: true, showOnServicePage: true, showOnAppointments: false, showOnLlms: true },
    structuredData: {
      mode: 'offer',
      name: 'Breathing Room — Drop-In',
      description: 'One TAVÚ MAT, RELEASE or STRETCH class.',
    },
    llmsLine: '- Drop-In: {price:breathing-drop-in}',
    active: true,
    sortOrder: 10,
  },
  {
    name: '10-Class Pack',
    slug: 'breathing-10-class-pack',
    category: 'breathing-room',
    kind: 'class-pack',
    price: 1100,
    validity: '2 months',
    complimentary: '2 complimentary Contrast Therapy sessions',
    visibility: { showOnHome: true, showOnPricing: true, showOnClasses: true, showOnServicePage: true, showOnAppointments: false, showOnLlms: true },
    llmsLine: '- 10-Class Pack: {price:breathing-10-class-pack} (valid 2 months, includes 2 complimentary Contrast Therapy sessions)',
    active: true,
    sortOrder: 20,
  },
  {
    name: '20-Class Pack',
    slug: 'breathing-20-class-pack',
    category: 'breathing-room',
    kind: 'class-pack',
    price: 2100,
    validity: '3 months',
    complimentary: '4 complimentary Contrast Therapy sessions',
    visibility: { showOnHome: true, showOnPricing: true, showOnClasses: true, showOnServicePage: true, showOnAppointments: false, showOnLlms: true },
    llmsLine: '- 20-Class Pack: {price:breathing-20-class-pack} (valid 3 months, includes 4 complimentary Contrast Therapy sessions)',
    active: true,
    sortOrder: 30,
  },
  {
    name: '50-Class Pack',
    slug: 'breathing-50-class-pack',
    category: 'breathing-room',
    kind: 'class-pack',
    price: 5100,
    validity: '6 months',
    complimentary: '8 complimentary Contrast Therapy sessions',
    visibility: { showOnHome: true, showOnPricing: true, showOnClasses: true, showOnServicePage: true, showOnAppointments: false, showOnLlms: true },
    llmsLine: '- 50-Class Pack: {price:breathing-50-class-pack} (valid 6 months, includes 8 complimentary Contrast Therapy sessions)',
    active: true,
    sortOrder: 40,
  },
  {
    // Seeded INACTIVE — removed from the live site by commit 1d256b0, content recovered from
    // `git show 1d256b0^:src/components/landing/Packages.tsx` L48-54 (description/note),
    // `git show 1d256b0^:src/app/pricing/page.tsx` L20-29,172-216 (featureCard) and
    // `git show 1d256b0^:src/app/layout.tsx` L195-199 (structuredData). Flip `active` (and set
    // `availableFrom`) in January to bring it back — see the admin description below for what
    // the old Terms of Service said about it, which the owner re-adds by hand (§7 R17).
    name: 'Unlimited 3-Month Membership',
    slug: 'breathing-unlimited-3-month',
    category: 'breathing-room',
    kind: 'membership',
    price: 2400,
    validity: '3 consecutive months',
    description: 'Unlimited access to all Breathing Room classes. Paid upfront for a 3-month commitment (AED 800/month value).',
    note: 'Non-transferable · Non-refundable · No rollovers',
    featureCard: {
      enabled: true,
      subtitle: 'AED {price:breathing-unlimited-3-month} paid upfront · 3-month commitment · AED 800/month value',
      body: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: [
                {
                  type: 'text',
                  format: 0,
                  detail: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Enjoy unlimited access to all Breathing Room classes with a membership designed for consistency and long-term progress.',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: [
                {
                  type: 'text',
                  format: 0,
                  detail: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Your membership is based on AED 800 per month for a 3-month commitment, with a single upfront payment of AED 2,400 at the time of purchase. There are no monthly recurring payments during the membership period.',
                  version: 1,
                },
              ],
            },
          ],
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      includesHeading: 'Membership Includes',
      policyHeading: 'Booking Policy',
      policyText:
        'To ensure fair access for all members, 3 late cancellations within the same week will result in a 1-week booking suspension, during which new class bookings will not be permitted.',
      cta: { label: 'Book Your Mat', href: '/schedule', newTab: false },
    },
    includesHeading: 'Membership Includes',
    includes: [
      { text: 'Unlimited access to all Breathing Room classes' },
      { text: 'AED 800/month value' },
      { text: '3-month commitment' },
      { text: 'AED 2,400 paid upfront' },
      { text: 'Valid for 3 consecutive months' },
      { text: 'Non-transferable' },
      { text: 'Non-refundable' },
      { text: 'No rollovers' },
    ],
    visibility: { showOnHome: true, showOnPricing: true, showOnClasses: true, showOnServicePage: true, showOnAppointments: false, showOnLlms: true },
    structuredData: {
      mode: 'offer',
      name: 'Unlimited 3-Month Membership',
      description:
        'Unlimited access to all Breathing Room classes. AED 2,400 paid upfront for a 3-month commitment (AED 800/month value). Valid for 3 consecutive months, non-transferable, non-refundable, no rollovers.',
    },
    active: false,
    sortOrder: 50,
  },

  // Contrast Therapy ----------------------------------------------------------------------------
  {
    name: 'Individual Drop-In',
    slug: 'contrast-individual',
    category: 'contrast',
    kind: 'session',
    price: 275,
    durationShort: '60 min',
    durationLong: '60 Minutes',
    description:
      'A private Contrast Therapy session for one, combining sauna heat and a 5–8°C cold plunge to support recovery, circulation, and overall wellbeing.',
    note: 'Add-on: Compression Flush (20 min) — {price:compression-flush} AED',
    visibility: { showOnHome: false, showOnPricing: true, showOnClasses: false, showOnServicePage: true, showOnAppointments: false, showOnLlms: true },
    structuredData: {
      mode: 'offer',
      name: 'Contrast Therapy — Individual Drop-In',
      description: 'A 60-minute private Contrast Therapy session for one, combining sauna heat and a 5–8°C cold plunge.',
    },
    llmsLine: '- Individual Drop-In: {price:contrast-individual} (60 minutes, private session for one guest)',
    active: true,
    sortOrder: 10,
  },
  {
    name: 'Couple',
    slug: 'contrast-couple',
    category: 'contrast',
    kind: 'session',
    price: 456,
    durationShort: '60 min',
    durationLong: '60 Minutes',
    description:
      'A 60-minute Contrast Therapy session for two, with the choice of a private or shared experience. Move together between sauna heat and cold immersion for a restorative recovery experience.',
    visibility: { showOnHome: false, showOnPricing: true, showOnClasses: false, showOnServicePage: true, showOnAppointments: false, showOnLlms: true },
    structuredData: {
      mode: 'offer',
      name: 'Contrast Therapy — Couple',
      description: 'A 60-minute Contrast Therapy session for two, private or shared.',
    },
    llmsLine: '- Couple: {price:contrast-couple} (60 minutes, two guests, private or shared)',
    active: true,
    sortOrder: 20,
  },
  {
    name: 'Trio',
    slug: 'contrast-trio',
    category: 'contrast',
    kind: 'session',
    price: 600,
    durationShort: '60 min',
    durationLong: '60 Minutes',
    description:
      'A 60-minute Contrast Therapy session for three, with the choice of a private or shared experience. Enjoy the heat-and-cold recovery ritual together, designed for a longer shared reset.',
    visibility: { showOnHome: false, showOnPricing: true, showOnClasses: false, showOnServicePage: true, showOnAppointments: false, showOnLlms: true },
    structuredData: {
      mode: 'offer',
      name: 'Contrast Therapy — Trio',
      description: 'A 60-minute Contrast Therapy session for three, private or shared.',
    },
    llmsLine: '- Trio: {price:contrast-trio} (60 minutes, three guests, private or shared)',
    active: true,
    sortOrder: 30,
  },
  {
    name: 'Group',
    slug: 'contrast-group',
    category: 'contrast',
    kind: 'session',
    price: 1050,
    durationShort: '60 min · Up to 6 guests',
    durationLong: '60 Minutes',
    capacityLabel: 'Up to 6 Guests',
    description:
      'A 60-minute Contrast Therapy experience for groups of up to six, with the choice of a private or shared experience. A shared recovery ritual combining sauna heat and cold immersion.',
    display: { pricingDuration: '60 min · Up to 6 guests' },
    visibility: { showOnHome: false, showOnPricing: true, showOnClasses: false, showOnServicePage: true, showOnAppointments: false, showOnLlms: true },
    structuredData: {
      mode: 'offer',
      name: 'Contrast Therapy — Group (up to 6 guests)',
      description: 'A 60-minute Contrast Therapy experience for groups of up to six, private or shared.',
    },
    llmsLine: '- Group: {price:contrast-group} (60 minutes, up to 6 guests, private or shared)',
    active: true,
    sortOrder: 40,
  },

  // Add-on (referenced by token; no card of its own — renders inside the Contrast llms section) -
  {
    name: 'Compression Flush',
    slug: 'compression-flush',
    category: 'add-on',
    kind: 'add-on',
    price: 50,
    durationShort: '20 min',
    visibility: { showOnHome: false, showOnPricing: false, showOnClasses: false, showOnServicePage: false, showOnAppointments: false, showOnLlms: true },
    llmsLine: '- Add-on Compression Flush (20 min): {price:compression-flush}',
    active: true,
    sortOrder: 10,
  },

  // Compression Therapy -------------------------------------------------------------------------
  {
    name: 'Individual Session',
    slug: 'compression-individual',
    category: 'compression',
    kind: 'session',
    price: 160,
    durationShort: '45 min',
    description:
      'A 45-minute Compression Therapy session designed to support circulation, reduce muscle fatigue, and promote recovery through targeted compression.',
    note: 'Validity: 7 days',
    display: { fullName: 'NormaTec Compression Therapy | Individual Session', cardSubtitle: '45 Minutes · Valid 7 Days' },
    benefits: [
      { text: 'Boosts circulation' },
      { text: 'Flushes out lactic acid' },
      { text: 'Reduces swelling' },
      { text: 'Speeds up recovery' },
    ],
    recommendedFor: [
      { text: 'After intense training' },
      { text: 'Heavy or tight legs' },
      { text: 'Injury recovery' },
      { text: 'Swelling or fluid retention' },
    ],
    visibility: { showOnHome: false, showOnPricing: true, showOnClasses: false, showOnServicePage: true, showOnAppointments: false, showOnLlms: true },
    structuredData: {
      mode: 'offer',
      name: 'NormaTec Compression Therapy — Individual Session',
      description:
        'A 45-minute Compression Therapy session designed to support circulation, reduce muscle fatigue, and promote recovery through targeted compression. Valid for 7 days.',
    },
    llmsLine: '- NormaTec Compression Therapy | Individual Session: {price:compression-individual} (45 minutes, validity 7 days)',
    active: true,
    sortOrder: 10,
  },
  {
    name: 'Recovery Pack — 5 + 1',
    slug: 'compression-recovery-pack',
    category: 'compression',
    kind: 'package',
    price: 660,
    durationShort: '6 × 45 min',
    description:
      'A recovery pack for consistent care, including five Compression Therapy sessions plus one complimentary session.',
    bonus: 'Total: 6 Sessions · Validity: 45 days',
    note: 'Non-transferable · Non-refundable',
    display: { fullName: 'NormaTec Compression Therapy | Recovery Pack — 5 + 1', cardSubtitle: 'Compression Therapy' },
    includesHeading: 'Package Includes',
    includes: [
      { text: '5 × 45-minute NormaTec Compression Therapy Sessions' },
      { text: '1 Complimentary 45-minute Compression Therapy Session' },
      { text: 'Total: 6 Sessions' },
      { text: 'Valid for 45 days' },
    ],
    notesHeading: 'Please Note',
    notes: [{ text: 'Non-transferable' }, { text: 'Non-refundable' }],
    visibility: { showOnHome: false, showOnPricing: true, showOnClasses: false, showOnServicePage: true, showOnAppointments: true, showOnLlms: true },
    structuredData: {
      mode: 'offer',
      name: 'NormaTec Compression Therapy — Recovery Pack (5+1)',
      description:
        'A recovery pack for consistent care, including five 45-minute Compression Therapy sessions plus one complimentary session. Six sessions total, valid for 45 days. Non-transferable and non-refundable.',
    },
    llmsLine:
      '- NormaTec Compression Therapy | Recovery Pack (5+1): {price:compression-recovery-pack} — five 45-minute Compression Therapy sessions plus one complimentary session, 6 sessions total, valid for 45 days, non-transferable, non-refundable',
    active: true,
    sortOrder: 20,
  },

  // Recovery Bundles (ladies only) ----------------------------------------------------------------
  {
    name: 'TA Reset',
    slug: 'bundle-ta-reset',
    category: 'bundle',
    kind: 'bundle',
    price: 480,
    description: 'Contrast + RESET Head, Neck & Shoulders',
    visibility: { showOnHome: false, showOnPricing: true, showOnClasses: false, showOnServicePage: false, showOnAppointments: false, showOnLlms: true },
    llmsLine: '- TA Reset: {price:bundle-ta-reset} (Contrast + RESET Head, Neck & Shoulders)',
    active: true,
    sortOrder: 10,
  },
  {
    name: 'TA Deep Calm',
    slug: 'bundle-ta-deep-calm',
    category: 'bundle',
    kind: 'bundle',
    price: 520,
    description: 'Contrast + FLOW Relaxation Massage',
    visibility: { showOnHome: false, showOnPricing: true, showOnClasses: false, showOnServicePage: false, showOnAppointments: false, showOnLlms: true },
    llmsLine: '- TA Deep Calm: {price:bundle-ta-deep-calm} (Contrast + FLOW Relaxation Massage)',
    active: true,
    sortOrder: 20,
  },
  {
    name: 'VU Athlete',
    slug: 'bundle-vu-athlete',
    category: 'bundle',
    kind: 'bundle',
    price: 560,
    description: 'Contrast + RELEASE Deep Tissue Massage',
    visibility: { showOnHome: false, showOnPricing: true, showOnClasses: false, showOnServicePage: false, showOnAppointments: false, showOnLlms: true },
    llmsLine: '- VU Athlete: {price:bundle-vu-athlete} (Contrast + RELEASE Deep Tissue Massage)',
    active: true,
    sortOrder: 30,
  },
  {
    name: 'VU Mobility Flow',
    slug: 'bundle-vu-mobility-flow',
    category: 'bundle',
    kind: 'bundle',
    price: 580,
    description: 'Contrast + RECOVER Sports Massage',
    visibility: { showOnHome: false, showOnPricing: true, showOnClasses: false, showOnServicePage: false, showOnAppointments: false, showOnLlms: true },
    llmsLine: '- VU Mobility Flow: {price:bundle-vu-mobility-flow} (Contrast + RECOVER Sports Massage)',
    active: true,
    sortOrder: 40,
  },
  {
    name: 'VIP Flow',
    slug: 'bundle-vip-flow',
    category: 'bundle',
    kind: 'bundle',
    price: 660,
    description: 'Private Contrast + Any Massage',
    visibility: { showOnHome: false, showOnPricing: true, showOnClasses: false, showOnServicePage: false, showOnAppointments: false, showOnLlms: true },
    llmsLine: '- VIP Flow: {price:bundle-vip-flow} (Private Contrast + Any Massage)',
    active: true,
    sortOrder: 50,
  },
  {
    name: 'Express Recovery',
    slug: 'bundle-express-recovery',
    category: 'bundle',
    kind: 'bundle',
    price: 420,
    description: 'Contrast + 30-min Targeted Recovery Add-On',
    visibility: { showOnHome: false, showOnPricing: true, showOnClasses: false, showOnServicePage: false, showOnAppointments: false, showOnLlms: true },
    llmsLine: '- Express Recovery: {price:bundle-express-recovery} (Contrast + 30-min Targeted Recovery Add-On)',
    active: true,
    sortOrder: 60,
  },

  // Memberships -------------------------------------------------------------------------------
  {
    name: 'Reset Membership',
    slug: 'membership-reset',
    category: 'membership',
    kind: 'membership',
    price: 820,
    validity: '30 days',
    description: 'Four Contrast Therapy sessions to use throughout the month whenever you need a reset.',
    includes: [
      { text: '4 × Contrast Therapy sessions' },
      { text: 'Choice of Main or Private Contrast' },
      { text: '1 × 30 minute Compression Therapy session' },
      { text: '1 × complimentary 15-minute Head, Neck & Shoulder Chair Massage (subject to therapist availability)' },
      { text: '10% off one Massage service' },
      { text: 'Bring one friend for AED 95 once during the membership' },
    ],
    visibility: { showOnHome: false, showOnPricing: true, showOnClasses: false, showOnServicePage: true, showOnAppointments: false, showOnLlms: true },
    llmsLine:
      '- Reset Membership: {price:membership-reset} (valid 30 days) — 4 × Contrast Therapy sessions, choice of Main or Private Contrast, 1 × 30-minute Compression Therapy session, 1 × complimentary 15-minute Head, Neck & Shoulder Chair Massage (subject to therapist availability), 10% off one Massage service, bring one friend for AED 95 once during the membership',
    active: true,
    sortOrder: 10,
  },
  {
    name: 'Ritual Unlimited Membership',
    slug: 'membership-ritual-unlimited',
    category: 'membership',
    kind: 'membership',
    price: 1390,
    validity: '45 days',
    description:
      'Our most complete recovery membership, designed for those who want to make Contrast Therapy a consistent part of their routine.',
    includes: [
      { text: '2 × 30 minute Compression Therapy sessions' },
      { text: 'Choice of Main or Private Contrast' },
      { text: '10% off Massage services' },
      { text: '2 complimentary Head, Neck + Shoulder Chair Massage (30 minutes)' },
      { text: 'Bring one friend for AED 95 once during the membership' },
    ],
    highlight: { enabled: true, label: 'Most Complete' },
    visibility: { showOnHome: false, showOnPricing: true, showOnClasses: false, showOnServicePage: true, showOnAppointments: false, showOnLlms: true },
    llmsLine:
      '- Ritual Unlimited Membership: {price:membership-ritual-unlimited} (valid 45 days) — 2 × 30-minute Compression Therapy sessions, choice of Main or Private Contrast, 10% off Massage services, 2 complimentary Head, Neck + Shoulder Chair Massages (30 minutes), bring one friend for AED 95 once during the membership',
    active: true,
    sortOrder: 20,
  },
];

const RITUALS: RitualSeed[] = [
  {
    name: 'FLOW | Relaxation Massage',
    slug: 'flow-relaxation',
    group: 'full-body',
    description: 'A slow, full-body ritual designed to soften muscular tension, calm the nervous system and return the body to balance.',
    shortDescription: 'Slow full-body ritual to soften tension, calm the nervous system and restore balance.',
    durationShort: '60 min',
    durationLong: '60 Minutes',
    price: 350,
    price90: 500,
    duration90Long: '90 Minutes',
    packPrice: 1890,
    packFormula: '5 + 1',
    packSessions: 6,
    packValidity: '45 days',
    benefits: [{ text: 'Softens muscular tension' }, { text: 'Calms the nervous system' }, { text: 'Returns the body to balance' }],
    llmsLine: '- FLOW | Relaxation Massage: {price:flow-relaxation} (60 min) / {price:flow-relaxation.ninety} (90 min); Ritual Pack {price:flow-relaxation.pack}',
    active: true,
    sortOrder: 10,
  },
  {
    name: 'RELEASE | Deep Tissue Massage',
    slug: 'release-deep-tissue',
    group: 'full-body',
    description: 'A focused, full-body treatment using deeper pressure to release muscular tightness, improve mobility and support recovery.',
    shortDescription: 'Deeper pressure to release muscular tightness, improve mobility and support recovery.',
    durationShort: '60 min',
    durationLong: '60 Minutes',
    price: 350,
    price90: 500,
    duration90Long: '90 Minutes',
    packPrice: 1890,
    packFormula: '5 + 1',
    packSessions: 6,
    packValidity: '45 days',
    benefits: [{ text: 'Releases muscular tightness' }, { text: 'Improves mobility' }, { text: 'Supports recovery' }],
    llmsLine:
      '- RELEASE | Deep Tissue Massage: {price:release-deep-tissue} (60 min) / {price:release-deep-tissue.ninety} (90 min); Ritual Pack {price:release-deep-tissue.pack}',
    active: true,
    sortOrder: 20,
  },
  {
    name: 'RECOVER | Sports Massage',
    slug: 'recover-sports',
    group: 'full-body',
    description: 'A therapeutic full-body massage created for active bodies, targeting muscular fatigue, restricted movement and areas requiring deeper recovery.',
    shortDescription: 'Therapeutic full-body massage for active bodies, targeting fatigue and restricted movement.',
    durationShort: '60 min',
    durationLong: '60 Minutes',
    price: 350,
    price90: 500,
    duration90Long: '90 Minutes',
    packPrice: 1890,
    packFormula: '5 + 1',
    packSessions: 6,
    packValidity: '45 days',
    benefits: [{ text: 'Targets muscular fatigue' }, { text: 'Restores restricted movement' }, { text: 'Created for active bodies' }],
    llmsLine: '- RECOVER | Sports Massage: {price:recover-sports} (60 min) / {price:recover-sports.ninety} (90 min); Ritual Pack {price:recover-sports.pack}',
    active: true,
    sortOrder: 30,
  },
  {
    name: 'DRAIN | Lymphatic Massage',
    slug: 'drain-lymphatic',
    group: 'full-body',
    description: 'A specialized, gentle treatment designed to support lymphatic drainage, reduce fluid retention and leave the body feeling lighter.',
    shortDescription: 'Gentle treatment to support lymphatic drainage, reduce fluid retention and feel lighter.',
    durationShort: '60 min',
    durationLong: '60 Minutes',
    price: 450,
    price90: 500,
    duration90Long: '90 Minutes',
    packPrice: 2430,
    packFormula: '5 + 1',
    packSessions: 6,
    packValidity: '45 days',
    benefits: [{ text: 'Supports lymphatic drainage' }, { text: 'Reduces fluid retention' }, { text: 'Leaves the body feeling lighter' }],
    llmsLine: '- DRAIN | Lymphatic Massage: {price:drain-lymphatic} (60 min) / {price:drain-lymphatic.ninety} (90 min); Ritual Pack {price:drain-lymphatic.pack}',
    active: true,
    sortOrder: 40,
  },
  {
    name: 'RESET | Head, Neck & Shoulders',
    slug: 'reset-head-neck-shoulders',
    group: 'targeted',
    description: 'A focused massage to release tension through the scalp, neck, shoulders and upper back.',
    shortDescription: 'Releases tension through the scalp, neck, shoulders and upper back.',
    durationShort: '60 min',
    price: 300,
    addOnPrice: 150,
    packPrice: 1620,
    packFormula: '5 + 1',
    packSessions: 6,
    packValidity: '45 days',
    llmsLine: '- RESET | Head, Neck & Shoulders: {price:reset-head-neck-shoulders}; Ritual Pack {price:reset-head-neck-shoulders.pack}',
    active: true,
    sortOrder: 50,
  },
  {
    name: 'RECOVER | Deep Foot Recovery',
    slug: 'recover-deep-foot',
    group: 'targeted',
    description: 'An intensive treatment combining therapeutic massage, percussion therapy and targeted pressure-point techniques.',
    shortDescription: 'Therapeutic massage, percussion therapy and targeted pressure-point techniques.',
    durationShort: '60 min',
    price: 320,
    addOnPrice: 150,
    packPrice: 1728,
    packFormula: '5 + 1',
    packSessions: 6,
    packValidity: '45 days',
    llmsLine: '- RECOVER | Deep Foot Recovery: {price:recover-deep-foot}; Ritual Pack {price:recover-deep-foot.pack}',
    active: true,
    sortOrder: 60,
  },
  {
    name: 'RELEASE | Arm & Hand Recovery',
    slug: 'release-arm-hand',
    group: 'targeted',
    description: 'Designed to relieve tightness through the hands, wrists, forearms and arms. Ideal for desk-related tension, regular training and daily muscle fatigue.',
    shortDescription: 'Relieves tightness through the hands, wrists, forearms and arms.',
    durationShort: '60 min',
    price: 300,
    addOnPrice: 150,
    packPrice: 1620,
    packFormula: '5 + 1',
    packSessions: 6,
    packValidity: '45 days',
    llmsLine: '- RELEASE | Arm & Hand Recovery: {price:release-arm-hand}; Ritual Pack {price:release-arm-hand.pack}',
    active: true,
    sortOrder: 70,
  },
  {
    name: 'GROUND | Scalp Therapy',
    slug: 'ground-scalp',
    group: 'targeted',
    description: 'A calming scalp ritual that encourages deep relaxation and releases mental and physical tension.',
    shortDescription: 'Calming scalp ritual for deep relaxation and release of mental and physical tension.',
    durationShort: '60 min',
    price: 300,
    addOnPrice: 150,
    packPrice: 1620,
    packFormula: '5 + 1',
    packSessions: 6,
    packValidity: '45 days',
    llmsLine: '- GROUND | Scalp Therapy: {price:ground-scalp}; Ritual Pack {price:ground-scalp.pack}',
    active: true,
    sortOrder: 80,
  },
  {
    name: 'LIFT | Facial Recovery',
    slug: 'lift-facial',
    group: 'targeted',
    description: 'A sculpting facial massage that supports lymphatic drainage, releases facial tension and restores a natural glow.',
    shortDescription: 'Sculpting facial massage that supports lymphatic drainage and restores a natural glow.',
    durationShort: '60 min',
    price: 350,
    addOnPrice: 150,
    packPrice: 1890,
    packFormula: '5 + 1',
    packSessions: 6,
    packValidity: '45 days',
    llmsLine: '- LIFT | Facial Recovery: {price:lift-facial}; Ritual Pack {price:lift-facial.pack}',
    active: true,
    sortOrder: 90,
  },
  {
    name: 'ROOTED | Foot Soaking & Reflexology',
    slug: 'rooted-foot-reflexology',
    group: 'signature-foot',
    cardTitle: 'ROOTED | Foot Soaking and Reflexology',
    description: 'Choose your preferred signature salt blend and settle into a 20-minute therapeutic foot soak, followed by a 30-minute reflexology foot massage targeting pressure points, fatigue and tension.',
    shortDescription: '20-min therapeutic foot soak with your choice of salt blend, hot towel ritual, 30-min reflexology and herbal tea.',
    durationShort: '60 min',
    durationLong: '60 Minutes',
    price: 320,
    packPrice: 1728,
    packFormula: '5 + 1',
    packSessions: 6,
    packValidity: '45 days',
    includesHeading: 'The Ritual Includes',
    includes: [
      { text: '20-minute therapeutic foot soak' },
      { text: 'Choice of signature salt blend' },
      { text: 'Hot towel ritual' },
      { text: '30-minute foot reflexology massage' },
      { text: 'TAVÚ signature herbal tea' },
    ],
    saltBlendsHeading: 'Choose Your Salt Blend',
    saltBlends: [
      { name: 'RECOVER', description: 'Peppermint and eucalyptus for tired muscles and active bodies.' },
      { name: 'CALM', description: 'Lavender and chamomile for softness, relaxation and stillness.' },
      { name: 'REVIVE', description: 'Ginger and lemon for a warming and refreshing reset.' },
    ],
    saltBlendsFootnote: 'Each blend is created using our signature foundation of Epsom salt, Dead Sea salt and Himalayan pink salt.',
    bookLabel: 'Book ROOTED',
    llmsLine: '- ROOTED | Foot Soaking & Reflexology: {price:rooted-foot-reflexology} (60 min); Ritual Pack {price:rooted-foot-reflexology.pack}',
    active: true,
    sortOrder: 100,
  },
  {
    name: 'TAVÚ Recovery Escape',
    slug: 'recovery-escape',
    group: 'escape',
    cardTitle: 'Recovery Escape',
    description: 'Begin with exclusive access to the Main Contrast Suite, moving between warmth and cold at your own pace. Then surrender to a 60-minute full-body therapeutic massage tailored to what your body needs most.',
    shortDescription: 'Exclusive Main Contrast Suite access (sauna + ice bath) followed by a 60-min full-body therapeutic massage.',
    durationShort: '3 hours',
    durationLong: '3 Hours',
    price: 800,
    includesHeading: 'Your Recovery Escape Includes',
    includes: [
      { text: 'Exclusive access to the Main Contrast Suite' },
      { text: 'Traditional sauna with Himalayan salt' },
      { text: 'Ice bath experience' },
      { text: 'Private shower facilities' },
      { text: '60-minute full-body therapeutic massage' },
      { text: 'TAVÚ signature herbal tea' },
    ],
    note: 'Limited appointments available',
    bookLabel: 'Book Recovery Escape',
    llmsLine: '- TAVÚ Recovery Escape: {price:recovery-escape} (3 hours; Main Contrast Suite access + 60-min full-body massage; limited appointments)',
    active: true,
    sortOrder: 110,
  },
];

const POLICIES: PolicySeed[] = [
  { label: 'First time?', text: 'Create an account to book your classes', showOn: ['schedule'], active: true, sortOrder: 10 },
  { label: 'First time?', text: 'Create an account to book appointments', showOn: ['appointments'], active: true, sortOrder: 15 },
  { label: 'Cancellation:', text: '12 hours for classes, 6 hours for recovery', showOn: ['schedule'], active: true, sortOrder: 20 },
  { label: 'Cancellation:', text: '6 hours notice required for appointments', showOn: ['appointments'], active: true, sortOrder: 25 },
  { label: 'Arrival:', text: 'Please arrive 10 minutes before your session', showOn: ['schedule', 'appointments'], active: true, sortOrder: 30 },
  { label: 'What to bring:', text: 'Comfortable workout attire and water', showOn: ['schedule'], active: true, sortOrder: 40 },
  { label: 'Need help?', text: 'Contact us via WhatsApp or email', showOn: ['appointments'], active: true, sortOrder: 45 },
  {
    label: 'Class minimum:',
    text: 'A minimum of 4 participants is required for each class to proceed. Classes that do not meet the minimum attendance requirement may be cancelled.',
    showOn: ['schedule', 'classes'],
    active: true,
    sortOrder: 50,
  },
  {
    label: 'Late arrival:',
    text: 'Arriving 10 minutes or more after the start time means entry to the class will not be permitted.',
    showOn: ['schedule', 'classes'],
    active: true,
    sortOrder: 60,
  },
];

/**
 * Several offers' own token-bearing fields reference their own slug (e.g. `compression-flush`'s
 * `llmsLine`) or a slug created later in `OFFERS` (e.g. `contrast-individual`'s `note` points at
 * `compression-flush`). `validateTokensCollection` (F0) checks tokens against whatever rows
 * already exist in the collection at save time, so a self- or forward-reference always fails on
 * the very first `create`. Pass 1 upserts every row's non-token fields only, so every slug exists;
 * pass 2 writes the full content (tokens now resolve, since every slug is already in the DB).
 */
async function seedOffers(payload: Payload): Promise<{ created: number; updated: number }> {
  let created = 0;
  let updated = 0;
  for (const offer of OFFERS) {
    const bare: OfferSeed = { ...offer, description: undefined, bonus: undefined, note: undefined, llmsLine: undefined, structuredData: undefined, featureCard: undefined };
    const result = await upsertOffer(payload, bare);
    if (result === 'created') created += 1;
    else updated += 1;
  }
  for (const offer of OFFERS) {
    await upsertOffer(payload, offer);
  }
  return { created, updated };
}

/** Every ritual's `llmsLine` references its own slug (and `.ninety`/`.pack`/`.addOn` variants) — same two-pass reason as `seedOffers`. */
async function seedRituals(payload: Payload): Promise<{ created: number; updated: number }> {
  let created = 0;
  let updated = 0;
  for (const ritual of RITUALS) {
    const bare: RitualSeed = { ...ritual, llmsLine: undefined };
    const result = await upsertRitual(payload, bare);
    if (result === 'created') created += 1;
    else updated += 1;
  }
  for (const ritual of RITUALS) {
    await upsertRitual(payload, ritual);
  }
  return { created, updated };
}

async function seedPolicies(payload: Payload): Promise<{ created: number; updated: number }> {
  let created = 0;
  let updated = 0;
  for (const policy of POLICIES) {
    const result = await upsertPolicyByOrder(payload, policy);
    if (result === 'created') created += 1;
    else updated += 1;
  }
  return { created, updated };
}

async function seedPageGlobals(payload: Payload): Promise<void> {
  await payload.updateGlobal({
    slug: 'pricing-page',
    context,
    overrideAccess: true,
    data: {
      header: { title: 'Choose Your Rhythm', showVatNote: true },
      cards: { compressionBenefitsHeading: 'Benefits:', compressionRecommendedHeading: 'Recommended for:' },
      memberships: { enabled: true, heading: 'Memberships' },
      cta: {
        enabled: true,
        heading: 'Start Your TAVU Experience',
        text: 'Inquire via DM to reserve your access.',
        buttons: [
          { link: { label: 'View Schedule & Book', href: '/schedule', newTab: false }, style: 'primary' },
          { link: { label: 'Get in Touch', href: '/contact', newTab: false }, style: 'outline' },
        ],
      },
      seo: {
        title: 'Pricing | Reformer, Contrast Therapy, Massage & Memberships',
        description:
          'TAVÚ pricing — Reformer Pilates from {price:reformer-drop-in} AED, Contrast Therapy from {price:contrast-individual} AED (couple {price:contrast-couple} AED, trio {price:contrast-trio} AED, groups up to six {price:contrast-group} AED), NormaTec Compression Therapy {price:compression-individual} AED, Ladies-only Massage from {from:massage} AED, and memberships from {price:membership-reset} AED. All prices exclude VAT.',
        keywords: [
          'Reformer Pilates price Abu Dhabi',
          'Contrast Therapy price Abu Dhabi',
          'NormaTec Abu Dhabi',
          'TAVÚ memberships Abu Dhabi',
          'Ice bath Abu Dhabi price',
          'Massage Abu Dhabi ladies',
        ],
        ogTitle: 'TAVÚ Pricing — Reformer, Contrast Therapy, Massage & Memberships',
        ogDescription:
          'Transparent pricing. Reformer from {price:reformer-drop-in} AED, Contrast Therapy from {price:contrast-individual} AED, Memberships from {price:membership-reset} AED.',
      },
    },
  });

  await payload.updateGlobal({
    slug: 'memberships-page',
    context,
    overrideAccess: true,
    data: {
      hero: { image: { alt: 'TAVÚ Memberships' }, title: 'Memberships', intro: 'Join our community and unlock exclusive benefits for your wellness journey' },
      tiers: { eyebrow: 'Tiers', heading: 'Membership Options', showVatNote: true },
      cta: {
        enabled: true,
        heading: 'Start Your Membership',
        text: 'Join the TAVU community and unlock your full wellness potential.',
        buttons: [
          { link: { label: 'Inquire Now', href: '/contact', newTab: false }, style: 'primary' },
          { link: { label: 'View All Pricing', href: '/pricing', newTab: false }, style: 'outline' },
        ],
      },
      seo: {
        title: 'Memberships | Reset & Ritual Unlimited',
        description:
          'TAVÚ memberships: Reset {price:membership-reset} AED/30 days (4 Contrast, Compression Therapy, massage); Ritual Unlimited {price:membership-ritual-unlimited}/45 days (Contrast, 2 Compression Therapy, massages).',
        keywords: ['Reset membership Abu Dhabi', 'Ritual Unlimited membership', 'Contrast Therapy membership Al Raha', 'Wellness membership Abu Dhabi'],
        ogTitle: 'TAVÚ Memberships | Reset & Ritual Unlimited',
        ogDescription:
          'Reset {price:membership-reset} AED and Ritual Unlimited {price:membership-ritual-unlimited} AED — Contrast Therapy, Compression Therapy and massage benefits.',
      },
    },
  });

  await payload.updateGlobal({
    slug: 'recovery-page',
    context,
    overrideAccess: true,
    data: {
      title: 'Recovery',
      intro: 'Restore, recover, and rejuvenate with our range of recovery services.',
      cards: [
        {
          title: 'Contrast Therapy',
          description: 'Sauna + Ice Bath sessions. Shared and private suites available.',
          href: '/services/contrast-therapy',
          priceText: 'From {from:contrast} AED →',
        },
        {
          title: 'Compression Therapy',
          description: 'NormaTec pulsing compression for faster muscle recovery.',
          href: '/services/compression-therapy',
          priceText: 'From {from:compression} AED →',
        },
        {
          title: 'Massage',
          description: 'Ladies only. FLOW, RELEASE, RECOVER, DRAIN full-body rituals, targeted recovery rituals and more.',
          href: '/services/massage',
          priceText: 'From {from:massage} AED →',
        },
      ],
      cta: { label: 'View All Pricing', href: '/pricing', newTab: false },
      seo: {
        title: 'Recovery — Contrast Therapy, Compression Therapy & Massage',
        description:
          'Recovery at TAVÚ in Al Raha, Abu Dhabi: Contrast Therapy (infrared sauna + ice bath) from {from:contrast} AED, NormaTec Compression Therapy from {from:compression} AED, and ladies-only massage from {from:massage} AED.',
        keywords: ['recovery studio Abu Dhabi', 'ice bath Abu Dhabi', 'infrared sauna Abu Dhabi', 'NormaTec compression Abu Dhabi', 'sports recovery Al Raha'],
        ogTitle: 'Recovery at TAVÚ',
        ogDescription: 'Restore, recover and rejuvenate — Contrast Therapy, Compression Therapy and Massage.',
      },
    },
  });

  await payload.updateGlobal({
    slug: 'massage-page',
    context,
    overrideAccess: true,
    data: {
      hero: {
        image: { alt: 'TAVÚ spa facilities' },
        imagePosition: 'center',
        eyebrow: 'Recovery',
        title: 'Massage',
        intro: 'Therapeutic and relaxation massage by certified therapists. Find the perfect treatment for your body and mind.',
      },
      overview: {
        heading: 'Healing Touch',
        paragraphs: [
          {
            text: "Our massage therapy services combine ancient healing traditions with modern therapeutic techniques. Each session is tailored to your specific needs, whether you're seeking relaxation, pain relief, or athletic recovery.",
          },
          {
            text: 'All treatments are performed by certified massage therapists in private, serene treatment rooms designed to promote complete relaxation and healing.',
          },
        ],
        badge: 'Ladies Only',
        cta: { label: 'Book a Massage', href: '/appointments', newTab: false },
        card: {
          image: { alt: 'Massage Room' },
          eyebrow: 'TAVÚ',
          titleLine1: 'Massage Services',
          titleLine2: 'Ladies only',
          bullets: [
            { text: 'FLOW, RELEASE, RECOVER & DRAIN full-body rituals' },
            { text: 'RESET, GROUND, LIFT & ROOTED targeted rituals' },
            { text: 'Ritual Packs | 5 + 1 Included · Valid 45 days' },
          ],
        },
      },
      fullBody: {
        heading: 'TAVÚ Full-Body Massage Rituals',
        intro: 'Sixty or ninety minutes of focused, full-body therapeutic work. Every ritual is available as a Ritual Pack with a sixth session included.',
        bookLabel: 'Book →',
        bookHref: '/appointments',
      },
      targeted: {
        heading: 'TAVÚ Targeted Recovery Rituals',
        intro: 'Thirty-minute treatments are offered individually as add-ons. Packages are available exclusively for 60-minute rituals.',
        addOnLabel: '30-Minute Add-On',
        ritualLabel: '60-Minute Ritual',
        packLabel: 'Ritual Pack | 5 + 1',
      },
      rooted: {
        heading: 'TAVÚ Exclusive Foot Ritual',
        intro: 'ROOTED | Foot Soaking and Reflexology — a grounding ritual beginning with warmth and ending in deep release.',
        packHeading: 'Ritual Pack',
      },
      escape: {
        heading: 'TAVÚ Recovery Escape',
        intro: 'Three hours. Entirely yours.',
        durationPrefix: 'Duration:',
      },
      summary: {
        heading: 'Package Pricing Summary',
        columnLabels: { ritual: 'Ritual Price', value: 'Six-Session Value', pack: 'Package Price', saving: 'Saving' },
        footnote: 'Every Ritual Pack includes a sixth session at no charge.',
        showVatNote: true,
      },
      cta: {
        enabled: true,
        heading: 'Treat Yourself',
        text: 'Book your massage session and experience complete relaxation.',
        buttons: [{ link: { label: 'Book a Massage', href: '/appointments', newTab: false }, style: 'primary' }],
      },
      seo: {
        title: 'Massage in Abu Dhabi | Ladies-Only at TAVÚ',
        description:
          'Ladies-only massage at TAVÚ in Al Raha, Abu Dhabi. FLOW, RELEASE, RECOVER and DRAIN full-body rituals — 60 minutes from {price:flow-relaxation} AED or 90 minutes {price:flow-relaxation.ninety} AED. Targeted recovery rituals from {from:massage} AED, ROOTED foot reflexology {price:rooted-foot-reflexology} AED and the 3-hour Recovery Escape {price:recovery-escape} AED. Ritual Packs 5 + 1 included.',
        keywords: [
          'Massage Abu Dhabi',
          'Ladies massage Al Raha',
          'Deep tissue massage Abu Dhabi',
          'Foot massage Abu Dhabi',
          'Sports massage Abu Dhabi',
          'Lymphatic drainage massage Abu Dhabi',
          'Reflexology Abu Dhabi',
        ],
        ogTitle: 'Massage at TAVÚ | Ladies-Only',
        ogDescription: 'FLOW, RELEASE, RECOVER and DRAIN full-body rituals — 60 or 90 minutes, from {from:massage} AED.',
      },
    },
  });
}

export async function seedPricing(payload: Payload): Promise<void> {
  const offers = await seedOffers(payload);
  const rituals = await seedRituals(payload);
  const policies = await seedPolicies(payload);
  await seedPageGlobals(payload);

  payload.logger.info(
    `seedPricing: offers ${offers.created} created / ${offers.updated} updated, ` +
      `massage-rituals ${rituals.created} created / ${rituals.updated} updated, ` +
      `policies ${policies.created} created / ${policies.updated} updated, ` +
      `4 page globals upserted (pricing-page, memberships-page, recovery-page, massage-page)`,
  );
}
