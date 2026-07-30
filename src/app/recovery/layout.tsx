import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recovery — Contrast Therapy, Compression & Massage',
  description:
    'Recovery at TAVÚ in Al Raha, Abu Dhabi: Contrast Therapy (infrared sauna + ice bath) from 220 AED, NormaTec Compression from 160 AED, and ladies-only massage from 180 AED.',
  keywords: [
    'recovery studio Abu Dhabi',
    'ice bath Abu Dhabi',
    'infrared sauna Abu Dhabi',
    'NormaTec compression Abu Dhabi',
    'sports recovery Al Raha',
  ],
  alternates: { canonical: '/recovery' },
  openGraph: {
    title: 'Recovery at TAVÚ',
    description:
      'Restore, recover and rejuvenate — Contrast Therapy, Compression Therapy and Massage.',
    url: '/recovery',
  },
};

export default function RecoveryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
