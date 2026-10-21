// Dynamic sitemap (brief §D3) — replaces the static `public/sitemap.xml` (deleted in this
// commit), whose every `lastmod` was frozen at 2026-07-30. It is rendered on every request,
// so it is always current (see the note on `dynamic` below).

import type { MetadataRoute } from 'next';

import { getCategoriesWithPublishedPosts } from '@/lib/cms/categories';
import { getPayloadClient } from '@/lib/cms/payload';
import { getAuthorIdsWithPublishedPosts, getPublishedPostsForSitemap } from '@/lib/cms/posts';
import { getSiteData } from '@/lib/cms/site';
import type { GlobalSlug } from 'payload';

// Rendered per request: on Vercel with Next 16.2+ a prerendered `/sitemap.xml` is deployed as a
// static file that neither `revalidatePath` nor `revalidate` ever rebuilds (vercel/next.js#99055;
// observed live 2026-10-21: 5 newly published posts missing while /blog/feed.xml had them).
// Crawlers fetch it rarely, so the few CMS reads per request are cheap.
export const dynamic = 'force-dynamic';

/** Static route -> the page global whose `updatedAt` should be used as `lastModified`. */
const STATIC_ROUTES: Array<{ path: string; global: GlobalSlug; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
  { path: '/', global: 'home-page', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', global: 'about-page', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/method', global: 'method-page', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/classes', global: 'classes-page', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/schedule', global: 'schedule-page', changeFrequency: 'daily', priority: 0.9 },
  { path: '/appointments', global: 'appointments-page', changeFrequency: 'daily', priority: 0.9 },
  { path: '/pricing', global: 'pricing-page', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/memberships', global: 'memberships-page', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/recovery', global: 'recovery-page', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services', global: 'services-page', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/reformer-pilates', global: 'reformer-pilates-page', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/services/breathing-room', global: 'breathing-room-page', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/services/contrast-therapy', global: 'contrast-therapy-page', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/services/compression-therapy', global: 'compression-therapy-page', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/services/massage', global: 'massage-page', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/events', global: 'events-page', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/partnerships', global: 'partnerships-page', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact', global: 'contact-page', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog', global: 'blog-page', changeFrequency: 'daily', priority: 0.8 },
];

/** Routes backed by a `legal-pages` collection doc, not a global — `lastModified` comes from that doc's own `updatedAt`. */
const LEGAL_ROUTES: Array<{ path: string; slug: string; priority: number }> = [
  { path: '/terms-of-service', slug: 'terms-of-service', priority: 0.3 },
  { path: '/privacy-policy', slug: 'privacy-policy', priority: 0.3 },
  { path: '/editorial-policy', slug: 'editorial-policy', priority: 0.3 },
];

async function globalUpdatedAt(slug: GlobalSlug): Promise<Date> {
  const payload = await getPayloadClient();
  try {
    const doc = await payload.findGlobal({ slug, depth: 0, overrideAccess: true });
    const updatedAt = (doc as { updatedAt?: string }).updatedAt;
    return updatedAt ? new Date(updatedAt) : new Date();
  } catch {
    return new Date();
  }
}

async function legalPageUpdatedAt(slug: string): Promise<Date | undefined> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'legal-pages',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
    overrideAccess: true,
  });
  const updatedAt = docs[0]?.updatedAt;
  return updatedAt ? new Date(updatedAt) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ settings }, posts, categories, authorIds] = await Promise.all([
    getSiteData(),
    getPublishedPostsForSitemap(),
    getCategoriesWithPublishedPosts(),
    getAuthorIdsWithPublishedPosts(),
  ]);
  const siteUrl = settings.brand.siteUrl ?? 'https://tavustudio.com';

  const staticEntries: MetadataRoute.Sitemap = await Promise.all(
    STATIC_ROUTES.map(async (route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified: await globalUpdatedAt(route.global),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  );

  const legalEntries: MetadataRoute.Sitemap = await Promise.all(
    LEGAL_ROUTES.map(async (route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified: await legalPageUpdatedAt(route.slug),
      changeFrequency: 'yearly' as const,
      priority: route.priority,
    })),
  );

  const faqEntry: MetadataRoute.Sitemap = [{ url: `${siteUrl}/faq`, changeFrequency: 'monthly', priority: 0.6 }];

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/blog/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  let authorEntries: MetadataRoute.Sitemap = [];
  if (authorIds.size > 0) {
    const payload = await getPayloadClient();
    const { docs: authors } = await payload.find({
      collection: 'authors',
      where: { id: { in: [...authorIds] } },
      depth: 0,
      limit: 0,
      overrideAccess: true,
    });
    authorEntries = authors.map((author) => ({
      url: `${siteUrl}/blog/author/${author.slug}`,
      lastModified: new Date(author.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.4,
    }));
  }

  return [...staticEntries, ...legalEntries, ...faqEntry, ...postEntries, ...categoryEntries, ...authorEntries];
}
