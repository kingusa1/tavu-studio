import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig, FieldAccess } from 'payload';

import { deleteContact, unsubscribeContact } from '../../lib/email/resendApi';
import { isAdmin } from '../access/isAdmin';
import { isAdminOrEditor } from '../access/isAdminOrEditor';

const deny: FieldAccess = () => false;
const lockedField = { read: deny, create: deny, update: deny };

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
 * Deleting someone in the CMS (e.g. an erasure request) removes them from Resend too; otherwise
 * they would stay in the newsletter segment and keep receiving issues.
 */
const removeFromResend: CollectionAfterDeleteHook = async ({ doc, req }) => {
  try {
    await deleteContact(doc.email);
  } catch (error) {
    req.payload.logger.error({ msg: 'Resend contact delete failed', subscriberId: doc.id, err: String(error) });
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
  hooks: { afterChange: [syncUnsubscribe], afterDelete: [removeFromResend] },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
      // Fixed after signup: the Resend contact and the consent record belong to this address. A new
      // address signs up again through the website.
      access: { update: deny },
    },
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
    // Double opt-in bookkeeping: hidden in the admin and unreadable/unwritable through the API (field
    // access); only the newsletter routes touch them via the Local API (overrideAccess). Not `hidden:
    // true`, which would also strip them from the routes' own reads.
    { name: 'confirmTokenHash', type: 'text', index: true, admin: { hidden: true }, access: lockedField },
    { name: 'confirmTokenExpiresAt', type: 'date', admin: { hidden: true }, access: lockedField },
    { name: 'confirmEmailSentAt', type: 'date', admin: { hidden: true }, access: lockedField },
  ],
};
