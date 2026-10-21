import type { Metadata } from 'next';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';
import type { ClassesPage } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const [page, { settings }] = await Promise.all([getGlobal<ClassesPage>('classes-page'), getSiteData()]);
  return buildMetadata(page.seo, { path: '/classes', fallback: settings.seo });
}

export default function ClassesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
