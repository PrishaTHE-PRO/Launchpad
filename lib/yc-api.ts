import type { Startup, YcCompanyRaw } from "@/lib/types";

const YC_BASE = "https://yc-oss.github.io/api";
const RECENT_BATCHES = [
  "winter-2026",
  "spring-2026",
  "summer-2025",
  "fall-2025",
  "winter-2025",
  "spring-2025",
];

const CACHE_SECONDS = 3600;

export function mapYcCompany(raw: YcCompanyRaw): Startup {
  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    oneLiner: raw.one_liner,
    description: raw.long_description || raw.one_liner,
    website: raw.website,
    logoUrl: raw.small_logo_thumb_url,
    batch: raw.batch,
    industry: raw.industry,
    subindustry: raw.subindustry,
    tags: raw.tags ?? [],
    teamSize: raw.team_size,
    location: raw.all_locations,
    status: raw.status,
    isHiring: raw.isHiring,
    topCompany: raw.top_company,
    launchedAt: raw.launched_at,
    ycUrl: raw.url,
    stage: raw.stage ?? "Early",
  };
}

async function fetchYcJson<T>(path: string): Promise<T> {
  const res = await fetch(`${YC_BASE}${path}`, {
    next: { revalidate: CACHE_SECONDS },
  });
  if (!res.ok) {
    throw new Error(`YC API error ${res.status} for ${path}`);
  }
  return res.json() as Promise<T>;
}

export async function getRecentStartups(options?: {
  limit?: number;
  industry?: string;
  hiringOnly?: boolean;
}): Promise<Startup[]> {
  const { limit = 24, industry, hiringOnly = false } = options ?? {};

  const batchResults = await Promise.all(
    RECENT_BATCHES.map((batch) => fetchYcJson<YcCompanyRaw[]>(`/batches/${batch}.json`))
  );

  let companies = batchResults.flat().map(mapYcCompany);

  if (hiringOnly) {
    companies = companies.filter((c) => c.isHiring);
  }

  companies.sort((a, b) => b.launchedAt - a.launchedAt);

  if (industry && industry !== "All") {
    companies = companies.filter(
      (c) =>
        c.industry.toLowerCase().includes(industry.toLowerCase()) ||
        c.subindustry.toLowerCase().includes(industry.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(industry.toLowerCase()))
    );
  }

  return companies.slice(0, limit);
}

export async function getHiringStartups(limit = 50): Promise<Startup[]> {
  const raw = await fetchYcJson<YcCompanyRaw[]>("/companies/hiring.json");
  return raw
    .map(mapYcCompany)
    .sort((a, b) => b.launchedAt - a.launchedAt)
    .slice(0, limit);
}

export async function getTopStartups(limit = 24): Promise<Startup[]> {
  const raw = await fetchYcJson<YcCompanyRaw[]>("/companies/top.json");
  return raw.map(mapYcCompany).slice(0, limit);
}

export async function getStartupBySlug(slug: string): Promise<Startup | null> {
  const sources = await Promise.all([
    fetchYcJson<YcCompanyRaw[]>("/companies/hiring.json").catch(() => []),
    ...RECENT_BATCHES.map((b) =>
      fetchYcJson<YcCompanyRaw[]>(`/batches/${b}.json`).catch(() => [])
    ),
  ]);

  const match = sources.flat().find((c) => c.slug === slug);
  return match ? mapYcCompany(match) : null;
}

export async function getIndustries(): Promise<string[]> {
  const meta = await fetchYcJson<{ industries: Record<string, number> }>("/meta.json");
  return Object.keys(meta.industries).sort();
}
