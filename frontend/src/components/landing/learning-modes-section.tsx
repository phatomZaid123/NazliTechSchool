"use client";

import { motion } from "framer-motion";
import { Users, Star, Clock, Play, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LearningModesSection() {
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
    <section className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-l from-accent/20 to-primary/10 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-primary/20 to-accent/10 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 max-w-6xl mx-auto">
          {/* Left Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group rounded-3xl border border-border/50 bg-gradient-to-br from-card/80 to-background/70 backdrop-blur-xl p-8 hover:border-accent/50 transition-all duration-500"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Header */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 pb-4"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/40 to-accent/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent animate-pulse" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                    Flexible Learning
                  </p>
                  <h3 className="text-2xl font-bold text-foreground">
                    Choose What Works For You
                  </h3>
                </div>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-muted-foreground text-lg font-light leading-relaxed"
              >
                Flexible learning formats built around your schedule, with our
                AI mascot guiding each step.
              </motion.p>

              {/* Learning modes grid */}
              <motion.div
                variants={containerVariants}
                className="grid md:grid-cols-3 gap-4"
              >
                {[
                  {
                    icon: Users,
                    title: "Group Lessons",
                    description:
                      "Collaborate with peers, build accountability, and learn faster together.",
                    color: "from-primary/20 to-accent/10",
                  },
                  {
                    icon: Star,
                    title: "1-on-1 Mentorship",
                    description:
                      "Personalized guidance with expert tutors tailored to your goals.",
                    color: "from-accent/20 to-primary/10",
                  },
                  {
                    icon: Clock,
                    title: "Self-Paced",
                    description:
                      "Learn anytime, anywhere with bite-size lessons and flexible deadlines.",
                    color: "from-blue-500/20 to-cyan-500/10",
                  },
                ].map((mode, idx) => {
                  const Icon = mode.icon;
                  return (
                    <motion.div
                      key={mode.title}
                      variants={itemVariants}
                      className={`rounded-2xl border border-border/40 bg-gradient-to-br ${mode.color} backdrop-blur-sm p-5 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="w-5 h-5 text-accent" />
                        <span className="text-sm font-semibold text-foreground">
                          {mode.title}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">
                        {mode.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group rounded-3xl border border-border/50 bg-gradient-to-br from-card/80 to-background/80 backdrop-blur-xl p-8 hover:border-primary/50 transition-all duration-500"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6 h-full flex flex-col"
            >
              {/* Header */}
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/50 bg-gradient-to-r from-primary/10 to-accent/5 text-xs font-semibold text-primary mb-4">
                  <Play className="w-4 h-4" />
                  Coursera Partnership
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Coursera-powered courses
                </h3>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-sm text-muted-foreground font-light leading-relaxed"
              >
                We integrate Coursera pathways so learners can earn globally
                recognized certificates alongside Nazli Tech School projects.
              </motion.p>

              {/* Features List */}
              <motion.ul
                variants={containerVariants}
                className="space-y-3 flex-grow"
              >
                {[
                  {
                    icon: Star,
                    text: "Industry-recognized certificates",
                  },
                  {
                    icon: Users,
                    text: "Expert-led specializations",
                  },
                  {
                    icon: Play,
                    text: "Project-based assessments",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={idx}
                      variants={itemVariants}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                      {item.text}
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* Button */}
              <motion.div variants={itemVariants}>
                <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all font-semibold">
                  Explore Partner Courses
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
