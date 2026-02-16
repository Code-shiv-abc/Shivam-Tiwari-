import { SITE_CONFIG } from "@/lib/constants";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link
              href={SITE_CONFIG.social.github}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href={`mailto:${SITE_CONFIG.social.email}`}
              className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
          <div className="text-xs text-gray-400">
            Built with Next.js & Vercel
          </div>
        </div>
      </div>
    </footer>
  );
}
