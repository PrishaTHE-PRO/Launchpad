import { NextResponse } from "next/server";
import { fetchJobDescription } from "@/lib/jobs-api";
import { analyzeJobDescription, generateRecommendations } from "@/lib/job-analysis";
import { getStartupBySlug } from "@/lib/yc-api";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const jobId = searchParams.get("jobId");
  const provider = searchParams.get("provider") as "greenhouse" | "lever" | null;
  const boardToken = searchParams.get("boardToken");
  const resumeText = searchParams.get("resume") ?? undefined;

  if (!slug || !jobId || !provider || !boardToken) {
    return NextResponse.json(
      { error: "slug, jobId, provider, and boardToken are required" },
      { status: 400 }
    );
  }

  try {
    const job = await fetchJobDescription(provider, boardToken, jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const startup = await getStartupBySlug(slug);
    const companyName = job.companyName ?? startup?.name ?? slug;

    const analysis = analyzeJobDescription(job.contentHtml, {
      roleId: jobId,
      companySlug: slug,
      companyName,
      roleTitle: job.title,
      source: provider === "greenhouse" ? "Greenhouse" : "Lever",
      sourceUrl: job.url,
    });

    const recommendations = resumeText
      ? generateRecommendations(analysis, resumeText)
      : [];

    return NextResponse.json({ analysis, recommendations, jobUrl: job.url });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to analyze job" },
      { status: 502 }
    );
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    slug: string;
    jobId: string;
    provider: "greenhouse" | "lever";
    boardToken: string;
    resumeText?: string;
  };

  const { slug, jobId, provider, boardToken, resumeText } = body;
  if (!slug || !jobId || !provider || !boardToken) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const job = await fetchJobDescription(provider, boardToken, jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const startup = await getStartupBySlug(slug);
    const companyName = job.companyName ?? startup?.name ?? slug;

    const analysis = analyzeJobDescription(job.contentHtml, {
      roleId: jobId,
      companySlug: slug,
      companyName,
      roleTitle: job.title,
      source: provider === "greenhouse" ? "Greenhouse" : "Lever",
      sourceUrl: job.url,
    });

    const recommendations = generateRecommendations(analysis, resumeText);

    return NextResponse.json({ analysis, recommendations, jobUrl: job.url });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to analyze job" },
      { status: 502 }
    );
  }
}
