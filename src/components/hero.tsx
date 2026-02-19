"use client";

import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-black to-black opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex max-w-[960px] flex-col items-center text-center"
      >
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl">
          {SITE_CONFIG.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl md:text-2xl font-light">
          {SITE_CONFIG.role}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <Link href="#about" aria-label="Scroll to About section">
            <ArrowDown className="h-6 w-6 text-zinc-600 hover:text-white transition-colors animate-pulse" />
        </Link>
      </motion.div>
    </section>
  );
}
