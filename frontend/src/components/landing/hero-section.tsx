"use client";

import { motion, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Globe, Cpu, Sparkles } from "lucide-react";
import { useTypewriter } from "@/hooks/use-typewriter";

export function HeroSection() {
  const { text: typedWord, isTyping } = useTypewriter({
    words: ["Doing.", "Building.", "Creating.", "Experimenting."],
    typeSpeed: 120,
    deleteSpeed: 80,
    delayBetweenWords: 2500,
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 shadow-[0_18px_44px_-30px_rgba(56,189,248,0.55)] backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(139, 92, 246, 0.5)",
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="bg-linear-to-r from-sky-100 via-white to-cyan-100 bg-clip-text text-sm font-medium text-transparent">
                The Future of Learning
              </span>
            </motion.div>

            <h1 className="text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-foreground">Learn by </span>
              <br />
              <span className="relative bg-linear-to-r from-sky-100 via-white to-cyan-200 bg-clip-text text-transparent [text-shadow:0_0_32px_rgba(125,211,252,0.22)]">
                {typedWord}
                <motion.span
                  className="inline-block w-0.75 h-[1em] bg-primary ml-1 align-middle"
                  animate={{ opacity: isTyping ? [1, 0, 1] : 1 }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </span>
              <br />
              <motion.span
                className="text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Not Watching.
              </motion.span>
            </h1>

            <motion.p
              className="max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Interactive simulations, AI-powered guidance, and hands-on
              projects. Experience education that prepares you for the real
              world.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="group rounded-xl bg-linear-to-r from-white to-sky-100 px-8 py-6 text-lg text-slate-950 shadow-[0_22px_55px_-24px_rgba(56,189,248,0.8)] hover:shadow-[0_28px_65px_-24px_rgba(96,165,250,0.88)]"
                >
                  Explore the Experience
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>

            {/* Stats with hover effects */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/30">
              {[
                { value: "10K+", label: "Students" },
                { value: "95%", label: "Success Rate" },
                { value: "50+", label: "Countries" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="cursor-default"
                >
                  <motion.div
                    className="text-2xl md:text-3xl font-bold text-foreground"
                    whileHover={{ scale: 1.1, color: "oklch(0.65 0.25 280)" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right floating cards */}
          <div className="relative hidden lg:block h-150">
            {/* AI Assistant Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute top-0 right-0 w-72"
            >
              <FloatingCard delay={0} glowColor="primary">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-foreground text-base">
                      AI Assistant
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Always here to help
                    </div>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <motion.div
                    className="bg-secondary/50 rounded-lg p-3.5 text-sm text-foreground border border-border/20"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    {"How can I solve this physics equation?"}
                  </motion.div>
                  <motion.div
                    className="bg-primary/10 rounded-lg p-3.5 text-sm text-foreground border border-primary/20"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <TypingIndicator />
                  </motion.div>
                </div>
              </FloatingCard>
            </motion.div>

            {/* Simulation Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute top-32 left-0 w-64"
            >
              <FloatingCard delay={1} glowColor="accent">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-linear-to-br from-accent to-glow-cyan flex items-center justify-center flex-shrink-0"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Cpu className="w-5 h-5 text-accent-foreground" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-foreground text-base">
                      Live Simulation
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Physics Engine
                    </div>
                  </div>
                </div>
                <div className="h-28 rounded-lg bg-linear-to-br from-secondary to-muted flex items-center justify-center relative overflow-hidden border border-border/20">
                  {/* Orbit circles */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background:
                        "radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.1), transparent)",
                    }}
                  />

                  {/* Particle 1 - Accent color */}
                  <motion.div
                    className="absolute w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/60"
                    animate={{
                      x: [0, 35, 0, -35, 0],
                      y: [-28, 0, 28, 0, -28],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Particle 2 - Primary color */}
                  <motion.div
                    className="absolute w-2.5 h-2.5 rounded-full bg-primary shadow-lg shadow-primary/60"
                    animate={{
                      x: [22, -22, 22],
                      y: [0, 22, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  />

                  {/* Particle 3 - Cyan color */}
                  <motion.div
                    className="absolute w-2 h-2 rounded-full bg-glow-cyan shadow-lg shadow-glow-cyan/60"
                    animate={{
                      x: [-17, 17, -17],
                      y: [17, -17, 17],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />

                  {/* Center glow pulse */}
                  <motion.div
                    className="w-7 h-7 rounded-full bg-accent/25 blur-md"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </FloatingCard>
            </motion.div>

            {/* Global Learning Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="absolute bottom-20 right-12 w-72"
            >
              <FloatingCard delay={2} glowColor="cyan">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-linear-to-br from-glow-cyan to-glow-blue flex items-center justify-center shrink-0"
                    animate={{ rotateY: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Globe className="w-5 h-5 text-foreground" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-foreground text-base">
                      Global Learning
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Connect worldwide
                    </div>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {[
                    "bg-gradient-to-br from-primary to-accent",
                    "bg-gradient-to-br from-accent to-glow-cyan",
                    "bg-gradient-to-br from-glow-cyan to-glow-blue",
                    "bg-gradient-to-br from-glow-blue to-primary",
                  ].map((bg, i) => (
                    <motion.div
                      key={i}
                      className={`w-9 h-9 rounded-full ${bg} border-2 border-card flex items-center justify-center text-xs font-bold text-primary-foreground cursor-default`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + i * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.25, zIndex: 10 }}
                    >
                      {["NG", "UK", "US", "CA"][i]}
                    </motion.div>
                  ))}
                  <motion.div
                    className="w-9 h-9 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-xs font-semibold text-muted-foreground cursor-default"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.4, type: "spring" }}
                    whileHover={{ scale: 1.25 }}
                  >
                    +46
                  </motion.div>
                </div>
              </FloatingCard>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2 backdrop-blur-sm">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function FloatingCard({
  children,
  delay = 0,
  glowColor = "primary",
}: {
  children: React.ReactNode;
  delay?: number;
  glowColor?: "primary" | "accent" | "cyan";
}) {
  const rotXValue = useMotionValue(0);
  const rotYValue = useMotionValue(0);

  const glowColors = {
    primary: "rgba(139, 92, 246, 0.15)",
    accent: "rgba(6, 182, 212, 0.15)",
    cyan: "rgba(59, 130, 246, 0.15)",
  };

  const borderColors = {
    primary: "rgba(139, 92, 246, 0.3)",
    accent: "rgba(6, 182, 212, 0.3)",
    cyan: "rgba(59, 130, 246, 0.3)",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * 8;
    const rotY = ((centerX - x) / centerX) * 8;

    rotXValue.set(rotX);
    rotYValue.set(rotY);
  };

  const handleMouseLeave = () => {
    rotXValue.set(0);
    rotYValue.set(0);
  };

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
      whileHover={{ scale: 1.05, y: -20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotXValue,
        rotateY: rotYValue,
        transformStyle: "preserve-3d",
        boxShadow: `0 0 40px ${glowColors[glowColor]}, 0 20px 60px rgba(0,0,0,0.3)`,
        borderColor: `${borderColors[glowColor]}`,
      }}
      className="relative bg-card/80 backdrop-blur-xl border rounded-2xl p-6 shadow-xl shadow-black/20 transition-all duration-300 hover:shadow-2xl"
    >
      {/* Animated gradient border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${glowColors[glowColor]}, transparent)`,
        }}
        whileHover={{ opacity: 1 }}
      />

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.1 }}
        style={{
          background:
            "linear-gradient(135deg, transparent, rgba(255,255,255,0.2), transparent)",
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1">
      <span className="text-foreground/80">{"Let me break it down"}</span>
      <motion.span className="flex gap-0.5" initial="hidden" animate="visible">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1 h-1 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.span>
    </div>
  );
}
