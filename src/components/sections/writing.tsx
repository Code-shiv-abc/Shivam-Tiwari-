"use client";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { motion } from "framer-motion";
import { useScrollReveal, fadeUp } from "@/lib/animations";

export function Writing() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <SectionWrapper
      id="writing"
      label="WRITING"
      title="Essays &"
      titleAccent="Insights"
    >
            <motion.div
        ref={ref as any}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeUp}
      >
<div className="text-text-2 font-body text-[16px] max-w-3xl leading-relaxed">
        <p className="mb-4">
          I write extensively on engineering management, architecture decisions, and the cultural shifts required to build world-class technology organizations.
        </p>
        <p>
          My essays aim to distill complex technical and leadership challenges into practical frameworks that founders and engineering managers can apply immediately.
        </p>
      </div>
      </motion.div>
    </SectionWrapper>
  );
}
