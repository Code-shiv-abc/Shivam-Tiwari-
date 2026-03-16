"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { fadeIn, fadeUp, stagger, scaleIn } from "@/lib/animations";
import { SITE_CONFIG } from "@/lib/config";

export function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[var(--color-bg)] min-h-screen flex flex-col"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        {/* Violet Radial Blob */}
        <div
          className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)",
          }}
        ></div>

        {/* Concentric Pulse Rings */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.05, 0.15] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 0 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-violet/10"
          style={{ width: 480, height: 480 }}
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.05, 0.15] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 1.3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-violet/10"
          style={{ width: 560, height: 560 }}
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.05, 0.15] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 2.6 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-violet/10"
          style={{ width: 640, height: 640 }}
        />

        {/* Dot Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23ffffff'/%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-12 items-center max-w-[1280px] w-full mx-auto px-6 lg:px-12 py-28 lg:py-32">
        <div className="flex flex-col">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mb-5 self-start"
          >
            <Badge variant="violet" dot>
              {SITE_CONFIG.badge}
            </Badge>
          </motion.div>

          <motion.h1
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="font-display font-extrabold mt-5"
            style={{
              fontSize: "clamp(42px, 6vw, 76px)",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            <motion.div variants={fadeUp} transition={{ delay: 0.30 }}>
              I build engineering
            </motion.div>
            <motion.div variants={fadeUp} transition={{ delay: 0.38 }}>
              organizations that
            </motion.div>
            <motion.div variants={fadeUp} transition={{ delay: 0.46 }}>
              ship{" "}
              <span className="bg-gradient-to-r from-brand-violet to-brand-cyan bg-clip-text text-transparent">
                faster.
              </span>
            </motion.div>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="font-sans text-[18px] text-text-2 max-w-[520px] leading-[1.7] mt-6"
          >
            {SITE_CONFIG.tagline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
            className="flex gap-4 mt-10 flex-wrap"
          >
            <a
              href={SITE_CONFIG.cta.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="cta" rightIcon={<Calendar size={16} />}>
                {SITE_CONFIG.cta.primary}
              </Button>
            </a>
            <a href="#work" className="inline-block">
              <Button variant="secondary" rightIcon={<ArrowRight size={16} />}>
                {SITE_CONFIG.cta.secondary}
              </Button>
            </a>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14"
          >
            {SITE_CONFIG.metrics.map((metric, index) => {
              // mapping colors based on the text color tokens to ensure it matches precisely
              const textColors: Record<string, string> = {
                violet: "text-brand-violet",
                emerald: "text-brand-emerald",
                cyan: "text-brand-cyan",
                amber: "text-brand-amber",
              };

              return (
              <motion.div
                key={metric.label}
                variants={fadeUp}
                transition={{ delay: 1.0 + index * 0.12 }}
                className="relative flex flex-col after:absolute after:right-0 after:top-[10%] after:h-[80%] after:w-px after:bg-gradient-to-b after:from-transparent after:via-border after:to-transparent lg:last:after:hidden even:after:hidden lg:even:after:block pr-4"
              >
                <div
                  className={`font-display font-extrabold text-5xl ${textColors[metric.color] || "text-brand-violet"}`}
                >
                  <AnimatedNumber
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    decimals={metric.label === "System Uptime" ? 2 : 0}
                  />
                </div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-text-2 mt-1.5">
                  {metric.label}
                </div>
              </motion.div>
            )})}
          </motion.div>
        </div>

        <div className="order-first lg:order-last flex justify-center items-center relative w-full h-full">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="relative aspect-square w-full max-w-[280px] lg:max-w-[420px] mx-auto rounded-[24px] border border-border bg-gradient-to-br from-surface-2 to-surface-3 z-10"
            style={{
              boxShadow: "0 0 60px rgba(124,58,237,0.15)",
            }}
          >
            {!imgError ? (
              <Image
                src="/images/shivam.jpg"
                alt="Shivam Tiwari"
                fill
                className="object-cover rounded-[24px]"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center rounded-[24px] bg-gradient-to-br from-surface-2 to-surface-3">
                <span className="font-display font-extrabold text-6xl text-brand-violet select-none tracking-tight">
                  ST
                </span>
              </div>
            )}
          </motion.div>

          {/* Floating Accent Cards */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
            className="absolute px-3 py-2 rounded-xl border border-border bg-surface-1/80 backdrop-blur-md shadow-lg flex items-center gap-2 whitespace-nowrap z-20 text-xs font-medium top-4 -right-6 lg:right-0"
          >
            <span>⭐</span>
            <span className="text-text-1">Trusted by engineering leaders</span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.82 }}
            className="absolute px-3 py-2 rounded-xl border border-border bg-surface-1/80 backdrop-blur-md shadow-lg flex items-center gap-2 whitespace-nowrap z-20 text-xs font-medium -bottom-4 -left-6 lg:left-0"
          >
            <span>🚀</span>
            <span className="text-brand-emerald">40% faster release cycles</span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.94 }}
            className="absolute px-3 py-2 rounded-xl border border-border bg-surface-1/80 backdrop-blur-md shadow-lg flex items-center gap-2 whitespace-nowrap z-20 text-xs font-medium top-1/2 -right-10 lg:-right-4"
          >
            <span>⚡</span>
            <span className="text-brand-cyan">99.99% uptime delivered</span>
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="h-px w-full opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent, var(--color-accent) 30%, var(--color-cyan) 70%, transparent)",
        }}
      ></div>
    </section>
  );
}
