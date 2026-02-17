import { SITE_CONFIG } from "@/lib/constants";

export const dynamic = 'force-static';

export async function GET() {
  const content = `
${SITE_CONFIG.name}
${SITE_CONFIG.role}

${SITE_CONFIG.description}

Expertise:
${SITE_CONFIG.geo.knowsAbout.join(", ")}

Education:
${SITE_CONFIG.geo.alumniOf}

Links:
Website: ${SITE_CONFIG.url}
GitHub: ${SITE_CONFIG.social.github}
LinkedIn: ${SITE_CONFIG.social.linkedin}
Email: ${SITE_CONFIG.social.email}
`.trim();

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
