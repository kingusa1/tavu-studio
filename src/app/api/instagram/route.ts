import { NextResponse } from "next/server";
import { getInstagramFeed, getInstagramProfile } from "@/lib/instagram";

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const [posts, profile] = await Promise.all([
      getInstagramFeed(),
      getInstagramProfile()
    ]);

    return NextResponse.json({
      posts,
      profile,
      success: posts.length > 0,
    });
  } catch (error) {
    console.error("Instagram API error:", error);
    return NextResponse.json({
      posts: [],
      profile: null,
      success: false,
      error: "Failed to fetch Instagram feed"
    });
  }
}
