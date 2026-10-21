import type { Metadata } from 'next';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';
import type { ContrastTherapyPage } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const [page, { settings }] = await Promise.all([getGlobal<ContrastTherapyPage>('contrast-therapy-page'), getSiteData()]);
  return buildMetadata(page.seo, { path: '/services/contrast-therapy', fallback: settings.seo });
}

export default function ContrastLayout({ children }: { children: React.ReactNode }) {
  return children;
}
