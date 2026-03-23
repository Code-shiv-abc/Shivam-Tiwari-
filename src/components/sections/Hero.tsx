"use client";

import React, { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Calendar, ArrowDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { SITE_CONFIG } from "@/lib/config";

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// Defined here so they are co-located with the
// component that owns the entrance sequence.
// These are intentionally simple — no orchestration
// via parent variants, which was
// causing the hidden state to propagate and
// freeze all children.
// ─────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

function fadeIn(delay: number, reduced: boolean) {
  if (reduced) return { initial: { opacity: 1 }, animate: { opacity: 1 } };
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  };
}

function fadeUp(delay: number, reduced: boolean) {
  if (reduced)
    return { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } };
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: EASE },
  };
}

function scaleIn(delay: number, reduced: boolean) {
  if (reduced)
    return {
      initial: { opacity: 1, scale: 1 },
      animate: { opacity: 1, scale: 1 },
    };
  return {
    initial: { opacity: 1, scale: 1 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0, delay: 0 },
  };
}

function floatCard(delay: number, reduced: boolean) {
  if (reduced)
    return {
      initial: { opacity: 1, y: 0, scale: 1 },
      animate: { opacity: 1, y: 0, scale: 1 },
    };
  return {
    initial: { opacity: 0, y: 12, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.5, delay, ease: EASE },
  };
}

// Metric color map — typed against config values
const METRIC_COLORS: Record<string, string> = {
  violet: "text-[var(--color-brand-violet)]",
  cyan: "text-[var(--color-brand-cyan)]",
  emerald: "text-[var(--color-brand-emerald)]",
  amber: "text-[var(--color-brand-amber)]",
};

export function Hero() {
  const [imgError, setImgError] = useState(false);
  const reduced = useReducedMotion() ?? false;

  // Ref for the metrics row — passed to AnimatedNumber
  // so counters fire when this element enters the viewport.
  // On hero (above the fold) this fires immediately on mount.
  const metricsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative overflow-visible bg-[var(--color-bg)] min-h-screen flex flex-col"
    >
      {/* ── BACKGROUND LAYERS ─────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23ffffff'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Violet blob — top right, drifts slowly */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: -80,
            right: -60,
            width: 600,
            height: 600,
            background:
              "radial-gradient(ellipse at center, var(--color-brand-violet-glow-14) 0%, transparent 65%)",
          }}
          animate={
            reduced
              ? {}
              : {
                  x: [0, 20, 0],
                  y: [0, 30, 0],
                  scale: [1, 1.06, 1],
                }
          }
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      {/* ── MAIN GRID ─────────────────────────────── */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-12 items-center max-w-[1280px] w-full mx-auto px-6 lg:px-12 py-28 lg:py-32">
        {/* ── LEFT COLUMN ───────────────────────────── */}
        {/* NOTE: This is a plain div intentionally.
            Each child manages its own entrance animation.
            A motion.div parent with variants here was
            propagating opacity:0 and blocking all children. */}
        <div className="flex flex-col">
          {/* 1. Badge — 0ms */}
          <motion.div {...fadeIn(0, reduced)} className="mb-5 self-start">
            <Badge variant="violet" dot>
              {SITE_CONFIG.badge}
            </Badge>
          </motion.div>

          {/* 2. Headline — lines flow 200 / 320 / 440ms */}
          <h1
            className="font-display font-extrabold mt-5"
            style={{
              fontSize: "clamp(42px, 5.5vw, 76px)",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            <motion.span
              {...fadeUp(0.2, reduced)}
              className="block text-[var(--color-text-1)]"
            >
              I build engineering
            </motion.span>
            <motion.span
              {...fadeUp(0.32, reduced)}
              className="block text-[var(--color-text-1)]"
            >
              organizations that
            </motion.span>
            <motion.span {...fadeUp(0.44, reduced)} className="block">
              <span className="text-[var(--color-text-1)]">ship </span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--color-accent-light), var(--color-brand-cyan))",
                }}
              >
                {SITE_CONFIG.gradientWord ?? "faster."}
              </span>
            </motion.span>
          </h1>

          {/* 3. Tagline — 600ms */}
          <motion.p
            {...fadeUp(0.6, reduced)}
            className="font-body text-[1.05rem] text-[var(--color-text-2)] max-w-[520px] leading-[1.75] mt-6"
            dangerouslySetInnerHTML={{ __html: SITE_CONFIG.tagline }}
          />

          {/* 4. CTAs — 800ms */}
          <motion.div
            {...fadeUp(0.8, reduced)}
            className="flex gap-4 mt-10 flex-wrap"
          >
            <a
              href={SITE_CONFIG.cta.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a Strategy Call"
              className="inline-block"
            >
              <Button
                variant="cta"
                rightIcon={<Calendar size={16} aria-hidden="true" />}
              >
                {SITE_CONFIG.cta.primary}
              </Button>
            </a>
            <a href="#work" aria-label="View My Work" className="inline-block">
              <Button
                variant="secondary"
                rightIcon={<ArrowDown size={16} aria-hidden="true" />}
              >
                {SITE_CONFIG.cta.secondary}
              </Button>
            </a>
          </motion.div>

          {/* 5. Metrics — 1000ms, counters fire on mount */}
          <motion.div
            {...fadeUp(1.0, reduced)}
            ref={metricsRef}
            className="grid grid-cols-2 lg:grid-cols-4 mt-14"
          >
            {SITE_CONFIG.metrics.map((metric, index) => (
              <div
                key={metric.label}
                className="relative flex flex-col pr-4 lg:pr-6"
                style={{
                  borderLeft:
                    index > 0 ? "1px solid var(--color-border)" : undefined,
                  paddingLeft: index > 0 ? "1rem" : undefined,
                }}
              >
                {/* Metric number */}
                <div
                  className={`font-display font-extrabold leading-none ${METRIC_COLORS[metric.color] ?? "text-[var(--color-brand-violet)]"}`}
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", minHeight: "1.2em" }}
                  aria-live="polite"
                >
                  <AnimatedNumber
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    decimals={metric.decimals ?? 0}
                    duration={1800}
                    startOnMount
                    delay={1000 + index * 120}
                    reduceMotion={reduced}
                  />
                </div>
                {/* Metric label */}
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--color-text-3)] mt-2 leading-tight">
                  {metric.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN ──────────────────────────── */}
        <div className="order-first lg:order-last flex justify-center items-center relative">
          {/* Pulsing rings — anchored to right column, behind photo */}
          {!reduced && (
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {[
                {
                  size: 460,
                  delay: 0,
                  color: "var(--color-brand-violet-glow-10)",
                },
                {
                  size: 540,
                  delay: 1.3,
                  color: "var(--color-brand-cyan-glow-06)",
                },
                {
                  size: 620,
                  delay: 2.6,
                  color: "var(--color-brand-violet-glow-05)",
                },
              ].map((ring, i) => (
                <motion.div
                  key={i}
                  aria-hidden="true"
                  className="absolute rounded-full"
                  style={{
                    width: ring.size,
                    height: ring.size,
                    border: `1px solid ${ring.color}`,
                  }}
                  animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: ring.delay,
                  }}
                />
              ))}
            </div>
          )}

          {/* Photo frame */}
          <motion.div
            {...scaleIn(0, reduced)}
            className="relative aspect-square w-full max-w-[280px] lg:max-w-[420px] mx-auto rounded-[24px] border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface-2)] to-[var(--color-surface-3)] z-10"
            style={{
              boxShadow:
                "0 0 0 1px var(--color-brand-violet-glow-08), 0 0 60px var(--color-brand-violet-glow-15), 0 24px 80px var(--color-shadow-strong)",
            }}
          >
            {!imgError ? (
              <Image
                src="/images/shivam.jpg"
                alt="Shivam Tiwari — Engineering Leader"
                fill
                sizes="(max-width: 1024px) 280px, 420px"
                className="object-cover object-top rounded-[24px]"
                priority={true}
                fetchPriority="high"
                loading="eager"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center rounded-[24px]">
                <span
                  className="font-display font-extrabold text-6xl select-none tracking-tight bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, var(--color-accent-light), var(--color-brand-cyan))",
                  }}
                >
                  ST
                </span>
              </div>
            )}

            {/* ── FLOATING CARDS ── */}

            {/* Card 1 — Engineering Advisor (top right) */}
            <motion.div
              {...floatCard(0.7, reduced)}
              aria-hidden="true"
              className="absolute -top-4 -right-4 lg:-right-8 px-3 py-2.5 rounded-[14px] border border-[var(--color-glass-border)] backdrop-blur-xl shadow-lg z-20 whitespace-nowrap"
              style={{ background: "var(--color-glass-bg)" }}
              animate={reduced ? {} : { y: [0, -8, 0] }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1.2,
              }}
            >
              <div className="text-[0.6rem] font-mono uppercase tracking-[0.1em] text-[var(--color-text-3)] mb-1">
                Engineering Advisor
              </div>
              <div className="text-[0.82rem] font-medium text-[var(--color-text-1)]">
                50+ Companies Guided
              </div>
            </motion.div>

            {/* Card 2 — Open to roles (bottom left) */}
            <motion.div
              {...floatCard(0.85, reduced)}
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 lg:-left-8 px-3 py-2.5 rounded-[14px] border border-[var(--color-glass-border)] backdrop-blur-xl shadow-lg z-20 whitespace-nowrap"
              style={{ background: "var(--color-glass-bg)" }}
              animate={reduced ? {} : { y: [0, 6, 0] }}
              transition={{
                duration: 7,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1.35,
              }}
            >
              <div className="text-[0.6rem] font-mono uppercase tracking-[0.1em] text-[var(--color-text-3)] mb-1">
                Status
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: "var(--color-brand-emerald)",
                    boxShadow: "0 0 6px var(--color-brand-emerald)",
                    animation: reduced ? "none" : "pulse 2s ease infinite",
                  }}
                />
                <span className="text-[0.82rem] font-medium text-[var(--color-text-1)]">
                  Open to Advisory Roles
                </span>
              </div>
            </motion.div>

            {/* Card 3 — Social proof (bottom right) */}
            <motion.div
              {...floatCard(1.0, reduced)}
              aria-hidden="true"
              className="absolute -bottom-2 -right-4 lg:-right-6 px-3 py-2.5 rounded-[14px] border border-[var(--color-glass-border)] backdrop-blur-xl shadow-lg z-20 whitespace-nowrap"
              style={{ background: "var(--color-glass-bg)" }}
              animate={reduced ? {} : { y: [0, -5, 0] }}
              transition={{
                duration: 5.5,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1.5,
              }}
            >
              <div className="text-[0.75rem] text-[var(--color-brand-amber)]">
                ★★★★★
              </div>
              <div className="text-[0.68rem] text-[var(--color-text-2)] mt-0.5">
                Trusted by engineering leaders
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM GRADIENT DIVIDER ───────────────── */}
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-accent) 30%, var(--color-brand-cyan) 70%, transparent 100%)",
          opacity: 0.3,
        }}
      />

      {/* Pulse keyframe for status dot */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.8);
          }
        }
      `}</style>
    </section>
  );
}
