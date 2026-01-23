
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Link from 'next/link';

const upcomingEvents = [
    {
        title: 'Soft Opening Celebration',
        date: 'Coming Soon',
        time: 'TBA',
        description: 'Join us for the grand opening of TAVU Wellness Studio. Experience our facilities, meet our team, and enjoy exclusive founding member offers.',
        category: 'Launch Event'
    },
    {
        title: 'Breathwork Workshop',
        date: 'Coming Soon',
        time: 'TBA',
        description: 'A deep dive into breathwork techniques for stress relief, improved focus, and enhanced athletic performance.',
        category: 'Workshop'
    },
    {
        title: 'Recovery Science Seminar',
        date: 'Coming Soon',
        time: 'TBA',
        description: 'Learn the science behind contrast therapy, cold exposure, and optimal recovery protocols from wellness experts.',
        category: 'Seminar'
    }
];

const eventTypes = [
    {
        title: 'Workshops',
        description: 'Hands-on learning experiences focused on specific wellness techniques and practices',
        icon: (
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        )
    },
    {
        title: 'Retreats',
        description: 'Immersive multi-day experiences combining movement, recovery, and mindfulness',
        icon: (
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
        title: 'Guest Speakers',
        description: 'Learn from wellness experts, athletes, and thought leaders in health and fitness',
        icon: (
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
        )
    }
];

export default function EventsPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60 z-10" />
                <div className="absolute inset-0 bg-muted">
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <p className="text-sm">Hero Image: Add your events hero image here</p>
                    </div>
                </div>
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <h1 className="text-5xl md:text-7xl font-headline mb-6 text-white">Events</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                            Workshops, seminars, and community gatherings to deepen your practice
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
                                <h2 className="text-4xl md:text-5xl font-headline text-primary mt-2">Upcoming Events</h2>
                            </div>
                        </MotionWrapper>

                        <div className="space-y-6 max-w-4xl mx-auto">
                            {upcomingEvents.map((event, index) => (
                                <MotionWrapper key={event.title} delay={0.1 + index * 0.1} direction="up">
                                    <div className="bg-card border border-border rounded-2xl overflow-hidden">
                                        <div className="grid md:grid-cols-3 gap-0">
                                            <div className="aspect-video md:aspect-auto bg-muted">
                                                <div className="w-full h-full min-h-[200px] flex items-center justify-center text-muted-foreground p-4 text-center">
                                                    <p className="text-xs">Event Image</p>
                                                </div>
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
                                <h2 className="text-4xl md:text-5xl font-headline text-primary mt-2">Event Types</h2>
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

                {/* Stay Updated */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <MotionWrapper delay={0.1} direction="up">
                            <h2 className="text-4xl md:text-5xl font-headline mb-6">Stay Updated</h2>
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
