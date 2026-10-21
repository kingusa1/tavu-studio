import type { Metadata } from 'next';

import { getGlobal } from '@/lib/cms/globals';
import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';
import type { BreathingRoomPage } from '@/payload-types';

export async function generateMetadata(): Promise<Metadata> {
  const [page, { settings }] = await Promise.all([getGlobal<BreathingRoomPage>('breathing-room-page'), getSiteData()]);
  return buildMetadata(page.seo, { path: '/services/breathing-room', fallback: settings.seo });
}

export default function BreathingRoomLayout({ children }: { children: React.ReactNode }) {
  return children;
}
