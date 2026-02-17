"use client";

import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const HIGHLIGHTS = [
  {
    title: "Strategic Leadership",
    description: "Scaled engineering organization from 50 to 200+ across 3 continents, establishing a culture of psychological safety and excellence."
  },
  {
    title: "Technical Innovation",
    description: "Pioneered the adoption of micro-frontends resulting in 40% faster release cycles and reduced regressions by 60%."
  },
  {
    title: "Business Impact",
    description: "Led cloud migration initiative saving $2M annually in infrastructure costs while improving system availability to 99.99%."
  },
];

export function Highlights() {
  return (
    <Section id="highlights">
       <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Work Highlights</h2>
        </motion.div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {HIGHLIGHTS.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="h-full"
          >
            <Card className="h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">{item.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
