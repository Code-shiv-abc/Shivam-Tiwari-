import React from "react";

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

export const LOGO_WALL = [
  "Acme Corp", "Global Tech", "Stark Ind", "Wayne Ent", "Cyberdyne", "Umbrella"
];

export const SITE_CONFIG = {
  name: "Shivam Tiwari",
  role: "Global Technology Leader & Strategic Advisor",
  title: "Global Technology Leader & Strategic Advisor",
  headline: "I build engineering organizations that ship faster, fail less, and scale globally.",
  description: "I build engineering organizations that ship faster, fail less, and scale globally.",
  url: "https://shivamtiwari.com",
  badge: "Available for Advisory & Board Roles · 2026",
  gradientWord: "faster.",
  tagline: (
    <>
      15 years scaling engineering teams across <strong>3 continents</strong>. I
      help high-growth companies cut costs, accelerate delivery, and build
      cultures where <strong>exceptional engineers choose to stay.</strong>
    </>
  ),
  cta: {
    primary: "Book a Strategy Call",
    calendlyUrl: "https://calendly.com/shivamtiwari",
    secondary: "View My Work",
  },
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
  metrics: [
    {
      value: 200,
      prefix: "",
      suffix: "+",
      label: "Engineers Led",
      color: "violet",
      decimals: 0,
    },
    {
      value: 2,
      prefix: "$",
      suffix: "M Saved",
      label: "Cost Reduction",
      color: "emerald",
      decimals: 0,
    },
    {
      value: 99.99,
      prefix: "",
      suffix: "%",
      label: "System Uptime",
      color: "cyan",
      decimals: 2,
    },
    {
      value: 40,
      prefix: "",
      suffix: "%↑",
      label: "Release Velocity",
      color: "amber",
      decimals: 0,
    },
  ],
};
