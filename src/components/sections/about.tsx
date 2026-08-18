"use client";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { motion } from "framer-motion";
import { useScrollReveal, fadeUp } from "@/lib/animations";

export function About() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <SectionWrapper
      id="about"
      label="ABOUT"
      title="Strategic"
      titleAccent="Leadership"
    >
      <motion.div
        ref={ref as any}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeUp}
        className="text-text-2 font-body text-[16px] max-w-3xl leading-relaxed"
      >
        <p className="mb-4">
          With over a decade of experience in software engineering and leadership, I&apos;ve had the privilege of building and scaling engineering organizations across the globe. My focus has always been on creating resilient, high-performing teams that ship quality software.
        </p>
        <p>
          I specialize in fractional CTO advisory, architectural modernization, and generative AI integration, helping startups and enterprises navigate complex technical landscapes to achieve business objectives.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
