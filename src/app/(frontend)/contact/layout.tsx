import type { Metadata } from 'next';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';

import type { ContactPageGlobal } from './page';

export async function generateMetadata(): Promise<Metadata> {
  const [page, { settings }] = await Promise.all([getGlobal<ContactPageGlobal>('contact-page'), getSiteData()]);
  return buildMetadata(page.seo, { path: '/contact', fallback: settings.seo });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
