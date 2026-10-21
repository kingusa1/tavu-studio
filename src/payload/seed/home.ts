// Real seed for home-page, about-page, method-page and the 3 placeholder testimonials (§6
// Package A). Every string is transcribed verbatim from the pre-CMS source (landing/Hero.tsx,
// Packages.tsx, ServicesExplorer.tsx, About.tsx, Method.tsx, SocialFeed.tsx, Contact.tsx,
// app/page.tsx, about/page.tsx, about/layout.tsx, method/page.tsx, method/layout.tsx,
// landing/Testimonials.tsx) at commit 1d256b0, whitespace collapsed per the seed text rule (§6).

import type { Payload } from 'payload';

import { mediaId } from './media';

const context = { disableRevalidate: true };

/** home-page.about.body — the two paragraphs with 3 bold spans (Reform/Breath/Contrast), §3.5. */
const aboutBodyRichText = {
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [
      {
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        children: [
          {
            type: 'text',
            text:
              'TAVÚ is more than a studio—it is a sanctuary. A place where movement meets stillness, and where the noise of the outside world fades into a rhythm of your own making.',
            format: 0,
            detail: 0,
            mode: 'normal',
            style: '',
            version: 1,
          },
        ],
      },
      {
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        children: [
          {
            type: 'text',
            text: 'We believe that true power comes not just from exertion, but from recovery. Our method intertwines the strength of ',
            format: 0,
            detail: 0,
            mode: 'normal',
            style: '',
            version: 1,
          },
          { type: 'text', text: 'Reform', format: 1, detail: 0, mode: 'normal', style: '', version: 1 },
          { type: 'text', text: ', the clarity of ', format: 0, detail: 0, mode: 'normal', style: '', version: 1 },
          { type: 'text', text: 'Breath', format: 1, detail: 0, mode: 'normal', style: '', version: 1 },
          { type: 'text', text: ', and the healing of ', format: 0, detail: 0, mode: 'normal', style: '', version: 1 },
          { type: 'text', text: 'Contrast', format: 1, detail: 0, mode: 'normal', style: '', version: 1 },
          {
            type: 'text',
            text: ' to build a resilient body and a calm mind.',
            format: 0,
            detail: 0,
            mode: 'normal',
            style: '',
            version: 1,
          },
        ],
      },
    ],
  },
};

/**
 * 16 fallback Instagram images shown whenever the live feed is not connected. No like/comment
 * counts (fix/social-feed hotfix 2026-10-21, main tree src/components/landing/SocialFeed.tsx —
 * Behold sends none and the original counts were invented, so the field was dropped entirely).
 */
const socialFallbackImages = [
  { filename: 'hero-reformer-studio.webp', alt: 'TAVÚ Reformer Pilates studio' },
  { filename: 'service-reformer-mirror.webp', alt: 'Reformer studio with backlit mirror' },
  { filename: 'service-sauna.webp', alt: 'Himalayan salt sauna at TAVÚ' },
  { filename: 'service-ice-baths.webp', alt: 'Contrast Therapy ice baths' },
  { filename: 'service-breathing-props.webp', alt: 'Breathing Room props' },
  { filename: 'gallery-breathing-room.webp', alt: 'The TAVÚ Breathing Room' },
  { filename: 'service-massage-towels.webp', alt: 'TAVÚ branded towels' },
  { filename: 'about-reception.webp', alt: 'TAVÚ reception desk' },
  { filename: 'about-lounge.webp', alt: 'TAVÚ lounge space' },
  { filename: 'about-exterior.webp', alt: 'TAVÚ studio exterior' },
  { filename: 'gallery-sauna-infrared.webp', alt: 'Infrared sauna at TAVÚ' },
  { filename: 'about-entrance.webp', alt: 'TAVÚ entrance' },
  { filename: 'gallery-sauna-salt.webp', alt: 'Himalayan salt sauna ritual at TAVÚ' },
  { filename: 'amenity-coffee.webp', alt: 'By the Beach meets TAVÚ coffee' },
  { filename: 'reformer-room-new.webp', alt: 'Reformer class at TAVÚ' },
  { filename: 'service-recovery-equipment.webp', alt: 'Recovery equipment' },
];

async function seedHomePage(payload: Payload): Promise<void> {
  await payload.updateGlobal({
    slug: 'home-page',
    context,
    overrideAccess: true,
    data: {
      hero: {
        slides: [
          {
            image: { media: mediaId('hero-reformer-studio.webp') },
            title: 'Movement',
            subtitle: 'Reformer Pilates',
            description: 'Strengthen your body with precision and grace',
            accent: 'blue',
          },
          {
            image: { media: mediaId('hero-ice-baths.webp') },
            title: 'Recovery',
            subtitle: 'Contrast Therapy',
            description: 'Sauna and ice bath to reset and restore',
            accent: 'cyan',
          },
          {
            image: { media: mediaId('hero-entrance-sign.webp') },
            title: 'Sanctuary',
            subtitle: 'By the Beach',
            description: 'Your private wellness escape in Al Raha',
            accent: 'amber',
          },
        ],
        badge: "Abu Dhabi's First Private Space for Reformer Pilates & Contrast Therapy",
        headlineLead: 'Wellness',
        subLine1: 'Where movement is practiced',
        subLine2: 'and recovery is part of the method',
        subLineItalic: 'Reformer, mat, release, and stretch',
        subLineSupport: 'Supported by contrast and compression',
        taLabel: 'TA',
        taText: '— stillness',
        vuLabel: 'VÚ',
        vuText: '— flow',
        primaryCta: { label: 'Book a Class', href: '/schedule' },
        secondaryCta: { label: 'Check Our Packages', href: '#packages' },
      },
      packages: {
        enabled: true,
        eyebrow: 'Pricing',
        heading: 'Choose Your Practice',
        intro: 'More services coming soon.',
        showVatNote: true,
      },
      servicesExplorer: {
        enabled: true,
        eyebrow: 'What We Offer',
        heading: 'Our Services',
        intro: 'Select a service to learn more about what we provide.',
        ctaLabel: 'Learn More',
        items: [
          {
            name: 'Reformer Pilates',
            tagline: 'Precision. Strength. Control.',
            description:
              'Small-group reformer classes designed to sculpt, strengthen, and align your body with spring-loaded resistance and expert guidance.',
            image: { media: mediaId('reformer-room-new.webp'), alt: 'Client on the reformer in the TAVÚ Reformer Room' },
            imagePosition: 'center-40',
            highlights: [{ text: 'Max 8 per class' }, { text: 'Spring-loaded resistance' }, { text: 'Full-body sculpting' }, { text: 'Expert instructors' }],
            href: '/services/reformer-pilates',
          },
          {
            name: 'Breathing Room',
            tagline: 'Stillness. Depth. Release.',
            description: 'Signature TAVÚ MAT, RELEASE and STRETCH classes in a dedicated space for mindful, grounded movement.',
            image: { media: mediaId('service-breathing-props.webp'), alt: 'Breathing Room' },
            imagePosition: 'center',
            highlights: [{ text: 'TAVÚ MAT' }, { text: 'TAVÚ RELEASE' }, { text: 'TAVÚ STRETCH' }, { text: 'Mindful movement' }],
            href: '/services/breathing-room',
          },
          {
            name: 'Contrast Therapy',
            tagline: 'Heat. Cold. Renew.',
            description: "Alternating sauna and ice bath sessions to activate your body’s natural healing response. Shared and private suites available.",
            image: { media: mediaId('service-sauna.webp'), alt: 'Contrast Therapy' },
            imagePosition: 'center',
            highlights: [{ text: 'Sauna + Ice Bath' }, { text: 'Shared & private suites' }, { text: 'Boosts circulation' }, { text: 'Accelerates recovery' }],
            href: '/services/contrast-therapy',
          },
          {
            name: 'Compression Therapy',
            tagline: 'Recover. Restore. Repeat.',
            description: 'NormaTec pulsing compression to stimulate circulation, flush lactic acid, and support faster muscle recovery.',
            image: { media: mediaId('service-recovery-equipment.webp'), alt: 'Compression Therapy' },
            imagePosition: 'center',
            highlights: [{ text: 'NormaTec compression' }, { text: 'Post-training recovery' }, { text: 'Reduces swelling' }, { text: 'Speeds up recovery' }],
            href: '/services/compression-therapy',
          },
          {
            name: 'Massage',
            tagline: 'Unwind. Heal. Breathe.',
            description: 'Therapeutic and relaxation massage treatments tailored to release tension, improve circulation, and restore balance.',
            image: { media: mediaId('service-massage-towels.webp'), alt: 'Massage' },
            imagePosition: 'center',
            highlights: [{ text: 'Deep tissue' }, { text: 'Sports recovery' }, { text: 'Relaxation' }, { text: 'Custom treatments' }],
            href: '/services/massage',
          },
        ],
      },
      about: {
        enabled: true,
        eyebrow: 'The Philosophy',
        headingLine1: 'In a world that rushes,',
        headingLead: 'take a',
        headingEmphasis: 'pause',
        headingTail: '.',
        body: aboutBodyRichText,
        link: { label: 'Discover the Method', href: '/method' },
        images: [
          { image: { media: mediaId('service-reformer-mirror.webp'), alt: 'TAVÚ Reformer Pilates studio with circular backlit mirror' } },
          { image: { media: mediaId('service-breathing-props.webp'), alt: 'Breathing Room props — TAVÚ cork block and foam rollers' } },
          { image: { media: mediaId('service-sauna.webp'), alt: 'Himalayan salt sauna at TAVÚ Studio' } },
        ],
      },
      method: {
        enabled: true,
        eyebrow: 'The Philosophy',
        headingLead: 'The TAVÚ',
        headingEmphasis: 'Method',
        intro: 'Two foundations working in harmony to transform how you move and breathe.',
        pillars: [
          {
            number: '01',
            title: 'Movement',
            subtitle: 'Reformer Pilates',
            description:
              'Controlled, intentional movement that builds strength from the inside out. Using the resistance of the Reformer, we create length, stability, and power.',
            benefits: [{ text: 'Core Strength' }, { text: 'Flexibility' }, { text: 'Posture' }, { text: 'Mind-Body' }],
            image: { media: mediaId('about-lounge.webp'), alt: 'Movement' },
            icon: 'pin',
            accent: 'blue',
            stats: [{ value: '15+' }, { value: '50 min' }, { value: 'All Levels' }],
          },
          {
            number: '02',
            title: 'Breath',
            subtitle: 'Breathing Room',
            description:
              'Breath-led practices designed to restore balance, release tension, and reconnect you to your body. Inviting softness, presence, and quiet strength.',
            benefits: [{ text: 'Stress Relief' }, { text: 'Energy' }, { text: 'Clarity' }, { text: 'Release' }],
            image: { media: mediaId('hero-entrance-sign.webp'), alt: 'Breath' },
            icon: 'drop',
            accent: 'emerald',
            stats: [{ value: '10+' }, { value: '45-60 min' }, { value: 'All Levels' }],
          },
        ],
        cta: { label: 'Explore Classes', href: '/classes' },
        autoPlayingLabel: 'Auto-playing',
        resumeLabel: 'Resume auto-play',
        keyboardHint: 'Use ← → arrow keys to navigate',
      },
      socialFeed: {
        enabled: true,
        eyebrow: 'Follow Us',
        instagramButtonLabel: 'Instagram',
        tiktokButtonLabel: 'TikTok',
        showSetupGuide: true,
        fallbackImages: socialFallbackImages.map(({ filename, alt }) => ({
          image: { media: mediaId(filename), alt },
        })),
      },
      contact: {
        enabled: true,
        eyebrow: 'The Location',
        headingLead: 'Visit the',
        headingEmphasis: 'Sanctuary',
        addressHeading: 'Address',
        addressTitleLine: 'TAVÚ Wellness Studio',
        hoursHeading: 'Hours',
        contactHeading: 'Contact',
        mapTitle: 'TAVÚ Wellness Studio - Crescent Residence, Al Raha Beach, Abu Dhabi',
      },
      testimonials: {
        enabled: false,
        eyebrow: 'Testimonials',
        headingLead: 'What Our',
        headingEmphasis: 'Members',
        headingTail: 'Say',
        intro: 'Hear from our community who have experienced the transformative power of the TAVÚ method.',
        ctaHeading: 'Join Our Growing Community',
        ctaText: 'Be part of a community dedicated to mindful movement, breath, and holistic wellness.',
        primaryCta: { label: 'Book a Class', href: '/schedule' },
        secondaryCta: { label: 'Contact Us', href: '/contact' },
      },
      // seo left empty on purpose — the home page has no route layout today, so it falls back
      // to site-settings.seo (§3.5).
    },
  });
}

async function seedAboutPage(payload: Payload): Promise<void> {
  await payload.updateGlobal({
    slug: 'about-page',
    context,
    overrideAccess: true,
    data: {
      hero: {
        image: { media: mediaId('about-exterior.webp'), alt: 'TAVÚ Studio exterior' },
        eyebrow: 'Our Story',
        title: 'A room built for return',
        intro: 'Reformer Pilates and contrast therapy, held as one ritual. The first of its kind in Abu Dhabi.',
        tagline: 'TA grounds the body. VU lifts the spirit.',
      },
      philosophy: {
        eyebrow: 'The Philosophy',
        heading: 'From stillness into motion',
        lines: [
          { text: 'TA is the grounding. Reformer and Mat bring the body back to itself.' },
          { text: 'VÚ is the rise. Contrast and massage restore, release, and renew.' },
          { text: 'The ritual is the passage between them — and what the body learns there, it keeps.' },
        ],
        panels: [
          {
            image: { media: mediaId('ta-grounds-reformer.webp'), alt: 'TA — the TAVÚ Reformer studio, grounding the body' },
            label: 'TA',
            heading: 'Grounds the body.',
            text: 'Strength, stability, presence. Built on the Reformer and the Mat — slow, intentional, repeated until it becomes part of you.',
          },
          {
            image: { media: mediaId('hero-entrance-sign.webp'), alt: 'VU — evening sky lifting the spirit at TAVÚ' },
            label: 'VU',
            heading: 'Lifts the spirit.',
            text: 'Heat, cold, touch, stillness. Contrast therapy and massage restore, release, and renew. What you carry out, lighter than what you brought in.',
          },
        ],
      },
      journey: {
        image: { media: mediaId('about-reception.webp'), alt: 'TAVÚ Studio reception' },
        eyebrow: 'The Journey',
        heading: 'The TAVÚ Journey',
        intro: 'TAVÚ was created from a simple belief: balance is not found in extremes, but in integration.',
        taLabel: 'TA',
        taText: '— grounding on the Reformer and the Mat.',
        vuLabel: 'VU',
        vuText: '— the rise, through contrast and massage.',
        paragraph2: 'Together, they form TAVÚ: a space where the body is supported, the breath is honored, and practice becomes ritual.',
        paragraph3:
          'Rooted in Abu Dhabi, we bring Reformer Pilates, mat classes, contrast therapy and massage into one considered experience. Every class is designed with intention — to build strength without force, to restore without escape, and to reconnect you to yourself through consistency, not urgency.',
        closingLine1: 'This is not a place to rush through movement.',
        closingLine2: 'It is a place to arrive.',
      },
      gallery: {
        eyebrow: 'The Space',
        heading: 'Designed as a sanctuary',
        intro: 'Natural stone, warm light, small groups. Every detail tuned so your body and mind can settle.',
        images: [
          { image: { media: mediaId('about-reception.webp'), alt: 'TAVÚ stone reception desk' } },
          { image: { media: mediaId('service-reformer-logo.webp'), alt: 'Reformer studio with TAVÚ branded wall' } },
          { image: { media: mediaId('service-sauna.webp'), alt: 'Himalayan salt sauna interior' } },
          { image: { media: mediaId('hero-ice-baths.webp'), alt: 'Contrast Therapy ice baths at TAVÚ' } },
          { image: { media: mediaId('about-lounge.webp'), alt: 'TAVÚ arched stone lounge' } },
          { image: { media: mediaId('gallery-breathing-room.webp'), alt: 'The TAVÚ Breathing Room with mats, arched mirror and warm light' } },
          { image: { media: mediaId('gallery-sauna-infrared.webp'), alt: 'Guest relaxing in the TAVÚ infrared sauna' } },
          { image: { media: mediaId('gallery-sauna-salt.webp'), alt: 'Guest resting in the TAVÚ Himalayan salt sauna' } },
        ],
      },
      cta: {
        enabled: true,
        heading: 'Begin When Ready',
        text: 'Explore the schedule and book your class.',
        buttons: [
          { link: { label: 'View Schedule & Book', href: '/schedule' }, style: 'primary' },
          { link: { label: 'Contact Us', href: '/contact' }, style: 'outline' },
        ],
      },
      seo: {
        title: "About TAVÚ | Abu Dhabi's Private Wellness Studio",
        description:
          "TAVÚ is Abu Dhabi's first private space pairing Reformer Pilates with Contrast Therapy. Learn about our method, our space in Al Raha, and the team.",
        ogTitle: 'About TAVÚ Studio',
        ogDescription: "Abu Dhabi's first private space for Reformer Pilates and Contrast Therapy.",
      },
    },
  });
}

async function seedMethodPage(payload: Payload): Promise<void> {
  await payload.updateGlobal({
    slug: 'method-page',
    context,
    overrideAccess: true,
    data: {
      title: 'The Method',
      intro:
        'Rooted in TA (grounding) and VÚ (flow), our practice is a single, curated method designed to soothe the nervous system, restore clarity, and invite you to return to yourself.',
      progressionHeading: 'The 5-Level Progression',
      progressionIntro:
        'To ensure safety and mastery of form, TAVÚ uses a strict progression system. Clients must demonstrate proficiency at each level before advancing.',
      levels: [
        { label: 'Level 1', name: 'Foundation', description: 'Required for all new clients. Focus applies to apparatus setup, safety, and core Pilates principles.' },
        { label: 'Level 2', name: 'Alignment', description: 'Building endurance and stability. Introduction to coordination and fluid transitions.' },
        { label: 'Level 3', name: 'Flow', description: 'Increased tempo and complexity. Seamless movement integrating breath and strength.' },
        { label: 'Level 4', name: 'Precision', description: 'Advanced repertoire requiring deep core connection and total body awareness.' },
        {
          label: 'Level 5',
          name: 'Mastery',
          description: 'The ultimate expression of control. High-intensity, complex movements for our most experienced practitioners.',
        },
      ],
      seo: {
        title: 'The Method — TA (Grounding) & VÚ (Flow)',
        description:
          'The TAVÚ method: rooted in TA (grounding) and VÚ (flow), a curated practice designed to soothe the nervous system, restore clarity and build strength through a structured progression system.',
        keywords: ['TAVU method', 'Reformer Pilates progression', 'nervous system regulation Abu Dhabi', 'breathwork method'],
        ogTitle: 'The TAVÚ Method',
        ogDescription: 'TA — stillness. VÚ — flow. A single curated method built on a structured progression system.',
      },
    },
  });
}

/** Upserts a testimonial by `name` (no unique slug field on this collection, §2.8). */
async function upsertTestimonial(
  payload: Payload,
  data: { name: string; role?: string; location?: string; quote: string; rating: number; image: { media: number }; active: boolean; sortOrder: number },
): Promise<void> {
  const existing = await payload.find({
    collection: 'testimonials',
    where: { name: { equals: data.name } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const existingDoc = existing.docs[0];
  if (existingDoc) {
    await payload.update({ collection: 'testimonials', id: existingDoc.id, data, context, overrideAccess: true });
  } else {
    await payload.create({ collection: 'testimonials', data, context, overrideAccess: true });
  }
}

/** The 3 placeholder testimonials (landing/Testimonials.tsx:9-37) — not rendered today (§1.4). */
async function seedTestimonials(payload: Payload): Promise<void> {
  await upsertTestimonial(payload, {
    name: 'Sarah Al-Rashid',
    role: 'Wellness Enthusiast',
    location: 'Abu Dhabi',
    quote:
      'TAVÚ has completely transformed my relationship with my body. The combination of Pilates and breathwork has given me a sense of calm I never knew was possible.',
    rating: 5,
    image: { media: mediaId('service-reformer-logo.webp') },
    active: false,
    sortOrder: 10,
  });

  await upsertTestimonial(payload, {
    name: 'Michael Chen',
    role: 'Entrepreneur',
    location: 'Al Raha',
    quote: 'As someone who sits at a desk all day, the reformer sessions have been life-changing. My back pain is gone and I feel more energized than ever.',
    rating: 5,
    image: { media: mediaId('service-sauna.webp') },
    active: false,
    sortOrder: 20,
  });

  await upsertTestimonial(payload, {
    name: 'Fatima Hassan',
    role: 'Yoga Instructor',
    location: 'Dubai',
    quote:
      "I've practiced wellness for years, but TAVÚ's approach is unique. The integration of movement and breath creates a holistic experience I haven't found anywhere else.",
    rating: 5,
    image: { media: mediaId('service-ice-baths.webp') },
    active: false,
    sortOrder: 30,
  });
}

export async function seedHome(payload: Payload): Promise<void> {
  await seedHomePage(payload);
  await seedAboutPage(payload);
  await seedMethodPage(payload);
  await seedTestimonials(payload);
  payload.logger.info('seedHome: home-page, about-page, method-page, 3 testimonials upserted');
}
