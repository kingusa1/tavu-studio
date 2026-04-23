import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Appointments | Book Contrast, NormaTec, Massage & IV Therapy',
  description:
    'Book private appointments at TAVÚ Studio — Contrast Therapy, NormaTec Compression, Massage and IV Therapy in Al Raha, Abu Dhabi.',
  alternates: { canonical: '/appointments' },
  openGraph: {
    title: 'Book an Appointment at TAVÚ',
    description: 'Private 1-on-1 appointments — Contrast Therapy, Compression, Massage, IV Therapy.',
    url: '/appointments',
  },
};

export default function AppointmentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
