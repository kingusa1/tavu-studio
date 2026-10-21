import type { Metadata } from 'next';
import type { GlobalSlug } from 'payload';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import type { MembershipsPage as MembershipsPageData } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobal<MembershipsPageData>('memberships-page' as GlobalSlug);
  return buildMetadata(data.seo, { path: '/memberships' });
}

export default function MembershipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
