import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contrast Therapy (Sauna + Ice Bath) in Abu Dhabi',
  description:
    'Sauna plus ice bath contrast therapy at TAVÚ in Al Raha, Abu Dhabi. Shared session 220 AED, private suite from 275 AED, packs from 990 AED. VAT included.',
  keywords: [
    'Contrast Therapy Abu Dhabi',
    'Ice bath Abu Dhabi',
    'Sauna Abu Dhabi',
    'Infrared Sauna Al Raha',
    'Recovery Abu Dhabi',
  ],
  alternates: { canonical: '/services/contrast-therapy' },
  openGraph: {
    title: 'Contrast Therapy at TAVÚ | Sauna + Ice Bath',
    description:
      'Shared from 220 AED, Private Suite from 275 AED. Infrared + Himalayan Salt Sauna with Ice Bath.',
    url: '/services/contrast-therapy',
  },
};

export default function ContrastLayout({ children }: { children: React.ReactNode }) {
  return children;
}
