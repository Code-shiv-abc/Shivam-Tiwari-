"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

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
      })
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
  /** Delay in ms before counter starts after entering viewport. Default: 0 */
  delay?: number;
  /** If true, skip animation and show final value immediately */
  reduceMotion?: boolean;
  startOnMount?: boolean;
}

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1800,
  delay = 0,
  reduceMotion = false,
}: AnimatedNumberProps) {
  const formatter = getFormatter(decimals);
  const finalString = prefix + formatter.format(value) + suffix;

  // Render final value immediately for SSR
  const [display, setDisplay] = useState(finalString);

  const spanRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasStarted = useRef(false);

  const isInView = useInView(spanRef, { once: true, amount: 0.5 });

  useEffect(() => {
    // Skip animation if reduced motion
    if (reduceMotion) {
      setDisplay(finalString);
      return;
    }

    // Only start if it hasn't started and is in view
    if (hasStarted.current || !isInView) return;

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

        const currentString = prefix + formatter.format(current) + suffix;

        // Bypass React render cycle, update DOM directly
        if (spanRef.current) {
          spanRef.current.textContent = currentString;
        }

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          // Sync final value to React state
          setDisplay(finalString);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduceMotion, duration, delay, finalString, prefix, suffix, isInView]);

  return <span ref={spanRef}>{display}</span>;
}
