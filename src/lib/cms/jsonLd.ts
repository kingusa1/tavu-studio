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
  location?: { locality?: string | null; region?: string | null; country?: string | null } | null;
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
    name: settings.brand?.siteName,
    alternateName: settings.brand?.alternateName,
    description: sd.description,
    url: settings.brand?.siteUrl,
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
