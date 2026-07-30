import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events & Workshops',
  description:
    'Workshops, seminars and community gatherings at TAVÚ in Al Raha, Abu Dhabi — designed to deepen your movement, breathwork and recovery practice.',
  keywords: [
    'wellness events Abu Dhabi',
    'breathwork workshop Abu Dhabi',
    'Pilates workshop Al Raha',
    'wellness community Abu Dhabi',
  ],
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Events & Workshops at TAVÚ',
    description:
      'Workshops, seminars and community gatherings to deepen your practice.',
    url: '/events',
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
