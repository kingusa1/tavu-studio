import type { Metadata } from 'next';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';
import type { CompressionTherapyPage } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const [page, { settings }] = await Promise.all([getGlobal<CompressionTherapyPage>('compression-therapy-page'), getSiteData()]);
  return buildMetadata(page.seo, { path: '/services/compression-therapy', fallback: settings.seo });
}

export default function CompressionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
