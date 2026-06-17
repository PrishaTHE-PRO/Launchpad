"use client";

import type { JobAnalysis, LearningRecommendation } from "@/lib/types";
import { Icon } from "@iconify/react";

const CATEGORY_COLORS = {
  language: "bg-blue-50 text-blue-700 border-blue-200",
  framework: "bg-violet-50 text-violet-700 border-violet-200",
  tool: "bg-emerald-50 text-emerald-700 border-emerald-200",
  infra: "bg-amber-50 text-amber-700 border-amber-200",
  database: "bg-cyan-50 text-cyan-700 border-cyan-200",
};

export function JobAnalysisPanel({ analysis }: { analysis: JobAnalysis }) {
  return (
    <div className="space-y-8">
      <div className="card-human p-8">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-xl font-serif-warm text-[var(--text-dark)]">Role summary</h3>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-[#B0A8A0] uppercase">
              Scraped {analysis.scrapedAt} · {analysis.source}
            </span>
            <a
              href={analysis.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-[#FF7A3D] hover:underline flex items-center gap-1"
            >
              View original
              <Icon icon="ph:arrow-square-out-duotone" />
            </a>
          </div>
        </div>
        <p className="text-[15px] text-[var(--text-muted)] leading-relaxed">{analysis.summary}</p>
      </div>

      {analysis.techStack.length > 0 && (
        <div className="card-human p-8">
          <h3 className="text-xl font-serif-warm text-[var(--text-dark)] mb-6 flex items-center gap-2">
            <Icon icon="ph:stack-duotone" className="text-[#FF7A3D]" />
            Tech stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.techStack.map((tech) => (
              <span
                key={tech.name}
                className={`px-3 py-2 rounded-xl border-2 text-[12px] font-bold ${CATEGORY_COLORS[tech.category]}`}
              >
                {tech.name}
                <span className="ml-1.5 opacity-60 text-[10px] uppercase">{tech.category}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analysis.requirements.length > 0 && (
          <div className="card-human p-8">
            <h3 className="text-lg font-serif-warm text-[var(--text-dark)] mb-4 flex items-center gap-2">
              <Icon icon="ph:check-circle-duotone" className="text-emerald-500" />
              Requirements
            </h3>
            <ul className="space-y-3">
              {analysis.requirements.map((req) => (
                <li key={req} className="flex gap-3 text-[14px] text-[var(--text-muted)]">
                  <Icon icon="ph:dot-outline-fill" className="text-[#FF7A3D] flex-shrink-0 mt-0.5" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {analysis.niceToHave.length > 0 && (
          <div className="card-human p-8">
            <h3 className="text-lg font-serif-warm text-[var(--text-dark)] mb-4 flex items-center gap-2">
              <Icon icon="ph:star-duotone" className="text-yellow-500" />
              Nice to have
            </h3>
            <ul className="space-y-3">
              {analysis.niceToHave.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] text-[var(--text-muted)]">
                  <Icon icon="ph:dot-outline-fill" className="text-[#D4A574] flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="card-human p-8 watercolor-green">
        <h3 className="text-lg font-serif-warm text-[var(--text-dark)] mb-4 flex items-center gap-2">
          <Icon icon="ph:handshake-duotone" className="text-[#A8B5A3]" />
          Soft skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {analysis.softSkills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-xl border-2 border-[var(--border-heavy)] bg-[var(--card-white)] text-[13px] font-medium text-[var(--text-dark)]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const PRIORITY_STYLES = {
  high: "border-red-200 bg-red-50 text-red-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  low: "border-[var(--border-color)] bg-[var(--sidebar-bg)] text-[var(--text-muted)]",
};

const TYPE_ICONS = {
  course: "ph:graduation-cap-duotone",
  project: "ph:hammer-duotone",
  skill: "ph:lightning-duotone",
};

export function CareerRecommendations({
  recommendations,
  hasResume,
  loading,
}: {
  recommendations: LearningRecommendation[];
  hasResume: boolean;
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="card-human p-12 text-center">
        <Icon icon="ph:spinner-duotone" className="text-[48px] text-[#FF7A3D] mb-4 mx-auto animate-spin" />
        <p className="text-[14px] text-[var(--text-muted)]">Analyzing job description…</p>
      </div>
    );
  }

  if (!hasResume) {
    return (
      <div className="card-human p-12 text-center">
        <Icon icon="ph:file-arrow-up-duotone" className="text-[64px] text-[#D4A574] mb-4 mx-auto" />
        <h3 className="text-xl font-serif-warm text-[var(--text-dark)] mb-2">
          Upload your resume to unlock recommendations
        </h3>
        <p className="text-[14px] text-[var(--text-muted)] max-w-md mx-auto">
          We&apos;ll compare your skills against the scraped job description and suggest courses,
          projects, and skills to close the gap.
        </p>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="card-human p-12 text-center">
        <Icon icon="ph:check-circle-duotone" className="text-[64px] text-emerald-500 mb-4 mx-auto" />
        <h3 className="text-xl font-serif-warm text-[var(--text-dark)] mb-2">Strong alignment</h3>
        <p className="text-[14px] text-[var(--text-muted)]">
          Your resume covers most of the listed requirements. Focus on a targeted portfolio project.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-serif-warm text-[var(--text-dark)] mb-6 flex items-center gap-2">
        <Icon icon="ph:path-duotone" className="text-[#FF7A3D]" />
        Your learning path
      </h3>
      {recommendations.map((rec) => (
        <div key={rec.id} className="card-human p-6 flex gap-5 items-start">
          <div className="w-12 h-12 rounded-2xl bg-[var(--sidebar-bg)] border-2 border-[var(--border-heavy)] flex items-center justify-center flex-shrink-0">
            <Icon icon={TYPE_ICONS[rec.type]} className="text-2xl text-[#FF7A3D]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h4 className="text-[15px] font-bold text-[var(--text-dark)]">{rec.title}</h4>
              <span
                className={`px-2 py-0.5 rounded-lg border text-[10px] font-black uppercase ${PRIORITY_STYLES[rec.priority]}`}
              >
                {rec.priority}
              </span>
            </div>
            {rec.provider && (
              <p className="text-[12px] font-bold text-[#B0A8A0] mb-2">{rec.provider}</p>
            )}
            <p className="text-[14px] text-[var(--text-muted)]">{rec.reason}</p>
            <p className="text-[11px] font-bold text-[#FF7A3D] mt-2 uppercase tracking-wider">
              Closes gap: {rec.gap}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ResumeUpload({
  onUpload,
}: {
  onUpload: (text: string | null) => void;
}) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      onUpload(text || null);
    };
    reader.readAsText(file);
  }

  return (
    <div className="card-human p-8 border-dashed border-2 border-[var(--border-heavy)]">
      <div className="flex flex-col items-center text-center">
        <Icon icon="ph:file-text-duotone" className="text-5xl text-[#FF7A3D] mb-4" />
        <p className="text-[15px] font-bold text-[var(--text-dark)] mb-1">Upload resume (.txt)</p>
        <p className="text-[13px] text-[var(--text-muted)] mb-4">
          Paste your resume into a .txt file for now. PDF parsing coming next.
        </p>
        <label className="cursor-pointer px-6 py-3 bg-[#FF7A3D] text-white border-2 border-[var(--border-heavy)] rounded-2xl font-bold text-[13px] hover:shadow-[4px_4px_0px_var(--shadow-hard)] transition-all">
          Choose file
          <input type="file" accept=".txt,.text" className="hidden" onChange={handleChange} />
        </label>
      </div>
    </div>
  );
}
