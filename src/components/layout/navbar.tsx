"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn, throttle } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, '_blank');
    }
  };

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 20);
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    const sections = SITE_CONFIG.navItems
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.getElementById(item.href.substring(1)))
      .filter(Boolean) as HTMLElement[];

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-surface-3/80 backdrop-blur-xl border-b border-border-soft py-4"
            : "bg-transparent border-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-20 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-violet flex items-center justify-center text-white font-mono text-sm font-bold">
              ST
            </div>
            <span className="font-display font-semibold text-text text-lg">
              {SITE_CONFIG.name}
            </span>
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {SITE_CONFIG.navItems
              .filter((item) => item.label !== "Book a Call")
              .map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "relative text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "text-brand-violet"
                        : "text-text-2 hover:text-brand-violet"
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-dot"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-violet"
                      />
                    )}
                  </a>
                );
              })}
          </nav>

          {/* Right: CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Button className="hidden md:inline-flex" variant="primary">
              Book a Call
            </Button>
            <button
              className="md:hidden flex items-center justify-center p-2 -mr-2 text-text-2 hover:text-text transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-3/4 max-w-sm bg-surface border-l border-border-soft p-6 shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="font-display font-semibold text-text">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center p-2 -mr-2 text-text-2 hover:text-text transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {SITE_CONFIG.navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "text-lg font-medium transition-colors",
                      activeSection === item.href.substring(1)
                        ? "text-brand-violet"
                        : "text-text-2 hover:text-brand-violet"
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
