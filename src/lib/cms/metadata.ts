// Server-only: builds a Next.js `Metadata` object from a page's `seo()` field group plus the
// site-settings SEO defaults fallback (§4.1). Reproduces today's shape exactly (R6).

import type { Metadata } from 'next';

import type { Media } from '@/payload-types';

import { resolveImage } from './media';

export type SeoFieldValue = {
  title?: string | null;
  description?: string | null;
  keywords?: string[] | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: Media | number | null;
  robots?: 'index-follow' | 'noindex-follow' | 'noindex-nofollow' | null;
} | null | undefined;

export type SeoDefaults = {
  titleDefault?: string | null;
  description?: string | null;
  keywords?: string[] | null;
  ogImage?: Media | number | null;
  ogImageAlt?: string | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
} | null | undefined;

function nonEmpty(values: (string[] | null | undefined)[]): string[] | undefined {
  for (const value of values) {
    if (value && value.length > 0) return value;
  }
  return undefined;
}

/**
 * `title` stays a plain string (not `{ default, template }`) so the root `title.template`
 * ("%s | TAVÚ Studio") still applies (§4.1, R6). A route-level `openGraph` replaces the root one
 * entirely, so `type` is set here (`website`, or what `openGraph` passes — e.g. `article` with its
 * publish/modify times for a blog post); `images` are added only when an image resolves.
 */
export function buildMetadata(
  seo: SeoFieldValue,
  { path, fallback, openGraph }: { path: string; fallback?: SeoDefaults; openGraph?: Metadata['openGraph'] },
): Metadata {
  const title = seo?.title || fallback?.titleDefault || undefined;
  const description = seo?.description || fallback?.description || undefined;
  const keywords = nonEmpty([seo?.keywords, fallback?.keywords]);
  const ogTitle = seo?.ogTitle || title;
  const ogDescription = seo?.ogDescription || description;
  const resolvedOgImage = resolveImage({
    media: seo?.ogImage ?? fallback?.ogImage,
    alt: fallback?.ogImageAlt,
  });
  const twitterTitle = ogTitle || fallback?.twitterTitle || undefined;
  const twitterDescription = ogDescription || fallback?.twitterDescription || undefined;

  const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title: ogTitle,
      description: ogDescription,
      url: path,
      ...(resolvedOgImage
        ? { images: [{ url: resolvedOgImage.src, width: resolvedOgImage.width, height: resolvedOgImage.height, alt: resolvedOgImage.alt }] }
        : {}),
      ...openGraph,
    } as Metadata['openGraph'],
    twitter: {
      card: resolvedOgImage ? 'summary_large_image' : 'summary',
      title: twitterTitle,
      description: twitterDescription,
      ...(resolvedOgImage ? { images: [resolvedOgImage.src] } : {}),
    },
  };

  if (keywords) metadata.keywords = keywords;

  if (seo?.robots && seo.robots !== 'index-follow') {
    metadata.robots = seo.robots === 'noindex-follow' ? { index: false, follow: true } : { index: false, follow: false };
  }

  return metadata;
}
