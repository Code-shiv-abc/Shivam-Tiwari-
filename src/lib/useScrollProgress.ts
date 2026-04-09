"use client";

import { useState, useEffect } from "react";
import { throttle } from "@/lib/utils";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Handle edge cases where document isn't scrollable
      if (documentHeight === windowHeight) {
        setProgress(0);
        return;
      }

      const calculatedProgress = scrollY / (documentHeight - windowHeight);
      setProgress(Math.max(0, Math.min(1, calculatedProgress)));
    }, 16); // ~60fps

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return progress;
}
