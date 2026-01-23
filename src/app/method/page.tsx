
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';

export default function MethodPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />
            <main className="flex-grow pt-32 pb-16 px-4 container mx-auto relative z-10">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-headline mb-8 text-primary">The Method</h1>
                    <div className="prose prose-xl prose-stone dark:prose-invert">
                        <p className="font-serif text-xl leading-relaxed mb-12 text-muted-foreground">
                            Rooted in TA (grounding) and VÚ (flow), our practice is a single, curated method designed to soothe the nervous system, restore clarity, and invite you to return to yourself.
                        </p>

                        <div className="border-t border-border pt-12">
                            <h2 className="text-3xl font-headline text-primary mb-8">The 5-Level Progression</h2>
                            <p className="mb-8 text-stone-600">
                                To ensure safety and mastery of form, TAVÚ uses a strict progression system. Clients must demonstrate proficiency at each level before advancing.
                            </p>

                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                <div className="p-6 bg-stone-50 rounded-lg border border-stone-100">
                                    <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Level 1</span>
                                    <h3 className="text-xl font-headline text-primary mt-1 mb-3">Foundation</h3>
                                    <p className="text-sm text-stone-600">Required for all new clients. Focus applies to apparatus setup, safety, and core Pilates principles.</p>
                                </div>

                                <div className="p-6 bg-stone-50 rounded-lg border border-stone-100">
                                    <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Level 2</span>
                                    <h3 className="text-xl font-headline text-primary mt-1 mb-3">Alignment</h3>
                                    <p className="text-sm text-stone-600">Building endurance and stability. Introduction to coordination and fluid transitions.</p>
                                </div>

                                <div className="p-6 bg-stone-50 rounded-lg border border-stone-100">
                                    <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Level 3</span>
                                    <h3 className="text-xl font-headline text-primary mt-1 mb-3">Flow</h3>
                                    <p className="text-sm text-stone-600">Increased tempo and complexity. Seamless movement integrating breath and strength.</p>
                                </div>

                                <div className="p-6 bg-stone-50 rounded-lg border border-stone-100">
                                    <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Level 4</span>
                                    <h3 className="text-xl font-headline text-primary mt-1 mb-3">Precision</h3>
                                    <p className="text-sm text-stone-600">Advanced repertoire requiring deep core connection and total body awareness.</p>
                                </div>

                                <div className="p-6 bg-stone-50 rounded-lg border border-stone-100">
                                    <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Level 5</span>
                                    <h3 className="text-xl font-headline text-primary mt-1 mb-3">Mastery</h3>
                                    <p className="text-sm text-stone-600">The ultimate expression of control. High-intensity, complex movements for our most experienced practitioners.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
