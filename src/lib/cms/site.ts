// Server-only: one call per request for every site-wide global (§5.2 D6), passed to
// `SiteDataProvider` so client components (Header, Footer, VatNote, BackgroundImage,
// MindbodyWidget) never fetch on their own.

import type { GlobalSlug } from 'payload';

import type { Media } from '@/payload-types';

import { getGlobal } from './globals';

export type LinkValue = { label?: string | null; href?: string | null; newTab?: boolean | null } | null;

export type SiteSettingsData = {
  brand: {
    siteName?: string | null;
    alternateName?: string | null;
    legalName?: string | null;
    siteUrl?: string | null;
    logo?: Media | number | null;
    logoAlt?: string | null;
    backgroundImage?: Media | number | null;
  };
  contact: {
    phoneDisplay?: string | null;
    phoneE164?: string | null;
    whatsappNumber?: string | null;
    email?: string | null;
  };
  location: {
    addressLines?: Array<{ line?: string | null }> | null;
    addressShortLines?: Array<{ line?: string | null }> | null;
    locality?: string | null;
    region?: string | null;
    country?: string | null;
    mapsUrl?: string | null;
    mapEmbedUrl?: string | null;
  };
  hours: {
    displayLines?: Array<{ line?: string | null }> | null;
    summary?: string | null;
    opens?: string | null;
    closes?: string | null;
    days?: string[] | null;
  };
  social: {
    instagramUrl?: string | null;
    instagramHandle?: string | null;
    tiktokUrl?: string | null;
    facebookUrl?: string | null;
  };
  pricing: { vatNote?: string | null; currencyLabel?: string | null };
  priceCards?: Array<{
    category?: string | null;
    title?: string | null;
    subtitle?: string | null;
    ctaLabel?: string | null;
    ctaHref?: string | null;
  }> | null;
  mindbody: {
    scheduleWidgetId?: string | null;
    appointmentsWidgetId?: string | null;
    registrationWidgetId?: string | null;
    loginSiteId?: string | null;
    loginMbSiteId?: string | null;
  };
  facts?: Array<{ key?: string | null; value?: string | null }> | null;
  seo: {
    titleDefault?: string | null;
    titleTemplate?: string | null;
    description?: string | null;
    keywords?: string[] | null;
    ogTitle?: string | null;
    ogDescription?: string | null;
    ogImage?: Media | number | null;
    ogImageAlt?: string | null;
    twitterTitle?: string | null;
    twitterDescription?: string | null;
    locale?: string | null;
  };
  structuredData: {
    description?: string | null;
    logoUrl?: string | null;
    imageUrl?: string | null;
    priceRange?: string | null;
    currenciesAccepted?: string | null;
    paymentAccepted?: string | null;
    areaServed?: string | null;
    aggregates?: Array<{ source?: string | null; category?: string | null; name?: string | null; description?: string | null }> | null;
  };
  llms: {
    title?: string | null;
    summary?: string | null;
    intro?: string | null;
    keyPages?: Array<{ label?: string | null; path?: string | null; description?: string | null }> | null;
    sectionHeadings?: Array<{ key?: string | null; heading?: string | null }> | null;
    massageGroupIntros?: Array<{ group?: string | null; line?: string | null }> | null;
    policiesBlock?: string | null;
    notesForAi?: string | null;
  };
  announcement: { enabled?: boolean | null; text?: string | null; link?: LinkValue };
  analytics: { metaPixelId?: string | null };
};

export type HeaderData = {
  dropdowns?: Array<{
    label?: string | null;
    items?: Array<{ title?: string | null; description?: string | null; href?: string | null; icon?: string | null }> | null;
  }> | null;
  login?: { label?: string | null; mobileLabel?: string | null; href?: string | null; ariaLabel?: string | null } | null;
  register?: { label?: string | null; mobileLabel?: string | null; href?: string | null } | null;
  secondaryCta?: LinkValue;
  primaryCta?: LinkValue;
};

export type FooterData = {
  taglineLines?: Array<{ line?: string | null }> | null;
  columns?: Array<{ heading?: string | null; links?: Array<{ label?: string | null; href?: string | null; newTab?: boolean | null }> | null }> | null;
  visitUs?: { heading?: string | null; mapsLinkLabel?: string | null; hoursHeading?: string | null } | null;
  copyright?: string | null;
  legalLinks?: Array<{ label?: string | null; href?: string | null; newTab?: boolean | null }> | null;
};

export type SystemPagesData = {
  notFound?: { code?: string | null; heading?: string | null; textLine1?: string | null; textLine2?: string | null; button?: LinkValue } | null;
  error?: { heading?: string | null; text?: string | null; retryLabel?: string | null; homeLabel?: string | null } | null;
  loading?: { text?: string | null } | null;
};

export type SiteData = {
  settings: SiteSettingsData;
  header: HeaderData;
  footer: FooterData;
  system: SystemPagesData;
};

/** One call per request (§5.2 D6) — fetches and token-resolves every site-wide global. */
export async function getSiteData(): Promise<SiteData> {
  const [settings, header, footer, system] = await Promise.all([
    getGlobal<SiteSettingsData>('site-settings' as GlobalSlug),
    getGlobal<HeaderData>('header' as GlobalSlug),
    getGlobal<FooterData>('footer' as GlobalSlug),
    getGlobal<SystemPagesData>('system-pages' as GlobalSlug),
  ]);

  return { settings, header, footer, system };
}
