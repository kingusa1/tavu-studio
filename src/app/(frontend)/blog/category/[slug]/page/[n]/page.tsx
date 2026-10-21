import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BlogListingView from '@/components/blog/BlogListingView';
import { getCategoryBySlug } from '@/lib/cms/categories';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';

type Props = { params: Promise<{ slug: string; n: string }> };

function parsePage(n: string): number {
  const page = Number.parseInt(n, 10);
  return Number.isFinite(page) && page > 0 ? page : NaN;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, n } = await params;
  const [category, { settings }] = await Promise.all([getCategoryBySlug(slug), getSiteData()]);
  const base = buildMetadata(category?.seo, {
    path: `/blog/category/${slug}/page/${n}`,
    fallback: { ...settings.seo, titleDefault: category ? `${category.title} Articles` : settings.seo.titleDefault, description: category?.description },
  });
  return { ...base, title: base.title ? `${String(base.title)} – Page ${n}` : undefined };
}

export default async function BlogCategoryPagedPage({ params }: Props) {
  const { slug, n } = await params;
  const page = parsePage(n);
  if (!page || page === 1) notFound();
  return <BlogListingView categorySlug={slug} page={page} />;
}
