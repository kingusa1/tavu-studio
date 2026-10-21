import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partnerships & Corporate Wellness',
  description:
    'Partner with TAVÚ in Abu Dhabi — corporate wellness programmes, athlete and team recovery, brand collaborations and customizable partnership structures.',
  keywords: [
    'corporate wellness Abu Dhabi',
    'athlete recovery partnership UAE',
    'brand collaboration wellness Abu Dhabi',
    'team recovery Abu Dhabi',
  ],
  alternates: { canonical: '/partnerships' },
  openGraph: {
    title: 'Partnerships at TAVÚ',
    description:
      'Collaborate with TAVÚ to bring wellness to your organization or brand.',
    url: '/partnerships',
  },
};

export default function PartnershipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
