"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export function RightSidebar() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", {
        hour12: false,
        timeZone: "Europe/London",
      });
      setTime(timeStr + " GMT");
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <aside className="w-[360px] flex-shrink-0 flex flex-col bg-[#F9F8F6] border-l border-[#EAE6E1] z-40">
      <div className="p-10 flex-shrink-0">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#B0A8A0] mb-8 flex items-center gap-2">
          <Icon icon="ph:scroll-duotone" />
          Mission Log
        </h3>

        <div className="relative group mb-10">
          <textarea
            placeholder="Draft your orbital insights..."
            className="w-full bg-white border-2 border-[#3D352E] rounded-[24px] p-6 text-[14px] font-medium text-[#3D352E] focus:outline-none focus:border-[#FF7A3D] min-h-[160px] resize-none transition-all shadow-sm placeholder:text-[#B0A8A0]"
          />
          <div className="absolute bottom-4 right-4">
            <button
              type="button"
              className="w-10 h-10 bg-[#FF7A3D] border-2 border-[#3D352E] hover:bg-[#E66A30] text-white rounded-full flex items-center justify-center transition-all shadow-lg"
            >
              <Icon icon="ph:plus-bold" className="text-xl" />
            </button>
          </div>
        </div>

        <div className="space-y-4 overflow-y-auto max-h-[280px] custom-scroll pr-2">
          <div className="p-5 bg-white border-2 border-[#3D352E] rounded-[24px] shadow-[4px_4px_0px_#3D352E] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#3D352E] transition-all cursor-default group">
            <p className="text-[13px] font-medium text-[#3D352E] leading-relaxed italic">
              &ldquo;Aether&rsquo;s launch trajectory is solid. The founders
              have significant flight time in deep tech.&rdquo;
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#B0A8A0] uppercase tracking-tighter">
                14 AUG • 09:42
              </span>
              <Icon
                icon="ph:rocket-duotone"
                className="text-[#FF7A3D] opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-10 border-t-2 border-dashed border-[#EAE6E1] py-10 overflow-y-auto custom-scroll">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B0A8A0]">
            Astro Profile
          </h3>
          <Icon
            icon="ph:export-duotone"
            className="text-[#B0A8A0] hover:text-[#FF7A3D] cursor-pointer transition-all"
          />
        </div>

        <div className="aspect-square border-2 border-dashed border-[#3D352E] rounded-[40px] flex flex-col items-center justify-center text-center px-10 bg-white hover:border-[#FF7A3D]/40 transition-all group shadow-[10px_10px_0px_rgba(61,53,46,0.02)]">
          <div className="w-16 h-16 rounded-full bg-[#F9F8F6] border-2 border-[#3D352E] flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
            <Icon
              icon="ph:telescope-duotone"
              className="text-3xl text-[#D4A574]"
            />
          </div>
          <p className="text-[14px] font-serif font-bold text-[#3D352E] mb-2">
            Scan Target
          </p>
          <p className="text-[11px] font-medium text-[#8E847B] leading-relaxed italic">
            Choose a venture from the mission feed to inspect its star chart.
          </p>
        </div>
      </div>

      <div className="p-8 bg-white border-t border-[#EAE6E1]">
        <div className="flex justify-between items-center">
          <div className="flex gap-8">
            <div>
              <p className="text-[9px] font-black text-[#B0A8A0] uppercase tracking-widest">
                Mission
              </p>
              <p className="text-[12px] font-bold text-[#3D352E]">L-V2.1</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-[#B0A8A0] uppercase tracking-widest">
                Payload
              </p>
              <p className="text-[12px] font-bold text-[#A8B5A3]">Optimal</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-[#B0A8A0] uppercase tracking-widest">
              Stardate
            </p>
            <p className="text-[12px] font-bold text-[#3D352E] tabular-nums tracking-tighter">
              {time || "--:--:-- GMT"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
