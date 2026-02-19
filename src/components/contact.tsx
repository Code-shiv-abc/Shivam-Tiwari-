"use client";

import { Section } from "@/components/ui/section";
import { SITE_CONFIG } from "@/lib/constants";
import { Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Contact() {
  return (
    <Section id="contact" className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Get in Touch</h2>
        <p className="mb-8 text-lg text-zinc-400">
          Interested in strategic collaboration or have a question?
        </p>
        <Link
          href={`mailto:${SITE_CONFIG.social.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-lg font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
        >
          <Mail className="h-5 w-5" /> Say Hello
        </Link>
      </motion.div>
    </Section>
  );
}
