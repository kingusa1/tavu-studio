'use client';

import { Loader2 } from "lucide-react";
import { useSiteData } from '@/components/providers/SiteDataProvider';

export default function Loading() {
    const { system } = useSiteData();

    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground font-serif animate-pulse">{system.loading?.text || 'Breathing in...'}</p>
            </div>
        </div>
    )
}
