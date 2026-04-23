import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Classes | Reformer, Mat Pilates, Yoga, Breathwork & Mobility',
  description:
    'Explore all classes at TAVÚ Studio in Al Raha, Abu Dhabi — Reformer Pilates, Mat Pilates, Yoga, Breathwork, Mobility and Yin. Small-group sessions throughout the week.',
  alternates: { canonical: '/classes' },
  openGraph: {
    title: 'TAVÚ Classes | Reformer, Mat, Yoga, Breathwork',
    description: 'Small-group classes for every rhythm — strength, flow, breath and stillness.',
    url: '/classes',
  },
};

export default function ClassesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
