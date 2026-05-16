"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const STORAGE_KEY = "launchpad-theme";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {}
    const shouldBeDark = saved === "dark";
    if (shouldBeDark) document.body.classList.add("dark-mode");
    setIsDark(shouldBeDark);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.body.classList.toggle("dark-mode", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={toggle}
      className="p-3 text-[var(--text-dark)] hover:bg-[var(--sidebar-bg)] transition-all bg-[var(--card-white)] rounded-full border-2 border-[var(--border-heavy)]"
    >
      <Icon
        icon={isDark ? "ph:sun-duotone" : "ph:moon-duotone"}
        className="text-xl"
      />
    </button>
  );
}
