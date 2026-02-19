"use client";

import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { VISION } from "@/lib/constants";

export function Vision() {
  return (
    <Section id="vision" className="bg-zinc-900/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest text-zinc-500">
          {VISION.label}
        </h2>
        <p className="text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl">
          &quot;{VISION.quote}&quot;
        </p>
      </motion.div>
    </Section>
  );
}
