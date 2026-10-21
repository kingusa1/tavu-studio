import type { Metadata } from 'next';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';
import type { ReformerPilatesPage } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const [page, { settings }] = await Promise.all([getGlobal<ReformerPilatesPage>('reformer-pilates-page'), getSiteData()]);
  return buildMetadata(page.seo, { path: '/services/reformer-pilates', fallback: settings.seo });
}

export default function ReformerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
