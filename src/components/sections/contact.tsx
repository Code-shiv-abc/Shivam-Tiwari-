"use client";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { motion } from "framer-motion";
import { useScrollReveal, fadeUp } from "@/lib/animations";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";
import { Calendar } from "lucide-react";

export function Contact() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <SectionWrapper
      id="contact"
      label="CONTACT"
      title={<AnimatedText text="Let's Build" mode="word" />}
      titleAccent={<AnimatedText text="Together" mode="word" delay={0.2} />}
    >
            <motion.div
        ref={ref as any}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeUp}
      >
<div className="text-text-2 font-body text-[16px] max-w-2xl leading-relaxed mb-8">
        <p>
          Whether you&apos;re looking for a fractional CTO, need guidance on scaling your engineering organization, or want to discuss a modernization initiative, I&apos;m here to help.
        </p>
      </div>
      <a
        href={`mailto:${SITE_CONFIG.social.email}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="primary" rightIcon={<Calendar size={16} />}>
          Book a Discovery Call
        </Button>
      </a>
      </motion.div>
    </SectionWrapper>
  );
}
