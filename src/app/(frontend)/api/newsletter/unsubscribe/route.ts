import { NextResponse } from 'next/server';

import { getPayloadClient } from '@/lib/cms/payload';
import { normaliseEmail } from '@/lib/email/newsletter';
import { unsubscribeContact } from '@/lib/email/resendApi';
import { verifyUnsubscribeSignature } from '@/lib/email/tokens';

export const dynamic = 'force-dynamic';

function siteBase(request: Request): string {
  return process.env.NEXT_PUBLIC_SERVER_URL || new URL(request.url).origin;
}

async function unsubscribe(email: string): Promise<void> {
  const payload = await getPayloadClient();
  const found = await payload.find({
    collection: 'newsletter-subscribers',
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const subscriber = found.docs[0] as { id: number | string; status?: string } | undefined;
  if (subscriber && subscriber.status !== 'unsubscribed') {
    await payload.update({
      collection: 'newsletter-subscribers',
      id: subscriber.id,
      data: { status: 'unsubscribed', unsubscribedAt: new Date().toISOString(), confirmTokenHash: null, confirmTokenExpiresAt: null },
      overrideAccess: true,
      context: { fromNewsletterRoute: true },
    });
  }
  await unsubscribeContact(email).catch((error: unknown) => {
    payload.logger.error({ msg: 'Resend unsubscribe failed', err: String(error) });
  });
}

/**
 * GET (link in our emails) only shows a confirmation page — link scanners in company inboxes open
 * links automatically and must not unsubscribe anyone. The page's button POSTs here.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const params = new URL(request.url).searchParams;
  const target = new URL('/newsletter', siteBase(request));
  target.searchParams.set('status', 'unsubscribe');
  target.searchParams.set('e', params.get('e') ?? '');
  target.searchParams.set('s', params.get('s') ?? '');
  return NextResponse.redirect(target, 303);
}

/**
 * POST: our confirmation page (form fields e + s) or a mail client's one-click unsubscribe
 * (RFC 8058: e + s in the URL, body "List-Unsubscribe=One-Click").
 */
export async function POST(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  let email = url.searchParams.get('e') ?? '';
  let signature = url.searchParams.get('s') ?? '';
  const fromMailClient = Boolean(email && signature);
  if (!fromMailClient) {
    const form = await request.formData().catch(() => null);
    email = String(form?.get('e') ?? '');
    signature = String(form?.get('s') ?? '');
  }
  email = normaliseEmail(email);

  const valid = email.length > 3 && email.length <= 254 && signature.length > 0 && signature.length < 100 && verifyUnsubscribeSignature(email, signature);
  if (!valid) {
    return fromMailClient
      ? NextResponse.json({ ok: false }, { status: 400 })
      : NextResponse.redirect(new URL('/newsletter?status=invalid', siteBase(request)), 303);
  }

  try {
    await unsubscribe(email);
  } catch (error) {
    console.error('Unsubscribe failed:', error instanceof Error ? error.message : error);
    return fromMailClient
      ? NextResponse.json({ ok: false }, { status: 500 })
      : NextResponse.redirect(new URL('/newsletter?status=error', siteBase(request)), 303);
  }
  return fromMailClient
    ? NextResponse.json({ ok: true })
    : NextResponse.redirect(new URL('/newsletter?status=unsubscribed', siteBase(request)), 303);
}
