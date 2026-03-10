import { SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="flex flex-col items-start justify-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {SITE_CONFIG.name}
        </h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-300 sm:text-2xl md:text-3xl">
          {SITE_CONFIG.role}
        </h2>
        <p className="max-w-2xl text-lg text-gray-500 dark:text-gray-400 sm:text-xl">
          {SITE_CONFIG.description}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row mt-6">
            <Link
                href="#projects"
                className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-black dark:text-gray-50 dark:hover:bg-zinc-900"
            >
                <Github className="mr-2 h-4 w-4" /> GitHub
            </Link>
        </div>
      </div>
    </section>
  );
}
