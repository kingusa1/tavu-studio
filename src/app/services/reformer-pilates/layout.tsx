import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reformer Pilates in Abu Dhabi | Small-Group Classes',
  description:
    'Small-group Reformer Pilates classes at TAVÚ in Al Raha, Abu Dhabi. Drop-in 160 AED and class packs from 1,260 AED. Build strength, mobility and control.',
  keywords: [
    'Reformer Pilates Abu Dhabi',
    'Reformer Pilates Al Raha',
    'Pilates classes Abu Dhabi',
    'Small group Reformer',
  ],
  alternates: { canonical: '/services/reformer-pilates' },
  openGraph: {
    title: 'Reformer Pilates in Abu Dhabi | TAVÚ Studio',
    description:
      'Small-group Reformer Pilates at TAVÚ Studio, Al Raha. From 160 AED drop-in.',
    url: '/services/reformer-pilates',
  },
};

export default function ReformerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
