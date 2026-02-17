"use client";

import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";

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
          Vision
        </h2>
        <p className="text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl">
          &quot;Technology is not just about code; it&apos;s about empowering people to solve the world&apos;s most complex problems through elegant, scalable solutions.&quot;
        </p>
      </motion.div>
    </Section>
  );
}
