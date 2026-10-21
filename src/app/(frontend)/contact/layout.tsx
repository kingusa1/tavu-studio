import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact TAVÚ Studio | Al Raha, Abu Dhabi',
  description:
    'Get in touch with TAVÚ Studio in Al Raha, Abu Dhabi. WhatsApp, email, Instagram @tavuwellness.studio. We\'re here to help you start your wellness journey.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact TAVÚ Studio',
    description: 'Reach us via WhatsApp, email or Instagram.',
    url: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
