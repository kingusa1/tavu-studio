import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Your Account',
  description:
    'Create your TAVÚ account to book classes, manage packages and track your wellness journey.',
  alternates: { canonical: '/register' },
  // Account funnel pages are excluded from search (also disallowed in robots.txt)
  robots: { index: false, follow: true },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
