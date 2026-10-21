import type { Metadata } from 'next';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';
import type { SchedulePage } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const [page, { settings }] = await Promise.all([getGlobal<SchedulePage>('schedule-page'), getSiteData()]);
  return buildMetadata(page.seo, { path: '/schedule', fallback: settings.seo });
}

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
