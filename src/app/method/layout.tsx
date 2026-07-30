import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Method — TA (Grounding) & VÚ (Flow)',
  description:
    'The TAVÚ method: rooted in TA (grounding) and VÚ (flow), a curated practice designed to soothe the nervous system, restore clarity and build strength through a structured progression system.',
  keywords: [
    'TAVU method',
    'Reformer Pilates progression',
    'nervous system regulation Abu Dhabi',
    'breathwork method',
  ],
  alternates: { canonical: '/method' },
  openGraph: {
    title: 'The TAVÚ Method',
    description:
      'TA — stillness. VÚ — flow. A single curated method built on a structured progression system.',
    url: '/method',
  },
};

export default function MethodLayout({ children }: { children: React.ReactNode }) {
  return children;
}
