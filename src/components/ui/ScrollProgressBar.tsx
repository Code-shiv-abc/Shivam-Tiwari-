"use client";

import { useScrollProgress } from "@/lib/useScrollProgress";

export function ScrollProgressBar() {
  const progress = useScrollProgress();
  const isVisible = progress > 0 && progress < 1;

  return (
    <div
      className="fixed top-0 left-0 h-[2px] z-[100] bg-gradient-to-r from-brand-violet to-brand-cyan transition-opacity duration-300 pointer-events-none"
      style={{
        width: `${progress * 100}%`,
        opacity: isVisible ? 1 : 0,
        transition: "width 100ms linear, opacity 300ms ease",
      }}
    />
  );
}
