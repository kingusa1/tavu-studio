// RSS 2.0 feed of the 20 latest published posts (brief §A). `force-static` + revalidation via
// `revalidateSite` (`/blog/feed.xml` is a route handler, not a page under the root layout — same
// reasoning as `/llms.txt`, §5.4).

import { getLatestPublishedPosts } from '@/lib/cms/posts';
import { getSiteData } from '@/lib/cms/site';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(): Promise<Response> {
  const [{ settings }, posts] = await Promise.all([getSiteData(), getLatestPublishedPosts(20)]);
  const siteUrl = settings.brand.siteUrl ?? 'https://tavustudio.com';
  const siteName = settings.brand.siteName ?? 'TAVÚ Studio';
  const lastBuildDate = posts[0]?.publishedAt ? new Date(posts[0].publishedAt).toUTCString() : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const pubDate = post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date(post.createdAt).toUTCString();
      const url = escapeXml(`${siteUrl}/blog/${post.slug}`);
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(post.excerpt)}</description>`,
        `      <pubDate>${pubDate}</pubDate>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    `    <title>${escapeXml(`${siteName} Blog`)}</title>`,
    `    <link>${siteUrl}/blog</link>`,
    `    <description>${escapeXml('Articles on Reformer Pilates, Breathing Room, Contrast Therapy, Compression Therapy and recovery from ' + siteName + '.')}</description>`,
    '    <language>en</language>',
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
