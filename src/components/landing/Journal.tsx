import Link from 'next/link';

import MotionWrapper from '@/components/common/MotionWrapper';
import PostCard from '@/components/blog/PostCard';
import { getLatestPublishedPosts } from '@/lib/cms/posts';

/**
 * "From the Journal" home-page teaser (owner 2026-10-21: "show the blogs and the newsletter").
 * Server component — fetches its own data so it can be rendered directly from the (server)
 * `page.tsx` and handed to the client `HomeView` as a pre-rendered element (a Client Component
 * cannot import and render an async Server Component directly). Renders nothing when there are
 * no published posts yet, so the section never shows an empty grid.
 */
export default async function Journal() {
  const posts = await getLatestPublishedPosts(3);
  if (posts.length === 0) return null;

  return (
    <section id="journal" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <MotionWrapper delay={0} direction="up">
          <div className="text-center mb-16">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6 block">Journal</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-headline font-medium text-primary mb-6">
              From the <em className="italic font-light text-primary/75">Journal</em>
            </h2>
            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto font-light">
              Guides on Reformer Pilates, Breathing Room, Contrast Therapy and recovery from the TAVÚ team.
            </p>
          </div>
        </MotionWrapper>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <MotionWrapper delay={0.2} direction="up">
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full border-2 border-accent text-accent font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              View all articles
            </Link>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
