import Image from 'next/image';
import Link from 'next/link';

import { resolveImage } from '@/lib/cms/media';
import type { Post } from '@/payload-types';

/** Blog list/category grid card — card style matches /events (bg-card, border-border, rounded-2xl). */
export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const cover = resolveImage(post.coverImage);
  const firstCategory = post.categories?.[0];
  const categoryTitle = firstCategory && typeof firstCategory !== 'number' ? firstCategory.title : undefined;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden h-full transition-colors hover:border-accent/40"
    >
      <div className={`relative ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'} overflow-hidden`}>
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={featured ? '100vw' : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
            priority={featured}
          />
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        {categoryTitle && (
          <span className="inline-block self-start bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium mb-3">
            {categoryTitle}
          </span>
        )}
        <h3 className={`font-headline text-primary mb-2 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>{post.title}</h3>
        <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">{post.excerpt}</p>
      </div>
    </Link>
  );
}
