import Link from 'next/link'
import { Button } from '@/components/ui/button'
import BackgroundImage from '@/components/common/BackgroundImage'

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-dvh items-center justify-center bg-transparent text-foreground relative overflow-hidden">
            <BackgroundImage />
            <div className="relative z-10 text-center px-4">
                <h2 className="text-6xl md:text-8xl font-headline text-primary mb-2">404</h2>
                <h3 className="text-2xl md:text-3xl font-body text-primary mb-6">Page Not Found</h3>
                <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto font-serif">
                    The path you are looking for has wandered off. <br /> Let us guide you back to the center.
                </p>
                <Button asChild size="lg" className="rounded-full px-8">
                    <Link href="/">Return Home</Link>
                </Button>
            </div>
        </div>
    )
}
