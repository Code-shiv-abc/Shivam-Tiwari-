"use client";

import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";

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
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">About</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6 text-lg text-zinc-400 font-light leading-relaxed"
        >
          <p>
            With over 15 years of experience leading engineering teams at global scale,
            I specialize in building resilient systems and high-performing cultures.
            My approach combines technical depth with strategic vision, ensuring that technology serves business goals.
          </p>
          <p>
            Currently, I advise high-growth startups and enterprises on digital transformation,
            AI integration, and organizational design. I am passionate about mentorship and
            fostering environments where innovation thrives.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
