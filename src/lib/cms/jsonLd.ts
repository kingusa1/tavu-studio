// Server-only: reproduces the HealthClub JSON-LD at (today's) layout.tsx:132-278, with keys
// in the same order (§5.5). Fed by package B's offers/rituals queries; `settings` is read
// after `getGlobal()` has already resolved its tokens, so `structuredData.priceRange` here is
// already plain text.

import { formatAed } from './format';

const OFFER_CATEGORY_ORDER = ['reformer', 'breathing-room', 'contrast', 'compression'] as const;

export type JsonLdOffer = {
  category: string;
  sortOrder: number;
  active: boolean;
  price: number;
  structuredData?: {
    mode?: 'none' | 'offer';
    name?: string | null;
    description?: string | null;
  } | null;
};

export type JsonLdRitual = {
  active: boolean;
  price: number;
};

export type JsonLdAggregate = {
  source?: string | null;
  category?: string | null;
  name?: string | null;
  description?: string | null;
};

export type JsonLdSettings = {
  brand?: { siteName?: string | null; alternateName?: string | null; siteUrl?: string | null } | null;
  contact?: { phoneE164?: string | null; email?: string | null } | null;
  location?: { locality?: string | null; region?: string | null; country?: string | null; mapsUrl?: string | null } | null;
  social?: { instagramUrl?: string | null; tiktokUrl?: string | null } | null;
  hours?: { days?: string[] | null; opens?: string | null; closes?: string | null } | null;
  structuredData?: {
    description?: string | null;
    logoUrl?: string | null;
    imageUrl?: string | null;
    priceRange?: string | null;
    currenciesAccepted?: string | null;
    paymentAccepted?: string | null;
    areaServed?: string | null;
    aggregates?: JsonLdAggregate[] | null;
  } | null;
};

function aggregateBounds(rows: Array<{ active: boolean; price: number }>): { lowPrice: number; highPrice: number; offerCount: string } | null {
  const active = rows.filter((row) => row.active);
  if (active.length === 0) return null;
  const prices = active.map((row) => row.price);
  return {
    lowPrice: Math.min(...prices),
    highPrice: Math.max(...prices),
    offerCount: String(active.length),
  };
}

export function buildJsonLd({
  settings,
  offers,
  rituals,
}: {
  settings: JsonLdSettings;
  offers: JsonLdOffer[];
  rituals: JsonLdRitual[];
}): Record<string, unknown> {
  const sd = settings.structuredData ?? {};
  const siteUrl = settings.brand?.siteUrl ?? 'https://tavustudio.com';
  const orgId = `${siteUrl}#organization`;

  const offerItems = offers
    .filter((offer) => offer.active && offer.structuredData?.mode === 'offer')
    .sort((a, b) => {
      const categoryDiff = OFFER_CATEGORY_ORDER.indexOf(a.category as (typeof OFFER_CATEGORY_ORDER)[number]) -
        OFFER_CATEGORY_ORDER.indexOf(b.category as (typeof OFFER_CATEGORY_ORDER)[number]);
      return categoryDiff !== 0 ? categoryDiff : a.sortOrder - b.sortOrder;
    })
    .map((offer) => ({
      '@type': 'Offer',
      price: formatAed(offer.price, 'schema'),
      priceCurrency: 'AED',
      itemOffered: {
        '@type': 'Service',
        name: offer.structuredData?.name ?? '',
        description: offer.structuredData?.description ?? '',
      },
    }));

  const aggregateItems = (sd.aggregates ?? []).flatMap((aggregate) => {
    const rows = aggregate.source === 'massage-rituals' ? rituals : offers.filter((offer) => offer.category === aggregate.category);
    const bounds = aggregateBounds(rows);
    if (!bounds) return [];
    return [
      {
        '@type': 'AggregateOffer',
        lowPrice: formatAed(bounds.lowPrice, 'schema'),
        highPrice: formatAed(bounds.highPrice, 'schema'),
        priceCurrency: 'AED',
        offerCount: bounds.offerCount,
        itemOffered: {
          '@type': 'Service',
          name: aggregate.name ?? '',
          description: aggregate.description ?? '',
        },
      },
    ];
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    '@id': orgId,
    name: settings.brand?.siteName,
    alternateName: settings.brand?.alternateName,
    description: sd.description,
    url: siteUrl,
    ...(settings.location?.mapsUrl ? { hasMap: settings.location.mapsUrl } : {}),
    logo: sd.logoUrl,
    image: sd.imageUrl,
    telephone: settings.contact?.phoneE164,
    address: {
      '@type': 'PostalAddress',
      addressLocality: settings.location?.locality,
      addressRegion: settings.location?.region,
      addressCountry: settings.location?.country,
    },
    sameAs: [settings.social?.instagramUrl, settings.social?.tiktokUrl].filter(Boolean),
    email: settings.contact?.email,
    priceRange: sd.priceRange,
    currenciesAccepted: sd.currenciesAccepted,
    paymentAccepted: sd.paymentAccepted,
    areaServed: { '@type': 'City', name: sd.areaServed },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: settings.hours?.days,
        opens: settings.hours?.opens,
        closes: settings.hours?.closes,
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'TAVÚ Services',
      itemListElement: [...offerItems, ...aggregateItems],
    },
  };
}

/** The HealthClub node's `@id`, reusable by every other JSON-LD node's `provider`/`publisher`. */
export function organizationId(siteUrl: string): string {
  return `${siteUrl}#organization`;
}

/**
 * Sitewide `WebSite` node (brief §D5) — deliberately no `potentialAction`/`SearchAction`, since
 * the site has no search feature.
 */
export function buildWebSiteJsonLd({ settings }: { settings: JsonLdSettings }): Record<string, unknown> {
  const siteUrl = settings.brand?.siteUrl ?? 'https://tavustudio.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.brand?.siteName,
    url: siteUrl,
    publisher: { '@id': organizationId(siteUrl) },
  };
}

/** `BreadcrumbList` for one route — every item after Home gets `path` resolved against `siteUrl` (brief §D5). */
export function buildBreadcrumbJsonLd({
  siteUrl,
  items,
}: {
  siteUrl: string;
  items: Array<{ name: string; path: string }>;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export type ServiceOffer = { name: string; price: number };

/** One `Service` node per service page (brief §D5) — `provider` points at the HealthClub `@id`. */
export function buildServiceJsonLd({
  siteUrl,
  name,
  description,
  areaServed,
  offers,
}: {
  siteUrl: string;
  name: string;
  description?: string | null;
  areaServed?: string | null;
  offers: ServiceOffer[];
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description: description ?? undefined,
    provider: { '@id': organizationId(siteUrl) },
    areaServed: areaServed ?? undefined,
    offers: offers.map((offer) => ({
      '@type': 'Offer',
      name: offer.name,
      priceCurrency: 'AED',
      price: formatAed(offer.price, 'schema'),
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'AED',
        price: formatAed(offer.price, 'schema'),
        valueAddedTaxIncluded: false,
      },
    })),
  };
}

/** `Blog` node for `/blog` (brief §D5). */
export function buildBlogJsonLd({ siteUrl, name }: { siteUrl: string; name: string }): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name,
    url: `${siteUrl}/blog`,
    publisher: { '@id': organizationId(siteUrl) },
  };
}

/**
 * UAE has no daylight saving, so Abu Dhabi local time is always UTC+4 — this reformats a stored
 * UTC timestamp into an ISO 8601 string carrying an explicit `+04:00` offset (brief §D5, Google's
 * Article guidance: https://developers.google.com/search/docs/appearance/structured-data/article).
 */
export function toAbuDhabiIso(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  const shifted = new Date(date.getTime() + 4 * 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  const y = shifted.getUTCFullYear();
  const m = pad(shifted.getUTCMonth() + 1);
  const d = pad(shifted.getUTCDate());
  const hh = pad(shifted.getUTCHours());
  const mm = pad(shifted.getUTCMinutes());
  const ss = pad(shifted.getUTCSeconds());
  return `${y}-${m}-${d}T${hh}:${mm}:${ss}+04:00`;
}

export type BlogPostingInput = {
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl?: string | null;
  publishedAt?: string | null;
  updatedAt: string;
  authorName: string;
  authorSlug?: string | null;
  authorSameAs?: string[];
  categoryNames?: string[];
};

/**
 * `BlogPosting` for one article (brief §D5), reviewed against Google's Article guidance
 * (developers.google.com/search/docs/appearance/structured-data/article, read 2026-10-21):
 * - `image`: an array of absolute URLs (Google shows images as a repeated list, not a bare string).
 * - `publisher`: a full `Organization` object with `name` and a `logo` `ImageObject` — a bare
 *   `{'@id': ...}` reference depends on a crawler merging this page's *separate* HealthClub
 *   `<script>` block (root layout) by `@id`, which isn't guaranteed, so the name/logo are
 *   inlined directly (the `@id` is kept alongside so a crawler that *does* support graph merging
 *   still links the two nodes).
 * - `author`: kept as `name` + `url` (+ `sameAs`), matching Google's recommendation.
 * - `mainEntityOfPage`: kept — Google's own Article examples include it.
 */
export function buildBlogPostingJsonLd({
  siteUrl,
  publisherName,
  publisherLogoUrl,
  post,
}: {
  siteUrl: string;
  publisherName?: string | null;
  publisherLogoUrl?: string | null;
  post: BlogPostingInput;
}): Record<string, unknown> {
  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    datePublished: post.publishedAt ? toAbuDhabiIso(post.publishedAt) : undefined,
    dateModified: toAbuDhabiIso(post.updatedAt),
    author: {
      '@type': 'Person',
      name: post.authorName,
      url: post.authorSlug ? `${siteUrl}/blog/author/${post.authorSlug}` : undefined,
      sameAs: post.authorSameAs && post.authorSameAs.length > 0 ? post.authorSameAs : undefined,
    },
    publisher: {
      '@type': 'Organization',
      '@id': organizationId(siteUrl),
      name: publisherName ?? undefined,
      logo: publisherLogoUrl
        ? {
            '@type': 'ImageObject',
            url: publisherLogoUrl,
          }
        : undefined,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: post.categoryNames && post.categoryNames.length > 0 ? post.categoryNames : undefined,
    inLanguage: 'en',
  };
}

/** `FAQPage` for exactly the FAQ items visible on the page (brief §C/§D5). */
export function buildFaqPageJsonLd(faqs: Array<{ question: string; answer: string }>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export type JsonLdEventInput = {
  name: string;
  description?: string | null;
  startDate: string;
  endDate?: string | null;
  imageUrl?: string | null;
};

/** `Event` node — brief §D5: only for events on `/events` that have a real `startDate` in the CMS. */
export function buildEventJsonLd({ siteUrl, event }: { siteUrl: string; event: JsonLdEventInput }): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description ?? undefined,
    startDate: toAbuDhabiIso(event.startDate),
    endDate: event.endDate ? toAbuDhabiIso(event.endDate) : undefined,
    image: event.imageUrl ?? undefined,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: { '@id': organizationId(siteUrl) },
  };
}
