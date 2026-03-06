import { Section } from "@/components/ui/section";
import { getPinnedRepos } from "@/lib/github";
import { Github, Star } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Server Component for fetching and displaying data
export async function Activity() {
  const repos = await getPinnedRepos();

  if (!repos || repos.length === 0) {
    return null; // Handle empty state gracefully
  }

  return (
    <Section id="activity">
      <div className="mb-12 md:mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Recent Activity</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo, index) => (
          // Using a wrapper div because we are mapping Server Component children.
          // In a purely static site, we'd wrap this with Framer Motion, but since this
          // involves ISR data fetching, we'll keep the motion client-side logic separate or
          // apply static styles that match the aesthetic.
          <Link key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="h-full block group">
             <Card className={cn("h-full flex flex-col justify-between transition-colors hover:border-white/20 hover:bg-white/[0.03]")}>
               <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors truncate pr-4">{repo.name}</h3>
                    <Github className="h-5 w-5 text-zinc-500" />
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-sm mb-4 line-clamp-3">{repo.description || "No description provided."}</p>
               </div>
               <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
                  {repo.language && (
                     <span className="flex items-center gap-1.5">
                       <span className="h-2 w-2 rounded-full bg-blue-500/80"></span>
                       {repo.language}
                     </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5" />
                    {repo.stargazers_count}
                  </span>
               </div>
             </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
