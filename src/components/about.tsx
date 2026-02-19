"use client";

import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "@/lib/constants";

export function About() {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{ABOUT_CONTENT.title}</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6 text-lg text-zinc-400 font-light leading-relaxed"
        >
          {ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
