import type { Metadata } from 'next';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';

import type { EventsPageData } from './page';

export async function generateMetadata(): Promise<Metadata> {
  const [page, { settings }] = await Promise.all([getGlobal<EventsPageData>('events-page'), getSiteData()]);
  return buildMetadata(page.seo, { path: '/events', fallback: settings.seo });
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
