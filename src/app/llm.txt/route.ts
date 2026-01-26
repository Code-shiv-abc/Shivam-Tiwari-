import { SITE_CONFIG } from "@/lib/constants";

export const dynamic = 'force-static';

export async function GET() {
  const content = `
${SITE_CONFIG.name}
${SITE_CONFIG.role}

Bio:
${SITE_CONFIG.description}
I am a passionate software engineer dedicated to building robust and scalable web applications. My journey started with a curiosity for how things work on the internet, which evolved into a career bridging the gap between complex backend logic and intuitive frontend experiences. Recently, I have been exploring the intersection of traditional web development and Generative AI.

Skills:
${SITE_CONFIG.geo.knowsAbout.join(", ")}

Links:
GitHub: ${SITE_CONFIG.social.github}
LinkedIn: ${SITE_CONFIG.social.linkedin}
Website: ${SITE_CONFIG.url}
`.trim();

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
