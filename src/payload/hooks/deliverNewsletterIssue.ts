import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';
import { sql } from '@payloadcms/db-postgres';
import { APIError, type CollectionAfterChangeHook, type CollectionBeforeChangeHook, type PayloadRequest } from 'payload';

import { loadEmailContext } from '../../lib/email/context';
import { escapeHtml } from '../../lib/email/layout';
import { getNewsletterSegmentId } from '../../lib/email/newsletter';
import { createBroadcast, deleteBroadcast, findBroadcastsByName, sendExistingBroadcast } from '../../lib/email/resendApi';
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

/** Resend broadcast name for an issue: fixed per issue, so Resend itself can tell us it was sent. */
const broadcastName = (issueId: number | string) => `tavu-issue-${issueId}`;
const SEND_CONTEXT_KEY = 'newsletterBroadcastToSend';

/**
 * Locks the issue row for the rest of this save's transaction and returns its stored state. A
 * second "send" save that overlaps waits here until the first one commits, then sees "sent".
 */
async function lockIssue(req: PayloadRequest, id: number | string): Promise<{ status?: string; broadcast_id?: string | null } | null> {
  const db = (req.payload.db as unknown as { sessions?: Record<string, { db?: { execute: (q: unknown) => Promise<{ rows?: unknown[] }> } }> })
    .sessions?.[String(await req.transactionID)]?.db;
  if (!db) throw new APIError('Could not lock the issue for sending; please try again.', 500);
  const schema = process.env.PAYLOAD_DB_SCHEMA || 'payload';
  const result = await db.execute(
    sql`select "status", "broadcast_id" from ${sql.identifier(schema)}."newsletter_issues" where "id" = ${Number(id)} for update`,
  );
  return (result.rows?.[0] as { status?: string; broadcast_id?: string | null } | undefined) ?? null;
}

/**
 * Runs the issue's "What should happen when you save?" action: send a test to one address, or send
 * the issue to every subscriber in the Resend newsletter segment (once). The action always resets
 * to "Just save" so a later save never re-sends.
 *
 * Sending is two-step so a failed save can never lead to a second broadcast: this hook (before the
 * save) only creates a DRAFT broadcast named `tavu-issue-<id>`; `sendNewsletterIssueAfterSave` sends
 * it once the issue is stored as "sent". If the send fails, that hook throws, the save rolls back
 * and nothing went out. Before creating anything, Resend is asked whether a broadcast with this
 * issue's name was already sent.
 */
export const deliverNewsletterIssue: CollectionBeforeChangeHook = async ({ data, originalDoc, req }) => {
  const issue = { ...(originalDoc ?? {}), ...data } as IssueData;
  const action = issue.action ?? 'none';
  const next = { ...data, action: 'none' };
  if (action === 'none') return next;

  if (originalDoc?.status === 'sent' || (action === 'send' && originalDoc?.broadcastId)) {
    throw new APIError('This issue was already sent to subscribers. Duplicate it to send a new one.', 400);
  }
  if (action === 'send' && !originalDoc?.id) {
    throw new APIError('Save the issue once (and send yourself a test), then choose “Send to all subscribers”.', 400);
  }
  if (action === 'send') {
    const stored = await lockIssue(req, originalDoc.id);
    if (stored?.status === 'sent' || stored?.broadcast_id) {
      throw new APIError('This issue was already sent to subscribers. Duplicate it to send a new one.', 400);
    }
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

  const name = broadcastName(originalDoc.id);
  const previous = await findBroadcastsByName(name);
  const alreadySent = previous.find((broadcast) => broadcast.status && broadcast.status !== 'draft');
  if (alreadySent) {
    // Sent before but the CMS never recorded it (e.g. the save failed afterwards): record, don't resend.
    return { ...next, status: 'sent', sentAt: alreadySent.sent_at ?? new Date().toISOString(), broadcastId: alreadySent.id };
  }
  // Unsent drafts from an earlier attempt that rolled back: remove them so only one exists.
  await Promise.all(previous.map((broadcast) => deleteBroadcast(broadcast.id).catch(() => undefined)));

  const segmentId = await getNewsletterSegmentId(req.payload, ctx);
  const broadcastId = await createBroadcast({
    segmentId,
    from: ctx.from,
    replyTo: ctx.fromAddress,
    name,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });
  req.context[SEND_CONTEXT_KEY] = broadcastId;
  return { ...next, status: 'sent', sentAt: new Date().toISOString(), broadcastId };
};

/** Second step of "Send to all subscribers": runs after the issue was saved as "sent". */
export const sendNewsletterIssueAfterSave: CollectionAfterChangeHook = async ({ doc, req }) => {
  const broadcastId = req.context[SEND_CONTEXT_KEY];
  if (typeof broadcastId !== 'string' || doc.broadcastId !== broadcastId) return doc;
  delete req.context[SEND_CONTEXT_KEY];
  try {
    await sendExistingBroadcast(broadcastId);
  } catch (error) {
    req.payload.logger.error({ msg: 'Newsletter broadcast send failed', issueId: doc.id, err: String(error) });
    // Throwing rolls the save back, so the issue stays a draft and can be sent again.
    throw new APIError('Resend could not send the issue just now. Nothing was sent; please try again in a minute.', 502);
  }
  return doc;
};
