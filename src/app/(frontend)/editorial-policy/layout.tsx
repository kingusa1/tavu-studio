import type { Metadata } from 'next';

import { getLegalPage } from '@/lib/cms/legal';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';

export async function generateMetadata(): Promise<Metadata> {
  const [page, { settings }] = await Promise.all([getLegalPage('editorial-policy'), getSiteData()]);
  return buildMetadata(page?.seo, { path: '/editorial-policy', fallback: settings.seo });
}

export default function EditorialPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
