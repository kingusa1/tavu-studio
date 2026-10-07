import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | Reformer, Contrast Therapy, Massage & Memberships',
  description:
    'TAVÚ pricing — Reformer Pilates from 160 AED, Contrast Therapy from 275 AED (couple 456 AED, trio 600 AED, groups up to six 1,050 AED), NormaTec Compression Therapy 160 AED, Ladies-only Massage from 300 AED, and memberships from 820 AED. All prices include VAT.',
  keywords: [
    'Reformer Pilates price Abu Dhabi',
    'Contrast Therapy price Abu Dhabi',
    'NormaTec Abu Dhabi',
    'TAVÚ memberships Abu Dhabi',
    'Ice bath Abu Dhabi price',
    'Massage Abu Dhabi ladies',
  ],
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'TAVÚ Pricing — Reformer, Contrast Therapy, Massage & Memberships',
    description:
      'Transparent pricing. Reformer from 160 AED, Contrast Therapy from 275 AED, Memberships from 820 AED.',
    url: '/pricing',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
