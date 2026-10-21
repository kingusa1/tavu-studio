'use client';

import { useSiteData } from '@/components/providers/SiteDataProvider';

interface VatNoteProps {
    className?: string;
}

export default function VatNote({ className }: VatNoteProps) {
    const { settings } = useSiteData();

    return (
        <p className={className ?? 'text-sm text-foreground/60'}>
            {settings.pricing.vatNote}
        </p>
    );
}
