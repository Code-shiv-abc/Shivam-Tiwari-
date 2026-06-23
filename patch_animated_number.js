const fs = require('fs');
const content = `"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const formatterCache = new Map<number, Intl.NumberFormat>();

function getFormatter(decimals: number): Intl.NumberFormat {
  if (!formatterCache.has(decimals)) {
    formatterCache.set(
      decimals,
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    );
  }
  return formatterCache.get(decimals)!;
}

// Ease out cubic
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1800,
}: AnimatedNumberProps) {
  const formatter = getFormatter(decimals);

  // We want the final value (SSR-friendly) on first render to help SEO and avoid layout shifts
  const finalString = prefix + formatter.format(value) + suffix;
  const [display, setDisplay] = useState(finalString);
  const reduceMotion = useReducedMotion();

  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // If reduced motion is requested, immediately show final state without animation.
    if (reduceMotion) {
      setDisplay(finalString);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;

          function tick(now: number) {
            if (startTime === null) startTime = now;
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            const current = value * eased;

            setDisplay(prefix + formatter.format(current) + suffix);

            if (progress < 1) {
              rafRef.current = requestAnimationFrame(tick);
            } else {
              setDisplay(finalString);
            }
          }

          // Animate starting from 0 immediately when intersected
          setDisplay(prefix + formatter.format(0) + suffix);
          rafRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, prefix, suffix, decimals, duration, reduceMotion, finalString]);

  return (
    <span ref={ref} aria-hidden="true" style={{ display: 'inline-block', minWidth: '5ch' }}>
      {display}
    </span>
  );
}
`;
fs.writeFileSync('src/components/ui/animated-number.tsx', content);
