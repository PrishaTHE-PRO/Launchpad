export interface Startup {
  id: number;
  slug: string;
  name: string;
  oneLiner: string;
  description: string;
  website: string;
  logoUrl: string;
  batch: string;
  industry: string;
  subindustry: string;
  tags: string[];
  teamSize: number | null;
  location: string;
  status: string;
  isHiring: boolean;
  topCompany: boolean;
  launchedAt: number;
  ycUrl: string;
  stage: string;
}

export interface IpoNewsItem {
  id: string;
  company: string;
  headline: string;
  summary: string;
  status: "filed" | "priced" | "trading" | "rumored" | "news";
  date: string;
  url: string;
  sector: string;
  source: string;
  imageUrl?: string;
}

export interface JobListing {
  id: string;
  title: string;
  location: string;
  department: string;
  posted: string;
  url: string;
  provider: "greenhouse" | "lever";
  boardToken: string;
}

export interface JobAnalysis {
  roleId: string;
  companySlug: string;
  companyName: string;
  roleTitle: string;
  scrapedAt: string;
  source: string;
  sourceUrl: string;
  techStack: { name: string; category: "language" | "framework" | "tool" | "infra" | "database" }[];
  softSkills: string[];
  requirements: string[];
  niceToHave: string[];
  summary: string;
}

export interface LearningRecommendation {
  id: string;
  type: "course" | "project" | "skill";
  title: string;
  provider?: string;
  reason: string;
  priority: "high" | "medium" | "low";
  gap: string;
}

export interface YcCompanyRaw {
  id: number;
  name: string;
  slug: string;
  small_logo_thumb_url: string;
  website: string;
  all_locations: string;
  long_description: string;
  one_liner: string;
  team_size: number | null;
  industry: string;
  subindustry: string;
  launched_at: number;
  tags: string[];
  top_company: boolean;
  isHiring: boolean;
  batch: string;
  status: string;
  url: string;
  stage?: string;
}
