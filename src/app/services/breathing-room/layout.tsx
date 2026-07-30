import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Breathing Room — Mat Pilates, Yoga, Mobility, Breathwork & Yin',
  description:
    'Mat Pilates, Yoga, Mobility, Breathwork and Yin classes at TAVÚ, Al Raha, Abu Dhabi. Drop-in 120 AED, 5-class 550 AED, 10-class 1,020 AED, Unlimited 3-Month 2,400 AED.',
  keywords: [
    'Mat Pilates Abu Dhabi',
    'Breathwork Abu Dhabi',
    'Yoga Al Raha',
    'Mobility class Abu Dhabi',
    'Yin yoga Abu Dhabi',
  ],
  alternates: { canonical: '/services/breathing-room' },
  openGraph: {
    title: 'Breathing Room at TAVÚ | Mat Pilates, Yoga, Breathwork & Mobility',
    description:
      'Mat-based and breath-focused classes. Drop-in 120 AED or Unlimited 3-Month Membership 2,400 AED.',
    url: '/services/breathing-room',
  },
};

export default function BreathingRoomLayout({ children }: { children: React.ReactNode }) {
  return children;
}
