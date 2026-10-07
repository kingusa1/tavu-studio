import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Pilates, Yoga, Contrast Therapy, Recovery & Massage',
  description:
    'Explore all TAVÚ services — Reformer Pilates, Breathing Room, Contrast Therapy, NormaTec Compression Therapy and Massage in Al Raha, Abu Dhabi.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'TAVÚ Services | Movement, Recovery, Breath',
    description: 'Reformer, mat classes, Contrast Therapy, NormaTec and Massage.',
    url: '/services',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
