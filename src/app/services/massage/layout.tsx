import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Massage in Abu Dhabi | Ladies-Only at TAVÚ',
  description:
    'Ladies-only massage at TAVÚ in Al Raha, Abu Dhabi. Destress, Relaxing, Deep Tissue from 300 AED, Foot Ritual 180 AED, Express Head/Neck/Shoulder 220 AED.',
  keywords: [
    'Massage Abu Dhabi',
    'Ladies massage Al Raha',
    'Deep tissue massage Abu Dhabi',
    'Foot massage Abu Dhabi',
    'Destress massage Abu Dhabi',
  ],
  alternates: { canonical: '/services/massage' },
  openGraph: {
    title: 'Massage at TAVÚ | Ladies-Only',
    description:
      'Destress, Relaxing, Deep Tissue, Foot Ritual, Express Head/Neck/Shoulder. From 180 AED.',
    url: '/services/massage',
  },
};

export default function MassageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
