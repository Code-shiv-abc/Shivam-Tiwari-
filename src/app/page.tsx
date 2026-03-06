import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Highlights } from "@/components/highlights";
import { Activity } from "@/components/activity";
import { Vision } from "@/components/vision";
import { Contact } from "@/components/contact";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Highlights />
      {/* We use React Suspense to stream the dynamic content without blocking the main render */}
      <Suspense fallback={null}>
        <Activity />
      </Suspense>
      <Vision />
      <Contact />
    </>
  );
}
