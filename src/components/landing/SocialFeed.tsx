"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useInView, useReducedMotion } from "framer-motion";
import MotionWrapper from "@/components/common/MotionWrapper";
import { Instagram, ExternalLink, Play, Pause, Loader2 } from "lucide-react";

import { useSiteData } from "@/components/providers/SiteDataProvider";
import { resolveImage } from "@/lib/cms/media";
import type { HomePage } from "@/payload-types";

export type SocialFeedData = NonNullable<HomePage["socialFeed"]>;

export type SocialFeedProps = {
  data: SocialFeedData;
};

interface InstagramPost {
  id: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

interface InstagramProfile {
  username?: string;
  profilePictureUrl?: string;
  followersCount?: number;
  mediaCount?: number;
}

interface FeedItem {
  src: string;
  alt: string;
  permalink: string;
  isVideo: boolean;
}

// Strip speed in pixels per second.
const SCROLL_SPEED = 40;

/** Behold serves a JPEG poster as mediaUrl for videos; only fall back to the small thumbnail for raw .mp4 URLs (fix/social-feed hotfix). */
function postImage(post: InstagramPost): string {
  const isMp4 = /\.mp4(\?|$)/i.test(post.mediaUrl);
  return post.mediaType === "VIDEO" && isMp4 ? post.thumbnailUrl || post.mediaUrl : post.mediaUrl;
}

function postAlt(post: InstagramPost): string {
  const caption = post.caption?.replace(/\s+/g, " ").trim();
  return caption ? `Instagram post: ${caption.slice(0, 100)}` : "TAVÚ Instagram post";
}

export default function SocialFeed({ data }: SocialFeedProps) {
  const { settings } = useSiteData();
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [failedSrcs, setFailedSrcs] = useState<ReadonlySet<string>>(new Set());

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  // Mount the strip (and start loading every image) shortly before it scrolls into view, so
  // cards never appear empty while lazy images catch up with the moving strip.
  const isNearView = useInView(sectionRef, { once: true, margin: "600px 0px" });
  const prefersReducedMotion = useReducedMotion();

  // Fetch Instagram posts on mount — the live-feed API route is unchanged (§6 Package A spec).
  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch("/api/instagram");
        const json = await response.json();
        if (json.success && json.posts.length > 0) {
          setInstagramPosts(json.posts);
          setProfile(json.profile);
          setIsConnected(true);
        }
      } catch {
        // Feed unavailable: the fallback photos are shown instead.
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  const fallbackImages: FeedItem[] = (data.fallbackImages ?? []).map((row) => {
    const resolved = resolveImage(row.image);
    return {
      src: resolved?.src ?? '',
      alt: resolved?.alt ?? '',
      permalink: settings.social.instagramUrl || "https://www.instagram.com/tavuwellness.studio",
      isVideo: false,
    };
  });

  const displayImages: FeedItem[] = (
    isConnected
      ? instagramPosts.map((post) => ({
          src: postImage(post),
          alt: postAlt(post),
          permalink: post.permalink,
          isVideo: post.mediaType === "VIDEO",
        }))
      : fallbackImages
  ).filter((item) => !failedSrcs.has(item.src));

  const isPaused = isHoverPaused || isUserPaused;
  const isAnimated = !prefersReducedMotion;

  // Seamless loop: the track holds the items twice, so it scrolls exactly half its width, then wraps.
  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track || !isAnimated || isPaused) return;
    const loopWidth = track.scrollWidth / 2;
    if (loopWidth <= 0) return;
    offsetRef.current = (offsetRef.current + (Math.min(delta, 100) / 1000) * SCROLL_SPEED) % loopWidth;
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
  });

  const markFailed = (src: string) =>
    setFailedSrcs((prev) => (prev.has(src) ? prev : new Set([...prev, src])));

  const loops = isAnimated ? [0, 1] : [0];
  const instagramHandle = profile?.username || settings.social.instagramHandle || "tavuwellness.studio";
  const showSetupGuide = data.showSetupGuide !== false && process.env.NODE_ENV !== "production" && !isLoading && !isConnected;

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-primary/5 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <MotionWrapper delay={0} direction="up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
                {data.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-medium text-primary flex items-center gap-3">
                @{instagramHandle}
                {isLoading && (
                  <Loader2 className="w-5 h-5 animate-spin text-foreground/40" aria-hidden="true" />
                )}
              </h2>
            </div>
            <div className="mt-6 md:mt-0 flex flex-wrap gap-3">
              <motion.a
                href={`https://www.instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow TAVÚ on Instagram"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium hover:opacity-90 transition-opacity shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
                {data.instagramButtonLabel}
              </motion.a>
              <motion.a
                href={settings.social.tiktokUrl || "https://www.tiktok.com/@tavuwellness.studio"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow TAVÚ on TikTok"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black text-white font-medium hover:opacity-90 transition-opacity shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.77a8.16 8.16 0 0 0 4.77 1.52V6.85a4.85 4.85 0 0 1-1.84-.16z" />
                </svg>
                {data.tiktokButtonLabel}
              </motion.a>
            </div>
          </div>
        </MotionWrapper>
      </div>

      {/* Scrolling strip — hover or keyboard focus pauses it; reduced-motion users get a static, swipeable row */}
      <div
        className={`relative ${isAnimated ? "overflow-hidden" : "overflow-x-auto"}`}
        onMouseEnter={() => setIsHoverPaused(true)}
        onMouseLeave={() => setIsHoverPaused(false)}
        onFocusCapture={() => setIsHoverPaused(true)}
        onBlurCapture={() => setIsHoverPaused(false)}
      >
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary/5 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary/5 to-transparent z-10 pointer-events-none" />

        {isNearView && !isLoading && displayImages.length > 0 ? (
          <div ref={trackRef} className="flex w-max" style={{ willChange: isAnimated ? "transform" : undefined }}>
            {loops.map((loop) => (
              <div key={loop} className="flex gap-4 pr-4" aria-hidden={loop === 1 ? true : undefined}>
                {displayImages.map((image) => (
                  <a
                    key={`${loop}-${image.src}`}
                    href={image.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={loop === 1 ? -1 : undefined}
                    aria-label={`${image.alt} (opens Instagram)`}
                    className="relative flex-shrink-0 w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden bg-primary/10 cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading="eager"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="288px"
                      unoptimized={isConnected} // Behold proxied URLs via behold.pictures
                      onError={() => markFailed(image.src)}
                    />

                    {/* Video indicator */}
                    {image.isVideo && (
                      <div className="absolute top-3 left-3 bg-black/60 rounded-full p-2 z-10" aria-hidden="true">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
                        View on Instagram
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="h-64 md:h-72" aria-hidden="true" />
        )}
      </div>

      {isAnimated && displayImages.length > 0 && (
        <div className="container mx-auto px-6 mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setIsUserPaused((paused) => !paused)}
            aria-pressed={isUserPaused}
            aria-label={isUserPaused ? "Play the Instagram strip" : "Pause the Instagram strip"}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-background/80 text-primary hover:bg-background transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {isUserPaused ? <Play className="w-4 h-4" aria-hidden="true" /> : <Pause className="w-4 h-4" aria-hidden="true" />}
          </button>
        </div>
      )}

      {/* Setup instructions — development only, never shown to visitors */}
      {showSetupGuide && (
        <div className="container mx-auto px-6 mt-8">
          <div className="border border-pink-500/20 rounded-xl p-6 max-w-2xl mx-auto text-sm text-foreground/70">
            <p className="font-semibold text-primary mb-2">Instagram feed not connected (dev only)</p>
            <p>
              Set <code className="bg-black/10 px-1.5 py-0.5 rounded text-xs">BEHOLD_FEED_ID</code> in{" "}
              <code className="bg-black/10 px-1.5 py-0.5 rounded text-xs">.env.local</code> (feed id from behold.so) and
              restart the dev server.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
