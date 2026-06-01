"use client";

import { motion } from "framer-motion";
import { useSectionAudio } from "@/hooks/use-section-audio";
import curriculumAudio from "@/assets/curriculumaudio.mp3";
import SocialHub from "./social-media-section";

export function CurriculumSection() {
  const highlights = [
    "Structured progression from fundamentals to advanced topics",
    "Real-world project portfolio development",
    "AI-enhanced learning pathways",
    "International curriculum standards (IB, AP, IGCSE)",
  ];

  const sectionRef = useSectionAudio({
    audioSrc: curriculumAudio,
    sectionId: "curriculum",
  });

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="curriculum"
      className="relative overflow-x-hidden py-32 scroll-mt-28"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.38em] text-nazli-golden">
            Learn More
          </p>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-nazli-golden md:text-5xl">
            Our Curriculum
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-nazli-white">
            Nazli Tech School&apos;s{" "}
            <span className="code-inline">Cognoscentia</span> curriculum is an
            educational journey that forges the next generation of tech experts.
            Our methodology combines theoretical foundations with hands-on
            practice.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl border border-white/8 hover:border-white/15 bg-white/[0.04] hover:bg-white/[0.06] neon-glow-purple-box scanlines transition-all duration-250 shadow-lg shadow-black/20 hover:shadow-black/40"
          >
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/LO8YHDjxCiM?si=lRhndyT0pMyeelpk"
              title="Nazli Tech School Intro"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <div className="absolute bottom-6 left-6">
              <p className="font-mono text-sm font-bold text-nazli-purple">
                &gt; nazli-tech-school-intro
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-4 flex items-center gap-3 text-3xl font-bold md:text-4xl">
                <span className="text-4xl neon-glow-golden">🧙‍♀️</span>
                <span className="neon-glow-golden">Cognoscentia</span>
              </h3>
              <p className="text-base font-medium tracking-wide text-nazli-white leading-[1.6]">
                A structured, modern learning method designed for real-world
                confidence.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="code-inline mb-4 w-fit px-4 py-2 text-2xl font-bold text-nazli-purple">
                  The Cognoscentia Method
                </h4>
                <p className="leading-[1.65] text-nazli-white">
                  Our unique pedagogical approach combines the rigor of
                  university-level curriculum with the engagement of modern
                  digital learning. Students don&apos;t just learn to code, they
                  learn to think like engineers.
                </p>
              </div>

              <div className="space-y-4 border-t border-nazli-golden/20 pt-6">
                {highlights.map((item, index) => (
                  <div
                    key={item}
                    className="grid grid-cols-[1.9rem_1fr] items-start gap-3"
                  >
                    <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-nazli-golden/45 bg-nazli-golden/10 text-xs font-bold text-nazli-golden">
                      {index + 1}
                    </span>
                    <p className="pt-0.5 leading-relaxed text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <SocialHub />
    </section>
  );
}
