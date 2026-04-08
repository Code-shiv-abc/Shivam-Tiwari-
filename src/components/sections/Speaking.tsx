"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Mic, Users, Presentation } from "lucide-react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FEATURED_TALK, TALKS } from "@/lib/constants";
import { useScrollReveal, fadeUp, slideRight } from "@/lib/animations";

const iconMap = {
  Podcast: Mic,
  Panel: Users,
  Talk: Presentation,
};

export function Speaking() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <SectionWrapper
      id="speaking"
      label="SPEAKING & MEDIA"
      title="On Stage &"
      titleAccent="On Record"
    >
      <p className="max-w-2xl text-text-2 text-lg mb-16">
        Selected talks, podcasts, and panel appearances on engineering leadership, AI, and organizational design.
      </p>

      <div
        ref={ref}
        className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(300px,400px)] gap-8"
      >
        {/* Left Column: Featured Talk */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="h-full"
        >
          <Card
            accentColor="cyan"
            hoverable
            className="h-full flex flex-col bg-surface/50 backdrop-blur-md"
          >
            {/* Visual Placeholder */}
            <div className="relative w-full aspect-video rounded-lg bg-surface-2 mb-8 overflow-hidden group/video cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 to-brand-violet/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 transition-transform duration-300 group-hover/video:scale-110">
                  <Play className="w-6 h-6 text-brand-cyan ml-1 fill-brand-cyan" />
                </div>
              </div>
            </div>

            <div className="flex-grow flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="cyan" size="sm">
                  {FEATURED_TALK.tag}
                </Badge>
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-3">
                  {FEATURED_TALK.conference}
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl text-text mb-3">
                {FEATURED_TALK.title}
              </h3>

              <p className="text-text-2 mb-6 flex-grow">
                {FEATURED_TALK.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-6 border-t border-border">
                <span className="font-mono text-[11px] text-text-3 uppercase tracking-wider">
                  {FEATURED_TALK.stats}
                </span>
                <Button variant="ghost" className="text-brand-cyan hover:text-brand-cyan/80">
                  {FEATURED_TALK.ctaText}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Right Column: Talks List */}
        <div className="flex flex-col gap-4">
          {TALKS.map((talk, index) => {
            const Icon = iconMap[talk.iconType] || Presentation;

            return (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                transition={{ ...fadeUp.visible.transition, delay: 0.2 + index * 0.1 }}
              >
                <Card
                  hoverable
                  padding="sm"
                  className="flex items-start gap-4 bg-surface/30 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center flex-shrink-0 border border-border">
                    <Icon className="w-4 h-4 text-text-2" />
                  </div>

                  <div className="flex-grow min-w-0">
                    <h4 className="font-sans font-semibold text-text text-base mb-1 truncate">
                      {talk.title}
                    </h4>
                    <p className="font-sans text-sm text-text-2 mb-2">
                      {talk.conference}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-text-4 uppercase tracking-wider">
                        {talk.date}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="font-mono text-[10px] text-text-3 uppercase tracking-wider">
                        {talk.badge}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
