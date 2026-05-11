import { Icon } from "@iconify/react";

export default function OrbitPage() {
  return (
    <section className="mt-8">
      <h1 className="text-[64px] font-serif font-bold tracking-tight leading-[1.05] text-[#3D352E] mb-6">
        Your <span className="italic text-[#FF7A3D]">Orbit.</span>
      </h1>
      <p className="text-[#8E847B] text-[18px] font-medium max-w-lg mb-12">
        Portfolio ventures currently in active orbit.
      </p>
      <div className="card-human p-12 flex flex-col items-center justify-center text-center">
        <Icon
          icon="ph:planet-duotone"
          className="text-[80px] text-[#A8B5A3] mb-6"
        />
        <p className="text-[14px] font-serif font-bold text-[#3D352E] mb-2">
          Orbit empty
        </p>
        <p className="text-[12px] font-medium text-[#8E847B] italic">
          Add ventures to your portfolio to track them here.
        </p>
      </div>
    </section>
  );
}
