"use client";

import { MapPin, Clock, Mail } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
);
import MotionWrapper from '@/components/common/MotionWrapper';

export default function Contact() {
    return (
        <section className="py-24 bg-muted/5 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Info Column */}
                    <MotionWrapper delay={0.1} direction="up">
                        <div>
                            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-8 block">
                                The Location
                            </span>
                            <h2 className="text-4xl md:text-5xl font-headline font-medium mb-12">
                                Visit the <em className="italic font-light text-primary/80">Sanctuary</em>
                            </h2>

                            <div className="space-y-12">
                                <div>
                                    <h3 className="text-sm font-headline uppercase tracking-[0.2em] mb-4 opacity-50">Address</h3>
                                    <a
                                        href="https://share.google/H65MSpZCTdk6RSqrH"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start gap-4 group"
                                    >
                                        <MapPin className="w-5 h-5 text-accent mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                                        <p className="text-lg font-light leading-relaxed text-foreground/80 group-hover:text-accent transition-colors">
                                            TAVÚ Wellness Studio<br />
                                            Shop 1, Crescent Residence<br />
                                            Plot 12, Sector RBW4, Shatie Al Raha<br />
                                            Abu Dhabi, UAE
                                        </p>
                                    </a>
                                </div>

                                <div>
                                    <h3 className="text-sm font-headline uppercase tracking-[0.2em] mb-4 opacity-50">Hours</h3>
                                    <div className="flex items-start gap-4">
                                        <Clock className="w-5 h-5 text-accent mt-1 shrink-0" />
                                        <p className="text-lg font-light leading-relaxed text-foreground/80">
                                            Weekdays: 8am - 9pm<br />
                                            Weekends: 9am - 6pm
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-headline uppercase tracking-[0.2em] mb-4 opacity-50">Contact</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <Mail className="w-5 h-5 text-accent mt-1 shrink-0" />
                                            <a href="mailto:connect@tavustudio.com" className="text-lg font-light hover:text-accent transition-colors">
                                                connect@tavustudio.com
                                            </a>
                                        </div>
                                        <a
                                            href="https://wa.me/971522755551"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 group"
                                        >
                                            <WhatsAppIcon className="w-5 h-5 text-green-500 shrink-0 group-hover:scale-110 transition-transform" />
                                            <span className="text-lg font-light text-foreground/80 group-hover:text-accent transition-colors">
                                                +971 52 275 5551
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>

                    {/* Map Column */}
                    <MotionWrapper delay={0.2} direction="up">
                        <div className="h-full min-h-[400px] w-full rounded-2xl border border-white/10 overflow-hidden relative group">
                            {/* Google Maps Embed - Crescent Residence, Al Raha Beach */}
                            <iframe
                                src="https://maps.google.com/maps?q=CHXW%2BC3R+Abu+Dhabi&t=&z=17&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '400px' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0"
                                title="TAVÚ Wellness Studio - Crescent Residence, Al Raha Beach, Abu Dhabi"
                            />
                        </div>
                    </MotionWrapper>

                </div>
            </div>
        </section>
    );
}
