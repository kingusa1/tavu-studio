"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Image from 'next/image';
import Link from 'next/link';

const fullBodyRituals = [
    {
        name: 'FLOW | Relaxation Massage',
        description: 'A slow, full-body ritual designed to soften muscular tension, calm the nervous system and return the body to balance.',
        duration: '60 Minutes',
        price: '350 AED',
        pack: 'Ritual Pack | 5 + 1 Included — 1,890 AED',
        packNote: 'Six-session value 2,100 AED · Valid for 45 days',
        benefits: ['Softens muscular tension', 'Calms the nervous system', 'Returns the body to balance'],
    },
    {
        name: 'RELEASE | Deep Tissue Massage',
        description: 'A focused, full-body treatment using deeper pressure to release muscular tightness, improve mobility and support recovery.',
        duration: '60 Minutes',
        price: '350 AED',
        pack: 'Ritual Pack | 5 + 1 Included — 1,890 AED',
        packNote: 'Six-session value 2,100 AED · Valid for 45 days',
        benefits: ['Releases muscular tightness', 'Improves mobility', 'Supports recovery'],
    },
    {
        name: 'RECOVER | Sports Massage',
        description: 'A therapeutic full-body massage created for active bodies, targeting muscular fatigue, restricted movement and areas requiring deeper recovery.',
        duration: '60 Minutes',
        price: '350 AED',
        pack: 'Ritual Pack | 5 + 1 Included — 1,890 AED',
        packNote: 'Six-session value 2,100 AED · Valid for 45 days',
        benefits: ['Targets muscular fatigue', 'Restores restricted movement', 'Created for active bodies'],
    },
    {
        name: 'DRAIN | Lymphatic Massage',
        description: 'A specialized, gentle treatment designed to support lymphatic drainage, reduce fluid retention and leave the body feeling lighter.',
        duration: '60 Minutes',
        price: '450 AED',
        pack: 'Ritual Pack | 5 + 1 Included — 2,430 AED',
        packNote: 'Six-session value 2,700 AED · Valid for 45 days',
        benefits: ['Supports lymphatic drainage', 'Reduces fluid retention', 'Leaves the body feeling lighter'],
    },
];

const targetedRituals = [
    {
        name: 'RESET | Head, Neck & Shoulders',
        description: 'A focused massage to release tension through the scalp, neck, shoulders and upper back.',
        addOn: '150', ritual: '300', pack: '1,620',
    },
    {
        name: 'RECOVER | Deep Foot Recovery',
        description: 'An intensive treatment combining therapeutic massage, percussion therapy and targeted pressure-point techniques.',
        addOn: '150', ritual: '320', pack: '1,728',
    },
    {
        name: 'RELEASE | Arm & Hand Recovery',
        description: 'Designed to relieve tightness through the hands, wrists, forearms and arms. Ideal for desk-related tension, regular training and daily muscle fatigue.',
        addOn: '150', ritual: '300', pack: '1,620',
    },
    {
        name: 'GROUND | Scalp Therapy',
        description: 'A calming scalp ritual that encourages deep relaxation and releases mental and physical tension.',
        addOn: '150', ritual: '300', pack: '1,620',
    },
    {
        name: 'LIFT | Facial Recovery',
        description: 'A sculpting facial massage that supports lymphatic drainage, releases facial tension and restores a natural glow.',
        addOn: '150', ritual: '350', pack: '1,890',
    },
];

const rootedIncludes = [
    '20-minute therapeutic foot soak',
    'Choice of signature salt blend',
    'Hot towel ritual',
    '30-minute foot reflexology massage',
    'TAVÚ signature herbal tea',
];

const saltBlends = [
    { name: 'RECOVER', description: 'Peppermint and eucalyptus for tired muscles and active bodies.' },
    { name: 'CALM', description: 'Lavender and chamomile for softness, relaxation and stillness.' },
    { name: 'REVIVE', description: 'Ginger and lemon for a warming and refreshing reset.' },
];

const recoveryEscapeIncludes = [
    'Exclusive access to the Main Contrast Suite',
    'Traditional sauna with Himalayan salt',
    'Ice bath experience',
    'Private shower facilities',
    '60-minute full-body therapeutic massage',
    'TAVÚ signature herbal tea',
];

const packageSummary = [
    { ritual: '300', value: '1,800', pack: '1,620', saving: '180' },
    { ritual: '320', value: '1,920', pack: '1,728', saving: '192' },
    { ritual: '350', value: '2,100', pack: '1,890', saving: '210' },
    { ritual: '450', value: '2,700', pack: '2,430', saving: '270' },
];

export default function MassagePage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/amenity-bathroom.webp"
                        alt="TAVÚ spa facilities"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                            Recovery
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-white">Massage</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                            Therapeutic and relaxation massage by certified therapists. Find the perfect treatment for your body and mind.
                        </p>
                    </MotionWrapper>
                </div>
            </section>

            <main className="flex-grow">
                {/* Overview Section */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                            <MotionWrapper delay={0.1} direction="left">
                                <div>
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-6">Healing Touch</h2>
                                    <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                                        Our massage therapy services combine ancient healing traditions with modern therapeutic techniques.
                                        Each session is tailored to your specific needs, whether you're seeking relaxation, pain relief, or athletic recovery.
                                    </p>
                                    <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                                        All treatments are performed by certified massage therapists in private, serene treatment rooms
                                        designed to promote complete relaxation and healing.
                                    </p>
                                    <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-full mb-8">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        <span className="text-sm font-medium">Ladies Only</span>
                                    </div>
                                    <div className="block">
                                        <Link
                                            href="/schedule"
                                            className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                                        >
                                            Book a Massage
                                        </Link>
                                    </div>
                                </div>
                            </MotionWrapper>
                            <MotionWrapper delay={0.2} direction="right">
                                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/service-massage-towels.webp"
                                        alt="Massage Room"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                        <p className="text-sm uppercase tracking-[0.2em] text-accent font-medium mb-2">TAVÚ</p>
                                        <h3 className="text-2xl md:text-3xl font-headline text-white mb-1">Massage Services</h3>
                                        <h3 className="text-2xl md:text-3xl font-headline italic font-light text-white/90 mb-4">Ladies only</h3>
                                        <ul className="space-y-1.5">
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                FLOW, RELEASE, RECOVER & DRAIN full-body rituals
                                            </li>
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                RESET, GROUND, LIFT & ROOTED targeted rituals
                                            </li>
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                Ritual Packs | 5 + 1 Included · Valid 45 days
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>
                    </div>
                </section>

                {/* Full-Body Massage Rituals */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-12">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">TAVÚ Full-Body Massage Rituals</h2>
                                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                                    Sixty minutes of focused, full-body therapeutic work. Every ritual is available as a
                                    Ritual Pack with a sixth session included.
                                </p>
                            </div>
                        </MotionWrapper>

                        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {fullBodyRituals.map((service, index) => (
                                <MotionWrapper key={index} delay={0.1 * (index + 1)} direction="up">
                                    <div className="bg-card border border-border p-6 rounded-2xl hover:shadow-xl transition-all h-full flex flex-col">
                                        <h3 className="font-headline text-xl text-primary mb-2">{service.name}</h3>
                                        <p className="text-sm text-foreground/70 mb-4">{service.description}</p>
                                        <ul className="space-y-2 mb-6 flex-grow">
                                            {service.benefits.map((benefit, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                                                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="pt-4 border-t border-border">
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <p className="text-sm text-foreground/60">{service.duration}</p>
                                                    <p className="font-semibold text-accent text-lg">{service.price}</p>
                                                </div>
                                                <Link href="/schedule" className="text-accent font-medium text-sm hover:underline">
                                                    Book →
                                                </Link>
                                            </div>
                                            <div className="p-3 rounded-xl bg-muted/40">
                                                <p className="text-sm font-medium text-primary">{service.pack}</p>
                                                <p className="text-xs text-foreground/50 mt-0.5">{service.packNote}</p>
                                            </div>
                                        </div>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Targeted Recovery Rituals */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-12">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">TAVÚ Targeted Recovery Rituals</h2>
                                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                                    Thirty-minute treatments are offered individually as add-ons. Packages are available
                                    exclusively for 60-minute rituals.
                                </p>
                            </div>
                        </MotionWrapper>

                        <div className="max-w-5xl mx-auto space-y-4">
                            {targetedRituals.map((service, index) => (
                                <MotionWrapper key={index} delay={0.05 * (index + 1)} direction="up">
                                    <div className="bg-card border border-border p-6 rounded-2xl hover:shadow-lg transition-all">
                                        <h3 className="font-headline text-xl text-primary mb-1">{service.name}</h3>
                                        <p className="text-sm text-foreground/70 mb-4">{service.description}</p>
                                        <div className="grid sm:grid-cols-3 gap-3">
                                            <div className="p-3 rounded-xl bg-muted/30">
                                                <p className="text-xs text-foreground/50 uppercase tracking-wide">30-Minute Add-On</p>
                                                <p className="font-headline text-lg text-accent">{service.addOn} <span className="text-xs text-foreground/50">AED</span></p>
                                            </div>
                                            <div className="p-3 rounded-xl bg-muted/30">
                                                <p className="text-xs text-foreground/50 uppercase tracking-wide">60-Minute Ritual</p>
                                                <p className="font-headline text-lg text-accent">{service.ritual} <span className="text-xs text-foreground/50">AED</span></p>
                                            </div>
                                            <div className="p-3 rounded-xl bg-muted/30">
                                                <p className="text-xs text-foreground/50 uppercase tracking-wide">Ritual Pack | 5 + 1</p>
                                                <p className="font-headline text-lg text-accent">{service.pack} <span className="text-xs text-foreground/50">AED</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ROOTED Exclusive Foot Ritual */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-12">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">TAVÚ Exclusive Foot Ritual</h2>
                                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                                    ROOTED | Foot Soaking and Reflexology — a grounding ritual beginning with warmth and
                                    ending in deep release.
                                </p>
                            </div>
                        </MotionWrapper>

                        <MotionWrapper delay={0.15} direction="up">
                            <div className="max-w-5xl mx-auto bg-card border border-accent/30 rounded-2xl overflow-hidden">
                                <div className="bg-primary text-primary-foreground px-6 py-5 text-center">
                                    <h3 className="font-headline text-2xl">ROOTED | Foot Soaking and Reflexology</h3>
                                    <p className="text-sm text-primary-foreground/70 mt-1">60 Minutes · 320 AED</p>
                                </div>
                                <div className="p-6 md:p-8">
                                    <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                                        Choose your preferred signature salt blend and settle into a 20-minute therapeutic
                                        foot soak, followed by a 30-minute reflexology foot massage targeting pressure
                                        points, fatigue and tension.
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">The Ritual Includes</p>
                                            <ul className="space-y-2">
                                                {rootedIncludes.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                                                        <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0 mt-2" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="p-5 rounded-xl bg-muted/30">
                                            <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">Ritual Pack</p>
                                            <p className="font-headline text-2xl text-accent mb-1">1,728 <span className="text-xs text-foreground/50">AED</span></p>
                                            <p className="text-sm text-foreground/70">Ritual Pack | 5 + 1 Included</p>
                                            <p className="text-xs text-foreground/50 mt-1">Six-session value 1,920 AED · Valid for 45 days</p>
                                        </div>
                                    </div>

                                    <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">Choose Your Salt Blend</p>
                                    <div className="grid sm:grid-cols-3 gap-3 mb-6">
                                        {saltBlends.map((blend, i) => (
                                            <div key={i} className="p-4 rounded-xl bg-muted/30">
                                                <p className="font-semibold text-primary text-sm mb-1">{blend.name}</p>
                                                <p className="text-xs text-foreground/60">{blend.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-foreground/50">
                                        Each blend is created using our signature foundation of Epsom salt, Dead Sea salt
                                        and Himalayan pink salt.
                                    </p>

                                    <div className="mt-6">
                                        <Link href="/schedule" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all">
                                            Book ROOTED
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </section>

                {/* Recovery Escape */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-12">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">TAVÚ Recovery Escape</h2>
                                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                                    Three hours. Entirely yours.
                                </p>
                            </div>
                        </MotionWrapper>

                        <MotionWrapper delay={0.15} direction="up">
                            <div className="max-w-5xl mx-auto bg-card border border-accent/30 rounded-2xl overflow-hidden">
                                <div className="bg-primary text-primary-foreground px-6 py-5 flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <h3 className="font-headline text-2xl">Recovery Escape</h3>
                                        <p className="text-sm text-primary-foreground/70">Duration: 3 Hours</p>
                                    </div>
                                    <p className="font-headline text-3xl text-accent">800 <span className="text-sm text-primary-foreground/60">AED</span></p>
                                </div>
                                <div className="p-6 md:p-8">
                                    <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                                        Begin with exclusive access to the Main Contrast Suite, moving between warmth and
                                        cold at your own pace. Then surrender to a 60-minute full-body therapeutic massage
                                        tailored to what your body needs most.
                                    </p>
                                    <p className="text-sm font-semibold text-primary mb-3 underline underline-offset-4">Your Recovery Escape Includes</p>
                                    <ul className="grid md:grid-cols-2 gap-2 mb-6">
                                        {recoveryEscapeIncludes.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                                                <span className="w-1 h-1 bg-accent rounded-full flex-shrink-0 mt-2" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-xs text-foreground/50 italic mb-6">Limited appointments available.</p>
                                    <Link href="/schedule" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all">
                                        Book Recovery Escape
                                    </Link>
                                </div>
                            </div>
                        </MotionWrapper>
                    </div>
                </section>

                {/* Package Pricing Summary */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-2xl sm:text-3xl font-headline text-primary mb-6 text-center">Package Pricing Summary</h2>
                                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-primary text-primary-foreground">
                                            <tr>
                                                <th className="text-left font-semibold px-4 py-3">Ritual Price</th>
                                                <th className="text-left font-semibold px-4 py-3">Six-Session Value</th>
                                                <th className="text-left font-semibold px-4 py-3">Package Price</th>
                                                <th className="text-left font-semibold px-4 py-3">Saving</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {packageSummary.map((row, i) => (
                                                <tr key={i} className="border-t border-border">
                                                    <td className="px-4 py-3 text-foreground/70">AED {row.ritual}</td>
                                                    <td className="px-4 py-3 text-foreground/70">AED {row.value}</td>
                                                    <td className="px-4 py-3 font-semibold text-accent">AED {row.pack}</td>
                                                    <td className="px-4 py-3 text-foreground/70">AED {row.saving}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-xs text-foreground/50 mt-3 text-center">
                                    Every Ritual Pack includes a sixth session at no charge. All prices include VAT.
                                </p>
                            </div>
                        </MotionWrapper>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <MotionWrapper delay={0.1} direction="up">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline mb-4">Treat Yourself</h2>
                            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                Book your massage session and experience complete relaxation.
                            </p>
                            <Link
                                href="/schedule"
                                className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                            >
                                Book a Massage
                            </Link>
                        </MotionWrapper>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
