"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ProjectCard } from "@/components/ui/project-card";
import { CASE_STUDIES, LOGO_WALL, type CaseStudy } from "@/lib/site-config";
import { useScrollReveal, fadeUp, slideRight } from "@/lib/animations";
import { StaggerReveal, StaggerItem } from "@/components/ui/stagger-reveal";
import { AnimatedText } from "@/components/ui/animated-text";


function LogoWall() {
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
        <StaggerReveal className="flex lg:flex-wrap lg:justify-center overflow-x-auto pb-4 pt-2 -mx-4 px-4 gap-6 no-scrollbar snap-x">
          {LOGO_WALL.map((name, i) => (
            <StaggerItem
              key={i}
              className="flex-shrink-0 snap-center flex items-center justify-center w-[160px] h-[70px] rounded-xl bg-surface-2 border border-border grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 cursor-default"
            >
              <span className="font-display font-bold text-text-2 tracking-tight">{name}</span>
            </StaggerItem>
          ))}
        </StaggerReveal>
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
      title={<AnimatedText text="Work That" mode="word" />}
      titleAccent={<AnimatedText text="Moved the Needle" mode="word" delay={0.2} />}
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

      <StaggerReveal className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StaggerItem className="lg:col-span-2">
          <ProjectCard study={CASE_STUDIES[0]} isHero />
        </StaggerItem>
        <StaggerItem>
          <ProjectCard study={CASE_STUDIES[1]} />
        </StaggerItem>
        <StaggerItem>
          <ProjectCard study={CASE_STUDIES[2]} />
        </StaggerItem>
      </StaggerReveal>

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
