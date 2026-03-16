"use client";

import { useEffect, useRef, useMemo } from "react";
import { useInView, useSpring, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 2000,
  decimals = 0,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

  const springValue = useSpring(0, {
    bounce: 0,
    duration: duration,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [decimals]
  );

  const displayValue = useTransform(springValue, (current) => {
    return formatter.format(current);
  });

  return (
    <span
      ref={ref}
      className={cn("font-display font-extrabold tabular-nums", className)}
    >
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}
