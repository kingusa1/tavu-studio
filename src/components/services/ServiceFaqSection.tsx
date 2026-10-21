import Link from 'next/link';

import FaqAccordionSection from '@/components/faq/FaqAccordionSection';
import { getActiveFaqsByTopic } from '@/lib/cms/faqs';
import type { FaqTopic } from '@/lib/cms/faqs';
import { getPublishedPosts } from '@/lib/cms/posts';

export type ServiceFaqSectionProps = {
  topic: FaqTopic;
  /** The blog category whose articles cover this service — link shown only when it has posts. */
  categorySlug: string;
  categoryLabel: string;
};

/**
 * One FAQ section per service page, placed just before the final CTA (brief §C), plus the
 * internal link to the matching blog category when it has published posts (brief §D8). Shared
 * by all 5 service pages rather than duplicated, since the data-fetching (not just markup)
 * repeats identically across them.
 */
export default async function ServiceFaqSection({ topic, categorySlug, categoryLabel }: ServiceFaqSectionProps) {
  const [faqs, { totalDocs }] = await Promise.all([getActiveFaqsByTopic(topic), getPublishedPosts({ categorySlug, limit: 1 })]);

  if (faqs.length === 0 && totalDocs === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        {faqs.length > 0 && (
          <FaqAccordionSection
            faqs={faqs.map((faq) => ({ id: faq.id, question: faq.question, answer: faq.answer }))}
            heading="Frequently Asked Questions"
            idPrefix={topic}
          />
        )}
        {totalDocs > 0 && (
          <div className="text-center mt-10">
            <Link href={`/blog/category/${categorySlug}`} className="text-accent font-medium hover:underline">
              Read more about {categoryLabel} on our blog →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
