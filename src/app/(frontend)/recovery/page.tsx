import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';
import type { GlobalSlug } from 'payload';

import { getGlobal } from '@/lib/cms/globals';
import type { RecoveryPage as RecoveryPageData } from '@/payload-types';

const CARD_DELAYS = [0.1, 0.15, 0.2];

export default async function RecoveryPage() {
  const data = await getGlobal<RecoveryPageData>('recovery-page' as GlobalSlug);
  const cards = data.cards ?? [];

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />

      <main className="flex-grow pt-32 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <MotionWrapper delay={0} direction="up">
              <div className="text-center mb-14">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-primary">{data.title}</h1>
                <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">{data.intro}</p>
              </div>
            </MotionWrapper>

            <div className="grid md:grid-cols-3 gap-8">
              {cards.map((card, index) => (
                <MotionWrapper key={card.id ?? card.href} delay={CARD_DELAYS[index] ?? 0.1} direction="up">
                  <Link
                    href={card.href ?? '#'}
                    className="block bg-card border border-border rounded-2xl p-8 text-center hover:shadow-xl hover:border-accent/30 transition-all h-full"
                  >
                    <h2 className="font-headline text-2xl text-primary mb-3">{card.title}</h2>
                    <p className="text-foreground/70 text-sm mb-4">{card.description}</p>
                    <span className="text-accent font-medium text-sm">{card.priceText}</span>
                  </Link>
                </MotionWrapper>
              ))}
            </div>

            <MotionWrapper delay={0.25} direction="up">
              <div className="text-center mt-14">
                <Link
                  href={data.cta?.href ?? '/pricing'}
                  className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                >
                  {data.cta?.label}
                </Link>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
