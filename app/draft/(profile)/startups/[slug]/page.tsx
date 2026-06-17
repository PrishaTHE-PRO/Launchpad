import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import { getStartupBySlug } from "@/lib/yc-api";
import { discoverJobs, filterEngineeringRoles } from "@/lib/jobs-api";

export const dynamic = "force-dynamic";

export default async function StartupProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const startup = await getStartupBySlug(params.slug);
  if (!startup) notFound();

  const { jobs, provider } = await discoverJobs(startup.slug, startup.website);
  const openRoles = filterEngineeringRoles(jobs).slice(0, 5);

  return (
    <>
      <nav className="flex items-center gap-2 mt-8 mb-4 text-[13px] font-bold text-[#B0A8A0]">
        <Link href="/draft/mission-control" className="hover:text-[#FF7A3D]">
          Hot Startups
        </Link>
        <Icon icon="ph:caret-right-bold" />
        <span className="text-[var(--text-dark)]">{startup.name}</span>
      </nav>

      <section className="mb-12">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="w-32 h-32 lg:w-40 lg:h-40 bg-white border-2 border-[var(--border-heavy)] rounded-[40px] p-6 flex items-center justify-center shadow-[8px_8px_0px_var(--shadow-hard)] flex-shrink-0 overflow-hidden">
            {startup.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={startup.logoUrl} alt={startup.name} className="w-full h-full object-contain" />
            ) : (
              <Icon icon="ph:rocket-duotone" className="text-7xl text-[#FF7A3D]" />
            )}
          </div>

          <div className="flex-1 pt-2">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h1 className="text-5xl font-serif-warm text-[var(--text-dark)] tracking-tight">
                {startup.name}
              </h1>
              <div className="flex gap-2 flex-wrap">
                <span className="badge-warm px-3 py-1 rounded-full text-[12px] font-black uppercase tracking-widest">
                  {startup.batch}
                </span>
                {startup.isHiring && (
                  <span className="bg-emerald-50 text-emerald-700 border-2 border-emerald-200 px-3 py-1 rounded-full text-[12px] font-black uppercase tracking-widest">
                    Hiring
                  </span>
                )}
                {startup.topCompany && (
                  <span className="bg-[var(--sidebar-bg)] text-[var(--text-dark)] border-2 border-[var(--border-heavy)]/10 px-3 py-1 rounded-full text-[12px] font-black uppercase tracking-widest">
                    YC Top
                  </span>
                )}
              </div>
            </div>
            <p className="text-2xl font-serif-warm italic text-[var(--text-muted)] max-w-3xl mb-8">
              &ldquo;{startup.oneLiner}&rdquo;
            </p>

            <div className="flex flex-wrap gap-12 border-y-2 border-[var(--border-heavy)]/5 py-6">
              <div>
                <p className="text-[11px] font-black text-[#B0A8A0] uppercase tracking-widest mb-1">Industry</p>
                <p className="text-[18px] font-bold text-[#FF7A3D]">{startup.industry}</p>
              </div>
              <div>
                <p className="text-[11px] font-black text-[#B0A8A0] uppercase tracking-widest mb-1">Team size</p>
                <p className="text-[18px] font-bold text-[var(--text-dark)]">
                  {startup.teamSize ?? "—"}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-black text-[#B0A8A0] uppercase tracking-widest mb-1">Location</p>
                <p className="text-[18px] font-bold text-[var(--text-dark)]">{startup.location}</p>
              </div>
              <div>
                <p className="text-[11px] font-black text-[#B0A8A0] uppercase tracking-widest mb-1">Status</p>
                <p className="text-[18px] font-bold text-[var(--text-dark)]">{startup.status}</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-72 flex flex-col gap-3 pt-2">
            <Link
              href="/draft/career-planner"
              className="w-full py-4 bg-[#FF7A3D] text-white border-2 border-[var(--border-heavy)] rounded-2xl font-bold hover:shadow-[6px_6px_0px_var(--shadow-hard)] transition-all flex items-center justify-center gap-2 text-center"
            >
              <Icon icon="ph:compass-duotone" className="text-xl" />
              Plan Career Here
            </Link>
            {startup.website && (
              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[var(--card-white)] text-[var(--text-dark)] border-2 border-[var(--border-heavy)] rounded-2xl font-bold hover:bg-[var(--sidebar-bg)] transition-all flex items-center justify-center gap-2"
              >
                <Icon icon="ph:globe-duotone" className="text-xl" />
                Website
              </a>
            )}
            <a
              href={startup.ycUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[var(--card-white)] text-[var(--text-dark)] border-2 border-[var(--border-heavy)] rounded-2xl font-bold hover:bg-[var(--sidebar-bg)] transition-all flex items-center justify-center gap-2"
            >
              <Icon icon="ph:rocket-duotone" className="text-xl text-[#FF7A3D]" />
              YC Profile
            </a>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        <div className="xl:col-span-2 space-y-8">
          <div>
            <h2 className="text-3xl font-serif-warm text-[var(--text-dark)] mb-4">About</h2>
            <p className="text-[15px] text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
              {startup.description}
            </p>
          </div>

          {startup.tags.length > 0 && (
            <div>
              <h2 className="text-2xl font-serif-warm text-[var(--text-dark)] mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {startup.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-xl border-2 border-[var(--border-heavy)] bg-[var(--card-white)] text-[13px] font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-serif-warm text-[var(--text-dark)] mb-4">
              Open roles
              {provider && (
                <span className="text-[13px] font-bold text-[var(--text-muted)] ml-3 normal-case">
                  via {provider}
                </span>
              )}
            </h2>
            {openRoles.length > 0 ? (
              <div className="space-y-3">
                {openRoles.map((job) => (
                  <a
                    key={job.id}
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-human p-5 flex justify-between items-center hover:border-[#FF7A3D] group"
                  >
                    <div>
                      <p className="font-bold text-[var(--text-dark)]">{job.title}</p>
                      <p className="text-[12px] text-[var(--text-muted)]">
                        {job.department} · {job.location}
                      </p>
                    </div>
                    <Icon
                      icon="ph:arrow-square-out-duotone"
                      className="text-[#FF7A3D] opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-[14px] text-[var(--text-muted)] italic">
                No public job board detected. Check{" "}
                <a
                  href={`https://www.workatastartup.com/companies/${startup.slug}`}
                  className="text-[#FF7A3D] font-bold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Work at a Startup
                </a>{" "}
                for YC job listings.
              </p>
            )}
          </div>
        </div>

        <div className="card-human p-8 border-2 border-[var(--border-heavy)] shadow-[8px_8px_0px_var(--shadow-hard)]">
          <h3 className="text-xl font-serif-warm text-[var(--text-dark)] mb-4">Quick facts</h3>
          <dl className="space-y-4 text-[14px]">
            <div className="flex justify-between">
              <dt className="text-[var(--text-muted)]">Sub-industry</dt>
              <dd className="font-bold text-right max-w-[60%]">{startup.subindustry}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--text-muted)]">Stage</dt>
              <dd className="font-bold">{startup.stage}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--text-muted)]">Data source</dt>
              <dd className="font-bold text-[#FF7A3D]">YC API</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
