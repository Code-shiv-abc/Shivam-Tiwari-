import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Highlights } from "@/components/highlights";
import { Vision } from "@/components/vision";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Highlights />
      <Vision />
      <Contact />
    </>
  );
}
