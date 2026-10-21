'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import BackgroundImage from '@/components/common/BackgroundImage'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import { useSiteData } from '@/components/providers/SiteDataProvider'

export default function NotFound() {
    const { system } = useSiteData();
    const notFound = system.notFound;

    return (
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground relative overflow-hidden">
            <title>Page not found | TAVÚ</title>
            <BackgroundImage />
            <Header />
            <main className="flex-grow flex items-center justify-center pt-32 pb-24">
            <div className="relative z-10 text-center px-4">
                <p className="text-6xl md:text-8xl font-headline text-primary mb-2" aria-hidden="true">{notFound?.code || '404'}</p>
                <h1 className="text-2xl md:text-3xl font-body text-primary mb-6">{notFound?.heading || 'Page Not Found'}</h1>
                <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto font-serif">
                    {notFound?.textLine1 || 'The path you are looking for has wandered off.'} <br /> {notFound?.textLine2 || 'Let us guide you back to the center.'}
                </p>
                <Button asChild size="lg" className="rounded-full px-8">
                    <Link href={notFound?.button?.href || '/'}>{notFound?.button?.label || 'Return Home'}</Link>
                </Button>
            </div>
            </main>
            <Footer />
        </div>
    )
}
