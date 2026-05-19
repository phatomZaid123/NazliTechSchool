"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function AnnouncementBar() {
  const announcement =
    "We Are Hiring a Highly Talented & Creative Software/Web Developer to Build Amazing Products";
  const applySubject = encodeURIComponent(
    "Application: Software/Web Developer - Nazli Tech School",
  );
  const applyBody = encodeURIComponent(
    `Hello Nazli Tech Team,

I am interested in the Software/Web Developer role.

Name:
Location:
Portfolio/GitHub:
Relevant Experience:

Thank you.`,
  );
  const applyHref = `https://mail.google.com/mail/?view=cm&fs=1&to=hello@nazlitechschool.org&su=${applySubject}&body=${applyBody}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed top-0 left-0 right-0 z-[60] h-10 md:h-11 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#2b1042] via-[#470047] to-[#1f2147]" />
      <div className="absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_20%_0%,rgba(219,172,52,0.35),transparent_35%),radial-gradient(circle_at_80%_100%,rgba(120,80,200,0.45),transparent_40%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#dbac34]/70 to-transparent" />

      <div className="relative h-full px-4 md:px-6 flex items-center gap-3">
        <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] uppercase tracking-[0.18em] font-bold text-amber-200">
        
          Now Hiring
        </div>

        <div className="relative overflow-hidden flex-1">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex min-w-max items-center gap-10"
          >
            {[0, 1, 2, 3].map((index) => (
              <span
                key={index}
                className="flex items-center gap-2 text-xs md:text-sm font-semibold text-white/90 tracking-wide whitespace-nowrap"
              >
                {announcement}
              </span>
            ))}
          </motion.div>
        </div>

        <a
          href={applyHref}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full border border-amber-300/45 bg-amber-400/15 px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-amber-200 hover:bg-amber-300/25 transition-colors"
        >
          Apply
        </a>
      </div>
    </motion.div>
  );
}
