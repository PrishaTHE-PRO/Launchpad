"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

type NavKey = "home" | "charts" | "watchlist" | "orbit";

const NAV_ITEMS: {
  key: NavKey;
  href: string;
  label: string;
  icon: string;
  hoverIconClass: string;
}[] = [
  {
    key: "home",
    href: "/draft/mission-control",
    label: "Mission Control",
    icon: "ph:rocket-duotone",
    hoverIconClass: "group-hover:text-[#FF7A3D]",
  },
  {
    key: "charts",
    href: "/draft/star-charts",
    label: "Star Charts",
    icon: "ph:telescope-duotone",
    hoverIconClass: "group-hover:text-[#FF7A3D]",
  },
  {
    key: "watchlist",
    href: "/draft/watchlist",
    label: "Watchlist",
    icon: "ph:shooting-star-duotone",
    hoverIconClass: "group-hover:text-yellow-500",
  },
  {
    key: "orbit",
    href: "/draft/orbit",
    label: "Orbit",
    icon: "ph:planet-duotone",
    hoverIconClass: "group-hover:text-[#A8B5A3]",
  },
];

type Sector = { label: string; state: "active" | "selected" | "muted" };

const DEFAULT_SECTORS: Sector[] = [
  { label: "Fintech", state: "active" },
  { label: "AI / ML", state: "selected" },
  { label: "SaaS", state: "muted" },
];

export interface SidebarProps {
  activeNav?: NavKey;
  sectors?: Sector[];
  onFilterSelect?: (sector: string) => void;
}

function sectorClass(state: Sector["state"]) {
  switch (state) {
    case "selected":
      return "border-[#3D352E]/30 bg-[#FF7A3D]/10 text-[#FF7A3D] hover:border-[#3D352E]";
    case "muted":
      return "border-[#EAE6E1] bg-white text-[#8E847B] hover:border-[#3D352E] hover:text-[#3D352E]";
    case "active":
    default:
      return "border-[#3D352E] bg-white text-[#3D352E] hover:bg-[#FF7A3D] hover:text-white";
  }
}

function navKeyFromPath(pathname: string): NavKey {
  if (pathname.startsWith("/draft/star-charts")) return "charts";
  if (pathname.startsWith("/draft/watchlist")) return "watchlist";
  if (pathname.startsWith("/draft/orbit")) return "orbit";
  return "home";
}

export function Sidebar({
  activeNav,
  sectors = DEFAULT_SECTORS,
  onFilterSelect,
}: SidebarProps) {
  const pathname = usePathname();
  const active = activeNav ?? navKeyFromPath(pathname);

  return (
    <aside className="w-64 h-full flex-shrink-0 flex flex-col border-r border-[#EAE6E1] bg-[#F9F8F6] z-50">
      <div className="p-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#FF7A3D] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/10 rotate-3">
          <Icon icon="ph:rocket-launch-duotone" className="text-white text-2xl" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-[#3D352E] font-serif-warm">
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
                    ? "font-bold text-[#FF7A3D] bg-white border-[#3D352E] shadow-sm"
                    : "font-medium text-[#8E847B] border-transparent hover:text-[#3D352E] hover:bg-white")
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
            <Icon icon="ph:pencil-circle-duotone" />
            Flight filters
          </h3>
          <div className="px-4 space-y-8">
            <div className="space-y-4">
              <label className="text-[13px] font-bold text-[#8E847B] flex items-center justify-between">
                Sectors
                <Icon icon="ph:caret-right-bold" className="text-[#B0A8A0]" />
              </label>
              <div className="flex flex-wrap gap-2">
                {sectors.map((s) => (
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
        <div className="p-5 rounded-[24px] bg-white border-2 border-[#3D352E] shadow-[6px_6px_0px_#3D352E] rotate-1">
          <div className="flex items-center justify-between mb-3">
            <Icon
              icon="ph:rocket-launch-duotone"
              className="text-2xl text-[#FF7A3D] rocket-mini"
            />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <p className="text-[13px] font-bold text-[#3D352E]">Engines Ready</p>
          <p className="text-[11px] font-medium text-[#8E847B] mt-0.5">
            Clear skies for takeoff.
          </p>
        </div>
      </div>
    </aside>
  );
}
