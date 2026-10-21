// Seeds the 4 site-wide globals with today's exact copy (§3.1-§3.4). `updateGlobal` is
// idempotent by nature (a global is a singleton — it creates the doc on first write and
// updates it on every write after), so re-running this is always safe.

import type { Payload } from 'payload';

import { mediaId } from './media';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

export async function seedSite(payload: Payload): Promise<void> {
  const context = { disableRevalidate: true };

  await payload.updateGlobal({
    slug: 'site-settings',
    context,
    overrideAccess: true,
    data: {
      brand: {
        siteName: 'TAVÚ Studio',
        alternateName: 'TAVU Studio',
        legalName: 'TAVÚ Wellness Studio',
        siteUrl: 'https://tavustudio.com',
        logo: mediaId('logo.png'),
        logoAlt: 'TAVÚ Wellness',
        backgroundImage: mediaId('background.webp'),
      },
      contact: {
        phoneDisplay: '+971 52 275 5551',
        phoneE164: '+971522755551',
        whatsappNumber: '971522755551',
        email: 'connect@tavustudio.com',
      },
      location: {
        addressLines: [
          { line: 'Shop 1, Crescent Residence' },
          { line: 'Plot 12, Sector RBW4, Shatie Al Raha' },
          { line: 'Abu Dhabi, UAE' },
        ],
        addressShortLines: [{ line: 'Crescent Residence' }, { line: 'Al Raha Beach' }],
        locality: 'Al Raha',
        region: 'Abu Dhabi',
        country: 'AE',
        mapsUrl: 'https://maps.app.goo.gl/Xg1JCDsDxwxMkjad9?g_st=ic',
        mapEmbedUrl: 'https://maps.google.com/maps?q=CHXW%2BC3R+Abu+Dhabi&t=&z=17&ie=UTF8&iwloc=&output=embed',
      },
      hours: {
        displayLines: [{ line: 'Monday – Sunday' }, { line: '9:00 AM – 9:00 PM' }],
        summary: '9:00 AM – 9:00 PM, 7 days a week',
        opens: '09:00',
        closes: '21:00',
        days: [...WEEKDAYS],
      },
      social: {
        instagramUrl: 'https://www.instagram.com/tavuwellness.studio',
        instagramHandle: 'tavuwellness.studio',
        tiktokUrl: 'https://www.tiktok.com/@tavuwellness.studio',
        facebookUrl: 'https://www.facebook.com/people/TAV%C3%9A-Wellness/61580985467215/',
      },
      pricing: {
        vatNote: 'All prices are in AED and exclude VAT.',
        currencyLabel: 'AED',
      },
      priceCards: [
        { category: 'reformer', title: 'Reformer', subtitle: 'Small-group reformer classes', ctaLabel: 'Book Reformer', ctaHref: '/schedule' },
        { category: 'breathing-room', title: 'Breathing Room', subtitle: 'TAVÚ MAT, RELEASE and STRETCH', ctaLabel: 'Book Your Mat', ctaHref: '/schedule' },
        { category: 'contrast', title: 'Contrast Therapy', subtitle: 'Sauna + Ice Bath', ctaLabel: 'Book Contrast Therapy', ctaHref: '/appointments' },
        { category: 'compression', title: 'Compression Therapy', subtitle: 'NormaTec', ctaLabel: 'Book Compression Therapy', ctaHref: '/appointments' },
        { category: 'massage', title: 'Massage', subtitle: 'Ladies Only', ctaLabel: 'Book Massage', ctaHref: '/appointments' },
        { category: 'bundle', title: 'Bundles', subtitle: 'Ladies Only', ctaLabel: 'Book a Bundle', ctaHref: '/contact' },
        { category: 'membership', title: 'Memberships', subtitle: '', ctaLabel: 'Inquire About Memberships', ctaHref: '/contact' },
      ],
      mindbody: {
        scheduleWidgetId: 'dc43537beda',
        appointmentsWidgetId: 'dc53226beda',
        registrationWidgetId: 'dc166478beda',
        loginSiteId: '130043',
        loginMbSiteId: '5748977',
      },
      facts: [
        { key: 'reformer-capacity', value: '8' },
        { key: 'reformer-duration', value: '50' },
        { key: 'contrast-duration', value: '60' },
        { key: 'compression-duration', value: '45' },
        { key: 'cold-plunge-temp', value: '5–8°C' },
      ],
      seo: {
        titleDefault: "TAVÚ | Abu Dhabi's First Private Reformer Pilates & Contrast Therapy Studio",
        titleTemplate: '%s | TAVÚ Studio',
        description:
          "TAVÚ — Abu Dhabi's first private space for Reformer Pilates and Contrast Therapy. Small-group reformer, mat, release & stretch classes, sauna + ice bath, NormaTec compression & massage in Al Raha.",
        keywords: [
          'Reformer Pilates Abu Dhabi',
          'Contrast Therapy Abu Dhabi',
          'Ice Bath Abu Dhabi',
          'Sauna Abu Dhabi',
          'Pilates Al Raha',
          'Wellness Studio Abu Dhabi',
          'NormaTec Abu Dhabi',
          'Massage Abu Dhabi',
          'Mat Pilates Abu Dhabi',
          'TAVU Studio',
        ],
        ogTitle: "TAVÚ | Abu Dhabi's First Private Reformer Pilates & Contrast Therapy Studio",
        ogDescription: 'Reformer Pilates paired with Contrast Therapy as part of the method. TA — stillness. VU — flow. The balance of both.',
        // Package E (SEO brief §D1): seeded with the same image the static /opengraph-image.png
        // served before the CMS — og:image/twitter:image was missing on 19 of 20 live routes
        // because every route's own `openGraph` object replaces the root one instead of
        // merging with it (Next.js shallow-merge behaviour). `buildMetadata()`'s fallback now
        // carries this image onto every route that doesn't set its own.
        ogImage: mediaId('opengraph-image.png'),
        ogImageAlt: 'TAVÚ Studio — Abu Dhabi',
        twitterTitle: "TAVÚ | Abu Dhabi's First Private Reformer Pilates & Contrast Therapy Studio",
        twitterDescription: 'Reformer Pilates paired with Contrast Therapy as part of the method. Book your session at TAVÚ.',
        locale: 'en_AE',
      },
      structuredData: {
        description:
          "Abu Dhabi's first private space for Reformer Pilates and Contrast Therapy. Small-group reformer, mat, release and stretch classes, sauna + ice bath, NormaTec compression and massage.",
        logoUrl: 'https://tavustudio.com/logo.png',
        imageUrl: 'https://tavustudio.com/opengraph-image.png',
        priceRange: '{price:breathing-drop-in} AED - {price:reformer-50-class-pack} AED',
        currenciesAccepted: 'AED',
        paymentAccepted: 'Credit Card, Debit Card',
        areaServed: 'Abu Dhabi',
        aggregates: [
          {
            source: 'massage-rituals',
            name: 'Massage (Ladies Only)',
            description:
              'FLOW Relaxation, RELEASE Deep Tissue, RECOVER Sports and DRAIN Lymphatic full-body rituals (60 or 90 minutes), targeted recovery rituals, ROOTED foot reflexology and the 3-hour Recovery Escape. Ritual Packs 5 + 1 included.',
          },
          {
            source: 'offers',
            category: 'membership',
            name: 'Recovery Memberships (Reset & Ritual Unlimited)',
            description:
              'Reset Membership AED 820 (valid 30 days): 4 Contrast Therapy sessions, 1 Compression Therapy session, a complimentary chair massage. Ritual Unlimited Membership AED 1,390 (valid 45 days): Contrast Therapy with 2 × 30-minute Compression Therapy sessions and 2 complimentary 30-minute chair massages. Choice of Main or Private Contrast.',
          },
        ],
      },
      llms: {
        title: 'TAVÚ Wellness Studio',
        summary:
          "TAVÚ is Abu Dhabi's first private space pairing Reformer Pilates with Contrast Therapy. Located in Al Raha, Abu Dhabi, UAE. The name reflects the method: TA — stillness, VU — flow. Open 9am–9pm, 7 days a week.",
        intro:
          'TAVÚ offers small-group Reformer Pilates (max 8 participants), mat-based Breathing Room classes (TAVÚ MAT, RELEASE and STRETCH), Contrast Therapy (infrared sauna + ice bath), NormaTec compression therapy, and ladies-only massage. All prices are in UAE Dirhams (AED) and exclude VAT.',
        keyPages: [
          { label: 'Home', path: 'https://tavustudio.com/', description: 'Overview of the studio and the TAVÚ method.' },
          { label: 'Pricing', path: 'https://tavustudio.com/pricing', description: 'Full price list for every service, package and membership.' },
          { label: 'Classes', path: 'https://tavustudio.com/classes', description: 'Reformer and Breathing Room class packages.' },
          { label: 'Schedule', path: 'https://tavustudio.com/schedule', description: 'Live class timetable and booking.' },
          { label: 'Appointments', path: 'https://tavustudio.com/appointments', description: 'Book Contrast Therapy, Compression and Massage.' },
          { label: 'Memberships', path: 'https://tavustudio.com/memberships', description: 'Reset and Ritual Unlimited recovery memberships.' },
          {
            label: 'Events',
            path: 'https://tavustudio.com/events',
            description: 'Special events, collaborations, private events, community gatherings and sound healing.',
          },
          { label: 'About', path: 'https://tavustudio.com/about', description: 'The studio, the space and the philosophy.' },
          { label: 'Method', path: 'https://tavustudio.com/method', description: 'The TAVÚ progression system.' },
          { label: 'Contact', path: 'https://tavustudio.com/contact', description: 'Location, hours and enquiries.' },
          { label: 'Blog', path: 'https://tavustudio.com/blog', description: 'Articles on Reformer Pilates, Breathing Room, Contrast Therapy, Compression Therapy and recovery.' },
          { label: 'FAQ', path: 'https://tavustudio.com/faq', description: 'Answers about classes, sessions, memberships, pricing and booking.' },
          { label: 'Editorial Policy', path: 'https://tavustudio.com/editorial-policy', description: 'How TAVÚ writes, reviews and corrects its blog articles.' },
        ],
        sectionHeadings: [
          { key: 'servicesPricing', heading: 'Services & Pricing (AED, VAT excluded)' },
          { key: 'reformer', heading: 'Reformer Pilates' },
          { key: 'breathingRoom', heading: 'Breathing Room (TAVÚ MAT, RELEASE and STRETCH)' },
          { key: 'contrast', heading: 'Contrast Therapy (Sauna + Cold Plunge)' },
          { key: 'compression', heading: 'Compression Therapy (NormaTec)' },
          { key: 'massage', heading: 'Massage (Ladies Only)' },
          { key: 'bundles', heading: 'Recovery Bundles (Ladies Only)' },
          { key: 'memberships', heading: 'Memberships' },
          { key: 'classes', heading: 'Classes' },
        ],
        massageGroupIntros: [
          { group: 'full-body', line: 'Full-body rituals (60 or 90 minutes; Ritual Pack 5 + 1 Included, valid 45 days):' },
          { group: 'targeted', line: 'Targeted recovery rituals (60 min; 30-min version sold as a 150 add-on; Ritual Pack 5 + 1):' },
        ],
        policiesBlock: [
          '- Bookings are made through the website or the Mindbody app.',
          '- Please arrive at least 10 minutes before your session.',
          '- Class cancellations must be made at least 12 hours before the scheduled class time.',
          '- A minimum of 4 participants is required for each class to proceed; classes that do not meet the minimum may be cancelled.',
          '- Arriving 10 minutes or more after the start time means entry to the class will not be permitted.',
          '- Full terms: https://tavustudio.com/terms-of-service',
        ].join('\n'),
        notesForAi: [
          '- Prices and policies above are maintained on https://tavustudio.com/pricing and https://tavustudio.com/terms-of-service — treat those pages as authoritative if they differ from this file.',
          '- TAVÚ is written with an acute accent on the U (TAVÚ); "TAVU Studio" is an accepted alternate spelling.',
          '- Massage services and recovery bundles are ladies-only.',
        ].join('\n'),
      },
      announcement: {
        enabled: false,
        text: '',
        link: { label: '', href: '', newTab: false },
      },
      analytics: {
        metaPixelId: '1164915742135661',
      },
    },
  });

  await payload.updateGlobal({
    slug: 'header',
    context,
    overrideAccess: true,
    data: {
      dropdowns: [
        {
          label: 'Services',
          items: [
            { title: 'Reformer Pilates', description: 'Small-group reformer classes', href: '/services/reformer-pilates', icon: 'lines' },
            { title: 'Breathing Room', description: 'Mat, release & stretch classes', href: '/services/breathing-room', icon: 'chat-bubble' },
            { title: 'Contrast Therapy', description: 'Sauna + Ice Bath sessions', href: '/services/contrast-therapy', icon: 'heart' },
            { title: 'Compression Therapy', description: 'NormaTec recovery', href: '/services/compression-therapy', icon: 'bolt' },
            { title: 'Massage', description: 'Therapeutic & relaxation massage', href: '/services/massage', icon: 'heart' },
          ],
        },
        {
          label: 'About',
          items: [
            { title: 'Our Story', description: 'The TAVU philosophy & vision', href: '/about', icon: 'building' },
            { title: 'Blog', description: 'Articles on wellness & recovery', href: '/blog', icon: 'sparkles' },
            { title: 'Contact', description: 'Get in touch with us', href: '/contact', icon: 'mail' },
          ],
        },
        {
          label: 'Community',
          items: [
            { title: 'Events', description: 'Special events, collaborations & community', href: '/events', icon: 'calendar' },
            { title: 'Memberships', description: 'Exclusive member benefits', href: '/memberships', icon: 'sparkles' },
            { title: 'Partnerships', description: 'Corporate & brand collaborations', href: '/partnerships', icon: 'briefcase' },
          ],
        },
      ],
      login: { label: 'Login', mobileLabel: 'Login to Account', href: '/account', ariaLabel: 'Login to account' },
      register: { label: 'Register', mobileLabel: 'Create Account', href: '/register' },
      secondaryCta: { label: 'Classes', href: '/schedule', newTab: false },
      primaryCta: { label: 'Appointments', href: '/appointments', newTab: false },
    },
  });

  await payload.updateGlobal({
    slug: 'footer',
    context,
    overrideAccess: true,
    data: {
      taglineLines: [{ line: 'TA grounds the body. VU lifts the spirit.' }, { line: 'TAVÚ is the space where both are practiced as one.' }],
      columns: [
        {
          heading: 'Explore',
          links: [
            { label: 'About', href: '/about', newTab: false },
            { label: 'Services', href: '/services', newTab: false },
            { label: 'Classes', href: '/classes', newTab: false },
            { label: 'Blog', href: '/blog', newTab: false },
          ],
        },
        {
          heading: 'Connect',
          links: [
            { label: 'Memberships', href: '/memberships', newTab: false },
            { label: 'Events', href: '/events', newTab: false },
            { label: 'Partnerships', href: '/partnerships', newTab: false },
            { label: 'Contact', href: '/contact', newTab: false },
          ],
        },
      ],
      visitUs: { heading: 'Visit Us', mapsLinkLabel: 'View on Google Maps', hoursHeading: 'Opening Hours' },
      copyright: '{year} TAVÚ Wellness Studio. All rights reserved.',
      legalLinks: [
        { label: 'Privacy Policy', href: '/privacy-policy', newTab: false },
        { label: 'Terms of Service', href: '/terms-of-service', newTab: false },
        { label: 'Editorial Policy', href: '/editorial-policy', newTab: false },
      ],
    },
  });

  await payload.updateGlobal({
    slug: 'system-pages',
    context,
    overrideAccess: true,
    data: {
      notFound: {
        code: '404',
        heading: 'Page Not Found',
        textLine1: 'The path you are looking for has wandered off.',
        textLine2: 'Let us guide you back to the center.',
        button: { label: 'Return Home', href: '/', newTab: false },
      },
      error: {
        heading: 'Something went wrong!',
        text: 'We encountered an unexpected issue. Please try again or return to the calmness of our homepage.',
        retryLabel: 'Try again',
        homeLabel: 'Return Home',
      },
      loading: { text: 'Breathing in...' },
    },
  });

  payload.logger.info('seedSite: site-settings, header, footer, system-pages upserted');
}
