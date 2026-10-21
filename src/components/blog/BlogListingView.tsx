import Link from 'next/link';
import { notFound } from 'next/navigation';

import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import NewsletterSignup from '@/components/newsletter/NewsletterSignup';
import { getAllCategories, getCategoryBySlug } from '@/lib/cms/categories';
import { getGlobal } from '@/lib/cms/globals';
import { buildBlogJsonLd } from '@/lib/cms/jsonLd';
import type { SeoFieldValue } from '@/lib/cms/metadata';
import { BLOG_PAGE_SIZE, getPublishedPosts } from '@/lib/cms/posts';
import { getSiteData } from '@/lib/cms/site';

import PostCard from './PostCard';

export type BlogPageData = {
  hero: { eyebrow?: string | null; title?: string | null; intro?: string | null };
  emptyState: { heading?: string | null; text?: string | null };
  seo: SeoFieldValue;
};

export type BlogListingViewProps = {
  /** When set, the listing is scoped to this category (`/blog/category/[slug]`). */
  categorySlug?: string;
  /** 1-based page number. */
  page: number;
};

/**
 * Shared body for every blog listing route (`/blog`, `/blog/page/[n]`, `/blog/category/[slug]`,
 * `/blog/category/[slug]/page/[n]`, brief §A) — one grid/pagination/empty-state implementation
 * instead of four near-duplicates.
 */
export default async function BlogListingView({ categorySlug, page }: BlogListingViewProps) {
  const [blogPage, categories, { settings }] = await Promise.all([
    getGlobal<BlogPageData>('blog-page'),
    getAllCategories(),
    getSiteData(),
  ]);

  const category = categorySlug ? await getCategoryBySlug(categorySlug) : null;
  if (categorySlug && !category) notFound();

  const { docs: posts, totalDocs, totalPages } = await getPublishedPosts({ categorySlug, page, limit: BLOG_PAGE_SIZE });
  if (page > 1 && posts.length === 0) notFound();

  const siteUrl = settings.brand.siteUrl ?? 'https://tavustudio.com';
  const basePath = category ? `/blog/category/${category.slug}` : '/blog';
  const isFirstUnfilteredPage = !category && page === 1;
  const featured = isFirstUnfilteredPage ? posts[0] : undefined;
  const gridPosts = isFirstUnfilteredPage ? posts.slice(1) : posts;

  const heroTitle = category ? category.title : blogPage.hero.title;
  const heroIntro = category ? category.description : blogPage.hero.intro;

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />
      {!category && <JsonLd data={buildBlogJsonLd({ siteUrl, name: blogPage.hero.title || 'TAVÚ Blog' })} />}

      <section className="tone-dark relative py-28 lg:py-36 flex items-center justify-center overflow-hidden bg-primary">
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
          <MotionWrapper delay={0} direction="up">
            {!category && blogPage.hero.eyebrow && (
              <span className="text-accent font-medium text-sm tracking-wider uppercase">{blogPage.hero.eyebrow}</span>
            )}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline mb-4 text-white mt-2">{heroTitle}</h1>
            {heroIntro && <p className="text-lg text-white/90 leading-relaxed">{heroIntro}</p>}
          </MotionWrapper>
        </div>
      </section>

      <main className="flex-grow">
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <Breadcrumbs
              siteUrl={siteUrl}
              items={[
                { name: 'Home', path: '/' },
                { name: 'Blog', path: '/blog' },
                ...(category ? [{ name: category.title, path: `/blog/category/${category.slug}` }] : []),
              ]}
            />

            {categories.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-12">
                <Link
                  href="/blog"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    !category ? 'bg-accent text-accent-foreground' : 'bg-card border border-border hover:border-accent/40'
                  }`}
                >
                  All
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/blog/category/${cat.slug}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      category?.id === cat.id ? 'bg-accent text-accent-foreground' : 'bg-card border border-border hover:border-accent/40'
                    }`}
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            )}

            {totalDocs === 0 ? (
              <div className="text-center max-w-xl mx-auto py-16">
                <h2 className="text-2xl font-headline text-primary mb-3">{blogPage.emptyState.heading}</h2>
                <p className="text-foreground/60">{blogPage.emptyState.text}</p>
              </div>
            ) : (
              <>
                {featured && (
                  <div className="mb-10">
                    <PostCard post={featured} featured />
                  </div>
                )}
                {gridPosts.length > 0 && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {gridPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
                {totalPages > 1 && (
                  <nav aria-label="Blog pagination" className="flex items-center justify-center gap-4 mt-16">
                    {page > 1 && (
                      <Link
                        href={page - 1 === 1 ? basePath : `${basePath}/page/${page - 1}`}
                        className="px-5 py-2.5 rounded-full border border-border hover:border-accent/40 transition-colors text-sm font-medium"
                      >
                        ← Previous
                      </Link>
                    )}
                    <span className="text-sm text-foreground/60">
                      Page {page} of {totalPages}
                    </span>
                    {page < totalPages && (
                      <Link
                        href={`${basePath}/page/${page + 1}`}
                        className="px-5 py-2.5 rounded-full border border-border hover:border-accent/40 transition-colors text-sm font-medium"
                      >
                        Next →
                      </Link>
                    )}
                  </nav>
                )}
              </>
            )}

            <div className="mt-20">
              <NewsletterSignup source="blog" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
