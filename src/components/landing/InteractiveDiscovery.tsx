"use client";

import { useState } from 'react';
import Image from 'next/image';
import MotionWrapper from '@/components/common/MotionWrapper';

const moods = [
    {
        id: 'stressed',
        label: 'Stressed',
        recommendation: 'Breathwork',
        desc: 'Calm your nervous system with intentional breathing techniques.',
        image: '/mood-stressed.png'
    },
    {
        id: 'low-energy',
        label: 'Low Energy',
        recommendation: 'Contrast Therapy',
        desc: 'Activate your body and mind with hot-cold immersion.',
        image: '/mood-low-energy.png'
    },
    {
        id: 'tight',
        label: 'Stiff & Tight',
        recommendation: 'Reformer Pilates',
        desc: 'Release tension and build strength through mindful movement.',
        image: '/mood-stiff.png'
    },
    {
        id: 'balanced',
        label: 'Balanced',
        recommendation: 'Full Experience',
        desc: 'Combine all three pillars for complete transformation.',
        image: '/mood-balanced.png'
    },
];

export default function InteractiveDiscovery() {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);

    const activeMood = moods.find(m => m.id === selectedMood);

    return (
        <section className="py-32 lg:py-44 relative overflow-hidden">
            {/* Ambient background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[20%] w-[450px] h-[450px] bg-accent/4 rounded-full blur-[140px]" />
                <div className="absolute bottom-[30%] left-[15%] w-[400px] h-[400px] bg-primary/4 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <MotionWrapper delay={0} direction="up">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6 block">
                            Find Your Ritual
                        </span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-medium text-primary mb-6">
                            How are you <em className="italic font-light text-primary/75">feeling</em>?
                        </h2>
                        <p className="text-xl md:text-2xl text-foreground/60 font-light">
                            Tell us your state, and we'll recommend the right practice.
                        </p>
                    </div>
                </MotionWrapper>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-16 max-w-6xl mx-auto">
                    {moods.map((mood, index) => (
                        <MotionWrapper key={mood.id} delay={0.1 * (index + 1)} direction="up">
                            <button
                                onClick={() => setSelectedMood(mood.id)}
                                className={`relative w-full overflow-hidden rounded-2xl lg:rounded-3xl border-2 transition-all duration-500 flex flex-col group hover:scale-[1.03] ${selectedMood === mood.id
                                        ? 'border-accent shadow-2xl shadow-accent/20 ring-2 ring-accent/30'
                                        : 'border-accent/10 hover:border-accent/30 hover:shadow-xl'
                                    }`}
                            >
                                {/* Image */}
                                <div className="relative aspect-square overflow-hidden">
                                    <Image
                                        src={mood.image}
                                        alt={mood.label}
                                        fill
                                        className={`object-cover transition-all duration-500 ${selectedMood === mood.id
                                                ? 'scale-105'
                                                : 'group-hover:scale-105'
                                            }`}
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                    {/* Overlay on selection */}
                                    <div className={`absolute inset-0 transition-all duration-300 ${selectedMood === mood.id
                                            ? 'bg-accent/20'
                                            : 'bg-transparent group-hover:bg-accent/10'
                                        }`} />
                                </div>

                                {/* Label */}
                                <div className={`p-4 lg:p-5 text-center transition-all duration-300 ${selectedMood === mood.id
                                        ? 'bg-accent text-accent-foreground'
                                        : 'bg-muted/60 text-primary'
                                    }`}>
                                    <span className="text-base lg:text-lg font-semibold">
                                        {mood.label}
                                    </span>
                                </div>
                            </button>
                        </MotionWrapper>
                    ))}
                </div>

                {activeMood && (
                    <MotionWrapper delay={0.3} direction="up">
                        <div className="max-w-3xl mx-auto glass p-10 lg:p-14 rounded-3xl border border-accent/20">
                            <div className="text-center">
                                <p className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-4">
                                    Recommended for you
                                </p>
                                <h3 className="text-3xl lg:text-5xl font-headline font-medium text-primary mb-5">
                                    {activeMood.recommendation}
                                </h3>
                                <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-xl mx-auto leading-relaxed">
                                    {activeMood.desc}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href="/schedule"
                                        className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-accent/20"
                                    >
                                        <span className="tracking-wide">Book {activeMood.recommendation}</span>
                                    </a>
                                    <a
                                        href="/classes"
                                        className="inline-flex items-center justify-center h-14 px-10 rounded-full border border-accent/30 text-accent font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-[1.02]"
                                    >
                                        <span className="tracking-wide">Learn More</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>
                )}
            </div>
        </section>
    );
}

