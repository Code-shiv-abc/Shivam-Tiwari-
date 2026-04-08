export const GITHUB_USERNAME = "shivamtiwari";

export interface CaseStudyMetric {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface CaseStudy {
  category: string;
  accentColor: "violet" | "cyan" | "emerald" | "amber" | "red";
  iconName: "Users" | "Layers" | "Cloud";
  eyebrow: string;
  title: string;
  challenge: string;
  approach: string;
  metrics: CaseStudyMetric[];
  tags: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    category: "Strategic Leadership",
    accentColor: "violet",
    iconName: "Users",
    eyebrow: "Enterprise · 3 Continents · 4 Years",
    title: "Built a 200-Person Engineering Organization From 50",
    challenge: "A fast-scaling company needed to grow its engineering team 4× across North America, Europe, and APAC — while maintaining quality, velocity, and culture.",
    approach: "Redesigned the hiring pipeline, created a distributed leadership model, established psychological safety frameworks, and built an onboarding program that got engineers productive in 2 weeks instead of 8.",
    metrics: [
      { value: 50, suffix: "→200+", label: "Engineers" },
      { value: 3, label: "Continents" },
      { value: 60, suffix: "%↓", label: "Onboarding Time" },
    ],
    tags: ["Org Design", "Distributed Teams", "Engineering Culture"],
  },
  {
    category: "Technical Architecture",
    accentColor: "cyan",
    iconName: "Layers",
    eyebrow: "Frontend Platform · 12-month Migration",
    title: "40% Faster Releases Through Micro-Frontend Architecture",
    challenge: "A monolithic frontend was causing 6-hour deploys, cross-team conflicts, and 3× more regressions than the industry average.",
    approach: "Pioneered company-wide adoption of micro-frontends. Created the migration playbook, built the shared infrastructure, and led a 12-person platform team through a zero-downtime transition.",
    metrics: [
      { value: 40, suffix: "%", label: "Faster Releases" },
      { value: 60, suffix: "%↓", label: "Regressions" },
      { value: 6, suffix: "hrs→45min", label: "Deploy Time" },
    ],
    tags: ["Micro-Frontends", "Platform Engineering", "DevEx"],
  },
  {
    category: "Business & Infrastructure",
    accentColor: "emerald",
    iconName: "Cloud",
    eyebrow: "Cloud Infrastructure · 18-month Initiative",
    title: "$2M Annual Savings Through Cloud-Native Migration",
    challenge: "Legacy on-premise infrastructure was costing $3.2M/year, causing reliability issues, and blocking the team from adopting modern engineering practices.",
    approach: "Led a full cloud migration initiative: vendor evaluation, architectural redesign, phased migration with zero production incidents, and SRE team formation to maintain the new infrastructure.",
    metrics: [
      { value: 2, prefix: "$", suffix: "M", label: "Annual Savings" },
      { value: 99.99, suffix: "%", label: "Uptime Achieved" },
      { value: 0, label: "Production Incidents" },
    ],
    tags: ["Cloud Migration", "Cost Optimization", "SRE"],
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  stars: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Shivam transformed how we think about engineering velocity. In 18 months, our team went from constant firefighting to proactive ownership. He didn't just scale the team — he changed the culture.",
    name: "Sarah Chen",
    title: "CTO, Series B Fintech",
    company: "Placeholder · Add Real Logo",
    avatar: "/images/testimonials/sarah.jpg",
    stars: 5,
  },
  {
    quote: "The cloud migration Shivam led saved us $2M but more importantly gave us back our engineering capacity. His ability to hold technical vision AND business impact simultaneously is rare.",
    name: "Marcus Reid",
    title: "VP Engineering, Enterprise SaaS",
    company: "Placeholder · Add Real Name",
    avatar: "/images/testimonials/marcus.jpg",
    stars: 5,
  },
  {
    quote: "I've worked with a lot of engineering leaders. Shivam is the only one I've seen who can walk into a room with the board and the terminal, and be credible in both.",
    name: "Priya Nair",
    title: "Founder & CEO",
    company: "Placeholder · Add Real Name",
    avatar: "/images/testimonials/priya.jpg",
    stars: 5,
  },
];

export interface FeaturedTalk {
  tag: string;
  conference: string;
  title: string;
  description: string;
  stats: string;
  ctaText: string;
  ctaLink: string;
}

export const FEATURED_TALK: FeaturedTalk = {
  tag: "FEATURED TALK",
  conference: "QCon San Francisco 2024",
  title: "Scaling Engineering Culture Across Time Zones",
  description: "A deep-dive into the systems, rituals, and hard lessons from building distributed engineering teams that stay cohesive.",
  stats: "1,200+ Attendees · 45 min · Full Recording Available",
  ctaText: "Watch Recording →",
  ctaLink: "#", // Placeholder
};

export interface Talk {
  iconType: "Podcast" | "Panel" | "Talk";
  title: string;
  conference: string;
  date: string;
  badge: string;
}

export const TALKS: Talk[] = [
  {
    iconType: "Podcast",
    title: "The AI Integration Playbook",
    conference: "Engineering Leadership Podcast",
    date: "Oct 2024",
    badge: "Podcast",
  },
  {
    iconType: "Panel",
    title: "Engineering Leadership at Scale",
    conference: "Scale Summit 2024",
    date: "Aug 2024",
    badge: "Panel",
  },
  {
    iconType: "Talk",
    title: "Micro-Frontends in Production",
    conference: "Frontend Masters",
    date: "Jun 2024",
    badge: "Conference Talk",
  },
];

export interface VisionQuoteConfig {
  label: string;
  quote: string;
  highlights: string[];
  attribution: string;
}

export const VISION_QUOTE: VisionQuoteConfig = {
  label: "PHILOSOPHY",
  quote: "Technology is not just about code; it's about empowering people to solve the world's most complex problems through elegant, scalable solutions.",
  highlights: ["empowering people", "elegant, scalable solutions"],
  attribution: "— Shivam Tiwari",
};

export const SITE_CONFIG = {
  name: "Shivam Tiwari",
  role: "Global Technology Leader & Strategic Advisor",
  title: "Global Technology Leader & Strategic Advisor", // alias for compatibility
  headline: "I build engineering organizations that ship faster, fail less, and scale globally.",
  description: "I build engineering organizations that ship faster, fail less, and scale globally.", // fall-back
  url: "https://shivamtiwari.com",
  social: {
    github: "https://github.com/shivamtiwari",
    linkedin: "https://linkedin.com/in/shivamtiwari",
    email: "contact@shivamtiwari.com",
  },
  geo: {
    type: "Person",
    knowsAbout: [
      "Strategic Leadership",
      "Cloud Architecture",
      "Generative AI",
      "Organizational Design",
      "Digital Transformation",
    ],
    alumniOf: "Stanford University",
  },
  navItems: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Vision", href: "#vision" },
    { label: "Speaking", href: "#speaking" },
    { label: "Writing", href: "#writing" },
    { label: "Book a Call", href: "#contact" },
  ],
};
