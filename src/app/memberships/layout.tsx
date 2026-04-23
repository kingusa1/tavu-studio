import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Memberships | 3, 6 & 12-Month Wellness Plans',
  description:
    'TAVÚ memberships: 3 months 1,850 AED/month, 6 months 1,750 AED/month, 12 months 1,650 AED/month. Reformer up to 4x/week, unlimited mat, Contrast up to 3x/week.',
  keywords: [
    'Pilates membership Abu Dhabi',
    'Wellness membership Al Raha',
    'Unlimited Pilates Abu Dhabi',
    'Monthly Reformer',
  ],
  alternates: { canonical: '/memberships' },
  openGraph: {
    title: 'TAVÚ Memberships | Full-Access Wellness',
    description: 'From 1,650 AED/month. Reformer, mat classes, Contrast Therapy and 20% off add-ons.',
    url: '/memberships',
  },
};

export default function MembershipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
