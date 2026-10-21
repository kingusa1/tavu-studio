import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getPayloadClient } from '@/lib/cms/payload';
import { loadEmailContext } from '@/lib/email/context';
import { cleanFirstName, isAllowedOrigin, normaliseEmail } from '@/lib/email/newsletter';
import { newsletterConfirmEmail } from '@/lib/email/templates';
import { newConfirmToken } from '@/lib/email/tokens';

const RESEND_THROTTLE_MS = 2 * 60 * 1000;

const subscribeSchema = z
  .object({
    email: z.string().trim().email().max(254),
    firstName: z.string().trim().max(60).optional(),
    source: z.string().trim().max(80).optional(),
    consent: z.literal(true),
    // Honeypot: hidden from people; bots that fill every field get a fake success.
    website: z.string().max(200).optional(),
  })
  .strict();

/**
 * Newsletter signup, step 1 of the double opt-in: save the person as "pending" with their consent
 * record and email them a confirmation link. The answer is identical whether or not the address is
 * already subscribed, so the form cannot be used to find out who is on the list.
 */
export async function POST(request: Request): Promise<NextResponse> {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address and accept the consent line.' }, { status: 400 });
  }
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const email = normaliseEmail(parsed.data.email);
  const firstName = cleanFirstName(parsed.data.firstName);
  const source = (parsed.data.source || 'website').replace(/[^\w:/.-]/g, '').slice(0, 80);

  try {
    const payload = await getPayloadClient();
    const found = await payload.find({
      collection: 'newsletter-subscribers',
      where: { email: { equals: email } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });
    const existing = found.docs[0] as { id: number | string; status?: string; confirmEmailSentAt?: string | null } | undefined;

    if (existing?.status === 'subscribed') return NextResponse.json({ ok: true });
    if (existing?.confirmEmailSentAt && Date.now() - new Date(existing.confirmEmailSentAt).getTime() < RESEND_THROTTLE_MS) {
      return NextResponse.json({ ok: true });
    }

    const ctx = await loadEmailContext(payload);
    const { token, hash, expiresAt } = newConfirmToken();
    const now = new Date().toISOString();
    const data = {
      email,
      ...(firstName ? { firstName } : {}),
      status: 'pending' as const,
      source,
      consent: { text: ctx.settings.newsletter.consentText, givenAt: now },
      confirmTokenHash: hash,
      confirmTokenExpiresAt: expiresAt,
      confirmEmailSentAt: now,
    };
    if (existing) {
      await payload.update({ collection: 'newsletter-subscribers', id: existing.id, data, overrideAccess: true, context: { fromNewsletterRoute: true } });
    } else {
      await payload.create({ collection: 'newsletter-subscribers', data, overrideAccess: true, context: { fromNewsletterRoute: true } });
    }

    const confirmUrl = `${ctx.siteUrl}/api/newsletter/confirm?token=${encodeURIComponent(token)}`;
    const message = newsletterConfirmEmail({ firstName, confirmUrl }, ctx);
    await payload.sendEmail({ from: ctx.from, to: email, replyTo: ctx.fromAddress, ...message });
  } catch (error) {
    console.error('Newsletter signup failed:', error instanceof Error ? error.message : error);
    return NextResponse.json({ ok: false, error: 'Something went wrong. Please try again in a moment.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
