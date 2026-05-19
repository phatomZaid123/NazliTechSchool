"use client";

import { motion } from "framer-motion";
import SocialHub from "./social-media-section";

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
  return (
    <section
      id="apps"
      className="relative min-h-screen bg-gradient-to-b from-background to-background/50 pt-32 pb-20 px-6 overflow-hidden scroll-mt-28"
    >
      {/* Cosmic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>
    

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.45em] text-nazli-golden">
            Innovation
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 uppercase leading-none">
            <span className="text-nazli-golden"> Appify </span>{" "}
            <span className="text-purple-500">Yourself</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto font-medium">
          Explore Nazli Tech’s AI toolchain for notes, project ideas, quizzes, labs, learning styles, and creative study workflows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {APPS.map((app, i) => (
            <motion.div
              key={app.id}
              className="h-[550px] group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="relative w-full h-full bg-white/5 border border-white/10 rounded-[3rem] p-8 flex flex-col items-center text-center overflow-hidden backdrop-blur-md">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-5 group-hover:opacity-15 transition-opacity duration-500`}
                />

                <div className="w-32 h-32 rounded-[2.5rem] bg-white/5 flex items-center justify-center text-6xl mb-8 border border-white/10 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  {app.icon}
                </div>

                <div className="flex-1 flex flex-col items-center">
                  <h3 className="text-2xl font-black mb-4 tracking-tight leading-tight">
                    {app.name}
                  </h3>
                  <div
                    className={`text-[10px] font-black px-3 py-1 rounded-full mb-6 tracking-widest ${app.status === "AVAILABLE" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-purple-500/20 text-purple-400 border border-purple-500/30"}`}
                  >
                    {app.status}
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed font-medium">
                    {app.desc}
                  </p>
                </div>

                <div className="mt-8 w-full z-10">
                  <a
                    href={buildGmailComposeLink(app)}
                    className="block w-full text-center bg-nazli-golden text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-nazli-gray transition-colors hover:focus:bg-nazli-gray focus:outline-none focus:ring-2 focus:ring-nazli-golden focus:ring-offset-2"
                  >
                    Get App
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div>
        <SocialHub />
      </div>
    </section>
  );
}
