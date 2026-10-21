import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Breathing Room — Mat, Release and Stretch Classes',
  description:
    'Mat, Release and Stretch classes at TAVÚ, Al Raha, Abu Dhabi. Drop-in 120 AED, class packs from 1,100 AED.',
  keywords: [
    'Mat Pilates Abu Dhabi',
    'Stretch class Abu Dhabi',
    'Release class Al Raha',
    'Mobility class Abu Dhabi',
  ],
  alternates: { canonical: '/services/breathing-room' },
  openGraph: {
    title: 'Breathing Room at TAVÚ | Mat, Release and Stretch Classes',
    description:
      'Mat-based and breath-focused classes. Drop-in 120 AED or class packs from 1,100 AED.',
    url: '/services/breathing-room',
  },
};

export default function BreathingRoomLayout({ children }: { children: React.ReactNode }) {
  return children;
}
