import type { Metadata } from 'next';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';
import type { ServicesPage } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const [page, { settings }] = await Promise.all([getGlobal<ServicesPage>('services-page'), getSiteData()]);
  return buildMetadata(page.seo, { path: '/services', fallback: settings.seo });
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
