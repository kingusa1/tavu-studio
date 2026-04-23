import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | Reformer, Contrast Therapy, Massage & Memberships',
  description:
    'TAVÚ pricing — Reformer Pilates from 160 AED, Contrast Therapy from 220 AED, NormaTec Compression 160 AED, Ladies-only Massage from 180 AED, and 3/6/12-month memberships. All prices include VAT.',
  keywords: [
    'Reformer Pilates price Abu Dhabi',
    'Contrast Therapy price Abu Dhabi',
    'NormaTec Abu Dhabi',
    'Pilates membership Al Raha',
    'Ice bath Abu Dhabi price',
    'Massage Abu Dhabi ladies',
  ],
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'TAVÚ Pricing — Reformer, Contrast Therapy, Massage & Memberships',
    description:
      'Transparent pricing. Reformer from 160 AED, Contrast Therapy from 220 AED, Memberships from 1,650 AED/month.',
    url: '/pricing',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
