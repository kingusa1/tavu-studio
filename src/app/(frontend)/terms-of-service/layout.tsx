import type { Metadata } from 'next';

import { getLegalPage } from '@/lib/cms/legal';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';

export async function generateMetadata(): Promise<Metadata> {
  const [page, { settings }] = await Promise.all([getLegalPage('terms-of-service'), getSiteData()]);
  return buildMetadata(page?.seo, { path: '/terms-of-service', fallback: settings.seo });
}

export default function TermsOfServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
