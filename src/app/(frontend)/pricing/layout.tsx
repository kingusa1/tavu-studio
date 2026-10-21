import type { Metadata } from 'next';
import type { GlobalSlug } from 'payload';

import { getGlobal } from '@/lib/cms/globals';
import { getSiteData } from '@/lib/cms/site';
import { buildMetadata } from '@/lib/cms/metadata';
import type { PricingPage as PricingPageData } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const [data, { settings }] = await Promise.all([
    getGlobal<PricingPageData>('pricing-page' as GlobalSlug),
    getSiteData(),
  ]);
  return buildMetadata(data.seo, { path: '/pricing', fallback: settings.seo });
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
