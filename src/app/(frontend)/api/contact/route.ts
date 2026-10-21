import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getPayloadClient } from '@/lib/payload';

// Same validation rules as src/components/contact/ContactForm.tsx's client-side zod schema.
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  page: z.string().optional(),
  // Honeypot: real visitors never fill this (it's visually hidden). A bot that fills every
  // field trips it — we still answer 200 so the bot can't tell it was rejected.
  website: z.string().optional(),
});

export async function POST(request: Request): Promise<NextResponse> {
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
      data: { name, email, message, page },
    });
  } catch (error) {
    console.error('Failed to save contact submission:', error);
    return NextResponse.json({ ok: false, error: 'Failed to save submission' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
