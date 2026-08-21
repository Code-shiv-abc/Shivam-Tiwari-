import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content/projects');

export interface ProjectFrontmatter {
  title: string;
  category: string;
  status: 'Live' | 'In Progress' | 'Open Source';
  heroImage: string;
  date: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export async function getProjectBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(contentDir, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}

export async function getAllProjects() {
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir);
  const projects = [];

  for (const file of files) {
    if (file.endsWith('.mdx')) {
      const project = await getProjectBySlug(file);
      if (project) {
        projects.push(project);
      }
    }
  }

  // Sort projects by date descending
  return projects.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}
