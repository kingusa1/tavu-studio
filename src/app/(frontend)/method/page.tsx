import type { GlobalSlug } from 'payload';

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BackgroundImage from '@/components/common/BackgroundImage';

import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { getGlobal } from '@/lib/cms/globals';
import { getSiteData } from '@/lib/cms/site';
import type { MethodPage as MethodPageData } from '@/payload-types';

export default async function MethodPage() {
    const [method, { settings }] = await Promise.all([getGlobal<MethodPageData>('method-page' as GlobalSlug), getSiteData()]);
    const levels = method.levels ?? [];
    const siteUrl = settings.brand.siteUrl ?? 'https://tavustudio.com';

    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <BackgroundImage />
            <Header />
            <main className="flex-grow pt-32 pb-16 px-4 container mx-auto relative z-10">
                <div className="max-w-4xl mx-auto">
                    <Breadcrumbs siteUrl={siteUrl} items={[{ name: 'Home', path: '/' }, { name: 'Method', path: '/method' }]} />
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline mb-8 text-primary">{method.title}</h1>
                    <div className="prose prose-xl prose-stone dark:prose-invert">
                        <p className="font-serif text-xl leading-relaxed mb-12 text-muted-foreground">
                            {method.intro}
                        </p>

                        <div className="border-t border-border pt-12">
                            <h2 className="text-3xl font-headline text-primary mb-8">{method.progressionHeading}</h2>
                            <p className="mb-8 text-stone-600">
                                {method.progressionIntro}
                            </p>

                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {levels.map((level, i) => (
                                    <div key={level.id ?? i} className="p-6 bg-stone-50 rounded-lg border border-stone-100">
                                        <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">{level.label}</span>
                                        <h3 className="text-xl font-headline text-primary mt-1 mb-3">{level.name}</h3>
                                        <p className="text-sm text-stone-600">{level.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
