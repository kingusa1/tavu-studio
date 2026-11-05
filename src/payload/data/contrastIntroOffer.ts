/**
 * TAVÚ Contrast Intro Offer (studio request, 2026-11). Shared by the seed (`seed/pricing.ts`) and
 * the data migration `20261105_120000_contrast_intro_offer` so a fresh database and the live one
 * end up with the same row.
 *
 * "First-time clients only, one purchase per client" is enforced in Mindbody (an Intro Offer
 * pricing option for new clients) — this row only displays the offer on the website.
 */
export const contrastIntroOffer = {
  name: 'Contrast Intro Offer',
  slug: 'contrast-intro-offer',
  category: 'contrast' as const,
  kind: 'package' as const,
  price: 275,
  durationShort: '2 sessions',
  durationLong: '2 Sessions',
  validity: '30 days',
  description:
    'An exclusive introductory offer for first-time TAVÚ Contrast Therapy clients. Valid 30 days.',
  note: 'New Contrast Therapy clients only · one-time offer',
  notesHeading: 'Terms & Conditions',
  notes: [
    { text: 'Available to new Contrast Therapy clients only.' },
    { text: 'One-time introductory offer.' },
    { text: 'Non-refundable and non-transferable.' },
    { text: "Cancellations require at least 6 hours' notice." },
    { text: 'Late cancellations and no-shows will result in the deduction of one session.' },
    { text: 'No extensions or freezing.' },
  ],
  visibility: { showOnHome: false, showOnPricing: true, showOnClasses: false, showOnServicePage: true, showOnAppointments: false, showOnLlms: true },
  structuredData: {
    mode: 'offer' as const,
    name: 'Contrast Therapy — Intro Offer (2 sessions)',
    description: 'Introductory offer for first-time Contrast Therapy clients: 2 sessions for AED 275, valid 30 days. One purchase per client.',
  },
  llmsLine: '- Intro Offer (new clients only, one-time): {price:contrast-intro-offer} for 2 sessions, valid 30 days',
  active: true,
  sortOrder: 5,
};
