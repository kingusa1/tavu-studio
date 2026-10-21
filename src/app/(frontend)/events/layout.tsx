import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events & Collaborations',
  description:
    'Special events and collaborations at TAVÚ in Al Raha, Abu Dhabi — ALO x TAVÚ collaborations, private events, BeyondLeFifth running club gatherings, and Full Moon & New Moon sound healing.',
  keywords: [
    'wellness events Abu Dhabi',
    'sound healing Abu Dhabi',
    'running club Al Raha',
    'private events Abu Dhabi',
  ],
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Events & Collaborations at TAVÚ',
    description:
      'ALO x TAVÚ collaborations, private events, BeyondLeFifth running club and Full Moon / New Moon sound healing.',
    url: '/events',
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
