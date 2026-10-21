import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import FaqAccordionSection from '@/components/faq/FaqAccordionSection';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { getActiveFaqs } from '@/lib/cms/faqs';
import type { FaqTopic } from '@/lib/cms/faqs';
import { getSiteData } from '@/lib/cms/site';
import type { Faq } from '@/payload-types';

const TOPIC_ORDER: FaqTopic[] = [
  'general',
  'reformer-pilates',
  'breathing-room',
  'contrast-therapy',
  'compression-therapy',
  'massage',
  'memberships-pricing',
  'booking',
];

const TOPIC_LABELS: Record<FaqTopic, string> = {
  general: 'General',
  'reformer-pilates': 'Reformer Pilates',
  'breathing-room': 'Breathing Room',
  'contrast-therapy': 'Contrast Therapy',
  'compression-therapy': 'Compression Therapy',
  massage: 'Massage',
  'memberships-pricing': 'Memberships & Pricing',
  booking: 'Booking',
};

export default async function FaqPage() {
  const [faqs, { settings }] = await Promise.all([getActiveFaqs(), getSiteData()]);
  const siteUrl = settings.brand.siteUrl ?? 'https://tavustudio.com';

  const grouped = TOPIC_ORDER.map((topic) => ({
    topic,
    label: TOPIC_LABELS[topic],
    items: faqs.filter((faq) => faq.topic === topic),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />

      <section className="tone-dark relative py-28 lg:py-36 flex items-center justify-center overflow-hidden bg-primary">
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
          <MotionWrapper delay={0} direction="up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline mb-4 text-white">Frequently Asked Questions</h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Answers about Reformer Pilates, Breathing Room, Contrast Therapy, Compression Therapy, massage, memberships and booking.
            </p>
          </MotionWrapper>
        </div>
      </section>

      <main className="flex-grow">
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <Breadcrumbs siteUrl={siteUrl} items={[{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }]} />

            {grouped.length === 0 ? (
              <p className="text-center text-foreground/60 py-16">No FAQs yet.</p>
            ) : (
              <div className="space-y-16">
                {grouped.map((group) => (
                  <FaqAccordionSection
                    key={group.topic}
                    heading={group.label}
                    idPrefix={group.topic}
                    faqs={group.items.map((faq: Faq) => ({ id: faq.id, question: faq.question, answer: faq.answer }))}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
