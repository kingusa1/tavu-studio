import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About TAVÚ | Abu Dhabi\'s Private Wellness Studio',
  description:
    'TAVÚ is Abu Dhabi\'s first private space pairing Reformer Pilates with Contrast Therapy. Learn about our method, our space in Al Raha, and the team.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About TAVÚ Studio',
    description: 'Abu Dhabi\'s first private space for Reformer Pilates and Contrast Therapy.',
    url: '/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
