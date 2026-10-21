import type { CollectionConfig } from 'payload';

import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { image } from '../fields/image';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidateSite';

/**
 * Blog authors (package E, brief §A). Deliberately NOT linked to `users` — a user's email must
 * never be exposed on the public site. Read is logged-in only (brief §0); public pages read
 * through the Local API with `overrideAccess: true` (src/lib/cms/authors.ts).
 */
export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    group: 'Blog',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'role'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  versions: { maxPerDoc: 25 },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'person',
      options: [
        { label: 'A person', value: 'person' },
        { label: 'The studio (an organisation)', value: 'organization' },
      ],
      admin: { description: 'Search engines label the byline as a person or as an organisation — pick the one that is true.' },
    },
    { name: 'slug', type: 'text', required: true, unique: true, index: true, admin: { description: 'Used in the URL: /blog/author/<slug>.' } },
    { name: 'role', type: 'text', admin: { description: 'e.g. "Reformer instructor".' } },
    { name: 'credentials', type: 'text', admin: { description: 'e.g. certifications. Optional.' } },
    { name: 'bio', type: 'textarea' },
    image({ name: 'photo' }),
    {
      name: 'sameAs',
      type: 'array',
      admin: { description: 'Links to this person\'s other profiles (Instagram, LinkedIn, …). Optional.' },
      fields: [{ name: 'url', type: 'text' }],
    },
  ],
};
