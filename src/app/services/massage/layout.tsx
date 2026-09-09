import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Massage in Abu Dhabi | Ladies-Only at TAVÚ',
  description:
    'Ladies-only massage at TAVÚ in Al Raha, Abu Dhabi. FLOW, RELEASE, RECOVER and DRAIN full-body rituals from 350 AED, targeted recovery rituals from 300 AED, ROOTED foot reflexology 320 AED and the 3-hour Recovery Escape 800 AED. Ritual Packs 5 + 1 included.',
  keywords: [
    'Massage Abu Dhabi',
    'Ladies massage Al Raha',
    'Deep tissue massage Abu Dhabi',
    'Foot massage Abu Dhabi',
    'Sports massage Abu Dhabi',
    'Lymphatic drainage massage Abu Dhabi',
    'Reflexology Abu Dhabi',
  ],
  alternates: { canonical: '/services/massage' },
  openGraph: {
    title: 'Massage at TAVÚ | Ladies-Only',
    description:
      'FLOW, RELEASE, RECOVER and DRAIN full-body rituals, targeted recovery rituals and the ROOTED foot ritual. From 300 AED.',
    url: '/services/massage',
  },
};

export default function MassageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
