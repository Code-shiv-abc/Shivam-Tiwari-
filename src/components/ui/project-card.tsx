"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Badge } from "./badge";
import { AnimatedNumber } from "./animated-number";
import { useScrollReveal } from "@/lib/animations";

export interface ProjectCardProps {
  study: {
    slug: string;
    category: string;
    accentColor: "violet" | "cyan" | "emerald" | "amber" | "red";
    iconName: "Users" | "Layers" | "Cloud";
    eyebrow: string;
    title: string;
    challenge: string;
    approach: string;
    metrics: {
      value: number;
      prefix?: string;
      suffix?: string;
      label: string;
    }[];
    tags: string[];
    status?: "Live" | "In Progress" | "Open Source";
  };
  isHero?: boolean;
}

import { Users, Layers, Cloud } from "lucide-react";

const ICONS = {
  Users: Users,
  Layers: Layers,
  Cloud: Cloud,
};

const ACCENT_COLORS = {
  violet: "text-brand-violet",
  cyan: "text-brand-cyan",
  emerald: "text-brand-emerald",
  amber: "text-brand-amber",
  red: "text-brand-red",
};

const BORDER_COLORS = {
  violet: "group-hover:border-brand-violet/50",
  cyan: "group-hover:border-brand-cyan/50",
  emerald: "group-hover:border-brand-emerald/50",
  amber: "group-hover:border-brand-amber/50",
  red: "group-hover:border-brand-red/50",
};

const GLOW_COLORS = {
  violet: "shadow-[0_0_15px_rgba(124,58,237,0.5)]",
  cyan: "shadow-[0_0_15px_rgba(6,182,212,0.5)]",
  emerald: "shadow-[0_0_15px_rgba(16,185,129,0.5)]",
  amber: "shadow-[0_0_15px_rgba(245,158,11,0.5)]",
  red: "shadow-[0_0_15px_rgba(239,68,68,0.5)]",
};

const CONTAINER_BG = {
  violet: "bg-brand-violet/10",
  cyan: "bg-brand-cyan/10",
  emerald: "bg-brand-emerald/10",
  amber: "bg-brand-amber/10",
  red: "bg-brand-red/10",
};

const STATUS_COLORS = {
  "Live": "bg-brand-emerald/20 text-brand-emerald border-brand-emerald/30",
  "In Progress": "bg-brand-amber/20 text-brand-amber border-brand-amber/30",
  "Open Source": "bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30",
};

export const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ study, isHero = false }, ref) => {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [isVisibleRef, isVisible] = useScrollReveal();
    const Icon = ICONS[study.iconName];

    // Subtle 3D tilt effect on hover
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { damping: 30, stiffness: 200 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { damping: 30, stiffness: 200 });

    // Soft glow effect following mouse
    const mouseXR = useSpring(useMotionValue(0), { damping: 40, stiffness: 300 });
    const mouseYR = useSpring(useMotionValue(0), { damping: 40, stiffness: 300 });
    const background = useMotionTemplate`radial-gradient(400px circle at ${mouseXR}px ${mouseYR}px, var(--color-accent-hover), transparent 80%)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();

      // Calculate position from 0 to 1
      const width = rect.width;
      const height = rect.height;
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const xPct = clientX / width - 0.5;
      const yPct = clientY / height - 0.5;

      mouseX.set(xPct);
      mouseY.set(yPct);

      mouseXR.set(clientX);
      mouseYR.set(clientY);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
      mouseXR.set(0);
      mouseYR.set(0);
    };

    // Calculate hover accent color based on study accent
    const getAccentVariable = (color: string) => {
      switch(color) {
        case 'violet': return 'rgba(124, 58, 237, 0.15)';
        case 'cyan': return 'rgba(6, 182, 212, 0.15)';
        case 'emerald': return 'rgba(16, 185, 129, 0.15)';
        case 'amber': return 'rgba(245, 158, 11, 0.15)';
        case 'red': return 'rgba(239, 68, 68, 0.15)';
        default: return 'rgba(255, 255, 255, 0.1)';
      }
    };

    return (
      <div ref={ref} className={cn("h-full", isHero ? "lg:col-span-2" : "lg:col-span-1")}>
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="h-full perspective-1000"
        >
          <Link
            href={`/projects/${study.slug}`}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
              "group relative block h-full overflow-hidden rounded-2xl sm:rounded-[2rem]",
              "bg-surface-2/40 backdrop-blur-xl",
              "border border-border/50",
              "shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
              "transition-all duration-500 hover:-translate-y-2",
              BORDER_COLORS[study.accentColor],
              "p-7 sm:p-10",
              isHero ? "flex flex-col lg:flex-row lg:items-stretch lg:gap-10" : "flex flex-col"
            )}
            style={{
              "--color-accent-hover": getAccentVariable(study.accentColor),
            } as React.CSSProperties}
          >
            {/* Spotlight Glow Effect */}
            <motion.div
              className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background }}
            />

            {/* Top Border Gradient */}
            <div className={cn(
              "absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r opacity-60 transition-opacity duration-300 ease-out group-hover:opacity-100",
              `from-brand-${study.accentColor} to-transparent`
            )} />

            {/* Inner Content with Z-index to stay above glow */}
            <div className="relative z-10 flex flex-col h-full flex-1" style={{ transform: "translateZ(30px)" }}>
              <div className={`flex flex-col flex-1 ${isHero ? "lg:w-[60%]" : ""}`}>
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  <Badge variant={study.accentColor}>{study.category}</Badge>
                  {study.status && (
                    <span className={cn(
                      "px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.1em] rounded-full border",
                      STATUS_COLORS[study.status]
                    )}>
                      {study.status}
                    </span>
                  )}
                  <span className="font-mono text-[10px] uppercase text-text-3 tracking-[0.1em]">{study.eyebrow}</span>
                </div>

                <div className="flex gap-5 mb-6">
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                    CONTAINER_BG[study.accentColor],
                    `group-hover:${GLOW_COLORS[study.accentColor]}`
                  )}>
                    <Icon size={24} className={ACCENT_COLORS[study.accentColor]} />
                  </div>
                  <h3 className="font-display font-bold text-[20px] md:text-[24px] text-text leading-tight mt-1 group-hover:text-brand-white transition-colors">{study.title}</h3>
                </div>

                <p className="font-body text-[14px] text-text-2 leading-[1.8] mb-6 max-w-xl">{study.challenge}</p>

                <div className="mb-8 flex-1">
                  <span className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.1em] block mb-2",
                    ACCENT_COLORS[study.accentColor]
                  )}>
                    THE APPROACH →
                  </span>
                  <p className="font-body text-[14px] text-text-2 max-w-xl">{study.approach}</p>
                </div>
              </div>

              <div ref={isVisibleRef as any} className={cn(
                "mt-auto pt-8 border-t border-border/50 flex",
                isHero ? "lg:mt-0 lg:pt-0 lg:border-t-0 lg:border-l lg:border-border/50 lg:pl-10 lg:w-[40%] lg:flex-col lg:justify-center lg:gap-8" : "flex-row flex-wrap gap-y-6",
                "gap-x-8"
              )}>
                {study.metrics.map((metric, i) => (
                  <div key={metric.label} className={isHero ? "" : "flex-1 min-w-[30%]"}>
                    <div className={cn(
                      "font-display font-extrabold text-[32px] leading-none mb-2",
                      ACCENT_COLORS[study.accentColor]
                    )}>
                      {isVisible ? (
                        <AnimatedNumber
                          value={metric.value}
                          prefix={metric.prefix}
                          suffix={metric.suffix}
                          duration={1800}
                        />
                      ) : (
                        "0"
                      )}
                    </div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-3">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className={cn(
                "flex flex-wrap gap-2",
                isHero ? "lg:absolute lg:bottom-10 lg:left-10" : "mt-8"
              )}>
                {study.tags.map((tag) => (
                  <Badge key={tag} variant="ghost" size="sm" className="bg-surface-3/50 backdrop-blur-sm border-white/5">{tag}</Badge>
                ))}
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";
