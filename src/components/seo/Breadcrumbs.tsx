import Link from 'next/link';

import { buildBreadcrumbJsonLd } from '@/lib/cms/jsonLd';

import JsonLd from './JsonLd';

export type BreadcrumbItem = { name: string; path: string };

/**
 * Visible breadcrumb trail + its `BreadcrumbList` JSON-LD (brief §D5 — every non-home route).
 * `items` starts at Home; the last item is the current page and renders as plain text.
 */
export default function Breadcrumbs({ siteUrl, items }: { siteUrl: string; items: BreadcrumbItem[] }) {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd({ siteUrl, items })} />
      <nav aria-label="Breadcrumb" className="text-sm text-foreground/60 mb-6">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, index) => (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="text-foreground/30">
                  /
                </span>
              )}
              {index === items.length - 1 ? (
                <span className="text-foreground/80" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-accent transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
