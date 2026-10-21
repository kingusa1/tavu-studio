import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import PostCard from '@/components/blog/PostCard';
import BackgroundImage from '@/components/common/BackgroundImage';
import MotionWrapper from '@/components/common/MotionWrapper';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { getAuthorBySlug, getPostsByAuthorId } from '@/lib/cms/authors';
import { buildMetadata } from '@/lib/cms/metadata';
import { resolveImage } from '@/lib/cms/media';
import { getSiteData } from '@/lib/cms/site';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [author, { settings }] = await Promise.all([getAuthorBySlug(slug), getSiteData()]);
  if (!author) return {};
  return buildMetadata(undefined, {
    path: `/blog/author/${slug}`,
    fallback: { titleDefault: `${author.name} — TAVÚ Blog`, description: author.bio, ogImage: settings.seo.ogImage },
  });
}

export default async function BlogAuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();

  const [posts, { settings }] = await Promise.all([getPostsByAuthorId(author.id), getSiteData()]);
  const siteUrl = settings.brand.siteUrl ?? 'https://tavustudio.com';
  const photo = resolveImage(author.photo);

  return (
    <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
      <BackgroundImage />
      <Header />

      <main className="flex-grow pt-24">
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Breadcrumbs
              siteUrl={siteUrl}
              items={[
                { name: 'Home', path: '/' },
                { name: 'Blog', path: '/blog' },
                { name: author.name, path: `/blog/author/${author.slug}` },
              ]}
            />

            <MotionWrapper delay={0} direction="up">
              <div className="flex items-center gap-6 mb-4">
                {photo && (
                  <span className="relative block w-20 h-20 rounded-full overflow-hidden shrink-0">
                    <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="80px" />
                  </span>
                )}
                <div>
                  <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary">{author.name}</h1>
                  {author.role && <p className="text-accent font-medium">{author.role}</p>}
                </div>
              </div>
              {author.bio && <p className="text-foreground/70 leading-relaxed max-w-2xl mb-6">{author.bio}</p>}
              {author.credentials && <p className="text-sm text-foreground/50 mb-12">{author.credentials}</p>}
            </MotionWrapper>

            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-foreground/60">No articles published yet.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
