import type { Metadata } from 'next';
import type { GlobalSlug } from 'payload';

import { getGlobal } from '@/lib/cms/globals';
import { getSiteData } from '@/lib/cms/site';
import { buildMetadata } from '@/lib/cms/metadata';
import type { MethodPage as MethodPageData } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const [method, { settings }] = await Promise.all([
    getGlobal<MethodPageData>('method-page' as GlobalSlug),
    getSiteData(),
  ]);
  return buildMetadata(method.seo, { path: '/method', fallback: settings.seo });
}

export default function MethodLayout({ children }: { children: React.ReactNode }) {
  return children;
}
