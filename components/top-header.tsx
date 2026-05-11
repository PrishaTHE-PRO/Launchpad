"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

export interface TopHeaderProps {
  showNotification?: boolean;
  avatarUrl?: string;
  onSearch?: (query: string) => void;
  onSubmitSearch?: (query: string) => void;
  onLaunchIntel?: () => void;
  onToggleNotifications?: () => void;
  onProfileClick?: () => void;
}

export function TopHeader({
  showNotification = true,
  avatarUrl = "https://api.dicebear.com/7.x/pixel-art/svg?seed=RocketMan",
  onSearch,
  onSubmitSearch,
  onLaunchIntel,
  onToggleNotifications,
  onProfileClick,
}: TopHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header className="h-24 flex items-center justify-between px-12 z-40">
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <Icon
            icon="ph:magnifying-glass-duotone"
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B0A8A0] transition-colors group-focus-within:text-[#FF7A3D] text-xl"
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for the next lunar mission..."
            className="w-full bg-white border-2 border-[#3D352E] rounded-[24px] pl-14 pr-16 py-3.5 text-[15px] focus:outline-none focus:border-[#FF7A3D] transition-all shadow-sm placeholder:text-[#B0A8A0]"
            onChange={(e) => onSearch?.(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmitSearch?.((e.target as HTMLInputElement).value);
              }
            }}
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-40 pointer-events-none">
            <span className="font-mono text-[10px] px-1.5 py-0.5 border-2 border-[#3D352E] rounded-md">
              ⌘
            </span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 border-2 border-[#3D352E] rounded-md">
              K
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 ml-8">
        <button
          type="button"
          onClick={onLaunchIntel}
          className="group flex items-center gap-3 px-6 py-3 text-[13px] font-bold bg-[#FF7A3D] text-white border-2 border-[#3D352E] rounded-full hover:shadow-[4px_4px_0px_#3D352E] transition-all shadow-xl shadow-orange-500/10"
        >
          <Icon
            icon="ph:rocket-duotone"
            className="text-lg group-hover:animate-bounce"
          />
          Launch Intel
        </button>
        <button
          type="button"
          onClick={onToggleNotifications}
          className="p-3 text-[#3D352E] hover:bg-[#F9F8F6] transition-all relative bg-white rounded-full border-2 border-[#3D352E]"
        >
          <Icon icon="ph:bell-duotone" className="text-xl" />
          {showNotification && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#3D352E]" />
          )}
        </button>
        <div
          onClick={onProfileClick}
          className="w-11 h-11 rounded-full border-2 border-[#3D352E] p-0.5 bg-white shadow-sm cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarUrl}
            alt="Pilot"
            className="w-full h-full rounded-full transition-all"
          />
        </div>
      </div>
    </header>
  );
}
