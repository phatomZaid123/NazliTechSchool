"use client";

import { useState, useEffect, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import NazliLogo from "@/assets/NazliLogo.png";

type SectionId = "video-feed" | "courses" | "curriculum" | "simulation" | "apps" | "pricing" | "testimonials" | "articles" | "about" | "contact";

interface NavItem {
  label: string;
  href: `#${string}`;
  sectionId?: SectionId;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#courses", sectionId: "courses" },
  { label: "Simulation", href: "#simulation", sectionId: "simulation" },
  { label: "Apps", href: "#apps", sectionId: "apps" },
  { label: "Pricing", href: "#pricing", sectionId: "pricing" },
  { label: "Articles", href: "#articles", sectionId: "articles" },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

export function Navbar({
  onNavigate,
}: {
  onNavigate?: (sectionId: SectionId, count?: number) => void;
} = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<`#${string}`>("#home");

  const navigateToSection = (href: `#${string}`, sectionId?: SectionId) => {
    const targetId = href.slice(1);

    // Trigger preloading when user navigates
    if (sectionId) {
      onNavigate?.(sectionId, 2);
      // Also try global preload function if available
      const preloadFn = (window as any).__preloadLandingSectionsAhead;
      if (preloadFn) {
        preloadFn(sectionId, 2);
      }
    }

    const scrollToTarget = (attempt: number) => {
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });

        window.history.replaceState(null, "", href);
        setActiveLink(href);
        return;
      }

      if (attempt < 14) {
        window.setTimeout(() => scrollToTarget(attempt + 1), 120);
      }
    };

    scrollToTarget(0);
  };

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: `#${string}`,
    sectionId?: SectionId,
  ) => {
    event.preventDefault();
    navigateToSection(href, sectionId);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            setActiveLink(`#${entry.target.id}` as `#${string}`);
          }
        });
      },
      { rootMargin: "-22% 0px -52% 0px", threshold: [0.35, 0.5] },
    );

    const observedElements = new Set<Element>();

    const syncObservedSections = () => {
      let allObserved = true;
      navItems.forEach((item) => {
        const section = document.querySelector(item.href);
        if (section && !observedElements.has(section)) {
          observer.observe(section);
          observedElements.add(section);
        }
        if (!section) {
          allObserved = false;
        }
      });

      return allObserved;
    };

    const initiallySynced = syncObservedSections();
    let observerSync: number | null = null;

    if (!initiallySynced) {
      observerSync = window.setInterval(() => {
        const isFullySynced = syncObservedSections();
        if (isFullySynced && observerSync) {
          window.clearInterval(observerSync);
          observerSync = null;
        }
      }, 1200);
    }

    return () => {
      if (observerSync) {
        window.clearInterval(observerSync);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <header className="fixed left-0 right-0 top-10 md:top-11 z-50 px-4 md:px-6">
      <div
        className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-200 ${
          isScrolled
            ? "border-white/15 shadow-[0_14px_38px_-22px_rgba(0,0,0,0.8)]"
            : "border-white/10 bg-nazli-purple/[0.5] hover:bg-nazli-purple/[0.7]"
        } backdrop-blur-xl`}
      >
        <div className="px-4 md:px-6 py-3 flex items-center justify-between gap-3">
          <a
            href="#home"
            onClick={(event) => handleNavClick(event, "#home")}
            className="relative z-50 shrink-0 transition-transform duration-150 hover:scale-[1.02] active:scale-[0.99]"
          >
            <img
              src={NazliLogo}
              alt="Nazli Logo"
              className="h-9 md:h-10 lg:h-20 w-auto object-contain"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-nazli-purple/[0.6] hover:bg-nazli-purple/[0.7] px-2 py-1.5">
            {navItems.map((item) => {
              const isActive = activeLink === item.href;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href, item.sectionId)}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-150 ${
                    isActive
                      ? "text-white"
                      : "text-white/65 hover:text-amber-200"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/60 to-amber-500/35 border border-white/10"
                      transition={{
                        type: "spring",
                        stiffness: 340,
                        damping: 28,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://calendar.app.google/eq7krfDvWy73Gk8o9"
              className="relative z-10 inline-flex w-full items-center justify-center rounded-xl border border-nazli-golden/40 bg-linear-to-r from-nazli-purple/85 to-nazli-golden/75 px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:from-nazli-purple hover:to-nazli-golden hover:shadow-lg hover:shadow-nazli-golden/20"
            >
              <span className="flex">
                Book Call <ArrowUpRight size={15} />
              </span>
            </a>
          </div>

          <div className="lg:hidden text-[10px] uppercase tracking-[0.22em] text-white/55 font-semibold">
            Nazli Tech
          </div>
        </div>
      </div>

      <div className="fixed bottom-3 left-3 right-3 z-50 lg:hidden">
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/12 bg-[#09090f]/95 backdrop-blur-xl shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)] px-2 py-2">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {navItems.map((item) => {
              const isActive = activeLink === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href, item.sectionId)}
                  className={`shrink-0 px-3 py-2 text-xs font-semibold rounded-xl transition-colors duration-150 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600/60 to-amber-500/35 text-white"
                      : "text-white/70 hover:text-amber-200"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
