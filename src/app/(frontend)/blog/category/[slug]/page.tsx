import type { Metadata } from 'next';

import BlogListingView from '@/components/blog/BlogListingView';
import { getCategoryBySlug } from '@/lib/cms/categories';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [category, { settings }] = await Promise.all([getCategoryBySlug(slug), getSiteData()]);
  return buildMetadata(category?.seo, {
    path: `/blog/category/${slug}`,
    fallback: { ...settings.seo, titleDefault: category ? `${category.title} Articles` : settings.seo.titleDefault, description: category?.description },
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  return <BlogListingView categorySlug={slug} page={1} />;
}
