import { cn } from '@/lib/utils';
import { PLUS_VAT } from '@/lib/vat';

interface PlusVatProps {
    className?: string;
}

/** "+ 5% VAT", kept on one line, placed right after a price. */
export default function PlusVat({ className }: PlusVatProps) {
    return <span className={cn('whitespace-nowrap', className)}>{PLUS_VAT}</span>;
}
