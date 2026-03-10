import { Code2, Database, Globe, Layout, Server, Sparkles } from "lucide-react";

const SKILLS = [
  { name: "Next.js", icon: Globe },
  { name: "React", icon: Layout },
  { name: "TypeScript", icon: Code2 },
  { name: "Node.js", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "Generative AI", icon: Sparkles },
];

export function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-3xl font-bold tracking-tight">Tech Stack</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {SKILLS.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-zinc-900"
          >
            <skill.icon className="mb-2 h-8 w-8 text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
