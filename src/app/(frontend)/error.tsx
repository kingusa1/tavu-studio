'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSiteData } from '@/components/providers/SiteDataProvider';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const { system } = useSiteData();
    const errorCopy = system.error;

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <h2 className="text-4xl font-headline text-primary mb-4">{errorCopy?.heading || 'Something went wrong!'}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
                {errorCopy?.text || 'We encountered an unexpected issue. Please try again or return to the calmness of our homepage.'}
            </p>
            <div className="flex gap-4">
                <Button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                    variant="outline"
                >
                    {errorCopy?.retryLabel || 'Try again'}
                </Button>
                <Button asChild>
                    <Link href="/">{errorCopy?.homeLabel || 'Return Home'}</Link>
                </Button>
            </div>
        </div>
    );
}
