import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Memberships | Reset & Ritual Unlimited',
  description:
    'TAVÚ memberships: Reset 820 AED/30 days (4 Contrast, Compression Therapy, massage); Ritual Unlimited 1,390/45 days (Contrast, 2 Compression Therapy, massages).',
  keywords: [
    'Reset membership Abu Dhabi',
    'Ritual Unlimited membership',
    'Contrast Therapy membership Al Raha',
    'Wellness membership Abu Dhabi',
  ],
  alternates: { canonical: '/memberships' },
  openGraph: {
    title: 'TAVÚ Memberships | Reset & Ritual Unlimited',
    description: 'Reset 820 AED and Ritual Unlimited 1,390 AED — Contrast Therapy, Compression Therapy and massage benefits.',
    url: '/memberships',
  },
};

export default function MembershipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
