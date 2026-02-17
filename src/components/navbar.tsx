import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Vision", href: "#vision" },
  { label: "Work", href: "#highlights" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-md supports-[backdrop-filter]:bg-black/60">
      <div className="mx-auto flex h-16 max-w-[960px] items-center justify-between px-6">
        <Link href="/" className="text-sm font-medium tracking-tight text-white hover:opacity-80 transition-opacity">
          {SITE_CONFIG.name}
        </Link>
        <nav className="hidden md:flex gap-8 text-sm text-zinc-400">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Mobile Nav Placeholder - simple link for now */}
        <nav className="flex md:hidden gap-4 text-xs text-zinc-400">
            <Link href="#contact" className="hover:text-white">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
