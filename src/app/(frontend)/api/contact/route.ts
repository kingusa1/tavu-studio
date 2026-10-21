import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getPayloadClient } from '@/lib/cms/payload';
import { isAllowedOrigin, normaliseEmail } from '@/lib/email/newsletter';

// Same validation rules as src/components/contact/ContactForm.tsx's client-side zod schema,
// plus upper bounds (none existed before) and `.strict()` so no extra field is accepted —
// the client sends exactly { name, email, message, website, page }.
const contactSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    message: z.string().trim().min(10).max(5000),
    page: z.string().max(200).optional(),
    // Honeypot: real visitors never fill this (it's visually hidden). A bot that fills every
    // field trips it — we still answer 200 so the bot can't tell it was rejected.
    website: z.string().max(200).optional(),
  })
  .strict();

export async function POST(request: Request): Promise<NextResponse> {
  // Browsers always send Origin on this POST; header-less scripts are refused (see isAllowedOrigin).
  if (!isAllowedOrigin(request, { requireOrigin: true })) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid submission' }, { status: 400 });
  }

  const { name, email, message, page, website } = parsed.data;

  if (website) {
    // Honeypot tripped — pretend success, do not save.
    return NextResponse.json({ ok: true });
  }

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: 'contact-submissions',
      overrideAccess: true,
      // The email hook runs after the insert; without a transaction it does not hold a pooled
      // connection open while Resend answers.
      disableTransaction: true,
      // Lowercased: the one-thank-you-per-address-per-day rule compares exact values.
      data: { name, email: normaliseEmail(email), message, page },
    });
  } catch (error) {
    console.error('Failed to save contact submission:', error);
    return NextResponse.json({ ok: false, error: 'Failed to save submission' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
