import type { Metadata } from 'next';
import type { GlobalSlug } from 'payload';

import { getGlobal } from '@/lib/cms/globals';
import { getSiteData } from '@/lib/cms/site';
import { buildMetadata } from '@/lib/cms/metadata';
import type { MembershipsPage as MembershipsPageData } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const [data, { settings }] = await Promise.all([
    getGlobal<MembershipsPageData>('memberships-page' as GlobalSlug),
    getSiteData(),
  ]);
  return buildMetadata(data.seo, { path: '/memberships', fallback: settings.seo });
}

export default function MembershipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
