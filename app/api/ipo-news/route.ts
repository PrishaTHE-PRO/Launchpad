import { NextResponse } from "next/server";
import { getIpoNews } from "@/lib/nyt-api";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? 12), 50);

  if (!process.env.NYT_API_KEY) {
    return NextResponse.json(
      {
        error: "NYT_API_KEY is not configured",
        setup:
          "Get a free key at https://developer.nytimes.com/ → create an app → enable Article Search API → add NYT_API_KEY to .env.local",
      },
      { status: 503 }
    );
  }

  try {
    const articles = await getIpoNews(limit);
    return NextResponse.json({ articles, count: articles.length, source: "nyt" });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch IPO news" },
      { status: 502 }
    );
  }
}
