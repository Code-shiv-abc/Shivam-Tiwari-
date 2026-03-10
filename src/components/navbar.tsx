import Link from "next/link";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-black/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center font-bold text-xl tracking-tight">
            {SITE_CONFIG.name}
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {NAV_LINKS.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                    {link.label}
                </Link>
            ))}
        </nav>
        {/* Mobile Menu Button could go here, but keeping it minimal for now as requested */}
      </div>
    </header>
  )
}
