import type { Metadata } from 'next';
import type { GlobalSlug } from 'payload';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import type { MassagePage as MassagePageData } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobal<MassagePageData>('massage-page' as GlobalSlug);
  return buildMetadata(data.seo, { path: '/services/massage' });
}

export default function MassageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
