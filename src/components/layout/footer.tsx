import { Github, Linkedin, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-soft py-10 max-w-7xl mx-auto px-6 lg:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Copyright */}
        <div className="text-text-3 font-mono text-sm">
          &copy; {currentYear} {SITE_CONFIG.name}
        </div>

        {/* Center: Tagline */}
        <div className="font-display italic text-text-2 text-center text-sm md:text-base">
          &quot;Building the future, one team at a time.&quot;
        </div>

        {/* Right: Social Links */}
        <div className="flex items-center gap-6">
          <a
            href={SITE_CONFIG.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-text-3 hover:text-brand-violet transition-colors duration-300"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={SITE_CONFIG.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="text-text-3 hover:text-brand-violet transition-colors duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${SITE_CONFIG.social.email}`}
            aria-label="Email Contact"
            className="text-text-3 hover:text-brand-violet transition-colors duration-300"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
