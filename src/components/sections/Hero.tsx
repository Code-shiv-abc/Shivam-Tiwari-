"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Calendar, ArrowDown } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedNumber } from "@/components/ui/animated-number";

export function Hero() {
  const [imgError, setImgError] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const METRIC_COLORS: Record<string, string> = {
    violet: "text-accent",
    emerald: "text-success",
    cyan: "text-cyan-400",
    amber: "text-warning",
  };

  // Factory functions for animations to deduplicate variants and handle reduced motion
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  });

  const scaleIn = (delay: number) => ({
    initial: { opacity: 0, scale: reduced ? 1 : 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  });

  const floatCard = (delay: number) => ({
    initial: { opacity: 0, scale: reduced ? 1 : 0.9, y: reduced ? 0 : 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] lg:min-h-screen pt-32 lg:pt-24 flex flex-col justify-center overflow-hidden"
    >
      {/* ── BACKGROUND EFFECTS ──────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: reduced ? "0%" : parallaxY, opacity }}
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-success/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-background/80" /> {/* Overlay to ensure text readability */}
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center pt-10 pb-20">
        {/* ── LEFT COLUMN ───────────────────────────── */}
        <div className="flex flex-col items-start pt-8 lg:pt-0">
          <motion.div {...fadeUp(0.2)}>
            <Badge variant="ghost" className="mb-8 border-accent/30 text-accent bg-accent/5 backdrop-blur-sm px-3 py-1.5 text-xs font-mono tracking-wide rounded-full">
              {SITE_CONFIG.badge}
            </Badge>
          </motion.div>

          <h1 className="font-heading font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-foreground">
            <motion.span {...fadeUp(0.3)} className="block">
              {SITE_CONFIG.role.split(" & ")[0]}
            </motion.span>
            <motion.span
              {...fadeUp(0.4)}
              className="block text-muted-foreground"
            >
              & {SITE_CONFIG.role.split(" & ")[1]}
            </motion.span>
            <motion.span {...fadeUp(0.5)} className="block mt-2 text-[clamp(2rem,4vw,3.5rem)] leading-[1.1]">
              <span className="text-foreground">I build teams that </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-cyan-400">
                {SITE_CONFIG.gradientWord || "ship faster."}
              </span>
            </motion.span>
          </h1>

          <motion.p
            {...fadeUp(0.6)}
            className="font-sans text-lg text-muted-foreground max-w-[540px] leading-relaxed mt-6"
          >
            {SITE_CONFIG.tagline}
          </motion.p>

          <motion.div
            {...fadeUp(0.8)}
            className="flex gap-4 mt-10 flex-wrap"
          >
            <a
              href={SITE_CONFIG.cta.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a strategy call"
            >
              <Button variant="cta" rightIcon={<Calendar size={18} />}>
                {SITE_CONFIG.cta.primary}
              </Button>
            </a>
            <a href="#work" aria-label="View work">
              <Button variant="secondary" rightIcon={<ArrowDown size={18} />}>
                {SITE_CONFIG.cta.secondary}
              </Button>
            </a>
          </motion.div>

          <motion.div
            {...fadeUp(1.0)}
            ref={metricsRef}
            className="grid grid-cols-2 lg:grid-cols-4 mt-16 gap-y-8 w-full"
          >
            {SITE_CONFIG.metrics.map((metric, index) => (
              <div
                key={metric.label}
                className="relative flex flex-col pr-4 lg:pr-6 border-l border-border pl-4 first:border-l-0 first:pl-0"
              >
                <div
                  className={`font-heading font-extrabold text-3xl lg:text-4xl leading-none ${METRIC_COLORS[metric.color] || "text-accent"}`}
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
                <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mt-2 font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN ──────────────────────────── */}
        <div className="order-first lg:order-last flex justify-center items-center relative h-full min-h-[400px]">
          {/* Pulsing rings */}
          {!reduced && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[
                { size: 420, delay: 0, color: "var(--color-accent)", opacity: 0.1 },
                { size: 520, delay: 1, color: "var(--color-cyan)", opacity: 0.05 },
                { size: 620, delay: 2, color: "var(--color-accent)", opacity: 0.03 },
              ].map((ring, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border"
                  style={{
                    width: ring.size,
                    height: ring.size,
                    borderColor: ring.color,
                    borderWidth: "1px",
                    willChange: "transform, opacity",
                  }}
                  animate={{ scale: [1, 1.05, 1], opacity: [ring.opacity, ring.opacity * 2, ring.opacity] }}
                  transition={{
                    duration: 5 + i,
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
            {...scaleIn(0.4)}
            className="relative aspect-[4/5] w-full max-w-[320px] lg:max-w-[400px] mx-auto rounded-3xl border border-border/50 bg-surface z-10 shadow-[0_0_80px_rgba(124,58,237,0.15)] overflow-visible"
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden bg-surface-2">
              {!imgError ? (
                <Image
                  src="/images/shivam.jpg"
                  alt="Shivam Tiwari"
                  fill
                  sizes="(max-width: 1024px) 320px, 400px"
                  className="object-cover object-top opacity-90 transition-opacity duration-500 hover:opacity-100"
                  priority
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-heading font-bold text-6xl bg-clip-text text-transparent bg-gradient-to-br from-accent to-cyan-400">
                    ST
                  </span>
                </div>
              )}
            </div>

            {/* Floating Cards */}
            <motion.div
              {...floatCard(0.7)}
              className="absolute -top-6 -right-6 lg:-right-10 p-4 rounded-2xl border border-white/10 bg-surface/80 backdrop-blur-xl shadow-xl z-20"
              animate={reduced ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: 1 }}
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                Engineering Advisor
              </div>
              <div className="text-sm font-medium text-foreground">
                50+ Companies Guided
              </div>
            </motion.div>

            <motion.div
              {...floatCard(0.85)}
              className="absolute -bottom-6 -left-6 lg:-left-10 p-4 rounded-2xl border border-white/10 bg-surface/80 backdrop-blur-xl shadow-xl z-20"
              animate={reduced ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, delay: 1.5 }}
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                Status
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_var(--color-success)] animate-pulse" />
                <span className="text-sm font-medium text-foreground">
                  Open to Advisory Roles
                </span>
              </div>
            </motion.div>

            <motion.div
              {...floatCard(1.0)}
              className="absolute -bottom-2 -right-4 lg:-right-8 p-3 rounded-2xl border border-white/10 bg-surface/80 backdrop-blur-xl shadow-xl z-20"
              animate={reduced ? {} : { y: [0, -5, 0] }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 2 }}
            >
              <div className="flex gap-0.5 text-warning mb-0.5 text-xs">
                ★★★★★
              </div>
              <div className="text-[10px] font-medium text-muted-foreground">
                Trusted by leaders
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}