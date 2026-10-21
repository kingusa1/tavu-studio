// Server-only: the few Resend REST calls the newsletter needs (contacts, segments, broadcasts).
// Transactional emails go through Payload's `sendEmail` (the @payloadcms/email-resend adapter).
// Endpoints checked against resend.com/docs/api-reference on 2026-10-21 (contacts are global and
// grouped by segments; broadcasts target a segment_id).

const RESEND_API = 'https://api.resend.com';

export class ResendError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

async function resend<T>(method: 'GET' | 'POST' | 'PATCH', path: string, body?: unknown): Promise<T> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new ResendError('RESEND_API_KEY is not set', 0);
  const response = await fetch(`${RESEND_API}${path}`, {
    method,
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
    cache: 'no-store',
  });
  const text = await response.text();
  if (!response.ok) throw new ResendError(`Resend ${method} ${path.split('/')[1]} failed (${response.status}): ${text.slice(0, 200)}`, response.status);
  return (text ? JSON.parse(text) : {}) as T;
}

/** Returns the id of the newsletter segment, creating it (by name) when it does not exist yet. */
export async function ensureSegment(name: string, knownId?: string | null): Promise<string> {
  if (knownId) return knownId;
  const list = await resend<{ data?: { id: string; name: string }[] }>('GET', '/segments');
  const existing = list.data?.find((segment) => segment.name === name);
  if (existing) return existing.id;
  const created = await resend<{ id: string }>('POST', '/segments', { name });
  return created.id;
}

/** Create or re-subscribe a contact and make sure it belongs to the newsletter segment. */
export async function subscribeContact(input: { email: string; firstName?: string | null; segmentId: string }): Promise<string | undefined> {
  const email = encodeURIComponent(input.email);
  try {
    const created = await resend<{ id?: string }>('POST', '/contacts', {
      email: input.email,
      first_name: input.firstName || undefined,
      unsubscribed: false,
      segments: [{ id: input.segmentId }],
    });
    return created.id;
  } catch (error) {
    // Already a contact (e.g. re-subscribing): update it and add it to the segment instead.
    if (!(error instanceof ResendError) || (error.status !== 409 && error.status !== 422 && error.status !== 400)) throw error;
    const updated = await resend<{ id?: string }>('PATCH', `/contacts/${email}`, {
      unsubscribed: false,
      ...(input.firstName ? { first_name: input.firstName } : {}),
    });
    await resend('POST', `/contacts/${email}/segments/${encodeURIComponent(input.segmentId)}`).catch((segmentError: unknown) => {
      // Already in the segment is fine.
      if (!(segmentError instanceof ResendError) || segmentError.status >= 500) throw segmentError;
    });
    return updated.id;
  }
}

export async function unsubscribeContact(email: string): Promise<void> {
  await resend('PATCH', `/contacts/${encodeURIComponent(email)}`, { unsubscribed: true });
}

/** Creates a broadcast to the segment and sends it straight away; returns the broadcast id. */
export async function sendBroadcast(input: {
  segmentId: string;
  from: string;
  replyTo: string;
  name: string;
  subject: string;
  html: string;
  text: string;
}): Promise<string> {
  const created = await resend<{ id: string }>('POST', '/broadcasts', {
    segment_id: input.segmentId,
    from: input.from,
    reply_to: input.replyTo,
    name: input.name,
    subject: input.subject,
    html: input.html,
    text: input.text,
    send: true,
  });
  return created.id;
}
