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
  if (cronSecret) {
    const authHeader = request.headers.get('authorization') ?? '';
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }
  }

  const payload = await getPayloadClient();
  const { totalDocs: count } = await payload.count({ collection: 'users' });

  revalidatePath('/', 'layout');
  revalidatePath('/llms.txt');

  return NextResponse.json({ ok: true, count });
}
