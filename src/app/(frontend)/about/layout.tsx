import type { Metadata } from 'next';
import type { GlobalSlug } from 'payload';

import { getGlobal } from '@/lib/cms/globals';
import { getSiteData } from '@/lib/cms/site';
import { buildMetadata } from '@/lib/cms/metadata';
import type { AboutPage as AboutPageData } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const [about, { settings }] = await Promise.all([
    getGlobal<AboutPageData>('about-page' as GlobalSlug),
    getSiteData(),
  ]);
  return buildMetadata(about.seo, { path: '/about', fallback: settings.seo });
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
