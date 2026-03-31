"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Globe,
  Users,
  GraduationCap,
  Building2,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useTypewriterOnce } from "@/hooks/use-typewriter";

const regions = [
  {
    id: "nigeria",
    name: "Nigeria",
    flag: "NG",
    students: "2,500+",
    graduates: "890",
    partners: "15",
    description:
      "Leading tech education hub in West Africa with state-of-the-art facilities in Lagos and Abuja.",
    highlights: ["AI Research Center", "FinTech Lab", "Community Programs"],
    color: "from-green-500 to-emerald-500",
    glowColor: "rgba(16, 185, 129, 0.3)",
  },
  {
    id: "uk",
    name: "United Kingdom",
    flag: "UK",
    students: "1,800+",
    graduates: "650",
    partners: "22",
    description:
      "Strategic partnership with top UK universities and tech companies in London and Manchester.",
    highlights: ["Research Exchange", "Industry Mentorship", "Visa Support"],
    color: "from-blue-500 to-indigo-500",
    glowColor: "rgba(59, 130, 246, 0.3)",
  },
  {
    id: "usa",
    name: "United States",
    flag: "US",
    students: "3,200+",
    graduates: "1,100",
    partners: "35",
    description:
      "Silicon Valley connections and partnerships with leading tech giants and startups.",
    highlights: [
      "Silicon Valley Tours",
      "Startup Incubator",
      "Tech Internships",
    ],
    color: "from-red-500 to-orange-500",
    glowColor: "rgba(239, 68, 68, 0.3)",
  },
  {
    id: "canada",
    name: "Canada",
    flag: "CA",
    students: "1,200+",
    graduates: "420",
    partners: "18",
    description:
      "Growing presence in Toronto and Vancouver with focus on AI and clean tech.",
    highlights: [
      "AI Ethics Program",
      "Clean Tech Focus",
      "Immigration Pathways",
    ],
    color: "from-red-500 to-pink-500",
    glowColor: "rgba(236, 72, 153, 0.3)",
  },
];

export function GlobalLearningSection() {
  const [activeRegion, setActiveRegion] = useState(regions[0]);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { displayText: headingText } = useTypewriterOnce(
    "Borders",
    60,
    isInView ? 300 : 99999,
  );

  return (
    <section
      id="global"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow-cyan/30 bg-glow-cyan/5 mb-6"
            whileHover={{ scale: 1.05, borderColor: "rgba(6, 182, 212, 0.5)" }}
          >
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Globe className="w-4 h-4 text-glow-cyan" />
            </motion.div>
            <span className="text-sm text-glow-cyan font-medium">
              Global Presence
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            <span className="text-foreground">Learning Without </span>
            <span className="bg-gradient-to-r from-glow-cyan to-glow-blue bg-clip-text text-transparent">
              {headingText}
              {headingText !== "Borders" && (
                <motion.span
                  className="inline-block w-[3px] h-[0.8em] bg-glow-cyan ml-1 align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join a global community of learners and innovators from around the
            world
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Region tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-3"
          >
            {regions.map((region, index) => (
              <motion.button
                key={region.id}
                onClick={() => setActiveRegion(region)}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
                  activeRegion.id === region.id
                    ? "bg-card border border-primary/30 shadow-lg"
                    : "bg-card/50 border border-transparent hover:bg-card hover:border-border/50"
                }`}
                style={{
                  boxShadow:
                    activeRegion.id === region.id
                      ? `0 0 30px ${region.glowColor}`
                      : "none",
                }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${region.color} flex items-center justify-center text-white font-bold text-sm`}
                    animate={
                      hoveredRegion === region.id
                        ? { rotate: [0, -5, 5, 0] }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    {region.flag}
                  </motion.div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">
                      {region.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {region.students} students
                    </div>
                  </div>
                  {activeRegion.id === region.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="w-2 h-2 rounded-full bg-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Region details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRegion.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8"
                style={{
                  boxShadow: `0 0 60px ${activeRegion.glowColor}`,
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeRegion.color} flex items-center justify-center text-white font-bold text-xl`}
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                    transition={{ type: "spring" }}
                  >
                    {activeRegion.flag}
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {activeRegion.name}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Active Campus</span>
                    </div>
                  </div>
                  <motion.div
                    className="ml-auto"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-primary opacity-50" />
                  </motion.div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {activeRegion.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    {
                      icon: Users,
                      value: activeRegion.students,
                      label: "Active Students",
                      color: "text-primary",
                    },
                    {
                      icon: GraduationCap,
                      value: activeRegion.graduates,
                      label: "Graduates",
                      color: "text-accent",
                    },
                    {
                      icon: Building2,
                      value: activeRegion.partners,
                      label: "Partners",
                      color: "text-glow-cyan",
                    },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className="bg-secondary/30 rounded-2xl p-4 text-center border border-transparent hover:border-primary/20 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <stat.icon
                        className={`w-6 h-6 mx-auto mb-2 ${stat.color}`}
                      />
                      <motion.div
                        className="text-2xl font-bold text-foreground"
                        key={stat.value}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    Key Highlights
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeRegion.highlights.map((highlight, i) => (
                      <motion.span
                        key={highlight}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${activeRegion.color} text-white cursor-default`}
                      >
                        {highlight}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
