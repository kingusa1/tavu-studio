import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How TAVÚ Wellness Studio collects, uses, stores and protects your personal data, and the rights you have over it.',
  alternates: { canonical: '/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy | TAVÚ Studio',
    description: 'How TAVÚ Wellness Studio handles and protects your personal data.',
    url: '/privacy-policy',
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
