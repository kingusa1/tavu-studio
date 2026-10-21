import Image from 'next/image';
import Link from 'next/link';

import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import { serviceAccents } from '@/components/cms/accents';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
import { getGlobal } from '@/lib/cms/globals';
import { resolveImage } from '@/lib/cms/media';
import type { ServicesPage as ServicesPageData } from '@/payload-types';

export default async function ServicesPage() {
  const data = await getGlobal<ServicesPageData>('services-page');
  const items = data.items ?? [];

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <MotionWrapper delay={0} direction="up" immediate>
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">{data.hero?.eyebrow}</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-primary">{data.hero?.title}</h1>
            <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">{data.hero?.intro}</p>
          </MotionWrapper>
        </div>
      </section>

      <main className="flex-grow pb-20">
        {/* Services Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 max-w-6xl mx-auto">
              {items.map((service, index) => {
                const image = resolveImage(service.image);
                const accentClass = service.accent ? serviceAccents[service.accent] : undefined;
                return (
                  <MotionWrapper key={service.id ?? index} delay={0.1 * (index + 1)} direction="up">
                    <Link href={service.href || '#'} className="block group">
                      <div
                        className={`relative bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 ${
                          index % 2 === 0 ? '' : 'md:flex-row-reverse'
                        }`}
                      >
                        <div className={`grid md:grid-cols-2 gap-0 ${index % 2 !== 0 ? 'md:[direction:rtl]' : ''}`}>
                          {/* Image */}
                          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[350px] overflow-hidden">
                            {image && (
                              <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className={`object-cover group-hover:scale-105 transition-transform duration-700 ${
                                  service.imagePosition === 'center-40' ? 'object-[center_40%]' : ''
                                }`}
                              />
                            )}
                            <div className={`absolute inset-0 bg-gradient-to-t ${accentClass ?? ''} to-transparent opacity-60`} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          </div>

                          {/* Content */}
                          <div className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 !== 0 ? 'md:[direction:ltr]' : ''}`}>
                            <span className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">{service.eyebrow}</span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4 group-hover:text-accent transition-colors">
                              {service.name}
                            </h2>
                            <p className="text-foreground/70 text-lg leading-relaxed mb-6">{service.description}</p>

                            {/* Features */}
                            <div className="flex flex-wrap gap-3 mb-6">
                              {service.features?.map((feature, i) => (
                                <span key={i} className="text-sm bg-muted/50 text-foreground/70 px-4 py-2 rounded-full">
                                  {feature.text}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all">
                              <span>{data.learnMoreLabel}</span>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </MotionWrapper>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {data.cta?.enabled && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <MotionWrapper delay={0.1} direction="up">
                <div className="max-w-4xl mx-auto text-center glass p-10 md:p-16 rounded-3xl">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">{data.cta.heading}</h2>
                  <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">{data.cta.text}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {data.cta.buttons?.map((button, index) => (
                      <Link
                        key={index}
                        href={button.link.href}
                        className={
                          button.style === 'outline'
                            ? 'inline-flex items-center justify-center h-14 px-10 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-accent-foreground transition-all text-lg'
                            : 'inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg'
                        }
                      >
                        {button.link.label}
                      </Link>
                    ))}
                  </div>
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
