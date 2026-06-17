"use client";

import { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
  JobAnalysisPanel,
  CareerRecommendations,
  ResumeUpload,
} from "@/components/career-planner";
import type { JobAnalysis, JobListing, LearningRecommendation, Startup } from "@/lib/types";

export default function CareerPlannerPage() {
  const [companies, setCompanies] = useState<Startup[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [recommendations, setRecommendations] = useState<LearningRecommendation[]>([]);
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [analyzeLoading, setAnalyzeLoading] = useState(false);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/startups?source=hiring&limit=30")
      .then((r) => r.json())
      .then((data) => {
        const list = data.startups as Startup[];
        setCompanies(list);
        if (list.length > 0) setSelectedSlug(list[0].slug);
      });
  }, []);

  const loadJobs = useCallback(async (slug: string, website?: string) => {
    setJobsLoading(true);
    setJobsError(null);
    setJobs([]);
    setSelectedJob(null);
    setAnalysis(null);
    setRecommendations([]);

    const params = new URLSearchParams({ slug });
    if (website) params.set("website", website);

    try {
      const res = await fetch(`/api/jobs?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load jobs");

      setJobs(data.jobs ?? []);
      setFallbackUrl(data.fallbackUrl ?? null);
      if (data.jobs?.length > 0) setSelectedJob(data.jobs[0]);
      else setJobsError("No public job board found for this company.");
    } catch (e) {
      setJobsError(e instanceof Error ? e.message : "Failed to load jobs");
    } finally {
      setJobsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!selectedSlug) return;
    const company = companies.find((c) => c.slug === selectedSlug);
    loadJobs(selectedSlug, company?.website);
  }, [selectedSlug, companies, loadJobs]);

  const analyzeJob = useCallback(
    async (job: JobListing, resume?: string | null) => {
      setAnalyzeLoading(true);
      try {
        const res = await fetch("/api/jobs/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: selectedSlug,
            jobId: job.id,
            provider: job.provider,
            boardToken: job.boardToken,
            resumeText: resume ?? undefined,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Analysis failed");
        setAnalysis(data.analysis);
        setRecommendations(data.recommendations ?? []);
      } catch {
        setAnalysis(null);
        setRecommendations([]);
      } finally {
        setAnalyzeLoading(false);
      }
    },
    [selectedSlug]
  );

  useEffect(() => {
    if (selectedJob) analyzeJob(selectedJob, resumeText);
  }, [selectedJob, resumeText, analyzeJob]);

  const company = companies.find((c) => c.slug === selectedSlug);

  return (
    <>
      <section className="mt-8 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full badge-warm text-[11px] font-black uppercase tracking-wider">
            Live job boards
          </span>
          <span className="text-[12px] font-bold text-[var(--text-muted)]">
            Greenhouse & Lever APIs
          </span>
        </div>
        <h1 className="text-[64px] font-serif-warm tracking-tight leading-[1.05] text-[var(--text-dark)] mb-6">
          Career <span className="italic text-[#FF7A3D]">Planner.</span>
        </h1>
        <p className="text-[var(--text-muted)] text-[18px] font-medium max-w-2xl">
          Pick a YC company and role. We fetch the real job description from their careers page,
          extract the tech stack and requirements, then recommend what to learn based on your resume.
        </p>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
        <div className="card-human p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[#FF7A3D] text-white flex items-center justify-center text-[13px] font-black">1</span>
            <h2 className="text-lg font-serif-warm text-[var(--text-dark)]">Pick a company</h2>
          </div>
          <div className="space-y-2 max-h-[320px] overflow-y-auto custom-scroll pr-1">
            {companies.map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => setSelectedSlug(s.slug)}
                className={
                  "w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all " +
                  (selectedSlug === s.slug
                    ? "border-[#FF7A3D] bg-[#FF7A3D]/5"
                    : "border-[var(--border-color)] hover:border-[var(--border-heavy)]")
                }
              >
                {s.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.logoUrl} alt="" className="w-8 h-8 rounded-lg object-contain" />
                ) : (
                  <Icon icon="ph:buildings-duotone" className="text-2xl text-[#FF7A3D]" />
                )}
                <div>
                  <p className="text-[14px] font-bold text-[var(--text-dark)]">{s.name}</p>
                  <p className="text-[11px] text-[var(--text-muted)]">{s.industry}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="card-human p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[#FF7A3D] text-white flex items-center justify-center text-[13px] font-black">2</span>
            <h2 className="text-lg font-serif-warm text-[var(--text-dark)]">Pick a role</h2>
          </div>
          {jobsLoading ? (
            <p className="text-[14px] text-[var(--text-muted)] italic">Loading open roles…</p>
          ) : jobsError ? (
            <div>
              <p className="text-[14px] text-[var(--text-muted)] mb-4">{jobsError}</p>
              {fallbackUrl && (
                <a
                  href={fallbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-bold text-[#FF7A3D] hover:underline flex items-center gap-1"
                >
                  Browse on Work at a Startup
                  <Icon icon="ph:arrow-square-out-duotone" />
                </a>
              )}
            </div>
          ) : (
            <div className="space-y-2 max-h-[320px] overflow-y-auto custom-scroll pr-1">
              {jobs.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedJob(role)}
                  className={
                    "w-full p-4 rounded-2xl border-2 text-left transition-all " +
                    (selectedJob?.id === role.id
                      ? "border-[#FF7A3D] bg-[#FF7A3D]/5"
                      : "border-[var(--border-color)] hover:border-[var(--border-heavy)]")
                  }
                >
                  <p className="text-[14px] font-bold text-[var(--text-dark)]">{role.title}</p>
                  <div className="flex gap-3 mt-1 text-[11px] font-bold text-[var(--text-muted)]">
                    <span>{role.department}</span>
                    <span>·</span>
                    <span>{role.location}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[#FF7A3D] text-white flex items-center justify-center text-[13px] font-black">3</span>
            <h2 className="text-lg font-serif-warm text-[var(--text-dark)]">Upload resume</h2>
          </div>
          <ResumeUpload onUpload={setResumeText} />
        </div>
      </div>

      {company && selectedJob && (
        <div className="mb-8 flex items-center gap-4">
          {company.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={company.logoUrl} alt="" className="w-12 h-12 rounded-xl object-contain" />
          )}
          <div>
            <h2 className="text-2xl font-serif-warm text-[var(--text-dark)]">
              {company.name} · {selectedJob.title}
            </h2>
            <p className="text-[13px] text-[var(--text-muted)]">
              Parsed from {selectedJob.provider === "greenhouse" ? "Greenhouse" : "Lever"} job board
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <div>
          {analysis ? (
            <JobAnalysisPanel analysis={analysis} />
          ) : analyzeLoading ? (
            <div className="card-human p-12 text-center">
              <Icon icon="ph:spinner-duotone" className="text-[64px] text-[#FF7A3D] mb-4 mx-auto animate-spin" />
              <p className="text-[14px] text-[var(--text-muted)]">Fetching and parsing job description…</p>
            </div>
          ) : (
            <div className="card-human p-12 text-center">
              <Icon icon="ph:briefcase-duotone" className="text-[64px] text-[#D4A574] mb-4 mx-auto" />
              <p className="text-[14px] text-[var(--text-muted)]">
                Select a company with an open role to see the scraped job breakdown.
              </p>
            </div>
          )}
        </div>
        <div>
          <CareerRecommendations
            recommendations={recommendations}
            hasResume={Boolean(resumeText)}
            loading={analyzeLoading && Boolean(resumeText)}
          />
        </div>
      </div>
    </>
  );
}
