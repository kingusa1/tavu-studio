// Google News sitemap (developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap,
// read 2026-10-21): only articles published in the last 2 days, one <news:news> block per <url>,
// <news:publication><news:name> must match the name shown on the articles themselves — reuses
// `settings.brand.siteName`, the same name `buildBlogPostingJsonLd`'s `publisher` node carries.
// `<news:publication_date>` is the ORIGINAL publish time in W3C format with an explicit timezone
// offset — reuses `toAbuDhabiIso` (UAE has no daylight saving, so Abu Dhabi is always UTC+4),
// the same helper the BlogPosting JSON-LD uses for `datePublished`/`dateModified`. A valid empty
// `<urlset>` is returned when there are no recent posts (Google: "Empty sitemaps ... generate a
// warning, but otherwise do not cause any problems").
//
// `force-static` + hourly revalidation + on-change revalidation via `revalidateSite` (not a page under the root layout — same
// reasoning as `/sitemap.xml` and `/blog/feed.xml`, §5.4).

import { toAbuDhabiIso } from '@/lib/cms/jsonLd';
import { getRecentPublishedPostsForNewsSitemap } from '@/lib/cms/posts';
import { getSiteData } from '@/lib/cms/site';

export const dynamic = 'force-static';
// Also rebuilt every hour, so an article drops out once it is older than two days even when no
// content changes in the meantime.
export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(): Promise<Response> {
  const [{ settings }, posts] = await Promise.all([getSiteData(), getRecentPublishedPostsForNewsSitemap()]);
  const siteUrl = settings.brand.siteUrl ?? 'https://tavustudio.com';
  const siteName = settings.brand.siteName ?? 'TAVÚ Studio';

  const urlBlocks = posts
    .map((post) => {
      const loc = escapeXml(`${siteUrl}/blog/${post.slug}`);
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        '    <news:news>',
        '      <news:publication>',
        `        <news:name>${escapeXml(siteName)}</news:name>`,
        '        <news:language>en</news:language>',
        '      </news:publication>',
        // `post.publishedAt` is guaranteed here — `getRecentPublishedPostsForNewsSitemap` already
        // filters out any published post that somehow lacks one.
        `      <news:publication_date>${toAbuDhabiIso(post.publishedAt as string)}</news:publication_date>`,
        `      <news:title>${escapeXml(post.title)}</news:title>`,
        '    </news:news>',
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">',
    urlBlocks,
    '</urlset>',
    '',
  ]
    .filter(Boolean)
    .join('\n');

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
