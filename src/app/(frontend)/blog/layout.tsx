import type { Metadata } from 'next';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';

import type { BlogPageData } from '@/components/blog/BlogListingView';

export async function generateMetadata(): Promise<Metadata> {
  const [data, { settings }] = await Promise.all([getGlobal<BlogPageData>('blog-page'), getSiteData()]);
  const base = buildMetadata(data.seo, { path: '/blog', fallback: settings.seo });
  return {
    ...base,
    alternates: { ...base.alternates, types: { 'application/rss+xml': '/blog/feed.xml' } },
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
