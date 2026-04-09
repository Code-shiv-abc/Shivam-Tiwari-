import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

// Dynamic imports for sections below the fold to improve initial load performance
const Work = dynamic(() => import("@/components/sections/work").then(mod => mod.Work), {
  ssr: true,
});
const About = dynamic(() => import("@/components/sections/about").then(mod => mod.About), {
  ssr: true,
});
const Vision = dynamic(() => import("@/components/sections/vision").then(mod => mod.Vision), {
  ssr: true,
});
const Speaking = dynamic(() => import("@/components/sections/speaking").then(mod => mod.Speaking), {
  ssr: true,
});
const Writing = dynamic(() => import("@/components/sections/writing").then(mod => mod.Writing), {
  ssr: true,
});
const Contact = dynamic(() => import("@/components/sections/contact").then(mod => mod.Contact), {
  ssr: true,
});

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Work />
      <Vision />
      <Speaking />
      <Writing />
      <Contact />
    </main>
  );
}
