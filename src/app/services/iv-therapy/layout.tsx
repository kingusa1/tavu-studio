import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IV Therapy in Abu Dhabi',
  description:
    'Intravenous vitamin and hydration therapy at TAVÚ in Al Raha, Abu Dhabi — delivered directly to your bloodstream to support hydration, energy and recovery.',
  keywords: [
    'IV Therapy Abu Dhabi',
    'IV drip Al Raha',
    'vitamin drip Abu Dhabi',
    'hydration therapy Abu Dhabi',
  ],
  alternates: { canonical: '/services/iv-therapy' },
  openGraph: {
    title: 'IV Therapy at TAVÚ | Abu Dhabi',
    description:
      'Intravenous vitamin and hydration therapy for optimal wellness.',
    url: '/services/iv-therapy',
  },
};

export default function IvTherapyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
