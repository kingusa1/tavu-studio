import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contrast Therapy (Sauna + Ice Bath) in Abu Dhabi',
  description:
    'Sauna plus ice bath contrast therapy at TAVÚ in Al Raha, Abu Dhabi. Private individual drop-in 275 AED, couple 456 AED, trio 600 AED, groups up to six 1,050 AED. VAT included.',
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
      'Private individual drop-in 275 AED, couple 456 AED, trio 600 AED, groups up to six 1,050 AED.',
    url: '/services/contrast-therapy',
  },
};

export default function ContrastLayout({ children }: { children: React.ReactNode }) {
  return children;
}
