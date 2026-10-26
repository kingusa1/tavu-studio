import { cn } from '@/lib/utils';
import { PLUS_VAT } from '@/lib/vat';

interface PriceStackProps {
    price?: string | number | null;
    /** Currency line under the price, e.g. "AED" or "AED / 30 days". */
    unit?: string;
    /** Size of the price figure, e.g. "text-xl" (default) or "text-3xl". */
    priceClassName?: string;
    className?: string;
}

/** Price, currency and "+ 5% VAT" stacked in one centred column (studio request 2026-10-26). */
export default function PriceStack({ price, unit = 'AED', priceClassName = 'text-xl', className }: PriceStackProps) {
    return (
        <div className={cn('flex-shrink-0 min-w-[6rem] text-center', className)}>
            <p className={cn('font-headline text-accent', priceClassName)}>{price}</p>
            <p className="text-xs text-foreground/50 whitespace-nowrap">{unit}</p>
            <p className="text-[11px] leading-snug text-foreground/50 whitespace-nowrap">{PLUS_VAT}</p>
        </div>
    );
}
