import { timingSafeEqual } from 'node:crypto';

import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { getPayloadClient } from '@/lib/cms/payload';

/**
 * Pinged daily by the Vercel Cron in vercel.json so Supabase's free-tier Postgres
 * (which pauses after ~7 days idle) never goes to sleep between admin visits.
 *
 * Also revalidates the site (§5.4, R8): `availableFrom`/`availableUntil` time-based
 * visibility (e.g. the Unlimited membership's January return) doesn't flip by itself on
 * statically-rendered pages, so this daily cron is what picks up the date change.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const cronSecret = process.env.CRON_SECRET;
  const got = request.headers.get('authorization') ?? '';
  const want = `Bearer ${cronSecret ?? ''}`;
  const gotBuf = Buffer.from(got);
  const wantBuf = Buffer.from(want);
  const authorized =
    Boolean(cronSecret) && gotBuf.length === wantBuf.length && timingSafeEqual(gotBuf, wantBuf);

  if (!authorized) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await getPayloadClient();
  // Touch the DB only to prove liveness — never return the count to the caller.
  await payload.count({ collection: 'users' });

  revalidatePath('/', 'layout');
  revalidatePath('/llms.txt');

  return NextResponse.json({ ok: true });
}
