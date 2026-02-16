import { Repository } from "@/lib/github";
import { Star } from "lucide-react";
import Link from "next/link";

export function ProjectCard({ project }: { project: Repository }) {
  return (
    <Link
      href={project.html_url}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-zinc-900"
    >
      <div>
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            {project.name}
            </h3>
        </div>
        <p className="mt-2 text-sm text-gray-500 line-clamp-3 dark:text-gray-400">
          {project.description || "No description available."}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
            {project.language && (
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    <span className="mr-1 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                    {project.language}
                </span>
            )}
            <div className="flex items-center text-gray-500 dark:text-gray-400">
                <Star className="mr-1 h-3 w-3" />
                <span className="text-xs">{project.stargazers_count}</span>
            </div>
        </div>
      </div>
    </Link>
  );
}
