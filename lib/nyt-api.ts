import type { IpoNewsItem } from "@/lib/types";

const NYT_SEARCH = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const CACHE_SECONDS = 1800;

interface NytArticle {
  _id: string;
  headline: { main: string };
  abstract: string;
  pub_date: string;
  web_url: string;
  section_name?: string;
  news_desk?: string;
  multimedia?: { url: string; format: string; type: string }[];
}

interface NytSearchResponse {
  response: {
    docs: NytArticle[];
    meta: { hits: number };
  };
}

function inferIpoStatus(headline: string, abstract: string): IpoNewsItem["status"] {
  const text = `${headline} ${abstract}`.toLowerCase();
  if (text.includes("begins trading") || text.includes("debuts on") || text.includes("shares rose")) {
    return "trading";
  }
  if (text.includes("price range") || text.includes("priced at") || text.includes("sets ipo")) {
    return "priced";
  }
  if (text.includes("filed") || text.includes("s-1") || text.includes("registration")) {
    return "filed";
  }
  if (text.includes("reportedly") || text.includes("considering") || text.includes("plans to go public")) {
    return "rumored";
  }
  return "news";
}

function extractCompanyName(headline: string): string {
  const beforeVerb = headline.split(/\s+(IPO|Files|Prices|Debuts|Sets|Reportedly|Is|Are)\s/i)[0];
  const cleaned = beforeVerb.replace(/^[^A-Za-z0-9]+/, "").trim();
  return cleaned.length > 2 ? cleaned : "Market";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function mapArticle(doc: NytArticle): IpoNewsItem {
  const headline = doc.headline.main;
  const thumb = doc.multimedia?.find((m) => m.type === "image" && m.format === "mediumThreeByTwo");

  return {
    id: doc._id,
    company: extractCompanyName(headline),
    headline,
    summary: doc.abstract,
    status: inferIpoStatus(headline, doc.abstract),
    date: formatDate(doc.pub_date),
    url: doc.web_url,
    sector: doc.section_name ?? doc.news_desk ?? "Business",
    source: "The New York Times",
    imageUrl: thumb ? `https://www.nytimes.com/${thumb.url}` : undefined,
  };
}

export async function getIpoNews(limit = 12): Promise<IpoNewsItem[]> {
  const apiKey = process.env.NYT_API_KEY;
  if (!apiKey) {
    throw new Error("NYT_API_KEY is not configured");
  }

  const params = new URLSearchParams({
    "api-key": apiKey,
    q: 'IPO OR "initial public offering" OR "going public" OR "public offering"',
    fq: 'news_desk:("Business") OR news_desk:("Technology") OR section_name:("Business") OR section_name:("Technology")',
    sort: "newest",
    page: "0",
  });

  const res = await fetch(`${NYT_SEARCH}?${params}`, {
    next: { revalidate: CACHE_SECONDS },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`NYT API error ${res.status}: ${body.slice(0, 200)}`);
  }

  const data = (await res.json()) as NytSearchResponse;
  return data.response.docs.slice(0, limit).map(mapArticle);
}

export async function getBusinessNews(limit = 3): Promise<IpoNewsItem[]> {
  const apiKey = process.env.NYT_API_KEY;
  if (!apiKey) return [];

  const params = new URLSearchParams({
    "api-key": apiKey,
    sort: "newest",
  });

  const res = await fetch(
    `https://api.nytimes.com/svc/topstories/v2/business.json?${params}`,
    { next: { revalidate: CACHE_SECONDS } }
  );

  if (!res.ok) return [];

  const data = (await res.json()) as {
    results: {
      id: string;
      title: string;
      abstract: string;
      published_date: string;
      url: string;
      section: string;
    }[];
  };

  return data.results.slice(0, limit).map((item) => ({
    id: item.id,
    company: extractCompanyName(item.title),
    headline: item.title,
    summary: item.abstract,
    status: "news" as const,
    date: formatDate(item.published_date),
    url: item.url,
    sector: item.section,
    source: "The New York Times",
  }));
}
