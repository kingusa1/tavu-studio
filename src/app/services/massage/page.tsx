"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Image from 'next/image';
import Link from 'next/link';

const massageServices = [
    {
        name: 'Destress Massage',
        description: 'Perfect for reducing stress, improving sleep quality, and easing tension in the upper body.',
        duration: '60 min',
        price: '300 AED',
        benefits: ['Stress relief', 'Improved sleep', 'Upper body tension relief']
    },
    {
        name: 'Relaxing Massage',
        description: 'Deep relaxation, helping to calm the nervous system and bring the body into a state of complete tranquility.',
        duration: '60 min',
        price: '300 AED',
        benefits: ['Deep relaxation', 'Calms nervous system', 'Complete tranquility']
    },
    {
        name: 'Express Head, Neck & Shoulder',
        description: 'Focuses on relieving headaches and reducing stiffness in the neck and shoulders.',
        duration: '45 min',
        price: '220 AED',
        benefits: ['Headache relief', 'Neck stiffness relief', 'Shoulder tension release']
    },
    {
        name: 'Foot Ritual Massage',
        description: 'Designed to reduce swelling and boost circulation, leaving your feet feeling light and refreshed.',
        duration: '30 min',
        price: '180 AED',
        benefits: ['Reduces swelling', 'Boosts circulation', 'Light & refreshed feet']
    },
    {
        name: 'Deep Tissue Massage',
        description: 'Targets deep muscles to release knots, improve mobility, and ease tension.',
        duration: '60 min',
        price: '300 AED',
        benefits: ['Deep muscle release', 'Improved mobility', 'Tension relief']
    },
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
                        src="/post-4.webp"
                        alt="Massage Services"
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
                                        src="/about-studio.webp"
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
                                                Destress, Relaxing, Express Head/Neck/Shoulder
                                            </li>
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                Foot Ritual, Deep Tissue
                                            </li>
                                            <li className="text-white/80 text-sm flex items-center gap-2">
                                                <span className="w-1 h-1 bg-white/60 rounded-full flex-shrink-0" />
                                                30 to 60 minute sessions available
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </MotionWrapper>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-12">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-4">Our Treatments</h2>
                                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                                    From gentle relaxation to deep therapeutic work, find your perfect massage.
                                </p>
                            </div>
                        </MotionWrapper>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {massageServices.map((service, index) => (
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
                                        <div className="flex items-center justify-between pt-4 border-t border-border">
                                            <div>
                                                <p className="text-sm text-foreground/60">{service.duration}</p>
                                                <p className="font-semibold text-accent">{service.price}</p>
                                            </div>
                                            <Link href="/schedule" className="text-accent font-medium text-sm hover:underline">
                                                Book →
                                            </Link>
                                        </div>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
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
