"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useSectionAudio } from "@/hooks/use-section-audio";
import appsAudio from "@/assets/appsaudio.mp3";
import SocialHub from "./social-media-section";
import { ArrowUpRight, Code, Cpu, Puzzle } from "lucide-react";

const APPS = [
  {
    id: "study-craft",
    name: "Study Craft AI",
    desc: "Generates notes, presentations, and questionnaires for users based on the topics or links they input.",
    icon: "📚",
    color: "from-blue-500 to-cyan-500",
    status: "COMING SOON",
    features: ["AI Note Generation", "Smart Presentations", "Dynamic Quizzes"],
  },
  {
    id: "code-crafter",
    name: "CodeCrafter AI",
    desc: "Designed to generate unique programming project ideas in any programming language to design and develop software apps, games, etc.",
    icon: "🛠️",
    color: "from-purple-500 to-indigo-500",
    status: "AVAILABLE",
    features: [
      "Project Idea Engine",
      "Multi-language Support",
      "Architecture Blueprints",
    ],
  },
  {
    id: "algo-atlas",
    name: "Algorithmic Atlas Math AI",
    desc: "Designed to transform Math learned in the classroom into a reality by generating realistic Math projects intertwined with society and culture.",
    icon: "🔢",
    color: "from-emerald-500 to-teal-500",
    status: "AVAILABLE",
    features: [
      "Real-world Math Labs",
      "Cultural Integration",
      "Problem Solving Engine",
    ],
  },
  {
    id: "ruh",
    name: "Ruh",
    desc: "Enables users to complete an MBTI personality test, allowing them to be matched with a historical Moroccan figure and discover more about their personality.",
    icon: "👤",
    color: "from-amber-500 to-orange-500",
    status: "COMING SOON",
    features: [
      "MBTI Assessment",
      "Historical Matching",
      "Personal Growth Insights",
    ],
  },
  {
    id: "lisan-zaman",
    name: "Lisan and Zaman",
    desc: "Helps students discover their unique learning style with a quick test. Personalized study guides based on style and lesson topic.",
    icon: "⏳",
    color: "from-rose-500 to-pink-500",
    status: "COMING SOON",
    features: [
      "Learning Style Test",
      "Personalized Guides",
      "Time Management Tools",
    ],
  },
  {
    id: "cog-forge",
    name: "Cognitive Forge AI",
    desc: "One of a kind because it generates and creates unique project ideas for students based on their interests and difficulty level.",
    icon: "🧠",
    color: "from-violet-500 to-purple-500",
    status: "COMING SOON",
    features: [
      "Interest-based Projects",
      "Difficulty Scaling",
      "Creative Ideation",
    ],
  },
  {
    id: "motion-class",
    name: "Motion Class AI",
    desc: "Designed to transform learning in every subject into Movie Scripts, Project Ideas, & Exam Questions applying topics to Movie Scenes.",
    icon: "🎬",
    color: "from-sky-500 to-blue-500",
    status: "COMING SOON",
    features: ["Cinematic Learning", "Script Generation", "Scene-based Exams"],
  },
  {
    id: "science-lab",
    name: "Science Lab AI",
    desc: "Provides users with options to either find Science Lab, Generate Science Lab, or Connect with an Agent.",
    icon: "🔬",
    color: "from-green-500 to-emerald-500",
    status: "COMING SOON",
    features: ["Virtual Lab Finder", "Lab Generation", "Expert Connection"],
  },
];

const APPS_CONTACT_EMAIL = "info@nazlitechschool.org";

const buildGmailComposeLink = (app: (typeof APPS)[0]) => {
  const subject = `Request: ${app.name}`;
  const body = [
    `App Name: ${app.name}`,
    "",
    "Description:",
    app.desc,
    "",
    `Status: ${app.status}`,
    "",
    "Features:",
    ...app.features.map((feature) => `- ${feature}`),
    "",
    "---",
    "I'm interested in learning more about this app and would like to get access.",
  ].join("\n");

  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    tf: "1",
    to: APPS_CONTACT_EMAIL,
    su: subject,
    body,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
};

export function AppsSection() {
  const sectionRef = useSectionAudio({
    audioSrc: appsAudio,
    sectionId: "apps",
  });

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="apps"
      className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.45em] text-nazli-golden">
            Innovation
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase leading-none">
            <span className="text-nazli-golden"> Appify </span>{" "}
            <span className="text-purple-500">Yourself</span>
          </h1>
          <p className="text-nazli-white text-lg max-w-2xl mx-auto font-medium">
            Explore Nazli Tech’s AI toolchain for notes, project ideas, quizzes,
            labs, learning styles, and creative study workflows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {APPS.map((app, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [isButtonHovered, setIsButtonHovered] = useState(false);

            return (
              <motion.div
                key={app.id}
                className="h-[340px] group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={!isButtonHovered ? { y: -6 } : {}}
              >
                <div className="relative w-full h-full bg-nazli-purple/[0.6] hover:bg-nazli-purple/[0.7] border border-white/8 hover:border-white/15 rounded-2xl p-6 flex flex-col items-center text-center overflow-hidden backdrop-blur-xs transition-all duration-250 shadow-lg shadow-black/20 hover:shadow-black/40 hover:bg-white/[0.06]">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <motion.div
                    className="w-24 h-24 rounded-xl bg-white/5 flex items-center justify-center text-5xl mb-4 border border-white/10 shadow-lg shadow-black/20 transition-all duration-300"
                    whileHover={{ scale: 1.12 }}
                  >
                    {app.icon}
                  </motion.div>

                  <div className="flex-1 flex flex-col items-center">
                    <h3 className="text-lg font-black mb-2 tracking-tight leading-tight">
                      {app.name}
                    </h3>
                    <div
                      className={`text-[9px] font-black px-2 py-0.5 rounded-full mb-3 tracking-widest transition-all duration-250 ${app.status === "AVAILABLE" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30" : "bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30"}`}
                    >
                      {app.status}
                    </div>
                    <p className="text-white/60 text-xs leading-[1.5] font-medium">
                      {app.desc}
                    </p>
                  </div>

                  <div className="mt-4 w-full z-10">
                    <motion.a
                      href={buildGmailComposeLink(app)}
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                      className="inline-flex w-full items-center justify-center rounded-lg border border-nazli-golden/40 bg-linear-to-r from-nazli-purple/85 to-nazli-golden/75 px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:from-nazli-purple hover:to-nazli-golden hover:shadow-lg hover:shadow-nazli-golden/20"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get App
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div>
        <SocialHub />
      </div>
    </section>
  );
}
