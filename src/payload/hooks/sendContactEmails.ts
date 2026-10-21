import type { CollectionAfterChangeHook } from 'payload';

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
    if (cf.sendThankYou) {
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
