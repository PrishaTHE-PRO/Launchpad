import { Icon } from "@iconify/react";
import { StartupCard } from "@/components/startup-card";
import { getRecentStartups } from "@/lib/yc-api";

export const dynamic = "force-dynamic";

export default async function HotStartupsPage() {
  let startups: Awaited<ReturnType<typeof getRecentStartups>> = [];
  let error: string | null = null;

  try {
    startups = await getRecentStartups({ limit: 24, hiringOnly: false });
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load startups";
  }

  const hiringCount = startups.filter((s) => s.isHiring).length;

  return (
    <>
      <section className="mt-8 mb-16 relative">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full badge-warm text-[11px] font-black uppercase tracking-wider">
              Live from YC
            </span>
            <span className="text-[12px] font-bold text-[var(--text-muted)]">
              yc-oss.github.io/api · updated daily
            </span>
          </div>
          <h1 className="text-[64px] font-serif-warm tracking-tight leading-[1.05] text-[var(--text-dark)] mb-6">
            Explore the Hottest{" "}
            <span className="italic text-[#FF7A3D] block">Tech Startups.</span>
          </h1>
          <p className="text-[var(--text-muted)] text-[18px] font-medium max-w-lg mb-4">
            {startups.length} recent Y Combinator companies · {hiringCount} actively hiring.
            Real data on what they do, their sector, and team size.
          </p>
          <div className="sketch-line opacity-30" />
        </div>
      </section>

      {error && (
        <div className="card-human p-8 mb-8 border-red-200">
          <p className="font-bold text-red-600 mb-2">Could not reach YC API</p>
          <p className="text-[14px] text-[var(--text-muted)]">{error}</p>
        </div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {startups.map((startup, i) => (
          <StartupCard key={startup.slug} startup={startup} index={i} />
        ))}
      </section>
    </>
  );
}
