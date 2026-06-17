import type { JobAnalysis, LearningRecommendation } from "@/lib/types";

const TECH_CATALOG: { name: string; category: JobAnalysis["techStack"][0]["category"]; patterns: RegExp[] }[] = [
  { name: "Python", category: "language", patterns: [/\bpython\b/i] },
  { name: "TypeScript", category: "language", patterns: [/\btypescript\b/i, /\bts\b/i] },
  { name: "JavaScript", category: "language", patterns: [/\bjavascript\b/i, /\bjs\b/i] },
  { name: "Java", category: "language", patterns: [/\bjava\b/i] },
  { name: "Go", category: "language", patterns: [/\bgolang\b/i, /\bgo\b/i] },
  { name: "Rust", category: "language", patterns: [/\brust\b/i] },
  { name: "C++", category: "language", patterns: [/\bc\+\+\b/i] },
  { name: "Ruby", category: "language", patterns: [/\bruby\b/i] },
  { name: "Swift", category: "language", patterns: [/\bswift\b/i] },
  { name: "Kotlin", category: "language", patterns: [/\bkotlin\b/i] },
  { name: "React", category: "framework", patterns: [/\breact\b/i, /\breact\.js\b/i] },
  { name: "Next.js", category: "framework", patterns: [/\bnext\.?js\b/i] },
  { name: "Node.js", category: "framework", patterns: [/\bnode\.?js\b/i] },
  { name: "Django", category: "framework", patterns: [/\bdjango\b/i] },
  { name: "FastAPI", category: "framework", patterns: [/\bfastapi\b/i] },
  { name: "PyTorch", category: "framework", patterns: [/\bpytorch\b/i] },
  { name: "TensorFlow", category: "framework", patterns: [/\btensorflow\b/i] },
  { name: "PostgreSQL", category: "database", patterns: [/\bpostgres(?:ql)?\b/i] },
  { name: "MongoDB", category: "database", patterns: [/\bmongodb\b/i] },
  { name: "Redis", category: "database", patterns: [/\bredis\b/i] },
  { name: "MySQL", category: "database", patterns: [/\bmysql\b/i] },
  { name: "AWS", category: "infra", patterns: [/\baws\b/i, /\bamazon web services\b/i] },
  { name: "GCP", category: "infra", patterns: [/\bgcp\b/i, /\bgoogle cloud\b/i] },
  { name: "Azure", category: "infra", patterns: [/\bazure\b/i] },
  { name: "Docker", category: "infra", patterns: [/\bdocker\b/i] },
  { name: "Kubernetes", category: "infra", patterns: [/\bkubernetes\b/i, /\bk8s\b/i] },
  { name: "Terraform", category: "tool", patterns: [/\bterraform\b/i] },
  { name: "GraphQL", category: "tool", patterns: [/\bgraphql\b/i] },
  { name: "Kafka", category: "tool", patterns: [/\bkafka\b/i] },
  { name: "Spark", category: "tool", patterns: [/\bspark\b/i] },
  { name: "SQL", category: "tool", patterns: [/\bsql\b/i] },
  { name: "Git", category: "tool", patterns: [/\bgit\b/i] },
  { name: "LLM", category: "tool", patterns: [/\bllm\b/i, /\blarge language model/i] },
  { name: "OpenAI", category: "tool", patterns: [/\bopenai\b/i, /\bgpt\b/i] },
];

const SOFT_SKILL_PATTERNS = [
  /communication skills/i,
  /cross[- ]functional/i,
  /collaborat/i,
  /leadership/i,
  /problem[- ]solv/i,
  /ownership/i,
  /mentor/i,
  /written and verbal/i,
  /team player/i,
  /self[- ]starter/i,
  /attention to detail/i,
  /stakeholder/i,
  /priorit/i,
  /adapt/i,
];

function decodeHtml(html: string): string {
  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripHtml(html: string): string {
  return decodeHtml(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractListItems(html: string, sectionPattern: RegExp): string[] {
  const decoded = decodeHtml(html);
  const sectionMatch = decoded.match(sectionPattern);
  if (!sectionMatch) return [];

  const afterSection = decoded.slice(decoded.indexOf(sectionMatch[0]));
  const items = [...afterSection.matchAll(/<li[^>]*>(.*?)<\/li>/gis)].map((m) =>
    stripHtml(m[1]).replace(/^[-•*]\s*/, "").trim()
  );

  return items.filter((item) => item.length > 10 && item.length < 300).slice(0, 8);
}

function extractBulletLines(text: string): string[] {
  return text
    .split(/\n/)
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter((line) => line.length > 15 && line.length < 300)
    .slice(0, 8);
}

export function analyzeJobDescription(
  contentHtml: string,
  meta: {
    roleId: string;
    companySlug: string;
    companyName: string;
    roleTitle: string;
    source: string;
    sourceUrl: string;
  }
): JobAnalysis {
  const plain = stripHtml(contentHtml);
  const lower = plain.toLowerCase();

  const techStack = TECH_CATALOG.filter((tech) =>
    tech.patterns.some((p) => p.test(lower))
  ).map(({ name, category }) => ({ name, category }));

  const softSkills = SOFT_SKILL_PATTERNS.filter((p) => p.test(plain)).map((p) => {
    const match = plain.match(p);
    return match ? match[0] : "";
  }).filter(Boolean);

  const reqItems = extractListItems(
    contentHtml,
    /requirements|qualifications|what you.{0,20}bring|you have/i
  );
  const requirements =
    reqItems.length > 0 ? reqItems : extractBulletLines(plain).slice(0, 6);

  const niceItems = extractListItems(contentHtml, /nice to have|bonus|preferred|plus if/i);
  const niceToHave = niceItems.length > 0 ? niceItems : [];

  const firstSentence = plain.split(/[.!?]/).find((s) => s.length > 40)?.trim();
  const summary =
    firstSentence ??
    `This ${meta.roleTitle} role at ${meta.companyName} requires skills in ${techStack.slice(0, 4).map((t) => t.name).join(", ") || "software engineering"}.`;

  return {
    roleId: meta.roleId,
    companySlug: meta.companySlug,
    companyName: meta.companyName,
    roleTitle: meta.roleTitle,
    scrapedAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    source: meta.source,
    sourceUrl: meta.sourceUrl,
    techStack,
    softSkills: softSkills.length > 0 ? softSkills : ["Communication", "Collaboration", "Problem solving"],
    requirements: requirements.length > 0 ? requirements : extractBulletLines(plain).slice(0, 5),
    niceToHave,
    summary: summary.slice(0, 400),
  };
}

const COURSE_SUGGESTIONS: Record<string, { title: string; provider: string }> = {
  Python: { title: "Python for Everybody Specialization", provider: "Coursera" },
  TypeScript: { title: "Understanding TypeScript", provider: "Udemy" },
  React: { title: "React – The Complete Guide", provider: "Udemy" },
  PyTorch: { title: "Deep Learning Specialization", provider: "DeepLearning.AI" },
  AWS: { title: "AWS Cloud Practitioner Essentials", provider: "AWS Skill Builder" },
  Kubernetes: { title: "Kubernetes for Developers", provider: "Linux Foundation" },
  PostgreSQL: { title: "PostgreSQL for Everybody", provider: "Coursera" },
  "Machine Learning": { title: "Machine Learning Crash Course", provider: "Google" },
};

export function generateRecommendations(
  analysis: JobAnalysis,
  resumeText?: string
): LearningRecommendation[] {
  const resumeLower = (resumeText ?? "").toLowerCase();
  const recommendations: LearningRecommendation[] = [];
  let id = 1;

  for (const tech of analysis.techStack) {
    const hasSkill = resumeLower.includes(tech.name.toLowerCase());
    if (!hasSkill) {
      const course = COURSE_SUGGESTIONS[tech.name];
      recommendations.push({
        id: String(id++),
        type: course ? "course" : "skill",
        title: course?.title ?? `Learn ${tech.name}`,
        provider: course?.provider,
        reason: `This role lists ${tech.name} but it wasn't found in your resume.`,
        priority: tech.category === "language" || tech.category === "framework" ? "high" : "medium",
        gap: tech.name,
      });
    }
  }

  for (const req of analysis.requirements.slice(0, 3)) {
    const keywords = req.toLowerCase().split(/\W+/).filter((w) => w.length > 4);
    const matched = keywords.filter((k) => resumeLower.includes(k)).length;
    if (matched < keywords.length * 0.3) {
      recommendations.push({
        id: String(id++),
        type: "project",
        title: `Portfolio project demonstrating: ${req.slice(0, 60)}…`,
        reason: `Job requirement not clearly reflected in your resume.`,
        priority: "medium",
        gap: req.slice(0, 80),
      });
    }
  }

  if (recommendations.length === 0 && resumeText) {
    recommendations.push({
      id: "1",
      type: "skill",
      title: "You're well aligned — polish your portfolio",
      reason: "Your resume covers most listed requirements. Focus on a targeted project for this company.",
      priority: "low",
      gap: "Portfolio depth",
    });
  }

  return recommendations.slice(0, 6);
}
