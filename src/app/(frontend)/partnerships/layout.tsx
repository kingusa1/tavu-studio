import type { Metadata } from 'next';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';

import type { PartnershipsPageData } from './page';

export async function generateMetadata(): Promise<Metadata> {
  const [page, { settings }] = await Promise.all([getGlobal<PartnershipsPageData>('partnerships-page'), getSiteData()]);
  return buildMetadata(page.seo, { path: '/partnerships', fallback: settings.seo });
}

export default function PartnershipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
