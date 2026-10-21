import { RichText } from '@/components/cms/RichText';
import type { Post } from '@/payload-types';

/**
 * Readable prose styling for the article body, in the site's own fonts/colours (brief §A: "body
 * through the existing RichText renderer with readable prose styles in the site's fonts"). Uses
 * descendant selectors rather than a typography plugin, consistent with the rest of the codebase
 * (no `@tailwindcss/typography` dependency).
 */
export default function PostBody({ data }: { data: Post['body'] }) {
  return (
    <div
      className="max-w-none text-foreground/90 [&_h2]:font-headline [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:text-primary [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-headline [&_h3]:text-xl [&_h3]:text-primary [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-4 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:opacity-80 [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-foreground/70 [&_blockquote]:my-6 [&_img]:rounded-xl [&_img]:my-6 [&_picture]:block [&_picture]:my-6"
    >
      <RichText data={data as unknown as Parameters<typeof RichText>[0]['data']} preset="post" />
    </div>
  );
}
