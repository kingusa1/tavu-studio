import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule | Book Pilates, Yoga & Recovery Classes',
  description:
    'View TAVÚ Studio class schedule and book Reformer Pilates, Mat Pilates, Yoga, Breathwork, Mobility and recovery sessions in Al Raha, Abu Dhabi.',
  alternates: { canonical: '/schedule' },
  openGraph: {
    title: 'TAVÚ Schedule | Book Your Next Class',
    description: 'Reserve your spot in Reformer, Mat Pilates, Yoga, Breathwork and more.',
    url: '/schedule',
  },
};

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
