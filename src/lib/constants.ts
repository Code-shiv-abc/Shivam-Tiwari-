export const GITHUB_USERNAME = "shivamtiwari"; // Change this to the actual GitHub username

export const SITE_CONFIG = {
  name: "Shivam Tiwari",
  role: "Web Developer & AI Enthusiast",
  description: "Bridging the gap between traditional full-stack engineering and modern generative AI workflows.",
  url: "https://shivamtiwari.com", // Placeholder, will update if actual URL is known or generic
  social: {
    github: "https://github.com/shivamtiwari", // Placeholder
    linkedin: "https://linkedin.com/in/shivamtiwari", // Placeholder
    email: "shivam@example.com", // Placeholder
  },
  geo: {
    type: "Person",
    knowsAbout: ["Web Development", "Generative AI", "Next.js", "TypeScript", "React", "Node.js"],
    alumniOf: "University of Example", // Placeholder
  },
};

export const FALLBACK_PROJECTS = [
  {
    id: 1,
    name: "portfolio-v1",
    description: "My personal portfolio built with Next.js and Tailwind CSS.",
    stargazers_count: 120,
    language: "TypeScript",
    topics: ["nextjs", "react", "tailwindcss"],
    html_url: "https://github.com/shivamtiwari/portfolio-v1",
    fork: false,
  },
  {
    id: 2,
    name: "ai-wrapper",
    description: "A wrapper for various AI APIs to simplify integration.",
    stargazers_count: 85,
    language: "Python",
    topics: ["python", "ai", "wrapper"],
    html_url: "https://github.com/shivamtiwari/ai-wrapper",
    fork: false,
  },
  {
    id: 3,
    name: "geo-optimizer",
    description: "Tools for optimizing content for Generative Engine Optimization.",
    stargazers_count: 200,
    language: "JavaScript",
    topics: ["seo", "geo", "javascript"],
    html_url: "https://github.com/shivamtiwari/geo-optimizer",
    fork: false,
  },
];

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
];
