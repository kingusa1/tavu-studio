// Package D seed: 4 events, 5 page globals (events-page, partnerships-page, contact-page,
// register-page, account-page) and 2 legal pages converted from
// src/payload/seed/legal/{terms-of-service,privacy-policy}.md (§6, §2.9).

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical';
import type { Payload } from 'payload';

import type { Event, LegalPage } from '@/payload-types';

import { mediaId } from './media';

const context = { disableRevalidate: true };

type EventInput = Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'slug'>;
type LegalPageInput = Omit<LegalPage, 'id' | 'createdAt' | 'updatedAt' | 'slug'>;

/** Finds an existing `events` doc by `slug` and updates it, or creates it — keeps `npm run seed` idempotent. */
async function upsertEvent(payload: Payload, slug: string, data: EventInput): Promise<void> {
  const existing = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });

  const existingDoc = existing.docs[0];
  if (existingDoc) {
    await payload.update({ collection: 'events', id: existingDoc.id, data, context, overrideAccess: true });
  } else {
    await payload.create({ collection: 'events', data: { slug, ...data }, context, overrideAccess: true });
  }
}

/** Finds an existing `legal-pages` doc by `slug` and updates it, or creates it — keeps `npm run seed` idempotent. */
async function upsertLegalPage(payload: Payload, slug: NonNullable<LegalPage['slug']>, data: LegalPageInput): Promise<void> {
  const existing = await payload.find({
    collection: 'legal-pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });

  const existingDoc = existing.docs[0];
  if (existingDoc) {
    await payload.update({ collection: 'legal-pages', id: existingDoc.id, data, context, overrideAccess: true });
  } else {
    await payload.create({ collection: 'legal-pages', data: { slug, ...data }, context, overrideAccess: true });
  }
}

async function seedEvents(payload: Payload): Promise<void> {
  await upsertEvent(payload, 'sound-healing', {
    title: 'Sound Healing',
    kind: 'upcoming',
    categoryLabel: 'Sound Healing',
    dateLabel: 'Full Moon & New Moon',
    timeLabel: 'Dates to be announced',
    description:
      'A sound healing session held around the full moon and the new moon. Some events are also specially focused around Yin + Yang.',
    images: [
      { image: { media: mediaId('event-sound-healing-1.webp'), alt: 'Sound Healing' } },
      { image: { media: mediaId('event-sound-healing-2.webp'), alt: 'Sound Healing' } },
    ],
    active: true,
    sortOrder: 0,
  });

  await upsertEvent(payload, 'alo-tavu', {
    title: 'ALO + TAVÚ',
    kind: 'highlight',
    categoryLabel: 'Special Event · Collaboration',
    description: 'A special collaboration between ALO and TAVÚ.',
    images: [
      { image: { media: mediaId('event-alo-1.webp'), alt: 'ALO + TAVÚ collaboration — ALO gift bag and drink at TAVÚ' } },
      { image: { media: mediaId('event-alo-2.webp'), alt: 'ALO + TAVÚ collaboration — ALO gifts laid out on a TAVÚ mat' } },
    ],
    logo: { media: mediaId('partner-alo-logo.webp'), alt: 'ALO logo' },
    active: true,
    sortOrder: 0,
  });

  await upsertEvent(payload, 'jiu-jitsu-womens-team', {
    title: 'Jiu-Jitsu Women’s Team',
    kind: 'highlight',
    categoryLabel: 'Private Event',
    description: 'The Jiu-Jitsu Women’s Team came to TAVÚ for a private event.',
    images: [],
    logo: { media: mediaId('partner-uae-jiujitsu.webp'), alt: 'UAE Jiu-Jitsu Federation logo' },
    active: true,
    sortOrder: 1,
  });

  await upsertEvent(payload, 'beyondlefifth-running-club', {
    title: 'BeyondLeFifth Running Club',
    kind: 'highlight',
    categoryLabel: 'Community Gathering',
    description: 'Our running club collaboration with BeyondLeFifth.',
    images: [
      { image: { media: mediaId('event-beyondlefifth-1.webp'), alt: 'BeyondLeFifth running club gathering outside TAVÚ' } },
      { image: { media: mediaId('event-beyondlefifth-2.webp'), alt: 'BeyondLeFifth runners meeting in front of the TAVÚ studio' } },
    ],
    active: true,
    sortOrder: 2,
  });

  payload.logger.info('seedCommunity: 4 events upserted');
}

async function seedPageGlobals(payload: Payload): Promise<void> {
  await payload.updateGlobal({
    slug: 'events-page',
    context,
    overrideAccess: true,
    data: {
      hero: {
        image: { media: mediaId('about-entrance.webp'), alt: 'TAVÚ Events' },
        title: 'Events',
        intro: 'Special events, collaborations, and community gatherings to deepen your practice',
      },
      upcoming: { eyebrow: 'Calendar', heading: 'Upcoming Events', emptyText: '' },
      eventTypes: {
        eyebrow: 'What We Offer',
        heading: 'Event Types',
        items: [
          {
            icon: 'star',
            title: 'Special Events & Collaborations',
            description: 'Curated experiences created together with brands and partners who share our approach to wellbeing',
          },
          { icon: 'lock', title: 'Private Events', description: 'Exclusive sessions for teams and groups, hosted privately at TAVÚ' },
          {
            icon: 'users',
            title: 'Community Gatherings',
            description: 'Social events to connect with fellow TAVU members and build lasting relationships',
          },
          {
            icon: 'moon',
            title: 'Sound Healing',
            description: 'Full Moon and New Moon sound healing sessions, with some events focused around Yin + Yang',
          },
        ],
      },
      highlights: { eyebrow: 'Collaborations', heading: 'Events, Partnerships & Community' },
      cta: {
        enabled: true,
        heading: 'Stay Updated',
        text: 'Register to receive notifications about upcoming events, collaborations, and exclusive member gatherings.',
        buttons: [
          { link: { label: 'Register Now', href: '/register', newTab: false }, style: 'primary' },
          { link: { label: 'Contact Us', href: '/contact', newTab: false }, style: 'outline' },
        ],
      },
      seo: {
        title: 'Events & Collaborations',
        description:
          'Special events and collaborations at TAVÚ in Al Raha, Abu Dhabi — ALO x TAVÚ collaborations, private events, BeyondLeFifth running club gatherings, and Full Moon & New Moon sound healing.',
        keywords: ['wellness events Abu Dhabi', 'sound healing Abu Dhabi', 'running club Al Raha', 'private events Abu Dhabi'],
        ogTitle: 'Events & Collaborations at TAVÚ',
        ogDescription: 'ALO x TAVÚ collaborations, private events, BeyondLeFifth running club and Full Moon / New Moon sound healing.',
        robots: 'index-follow',
      },
    },
  });

  await payload.updateGlobal({
    slug: 'partnerships-page',
    context,
    overrideAccess: true,
    data: {
      hero: {
        image: { media: mediaId('about-lounge.webp'), alt: 'TAVU Partnerships' },
        title: 'Partnerships',
        intro: 'Collaborate with TAVU to bring wellness to your organization or brand',
      },
      types: {
        eyebrow: 'Opportunities',
        heading: 'Partnership Types',
        items: [
          {
            icon: 'corporate',
            title: 'Corporate Wellness',
            description:
              'Partner with TAVU to bring wellness programs to your organization. Custom packages for employee health, team building, and executive wellness.',
            features: [
              { text: 'On-site wellness programs' },
              { text: 'Group class packages' },
              { text: 'Recovery day experiences' },
              { text: 'Health & fitness seminars' },
            ],
          },
          {
            icon: 'sports',
            title: 'Sports & Athletics',
            description:
              'Support for athletes, sports teams, and fitness professionals. Access to recovery facilities, specialized training, and performance optimization.',
            features: [
              { text: 'Team recovery sessions' },
              { text: 'Athlete recovery protocols' },
              { text: 'Pre-competition prep' },
              { text: 'Post-event restoration' },
            ],
          },
          {
            icon: 'hotels',
            title: 'Hotels & Hospitality',
            description:
              'Elevate guest experiences with TAVU wellness amenities. We work with hotels and resorts to create bespoke wellness offerings.',
            features: [
              { text: 'Guest wellness packages' },
              { text: 'In-room recovery services' },
              { text: 'Spa collaborations' },
              { text: 'Wellness concierge' },
            ],
          },
          {
            icon: 'brand',
            title: 'Brand Collaborations',
            description:
              'Partner with us on co-branded experiences, events, and activations that align with wellness and mindful living.',
            features: [
              { text: 'Co-branded events' },
              { text: 'Product collaborations' },
              { text: 'Influencer partnerships' },
              { text: 'Content creation' },
            ],
          },
        ],
      },
      whyPartner: {
        image: { media: mediaId('about-exterior.webp'), alt: 'TAVU Wellness Studio' },
        eyebrow: 'Benefits',
        heading: 'Why Partner with TAVU',
        items: [
          {
            title: 'Premium Positioning',
            description: "Align with a premium wellness brand in Abu Dhabi's growing health and fitness market",
          },
          { title: 'Engaged Community', description: 'Access to our dedicated community of wellness-minded individuals and professionals' },
          { title: 'Flexible Programs', description: 'Customizable partnership structures tailored to your specific goals and needs' },
          { title: 'Expert Support', description: 'Work with our experienced team to create impactful wellness programs' },
        ],
      },
      cta: {
        enabled: true,
        heading: "Let's Work Together",
        text: "We're always looking for like-minded partners who share our passion for wellness. Get in touch to discuss collaboration opportunities.",
        buttons: [{ link: { label: 'Contact Us', href: '/contact', newTab: false }, style: 'primary' }],
      },
      seo: {
        title: 'Partnerships & Corporate Wellness',
        description:
          'Partner with TAVÚ in Abu Dhabi — corporate wellness programmes, athlete and team recovery, brand collaborations and customizable partnership structures.',
        keywords: [
          'corporate wellness Abu Dhabi',
          'athlete recovery partnership UAE',
          'brand collaboration wellness Abu Dhabi',
          'team recovery Abu Dhabi',
        ],
        ogTitle: 'Partnerships at TAVÚ',
        ogDescription: 'Collaborate with TAVÚ to bring wellness to your organization or brand.',
        robots: 'index-follow',
      },
    },
  });

  await payload.updateGlobal({
    slug: 'contact-page',
    context,
    overrideAccess: true,
    data: {
      hero: { eyebrow: 'Contact', headingLead: "Let's", headingEmphasis: 'Connect', intro: 'Start your wellness journey with us' },
      imageCard: { image: { media: mediaId('about-exterior.webp'), alt: 'TAVU Wellness Studio' }, caption: 'Visit the Sanctuary' },
      tiles: {
        locationLabel: 'Location',
        hoursLabel: 'Hours',
        phoneLabel: 'Phone',
        emailLabel: 'Email',
        whatsappLabel: 'Chat Now',
      },
      form: {
        nameLabel: 'Name',
        namePlaceholder: 'Your name',
        emailLabel: 'Email',
        emailPlaceholder: 'your@email.com',
        messageLabel: 'Message',
        messagePlaceholder: 'How can we help you?',
        submitLabel: 'Send Message',
        submittingLabel: 'Opening WhatsApp...',
        footnote: "You'll be redirected to WhatsApp to continue the conversation",
        whatsappTemplate:
          'Hello TAVU,\n\nI would like to get in touch.\n\nName: {name}\nEmail: {email}\n\nMessage:\n{message}\n\n---\nSent from tavustudio.com',
        errors: {
          name: 'Name must be at least 2 characters',
          email: 'Please enter a valid email address',
          message: 'Message must be at least 10 characters',
        },
      },
      map: { title: 'TAVÚ Wellness Studio' },
      seo: {
        title: 'Contact TAVÚ Studio | Al Raha, Abu Dhabi',
        description:
          "Get in touch with TAVÚ Studio in Al Raha, Abu Dhabi. WhatsApp, email, Instagram @tavuwellness.studio. We're here to help you start your wellness journey.",
        ogTitle: 'Contact TAVÚ Studio',
        ogDescription: 'Reach us via WhatsApp, email or Instagram.',
        robots: 'index-follow',
      },
    },
  });

  await payload.updateGlobal({
    slug: 'register-page',
    context,
    overrideAccess: true,
    data: {
      hero: {
        eyebrow: 'Start Your Journey',
        title: 'Join the TAVU Community',
        intro:
          'Create your account to unlock a world of mindful movement, transformative breathwork, and restorative recovery experiences.',
      },
      benefits: {
        heading: 'Why Join TAVU?',
        items: [
          {
            icon: 'instant-booking',
            title: 'Instant Booking',
            description: 'Reserve your spot in classes and recovery sessions with just a few taps',
          },
          {
            icon: 'track-journey',
            title: 'Track Your Journey',
            description: 'Monitor attendance, progress, and celebrate your wellness milestones',
          },
          {
            icon: 'manage-packages',
            title: 'Manage Packages',
            description: 'View remaining classes, purchase new packs, and manage memberships',
          },
          {
            icon: 'exclusive-access',
            title: 'Exclusive Access',
            description: 'Get early access to events, collaborations, and member-only promotions',
          },
        ],
      },
      perks: {
        heading: 'Member Perks',
        items: [
          { text: 'Priority booking for popular classes' },
          { text: 'Personalized class recommendations' },
          { text: 'Digital receipts and booking history' },
          { text: 'Easy cancellation and rescheduling' },
          { text: 'Earn rewards with every visit' },
          { text: 'Birthday and anniversary specials' },
        ],
      },
      formCard: {
        heading: 'Create Your Account',
        text: 'Fill in your details below to get started. It only takes a minute.',
        signInPrompt: 'Already have an account?',
        signInLink: { label: 'Sign in here', href: '/account', newTab: false },
      },
      trustBadges: {
        items: [
          { icon: 'shield', label: 'Secure & Encrypted' },
          { icon: 'lock', label: 'Privacy Protected' },
          { icon: 'bolt', label: 'Powered by Mindbody' },
        ],
      },
      cta: {
        enabled: true,
        heading: 'Ready to Transform Your Wellness?',
        text: 'Join hundreds of members who have discovered the TAVU difference. Your journey to balanced well-being starts with a single step.',
        buttons: [
          { link: { label: 'Explore Classes', href: '/classes', newTab: false }, style: 'primary' },
          { link: { label: 'View Pricing', href: '/pricing', newTab: false }, style: 'outline' },
        ],
      },
      quickLinks: {
        items: [
          { icon: 'faq', title: 'Have Questions?', text: 'Contact our team', href: '/contact' },
          { icon: 'schedule', title: 'View Schedule', text: 'See upcoming classes', href: '/schedule' },
          { icon: 'about', title: 'Learn About Us', text: 'Our story & values', href: '/about' },
        ],
      },
      seo: {
        title: 'Create Your Account',
        description: 'Create your TAVÚ account to book classes, manage packages and track your wellness journey.',
        robots: 'noindex-follow',
      },
    },
  });

  await payload.updateGlobal({
    slug: 'account-page',
    context,
    overrideAccess: true,
    data: {
      hero: {
        eyebrow: 'Member Portal',
        headingLead: 'Your',
        headingEmphasis: 'Account',
        intro: 'Access your bookings, manage packages, and track your wellness journey.',
      },
      loginCard: {
        heading: 'Welcome Back',
        subheading: 'Sign in to your TAVÚ account',
        signInLabel: 'Sign In to Your Account',
        widgetInnerText: 'Sign In',
        dividerLabel: 'or',
        createAccount: { label: 'Create New Account', href: '/register', newTab: false },
        helpPrefix: 'Need help?',
        helpLink: { label: 'Contact us', href: '/contact', newTab: false },
      },
      features: {
        heading: 'What You Can Do',
        intro: 'Manage your entire wellness experience in one place',
        items: [
          { icon: 'book-classes', title: 'Book Classes', description: 'Reserve your spot in Reformer Pilates and Breathing Room sessions' },
          { icon: 'view-history', title: 'View History', description: 'Track your attendance and see your wellness journey progress' },
          { icon: 'manage-packages', title: 'Manage Packages', description: 'Check remaining classes and purchase new class packs' },
          { icon: 'book-recovery', title: 'Book Recovery', description: 'Schedule Contrast Therapy and massage appointments' },
        ],
      },
      quickActions: {
        enabled: true,
        heading: 'Ready to Book?',
        text: 'Browse our schedule and reserve your spot in a class or recovery session.',
        buttons: [
          { link: { label: 'View Schedule', href: '/schedule', newTab: false }, icon: 'calendar' },
          { link: { label: 'View Pricing', href: '/pricing', newTab: false }, icon: 'currency' },
        ],
      },
      trustBadges: {
        items: [
          { icon: 'shield', label: 'Secure Login' },
          { icon: 'lock', label: 'Data Protected' },
          { icon: 'bolt', label: 'Powered by Mindbody' },
        ],
      },
      seo: {
        title: 'Your Account',
        description: 'Access your TAVÚ bookings, manage packages and track your wellness journey.',
        robots: 'noindex-nofollow',
      },
    },
  });

  payload.logger.info('seedCommunity: 5 page globals upserted (events, partnerships, contact, register, account)');
}

async function seedLegalPages(payload: Payload): Promise<void> {
  const editorConfig = await editorConfigFactory.default({ config: payload.config });

  const [termsMarkdown, privacyMarkdown] = await Promise.all([
    readFile(path.resolve(process.cwd(), 'src/payload/seed/legal/terms-of-service.md'), 'utf-8'),
    readFile(path.resolve(process.cwd(), 'src/payload/seed/legal/privacy-policy.md'), 'utf-8'),
  ]);

  await upsertLegalPage(payload, 'terms-of-service', {
    title: 'Terms of Service',
    lastUpdated: new Date('2026-10-01').toISOString(),
    body: convertMarkdownToLexical({ editorConfig, markdown: termsMarkdown }),
    contactCard: {
      enabled: true,
      organisationName: 'TAVU Wellness Studio',
      addressLines: [{ line: 'Al Raha Blvd, Al Seef' }, { line: 'Abu Dhabi, United Arab Emirates' }],
      showEmail: true,
      showWhatsapp: true,
      hoursNote: 'Operating Hours: 9:00 AM – 9:00 PM, 7 days a week',
    },
    seo: {
      title: 'Terms of Service',
      description:
        'Terms and conditions for classes, appointments, packages and memberships at TAVÚ Wellness Studio, Al Raha, Abu Dhabi — including booking, cancellation and refund policies.',
      ogTitle: 'Terms of Service | TAVÚ Studio',
      ogDescription: 'Booking, cancellation, membership and refund terms for TAVÚ Wellness Studio.',
      robots: 'index-follow',
    },
  });

  await upsertLegalPage(payload, 'privacy-policy', {
    title: 'Privacy Policy',
    lastUpdated: new Date('2025-01-01').toISOString(),
    body: convertMarkdownToLexical({ editorConfig, markdown: privacyMarkdown }),
    contactCard: {
      enabled: true,
      organisationName: 'TAVU Wellness Studio',
      addressLines: [{ line: 'Al Raha Blvd, Al Seef' }, { line: 'Abu Dhabi, United Arab Emirates' }],
      showEmail: true,
      showWhatsapp: true,
      hoursNote: '',
    },
    seo: {
      title: 'Privacy Policy',
      description: 'How TAVÚ Wellness Studio collects, uses, stores and protects your personal data, and the rights you have over it.',
      ogTitle: 'Privacy Policy | TAVÚ Studio',
      ogDescription: 'How TAVÚ Wellness Studio handles and protects your personal data.',
      robots: 'index-follow',
    },
  });

  payload.logger.info('seedCommunity: 2 legal pages upserted (terms-of-service, privacy-policy)');
}

export async function seedCommunity(payload: Payload): Promise<void> {
  await seedEvents(payload);
  await seedPageGlobals(payload);
  await seedLegalPages(payload);

  payload.logger.info('seedCommunity: done (4 events, 5 page globals, 2 legal pages)');
}
