"use client";

import { motion } from "framer-motion";
import { Compass, Globe2, GraduationCap, UsersRound } from "lucide-react";
import { useSectionAudio } from "@/hooks/use-section-audio";
import aboutAudio from "@/assets/aboutaudio.mp3";
import SocialHub from "./social-media-section";
import { FaLocationPin } from "react-icons/fa6";
import Founder from "@/assets/founder.png";
import CoFounder from "@/assets/cofounder.png";

const people = [
  {
    role: "CEO & Founder",
    name: "Dr. Nazha Habibi",
    note: "A Moroccan medical doctor with extensive international working experience. Dr. Habibi established and successfully runs Nazli Tech School, building the online platform to provide students with unique learning experiences globally. Her team includes talented, global-minded instructors who have developed academically challenging and practical course outlines.",
    linkedIn:
      "https://www.linkedin.com/in/nazha-habibi-b59a3983/?originalSubdomain=ma",
    imagePlaceholder: Founder,
  },
  {
    role: "Co-founder",
    name: "Engr. Alisia Habibi",
    note: "A Moroccan software engineer with extensive teaching experience since 2012 and a background as an academic content creator. Alasia develops professional academic courses and ensures that learning at Nazli Tech School integrates practical understanding with real-life scenarios.",
    linkedIn: "https://www.linkedin.com/in/alisia-habibi-1205a663/",
    imagePlaceholder: CoFounder,
  },
];

export function AboutSection() {
  const sectionRef = useSectionAudio({
    audioSrc: aboutAudio,
    sectionId: "about",
  });

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="about"
      className="relative py-32 overflow-x-hidden scroll-mt-28"
    >
      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.42em] text-nazli-golden">
              About Us
            </p>
            <h2 className="uppercase bg-gradient-to-t  from-purple-600 to-amber-400 bg-clip-text text-transparent">
              A global tech school built for modern learners
            </h2>
            <p className="mt-6 text-lg ">
              Nazli Tech School helps learners move from curiosity to capability
              through guided courses, simulation classes, project work, and
              flexible learning modes. The prototype keeps the story simple
              while leaving clear space for official founder and co-founder
              content.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "68+ countries reached",
                "10k+ active learners",
                "Live + self-paced options",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-nazli-golden/40 bg-nazli-golden/10 px-4 py-2 text-xs font-semibold text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Globe2, label: "Remote-first international learning" },
                {
                  icon: GraduationCap,
                  label: "IB, AP, IGCSE, YAK, and NECO aware",
                },
                { icon: Compass, label: "Cognoscentia curriculum direction" },
                {
                  icon: UsersRound,
                  label: "Students, educators, and families",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border/40 bg-nazli-purple/[0.6] p-4 text-sm font-semibold"
                >
                  <item.icon className="mb-3 h-5 w-5 text-nazli-golden" />
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid gap-5"
          >
            {people.map((person, index) => (
              <article
                key={person.role}
                className="rounded-3xl border border-border/45 bg-nazli-purple/[0.6] hover:bg-nazli-purple/[0.7] p-6 transition-all duration-300 hover:border-nazli-golden/35"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-3xl border border-nazli-purple/35 bg-nazli-purple/15 text-center">
                    {person.imagePlaceholder ? (
                      <div className="h-full w-full flex items-center justify-center rounded-2xl bg-gradient-to-br from-nazli-purple/20 to-nazli-golden/20 text-xs font-semibold">
                        <img
                          src={person.imagePlaceholder}
                          alt={person.name}
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                          className="h-full w-full object-cover rounded-4xl"
                        />
                      </div>
                    ) : (
                      <span className="text-2xl  text-nazli-golden">
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-nazli-golden">
                      {person.role}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-foreground">
                      {person.name}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground text-sm">
                      {person.note}
                    </p>
                    {person.linkedIn && (
                      <a
                        href={person.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-nazli-golden hover:text-nazli-golden/80 transition-colors"
                      >
                        LinkedIn Profile →
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}

            <div className="rounded-3xl border border-nazli-golden/35 bg-nazli-golden/20 p-6">
              <p className="text-sm font-semibold leading-relaxed text-foreground">
                <FaLocationPin className="text-nazli-golden mr-2 inline-block" />{" "}
                Nazli Tech School operates globally with presence in Rabat,
                Morocco and Abuja, Nigeria, with remote international support.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-background/50 px-3 py-1">
                  Timezone-friendly sessions
                </span>
                <span className="rounded-full bg-background/50 px-3 py-1">
                  Mentorship-led community
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <SocialHub />
    </section>
  );
}
