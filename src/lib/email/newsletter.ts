// Server-only: newsletter helpers shared by the API routes and the issue hook.
import type { Payload } from 'payload';

import type { EmailContext } from './context';
import { ensureSegment } from './resendApi';

/** The Resend segment that receives newsletter issues; created and remembered on first use. */
export async function getNewsletterSegmentId(payload: Payload, ctx: EmailContext): Promise<string> {
  const known = ctx.settings.newsletter.segmentId;
  const segmentId = await ensureSegment(ctx.settings.newsletter.segmentName, known);
  if (segmentId !== known) {
    const current = (await payload.findGlobal({ slug: 'email-settings', overrideAccess: true, depth: 0 })) as { newsletter?: Record<string, unknown> };
    await payload.updateGlobal({
      slug: 'email-settings',
      overrideAccess: true,
      data: { newsletter: { ...(current.newsletter ?? {}), segmentId } } as never,
    });
  }
  return segmentId;
}

export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** First name from the optional signup field; trimmed and length-limited. */
export function cleanFirstName(value: string | null | undefined): string | undefined {
  const name = String(value ?? '').replace(/[\r\n\t<>]/g, ' ').trim().slice(0, 60);
  return name || undefined;
}

/**
 * Browser form posts must come from this site (compared by host, so a trailing slash or `www.` in
 * an env value cannot lock real visitors out). Every browser sends `Origin` on a form POST, so the
 * public form endpoints pass `requireOrigin` and refuse header-less scripts outright.
 */
export function isAllowedOrigin(request: Request, options: { requireOrigin?: boolean } = {}): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return !options.requireOrigin;
  try {
    const originHost = new URL(origin).host;
    const allowed = new Set<string>([new URL(request.url).host]);
    const forwarded = request.headers.get('x-forwarded-host');
    if (forwarded) allowed.add(forwarded);
    if (process.env.NEXT_PUBLIC_SERVER_URL) allowed.add(new URL(process.env.NEXT_PUBLIC_SERVER_URL).host);
    if (process.env.NODE_ENV !== 'production' && /^localhost(:\d+)?$/.test(originHost)) return true;
    return allowed.has(originHost);
  } catch {
    return false;
  }
}
