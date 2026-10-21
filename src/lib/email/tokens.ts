// Server-only: newsletter confirmation tokens (random, stored hashed) and unsubscribe signatures.
import { createHash, createHmac, randomBytes, timingSafeEqual } from 'crypto';

export const CONFIRM_TTL_MS = 48 * 60 * 60 * 1000;

export function newConfirmToken(): { token: string; hash: string; expiresAt: string } {
  const token = randomBytes(32).toString('base64url');
  return { token, hash: hashToken(token), expiresAt: new Date(Date.now() + CONFIRM_TTL_MS).toISOString() };
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

function secret(): string {
  const value = process.env.PAYLOAD_SECRET;
  if (!value) throw new Error('PAYLOAD_SECRET is not set');
  return value;
}

/** Stable per-address signature for one-click unsubscribe links. */
export function unsubscribeSignature(email: string): string {
  return createHmac('sha256', `newsletter-unsubscribe:${secret()}`).update(email.trim().toLowerCase()).digest('base64url');
}

export function verifyUnsubscribeSignature(email: string, signature: string): boolean {
  const expected = Buffer.from(unsubscribeSignature(email));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export function unsubscribeUrl(siteUrl: string, email: string): string {
  const params = new URLSearchParams({ e: email.trim().toLowerCase(), s: unsubscribeSignature(email) });
  return `${siteUrl}/api/newsletter/unsubscribe?${params.toString()}`;
}
