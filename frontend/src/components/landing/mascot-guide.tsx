"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Sparkles, X } from "lucide-react";

const mascotSections = [
  {
    id: "home",
    x: 18,
    tip: "Welcome to Nazli Tech School. Start with courses or preview the curriculum.",
  },
  {
    id: "courses",
    x: 28,
    tip: "Each course card opens into a compact detail view with Udemy, booking, pricing, and video links.",
  },
  {
    id: "simulation",
    x: 43,
    tip: "Pick a role, subject, course, and lesson. Search brings up the matching video and worksheet resources.",
  },
  {
    id: "apps",
    x: 56,
    tip: "The app requests use email links, so the prototype stays frontend-only.",
  },
  {
    id: "videos",
    x: 66,
    tip: "This is where testimonials, trailers, lessons, and simulation-class videos can live.",
  },
  {
    id: "pricing",
    x: 73,
    tip: "Pricing stays simple: self-paced, group, and 1-on-1 learning options.",
  },
  {
    id: "articles",
    x: 80,
    tip: "Articles show the latest updates first and can be filtered by category.",
  },
  {
    id: "about",
    x: 86,
    tip: "A light school story section keeps the founder and co-founder space ready.",
  },
  {
    id: "contact",
    x: 72,
    tip: "Contact messages open the visitor's email client instead of using backend storage.",
  },
];

export function MascotGuide() {
  const [activeId, setActiveId] = useState("home");
  const [dismissed, setDismissed] = useState(false);
  const [bubbleOpen, setBubbleOpen] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const sections = mascotSections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
          setBubbleOpen(true);
        }
      },
      {
        rootMargin: "-32% 0px -58% 0px",
        threshold: [0.08, 0.22, 0.45],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const activeSection = useMemo(
    () => mascotSections.find((section) => section.id === activeId) ?? mascotSections[0],
    [activeId],
  );

  if (dismissed) return null;

  return (
    <motion.div
      className="fixed bottom-5 z-40 hidden sm:block"
      animate={{ left: `${activeSection.x}%` }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 72, damping: 18 }
      }
      style={{ transform: "translateX(-50%)" }}
    >
      <AnimatePresence>
        {bubbleOpen && (
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            className="absolute bottom-[7.75rem] left-1/2 w-72 -translate-x-1/2 rounded-2xl border border-nazli-purple/35 bg-background/88 p-4 shadow-2xl shadow-nazli-purple/20 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={() => setBubbleOpen(false)}
              className="absolute right-2 top-2 rounded-full p-1 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              aria-label="Hide mascot tip"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-nazli-golden">
              <Sparkles className="h-3.5 w-3.5" />
              Nazli Guide
            </div>
            <p className="pr-3 text-sm leading-relaxed text-muted-foreground">
              {activeSection.tip}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label="Nazli Tech mascot guide"
        onClick={() => setBubbleOpen((value) => !value)}
        onDoubleClick={() => setDismissed(true)}
        className="group relative h-[7.25rem] w-[5.5rem]"
        animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="absolute left-1/2 top-1 h-10 w-1 -translate-x-1/2 rounded-full bg-nazli-purple/80 shadow-[0_0_18px_rgba(168,85,247,0.75)]" />
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-nazli-golden shadow-[0_0_18px_rgba(245,190,75,0.8)]" />
        <span className="absolute left-1/2 top-8 h-[3.75rem] w-16 -translate-x-1/2 rounded-[42%_42%_48%_48%] border border-white/20 bg-linear-to-br from-[#f6c38f] via-[#f0a96d] to-[#b36b47] shadow-xl shadow-black/40">
          <span className="absolute left-3.5 top-6 h-2 w-2 rounded-full bg-[#10051d]" />
          <span className="absolute right-3.5 top-6 h-2 w-2 rounded-full bg-[#10051d]" />
          <span className="absolute left-1/2 top-10 h-1 w-5 -translate-x-1/2 rounded-full bg-[#6f2d37]" />
          <span className="absolute left-1/2 -top-3 h-7 w-12 -translate-x-1/2 rounded-t-full bg-linear-to-b from-[#2d0c4c] to-[#12051f]" />
        </span>
        <span className="absolute left-1/2 bottom-7 h-[4.25rem] w-[3.25rem] -translate-x-1/2 rounded-[2rem_2rem_1rem_1rem] border border-nazli-purple/50 bg-linear-to-b from-[#3b0e68] to-[#150521] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_36px_rgba(0,0,0,0.35)]" />
        <span className="absolute left-2 bottom-14 h-8 w-3 rotate-[-12deg] rounded-full bg-[#3b0e68]" />
        <span className="absolute right-2 bottom-14 h-8 w-3 rotate-[12deg] rounded-full bg-[#3b0e68]" />
        <span className="absolute bottom-3 left-7 h-3 w-5 rounded-full bg-nazli-purple" />
        <span className="absolute bottom-3 right-7 h-3 w-5 rounded-full bg-nazli-purple" />
        <span className="absolute bottom-0 left-1/2 h-2 w-[4.25rem] -translate-x-1/2 rounded-full bg-black/35 blur-sm" />
        <span className="absolute -right-2 top-9 flex h-8 w-8 items-center justify-center rounded-full border border-nazli-purple/50 bg-background/80 text-nazli-golden opacity-0 shadow-lg shadow-nazli-purple/20 transition-opacity group-hover:opacity-100">
          <MessageCircle className="h-4 w-4" />
        </span>
      </motion.button>
    </motion.div>
  );
}
