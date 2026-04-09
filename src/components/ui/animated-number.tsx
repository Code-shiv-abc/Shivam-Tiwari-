"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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
    prefix + formatter.format(value) + suffix
  );
  const [isFinished, setIsFinished] = useState(false);

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
          setIsFinished(true);
          setTimeout(() => setIsFinished(false), 600); // clear particles after 600ms
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

  return (
    <motion.span
      className="inline-block relative tabular-nums"
      animate={isFinished && !reduceMotion ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 28 }}
    >
      {display}

      {/* Particle effect on finish */}
      {isFinished && !reduceMotion && (
        <span className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.span
            initial={{ opacity: 1, y: 0, x: -10 }}
            animate={{ opacity: 0, y: -20, x: -15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute text-brand-violet font-mono text-[14px]"
          >
            +1
          </motion.span>
          <motion.span
            initial={{ opacity: 1, y: 0, x: 0 }}
            animate={{ opacity: 0, y: -25, x: 5 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="absolute text-brand-cyan font-mono text-[10px]"
          >
            +1
          </motion.span>
          <motion.span
            initial={{ opacity: 1, y: 0, x: 10 }}
            animate={{ opacity: 0, y: -15, x: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="absolute text-brand-amber font-mono text-[12px]"
          >
            +1
          </motion.span>
        </span>
      )}
    </motion.span>
  );
}
