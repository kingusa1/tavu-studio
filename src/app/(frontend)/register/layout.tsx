import type { Metadata } from 'next';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';

import type { RegisterPageData } from './page';

export async function generateMetadata(): Promise<Metadata> {
  const [page, { settings }] = await Promise.all([getGlobal<RegisterPageData>('register-page'), getSiteData()]);
  return buildMetadata(page.seo, { path: '/register', fallback: settings.seo });
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
