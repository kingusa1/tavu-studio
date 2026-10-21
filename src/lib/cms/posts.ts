// Server-only (package E owns this, blog brief §A). Public pages read through the Local API
// with `overrideAccess: true` and filter `_status: { equals: 'published' }` themselves — the
// collection's own `read` access is logged-in only (brief §0), so an anonymous REST/GraphQL
// call sees nothing, but this trusted server-side query must still never leak a draft.

import { cache } from 'react';
import type { Where } from 'payload';

import type { Post } from '@/payload-types';

import { getPayloadClient } from './payload';

export const BLOG_PAGE_SIZE = 9;

export type PostList = {
  docs: Post[];
  totalDocs: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

function toIdNumber(value: number | { id: number }): number {
  return typeof value === 'number' ? value : value.id;
}

/** Published posts, newest first, optionally scoped to one category slug. */
export const getPublishedPosts = cache(
  async ({
    categorySlug,
    page = 1,
    limit = BLOG_PAGE_SIZE,
  }: { categorySlug?: string; page?: number; limit?: number } = {}): Promise<PostList> => {
    const payload = await getPayloadClient();

    let categoryId: number | undefined;
    if (categorySlug) {
      const { docs } = await payload.find({
        collection: 'categories',
        where: { slug: { equals: categorySlug } },
        depth: 0,
        limit: 1,
        overrideAccess: true,
      });
      categoryId = docs[0]?.id;
      if (!categoryId) {
        return { docs: [], totalDocs: 0, totalPages: 0, page: 1, hasNextPage: false, hasPrevPage: false };
      }
    }

    const where: Where = categoryId
      ? { and: [{ _status: { equals: 'published' } }, { categories: { equals: categoryId } }] }
      : { _status: { equals: 'published' } };

    const result = await payload.find({
      collection: 'posts',
      where,
      sort: '-publishedAt',
      depth: 1,
      page,
      limit,
      overrideAccess: true,
    });

    return {
      docs: result.docs as Post[],
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      page: result.page ?? 1,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
    };
  },
);

/** One published post by slug, depth 2 so `relatedPosts`/`author`/`reviewedBy` are populated. */
export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'posts',
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    depth: 2,
    limit: 1,
    overrideAccess: true,
  });
  const post = (docs[0] as Post | undefined) ?? null;
  if (!post) return post;
  // Defensive: a manually-curated relatedPosts row could point at a post that was since
  // unpublished. Never surface it.
  return {
    ...post,
    relatedPosts: (post.relatedPosts ?? []).filter(
      (related) => typeof related !== 'number' && related._status === 'published',
    ),
  };
});

/** Newest N published posts — used by the RSS feed and llms.txt. */
export const getLatestPublishedPosts = cache(async (limit = 20): Promise<Post[]> => {
  const { docs } = await getPublishedPosts({ limit, page: 1 });
  return docs;
});

/** Every published post's slug + updatedAt — used by `sitemap.ts`. */
export const getPublishedPostsForSitemap = cache(async (): Promise<Array<Pick<Post, 'slug' | 'updatedAt'>>> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    depth: 0,
    limit: 0,
    sort: '-publishedAt',
    overrideAccess: true,
  });
  return (docs as Post[]).map((doc) => ({ slug: doc.slug, updatedAt: doc.updatedAt }));
});

/** Slugs of every category that has at least one published post — sitemap + internal links. */
export const getCategorySlugsWithPublishedPosts = cache(async (): Promise<Set<number>> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    depth: 0,
    limit: 0,
    overrideAccess: true,
  });
  const ids = new Set<number>();
  (docs as Post[]).forEach((doc) => (doc.categories ?? []).forEach((category) => ids.add(toIdNumber(category))));
  return ids;
});

/** Ids of every author with at least one published post — sitemap. */
export const getAuthorIdsWithPublishedPosts = cache(async (): Promise<Set<number>> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    depth: 0,
    limit: 0,
    overrideAccess: true,
  });
  const ids = new Set<number>();
  (docs as Post[]).forEach((doc) => ids.add(toIdNumber(doc.author)));
  return ids;
});
