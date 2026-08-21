import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ExternalLink, Github, ChevronRight, ChevronLeft } from "lucide-react";

import { getAllProjects, getProjectBySlug } from "@/lib/mdx";
import { SITE_CONFIG, CASE_STUDIES } from "@/lib/site-config";
import { Badge } from "@/components/ui/badge";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.frontmatter.title} - Projects`,
    description: project.frontmatter.title,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.title,
      type: "article",
      url: `${SITE_CONFIG.url}/projects/${resolvedParams.slug}`,
      images: [
        {
          url: project.frontmatter.heroImage,
          width: 1200,
          height: 630,
          alt: project.frontmatter.title,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Get matching case study info for extra context if it exists
  const caseStudyContext = CASE_STUDIES.find((cs) => cs.slug === resolvedParams.slug);
  const allProjects = await getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === resolvedParams.slug);
  const prevProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;
  const nextProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;

  return (
    <article className="min-h-screen bg-background pb-20 pt-32">
      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-surface-2">
        <div className="h-full bg-accent origin-left scale-x-0" id="reading-progress" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-text-3 hover:text-brand-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Work
        </Link>

        <header className="mb-16">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Badge variant="ghost" className="border-border">
              {project.frontmatter.category}
            </Badge>
            <span className="text-xs font-mono uppercase tracking-widest text-text-3 px-2 py-1 rounded-full border border-border">
              {project.frontmatter.status}
            </span>
            <span className="text-sm text-text-3 font-mono">
              {new Date(project.frontmatter.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-8">
            {project.frontmatter.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-border/50">
            {project.frontmatter.techStack.map((tech) => (
              <span key={tech} className="text-sm font-mono text-text-2">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-8">
            {project.frontmatter.githubUrl && (
               <a href={project.frontmatter.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg font-medium px-5 py-2.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background group cursor-pointer bg-transparent border border-border text-foreground hover:border-accent hover:text-accent">
                   <Github className="w-4 h-4" />
                   View Source
                 </a>
            )}
            {project.frontmatter.liveUrl && (
               <a href={project.frontmatter.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg font-medium px-5 py-2.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background group cursor-pointer bg-accent text-white hover:bg-accent/90 hover:shadow-[0_0_20px_var(--color-accent)]">
                   <ExternalLink className="w-4 h-4" />
                   Live Demo
                 </a>
            )}
          </div>
        </header>

        <figure className="relative aspect-video w-full mb-16 rounded-2xl overflow-hidden border border-border">
          <Image
            src={project.frontmatter.heroImage}
            alt={project.frontmatter.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </figure>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-brand-cyan hover:prose-a:text-brand-cyan/80">
          <MDXRemote
            source={project.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              }
            }}
            components={{
              img: (props: any) => (
                <span className="relative block aspect-video w-full my-8 rounded-xl overflow-hidden border border-border">
                  <Image
                    src={props.src}
                    alt={props.alt || ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </span>
              ),
            }}
          />
        </div>

        {/* Project Navigation */}
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-24 pt-10 border-t border-border">
          <div className="w-full sm:w-1/2">
            {prevProject && (
              <Link href={`/projects/${prevProject.slug}`} className="group flex items-start gap-4 p-4 rounded-xl hover:bg-surface-2 transition-colors">
                <div className="flex-shrink-0 mt-1 text-text-3 group-hover:text-brand-white transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-text-3 mb-1 uppercase tracking-wider">Previous Project</div>
                  <div className="font-display font-medium text-brand-white group-hover:text-brand-cyan transition-colors line-clamp-2">
                    {prevProject.frontmatter.title}
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div className="w-full sm:w-1/2 text-right">
            {nextProject && (
              <Link href={`/projects/${nextProject.slug}`} className="group flex items-start justify-end gap-4 p-4 rounded-xl hover:bg-surface-2 transition-colors text-right">
                <div className="flex flex-col items-end text-right">
                  <div className="text-xs font-mono text-text-3 mb-1 uppercase tracking-wider">Next Project</div>
                  <div className="font-display font-medium text-brand-white group-hover:text-brand-cyan transition-colors line-clamp-2">
                    {nextProject.frontmatter.title}
                  </div>
                </div>
                <div className="flex-shrink-0 mt-1 text-text-3 group-hover:text-brand-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            )}
          </div>
        </nav>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('scroll', function() {
              var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
              var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
              var scrolled = (winScroll / height) * 100;
              var progress = document.getElementById('reading-progress');
              if (progress) {
                progress.style.transform = 'scaleX(' + (scrolled / 100) + ')';
              }
            }, { passive: true });
          `,
        }}
      />
    </article>
  );
}
