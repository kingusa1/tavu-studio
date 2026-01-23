// Instagram Integration via Behold.so (Third-party service)
//
// SETUP INSTRUCTIONS:
// 1. Go to https://behold.so and create a free account
// 2. Click "Add Feed" and connect your Instagram account
// 3. Copy your Feed ID from the dashboard
// 4. Add BEHOLD_FEED_ID=your_feed_id to your .env.local file
// 5. Restart the dev server - your Instagram posts will appear!
//
// Free tier includes: 1 feed, 12 posts, updates every 6 hours

export interface BeholdPost {
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

export interface BeholdFeedResponse {
  posts: BeholdPost[];
  username: string;
  profilePictureUrl: string;
  followersCount: number;
  mediaCount: number;
}

const BEHOLD_FEED_ID = process.env.BEHOLD_FEED_ID;

export async function getInstagramFeed(): Promise<BeholdPost[]> {
  if (!BEHOLD_FEED_ID) {
    console.warn("Behold Feed ID not configured. Add BEHOLD_FEED_ID to .env.local");
    return [];
  }

  try {
    const response = await fetch(
      `https://feeds.behold.so/${BEHOLD_FEED_ID}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Behold API error: ${response.status}`);
    }

    const data: BeholdFeedResponse = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error("Failed to fetch Instagram feed from Behold:", error);
    return [];
  }
}

export async function getInstagramProfile(): Promise<Partial<BeholdFeedResponse> | null> {
  if (!BEHOLD_FEED_ID) {
    return null;
  }

  try {
    const response = await fetch(
      `https://feeds.behold.so/${BEHOLD_FEED_ID}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      return null;
    }

    const data: BeholdFeedResponse = await response.json();
    return {
      username: data.username,
      profilePictureUrl: data.profilePictureUrl,
      followersCount: data.followersCount,
      mediaCount: data.mediaCount,
    };
  } catch {
    return null;
  }
}
