import type { Metadata } from 'next';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';
import type { AppointmentsPage } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const [page, { settings }] = await Promise.all([getGlobal<AppointmentsPage>('appointments-page'), getSiteData()]);
  return buildMetadata(page.seo, { path: '/appointments', fallback: settings.seo });
}

export default function AppointmentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
