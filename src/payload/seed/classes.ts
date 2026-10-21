// Package C seed: 17 classes (6 Reformer, 11 Breathing Room — §2.5) and 8 page globals
// (classes-page, schedule-page, appointments-page, services-page, reformer-pilates-page,
// breathing-room-page, contrast-therapy-page, compression-therapy-page — §3.5). Classes are
// upserted by slug so re-running `npm run seed` never duplicates rows; globals are
// idempotent by nature (`updateGlobal`, §5.4).

import type { Payload } from 'payload';

import { mediaId } from './media';

type ClassSeed = {
  name: string;
  slug: string;
  type: 'reformer' | 'breathing-room';
  family?: 'tavu-mat' | 'tavu-release' | 'tavu-stretch';
  level?: 'foundation' | 'all-levels' | 'intermediate' | 'advanced';
  description: string;
  sortOrder: number;
};

// Reformer rows — classes/page.tsx:11-42 = reformer-pilates/page.tsx:12-49.
const REFORMER_CLASSES: ClassSeed[] = [
  {
    name: 'TA: Gentle Flow',
    slug: 'ta-gentle-flow',
    type: 'reformer',
    level: 'all-levels',
    description:
      'A slower, controlled Reformer class focused on mindful movement, mobility, alignment, and full-body strength. Ideal for anyone looking for a gentler approach while still getting an effective workout.',
    sortOrder: 10,
  },
  {
    name: 'VÚ: Steady Strength',
    slug: 'vu-steady-strength',
    type: 'reformer',
    level: 'intermediate',
    description:
      'An intermediate Reformer class built around steady, controlled strength work. Expect purposeful resistance sequences that challenge the entire body while developing muscular endurance, stability, and control.',
    sortOrder: 20,
  },
  {
    name: 'VÚ: Tone & Tighten',
    slug: 'vu-tone-tighten',
    type: 'reformer',
    level: 'intermediate',
    description:
      'An intermediate full-body Reformer workout combining controlled resistance and targeted sculpting sequences to strengthen, tone, and challenge muscular endurance from head to toe.',
    sortOrder: 30,
  },
  {
    name: 'TAVÚ: Power Pulse',
    slug: 'tavu-power-pulse',
    type: 'reformer',
    level: 'advanced',
    description:
      'A high-intensity advanced Reformer workout combining powerful resistance work, controlled pulses, and challenging transitions to test strength, endurance, stability, and control.',
    sortOrder: 40,
  },
  {
    name: 'Lower Body × Core',
    slug: 'lower-body-core',
    type: 'reformer',
    description:
      'A targeted Reformer workout combining lower-body strength with focused core work. Expect controlled sequences for the glutes and legs alongside deep abdominal activation and stability training.',
    sortOrder: 50,
  },
  {
    name: 'Upper Body × Core',
    slug: 'upper-body-core',
    type: 'reformer',
    description:
      'A focused Reformer workout targeting the arms, shoulders, back, and core through controlled resistance work designed to build upper-body strength, stability, and definition.',
    sortOrder: 60,
  },
];

// Breathing Room rows — classes/page.tsx:44-111 = breathing-room/page.tsx:12-79.
const BREATHING_CLASSES: ClassSeed[] = [
  {
    name: 'TAVÚ MAT: Core',
    slug: 'tavu-mat-core',
    type: 'breathing-room',
    family: 'tavu-mat',
    description:
      'A focused Mat Pilates class designed to strengthen the deep core, improve stability, and support better posture through controlled, intentional movement.',
    sortOrder: 10,
  },
  {
    name: 'TAVÚ MAT: Power Pulse',
    slug: 'tavu-mat-power-pulse',
    type: 'breathing-room',
    family: 'tavu-mat',
    level: 'advanced',
    description:
      'A high-energy advanced Mat workout combining powerful movements, controlled pulses, and challenging sequences to build strength, endurance, and full-body control.',
    sortOrder: 20,
  },
  {
    name: 'TAVÚ MAT: Sculpt',
    slug: 'tavu-mat-sculpt',
    type: 'breathing-room',
    family: 'tavu-mat',
    level: 'advanced',
    description:
      'An advanced Mat workout built around challenging sculpting sequences designed to strengthen, define, and fatigue the muscles while testing control, stability, and endurance.',
    sortOrder: 30,
  },
  {
    name: 'TAVÚ RELEASE: Hip Reset',
    slug: 'tavu-release-hip-reset',
    type: 'breathing-room',
    family: 'tavu-release',
    description:
      'A targeted release class designed to open the hips, ease built-up tension, and restore mobility through a combination of gentle movement, stretching, and controlled mobility work.',
    sortOrder: 40,
  },
  {
    name: 'TAVÚ RELEASE: Lower Back Release',
    slug: 'tavu-release-lower-back-release',
    type: 'breathing-room',
    family: 'tavu-release',
    description:
      'A gentle class focused on releasing tension through the lower back, hips, and surrounding muscles while improving mobility and encouraging comfortable, supported movement.',
    sortOrder: 50,
  },
  {
    name: 'TAVÚ RELEASE: Stretch & Release',
    slug: 'tavu-release-stretch-release',
    type: 'breathing-room',
    family: 'tavu-release',
    description:
      'A calming full-body session combining gentle stretching and release work to reduce tension, improve mobility, and leave the body feeling lighter and more relaxed.',
    sortOrder: 60,
  },
  {
    name: 'TAVÚ STRETCH: Backbends & Posture',
    slug: 'tavu-stretch-backbends-posture',
    type: 'breathing-room',
    family: 'tavu-stretch',
    description:
      'A focused stretching class designed to open the chest, shoulders, spine, and hip flexors while building the mobility and control needed for backbends and improved posture.',
    sortOrder: 70,
  },
  {
    name: 'TAVÚ STRETCH: Balance + Sculpt',
    slug: 'tavu-stretch-balance-sculpt',
    type: 'breathing-room',
    family: 'tavu-stretch',
    description:
      'A combination of balance work, controlled sculpting movements, and stretching designed to improve stability, coordination, strength, and flexibility.',
    sortOrder: 80,
  },
  {
    name: 'TAVÚ STRETCH: Deep Core + Stretch',
    slug: 'tavu-stretch-deep-core-stretch',
    type: 'breathing-room',
    family: 'tavu-stretch',
    description:
      'A balanced session combining deep core activation with full-body stretching to improve stability, posture, mobility, and overall body control.',
    sortOrder: 90,
  },
  {
    name: 'TAVÚ STRETCH: Dynamic Stretching',
    slug: 'tavu-stretch-dynamic-stretching',
    type: 'breathing-room',
    family: 'tavu-stretch',
    description:
      'An active stretching class using continuous, controlled movement to increase mobility, warm the body, and improve functional range of motion.',
    sortOrder: 100,
  },
  {
    name: 'TAVÚ STRETCH: Split & Glutes',
    slug: 'tavu-stretch-split-glutes',
    type: 'breathing-room',
    family: 'tavu-stretch',
    description:
      'A targeted stretching session focused on the hips, glutes, and surrounding muscles to release tightness, improve mobility, and support better lower-body movement.',
    sortOrder: 110,
  },
];

async function upsertClass(payload: Payload, data: ClassSeed): Promise<void> {
  const context = { disableRevalidate: true };
  const existing = await payload.find({
    collection: 'classes',
    where: { slug: { equals: data.slug } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });

  if (existing.docs[0]) {
    await payload.update({
      collection: 'classes',
      id: existing.docs[0].id,
      data,
      context,
      overrideAccess: true,
    });
    return;
  }

  await payload.create({
    collection: 'classes',
    data,
    context,
    overrideAccess: true,
  });
}

export async function seedClasses(payload: Payload): Promise<void> {
  const context = { disableRevalidate: true };

  for (const row of [...REFORMER_CLASSES, ...BREATHING_CLASSES]) {
    await upsertClass(payload, row);
  }

  await payload.updateGlobal({
    slug: 'classes-page',
    context,
    overrideAccess: true,
    data: {
      hero: {
        image: { media: mediaId('hero-reformer-studio.webp'), alt: 'TAVU Movement Classes' },
        title: 'Our Classes',
        intro: 'Experience the TAVÚ method through intentionally designed classes that blend movement and breath.',
      },
      packages: {
        eyebrow: 'Pricing',
        heading: 'Class Packages',
        showVatNote: true,
      },
      policies: {
        enabled: true,
        heading: 'Class Policies',
      },
      reformerRoom: {
        image: { media: mediaId('reformer-room-new.webp'), alt: 'TAVÚ Reformer Room — client on the reformer' },
        eyebrow: 'Movement',
        heading: 'Reformer Room',
        lead: 'Small-group reformer classes, limited to {fact:reformer-capacity} participants.',
        body: 'A {fact:reformer-duration}-minute, low-impact practice on the reformer—designed to build strength, control, mobility, and alignment. Adaptable, precise, and quietly challenging.',
        cta: { label: 'Book Your Reformer', href: '/schedule' },
        cardCtaLabel: 'Reserve Your Place',
        cardCtaHref: '/schedule',
      },
      breathingRoom: {
        eyebrow: 'Breath',
        heading: 'Breathing Room',
        lead: 'A space dedicated to slowing down.',
        body: 'Signature mat, release and stretch classes designed to restore balance, release tension, and reconnect you to your body — inviting softness, presence, and quiet strength.',
        cta: { label: 'Book Your Class', href: '/schedule' },
        image: { media: mediaId('service-breathing-props.webp'), alt: 'TAVÚ Breathing Room' },
        cardCtaLabel: 'Reserve Your Place',
        cardCtaHref: '/schedule',
      },
      cta: {
        enabled: true,
        heading: 'Begin When Ready',
        text: 'Explore the schedule and book your class.',
        buttons: [{ link: { label: 'View Schedule & Book', href: '/schedule' }, style: 'primary' }],
      },
      seo: {
        title: 'Classes | Reformer Pilates & Breathing Room (Mat, Release, Stretch)',
        description:
          'Explore all classes at TAVÚ Studio in Al Raha, Abu Dhabi — Reformer Pilates (TA, VÚ and specialty classes) and Breathing Room TAVÚ MAT, RELEASE and STRETCH classes. Small-group sessions throughout the week.',
        ogTitle: 'TAVÚ Classes | Reformer, Mat, Release & Stretch',
        ogDescription: 'Small-group classes for every rhythm — strength, flow, breath and stillness.',
      },
    },
  });

  await payload.updateGlobal({
    slug: 'schedule-page',
    context,
    overrideAccess: true,
    data: {
      title: 'Schedule',
      intro: 'Book your next session. Browse our class schedule and reserve your spot.',
      bookingInfo: { heading: 'Booking Information' },
      seo: {
        title: 'Schedule | Book Pilates & Recovery Classes',
        description:
          'View TAVÚ Studio class schedule and book Reformer Pilates, Mat, Release and Stretch classes and recovery sessions in Al Raha, Abu Dhabi.',
        ogTitle: 'TAVÚ Schedule | Book Your Next Class',
        ogDescription: 'Reserve your spot in Reformer, Mat, Release, Stretch and more.',
      },
    },
  });

  await payload.updateGlobal({
    slug: 'appointments-page',
    context,
    overrideAccess: true,
    data: {
      title: 'Appointments',
      intro: 'Book one-on-one sessions — Contrast Therapy, Compression Therapy, Massage and private appointments.',
      packagesHeading: 'Appointment Packages',
      info: { heading: 'Appointment Information' },
      seo: {
        title: 'Appointments | Book Contrast, NormaTec & Massage',
        description:
          'Book private appointments at TAVÚ Studio — Contrast Therapy, NormaTec Compression Therapy and Massage in Al Raha, Abu Dhabi.',
        ogTitle: 'Book an Appointment at TAVÚ',
        ogDescription: 'Private 1-on-1 appointments — Contrast Therapy, Compression Therapy, Massage.',
      },
    },
  });

  await payload.updateGlobal({
    slug: 'services-page',
    context,
    overrideAccess: true,
    data: {
      hero: {
        eyebrow: 'What We Offer',
        title: 'Our Services',
        intro:
          'Discover the complete TAVÚ experience — from reformer classes to recovery therapies, everything you need for your wellness journey.',
      },
      items: [
        {
          eyebrow: 'Movement',
          name: 'Reformer Pilates',
          description:
            'Small-group reformer classes, limited to {fact:reformer-capacity} participants. A {fact:reformer-duration}-minute, low-impact practice designed to build strength, control, mobility, and alignment.',
          image: { media: mediaId('reformer-room-new.webp'), alt: 'Reformer Pilates' },
          imagePosition: 'center-40',
          accent: 'blue',
          features: [
            { text: '{fact:reformer-capacity} max participants' },
            { text: '{fact:reformer-duration} minutes' },
            { text: 'All levels welcome' },
          ],
          href: '/services/reformer-pilates',
        },
        {
          eyebrow: 'Breath',
          name: 'Breathing Room',
          description:
            'Signature TAVÚ MAT, RELEASE and STRETCH classes. Designed to restore balance, release tension, and reconnect you to your body.',
          image: { media: mediaId('service-breathing-props.webp'), alt: 'Breathing Room' },
          imagePosition: 'center',
          accent: 'emerald',
          features: [{ text: 'Mat, Release & Stretch' }, { text: 'Signature classes' }, { text: 'Mat-based practices' }],
          href: '/services/breathing-room',
        },
        {
          eyebrow: 'Recovery',
          name: 'Contrast Therapy',
          description:
            "Himalayan Salt Sauna or Infrared Sauna with Ice Bath. Activate your body's natural healing response and accelerate recovery.",
          image: { media: mediaId('service-sauna.webp'), alt: 'Contrast Therapy' },
          imagePosition: 'center',
          accent: 'amber',
          features: [{ text: '{fact:contrast-duration} minutes' }, { text: 'Hot & cold therapy' }, { text: 'Private suites available' }],
          href: '/services/contrast-therapy',
        },
        {
          eyebrow: 'Recovery',
          name: 'Compression Therapy',
          description:
            'NormaTec pulsing compression for faster muscle recovery. Boosts circulation, flushes lactic acid and reduces swelling.',
          image: { media: mediaId('service-recovery-equipment.webp'), alt: 'Compression Therapy' },
          imagePosition: 'center',
          accent: 'cyan',
          features: [{ text: '{fact:compression-duration} minutes' }, { text: 'NormaTec system' }, { text: 'Add-on to contrast' }],
          href: '/services/compression-therapy',
        },
        {
          eyebrow: 'Recovery',
          name: 'Massage',
          description:
            'Therapeutic and relaxation massage by certified therapists. From stress relief to deep tissue work, find the perfect treatment for your needs.',
          image: { media: mediaId('service-massage-towels.webp'), alt: 'Massage' },
          imagePosition: 'center',
          accent: 'rose',
          features: [{ text: '60 or 90 minutes' }, { text: 'Multiple styles' }, { text: 'Ladies only' }],
          href: '/services/massage',
        },
      ],
      learnMoreLabel: 'Learn More',
      cta: {
        enabled: true,
        heading: 'Ready to Begin?',
        text: 'Start your wellness journey with our pre-opening packages. Limited spots available.',
        buttons: [
          { link: { label: 'View Packages', href: '/pricing' }, style: 'primary' },
          { link: { label: 'Book a Class', href: '/schedule' }, style: 'outline' },
        ],
      },
      seo: {
        title: 'Services | Pilates, Contrast Therapy, Recovery & Massage',
        description:
          'Explore all TAVÚ services — Reformer Pilates, Breathing Room, Contrast Therapy, NormaTec Compression Therapy and Massage in Al Raha, Abu Dhabi.',
        ogTitle: 'TAVÚ Services | Movement, Recovery, Breath',
        ogDescription: 'Reformer, mat classes, Contrast Therapy, NormaTec and Massage.',
      },
    },
  });

  await payload.updateGlobal({
    slug: 'reformer-pilates-page',
    context,
    overrideAccess: true,
    data: {
      hero: {
        image: { media: mediaId('reformer-room-new.webp'), alt: 'Client on the reformer in the TAVÚ Reformer Room' },
        imagePosition: 'center-40',
        eyebrow: 'Movement',
        title: 'Reformer Pilates',
        intro: 'Small-group reformer classes designed to build strength, control, mobility, and alignment.',
      },
      overview: {
        heading: 'The Reformer Room',
        paragraphs: [
          {
            text: 'Our reformer room features state-of-the-art equipment in an intimate setting limited to {fact:reformer-capacity} participants per class. Each {fact:reformer-duration}-minute session is meticulously designed to challenge your body while maintaining alignment and connection to your breath.',
          },
        ],
        stats: [
          { value: '{fact:reformer-capacity}', label: 'Max Participants' },
          { value: '{fact:reformer-duration}', label: 'Minutes' },
        ],
        cta: { label: 'Book a Class', href: '/schedule' },
        card: {
          image: { media: mediaId('service-reformer-logo.webp'), alt: 'Reformer Studio' },
          eyebrow: 'TAVÚ',
          titleLine1: 'Reformer',
          titleLine2: 'Pilates Classes',
          bullets: [{ text: 'Single sessions and class packs' }, { text: 'Includes Ladies-Only class options' }],
        },
      },
      classes: {
        heading: 'Our Classes',
        intro: 'From TA: Gentle Flow to advanced, find the class that matches your level.',
        cardCtaLabel: 'Book Now →',
        cardCtaHref: '/schedule',
      },
      packages: {
        heading: 'Reformer Packages',
        showVatNote: true,
      },
      cta: {
        enabled: true,
        heading: 'Ready to Begin?',
        text: 'Book your first reformer class and experience the TAVÚ difference.',
        buttons: [{ link: { label: 'View Schedule & Book', href: '/schedule' }, style: 'primary' }],
      },
      seo: {
        title: 'Reformer Pilates in Abu Dhabi | Small-Group Classes',
        description:
          'Small-group Reformer Pilates classes at TAVÚ in Al Raha, Abu Dhabi. Drop-in 160 AED and class packs from 1,550 AED. Build strength, mobility and control.',
        keywords: ['Reformer Pilates Abu Dhabi', 'Reformer Pilates Al Raha', 'Pilates classes Abu Dhabi', 'Small group Reformer'],
        ogTitle: 'Reformer Pilates in Abu Dhabi | TAVÚ Studio',
        ogDescription: 'Small-group Reformer Pilates at TAVÚ Studio, Al Raha. From 160 AED drop-in.',
      },
    },
  });

  await payload.updateGlobal({
    slug: 'breathing-room-page',
    context,
    overrideAccess: true,
    data: {
      hero: {
        image: { media: mediaId('service-breathing-props.webp'), alt: 'Breathing Room' },
        imagePosition: 'center',
        eyebrow: 'Breath',
        title: 'Breathing Room',
        intro: 'A space dedicated to slowing down. Breath-led practices designed to restore balance and reconnect you to your body.',
      },
      overview: {
        heading: 'The Breathing Room',
        paragraphs: [
          {
            text: 'Our breathing room is a sanctuary for presence and breath. From mat pilates to release and stretch, each session is designed to help you release tension, build strength, and find inner calm.',
          },
        ],
        stats: [
          { value: '11', label: 'Signature Classes' },
          { value: '3', label: 'MAT · RELEASE · STRETCH' },
        ],
        cta: { label: 'Book a Class', href: '/schedule' },
        card: {
          image: { media: mediaId('gallery-breathing-room.webp'), alt: 'The TAVÚ Breathing Room' },
          eyebrow: 'TAVÚ',
          titleLine1: 'Breathing',
          titleLine2: 'Room Classes',
          bullets: [{ text: 'TAVÚ MAT, RELEASE and STRETCH classes' }, { text: 'Drop-in sessions and class packs' }],
        },
      },
      classes: {
        heading: 'Our Classes',
        intro: 'Signature mat, release and stretch classes for every body.',
        cardCtaLabel: 'Book Now →',
        cardCtaHref: '/schedule',
      },
      packages: {
        heading: 'Breathing Room Packages',
        showVatNote: true,
      },
      cta: {
        enabled: true,
        heading: 'Ready to Begin?',
        text: 'Book your first breathing room class and find your calm.',
        buttons: [{ link: { label: 'View Schedule & Book', href: '/schedule' }, style: 'primary' }],
      },
      seo: {
        title: 'Breathing Room — Mat, Release and Stretch Classes',
        description: 'Mat, Release and Stretch classes at TAVÚ, Al Raha, Abu Dhabi. Drop-in 120 AED, class packs from 1,100 AED.',
        keywords: ['Mat Pilates Abu Dhabi', 'Stretch class Abu Dhabi', 'Release class Al Raha', 'Mobility class Abu Dhabi'],
        ogTitle: 'Breathing Room at TAVÚ | Mat, Release and Stretch Classes',
        ogDescription: 'Mat-based and breath-focused classes. Drop-in 120 AED or class packs from 1,100 AED.',
      },
    },
  });

  await payload.updateGlobal({
    slug: 'contrast-therapy-page',
    context,
    overrideAccess: true,
    data: {
      hero: {
        image: { media: mediaId('service-sauna.webp'), alt: 'Contrast Therapy' },
        imagePosition: 'center',
        eyebrow: 'Recovery',
        title: 'Contrast Therapy',
        intro: "Alternating sauna and ice bath sessions to activate your body's natural healing response.",
      },
      overview: {
        heading: 'The Power of Contrast',
        paragraphs: [
          {
            text: 'Our contrast therapy sessions combine the ancient wisdom of hot and cold therapy with modern recovery science. Experience the healing power of our Himalayan Salt Sauna, Infrared Sauna, and Ice Bath facilities.',
          },
          {
            text: "Whether you're an athlete seeking faster recovery or simply looking to boost your wellness routine, our contrast therapy will leave you feeling refreshed, rejuvenated, and ready to take on anything.",
          },
        ],
        cta: { label: 'Book a Session', href: '/appointments' },
        card: {
          image: { media: mediaId('service-ice-baths.webp'), alt: 'Contrast Therapy Suite' },
          eyebrow: 'TAVÚ',
          titleLine1: 'Sauna',
          titleLine2: '+ Ice Bath',
          bullets: [
            { text: 'Himalayan Salt & Infrared Sauna' },
            { text: 'Shared and private suite options' },
            { text: 'Optional add-on: Compression Flush' },
          ],
        },
      },
      benefits: {
        eyebrow: 'Why Choose Us',
        heading: 'Benefits',
        intro: 'Experience the transformative power of contrast therapy.',
        items: [
          { icon: 'bolt', title: 'Accelerated Recovery', description: 'Reduce muscle soreness and speed up recovery after intense workouts.' },
          { icon: 'heart', title: 'Reduced Inflammation', description: 'Cold therapy helps reduce inflammation and joint pain naturally.' },
          { icon: 'circulation', title: 'Improved Circulation', description: 'Hot-cold contrast boosts blood flow and cardiovascular health.' },
          { icon: 'lightbulb', title: 'Mental Clarity', description: 'Cold exposure releases endorphins and improves mental focus.' },
        ],
      },
      sessions: {
        heading: 'Sessions',
        intro:
          'The individual drop-in is a private session; couple, trio and group sessions come with the choice of a private or shared experience.',
        showVatNote: true,
      },
      membershipsNote: {
        prefix: 'Looking for regular sessions? See our',
        link: { label: 'Reset and Ritual Unlimited memberships', href: '/memberships' },
        suffix: '.',
      },
      cta: {
        enabled: true,
        heading: 'Ready to Recover?',
        text: 'Book your contrast therapy session and feel the difference.',
        buttons: [{ link: { label: 'Book a Session', href: '/appointments' }, style: 'primary' }],
      },
      seo: {
        title: 'Contrast Therapy (Sauna + Ice Bath) in Abu Dhabi',
        description:
          'Sauna plus ice bath contrast therapy at TAVÚ in Al Raha, Abu Dhabi. Private individual drop-in 275 AED, couple 456 AED, trio 600 AED, groups up to six 1,050 AED. VAT excluded.',
        keywords: ['Contrast Therapy Abu Dhabi', 'Ice bath Abu Dhabi', 'Sauna Abu Dhabi', 'Infrared Sauna Al Raha', 'Recovery Abu Dhabi'],
        ogTitle: 'Contrast Therapy at TAVÚ | Sauna + Ice Bath',
        ogDescription: 'Private individual drop-in 275 AED, couple 456 AED, trio 600 AED, groups up to six 1,050 AED.',
      },
    },
  });

  await payload.updateGlobal({
    slug: 'compression-therapy-page',
    context,
    overrideAccess: true,
    data: {
      hero: {
        image: { media: mediaId('service-recovery-equipment.webp'), alt: 'NormaTec Compression Therapy recovery equipment' },
        imagePosition: 'center',
        eyebrow: 'Recovery',
        title: 'Compression Therapy',
        intro: 'NormaTec pulsing compression for faster muscle recovery and improved circulation.',
      },
      overview: {
        heading: 'NormaTec Recovery',
        paragraphs: [
          {
            text: 'A recovery-focused treatment using pulsing compression to stimulate circulation and support faster muscle recovery. Used by professional athletes worldwide.',
          },
          { text: 'Perfect as a standalone recovery session or as an add-on to your contrast therapy for maximum results.' },
        ],
        cta: { label: 'Book a Session', href: '/appointments' },
        card: {
          image: { media: mediaId('about-lounge.webp'), alt: 'Recovery lounge at TAVÚ' },
          eyebrow: 'TAVÚ',
          titleLine1: 'NormaTec',
          titleLine2: 'Compression Therapy',
          bullets: [
            { text: '{fact:compression-duration}-minute session' },
            { text: 'Customizable pressure' },
            { text: 'Add-on Compression Flush (20 min — {price:compression-flush} AED)' },
          ],
        },
      },
      pricing: {
        heading: 'NormaTec',
        intro: 'Single sessions and multi-session recovery packs.',
        benefitsHeading: 'Benefits',
        recommendedHeading: 'Recommended for',
        individualCtaLabel: 'Book Compression Therapy',
        packCtaLabel: 'Book Recovery Pack',
        ctaHref: '/appointments',
        showVatNote: true,
      },
      pairWith: {
        heading: 'Pair with Contrast Therapy',
        text: 'Add Compression Flush (20 min — {price:compression-flush} AED) to any Contrast Therapy session for the ultimate recovery combo.',
        link: { label: 'Explore Contrast Therapy →', href: '/services/contrast-therapy' },
      },
      cta: {
        enabled: true,
        heading: 'Ready to Recover?',
        text: 'Book your NormaTec session and feel the difference.',
        buttons: [{ link: { label: 'Book a Session', href: '/appointments' }, style: 'primary' }],
      },
      seo: {
        title: 'Compression Therapy (NormaTec) in Abu Dhabi',
        description:
          'NormaTec compression therapy for faster recovery at TAVÚ in Al Raha, Abu Dhabi. 45-minute session 160 AED, Recovery Pack (5+1) 660 AED. Boosts circulation, reduces swelling, flushes lactic acid.',
        keywords: ['NormaTec Abu Dhabi', 'Compression Therapy Abu Dhabi', 'Recovery Al Raha', 'Pulsing compression', 'Lymphatic drainage Abu Dhabi'],
        ogTitle: 'Compression Therapy at TAVÚ | NormaTec Recovery',
        ogDescription: 'NormaTec pulsing compression for faster muscle recovery. 45 min — 160 AED, Recovery Pack (5+1) 660 AED.',
      },
    },
  });

  payload.logger.info(`seedClasses: ${REFORMER_CLASSES.length + BREATHING_CLASSES.length} classes upserted, 8 page globals upserted`);
}
