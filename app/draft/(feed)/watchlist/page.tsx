import Link from "next/link";
import { Icon } from "@iconify/react";
import { getHiringStartups } from "@/lib/yc-api";

export const dynamic = "force-dynamic";

export default async function WatchlistPage() {
  let hiring: Awaited<ReturnType<typeof getHiringStartups>> = [];
  let error: string | null = null;

  try {
    hiring = await getHiringStartups(6);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load companies";
  }

  return (
    <>
      <section className="mt-8 mb-12">
        <h1 className="text-[64px] font-serif-warm tracking-tight leading-[1.05] text-[var(--text-dark)] mb-6">
          My <span className="italic text-[#FF7A3D]">Targets.</span>
        </h1>
        <p className="text-[var(--text-muted)] text-[18px] font-medium max-w-lg mb-4">
          Companies you want to work at. Below are YC companies actively hiring — save targets and
          plan your path in Career Planner.
        </p>
      </section>

      {error && (
        <div className="card-human p-8 mb-8 border-red-200">
          <p className="font-bold text-red-600 mb-2">Could not reach YC API</p>
          <p className="text-[14px] text-[var(--text-muted)]">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {hiring.map((s) => (
          <div
            key={s.slug}
            className="card-human p-6 flex items-center justify-between gap-6 flex-wrap"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[var(--card-white)] border-2 border-[var(--border-heavy)] p-2 flex items-center justify-center overflow-hidden">
                {s.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.logoUrl} alt={s.name} className="w-full h-full object-contain" />
                ) : (
                  <Icon icon="ph:buildings-duotone" className="text-3xl text-[#FF7A3D]" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-serif-warm text-[var(--text-dark)]">{s.name}</h3>
                <p className="text-[13px] text-[var(--text-muted)]">{s.oneLiner}</p>
                <p className="text-[12px] font-bold text-[#FF7A3D] mt-1">
                  {s.batch} · {s.industry}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/draft/career-planner"
                className="px-5 py-2.5 bg-[#FF7A3D] text-white border-2 border-[var(--border-heavy)] rounded-2xl font-bold text-[13px] hover:shadow-[4px_4px_0px_var(--shadow-hard)] transition-all"
              >
                Plan career
              </Link>
              <Link
                href={`/draft/startups/${s.slug}`}
                className="px-5 py-2.5 bg-[var(--card-white)] text-[var(--text-dark)] border-2 border-[var(--border-heavy)] rounded-2xl font-bold text-[13px] hover:bg-[var(--sidebar-bg)] transition-all"
              >
                View profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
