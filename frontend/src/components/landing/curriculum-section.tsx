"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  Sparkles,
  Layers,
  Zap,
  Target,
  Users,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    title: "Structured Progression",
    description:
      "A guided path from fundamentals to advanced mastery with clear checkpoints.",
    icon: Target,
  },
  {
    title: "Real-World Projects",
    description:
      "Every module ends with a portfolio-ready build to prove real skill.",
    icon: Zap,
  },
  {
    title: "AI-Enhanced Guidance",
    description:
      "Your Nazli AI mascot supports you with hints, feedback, and next steps.",
    icon: Sparkles,
  },
  {
    title: "Global Standards",
    description:
      "Aligned with international curricula (IB, AP, IGCSE) and industry needs.",
    icon: Users,
  },
];

export function CurriculumSection() {
  const sectionRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-t from-accent/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-40 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-gradient-to-r from-card/60 to-card/40 backdrop-blur-sm mb-6">
            <BookOpen className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm text-foreground font-medium tracking-wide">
              Our Curriculum
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-cyan-300 via-primary to-cyan-300 bg-clip-text text-transparent animate-pulse">
              The Cognoscentia Method
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            A learning journey that blends rigorous fundamentals with hands-on
            practice and real-world impact.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 max-w-6xl mx-auto mb-10">
          {/* Left Card - Learning Blueprint */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative"
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

            <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/80 via-card/60 to-background/70 backdrop-blur-xl p-8 transition-all duration-500 group-hover:border-accent/50">
              {/* Header */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/80 to-accent/60 flex items-center justify-center text-white shadow-lg shadow-primary/50">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                    Nazli Tech School
                  </p>
                  <h3 className="text-2xl font-bold text-foreground">
                    Learning Blueprint
                  </h3>
                </div>
              </motion.div>

              {/* Pillars List */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {pillars.map((pillar, index) => {
                  const Icon = pillar.icon;
                  return (
                    <motion.div
                      key={pillar.title}
                      variants={itemVariants}
                      className="group/item flex gap-4 p-4 rounded-2xl border border-border/30 bg-gradient-to-r from-primary/5 to-accent/5 hover:border-accent/50 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-6 h-6 mt-1">
                        <Icon className="w-full h-full text-accent group-hover/item:text-primary transition-colors" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {pillar.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 font-light">
                          {pillar.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Card - Curriculum Tracks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative"
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/30 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

            <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/80 via-background/80 to-background/70 backdrop-blur-xl p-8 transition-all duration-500 group-hover:border-accent/50">
              {/* Header */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-12 h-12 rounded-xl border-2 border-gradient-to-br from-primary/60 to-accent/40 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/5">
                  <Layers className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                    Learning Paths
                  </p>
                  <h3 className="text-2xl font-bold text-foreground">
                    Built for Global Success
                  </h3>
                </div>
              </motion.div>

              {/* Curriculum Items */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-3 mb-8"
              >
                {[
                  {
                    text: "IB, AP, and IGCSE-aligned pathways",
                    icon: "🎓",
                  },
                  {
                    text: "Project portfolios that prove skill and creativity",
                    icon: "🚀",
                  },
                  {
                    text: "Mentor feedback loops after every module",
                    icon: "💬",
                  },
                  {
                    text: "Live cohort options and self-paced flexibility",
                    icon: "⚡",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.text}
                    variants={itemVariants}
                    className="group/track flex gap-3 rounded-2xl border border-border/40 bg-gradient-to-r from-primary/5 to-transparent via-accent/5 p-4 hover:border-accent/60 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300"
                  >
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <p className="text-sm text-foreground font-light leading-relaxed">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/50 transition-all font-semibold py-6 text-base">
                  <Trophy className="w-4 h-4 mr-2" />
                  Explore Curriculum
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {[
            { label: "Modules", value: "50+" },
            { label: "Projects", value: "200+" },
            { label: "Success Rate", value: "98%" },
            { label: "Students Active", value: "5K+" },
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/30 bg-gradient-to-br from-card/60 to-background/60 p-6 text-center hover:border-accent/50 hover:bg-gradient-to-br hover:from-card/80 hover:to-background/80 transition-all"
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-2 font-light">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
