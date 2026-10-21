// Server-only (package E owns this, blog brief §A). `authors` read access is logged-in only
// (brief §0); public pages use `overrideAccess: true`.

import { cache } from 'react';

import type { Author } from '@/payload-types';

import { getPayloadClient } from './payload';
import { getPublishedPosts } from './posts';

export const getAuthorBySlug = cache(async (slug: string): Promise<Author | null> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'authors',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
    overrideAccess: true,
  });
  return (docs[0] as Author | undefined) ?? null;
});

/** Published posts written by one author, newest first — `/blog/author/[slug]`. */
export const getPostsByAuthorId = cache(async (authorId: number, limit = 50) => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: 'posts',
    where: { and: [{ _status: { equals: 'published' } }, { author: { equals: authorId } }] },
    sort: '-publishedAt',
    depth: 1,
    limit,
    overrideAccess: true,
  });
  return docs;
});
