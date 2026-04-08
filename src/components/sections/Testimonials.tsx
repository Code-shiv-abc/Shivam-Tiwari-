"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Card } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/constants";
import { useScrollReveal, fadeUp } from "@/lib/animations";

export function Testimonials() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <SectionWrapper
      id="testimonials"
      label="SOCIAL PROOF"
      title="What Leaders"
      titleAccent="Say"
    >
      <div
        ref={ref}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16"
      >
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ ...fadeUp.visible.transition, delay: index * 0.1 }}
            className="h-full"
          >
            <Card
              hoverable
              accentColor="violet"
              className="h-full flex flex-col bg-surface/50 backdrop-blur-md"
            >
              {/* Top: 5 Gold Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-brand-amber text-brand-amber"
                  />
                ))}
              </div>

              {/* Middle: Quote */}
              <div className="flex-grow mb-8 relative">
                <span className="font-display font-extrabold text-[60px] text-brand-violet leading-[0.5] float-left mr-2 mt-2">
                  &ldquo;
                </span>
                <p className="font-serif italic text-[16px] text-text-2 leading-[1.9]">
                  {testimonial.quote}
                </p>
              </div>

              {/* Bottom: User Info */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-surface-2 flex-shrink-0 flex items-center justify-center border border-border">
                  {/* Using next/image with a fallback condition; if image fails or isn't real, initials could be shown.
                      Since we have placeholder URLs, we can just use the name initials as a fallback when not loading */}
                  <span className="text-sm font-medium text-text-2 absolute z-0">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)}
                  </span>
                  {/* <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover relative z-10" /> */}
                  {/* Since image sources are placeholders and might not exist, keeping it simple with initials for now to prevent broken image icons. We can add Image back when real assets exist. */}
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-text text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="font-sans text-xs text-text-3">
                    {testimonial.title}
                  </p>
                  <p className="font-sans text-[10px] text-text-4 uppercase tracking-wider mt-0.5">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
