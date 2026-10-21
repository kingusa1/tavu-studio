import type { CollectionConfig } from 'payload';

import { sendContactEmails } from '../hooks/sendContactEmails';
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
    defaultColumns: ['name', 'email', 'status', 'emailStatus', 'createdAt'],
    description: 'Messages from the website contact form. The team and the visitor are emailed automatically (see Site → Emails & Newsletter).',
  },
  hooks: {
    afterChange: [sendContactEmails],
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
      index: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'Read', value: 'read' },
        { label: 'Replied', value: 'replied' },
      ],
    },
    {
      name: 'emailStatus',
      label: 'Emails',
      type: 'select',
      options: [
        { label: 'Sent (team + visitor)', value: 'sent' },
        { label: 'Partly sent', value: 'partial' },
        { label: 'Failed', value: 'failed' },
        { label: 'Not sent (switched off)', value: 'skipped' },
      ],
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Filled in automatically after the message arrives.',
      },
    },
  ],
};
