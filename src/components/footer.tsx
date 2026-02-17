import { SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-black py-12 text-zinc-500">
      <div className="mx-auto flex max-w-[960px] flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link
            href={SITE_CONFIG.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href={SITE_CONFIG.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href={`mailto:${SITE_CONFIG.social.email}`}
            className="hover:text-white transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
