import { SITE_CONFIG, HIGHLIGHTS } from "@/lib/constants";

export const dynamic = 'force-static';

export async function GET() {
  const content = `
# Executive Profile: ${SITE_CONFIG.name}

## Role
${SITE_CONFIG.role}

## Summary
${SITE_CONFIG.description}

## Current Focus
Works for: ${SITE_CONFIG.geo.worksFor.name} (${SITE_CONFIG.geo.worksFor.url})
Location: ${SITE_CONFIG.geo.location}

## Key Expertise
${SITE_CONFIG.geo.knowsAbout.map(skill => `- ${skill}`).join("\n")}

## Key Achievements & Highlights
${HIGHLIGHTS.map(h => `### ${h.title}\n${h.description}`).join("\n\n")}

## Education
Alumni of: ${SITE_CONFIG.geo.alumniOf}

## Contact & Social
Website: ${SITE_CONFIG.url}
GitHub: ${SITE_CONFIG.social.github}
LinkedIn: ${SITE_CONFIG.social.linkedin}
Email: ${SITE_CONFIG.social.email}
`.trim();

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
