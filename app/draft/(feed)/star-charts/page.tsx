import { Icon } from "@iconify/react";

export default function StarChartsPage() {
  return (
    <section className="mt-8">
      <h1 className="text-[64px] font-serif font-bold tracking-tight leading-[1.05] text-[#3D352E] mb-6">
        Star <span className="italic text-[#FF7A3D]">Charts.</span>
      </h1>
      <p className="text-[#8E847B] text-[18px] font-medium max-w-lg mb-12">
        Plot the constellation of emerging ventures. Coming soon.
      </p>
      <div className="card-human p-12 flex flex-col items-center justify-center text-center">
        <Icon
          icon="ph:telescope-duotone"
          className="text-[80px] text-[#D4A574] mb-6"
        />
        <p className="text-[14px] font-serif font-bold text-[#3D352E] mb-2">
          Charts in progress
        </p>
        <p className="text-[12px] font-medium text-[#8E847B] italic">
          Mapping orbits across the sector galaxy.
        </p>
      </div>
    </section>
  );
}
