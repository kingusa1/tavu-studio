import type { Metadata } from 'next';
import type { GlobalSlug } from 'payload';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import type { PricingPage as PricingPageData } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobal<PricingPageData>('pricing-page' as GlobalSlug);
  return buildMetadata(data.seo, { path: '/pricing' });
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
