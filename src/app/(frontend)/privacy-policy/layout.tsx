import type { Metadata } from 'next';

import { getLegalPage } from '@/lib/cms/legal';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';

export async function generateMetadata(): Promise<Metadata> {
  const [page, { settings }] = await Promise.all([getLegalPage('privacy-policy'), getSiteData()]);
  return buildMetadata(page?.seo, { path: '/privacy-policy', fallback: settings.seo });
}

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
