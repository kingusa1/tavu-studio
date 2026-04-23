"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import MotionWrapper from "@/components/common/MotionWrapper";
import { Instagram, Heart, ExternalLink, Play, Loader2, MessageCircle } from "lucide-react";

interface InstagramPost {
  id: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  likesCount?: number;
  commentsCount?: number;
}

interface InstagramProfile {
  username?: string;
  profilePictureUrl?: string;
  followersCount?: number;
  mediaCount?: number;
}

// Fallback images when Instagram is not connected — real TAVÚ photos
const fallbackImages = [
  { src: "/hero-reformer-studio.webp", alt: "TAVÚ Reformer Pilates studio", likes: 234, comments: 12 },
  { src: "/service-reformer-mirror.webp", alt: "Reformer studio with backlit mirror", likes: 189, comments: 8 },
  { src: "/service-sauna.webp", alt: "Himalayan salt sauna at TAVÚ", likes: 267, comments: 11 },
  { src: "/service-ice-baths.webp", alt: "Contrast Therapy ice baths", likes: 312, comments: 15 },
  { src: "/service-breathing-props.webp", alt: "Breathing Room props", likes: 198, comments: 9 },
  { src: "/service-breathing-shelf.webp", alt: "Studio equipment shelf", likes: 156, comments: 7 },
  { src: "/service-massage-towels.webp", alt: "TAVÚ branded towels", likes: 223, comments: 10 },
  { src: "/about-reception.webp", alt: "TAVÚ reception desk", likes: 289, comments: 14 },
  { src: "/about-lounge.webp", alt: "TAVÚ lounge space", likes: 254, comments: 11 },
  { src: "/about-exterior.webp", alt: "TAVÚ studio exterior", likes: 211, comments: 9 },
  { src: "/about-brand.webp", alt: "TAVÚ branded merchandise", likes: 198, comments: 8 },
  { src: "/about-entrance.webp", alt: "TAVÚ entrance", likes: 244, comments: 13 },
  { src: "/amenity-cafe.webp", alt: "TAVÚ café", likes: 167, comments: 6 },
  { src: "/amenity-coffee.webp", alt: "By the Beach meets TAVÚ coffee", likes: 187, comments: 10 },
  { src: "/amenity-bathroom.webp", alt: "TAVÚ bathroom suite", likes: 132, comments: 5 },
  { src: "/service-recovery-equipment.webp", alt: "Recovery equipment", likes: 176, comments: 7 },
];

export default function SocialFeed() {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch Instagram posts on mount
  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch("/api/instagram");
        const data = await response.json();
        if (data.success && data.posts.length > 0) {
          setInstagramPosts(data.posts);
          setProfile(data.profile);
          setIsConnected(true);
        }
      } catch (error) {
        console.log("Instagram feed not connected, using fallback images");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  // Use Instagram posts if available, otherwise use fallback
  const displayImages = isConnected
    ? instagramPosts.map((post) => ({
        src: post.mediaType === "VIDEO" ? (post.thumbnailUrl || post.mediaUrl) : post.mediaUrl,
        alt: post.caption?.slice(0, 50) || "Instagram post",
        permalink: post.permalink,
        isVideo: post.mediaType === "VIDEO",
        likes: post.likesCount || 0,
        comments: post.commentsCount || 0,
      }))
    : fallbackImages.map((img) => ({ ...img, permalink: "https://instagram.com/tavuwellness.studio", isVideo: false }));

  // Duplicate for seamless loop
  const allImages = [...displayImages, ...displayImages];

  const instagramHandle = profile?.username || "tavuwellness.studio";

  return (
    <section className="py-16 lg:py-24 bg-primary/5 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <MotionWrapper delay={0} direction="up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
                Follow Us
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-medium text-primary flex items-center gap-3">
                @{instagramHandle}
                {isLoading && (
                  <Loader2 className="w-5 h-5 animate-spin text-foreground/40" />
                )}
                {!isLoading && isConnected && (
                  <span className="inline-flex items-center gap-1 text-xs font-normal bg-green-500/10 text-green-600 px-2 py-1 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Live Feed
                  </span>
                )}
              </h2>
              {!isLoading && !isConnected && (
                <p className="text-sm text-foreground/50 mt-2">
                  Connect your Instagram to show live posts
                </p>
              )}
            </div>
            <motion.a
              href={`https://instagram.com/${instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 md:mt-0 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium hover:opacity-90 transition-opacity shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Instagram className="w-5 h-5" />
              Follow on Instagram
            </motion.a>
          </div>
        </MotionWrapper>
      </div>

      {/* Infinite Scrolling Strip */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary/5 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary/5 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4"
          animate={{
            x: isPaused ? undefined : [0, -50 * displayImages.length * 16],
          }}
          transition={{
            x: {
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{ willChange: "transform" }}
        >
          {allImages.map((image, index) => (
            <motion.a
              key={index}
              href={image.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex-shrink-0 w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="288px"
                unoptimized={isConnected} // Behold proxied URLs via behold.pictures
              />

              {/* Video indicator */}
              {image.isVideo && (
                <div className="absolute top-3 left-3 bg-black/60 rounded-full p-2 z-10">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
              )}

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end pb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 text-white">
                  <motion.div
                    className="flex items-center gap-2"
                    animate={hoveredIndex === index ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                    <span className="text-sm font-medium">{image.likes}</span>
                  </motion.div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium">{image.comments}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/80">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>

              {/* Corner decoration */}
              <motion.div
                className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-white/0 rounded-tr-lg"
                animate={hoveredIndex === index ? { borderColor: "rgba(255,255,255,0.5)" } : {}}
              />
              <motion.div
                className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-white/0 rounded-bl-lg"
                animate={hoveredIndex === index ? { borderColor: "rgba(255,255,255,0.5)" } : {}}
              />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Pause indicator */}
      <div className="container mx-auto px-6 mt-6">
        <p className="text-center text-sm text-foreground/40">
          {isPaused ? "Paused - move mouse away to continue" : "Hover to pause"}
        </p>
      </div>

      {/* Setup Instructions (only show when not connected) */}
      {!isLoading && !isConnected && (
        <MotionWrapper delay={0.3} direction="up">
          <div className="container mx-auto px-6 mt-8">
            <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-pink-500/20 rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="text-primary font-semibold mb-3 flex items-center gap-2">
                <Instagram className="w-5 h-5" />
                Connect Your Instagram Feed
              </h3>
              <p className="text-sm text-foreground/70 mb-4">
                Display your real Instagram posts using Behold.so (free & easy):
              </p>
              <ol className="text-sm text-foreground/60 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center font-bold">1</span>
                  <span>Go to <a href="https://behold.so" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">behold.so</a> and create a free account</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center font-bold">2</span>
                  <span>Click &quot;Add Feed&quot; and connect your Instagram account</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center font-bold">3</span>
                  <span>Copy your <strong>Feed ID</strong> from the Behold dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center font-bold">4</span>
                  <div>
                    <span>Add to your <code className="bg-black/10 px-1.5 py-0.5 rounded text-xs">.env.local</code> file:</span>
                    <code className="block mt-2 bg-black/10 px-3 py-2 rounded text-xs">BEHOLD_FEED_ID=your_feed_id_here</code>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center font-bold">5</span>
                  <span>Restart your dev server and your posts will appear!</span>
                </li>
              </ol>
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-xs text-green-700 flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <strong>Free tier includes:</strong> 1 feed, 12 posts, updates every 6 hours
                </p>
              </div>
            </div>
          </div>
        </MotionWrapper>
      )}
    </section>
  );
}
