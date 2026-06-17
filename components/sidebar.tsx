"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

const SECTORS = [
  { label: "All", state: "selected" as const },
  { label: "B2B", state: "active" as const },
  { label: "AI / ML", state: "muted" as const },
  { label: "Fintech", state: "muted" as const },
  { label: "Healthcare", state: "muted" as const },
];

type NavKey = "startups" | "ipo" | "career" | "targets";

const NAV_ITEMS: {
  key: NavKey;
  href: string;
  label: string;
  icon: string;
  hoverIconClass: string;
}[] = [
  {
    key: "startups",
    href: "/draft/mission-control",
    label: "Hot Startups",
    icon: "ph:fire-duotone",
    hoverIconClass: "group-hover:text-[#FF7A3D]",
  },
  {
    key: "ipo",
    href: "/draft/star-charts",
    label: "IPO News",
    icon: "ph:newspaper-duotone",
    hoverIconClass: "group-hover:text-[#FF7A3D]",
  },
  {
    key: "career",
    href: "/draft/career-planner",
    label: "Career Planner",
    icon: "ph:compass-duotone",
    hoverIconClass: "group-hover:text-[#A8B5A3]",
  },
  {
    key: "targets",
    href: "/draft/watchlist",
    label: "My Targets",
    icon: "ph:target-duotone",
    hoverIconClass: "group-hover:text-yellow-500",
  },
];

export interface SidebarProps {
  activeNav?: NavKey;
  onFilterSelect?: (sector: string) => void;
}

function sectorClass(state: "active" | "selected" | "muted") {
  switch (state) {
    case "selected":
      return "border-[#FF7A3D]/30 bg-[#FF7A3D]/10 text-[#FF7A3D] hover:border-[var(--border-heavy)]";
    case "muted":
      return "border-[var(--border-color)] bg-[var(--card-white)] text-[var(--text-muted)] hover:border-[var(--border-heavy)] hover:text-[var(--text-dark)]";
    case "active":
    default:
      return "border-[var(--border-heavy)] bg-[var(--card-white)] text-[var(--text-dark)] hover:bg-[#FF7A3D] hover:text-white";
  }
}

function navKeyFromPath(pathname: string): NavKey {
  if (pathname.startsWith("/draft/star-charts")) return "ipo";
  if (pathname.startsWith("/draft/career-planner")) return "career";
  if (pathname.startsWith("/draft/watchlist")) return "targets";
  return "startups";
}

export function Sidebar({ activeNav, onFilterSelect }: SidebarProps) {
  const pathname = usePathname();
  const active = activeNav ?? navKeyFromPath(pathname);

  return (
    <aside className="w-64 h-full flex-shrink-0 flex flex-col border-r border-[var(--border-color)] bg-[var(--sidebar-bg)] z-50">
      <div className="p-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#FF7A3D] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/10 rotate-3">
          <Icon icon="ph:rocket-launch-duotone" className="text-white text-2xl" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-[var(--text-dark)] font-serif-warm">
          Launchpad
        </span>
      </div>

      <nav className="flex-1 px-6 space-y-6 mt-6 overflow-y-auto custom-scroll">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === active;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={
                  "flex items-center gap-4 px-4 py-3 text-[15px] rounded-2xl border-2 transition-all group " +
                  (isActive
                    ? "font-bold text-[#FF7A3D] bg-[var(--card-white)] border-[var(--border-heavy)] shadow-sm"
                    : "font-medium text-[var(--text-muted)] border-transparent hover:text-[var(--text-dark)] hover:bg-[var(--card-white)]")
                }
              >
                <Icon
                  icon={item.icon}
                  className={"text-xl " + (isActive ? "" : item.hoverIconClass)}
                />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="pt-8">
          <h3 className="px-4 text-[11px] font-black uppercase tracking-[0.2em] text-[#B0A8A0] mb-6 flex items-center gap-2">
            <Icon icon="ph:funnel-duotone" />
            Filter by sector
          </h3>
          <div className="px-4 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {SECTORS.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => onFilterSelect?.(s.label)}
                    className={
                      "px-3 py-1.5 rounded-xl border-2 text-[11px] font-bold transition-all " +
                      sectorClass(s.state)
                    }
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-8 mt-auto">
        <Link
          href="/draft/career-planner"
          className="block p-5 rounded-[24px] bg-[var(--card-white)] border-2 border-[var(--border-heavy)] shadow-[6px_6px_0px_var(--shadow-hard)] rotate-1 hover:translate-y-[-2px] transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <Icon icon="ph:compass-duotone" className="text-2xl text-[#FF7A3D]" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <p className="text-[13px] font-bold text-[var(--text-dark)]">Plan your path</p>
          <p className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">
            Pick a role, see what to learn.
          </p>
        </Link>
      </div>
    </aside>
  );
}
