import type { CollectionBeforeChangeHook, CollectionBeforeValidateHook, CollectionConfig, Field, GroupField } from 'payload';

import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { image } from '../fields/image';
import { richTextField } from '../fields/richText';
import { seo } from '../fields/seo';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite';
import { validateTokensCollection } from '../hooks/validateTokens';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Fills `slug` from `title` when empty and normalises whatever the editor typed to lowercase
 * words joined by hyphens, so a slug can never break a URL, the sitemap or the RSS feed.
 * Runs before validation so the required check sees the generated value.
 */
const autoSlug: CollectionBeforeValidateHook = ({ data, operation, originalDoc }) => {
  if (!data) return data;
  if (typeof data.slug === 'string' && data.slug.trim()) return { ...data, slug: slugify(data.slug) };
  // Only a new post (or one that never had a slug) takes its slug from the title; a published
  // post keeps its URL when someone edits just the title.
  if ((operation === 'create' || !originalDoc?.slug) && typeof data.title === 'string' && data.title.trim()) {
    return { ...data, slug: slugify(data.title) };
  }
  return data;
};

/** `publishedAt` defaults to "now" the first time a post is published (brief §A). */
const setPublishedAt: CollectionBeforeChangeHook = ({ data }) => {
  if (!data) return data;
  if (data._status === 'published' && !data.publishedAt) {
    return { ...data, publishedAt: new Date().toISOString() };
  }
  return data;
};

// coverImage is required, and its alt text must be required too (brief §A) — image() leaves
// `alt` optional by default, so the nested field is replaced here rather than editing the
// shared helper for every other caller.
const coverImage = image({ name: 'coverImage', required: true }) as GroupField;
coverImage.fields = coverImage.fields.map((field: Field) =>
  'name' in field && field.name === 'alt' ? ({ ...field, required: true } as Field) : field,
);

/**
 * Blog posts (package E, brief §A). Read is logged-in only (brief §0) — public blog pages read
 * through the Local API with `overrideAccess: true` AND filter `_status: { equals: 'published' }`
 * themselves (src/lib/cms/posts.ts), so a draft is never served to an anonymous visitor even
 * though the Local API call bypasses the collection's access control.
 */
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: 'Blog',
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', '_status', 'publishedAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  versions: { drafts: { schedulePublish: true }, maxPerDoc: 50 },
  hooks: {
    beforeValidate: [autoSlug, validateTokensCollection],
    beforeChange: [setPublishedAt],
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Auto-generated from the title. Editable — used in the URL: /blog/<slug>.' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: { description: '1-2 sentences, ~150-160 characters. Shown on the blog list and used as the fallback SEO description.' },
    },
    coverImage,
    richTextField('body', 'post', {
      required: true,
      admin: { description: 'Headings, lists, links, quotes and inline images.' },
    }),
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
    },
    {
      name: 'reviewedBy',
      type: 'relationship',
      relationTo: 'authors',
      admin: { description: 'The expert who checked this article, if different from the author. Optional.' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      index: true,
      admin: { description: 'Defaults to now the first time the post is published.' },
    },
    {
      name: 'faq',
      type: 'array',
      admin: { description: 'Optional. Rendered as an FAQ section at the end of the article, with FAQPage JSON-LD.' },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    {
      name: 'sources',
      type: 'array',
      admin: { description: 'Optional. Rendered as a sources list at the end of the article.' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
    },
    seo(),
  ],
};
