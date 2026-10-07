
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';
import Image from 'next/image';

const upcomingEvents = [
    {
        title: 'Breathwork Workshop',
        date: 'Coming Soon',
        time: 'TBA',
        description: 'A deep dive into breathwork techniques for stress relief, improved focus, and enhanced athletic performance.',
        category: 'Workshop',
        image: '/gallery-breathing-room.webp'
    },
    {
        title: 'Recovery Science Seminar',
        date: 'Coming Soon',
        time: 'TBA',
        description: 'Learn the science behind contrast therapy, cold exposure, and optimal recovery protocols from wellness experts.',
        category: 'Seminar',
        image: '/service-sauna.webp'
    }
];

const eventTypes = [
    {
        title: 'Special Events & Collaborations',
        description: 'Curated experiences created together with brands and partners who share our approach to wellbeing',
        icon: (
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
        )
    },
    {
        title: 'Private Events',
        description: 'Exclusive sessions for teams and groups, hosted privately at TAVÚ',
        icon: (
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        )
    },
    {
        title: 'Community Gatherings',
        description: 'Social events to connect with fellow TAVU members and build lasting relationships',
        icon: (
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        )
    },
    {
        title: 'Sound Healing',
        description: 'Full Moon and New Moon sound healing sessions, with some events focused around Yin + Yang',
        icon: (
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        )
    }
];

interface EventImage {
    src: string;
    alt: string;
}

interface Highlight {
    title: string;
    category: string;
    description: string;
    images: EventImage[];
    logo?: EventImage;
}

// Real events, partnerships and community moments supplied by the TAVÚ team (Oct 2026 website feedback).
const highlights: Highlight[] = [
    {
        title: 'ALO + TAVÚ',
        category: 'Special Event · Collaboration',
        description: 'A special collaboration between ALO and TAVÚ.',
        images: [
            { src: '/event-alo-1.webp', alt: 'ALO + TAVÚ collaboration — ALO gift bag and drink at TAVÚ' },
            { src: '/event-alo-2.webp', alt: 'ALO + TAVÚ collaboration — ALO gifts laid out on a TAVÚ mat' },
        ],
        logo: { src: '/partner-alo-logo.webp', alt: 'ALO logo' },
    },
    {
        title: 'Jiu-Jitsu Women’s Team',
        category: 'Private Event',
        description: 'The Jiu-Jitsu Women’s Team came to TAVÚ for a private event.',
        images: [],
        logo: { src: '/partner-uae-jiujitsu.webp', alt: 'UAE Jiu-Jitsu Federation logo' },
    },
    {
        title: 'BeyondLeFifth Running Club',
        category: 'Community Gathering',
        description: 'Our running club collaboration with BeyondLeFifth.',
        images: [
            { src: '/event-beyondlefifth-1.webp', alt: 'BeyondLeFifth running club gathering outside TAVÚ' },
            { src: '/event-beyondlefifth-2.webp', alt: 'BeyondLeFifth runners meeting in front of the TAVÚ studio' },
        ],
    },
    {
        title: 'Sound Healing',
        category: 'Full Moon · New Moon',
        description: 'Full Moon Sound Healing and New Moon Sound Healing. Some events are also specially focused around Yin + Yang.',
        images: [
            { src: '/event-sound-healing-1.webp', alt: 'Sound healing set-up with gongs and singing bowls at TAVÚ' },
            { src: '/event-sound-healing-2.webp', alt: 'Candle-lit sound healing mats in the TAVÚ Breathing Room' },
        ],
    },
];

export default function EventsPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60 z-10" />
                <div className="absolute inset-0">
                    <Image
                        src="/about-entrance.webp"
                        alt="TAVÚ Events"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                </div>
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline mb-6 text-white">Events</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                            Special events, collaborations, and community gatherings to deepen your practice
                        </p>
                    </MotionWrapper>
                </div>
            </section>

            <main className="flex-grow">
                {/* Upcoming Events */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-16">
                                <span className="text-accent font-medium text-sm tracking-wider uppercase">Calendar</span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mt-2">Upcoming Events</h2>
                            </div>
                        </MotionWrapper>

                        <div className="space-y-6 max-w-4xl mx-auto">
                            {upcomingEvents.map((event, index) => (
                                <MotionWrapper key={event.title} delay={0.1 + index * 0.1} direction="up">
                                    <div className="bg-card border border-border rounded-2xl overflow-hidden">
                                        <div className="grid md:grid-cols-3 gap-0">
                                            <div className="aspect-video md:aspect-auto relative min-h-[200px]">
                                                <Image
                                                    src={event.image}
                                                    alt={event.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </div>
                                            <div className="md:col-span-2 p-6 md:p-8">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium">
                                                        {event.category}
                                                    </span>
                                                    <span className="text-sm text-foreground/60">{event.date}</span>
                                                </div>
                                                <h3 className="text-2xl font-headline text-primary mb-3">{event.title}</h3>
                                                <p className="text-foreground/70 mb-4">{event.description}</p>
                                                <p className="text-sm text-foreground/50">{event.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Event Types */}
                <section className="py-20 lg:py-28 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-16">
                                <span className="text-accent font-medium text-sm tracking-wider uppercase">What We Offer</span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mt-2">Event Types</h2>
                            </div>
                        </MotionWrapper>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            {eventTypes.map((type, index) => (
                                <MotionWrapper key={type.title} delay={0.1 + index * 0.05} direction="up">
                                    <div className="bg-card border border-border p-6 rounded-2xl text-center h-full">
                                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            {type.icon}
                                        </div>
                                        <h3 className="text-xl font-headline text-primary mb-2">{type.title}</h3>
                                        <p className="text-sm text-foreground/70">{type.description}</p>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Events, Partnerships & Community */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="text-center mb-16">
                                <span className="text-accent font-medium text-sm tracking-wider uppercase">Collaborations</span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline text-primary mt-2">Events, Partnerships &amp; Community</h2>
                            </div>
                        </MotionWrapper>

                        <div className="space-y-10 max-w-6xl mx-auto">
                            {highlights.map((item, index) => (
                                <MotionWrapper key={item.title} delay={0.1 + index * 0.05} direction="up">
                                    <div className="bg-card border border-border rounded-2xl overflow-hidden">
                                        <div className={`grid gap-0 ${item.images.length > 0 ? 'md:grid-cols-5' : 'md:grid-cols-3'}`}>
                                            <div className={`${item.images.length > 0 ? 'md:col-span-3' : 'md:col-span-1'} ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                                {item.images.length > 0 ? (
                                                    <div className="grid grid-cols-2 gap-1 h-full">
                                                        {item.images.map((img) => (
                                                            <div key={img.src} className="relative aspect-[4/5] md:aspect-auto md:min-h-[360px]">
                                                                <Image
                                                                    src={img.src}
                                                                    alt={img.alt}
                                                                    fill
                                                                    className="object-cover"
                                                                    sizes="(max-width: 768px) 50vw, 30vw"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : item.logo ? (
                                                    <div className="relative h-full min-h-[220px] bg-white flex items-center justify-center p-8">
                                                        <div className="relative w-48 h-40">
                                                            <Image src={item.logo.src} alt={item.logo.alt} fill className="object-contain" sizes="192px" />
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="md:col-span-2 p-6 md:p-10 flex flex-col justify-center">
                                                {item.images.length > 0 && item.logo && (
                                                    <div className="relative w-14 h-14 mb-4">
                                                        <Image src={item.logo.src} alt={item.logo.alt} fill className="object-contain" sizes="56px" />
                                                    </div>
                                                )}
                                                <span className="inline-block self-start bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium mb-3">
                                                    {item.category}
                                                </span>
                                                <h3 className="text-2xl md:text-3xl font-headline text-primary mb-3">{item.title}</h3>
                                                <p className="text-foreground/70 leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stay Updated */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <MotionWrapper delay={0.1} direction="up">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline mb-6">Stay Updated</h2>
                            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                Register to receive notifications about upcoming events, workshops, and exclusive member gatherings.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/register"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                                >
                                    Register Now
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-transparent border-2 border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-all text-lg"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </MotionWrapper>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
