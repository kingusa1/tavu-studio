import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Appointments | Book Contrast, NormaTec & Massage',
  description:
    'Book private appointments at TAVÚ Studio — Contrast Therapy, NormaTec Compression Therapy and Massage in Al Raha, Abu Dhabi.',
  alternates: { canonical: '/appointments' },
  openGraph: {
    title: 'Book an Appointment at TAVÚ',
    description: 'Private 1-on-1 appointments — Contrast Therapy, Compression Therapy, Massage.',
    url: '/appointments',
  },
};

export default function AppointmentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
