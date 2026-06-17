import type { JobListing } from "@/lib/types";

interface GreenhouseJob {
  id: number;
  title: string;
  location: { name: string };
  departments: { name: string }[];
  updated_at: string;
  absolute_url: string;
}

interface LeverPosting {
  id: string;
  text: string;
  categories: { team?: string; location?: string; commitment?: string };
  createdAt: number;
  hostedUrl: string;
}

async function fetchGreenhouseJobs(token: string): Promise<JobListing[]> {
  const res = await fetch(
    `https://boards-api.greenhouse.io/v1/boards/${token}/jobs?content=false`,
    { next: { revalidate: 1800 } }
  );
  if (!res.ok) return [];

  const data = (await res.json()) as { jobs: GreenhouseJob[] };
  return data.jobs.map((job) => ({
    id: String(job.id),
    title: job.title,
    location: job.location?.name ?? "Remote",
    department: job.departments?.[0]?.name ?? "General",
    posted: job.updated_at,
    url: job.absolute_url,
    provider: "greenhouse" as const,
    boardToken: token,
  }));
}

async function fetchLeverJobs(token: string): Promise<JobListing[]> {
  const res = await fetch(`https://api.lever.co/v0/postings/${token}?mode=json`, {
    next: { revalidate: 1800 },
  });
  if (!res.ok) return [];

  const postings = (await res.json()) as LeverPosting[];
  return postings.map((job) => ({
    id: job.id,
    title: job.text,
    location: job.categories?.location ?? "Remote",
    department: job.categories?.team ?? "General",
    posted: new Date(job.createdAt).toISOString(),
    url: job.hostedUrl,
    provider: "lever" as const,
    boardToken: token,
  }));
}

function tokensFromWebsite(website: string): string[] {
  try {
    const host = new URL(website.startsWith("http") ? website : `https://${website}`).hostname;
    const parts = host.replace(/^www\./, "").split(".");
    if (parts.length >= 2) return [parts[0]];
    return [];
  } catch {
    return [];
  }
}

export async function discoverJobs(
  slug: string,
  website?: string
): Promise<{ jobs: JobListing[]; boardToken: string | null; provider: string | null }> {
  const tokens = [slug, ...tokensFromWebsite(website ?? "")].filter(
    (t, i, arr) => t && arr.indexOf(t) === i
  );

  for (const token of tokens) {
    const greenhouse = await fetchGreenhouseJobs(token);
    if (greenhouse.length > 0) {
      return { jobs: greenhouse, boardToken: token, provider: "greenhouse" };
    }
  }

  for (const token of tokens) {
    const lever = await fetchLeverJobs(token);
    if (lever.length > 0) {
      return { jobs: lever, boardToken: token, provider: "lever" };
    }
  }

  return { jobs: [], boardToken: null, provider: null };
}

export async function fetchJobDescription(
  provider: "greenhouse" | "lever",
  boardToken: string,
  jobId: string
): Promise<{ title: string; contentHtml: string; url: string; companyName?: string } | null> {
  if (provider === "greenhouse") {
    const res = await fetch(
      `https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs/${jobId}`,
      { next: { revalidate: 600 } }
    );
    if (!res.ok) return null;
    const job = (await res.json()) as {
      title: string;
      content: string;
      absolute_url: string;
      company_name?: string;
    };
    return {
      title: job.title,
      contentHtml: job.content,
      url: job.absolute_url,
      companyName: job.company_name,
    };
  }

  const res = await fetch(
    `https://api.lever.co/v0/postings/${boardToken}/${jobId}?mode=json`,
    { next: { revalidate: 600 } }
  );
  if (!res.ok) return null;
  const job = (await res.json()) as {
    text: string;
    descriptionPlain?: string;
    description?: string;
    hostedUrl: string;
  };
  return {
    title: job.text,
    contentHtml: job.description ?? job.descriptionPlain ?? "",
    url: job.hostedUrl,
  };
}

export function filterEngineeringRoles(jobs: JobListing[]): JobListing[] {
  const keywords = /engineer|developer|software|backend|frontend|full.?stack|ml|machine learning|data|product manager|designer|sre|devops|intern/i;
  const filtered = jobs.filter((j) => keywords.test(j.title));
  return filtered.length > 0 ? filtered.slice(0, 20) : jobs.slice(0, 20);
}
