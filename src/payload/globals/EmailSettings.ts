import type { Field, GlobalConfig } from 'payload';

import { EMAIL_DEFAULTS } from '../../lib/email/defaults';
import { isAdminOrEditor } from '../access/isAdminOrEditor';
import { revalidateGlobalAfterChange } from '../hooks/revalidateSite';

const SENDING_DOMAIN = process.env.RESEND_SENDING_DOMAIN || 'tavustudio.com';
const TOKENS_HINT = 'You can use {name} (their first name), {phone} and {email} (the studio’s WhatsApp number and email).';

function text(name: string, label: string, defaultValue: string, description?: string): Field {
  return { name, label, type: 'text', defaultValue, admin: description ? { description } : undefined };
}

function textarea(name: string, label: string, defaultValue: string, description?: string): Field {
  return { name, label, type: 'textarea', defaultValue, admin: { rows: 5, description } };
}

/**
 * Sender, recipients and wording of every email the website sends: the contact-form thank-you and
 * team notification, and the newsletter confirmation/welcome emails and pages. Readable only by
 * CMS users; the site reads it through the Local API.
 */
export const EmailSettings: GlobalConfig = {
  slug: 'email-settings',
  label: 'Emails & Newsletter',
  admin: {
    group: 'Site',
    description: 'Who website emails come from, who receives contact-form messages, and the wording of every automatic email.',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    update: isAdminOrEditor,
  },
  versions: { max: 25 },
  // The signup box wording is rendered into static pages.
  hooks: { afterChange: [revalidateGlobalAfterChange] },
  fields: [
    {
      name: 'sender',
      label: 'Sender',
      type: 'group',
      fields: [
        text('fromName', 'From name', EMAIL_DEFAULTS.sender.fromName),
        {
          name: 'fromAddress',
          label: 'From address',
          type: 'email',
          defaultValue: EMAIL_DEFAULTS.sender.fromAddress,
          admin: { description: `Must be an @${SENDING_DOMAIN} address (the domain verified in Resend). Replies go here too.` },
          validate: (value: string | null | undefined) =>
            !value || value.toLowerCase().endsWith(`@${SENDING_DOMAIN}`) || `Use an @${SENDING_DOMAIN} address.`,
        },
      ],
    },
    {
      name: 'contactForm',
      label: 'Contact form emails',
      type: 'group',
      fields: [
        { name: 'notifyTeam', label: 'Email the TAVÚ team about every new message', type: 'checkbox', defaultValue: true },
        {
          name: 'teamRecipients',
          label: 'Team recipients',
          type: 'array',
          // Short table name: the generated version-table indexes would pass Postgres's 63-character limit.
          dbName: 'email_cf_team_recipients',
          minRows: 1,
          defaultValue: EMAIL_DEFAULTS.contactForm.teamRecipients.map((row) => ({ ...row })),
          admin: { description: 'Every address here receives the message. Pressing “Reply” answers the visitor directly.' },
          fields: [{ name: 'email', type: 'email', required: true }],
        },
        text('teamSubject', 'Team email subject', EMAIL_DEFAULTS.contactForm.teamSubject, '{name} becomes the visitor’s name.'),
        { name: 'sendThankYou', label: 'Send the visitor a thank-you email', type: 'checkbox', defaultValue: true },
        text('thankYouSubject', 'Thank-you subject', EMAIL_DEFAULTS.contactForm.thankYouSubject),
        text('thankYouHeading', 'Thank-you heading', EMAIL_DEFAULTS.contactForm.thankYouHeading, TOKENS_HINT),
        textarea('thankYouBody', 'Thank-you text', EMAIL_DEFAULTS.contactForm.thankYouBody, `Leave an empty line between paragraphs. ${TOKENS_HINT}`),
        text('thankYouCtaLabel', 'Button text', EMAIL_DEFAULTS.contactForm.thankYouCtaLabel),
        text('thankYouCtaUrl', 'Button link', EMAIL_DEFAULTS.contactForm.thankYouCtaUrl),
      ],
    },
    {
      name: 'newsletter',
      label: 'Newsletter',
      type: 'group',
      fields: [
        {
          name: 'segmentId',
          label: 'Resend segment ID',
          type: 'text',
          // Written only by the server (overrideAccess); nobody can repoint broadcasts via the API.
          access: { update: () => false },
          admin: { readOnly: true, description: 'Filled in automatically when the first subscriber confirms. Newsletter issues are sent to this segment.' },
        },
        text('segmentName', 'Resend segment name', EMAIL_DEFAULTS.newsletter.segmentName),
        text('signupEyebrow', 'Signup box: small title', EMAIL_DEFAULTS.newsletter.signupEyebrow),
        text('signupHeading', 'Signup box: heading', EMAIL_DEFAULTS.newsletter.signupHeading),
        textarea('signupText', 'Signup box: text', EMAIL_DEFAULTS.newsletter.signupText),
        textarea('consentText', 'Signup box: consent line', EMAIL_DEFAULTS.newsletter.consentText),
        textarea('successText', 'Signup box: message after signing up', EMAIL_DEFAULTS.newsletter.successText),
        text('confirmSubject', 'Confirmation email: subject', EMAIL_DEFAULTS.newsletter.confirmSubject),
        text('confirmHeading', 'Confirmation email: heading', EMAIL_DEFAULTS.newsletter.confirmHeading, TOKENS_HINT),
        textarea('confirmBody', 'Confirmation email: text', EMAIL_DEFAULTS.newsletter.confirmBody, TOKENS_HINT),
        text('confirmCtaLabel', 'Confirmation email: button text', EMAIL_DEFAULTS.newsletter.confirmCtaLabel),
        text('welcomeSubject', 'Welcome email: subject', EMAIL_DEFAULTS.newsletter.welcomeSubject),
        text('welcomeHeading', 'Welcome email: heading', EMAIL_DEFAULTS.newsletter.welcomeHeading, TOKENS_HINT),
        textarea('welcomeBody', 'Welcome email: text', EMAIL_DEFAULTS.newsletter.welcomeBody, TOKENS_HINT),
        text('welcomeCtaLabel', 'Welcome email: button text', EMAIL_DEFAULTS.newsletter.welcomeCtaLabel),
        text('welcomeCtaUrl', 'Welcome email: button link', EMAIL_DEFAULTS.newsletter.welcomeCtaUrl),
        text('confirmedPageHeading', 'Page after confirming: heading', EMAIL_DEFAULTS.newsletter.confirmedPageHeading),
        textarea('confirmedPageText', 'Page after confirming: text', EMAIL_DEFAULTS.newsletter.confirmedPageText),
        text('unsubscribedPageHeading', 'Page after unsubscribing: heading', EMAIL_DEFAULTS.newsletter.unsubscribedPageHeading),
        textarea('unsubscribedPageText', 'Page after unsubscribing: text', EMAIL_DEFAULTS.newsletter.unsubscribedPageText),
        text('invalidPageHeading', 'Expired link page: heading', EMAIL_DEFAULTS.newsletter.invalidPageHeading),
        textarea('invalidPageText', 'Expired link page: text', EMAIL_DEFAULTS.newsletter.invalidPageText),
      ],
    },
    textarea('signOff', 'Sign-off under every email', EMAIL_DEFAULTS.signOff),
  ],
};
