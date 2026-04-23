"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';
import ContactForm from '@/components/contact/ContactForm';
import MotionWrapper from '@/components/common/MotionWrapper';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />

            {/* Hero */}
            <section className="relative pt-32 pb-16">
                <div className="container mx-auto px-6">
                    <MotionWrapper delay={0} direction="up">
                        <div className="text-center max-w-2xl mx-auto">
                            <span className="inline-flex items-center gap-3 text-accent uppercase tracking-[0.3em] text-xs font-medium mb-6">
                                <span className="w-8 h-[1px] bg-accent/50" />
                                Contact
                                <span className="w-8 h-[1px] bg-accent/50" />
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-medium mb-4 text-primary">
                                Let's <em className="italic font-light">Connect</em>
                            </h1>
                            <p className="text-foreground/60 font-light">
                                Start your wellness journey with us
                            </p>
                        </div>
                    </MotionWrapper>
                </div>
            </section>

            <main className="flex-grow pb-20">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">

                        {/* Left - Info */}
                        <MotionWrapper delay={0.1} direction="up">
                            <div className="space-y-8">
                                {/* Image Card */}
                                <div className="relative aspect-video rounded-2xl overflow-hidden">
                                    <Image
                                        src="/tavu-sign.webp"
                                        alt="TAVU Wellness Studio"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <p className="text-white text-2xl font-headline font-light">
                                            Visit the Sanctuary
                                        </p>
                                    </div>
                                </div>

                                {/* Info Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <motion.a
                                        href="https://share.google/H65MSpZCTdk6RSqrH"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-5 hover:border-accent/30 transition-all group"
                                        whileHover={{ y: -2 }}
                                    >
                                        <MapPin className="w-5 h-5 text-accent mb-3" />
                                        <p className="text-xs uppercase tracking-wider text-foreground/40 mb-1">Location</p>
                                        <p className="text-sm text-foreground/70 group-hover:text-foreground transition-colors leading-relaxed">
                                            Crescent Residence<br />Al Raha Beach
                                        </p>
                                    </motion.a>

                                    <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-5">
                                        <Clock className="w-5 h-5 text-accent mb-3" />
                                        <p className="text-xs uppercase tracking-wider text-foreground/40 mb-1">Hours</p>
                                        <p className="text-sm text-foreground/70 leading-relaxed">
                                            Weekdays 8am-9pm<br />Weekends 9am-6pm
                                        </p>
                                    </div>

                                    <motion.a
                                        href="tel:+971522755551"
                                        className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-5 hover:border-accent/30 transition-all group"
                                        whileHover={{ y: -2 }}
                                    >
                                        <Phone className="w-5 h-5 text-accent mb-3" />
                                        <p className="text-xs uppercase tracking-wider text-foreground/40 mb-1">Phone</p>
                                        <p className="text-sm text-foreground/70 group-hover:text-foreground transition-colors">
                                            +971 52 275 5551
                                        </p>
                                    </motion.a>

                                    <motion.a
                                        href="mailto:connect@tavustudio.com"
                                        className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-5 hover:border-accent/30 transition-all group"
                                        whileHover={{ y: -2 }}
                                    >
                                        <Mail className="w-5 h-5 text-accent mb-3" />
                                        <p className="text-xs uppercase tracking-wider text-foreground/40 mb-1">Email</p>
                                        <p className="text-sm text-foreground/70 group-hover:text-foreground transition-colors truncate">
                                            connect@tavustudio.com
                                        </p>
                                    </motion.a>
                                </div>

                                {/* Social + WhatsApp */}
                                <div className="flex items-center justify-between bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-5">
                                    <div className="flex items-center gap-4">
                                        <motion.a
                                            href="https://instagram.com/tavuwellness.studio"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-background/50 flex items-center justify-center text-foreground/50 hover:text-accent hover:bg-accent/10 transition-all"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <InstagramIcon className="w-5 h-5" />
                                        </motion.a>
                                        <motion.a
                                            href="https://www.tiktok.com/@tavustudio"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-background/50 flex items-center justify-center text-foreground/50 hover:text-accent hover:bg-accent/10 transition-all"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <TikTokIcon className="w-5 h-5" />
                                        </motion.a>
                                    </div>

                                    <motion.a
                                        href="https://wa.me/971522755551"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <WhatsAppIcon className="w-4 h-4" />
                                        Chat Now
                                    </motion.a>
                                </div>
                            </div>
                        </MotionWrapper>

                        {/* Right - Form */}
                        <MotionWrapper delay={0.2} direction="up">
                            <ContactForm />
                        </MotionWrapper>
                    </div>

                    {/* Map */}
                    <MotionWrapper delay={0.3} direction="up">
                        <div className="mt-16 max-w-6xl mx-auto">
                            <div className="h-[350px] rounded-2xl overflow-hidden border border-border/30">
                                <iframe
                                    src="https://maps.google.com/maps?q=CHXW%2BC3R+Abu+Dhabi&t=&z=17&ie=UTF8&iwloc=&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="TAVÚ Wellness Studio"
                                    className="grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>
                    </MotionWrapper>
                </div>
            </main>

            <Footer />
        </div>
    );
}
