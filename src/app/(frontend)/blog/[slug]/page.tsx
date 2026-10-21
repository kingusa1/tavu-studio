import { format } from 'date-fns';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PostBody from '@/components/blog/PostBody';
import PostCard from '@/components/blog/PostCard';
import BackgroundImage from '@/components/common/BackgroundImage';
import FaqAccordionSection from '@/components/faq/FaqAccordionSection';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import NewsletterSignup from '@/components/newsletter/NewsletterSignup';
import { buildBlogPostingJsonLd } from '@/lib/cms/jsonLd';
import { buildMetadata } from '@/lib/cms/metadata';
import { resolveImage } from '@/lib/cms/media';
import { getPostBySlug } from '@/lib/cms/posts';
import { estimateReadingMinutes } from '@/lib/cms/readingTime';
import { getSiteData } from '@/lib/cms/site';

type Props = { params: Promise<{ slug: string }> };

/** Category slug -> the one service/overview page that covers it (brief §D8 internal linking). */
const CATEGORY_SERVICE_LINK: Record<string, { href: string; label: string }> = {
  'reformer-pilates': { href: '/services/reformer-pilates', label: 'Reformer Pilates' },
  'breathing-room': { href: '/services/breathing-room', label: 'Breathing Room' },
  massage: { href: '/services/massage', label: 'Massage' },
  recovery: { href: '/recovery', label: 'Recovery' },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [post, { settings }] = await Promise.all([getPostBySlug(slug), getSiteData()]);
  if (!post) return {};
  const cover = resolveImage(post.coverImage);
  return buildMetadata(post.seo, {
    path: `/blog/${slug}`,
    fallback: {
      titleDefault: post.title,
      description: post.excerpt,
      ogImage: cover ? post.coverImage.media : settings.seo.ogImage,
      ogImageAlt: cover?.alt,
    },
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, { settings }] = await Promise.all([getPostBySlug(slug), getSiteData()]);
  if (!post) notFound();

  const siteUrl = settings.brand.siteUrl ?? 'https://tavustudio.com';
  const cover = resolveImage(post.coverImage);
  const author = typeof post.author !== 'number' ? post.author : null;
  const reviewer = post.reviewedBy && typeof post.reviewedBy !== 'number' ? post.reviewedBy : null;
  const authorPhoto = author ? resolveImage(author.photo) : null;
  const readingMinutes = estimateReadingMinutes(post.body as never);
  const categories = (post.categories ?? []).filter((category): category is Exclude<typeof category, number> => typeof category !== 'number');
  const serviceLink = categories.map((category) => CATEGORY_SERVICE_LINK[category.slug]).find(Boolean);
  const relatedPosts = (post.relatedPosts ?? []).filter((related): related is Exclude<typeof related, number> => typeof related !== 'number');

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />
      <JsonLd
        data={buildBlogPostingJsonLd({
          siteUrl,
          post: {
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            coverImageUrl: cover?.src,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            authorName: author?.name ?? 'TAVÚ Studio',
            authorSlug: author?.slug,
            authorSameAs: (author?.sameAs ?? []).map((row) => row.url).filter((url): url is string => Boolean(url)),
            categoryNames: categories.map((category) => category.title),
          },
        })}
      />

      <main className="flex-grow pt-24">
        <article className="container mx-auto px-4 py-12 sm:py-16 max-w-3xl">
          <Breadcrumbs
            siteUrl={siteUrl}
            items={[
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blog' },
              { name: post.title, path: `/blog/${post.slug}` },
            ]}
          />

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog/category/${category.slug}`}
                  className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium hover:bg-accent/20 transition-colors"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-primary mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/60 mb-8">
            {author && (
              <Link href={`/blog/author/${author.slug}`} className="flex items-center gap-2 hover:text-accent transition-colors">
                {authorPhoto && (
                  <span className="relative block w-8 h-8 rounded-full overflow-hidden">
                    <Image src={authorPhoto.src} alt={authorPhoto.alt} fill className="object-cover" sizes="32px" />
                  </span>
                )}
                <span className="font-medium text-foreground/80">{author.name}</span>
              </Link>
            )}
            {reviewer && <span>Reviewed by {reviewer.name}</span>}
            {post.publishedAt && <span>Published {format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>}
            {post.publishedAt && post.updatedAt && post.updatedAt !== post.publishedAt && (
              <span>Updated {format(new Date(post.updatedAt), 'MMMM d, yyyy')}</span>
            )}
            <span>{readingMinutes} min read</span>
            <Link href="/editorial-policy" className="underline hover:text-accent transition-colors">
              Editorial policy
            </Link>
          </div>

          {cover && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10">
              <Image src={cover.src} alt={cover.alt} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 768px" />
            </div>
          )}

          <PostBody data={post.body} />

          {post.faq && post.faq.length > 0 && (
            <div className="mt-12 pt-12 border-t border-border">
              <FaqAccordionSection
                faqs={post.faq.map((row, index) => ({ id: row.id ?? index, question: row.question, answer: row.answer }))}
                heading="Frequently Asked Questions"
                idPrefix="post-faq"
              />
            </div>
          )}

          {post.sources && post.sources.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h2 className="text-xl font-headline text-primary mb-4">Sources</h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-foreground/70">
                {post.sources.map((source, index) => (
                  <li key={index}>
                    <a href={source.url} className="underline hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-border bg-card rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-headline text-primary mb-3">Ready to experience it yourself?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/schedule" className="px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity">
                Book a Class
              </Link>
              {serviceLink && (
                <Link
                  href={serviceLink.href}
                  className="px-6 py-3 rounded-full border border-border hover:border-accent/40 transition-colors font-medium"
                >
                  Explore {serviceLink.label}
                </Link>
              )}
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-headline text-primary mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                  <PostCard key={related.id} post={related} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-16">
            <NewsletterSignup source={`blog:${post.slug}`} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
