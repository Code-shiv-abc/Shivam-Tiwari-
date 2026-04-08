import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/work";
import { Testimonials } from "@/components/sections/Testimonials";
import { Speaking } from "@/components/sections/Speaking";
import { Vision } from "@/components/sections/Vision";

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <Testimonials />
      <Speaking />
      <Vision />
    </main>
  );
}
