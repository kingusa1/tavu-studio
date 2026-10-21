import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';
import Image from 'next/image';

import { getIcon } from '@/components/icons/cmsIcons';
import { getEvents } from '@/lib/cms/events';
import { getGlobal } from '@/lib/cms/globals';
import { resolveImage } from '@/lib/cms/media';
import type { ImageFieldValue } from '@/lib/cms/media';
import type { SeoFieldValue } from '@/lib/cms/metadata';
import type { LinkValue } from '@/lib/cms/site';
import type { Event } from '@/payload-types';

export type EventsPageData = {
  hero: { image?: ImageFieldValue; title?: string | null; intro?: string | null };
  upcoming: { eyebrow?: string | null; heading?: string | null; emptyText?: string | null };
  eventTypes: {
    eyebrow?: string | null;
    heading?: string | null;
    items?: Array<{ icon?: string | null; title?: string | null; description?: string | null }> | null;
  };
  highlights: { eyebrow?: string | null; heading?: string | null };
  cta: {
    enabled?: boolean | null;
    heading?: string | null;
    text?: string | null;
    buttons?: Array<{ link?: LinkValue; style?: 'primary' | 'outline' | null }> | null;
  };
  seo: SeoFieldValue;
};

export default async function EventsPage() {
  const [data, upcomingEvents, highlightEvents] = await Promise.all([
    getGlobal<EventsPageData>('events-page'),
    getEvents('upcoming'),
    getEvents('highlight'),
  ]);

  const heroImage = resolveImage(data.hero.image);

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />

      {/* Hero Section */}
      <section className="tone-dark relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60 z-10" />
        <div className="absolute inset-0">
          {heroImage && (
            <Image src={heroImage.src} alt={heroImage.alt} fill className="object-cover" priority sizes="100vw" />
          )}
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <MotionWrapper delay={0} direction="up" immediate>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-white">{data.hero.title}</h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">{data.hero.intro}</p>
          </MotionWrapper>
        </div>
      </section>

      <main className="flex-grow">
        {/* Upcoming Events */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4">
            <MotionWrapper delay={0.1} direction="up">
              <div className="text-center mb-16">
                <span className="text-accent font-medium text-sm tracking-wider uppercase">{data.upcoming.eyebrow}</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mt-2">{data.upcoming.heading}</h2>
              </div>
            </MotionWrapper>

            {upcomingEvents.length === 0 ? (
              data.upcoming.emptyText && (
                <p className="text-center text-foreground/60 max-w-xl mx-auto">{data.upcoming.emptyText}</p>
              )
            ) : (
              <div className="space-y-6 max-w-4xl mx-auto">
                {upcomingEvents.map((event: Event, index: number) => {
                  const images = (event.images ?? [])
                    .map((row) => resolveImage(row.image))
                    .filter((img): img is NonNullable<typeof img> => Boolean(img));
                  return (
                    <MotionWrapper key={event.id} delay={0.1 + index * 0.1} direction="up">
                      <div className="bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="grid md:grid-cols-3 gap-0">
                          <div className="aspect-video md:aspect-auto relative min-h-[200px] grid grid-cols-2 gap-1">
                            {images.map((img, imgIndex) => (
                              <div key={imgIndex} className="relative h-full">
                                <Image
                                  src={img.src}
                                  alt={event.title}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 50vw, 17vw"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="md:col-span-2 p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium">
                                {event.categoryLabel}
                              </span>
                              <span className="text-sm text-foreground/60">{event.dateLabel}</span>
                            </div>
                            <h3 className="text-2xl font-headline text-primary mb-3">{event.title}</h3>
                            <p className="text-foreground/70 mb-4">{event.description}</p>
                            <p className="text-sm text-foreground/50">{event.timeLabel}</p>
                          </div>
                        </div>
                      </div>
                    </MotionWrapper>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Event Types */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <MotionWrapper delay={0.1} direction="up">
              <div className="text-center mb-16">
                <span className="text-accent font-medium text-sm tracking-wider uppercase">{data.eventTypes.eyebrow}</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mt-2">{data.eventTypes.heading}</h2>
              </div>
            </MotionWrapper>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {(data.eventTypes.items ?? []).map((type, index) => {
                const Icon = type.icon ? getIcon('event', type.icon) : undefined;
                return (
                  <MotionWrapper key={`${type.title}-${index}`} delay={0.1 + index * 0.05} direction="up">
                    <div className="bg-card border border-border p-6 rounded-2xl text-center h-full">
                      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        {Icon && <Icon className="w-8 h-8 text-accent" />}
                      </div>
                      <h3 className="text-xl font-headline text-primary mb-2">{type.title}</h3>
                      <p className="text-sm text-foreground/70">{type.description}</p>
                    </div>
                  </MotionWrapper>
                );
              })}
            </div>
          </div>
        </section>

        {/* Events, Partnerships & Community */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4">
            <MotionWrapper delay={0.1} direction="up">
              <div className="text-center mb-16">
                <span className="text-accent font-medium text-sm tracking-wider uppercase">{data.highlights.eyebrow}</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mt-2">{data.highlights.heading}</h2>
              </div>
            </MotionWrapper>

            <div className="space-y-10 max-w-6xl mx-auto">
              {highlightEvents.map((item: Event, index: number) => {
                const images = (item.images ?? [])
                  .map((row) => resolveImage(row.image))
                  .filter((img): img is NonNullable<typeof img> => Boolean(img));
                const logo = resolveImage(item.logo);
                return (
                  <MotionWrapper key={item.id} delay={0.1 + index * 0.05} direction="up">
                    <div className="bg-card border border-border rounded-2xl overflow-hidden">
                      <div className={`grid gap-0 ${images.length > 0 ? 'md:grid-cols-5' : 'md:grid-cols-3'}`}>
                        <div
                          className={`${images.length > 0 ? 'md:col-span-3' : 'md:col-span-1'} ${index % 2 === 1 ? 'md:order-2' : ''}`}
                        >
                          {images.length > 0 ? (
                            <div className="grid grid-cols-2 gap-1 h-full">
                              {images.map((img, imgIndex) => (
                                <div key={imgIndex} className="relative aspect-[4/5] md:aspect-auto md:min-h-[360px]">
                                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 30vw" />
                                </div>
                              ))}
                            </div>
                          ) : logo ? (
                            <div className="relative h-full min-h-[220px] bg-white flex items-center justify-center p-8">
                              <div className="relative w-48 h-40">
                                <Image src={logo.src} alt={logo.alt} fill className="object-contain" sizes="192px" />
                              </div>
                            </div>
                          ) : null}
                        </div>
                        <div className="md:col-span-2 p-6 md:p-10 flex flex-col justify-center">
                          {images.length > 0 && logo && (
                            <div className="relative w-14 h-14 mb-4">
                              <Image src={logo.src} alt={logo.alt} fill className="object-contain" sizes="56px" />
                            </div>
                          )}
                          <span className="inline-block self-start bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium mb-3">
                            {item.categoryLabel}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-headline text-primary mb-3">{item.title}</h3>
                          <p className="text-foreground/70 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </MotionWrapper>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stay Updated */}
        {data.cta.enabled && (
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <MotionWrapper delay={0.1} direction="up">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline mb-6">{data.cta.heading}</h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">{data.cta.text}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {(data.cta.buttons ?? []).map((button, index) => (
                    <Link
                      key={index}
                      href={button.link?.href || '#'}
                      className={
                        button.style === 'outline'
                          ? 'inline-flex items-center justify-center h-14 px-10 rounded-full bg-transparent border-2 border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-all text-lg'
                          : 'inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg'
                      }
                    >
                      {button.link?.label}
                    </Link>
                  ))}
                </div>
              </MotionWrapper>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
