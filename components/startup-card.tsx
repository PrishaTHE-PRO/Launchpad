import Link from "next/link";
import { Icon } from "@iconify/react";

export interface StartupCardProps {
  startupName: string;
  fundingStage: string;
  fundingAmount: string;
  description: string;
  tags: string[];
  statusText: string;
  statusIcon: string;
  timeAgo: string;
  cardIcon: string;
  iconColor?: string;
  isGrowing?: boolean;
  href?: string;
  accent?: "orange" | "green" | "gold";
  stageVariant?: "warm" | "muted";
}

const accentMap = {
  orange: {
    watercolor: "watercolor-orange",
    deco: "text-[#FF7A3D]",
    decoIcon: "ph:rocket-launch-duotone",
    statusIconColor: "text-[#FF7A3D]",
  },
  green: {
    watercolor: "watercolor-green",
    deco: "text-[#A8B5A3]",
    decoIcon: "ph:planet-duotone",
    statusIconColor: "text-[#A8B5A3]",
  },
  gold: {
    watercolor: "watercolor-orange",
    deco: "text-[#D4A574]",
    decoIcon: "ph:sun-duotone",
    statusIconColor: "text-[#FF7A3D]",
  },
} as const;

export function StartupCard({
  startupName,
  fundingStage,
  fundingAmount,
  description,
  tags,
  statusText,
  statusIcon,
  timeAgo,
  cardIcon,
  iconColor = "text-[#5D83FF]",
  isGrowing = true,
  href = "#",
  accent = "orange",
  stageVariant = "warm",
}: StartupCardProps) {
  const a = accentMap[accent];

  const stageClass =
    stageVariant === "warm"
      ? "badge-warm"
      : "bg-[#EAE6E1] text-[#8E847B] border-2 border-[#3D352E]/10";

  return (
    <Link
      href={href}
      className="card-human p-8 flex flex-col h-full cursor-pointer relative overflow-hidden group"
    >
      <div
        className={`absolute inset-0 ${a.watercolor} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
      />
      <div
        className={`absolute -top-10 -right-10 text-[120px] ${a.deco} opacity-[0.03] group-hover:opacity-[0.08] transition-all`}
      >
        <Icon icon={a.decoIcon} />
      </div>

      <div className="flex justify-between items-start mb-8 relative">
        <div className="flex gap-5 items-center">
          <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#3D352E] p-3 flex items-center justify-center shadow-[4px_4px_0px_#3D352E]">
            <Icon icon={cardIcon} className={`text-3xl ${iconColor}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-serif font-bold text-[#3D352E] leading-tight">
                {startupName}
              </h3>
              {isGrowing && (
                <Icon
                  icon="ph:rocket-fill"
                  className="text-[#FF7A3D] text-lg rocket-mini"
                />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${stageClass}`}
              >
                {fundingStage}
              </span>
              <span className="text-[10px] text-[#B0A8A0] font-bold uppercase tracking-widest">
                {fundingAmount}
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[#8E847B] text-[15px] leading-relaxed mb-10 font-medium relative">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-10 relative">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 rounded-xl border-2 border-[#3D352E] bg-white text-[11px] font-bold text-[#3D352E] hover:bg-[#F9F8F6] transition-all"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t-2 border-[#F9F8F6] pt-6 mt-auto relative">
        <div className="flex items-center gap-3">
          <Icon icon={statusIcon} className={a.statusIconColor} />
          <span className="text-[12px] font-bold text-[#3D352E]">
            {statusText}
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#B0A8A0] uppercase">
          {timeAgo}
        </span>
      </div>
    </Link>
  );
}
