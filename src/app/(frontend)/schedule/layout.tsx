import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule | Book Pilates & Recovery Classes',
  description:
    'View TAVÚ Studio class schedule and book Reformer Pilates, Mat, Release and Stretch classes and recovery sessions in Al Raha, Abu Dhabi.',
  alternates: { canonical: '/schedule' },
  openGraph: {
    title: 'TAVÚ Schedule | Book Your Next Class',
    description: 'Reserve your spot in Reformer, Mat, Release, Stretch and more.',
    url: '/schedule',
  },
};

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
