import { NextResponse } from "next/server";
import { getRecentStartups, getHiringStartups, getTopStartups } from "@/lib/yc-api";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get("source") ?? "recent";
  const limit = Math.min(Number(searchParams.get("limit") ?? 24), 100);
  const industry = searchParams.get("industry") ?? undefined;

  try {
    let startups;
    switch (source) {
      case "hiring":
        startups = await getHiringStartups(limit);
        break;
      case "top":
        startups = await getTopStartups(limit);
        break;
      default:
        startups = await getRecentStartups({ limit, industry, hiringOnly: false });
    }

    return NextResponse.json({ startups, source, count: startups.length });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch startups" },
      { status: 502 }
    );
  }
}
