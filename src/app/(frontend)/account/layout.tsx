import type { Metadata } from 'next';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';

import type { AccountPageData } from './page';

export async function generateMetadata(): Promise<Metadata> {
  const [page, { settings }] = await Promise.all([getGlobal<AccountPageData>('account-page'), getSiteData()]);
  return buildMetadata(page.seo, { path: '/account', fallback: settings.seo });
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
