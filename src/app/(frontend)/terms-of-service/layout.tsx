import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms and conditions for classes, appointments, packages and memberships at TAVÚ Wellness Studio, Al Raha, Abu Dhabi — including booking, cancellation and refund policies.',
  alternates: { canonical: '/terms-of-service' },
  openGraph: {
    title: 'Terms of Service | TAVÚ Studio',
    description:
      'Booking, cancellation, membership and refund terms for TAVÚ Wellness Studio.',
    url: '/terms-of-service',
  },
};

export default function TermsOfServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
