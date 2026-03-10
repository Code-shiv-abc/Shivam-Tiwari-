import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Stack } from "@/components/stack";
import { Projects } from "@/components/projects";
import { Connect } from "@/components/connect";
import { getRepos } from "@/lib/github";

export default async function Home() {
  const projects = await getRepos();

  return (
    <>
      <Hero />
      <About />
      <Stack />
      <Projects projects={projects} />
      <Connect />
    </>
  );
}
