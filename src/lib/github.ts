import { GITHUB_USERNAME } from "./constants";

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

export async function getPinnedRepos(): Promise<GithubRepo[]> {
  try {
    // We use the search API to find popular repos for the user as a proxy for "pinned"
    // without needing a GraphQL token for this public portfolio.
    const res = await fetch(
      `https://api.github.com/search/repositories?q=user:${GITHUB_USERNAME}&sort=stars&order=desc&per_page=3`,
      {
        next: { revalidate: 86400 }, // Revalidate every 24 hours (ISR)
        headers: {
          Accept: "application/vnd.github.v3+json",
          // Optional: Add Authorization header if rate limits become an issue
          // Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch GitHub repositories:", res.statusText);
      return [];
    }

    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    return [];
  }
}
