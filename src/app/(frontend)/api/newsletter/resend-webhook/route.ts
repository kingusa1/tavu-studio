import { createHmac, timingSafeEqual } from 'node:crypto';

import { NextResponse } from 'next/server';

import { getPayloadClient } from '@/lib/cms/payload';
import { normaliseEmail } from '@/lib/email/newsletter';

export const dynamic = 'force-dynamic';

const TOLERANCE_SECONDS = 5 * 60;

/**
 * Svix signature check used by Resend webhooks (docs.svix.com/receiving/verifying-payloads/how-manual):
 * HMAC-SHA256 over `${svix-id}.${svix-timestamp}.${raw body}` with the base64 key after `whsec_`,
 * compared against every `v1,<base64>` entry in `svix-signature`.
 */
function verify(request: Request, body: string): boolean {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  const id = request.headers.get('svix-id');
  const timestamp = request.headers.get('svix-timestamp');
  const header = request.headers.get('svix-signature');
  if (!secret || !id || !timestamp || !header) return false;
  const sent = Number(timestamp);
  if (!Number.isFinite(sent) || Math.abs(Date.now() / 1000 - sent) > TOLERANCE_SECONDS) return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.${body}`).digest();
  return header.split(' ').some((entry) => {
    const [version, signature] = entry.split(',');
    if (version !== 'v1' || !signature) return false;
    const given = Buffer.from(signature, 'base64');
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}

type ContactEvent = { type?: string; created_at?: string; data?: { email?: string; unsubscribed?: boolean } };

/**
 * Resend → CMS: when someone unsubscribes through Resend's own link in a newsletter issue (or the
 * contact is deleted in Resend), mark them "Unsubscribed" in the CMS so both lists agree.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.text();
  if (!verify(request, body)) return NextResponse.json({ ok: false }, { status: 401 });

  let event: ContactEvent;
  try {
    event = JSON.parse(body) as ContactEvent;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const left = (event.type === 'contact.updated' && event.data?.unsubscribed === true) || event.type === 'contact.deleted';
  const email = event.data?.email ? normaliseEmail(event.data.email) : '';
  if (!left || !email) return NextResponse.json({ ok: true });

  const payload = await getPayloadClient();
  const found = await payload.find({
    collection: 'newsletter-subscribers',
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const subscriber = found.docs[0] as { id: number | string; status?: string; confirmedAt?: string | null } | undefined;
  // A delayed or retried event from before the person (re-)confirmed must not undo that.
  const eventAt = Date.parse(event.created_at ?? '');
  const confirmedAt = Date.parse(subscriber?.confirmedAt ?? '');
  const stale = Number.isFinite(eventAt) && Number.isFinite(confirmedAt) && eventAt < confirmedAt;
  if (subscriber && subscriber.status !== 'unsubscribed' && !stale) {
    await payload.update({
      collection: 'newsletter-subscribers',
      id: subscriber.id,
      data: { status: 'unsubscribed', unsubscribedAt: new Date().toISOString(), confirmTokenHash: null, confirmTokenExpiresAt: null },
      overrideAccess: true,
      // Already unsubscribed in Resend: skip the CMS → Resend sync hook.
      context: { fromNewsletterRoute: true },
    });
  }
  return NextResponse.json({ ok: true });
}
