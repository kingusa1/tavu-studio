import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Account',
  description:
    'Access your TAVÚ bookings, manage packages and track your wellness journey.',
  alternates: { canonical: '/account' },
  // Private area — excluded from search (also disallowed in robots.txt)
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
