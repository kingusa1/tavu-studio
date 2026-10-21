import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Classes | Reformer Pilates & Breathing Room (Mat, Release, Stretch)',
  description:
    'Explore all classes at TAVÚ Studio in Al Raha, Abu Dhabi — Reformer Pilates (TA, VÚ and specialty classes) and Breathing Room TAVÚ MAT, RELEASE and STRETCH classes. Small-group sessions throughout the week.',
  alternates: { canonical: '/classes' },
  openGraph: {
    title: 'TAVÚ Classes | Reformer, Mat, Release & Stretch',
    description: 'Small-group classes for every rhythm — strength, flow, breath and stillness.',
    url: '/classes',
  },
};

export default function ClassesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
