"use client";

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────
// Module-level Intl.NumberFormat cache
// Created once per decimals value, never inside
// animation loops or component re-renders.
// ─────────────────────────────────────────────
const formatterCache = new Map<number, Intl.NumberFormat>();

function getFormatter(decimals: number): Intl.NumberFormat {
  if (!formatterCache.has(decimals)) {
    formatterCache.set(
      decimals,
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    );
  }
  return formatterCache.get(decimals)!;
}

// ─────────────────────────────────────────────
// easeOutExpo — number rushes up then settles
// ─────────────────────────────────────────────
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────
interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  /** Fire counter on mount after `delay` ms. Default: true */
  startOnMount?: boolean;
  /** Delay in ms before counter starts. Default: 0 */
  delay?: number;
  /** If true, skip animation and show final value immediately */
  reduceMotion?: boolean;
}

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1800,
  startOnMount = true,
  delay = 0,
  reduceMotion = false,
}: AnimatedNumberProps) {
  const formatter = getFormatter(decimals);

  // Render final value immediately for reduced motion or SSR
  const [display, setDisplay] = useState(
    prefix + formatter.format(value) + suffix,
  );

  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    // Skip animation if reduced motion or not mounting
    if (reduceMotion || !startOnMount) {
      setDisplay(prefix + formatter.format(value) + suffix);
      return;
    }

    // Prevent double-firing in StrictMode
    if (hasStarted.current) return;

    function runCounter() {
      hasStarted.current = true;

      function tick(now: number) {
        if (startTimeRef.current === null) {
          startTimeRef.current = now;
        }

        const elapsed = now - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutExpo(progress);
        const current = value * eased;

        setDisplay(prefix + formatter.format(current) + suffix);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          // Guarantee final value is exact
          setDisplay(prefix + formatter.format(value) + suffix);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    if (delay > 0) {
      timerRef.current = setTimeout(runCounter, delay);
    } else {
      runCounter();
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // Only re-run if value changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span>{display}</span>;
}
