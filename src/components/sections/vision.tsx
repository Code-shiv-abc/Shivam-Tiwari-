"use client";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { motion } from "framer-motion";
import { useScrollReveal, fadeUp } from "@/lib/animations";

export function Vision() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <SectionWrapper
      id="vision"
      label="VISION"
      title="Engineering"
      titleAccent="Philosophy"
    >
            <motion.div
        ref={ref as any}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeUp}
      >
<div className="text-text-2 font-body text-[16px] max-w-3xl leading-relaxed">
        <p className="mb-4">
          The future of software isn&apos;t just about writing code—it&apos;s about building systems that empower humans to do their best work. I believe in pragmatic architecture, rigorous testing, and an unyielding commitment to developer experience.
        </p>
        <p>
          As AI begins to reshape the landscape of engineering, I&apos;m focused on integrating generative tools safely and effectively, ensuring that technology amplifies human creativity rather than replacing it.
        </p>
      </div>
      </motion.div>
    </SectionWrapper>
  );
}
