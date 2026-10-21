import type { Metadata } from 'next';
import type { GlobalSlug } from 'payload';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import type { RecoveryPage as RecoveryPageData } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobal<RecoveryPageData>('recovery-page' as GlobalSlug);
  return buildMetadata(data.seo, { path: '/recovery' });
}

export default function RecoveryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
