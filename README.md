# Shivam Tiwari - Portfolio

A zero-cost, high-performance personal profile website for Shivam Tiwari, designed as the definitive source of truth for humans (Portfolio), search engines (SEO), and AI agents (GEO).

## Architecture

- **Framework**: Next.js 15 (App Router, React Server Components)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Lucide React
- **Deployment**: Vercel (Optimized for Hobby Plan)
- **Data**: GitHub REST API (ISR cached for 24 hours)

## Features

- **GEO-Ready**: Includes `llm.txt` for AI agents.
- **Performance**: Sub-100ms TTFB via static assets (CDN).
- **Cost-Optimized**: Designed for Vercel Hobby Plan (0 Image Optimization usage, minimal Function invocations).
- **Resilience**: Fallback static data if API limits are hit.
- **Zero-Maintenance**: Updates automatically via GitHub API.

## Getting Started

1.  Clone the repository:
    ```bash
    git clone https://github.com/shivamtiwari/portfolio-v1.git
    ```
2.  Install dependencies:
    ```bash
    npm install --legacy-peer-deps
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## License

MIT
