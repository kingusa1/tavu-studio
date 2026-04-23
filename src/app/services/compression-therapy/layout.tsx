import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compression Therapy (NormaTec) in Abu Dhabi',
  description:
    'NormaTec compression therapy for faster recovery at TAVÚ in Al Raha, Abu Dhabi. 45-minute session, 160 AED. Boosts circulation, reduces swelling, flushes lactic acid.',
  keywords: [
    'NormaTec Abu Dhabi',
    'Compression Therapy Abu Dhabi',
    'Recovery Al Raha',
    'Pulsing compression',
    'Lymphatic drainage Abu Dhabi',
  ],
  alternates: { canonical: '/services/compression-therapy' },
  openGraph: {
    title: 'Compression Therapy at TAVÚ | NormaTec Recovery',
    description:
      'NormaTec pulsing compression for faster muscle recovery. 45 min — 160 AED.',
    url: '/services/compression-therapy',
  },
};

export default function CompressionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
