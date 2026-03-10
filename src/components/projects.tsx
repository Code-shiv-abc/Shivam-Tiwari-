import { Repository } from "@/lib/github";
import { ProjectCard } from "./project-card";

export function Projects({ projects }: { projects: Repository[] }) {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-3xl font-bold tracking-tight">Open Source Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
