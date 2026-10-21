import type { Metadata } from 'next';
import type { GlobalSlug } from 'payload';

import { getGlobal } from '@/lib/cms/globals';
import { getSiteData } from '@/lib/cms/site';
import { buildMetadata } from '@/lib/cms/metadata';
import type { MassagePage as MassagePageData } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const [data, { settings }] = await Promise.all([
    getGlobal<MassagePageData>('massage-page' as GlobalSlug),
    getSiteData(),
  ]);
  return buildMetadata(data.seo, { path: '/services/massage', fallback: settings.seo });
}

export default function MassageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
