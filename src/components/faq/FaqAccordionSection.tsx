import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { buildFaqPageJsonLd } from '@/lib/cms/jsonLd';

import JsonLd from '../seo/JsonLd';

export type FaqAccordionItem = { id: string | number; question: string; answer: string };

export type FaqAccordionSectionProps = {
  faqs: FaqAccordionItem[];
  /** Heading shown above the accordion — omit on /faq, where each topic group has its own. */
  heading?: string;
  idPrefix: string;
};

/**
 * One FAQ accordion with `FAQPage` JSON-LD for exactly the items rendered (brief §C/§D5).
 * Radix's `AccordionContent` keeps its children in the DOM at all times (collapsed via CSS, not
 * `display:none`), so every answer is present in the server HTML — not only after a click.
 */
export default function FaqAccordionSection({ faqs, heading, idPrefix }: FaqAccordionSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <div>
      <JsonLd data={buildFaqPageJsonLd(faqs.map((faq) => ({ question: faq.question, answer: faq.answer })))} />
      {heading && <h2 className="text-2xl sm:text-3xl font-headline text-primary mb-6">{heading}</h2>}
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={faq.id} value={`${idPrefix}-${index}`}>
            <AccordionTrigger className="text-left font-headline text-lg text-primary">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-foreground/70 leading-relaxed">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
