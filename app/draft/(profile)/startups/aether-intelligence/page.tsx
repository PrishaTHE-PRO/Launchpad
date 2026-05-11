import Link from "next/link";
import { Icon } from "@iconify/react";

const TABS = ["Overview", "Funding", "Team", "Metrics", "Documents"] as const;

const STATS = [
  { label: "Valuation", value: "$48.2M", tone: "ink" },
  { label: "Raised", value: "$12.5M", tone: "ink" },
  { label: "Founded", value: "Feb 2022", tone: "ink" },
  { label: "Sector", value: "Spatial AI", tone: "warm" },
] as const;

const ROUNDS = [
  {
    name: "Series A",
    amount: "$12,500,000",
    date: "MARCH 2023",
    leadBy: "Lunar Ventures",
    active: true,
  },
  {
    name: "Seed Round",
    amount: "$2,800,000",
    date: "FEBRUARY 2022",
    leadBy: "Orbital Angels",
    active: false,
  },
];

const TEAM = [
  {
    name: "Dr. Elias Vance",
    role: "Chief Executive",
    bio: "Ex-SpaceX Lead, PhD MIT Robotics.",
    avatarSeed: "Elias",
  },
  {
    name: "Sarah Chen",
    role: "Chief Technology",
    bio: "Formerly DeepMind Senior Scientist.",
    avatarSeed: "Sarah",
  },
];

const DOCUMENTS = [
  {
    icon: "ph:file-pdf-duotone",
    iconColor: "text-red-400",
    name: "Aether_Pitch_Deck_v2.pdf",
    actionIcon: "ph:lock-duotone",
  },
  {
    icon: "ph:file-xls-duotone",
    iconColor: "text-emerald-500",
    name: "Financial_Projections_2024.xlsx",
    actionIcon: "ph:lock-duotone",
  },
  {
    icon: "ph:shield-check-duotone",
    iconColor: "text-blue-400",
    name: "Cap_Table_Overview.pdf",
    actionIcon: "ph:download-simple-bold",
  },
];

export default function AetherIntelligencePage() {
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mt-8 mb-4 text-[13px] font-bold text-[#B0A8A0]">
        <Link href="/draft/mission-control" className="hover:text-[#FF7A3D]">
          Mission Control
        </Link>
        <Icon icon="ph:caret-right-bold" />
        <span className="text-[#3D352E]">Aether Intelligence Profile</span>
      </nav>

      {/* Company Header */}
      <section className="mb-12">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="w-32 h-32 lg:w-40 lg:h-40 bg-white border-2 border-[#3D352E] rounded-[40px] p-6 flex items-center justify-center shadow-[8px_8px_0px_#3D352E] flex-shrink-0">
            <Icon
              icon="ph:cloud-lightning-duotone"
              className="text-7xl text-[#5D83FF]"
            />
          </div>

          <div className="flex-1 pt-2">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h1 className="text-5xl font-serif font-bold text-[#3D352E] tracking-tight">
                Aether Intelligence
              </h1>
              <div className="flex gap-2">
                <span className="badge-warm px-3 py-1 rounded-full text-[12px] font-black uppercase tracking-widest">
                  Series A
                </span>
                <span className="bg-[#EAE6E1] text-[#3D352E] border-2 border-[#3D352E]/10 px-3 py-1 rounded-full text-[12px] font-black uppercase tracking-widest">
                  Hot Lead
                </span>
              </div>
            </div>
            <p className="text-2xl font-serif font-bold italic text-[#8E847B] max-w-3xl mb-8">
              &ldquo;Sketching the future of industrial design with spatial AI
              modules for the next generation of engineers.&rdquo;
            </p>

            <div className="flex flex-wrap gap-12 border-y-2 border-[#3D352E]/5 py-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-[11px] font-black text-[#B0A8A0] uppercase tracking-widest mb-1">
                    {s.label}
                  </p>
                  <p
                    className={
                      "text-[18px] font-bold " +
                      (s.tone === "warm"
                        ? "text-[#FF7A3D]"
                        : "text-[#3D352E]")
                    }
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-72 flex flex-col gap-3 pt-2">
            <button
              type="button"
              className="w-full py-4 bg-[#FF7A3D] text-white border-2 border-[#3D352E] rounded-2xl font-bold hover:shadow-[6px_6px_0px_#3D352E] transition-all flex items-center justify-center gap-2"
            >
              <Icon icon="ph:hand-heart-duotone" className="text-xl" />
              Express Interest
            </button>
            <button
              type="button"
              className="w-full py-4 bg-white text-[#3D352E] border-2 border-[#3D352E] rounded-2xl font-bold hover:bg-[#F9F8F6] transition-all flex items-center justify-center gap-2"
            >
              <Icon
                icon="ph:star-duotone"
                className="text-xl text-yellow-500"
              />
              Add to Watchlist
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="py-3 bg-white text-[#3D352E] border-2 border-[#3D352E] rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
              >
                <Icon icon="ph:share-network-duotone" />
                Share
              </button>
              <button
                type="button"
                className="py-3 bg-white text-[#3D352E] border-2 border-[#3D352E] rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
              >
                <Icon icon="ph:chat-circle-dots-duotone" />
                Pitch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-10 border-b-2 border-[#3D352E]/10 mb-12 sticky top-0 bg-[#F5F3F0]/90 backdrop-blur-md z-30 pt-4">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            type="button"
            className={
              "pb-4 border-b-2 font-bold text-[15px] transition-all " +
              (i === 0
                ? "border-[#FF7A3D] text-[#FF7A3D]"
                : "border-transparent text-[#8E847B] hover:text-[#3D352E]")
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Left column */}
        <div className="xl:col-span-2 space-y-16">
          {/* Vital Signs */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-[#3D352E]">
              Vital Signs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-human p-8 watercolor-orange">
                <div className="flex items-center justify-between mb-4">
                  <Icon
                    icon="ph:chart-line-up-duotone"
                    className="text-3xl text-[#FF7A3D]"
                  />
                  <span className="text-[10px] font-black uppercase text-green-600">
                    +18% MoM
                  </span>
                </div>
                <p className="text-[13px] font-black text-[#B0A8A0] uppercase tracking-widest">
                  Monthly Revenue
                </p>
                <p className="text-4xl font-serif font-bold text-[#3D352E] mt-1">
                  $205,000
                </p>
                <div className="mt-6 sketch-line opacity-20" />
                <p className="mt-4 text-[12px] font-medium text-[#8E847B]">
                  Projected ARR of $2.46M by end of Q3.
                </p>
              </div>

              <div className="card-human p-8 watercolor-green">
                <div className="flex items-center justify-between mb-4">
                  <Icon
                    icon="ph:hourglass-medium-duotone"
                    className="text-3xl text-[#A8B5A3]"
                  />
                  <span className="text-[10px] font-black uppercase text-amber-600">
                    Steady
                  </span>
                </div>
                <p className="text-[13px] font-black text-[#B0A8A0] uppercase tracking-widest">
                  Cash Runway
                </p>
                <p className="text-4xl font-serif font-bold text-[#3D352E] mt-1">
                  22 Months
                </p>
                <div className="mt-6 sketch-line opacity-20" />
                <p className="mt-4 text-[12px] font-medium text-[#8E847B]">
                  Burn rate stable at $140k/mo after seed expansion.
                </p>
              </div>
            </div>
          </div>

          {/* Launch History */}
          <div className="space-y-8">
            <h2 className="text-3xl font-serif font-bold text-[#3D352E]">
              Launch History
            </h2>
            <div className="space-y-6 pl-4 relative">
              <div className="absolute left-[11px] top-4 bottom-4 w-1 bg-[#3D352E]/10 rounded-full" />
              {ROUNDS.map((r) => (
                <div key={r.name} className="relative flex gap-8 group">
                  <div
                    className={
                      "w-6 h-6 rounded-full border-2 border-[#3D352E] z-10 flex-shrink-0 mt-1 " +
                      (r.active
                        ? "bg-[#FF7A3D] rocket-mini"
                        : "bg-white shadow-sm")
                    }
                  />
                  <div
                    className={
                      "flex-1 card-human p-6 border-[#3D352E]/20 " +
                      (r.active
                        ? "hover:border-[#FF7A3D]"
                        : "hover:border-[#3D352E]/50")
                    }
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{r.name}</h3>
                      <span
                        className={
                          "text-[18px] font-bold " +
                          (r.active ? "text-[#FF7A3D]" : "text-[#3D352E]")
                        }
                      >
                        {r.amount}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-[#B0A8A0] uppercase">
                      <span>{r.date}</span>
                      <span>•</span>
                      <span>Led by {r.leadBy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="space-y-8">
            <h2 className="text-3xl font-serif font-bold text-[#3D352E]">
              The Flight Crew
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="card-human p-6 flex gap-6 items-center"
                >
                  <div className="w-20 h-20 rounded-full border-2 border-[#3D352E] p-1 bg-white overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.avatarSeed}`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-[13px] font-black text-[#FF7A3D] uppercase tracking-widest mb-2">
                      {member.role}
                    </p>
                    <p className="text-[12px] font-medium text-[#8E847B] leading-snug italic">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-12">
          {/* Investment Terms */}
          <div className="card-human p-8 border-2 border-[#3D352E] shadow-[8px_8px_0px_#3D352E] rotate-1">
            <h3 className="text-2xl font-serif font-bold text-[#3D352E] mb-6 flex items-center gap-3">
              <Icon icon="ph:rocket-fill" className="text-[#FF7A3D]" />
              Investment Terms
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-bold text-[#8E847B] uppercase tracking-wider">
                  Equity Offered
                </span>
                <span className="text-lg font-bold text-[#3D352E]">
                  1.5% - 2.0%
                </span>
              </div>
              <div className="sketch-line opacity-10" />
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-bold text-[#8E847B] uppercase tracking-wider">
                  Round Target
                </span>
                <span className="text-lg font-bold text-[#3D352E]">
                  $1.5M Bridge
                </span>
              </div>
              <div className="sketch-line opacity-10" />
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-bold text-[#8E847B] uppercase tracking-wider">
                  Min Check
                </span>
                <span className="text-lg font-bold text-[#3D352E]">
                  $250,000
                </span>
              </div>
              <div className="sketch-line opacity-10" />
              <div className="flex justify-between items-center text-sm font-medium text-emerald-600">
                <span>Committed to date</span>
                <span>$450k (30%)</span>
              </div>
            </div>
            <button
              type="button"
              className="w-full mt-8 py-4 bg-[#3D352E] text-white rounded-2xl font-bold hover:bg-black transition-all"
            >
              Request Term Sheet
            </button>
          </div>

          {/* Data Room */}
          <div className="card-human p-8">
            <h3 className="text-xl font-bold text-[#3D352E] mb-6 flex items-center gap-2">
              <Icon
                icon="ph:folder-notch-open-duotone"
                className="text-2xl text-[#D4A574]"
              />
              Data Room
            </h3>
            <ul className="space-y-4">
              {DOCUMENTS.map((doc) => (
                <li key={doc.name}>
                  <a
                    href="#"
                    className="flex items-center justify-between p-3 rounded-xl border-2 border-transparent hover:border-[#3D352E]/10 hover:bg-[#F9F8F6] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        icon={doc.icon}
                        className={"text-2xl " + doc.iconColor}
                      />
                      <span className="text-[14px] font-medium text-[#3D352E]">
                        {doc.name}
                      </span>
                    </div>
                    <Icon
                      icon={doc.actionIcon}
                      className="text-[#B0A8A0] group-hover:text-[#FF7A3D]"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission Note */}
          <div className="p-6 rounded-[24px] bg-white border-2 border-dashed border-[#3D352E]/30">
            <p className="text-[12px] font-medium text-[#8E847B] mb-4 italic text-center">
              &ldquo;Thinking about leading the bridge round? Add a private note
              to your mission log.&rdquo;
            </p>
            <textarea
              placeholder="Draft your insight..."
              className="w-full bg-[#F9F8F6] rounded-xl p-3 text-sm focus:outline-none border-2 border-transparent focus:border-[#3D352E]/10 mb-4 h-24 resize-none font-medium"
            />
            <button
              type="button"
              className="w-full py-2 bg-[#D4A574] text-white rounded-xl font-bold text-xs uppercase tracking-widest"
            >
              Add to Log
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
