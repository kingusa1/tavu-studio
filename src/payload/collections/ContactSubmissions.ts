import type { CollectionConfig } from 'payload';

import { isAdmin } from '../access/isAdmin';

/**
 * Public visitors never write here directly through Payload's REST/access-control path —
 * src/app/(frontend)/api/contact/route.ts creates documents via the Local API with
 * overrideAccess: true after its own zod validation + honeypot check. This collection holds
 * visitor PII, so read/update/delete are admin-only; create stays authenticated-only (in
 * practice the contact route bypasses it entirely via overrideAccess).
 */
export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'status', 'createdAt'],
  },
  access: {
    create: ({ req }) => Boolean(req.user),
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'page',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Read', value: 'read' },
        { label: 'Replied', value: 'replied' },
      ],
    },
  ],
};
