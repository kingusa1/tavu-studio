import { NextResponse } from 'next/server';

import { getPayloadClient } from '@/lib/cms/payload';
import { loadEmailContext } from '@/lib/email/context';
import { getNewsletterSegmentId } from '@/lib/email/newsletter';
import { subscribeContact } from '@/lib/email/resendApi';
import { newsletterWelcomeEmail } from '@/lib/email/templates';
import { hashToken, unsubscribeUrl } from '@/lib/email/tokens';

export const dynamic = 'force-dynamic';

function redirectTo(request: Request, status: 'confirmed' | 'invalid' | 'error'): NextResponse {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || new URL(request.url).origin;
  return NextResponse.redirect(new URL(`/newsletter?status=${status}`, base), 303);
}

/**
 * Newsletter signup, step 2: the link in the confirmation email. Marks the person as subscribed,
 * adds them to the Resend newsletter segment and sends the welcome email. Tokens are single-use
 * and expire after 48 hours.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const token = new URL(request.url).searchParams.get('token');
  if (!token || token.length > 200) return redirectTo(request, 'invalid');

  const payload = await getPayloadClient();
  const found = await payload.find({
    collection: 'newsletter-subscribers',
    where: { confirmTokenHash: { equals: hashToken(token) } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const subscriber = found.docs[0] as
    | { id: number | string; email: string; firstName?: string | null; confirmTokenExpiresAt?: string | null }
    | undefined;
  if (!subscriber || !subscriber.confirmTokenExpiresAt || new Date(subscriber.confirmTokenExpiresAt).getTime() < Date.now()) {
    return redirectTo(request, 'invalid');
  }

  try {
    const ctx = await loadEmailContext(payload);
    const segmentId = await getNewsletterSegmentId(payload, ctx);
    const contactId = await subscribeContact({ email: subscriber.email, firstName: subscriber.firstName, segmentId });
    const now = new Date().toISOString();
    await payload.update({
      collection: 'newsletter-subscribers',
      id: subscriber.id,
      data: {
        status: 'subscribed',
        confirmedAt: now,
        unsubscribedAt: null,
        confirmTokenHash: null,
        confirmTokenExpiresAt: null,
        ...(contactId ? { resendContactId: contactId } : {}),
      },
      overrideAccess: true,
      context: { fromNewsletterRoute: true },
    });

    const unsubscribe = unsubscribeUrl(ctx.siteUrl, subscriber.email);
    const welcome = newsletterWelcomeEmail({ firstName: subscriber.firstName, unsubscribeUrl: unsubscribe }, ctx);
    await payload
      .sendEmail({
        from: ctx.from,
        to: subscriber.email,
        replyTo: ctx.fromAddress,
        ...welcome,
        headers: { 'List-Unsubscribe': `<${unsubscribe}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' },
      })
      .catch((error: unknown) => payload.logger.error({ msg: 'Newsletter welcome email failed', subscriberId: subscriber.id, err: String(error) }));
  } catch (error) {
    payload.logger.error({ msg: 'Newsletter confirmation failed', subscriberId: subscriber.id, err: String(error) });
    return redirectTo(request, 'error');
  }

  return redirectTo(request, 'confirmed');
}
