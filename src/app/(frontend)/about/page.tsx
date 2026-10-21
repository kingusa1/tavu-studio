import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';
import Image from 'next/image';
import type { GlobalSlug } from 'payload';

import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { getGlobal } from '@/lib/cms/globals';
import { resolveImage } from '@/lib/cms/media';
import { getSiteData } from '@/lib/cms/site';
import type { AboutPage as AboutPageData } from '@/payload-types';

export default async function AboutPage() {
    const [about, { settings }] = await Promise.all([getGlobal<AboutPageData>('about-page' as GlobalSlug), getSiteData()]);
    const siteUrl = settings.brand.siteUrl ?? 'https://tavustudio.com';

    const heroImage = resolveImage(about.hero.image);
    const panels = about.philosophy?.panels ?? [];
    const panel1 = panels[0];
    const panel2 = panels[1];
    const panel1Image = resolveImage(panel1?.image);
    const panel2Image = resolveImage(panel2?.image);
    const journeyImage = resolveImage(about.journey?.image);
    const galleryImages = (about.gallery?.images ?? []).map((row) => resolveImage(row.image));

    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section */}
            <section className="tone-dark relative h-[70vh] min-h-[520px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 z-10" />
                <div className="absolute inset-0">
                    {heroImage && (
                        <Image
                            src={heroImage.src}
                            alt={heroImage.alt}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                    )}
                </div>
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <MotionWrapper delay={0} direction="up" immediate>
                        <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                            {about.hero.eyebrow}
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-white">{about.hero.title}</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-4">
                            {about.hero.intro}
                        </p>
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                            {about.hero.tagline}
                        </p>
                    </MotionWrapper>
                </div>
            </section>

            <main className="flex-grow">
                {/* TA vs VU split */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <Breadcrumbs siteUrl={siteUrl} items={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]} />
                        <MotionWrapper delay={0} direction="up">
                            <div className="text-center max-w-2xl mx-auto mb-16">
                                <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                                    {about.philosophy?.eyebrow}
                                </span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mb-4">
                                    {about.philosophy?.heading}
                                </h2>
                                <div className="space-y-3 text-lg text-foreground/70">
                                    {(about.philosophy?.lines ?? []).map((line, i) => (
                                        <p key={line.id ?? i}>{line.text}</p>
                                    ))}
                                </div>
                            </div>
                        </MotionWrapper>

                        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {/* TA — grounds the body */}
                            <MotionWrapper delay={0.1} direction="left">
                                <div className="group relative rounded-3xl overflow-hidden h-[520px] shadow-2xl">
                                    {panel1Image && (
                                        <Image
                                            src={panel1Image.src}
                                            alt={panel1Image.alt}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
                                    <div className="tone-dark absolute inset-0 flex flex-col justify-end p-8 md:p-10 text-white">
                                        <span className="font-headline text-8xl md:text-9xl leading-none mb-2 text-accent">{panel1?.label}</span>
                                        <h3 className="text-2xl md:text-3xl font-headline mb-3">{panel1?.heading}</h3>
                                        <p className="text-white/80 text-base leading-relaxed max-w-md">
                                            {panel1?.text}
                                        </p>
                                    </div>
                                </div>
                            </MotionWrapper>

                            {/* VU — lifts the spirit */}
                            <MotionWrapper delay={0.15} direction="right">
                                <div className="group relative rounded-3xl overflow-hidden h-[520px] shadow-2xl">
                                    {panel2Image && (
                                        <Image
                                            src={panel2Image.src}
                                            alt={panel2Image.alt}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
                                    <div className="tone-dark absolute inset-0 flex flex-col justify-end p-8 md:p-10 text-white">
                                        <span className="font-headline text-8xl md:text-9xl leading-none mb-2 text-accent">{panel2?.label}</span>
                                        <h3 className="text-2xl md:text-3xl font-headline mb-3">{panel2?.heading}</h3>
                                        <p className="text-white/80 text-base leading-relaxed max-w-md">
                                            {panel2?.text}
                                        </p>
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="py-20 lg:py-28 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                            <MotionWrapper delay={0.1} direction="left">
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-xl">
                                    {journeyImage && (
                                        <Image
                                            src={journeyImage.src}
                                            alt={journeyImage.alt}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                    )}
                                </div>
                            </MotionWrapper>
                            <MotionWrapper delay={0.2} direction="right">
                                <div>
                                    <span className="text-accent font-medium text-sm tracking-wider uppercase">{about.journey?.eyebrow}</span>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mt-2 mb-6">{about.journey?.heading}</h2>
                                    <div className="space-y-4 text-lg text-foreground/70">
                                        <p>
                                            {about.journey?.intro}
                                        </p>
                                        <p className="font-medium text-foreground/80">
                                            <span className="text-accent">{about.journey?.taLabel}</span> {about.journey?.taText}<br />
                                            <span className="text-accent">{about.journey?.vuLabel}</span> {about.journey?.vuText}
                                        </p>
                                        <p>
                                            {about.journey?.paragraph2}
                                        </p>
                                        <p>
                                            {about.journey?.paragraph3}
                                        </p>
                                        <p className="text-foreground/80 italic">
                                            {about.journey?.closingLine1}<br />
                                            {about.journey?.closingLine2}
                                        </p>
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>
                    </div>
                </section>

                {/* Studio Gallery */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0} direction="up">
                            <div className="text-center max-w-2xl mx-auto mb-14">
                                <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                                    {about.gallery?.eyebrow}
                                </span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mb-4">
                                    {about.gallery?.heading}
                                </h2>
                                <p className="text-lg text-foreground/70">
                                    {about.gallery?.intro}
                                </p>
                            </div>
                        </MotionWrapper>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
                            {galleryImages.map((img, i) => (
                                <MotionWrapper key={i} delay={0.05 * i} direction="up">
                                    <div className="relative aspect-square overflow-hidden rounded-2xl group">
                                        {img && (
                                            <Image
                                                src={img.src}
                                                alt={img.alt}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                {about.cta?.enabled !== false && (
                    <section className="py-20 bg-primary text-primary-foreground">
                        <div className="container mx-auto px-4 text-center">
                            <MotionWrapper delay={0.1} direction="up">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline mb-6">{about.cta?.heading}</h2>
                                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                    {about.cta?.text}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    {(about.cta?.buttons ?? []).map((button, i) => (
                                        <Link
                                            key={button.id ?? i}
                                            href={button.link.href}
                                            className={
                                                button.style === 'outline'
                                                    ? 'inline-flex items-center justify-center h-14 px-10 rounded-full bg-transparent border-2 border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-all text-lg'
                                                    : 'inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg'
                                            }
                                        >
                                            {button.link.label}
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
