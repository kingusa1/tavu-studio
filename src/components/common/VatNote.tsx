interface VatNoteProps {
    className?: string;
}

export default function VatNote({ className }: VatNoteProps) {
    return (
        <p className={className ?? 'text-sm text-foreground/60'}>
            All prices are in AED and exclude VAT.
        </p>
    );
}
