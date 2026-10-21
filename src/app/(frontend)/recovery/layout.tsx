import type { Metadata } from 'next';
import type { GlobalSlug } from 'payload';

import { getGlobal } from '@/lib/cms/globals';
import { getSiteData } from '@/lib/cms/site';
import { buildMetadata } from '@/lib/cms/metadata';
import type { RecoveryPage as RecoveryPageData } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const [data, { settings }] = await Promise.all([
    getGlobal<RecoveryPageData>('recovery-page' as GlobalSlug),
    getSiteData(),
  ]);
  return buildMetadata(data.seo, { path: '/recovery', fallback: settings.seo });
}

export default function RecoveryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
