import { NextResponse } from "next/server";
import { discoverJobs, filterEngineeringRoles } from "@/lib/jobs-api";
import { getStartupBySlug } from "@/lib/yc-api";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const website = searchParams.get("website") ?? undefined;

  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  try {
    let site = website;
    if (!site) {
      const startup = await getStartupBySlug(slug);
      site = startup?.website;
    }

    const { jobs, boardToken, provider } = await discoverJobs(slug, site);
    const filtered = filterEngineeringRoles(jobs);

    return NextResponse.json({
      jobs: filtered,
      boardToken,
      provider,
      count: filtered.length,
      fallbackUrl: `https://www.workatastartup.com/companies/${slug}`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch jobs" },
      { status: 502 }
    );
  }
}
