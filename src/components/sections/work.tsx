"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Users, Layers, Cloud } from "lucide-react";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { CASE_STUDIES, type CaseStudy } from "@/lib/constants";
import { useScrollReveal, fadeUp, slideRight } from "@/lib/animations";

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

function CaseStudyCard({ study, isHero = false }: { study: CaseStudy; isHero?: boolean }) {
  const [ref, isVisible] = useScrollReveal();
  const Icon = ICONS[study.iconName];

  return (
    <Card
      ref={ref as any}
      hoverable
      padding="lg"
      accentColor={study.accentColor}
      className={`flex flex-col h-full ${isHero ? "lg:col-span-2 lg:flex-row lg:items-stretch lg:gap-10" : "lg:col-span-1"}`}
    >
      <div className={`flex flex-col flex-1 ${isHero ? "lg:w-[60%]" : ""}`}>
        <div className="flex items-center gap-4 mb-6">
          <Badge variant={study.accentColor}>{study.category}</Badge>
          <span className="font-mono text-[10px] uppercase text-text-3 tracking-[0.1em]">{study.eyebrow}</span>
        </div>

        <div className="flex gap-5 mb-6">
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:${GLOW_COLORS[study.accentColor]} ${CONTAINER_BG[study.accentColor]}`}>
            <Icon size={24} className={ACCENT_COLORS[study.accentColor]} />
          </div>
          <h3 className="font-display font-bold text-[20px] md:text-[24px] text-text leading-tight mt-1">{study.title}</h3>
        </div>

        <p className="font-body text-[14px] text-text-2 leading-[1.8] mb-6 max-w-xl">{study.challenge}</p>

        <div className="mb-8 flex-1">
          <span className={`font-mono text-[10px] uppercase tracking-[0.1em] block mb-2 ${ACCENT_COLORS[study.accentColor]}`}>
            THE APPROACH →
          </span>
          <p className="font-body text-[14px] text-text-2 leading-[1.8] max-w-xl">{study.approach}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {study.tags.map((tag) => (
            <Badge key={tag} variant="ghost" size="sm">{tag}</Badge>
          ))}
        </div>
      </div>

      <div className={`mt-8 pt-8 border-t border-border flex ${isHero ? "lg:mt-0 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-10 lg:w-[40%] lg:flex-col lg:justify-center lg:gap-8" : "flex-row flex-wrap gap-y-6"} gap-x-8`}>
        {study.metrics.map((metric, i) => (
          <div key={metric.label} className={isHero ? "" : "flex-1 min-w-[30%]"}>
            <div className={`font-display font-extrabold text-[32px] leading-none mb-2 ${ACCENT_COLORS[study.accentColor]}`}>
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
    </Card>
  );
}

function LogoWall() {
  const logos = [
    "Acme Corp", "Global Tech", "Stark Ind", "Wayne Ent", "Cyberdyne", "Umbrella"
  ];

  return (
    <div className="mt-24 w-full">
      <div className="text-center mb-8">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-3">
          COMPANIES I&apos;VE LED & ADVISED
        </span>
      </div>

      {/* Container with fade edges */}
      <div
        className="w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
        }}
      >
        <div className="flex lg:flex-wrap lg:justify-center overflow-x-auto pb-4 pt-2 -mx-4 px-4 gap-6 no-scrollbar snap-x">
          {logos.map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 snap-center flex items-center justify-center w-[160px] h-[70px] rounded-xl bg-surface-2 border border-border grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 cursor-default"
            >
              <span className="font-display font-bold text-text-2 tracking-tight">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Work() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [card1Ref, card1Visible] = useScrollReveal();
  const [card2Ref, card2Visible] = useScrollReveal();
  const [card3Ref, card3Visible] = useScrollReveal();

  return (
    <SectionWrapper
      id="work"
      label="IMPACT"
      title="Work That"
      titleAccent="Moved the Needle"
    >
      <motion.div
        ref={headerRef as any}
        initial="hidden"
        animate={headerVisible ? "visible" : "hidden"}
        variants={fadeUp}
        className="mb-16"
      >
        <p className="font-body text-[16px] text-text-2 max-w-2xl leading-[1.8]">
          Three stories of engineering transformation — from scaling teams to cutting
          costs to reimagining how software gets built.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          ref={card1Ref as any}
          initial="hidden"
          animate={card1Visible ? "visible" : "hidden"}
          variants={slideRight}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <CaseStudyCard study={CASE_STUDIES[0]} isHero />
        </motion.div>

        <motion.div
          ref={card2Ref as any}
          initial="hidden"
          animate={card2Visible ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ delay: 0.3 }}
        >
          <CaseStudyCard study={CASE_STUDIES[1]} />
        </motion.div>

        <motion.div
          ref={card3Ref as any}
          initial="hidden"
          animate={card3Visible ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ delay: 0.4 }}
        >
          <CaseStudyCard study={CASE_STUDIES[2]} />
        </motion.div>
      </div>

      <LogoWall />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </SectionWrapper>
  );
}
