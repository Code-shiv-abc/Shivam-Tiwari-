"use client";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { motion } from "framer-motion";
import { useScrollReveal, fadeUp } from "@/lib/animations";

export function Speaking() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <SectionWrapper
      id="speaking"
      label="SPEAKING"
      title="Keynotes &"
      titleAccent="Workshops"
    >
            <motion.div
        ref={ref as any}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeUp}
      >
<div className="text-text-2 font-body text-[16px] max-w-3xl leading-relaxed">
        <p className="mb-4">
          I regularly speak at industry conferences, internal company summits, and engineering offsites about organizational design, distributed systems, and the evolving role of the CTO.
        </p>
        <p>
          My talks are designed to be actionable, drawing from real-world failures and successes in scaling teams from 50 to 200+ engineers.
        </p>
      </div>
      </motion.div>
    </SectionWrapper>
  );
}
