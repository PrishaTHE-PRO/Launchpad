import Link from "next/link";
import { Icon } from "@iconify/react";
import type { Startup } from "@/lib/types";

const accentCycle = ["orange", "green", "gold"] as const;

export function StartupCard({ startup, index = 0 }: { startup: Startup; index?: number }) {
  const accent = accentCycle[index % accentCycle.length];

  const accentStyles = {
    orange: { watercolor: "watercolor-orange", statusColor: "text-[#FF7A3D]" },
    green: { watercolor: "watercolor-green", statusColor: "text-[#A8B5A3]" },
    gold: { watercolor: "watercolor-orange", statusColor: "text-[#D4A574]" },
  }[accent];

  const statusText = startup.isHiring
    ? "Actively hiring"
    : startup.topCompany
      ? "YC Top Company"
      : startup.status;

  return (
    <Link
      href={`/draft/startups/${startup.slug}`}
      className="card-human p-8 flex flex-col h-full cursor-pointer relative overflow-hidden group"
    >
      <div
        className={`absolute inset-0 ${accentStyles.watercolor} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
      />

      <div className="flex justify-between items-start mb-6 relative">
        <div className="flex gap-5 items-center">
          <div className="w-14 h-14 rounded-2xl bg-[var(--card-white)] border-2 border-[var(--border-heavy)] p-2 flex items-center justify-center shadow-[4px_4px_0px_var(--shadow-hard)] overflow-hidden">
            {startup.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={startup.logoUrl} alt={startup.name} className="w-full h-full object-contain" />
            ) : (
              <Icon icon="ph:rocket-duotone" className="text-3xl text-[#FF7A3D]" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-serif-warm text-[var(--text-dark)] leading-tight">
                {startup.name}
              </h3>
              {(startup.isHiring || startup.topCompany) && (
                <Icon
                  icon={startup.isHiring ? "ph:fire-fill" : "ph:star-fill"}
                  className="text-[#FF7A3D] text-lg"
                />
              )}
            </div>
            <p className="text-[11px] font-bold text-[#B0A8A0] uppercase tracking-wider mt-1">
              {startup.industry}
            </p>
          </div>
        </div>
      </div>

      <p className="text-[var(--text-muted)] text-[15px] leading-relaxed mb-6 font-medium relative line-clamp-3">
        {startup.oneLiner}
      </p>

      {startup.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6 relative">
          {startup.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-xl border-2 border-[var(--border-heavy)] bg-[var(--card-white)] text-[11px] font-bold text-[var(--text-dark)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mb-6 relative text-[11px] font-bold text-[var(--text-muted)] flex-wrap">
        {startup.teamSize && (
          <span className="flex items-center gap-1.5">
            <Icon icon="ph:users-duotone" className="text-sm" />
            {startup.teamSize} people
          </span>
        )}
        <span className="px-2 py-0.5 rounded-lg badge-warm text-[10px] font-black uppercase">
          {startup.batch}
        </span>
        <span className="text-[#B0A8A0] truncate max-w-[120px]">{startup.location.split(",")[0]}</span>
      </div>

      <div className="flex items-center justify-between border-t-2 border-[var(--sidebar-bg)] pt-6 mt-auto relative">
        <div className="flex items-center gap-3">
          <Icon
            icon={startup.isHiring ? "ph:briefcase-duotone" : "ph:check-circle-duotone"}
            className={accentStyles.statusColor}
          />
          <span className="text-[12px] font-bold text-[var(--text-dark)]">{statusText}</span>
        </div>
        <span className="text-[11px] font-bold text-[#B0A8A0] uppercase">{startup.stage}</span>
      </div>
    </Link>
  );
}
