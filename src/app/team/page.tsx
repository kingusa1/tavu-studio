
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';

const teamMembers = [
    {
        name: 'Sarah Al-Mansouri',
        role: 'Lead Instructor',
        specialty: 'Reformer Pilates Specialist',
        bio: 'With over 10 years of experience in classical and contemporary Pilates, Sarah brings a deep understanding of movement mechanics and mindful practice. Certified by BASI Pilates and trained in physiotherapy.',
        certifications: ['BASI Certified', 'Anatomy Expert', 'Pre/Postnatal'],
        email: 'sarah@tavu.ae'
    },
    {
        name: 'Omar Hassan',
        role: 'Breathwork Master',
        specialty: 'Breathwork & Meditation Guide',
        bio: 'Omar integrates ancient pranayama techniques with modern breathwork modalities. Trained in Wim Hof Method, Holotropic Breathwork, and studied with masters in India and Nepal for 5 years.',
        certifications: ['Wim Hof Instructor', 'Yoga Alliance', 'Meditation'],
        email: 'omar@tavu.ae'
    },
    {
        name: 'Layla Rodriguez',
        role: 'Recovery Expert',
        specialty: 'Contrast Therapy & Recovery Specialist',
        bio: 'Layla specializes in hydrotherapy and thermal contrast techniques for athletic recovery and wellness. Sports science background with certifications in cryotherapy and sauna therapy protocols.',
        certifications: ['Sports Science', 'Cryotherapy', 'Hydrotherapy'],
        email: 'layla@tavu.ae'
    }
];

const teamValues = [
    {
        title: 'Expert Team',
        description: 'All instructors hold international certifications and ongoing training',
        icon: (
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        )
    },
    {
        title: 'Personalized Care',
        description: 'Small class sizes ensure individual attention for every member',
        icon: (
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        )
    },
    {
        title: 'Continuous Growth',
        description: 'Our team regularly attends workshops and advanced training programs',
        icon: (
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
        )
    }
];

export default function TeamPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60 z-10" />
                <div className="absolute inset-0 bg-muted">
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <p className="text-sm">Hero Image: Add your team hero image here</p>
                    </div>
                </div>
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <MotionWrapper delay={0} direction="up">
                        <h1 className="text-5xl md:text-7xl font-headline mb-6 text-white">Meet Our Team</h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                            Experienced practitioners dedicated to guiding your wellness journey
                        </p>
                    </MotionWrapper>
                </div>
            </section>

            <main className="flex-grow">
                {/* Team Members */}
                <section className="py-20 lg:py-28 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {teamMembers.map((member, index) => (
                                <MotionWrapper key={member.name} delay={0.1 + index * 0.1} direction="up">
                                    <div className="bg-card border border-border p-8 rounded-2xl h-full">
                                        <div className="relative mb-6">
                                            <div className="w-32 h-32 bg-muted rounded-full mx-auto flex items-center justify-center">
                                                <p className="text-xs text-muted-foreground text-center px-4">Team Photo</p>
                                            </div>
                                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-accent px-4 py-1 rounded-full">
                                                <span className="text-xs font-semibold text-accent-foreground uppercase tracking-wide">{member.role}</span>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-2xl font-headline mb-2 text-primary">{member.name}</h3>
                                            <p className="text-accent font-semibold mb-4">{member.specialty}</p>
                                            <p className="text-foreground/70 leading-relaxed mb-6 text-sm">
                                                {member.bio}
                                            </p>
                                            <div className="flex flex-wrap gap-2 justify-center mb-6">
                                                {member.certifications.map((cert, i) => (
                                                    <span key={i} className="bg-muted px-3 py-1 rounded-full text-xs font-medium">{cert}</span>
                                                ))}
                                            </div>
                                            <a
                                                href={`mailto:${member.email}`}
                                                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                {member.email}
                                            </a>
                                        </div>
                                    </div>
                                </MotionWrapper>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Values */}
                <section className="py-20 lg:py-28 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <MotionWrapper delay={0.1} direction="up">
                                <div className="grid md:grid-cols-3 gap-8 mb-12">
                                    {teamValues.map((value, index) => (
                                        <div key={index} className="text-center">
                                            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                {value.icon}
                                            </div>
                                            <h4 className="text-xl font-headline mb-2 text-primary">{value.title}</h4>
                                            <p className="text-foreground/70">{value.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </MotionWrapper>
                        </div>
                    </div>
                </section>

                {/* Join Our Team CTA */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center">
                        <MotionWrapper delay={0.1} direction="up">
                            <h2 className="text-4xl md:text-5xl font-headline mb-6">Join Our Growing Team</h2>
                            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                                We're always looking for passionate, certified wellness professionals to join the TAVU family.
                            </p>
                            <a
                                href="mailto:careers@tavu.ae"
                                className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all text-lg"
                            >
                                View Open Positions
                            </a>
                        </MotionWrapper>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
