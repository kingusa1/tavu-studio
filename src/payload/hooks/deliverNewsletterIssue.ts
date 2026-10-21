import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';
import { APIError, type CollectionBeforeChangeHook } from 'payload';

import { loadEmailContext } from '../../lib/email/context';
import { escapeHtml } from '../../lib/email/layout';
import { getNewsletterSegmentId } from '../../lib/email/newsletter';
import { sendBroadcast } from '../../lib/email/resendApi';
import { newsletterIssueEmail } from '../../lib/email/templates';

type IssueData = {
  subject?: string;
  preheader?: string | null;
  heading?: string;
  coverImage?: number | string | { id: number | string } | null;
  content?: unknown;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  action?: 'none' | 'test' | 'send' | null;
  testEmail?: string | null;
  status?: 'draft' | 'sent' | null;
};

/**
 * Runs the issue's "What should happen when you save?" action: send a test to one address, or send
 * the issue to every subscriber in the Resend newsletter segment (once). The action always resets
 * to "Just save" so a later save never re-sends.
 */
export const deliverNewsletterIssue: CollectionBeforeChangeHook = async ({ data, originalDoc, req }) => {
  const issue = { ...(originalDoc ?? {}), ...data } as IssueData;
  const action = issue.action ?? 'none';
  const next = { ...data, action: 'none' };
  if (action === 'none') return next;

  if (originalDoc?.status === 'sent') {
    throw new APIError('This issue was already sent to subscribers. Duplicate it to send a new one.', 400);
  }
  if (!issue.subject || !issue.heading || !issue.content) {
    throw new APIError('Add a subject, a heading and the content before sending.', 400);
  }

  const ctx = await loadEmailContext(req.payload);

  let coverHtml = '';
  const coverId = typeof issue.coverImage === 'object' && issue.coverImage ? issue.coverImage.id : issue.coverImage;
  if (coverId) {
    const media = (await req.payload.findByID({ collection: 'media', id: coverId, depth: 0, overrideAccess: true }).catch(() => null)) as {
      url?: string;
      alt?: string;
    } | null;
    if (media?.url) coverHtml = `<img src="${escapeHtml(media.url)}" alt="${escapeHtml(media.alt || '')}" width="504">`;
  }
  const contentHtml = coverHtml + convertLexicalToHTML({ data: issue.content as never });
  const email = newsletterIssueEmail(
    {
      subject: issue.subject,
      preheader: issue.preheader,
      heading: issue.heading,
      contentHtml,
      cta: issue.ctaLabel && issue.ctaUrl ? { label: issue.ctaLabel, url: issue.ctaUrl } : null,
    },
    ctx,
  );

  if (action === 'test') {
    if (!issue.testEmail) throw new APIError('Add a test address in the sidebar first.', 400);
    const preview = `${ctx.siteUrl}/newsletter`;
    await req.payload.sendEmail({
      from: ctx.from,
      to: issue.testEmail,
      replyTo: ctx.fromAddress,
      subject: `[Test] ${email.subject}`,
      html: email.html.replaceAll('{{{RESEND_UNSUBSCRIBE_URL}}}', preview),
      text: email.text.replaceAll('{{{RESEND_UNSUBSCRIBE_URL}}}', preview),
    });
    return { ...next, lastTestSentAt: new Date().toISOString() };
  }

  const subscribers = await req.payload.count({
    collection: 'newsletter-subscribers',
    where: { status: { equals: 'subscribed' } },
    overrideAccess: true,
  });
  if (subscribers.totalDocs === 0) {
    throw new APIError('There are no confirmed subscribers yet, so nothing was sent.', 400);
  }

  const segmentId = await getNewsletterSegmentId(req.payload, ctx);
  const sentAt = new Date();
  const broadcastId = await sendBroadcast({
    segmentId,
    from: ctx.from,
    replyTo: ctx.fromAddress,
    name: `${email.subject} — ${sentAt.toISOString().slice(0, 10)}`,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });
  return { ...next, status: 'sent', sentAt: sentAt.toISOString(), broadcastId };
};
