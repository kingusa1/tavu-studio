// Server-only (package E owns this, blog brief §A). `categories` read access is logged-in only
// (brief §0); public pages use `overrideAccess: true`. Categories themselves have no draft
// state, so no extra filter is needed on the category doc — only on the posts inside it.

import { cache } from 'react';

import type { Category } from '@/payload-types';

import { getCategorySlugsWithPublishedPosts } from './posts';
import { getPayloadClient } from './payload';

export const getCategoryBySlug = cache(async (slug: string): Promise<Category | null> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
    overrideAccess: true,
  });
  return (docs[0] as Category | undefined) ?? null;
});

/** Every category, for the blog list's category-chip filter bar. */
export const getAllCategories = cache(async (): Promise<Category[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 0,
    sort: 'title',
    overrideAccess: true,
  });
  return docs as Category[];
});

/** Categories that have at least one published post — sitemap + internal-link eligibility. */
export const getCategoriesWithPublishedPosts = cache(async (): Promise<Category[]> => {
  const ids = await getCategorySlugsWithPublishedPosts();
  if (ids.size === 0) return [];
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'categories',
    where: { id: { in: [...ids] } },
    depth: 0,
    limit: 0,
    sort: 'title',
    overrideAccess: true,
  });
  return docs as Category[];
});

/** One category by its `title`, matched loosely — used to link a service page to "its" blog category (brief §D8). */
export const getCategoryByTitle = cache(async (title: string): Promise<Category | null> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'categories',
    where: { title: { equals: title } },
    depth: 0,
    limit: 1,
    overrideAccess: true,
  });
  return (docs[0] as Category | undefined) ?? null;
});
