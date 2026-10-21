import type { CollectionAfterChangeHook, CollectionConfig } from 'payload';

import { unsubscribeContact } from '../../lib/email/resendApi';
import { isAdmin } from '../access/isAdmin';
import { isAdminOrEditor } from '../access/isAdminOrEditor';

/** When someone is marked "Unsubscribed" in the CMS, mirror it in Resend so broadcasts skip them. */
const syncUnsubscribe: CollectionAfterChangeHook = async ({ doc, previousDoc, operation, req, context }) => {
  if (operation !== 'update' || context?.fromNewsletterRoute) return doc;
  if (doc.status === 'unsubscribed' && previousDoc?.status !== 'unsubscribed') {
    try {
      await unsubscribeContact(doc.email);
    } catch (error) {
      req.payload.logger.error({ msg: 'Resend unsubscribe sync failed', subscriberId: doc.id, err: String(error) });
    }
  }
  return doc;
};

/**
 * Newsletter subscribers with their consent record. People join only through the double opt-in
 * form on the site (/api/newsletter/subscribe → confirmation email → /api/newsletter/confirm), so
 * the CMS keeps proof of when and where each person agreed. Sending happens from "Newsletter issues".
 */
export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  labels: { singular: 'Subscriber', plural: 'Subscribers' },
  admin: {
    group: 'Newsletter',
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'status', 'source', 'confirmedAt'],
    description: 'People who signed up for the newsletter on the website. Only “Subscribed” people receive issues.',
  },
  access: {
    read: isAdminOrEditor,
    create: isAdmin,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: { afterChange: [syncUnsubscribe] },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true, index: true },
    { name: 'firstName', label: 'First name', type: 'text' },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      index: true,
      options: [
        { label: 'Waiting for confirmation', value: 'pending' },
        { label: 'Subscribed', value: 'subscribed' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'source', type: 'text', admin: { readOnly: true, position: 'sidebar', description: 'Where they signed up, e.g. “blog”.' } },
    {
      name: 'consent',
      type: 'group',
      admin: { readOnly: true },
      fields: [
        { name: 'text', label: 'Consent wording they agreed to', type: 'textarea' },
        { name: 'givenAt', label: 'Signed up at', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
      ],
    },
    { name: 'confirmedAt', type: 'date', index: true, admin: { readOnly: true, position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'unsubscribedAt', type: 'date', admin: { readOnly: true, position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'resendContactId', label: 'Resend contact ID', type: 'text', admin: { readOnly: true, position: 'sidebar' } },
    // Double opt-in bookkeeping — never shown or returned by the API.
    { name: 'confirmTokenHash', type: 'text', index: true, hidden: true },
    { name: 'confirmTokenExpiresAt', type: 'date', hidden: true },
    { name: 'confirmEmailSentAt', type: 'date', hidden: true },
  ],
};
