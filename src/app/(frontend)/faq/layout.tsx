import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/cms/metadata';
import { getSiteData } from '@/lib/cms/site';

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteData();
  return buildMetadata(
    {
      title: 'Frequently Asked Questions',
      description: 'Answers about Reformer Pilates, Breathing Room, Contrast Therapy, Compression Therapy, massage, memberships and booking at TAVÚ Studio.',
    },
    { path: '/faq', fallback: settings.seo },
  );
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
