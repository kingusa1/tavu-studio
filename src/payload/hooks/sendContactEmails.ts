import type { CollectionAfterChangeHook, PayloadRequest } from 'payload';

import { loadEmailContext } from '../../lib/email/context';
import { contactTeamEmail, contactThankYouEmail } from '../../lib/email/templates';

const SEND_TIMEOUT_MS = 10_000;

function withTimeout<T>(promise: Promise<T>, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(`${label} timed out`)), SEND_TIMEOUT_MS)),
  ]);
}

type EmailStatus = 'sent' | 'partial' | 'failed' | 'skipped';

/** One thank-you per address per day, and none at all while the form is being flooded. */
const THANK_YOU_WINDOW_MS = 24 * 60 * 60 * 1000;
const FLOOD_WINDOW_MS = 10 * 60 * 1000;
const FLOOD_LIMIT = 20;

/**
 * The thank-you goes to an address the visitor typed, so the form must not become a way to send
 * mail to strangers: skip it when that address already had one in the last 24 hours, or when more
 * than FLOOD_LIMIT messages arrived in the last 10 minutes. The team is still notified either way.
 */
async function thankYouAllowed(req: PayloadRequest, doc: { id: number | string; email: string }): Promise<boolean> {
  const now = Date.now();
  const [sameAddress, recent] = await Promise.all([
    req.payload.count({
      collection: 'contact-submissions',
      overrideAccess: true,
      where: {
        and: [
          { email: { equals: doc.email } },
          { id: { not_equals: doc.id } },
          { createdAt: { greater_than: new Date(now - THANK_YOU_WINDOW_MS).toISOString() } },
        ],
      },
    }),
    req.payload.count({
      collection: 'contact-submissions',
      overrideAccess: true,
      where: { createdAt: { greater_than: new Date(now - FLOOD_WINDOW_MS).toISOString() } },
    }),
  ]);
  if (recent.totalDocs > FLOOD_LIMIT) {
    req.payload.logger.warn({ msg: 'Contact form flood: thank-you emails paused', lastTenMinutes: recent.totalDocs });
    return false;
  }
  return sameAddress.totalDocs === 0;
}

/**
 * After a new contact-form message is saved: email the TAVÚ team (Reply-To = visitor) and send the
 * visitor a branded thank-you, as configured in "Emails & Newsletter". Email problems never block the
 * visitor — the message is already saved and WhatsApp still opens — the outcome is recorded on the
 * message as `emailStatus` instead.
 */
export const sendContactEmails: CollectionAfterChangeHook = async ({ doc, operation, req, context }) => {
  if (operation !== 'create' || context?.skipContactEmails) return doc;

  let status: EmailStatus = 'skipped';
  try {
    const ctx = await loadEmailContext(req.payload);
    const cf = ctx.settings.contactForm;
    const message = { id: doc.id, name: doc.name, email: doc.email, message: doc.message, page: doc.page, createdAt: doc.createdAt };
    const jobs: Promise<unknown>[] = [];

    if (cf.notifyTeam && cf.teamRecipients.length > 0) {
      const email = contactTeamEmail(message, ctx);
      jobs.push(
        withTimeout(
          req.payload.sendEmail({ from: ctx.from, to: cf.teamRecipients.map((row) => row.email), replyTo: doc.email, ...email }),
          'team notification',
        ),
      );
    }
    if (cf.sendThankYou && (await thankYouAllowed(req, doc))) {
      const email = contactThankYouEmail(message, ctx);
      jobs.push(withTimeout(req.payload.sendEmail({ from: ctx.from, to: doc.email, replyTo: ctx.fromAddress, ...email }), 'thank-you'));
    }

    if (jobs.length > 0) {
      const results = await Promise.allSettled(jobs);
      const failures = results.filter((result) => result.status === 'rejected') as PromiseRejectedResult[];
      status = failures.length === 0 ? 'sent' : failures.length === results.length ? 'failed' : 'partial';
      for (const failure of failures) {
        // No visitor details in logs — only the submission id and the provider error.
        req.payload.logger.error({ msg: 'Contact email failed', submissionId: doc.id, err: String(failure.reason) });
      }
    }
  } catch (error) {
    status = 'failed';
    req.payload.logger.error({ msg: 'Contact emails could not be prepared', submissionId: doc.id, err: String(error) });
  }

  try {
    await req.payload.update({
      collection: 'contact-submissions',
      id: doc.id,
      data: { emailStatus: status },
      overrideAccess: true,
      context: { skipContactEmails: true },
      req,
    });
  } catch (error) {
    req.payload.logger.error({ msg: 'Could not record contact email status', submissionId: doc.id, err: String(error) });
  }
  return { ...doc, emailStatus: status };
};
