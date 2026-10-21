import type { CollectionConfig } from 'payload';

import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { richTextField } from '../fields/richText';
import { deliverNewsletterIssue } from '../hooks/deliverNewsletterIssue';

/**
 * Newsletter issues written in the CMS and sent through Resend to everyone in the newsletter
 * segment. Workflow: write → "Send a test" to yourself → "Send to all subscribers" (once).
 */
export const NewsletterIssues: CollectionConfig = {
  slug: 'newsletter-issues',
  labels: { singular: 'Newsletter issue', plural: 'Newsletter issues' },
  admin: {
    group: 'Newsletter',
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'status', 'sentAt', 'updatedAt'],
    description: 'Write an issue, send a test to yourself, then send it to all subscribers. An issue can only be sent once.',
  },
  access: {
    read: isAdminOrEditor,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  versions: { maxPerDoc: 25 },
  hooks: { beforeChange: [deliverNewsletterIssue] },
  fields: [
    { name: 'subject', type: 'text', required: true, maxLength: 120, admin: { description: 'The email subject line. Aim for under 50 characters.' } },
    { name: 'preheader', label: 'Preview text', type: 'text', maxLength: 140, admin: { description: 'Shown next to the subject in most inboxes.' } },
    { name: 'heading', type: 'text', required: true, maxLength: 140 },
    { name: 'coverImage', label: 'Cover photo (optional)', type: 'upload', relationTo: 'media' },
    richTextField('content', 'legal', { required: true } as never),
    { name: 'ctaLabel', label: 'Button text (optional)', type: 'text' },
    { name: 'ctaUrl', label: 'Button link (optional)', type: 'text' },
    {
      name: 'action',
      label: 'What should happen when you save?',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'Just save', value: 'none' },
        { label: 'Send a test to the address below', value: 'test' },
        { label: 'Send to ALL subscribers now', value: 'send' },
      ],
      admin: {
        position: 'sidebar',
        description: '“Send to ALL subscribers” cannot be undone. Send yourself a test first.',
        condition: (data) => data?.status !== 'sent',
      },
    },
    { name: 'testEmail', label: 'Test address', type: 'email', admin: { position: 'sidebar', condition: (data) => data?.status !== 'sent' } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Sent', value: 'sent' },
      ],
      admin: { readOnly: true, position: 'sidebar' },
    },
    { name: 'lastTestSentAt', type: 'date', admin: { readOnly: true, position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'sentAt', type: 'date', admin: { readOnly: true, position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'broadcastId', label: 'Resend broadcast ID', type: 'text', admin: { readOnly: true, position: 'sidebar' } },
  ],
};
