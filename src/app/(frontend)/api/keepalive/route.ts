import { NextResponse } from 'next/server';

import { getPayloadClient } from '@/lib/payload';

/**
 * Pinged daily by the Vercel Cron in vercel.json so Supabase's free-tier Postgres
 * (which pauses after ~7 days idle) never goes to sleep between admin visits.
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

  return NextResponse.json({ ok: true, count });
}
