import { GITHUB_USERNAME, FALLBACK_PROJECTS } from "./constants";

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  html_url: string;
  fork: boolean;
}

export interface GitHubUser {
    avatar_url: string;
    bio: string;
    location: string;
    public_repos: number;
    followers: number;
    html_url: string;
    login: string;
}

export async function getRepos(): Promise<Repository[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        next: { revalidate: 86400 }, // 24 hours
      }
    );

    if (!res.ok) {
        console.error("GitHub API error:", res.status, res.statusText);
        return FALLBACK_PROJECTS;
    }

    const repos: Repository[] = await res.json();

    // Sort by stars and take top 6
    const sorted = repos
        .filter(repo => !repo.fork) // Exclude forks to focus on original work
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6);

    return sorted;
  } catch (error) {
    console.error("Failed to fetch repos:", error);
    return FALLBACK_PROJECTS;
  }
}

export async function getGithubUser(): Promise<GitHubUser | null> {
    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
            next: { revalidate: 86400 }
        });

        if (!res.ok) return null;

        return await res.json();
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return null;
    }
}
