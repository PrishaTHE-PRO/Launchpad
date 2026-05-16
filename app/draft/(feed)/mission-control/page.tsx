import { Icon } from "@iconify/react";
import { StartupCard, type StartupCardProps } from "@/components/startup-card";

const STARTUPS: StartupCardProps[] = [
  {
    startupName: "Aether Intelligence",
    fundingStage: "Series A",
    fundingAmount: "$12.5M EQUITY",
    description:
      "Sketching the future of industrial design with spatial AI modules for the next generation of engineers.",
    tags: ["GenAI", "Spatial Tech"],
    statusText: "High Momentum",
    statusIcon: "ph:fire-duotone",
    timeAgo: "4m ago",
    cardIcon: "ph:cloud-lightning-duotone",
    iconColor: "text-[#5D83FF]",
    isGrowing: true,
    accent: "orange",
    stageVariant: "warm",
    href: "/draft/startups/aether-intelligence",
  },
  {
    startupName: "Fortress Protocol",
    fundingStage: "Seed",
    fundingAmount: "$2.4M EQUITY",
    description:
      "Hand-crafted security auditing for decentralized stacks. Built for the modern orbital economy.",
    tags: ["Cybersec", "Web3"],
    statusText: "Safe Orbit",
    statusIcon: "ph:planet-fill",
    timeAgo: "12m ago",
    cardIcon: "ph:shield-chevron-duotone",
    iconColor: "text-[#A8B5A3]",
    isGrowing: false,
    accent: "green",
    stageVariant: "warm",
  },
  {
    startupName: "Zephyr Labs",
    fundingStage: "Pre-Seed",
    fundingAmount: "$800K EQUITY",
    description:
      "Sketching the blueprint for modular carbon capture. Zero emissions, high altitude thinking.",
    tags: ["ClimateTech", "BioTech"],
    statusText: "Trending Up",
    statusIcon: "ph:star-duotone",
    timeAgo: "1h ago",
    cardIcon: "ph:wind-duotone",
    iconColor: "text-blue-300",
    isGrowing: true,
    accent: "gold",
    stageVariant: "muted",
  },
];

export default function MissionControlPage() {
  return (
    <>
      <section className="mt-8 mb-16 relative">
        <div className="max-w-2xl">
          <h1 className="text-[64px] font-serif-warm tracking-tight leading-[1.05] text-[var(--text-dark)] mb-6">
            Discover Your Next{" "}
            <span className="italic text-[#FF7A3D] block">Venture Launch.</span>
          </h1>
          <p className="text-[var(--text-muted)] text-[18px] font-medium max-w-lg mb-4">
            Tracking 142 star-bound startups. Curated insights sketched for the
            boldest explorers.
          </p>
          <div className="sketch-line opacity-30" />
        </div>

        <div
          className="absolute right-10 top-0 hidden xl:flex flex-col items-center"
          style={{
            position: "absolute",
            inset: "-35px auto auto 630px",
            width: 420,
            height: 353,
          }}
        >
          <div className="relative rocket-launch">
            <Icon
              icon="ph:rocket-duotone"
              className="text-[280px] text-[#FF7A3D] -rotate-45"
            />
            <div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#D4A574]/20 rounded-full smoke-trail"
              style={{ animationDelay: "0.1s" }}
            />
            <div
              className="absolute -bottom-10 left-2 w-16 h-16 bg-[#D4A574]/15 rounded-full smoke-trail"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute -bottom-6 left-12 w-10 h-10 bg-[#D4A574]/10 rounded-full smoke-trail"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {STARTUPS.map((s) => (
          <StartupCard key={s.startupName} {...s} />
        ))}
      </section>

      <div className="fixed bottom-[-5%] right-[-5%] w-[500px] h-[500px] bg-[#FF7A3D]/5 blur-[120px] rounded-full -z-10" />
      <div className="fixed top-[20%] left-[20%] w-[400px] h-[400px] bg-[#A8B5A3]/5 blur-[100px] rounded-full -z-10" />
    </>
  );
}
