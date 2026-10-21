import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BlogListingView, { type BlogPageData } from '@/components/blog/BlogListingView';
import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';

type Props = { params: Promise<{ n: string }> };

function parsePage(n: string): number {
  const page = Number.parseInt(n, 10);
  return Number.isFinite(page) && page > 0 ? page : NaN;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { n } = await params;
  const page = parsePage(n);
  const [data, { settings }] = await Promise.all([getGlobal<BlogPageData>('blog-page'), getSiteData()]);
  const base = buildMetadata(data.seo, { path: `/blog/page/${n}`, fallback: settings.seo });
  return { ...base, title: base.title ? `${String(base.title)} – Page ${page}` : undefined };
}

export default async function BlogPagedPage({ params }: Props) {
  const { n } = await params;
  const page = parsePage(n);
  // Page 1 lives at /blog — redirecting there would be nicer, but a 404 keeps exactly one URL
  // per page's content (no duplicate-content canonical to manage).
  if (!page || page === 1) notFound();
  return <BlogListingView page={page} />;
}
