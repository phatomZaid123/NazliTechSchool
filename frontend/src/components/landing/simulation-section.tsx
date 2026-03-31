"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Atom,
  Bot,
  ChevronLeft,
  ChevronRight,
  Code2,
  FlaskConical,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react";
import { useTypewriterOnce } from "@/hooks/use-typewriter";

const simulations = [
  {
    id: "physics",
    label: "Physics Lab",
    description: "Manipulate gravity, mass, and velocity in real time.",
    icon: Atom,
    tag: "Mechanics",
    highlights: [
      "Force and energy update instantly",
      "Perfect for class walkthroughs",
      "Great for landing-page demos",
    ],
  },
  {
    id: "coding",
    label: "Coding Studio",
    description:
      "Build logic paths and preview algorithm outcomes without leaving the browser.",
    icon: Code2,
    tag: "Programming",
    highlights: [
      "Step-by-step problem solving",
      "Instant AI feedback prompts",
      "Project checkpoints for students",
    ],
  },
  {
    id: "chemistry",
    label: "Chemistry Lab",
    description:
      "Explore reactions safely with visual experiment guides and result summaries.",
    icon: FlaskConical,
    tag: "Science",
    highlights: [
      "Reaction setup previews",
      "Lab safety callouts",
      "Results ready for instructor review",
    ],
  },
  {
    id: "robotics",
    label: "Robotics Studio",
    description:
      "Test motion logic and workflow planning before students build the physical prototype.",
    icon: Bot,
    tag: "Engineering",
    highlights: [
      "Motion checkpoints",
      "Sensor workflow planning",
      "Mentor review snapshots",
    ],
  },
];

export function SimulationSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSimulation, setActiveSimulation] = useState(0);
  const [gravity, setGravity] = useState([9.8]);
  const [mass, setMass] = useState([1]);
  const [velocity, setVelocity] = useState([5]);
  const [speed, setSpeed] = useState(1);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const applyPreset = (name: string) => {
    switch (name) {
      case "low-gravity":
        setGravity([3.7]); // Moon gravity
        setMass([2]);
        setVelocity([5]);
        break;
      case "high-gravity":
        setGravity([25]); // Jupiter-like
        setMass([1]);
        setVelocity([3]);
        break;
      case "balanced":
        setGravity([9.8]);
        setMass([2]);
        setVelocity([8]);
        break;
    }
  };

  const { displayText: headingText } = useTypewriterOnce(
    "Real Physics",
    60,
    isInView ? 300 : 99999,
  );

  const calculatedForce = (mass[0] * gravity[0]).toFixed(2);
  const calculatedEnergy = (0.5 * mass[0] * velocity[0] * velocity[0]).toFixed(
    2,
  );
  const activeSimulationData = simulations[activeSimulation];

  const markerSize = 30 + mass[0] * 6;
  const markerX = Math.min(80, 18 + velocity[0] * 2.8);
  const markerY = Math.max(16, 72 - gravity[0] * 1.7 - velocity[0] * 0.7);

  return (
    <section
      id="simulation"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 shadow-[0_18px_46px_-30px_rgba(56,189,248,0.55)]">
            <Zap className="h-4 w-4 text-accent" />
            <span className="bg-linear-to-r from-sky-100 via-white to-cyan-100 bg-clip-text text-sm font-medium text-transparent">
              Interactive Learning
            </span>
          </div>
          <h2 className="mb-6 text-4xl font-bold text-balance md:text-5xl">
            <span className="text-foreground">Experience </span>
            <span className="bg-linear-to-r from-sky-100 via-white to-cyan-200 bg-clip-text text-transparent [text-shadow:0_0_28px_rgba(125,211,252,0.2)]">
              {headingText}
              {headingText !== "Real Physics" && (
                <span className="ml-1 inline-block h-[0.8em] w-[3px] animate-pulse bg-accent align-middle" />
              )}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            A lighter simulation demo that still shows live controls, clear
            outcomes, and how the product could be presented in class or on the
            landing page.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 rounded-3xl border border-border/50 bg-card/70 p-6 shadow-[0_28px_80px_-58px_rgba(56,189,248,0.4)] backdrop-blur-md sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/50 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  Simulation Controls
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">
                  Live parameter preview
                </h3>
              </div>

              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-xl border-border/40"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-xl border-border/40"
                  onClick={() => {
                    setGravity([9.8]);
                    setMass([1]);
                    setVelocity([5]);
                    setIsPlaying(false);
                  }}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {simulations.map((simulation, index) => (
                <button
                  key={simulation.id}
                  onClick={() => setActiveSimulation(index)}
                  className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
                    activeSimulation === index
                      ? "border-accent/40 bg-accent/10"
                      : "border-border/40 bg-background/45 hover:border-border/70 hover:bg-background/70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/70 text-foreground">
                      <simulation.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {simulation.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {simulation.tag}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-sm leading-6 text-muted-foreground">
              {activeSimulationData.description}
            </p>

            {/* Quick Preset Buttons */}
            {activeSimulationData.id === "physics" && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <motion.button
                  onClick={() => applyPreset("low-gravity")}
                  className="rounded-xl border border-border/40 bg-background/45 px-3 py-2 text-xs font-medium text-muted-foreground hover:border-accent/80 hover:bg-accent/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Low Gravity
                </motion.button>
                <motion.button
                  onClick={() => applyPreset("balanced")}
                  className="rounded-xl border border-border/40 bg-background/45 px-3 py-2 text-xs font-medium text-muted-foreground hover:border-primary/80 hover:bg-primary/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Balanced
                </motion.button>
                <motion.button
                  onClick={() => applyPreset("high-gravity")}
                  className="rounded-xl border border-border/40 bg-background/45 px-3 py-2 text-xs font-medium text-muted-foreground hover:border-glow-cyan/80 hover:bg-glow-cyan/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  High Gravity
                </motion.button>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-3 rounded-2xl border border-border/40 bg-background/45 p-4 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-foreground">Gravity</label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-primary font-semibold">
                      {gravity[0].toFixed(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">m/s²</span>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-primary to-primary/30 pointer-events-none"
                    style={{ width: `${(gravity[0] / 25) * 100}%` }}
                  />
                  <Slider
                    value={gravity}
                    onValueChange={setGravity}
                    min={0}
                    max={25}
                    step={0.1}
                    className="relative z-10"
                  />
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-border/40 bg-background/45 p-4 hover:border-accent/40 transition-colors">
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-foreground">Mass</label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-accent font-semibold">
                      {mass[0].toFixed(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">kg</span>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-accent to-accent/30 pointer-events-none"
                    style={{ width: `${(mass[0] / 10) * 100}%` }}
                  />
                  <Slider
                    value={mass}
                    onValueChange={setMass}
                    min={0.1}
                    max={10}
                    step={0.1}
                    className="relative z-10"
                  />
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-border/40 bg-background/45 p-4 hover:border-glow-cyan/40 transition-colors">
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-foreground">
                    Velocity
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-glow-cyan font-semibold">
                      {velocity[0].toFixed(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">m/s</span>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-glow-cyan to-glow-cyan/30 pointer-events-none"
                    style={{ width: `${(velocity[0] / 20) * 100}%` }}
                  />
                  <Slider
                    value={velocity}
                    onValueChange={setVelocity}
                    min={0}
                    max={20}
                    step={0.5}
                    className="relative z-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-border/30 pt-4">
              <motion.div
                className="rounded-2xl border border-primary/40 bg-primary/5 p-4 hover:bg-primary/10 hover:border-primary/60 transition-all cursor-default"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  Force
                </p>
                <p className="mt-3 text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {calculatedForce}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Newtons (N)
                </p>
              </motion.div>
              <motion.div
                className="rounded-2xl border border-accent/40 bg-accent/5 p-4 hover:bg-accent/10 hover:border-accent/60 transition-all cursor-default"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  Kinetic Energy
                </p>
                <p className="mt-3 text-2xl md:text-3xl font-bold bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                  {calculatedEnergy}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Joules (J)</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border/50 bg-card/70 p-6 shadow-[0_28px_80px_-58px_rgba(56,189,248,0.35)] backdrop-blur-md sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/40 bg-background/50">
                  <activeSimulationData.icon className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {activeSimulationData.tag}
                  </p>
                  <h3 className="text-xl font-semibold text-foreground">
                    {activeSimulationData.label}
                  </h3>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-xl border-border/40"
                  onClick={() =>
                    setActiveSimulation(
                      (prev) =>
                        (prev - 1 + simulations.length) % simulations.length,
                    )
                  }
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-xl border-border/40"
                  onClick={() =>
                    setActiveSimulation(
                      (prev) => (prev + 1) % simulations.length,
                    )
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-border/40 bg-background/60 p-6">
              {activeSimulationData.id === "physics" ? (
                <div className="space-y-6">
                  {/* Speed Control */}
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-muted-foreground font-medium">
                      Animation Speed:
                    </span>
                    <div className="flex gap-2">
                      {[0.5, 1, 2].map((s) => (
                        <motion.button
                          key={s}
                          onClick={() => setSpeed(s)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                            speed === s
                              ? "bg-primary/20 border-primary/50 text-primary"
                              : "bg-background/50 border-border/40 text-muted-foreground hover:border-border/70"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {s}x
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-dashed border-border/40 bg-secondary/10">
                    <div className="absolute left-6 right-6 top-8 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      <span>Launch Preview</span>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                        {isPlaying ? "Animating" : "Static Preview"}
                      </span>
                    </div>
                    <div className="absolute bottom-14 left-6 right-6 h-px bg-border/50" />
                    <div className="absolute bottom-14 left-6 text-xs text-muted-foreground">
                      Start
                    </div>
                    <div className="absolute bottom-14 right-6 text-xs text-muted-foreground">
                      Outcome
                    </div>

                    <motion.div
                      className="absolute rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/35"
                      style={{
                        width: markerSize,
                        height: markerSize,
                        left: `calc(${markerX}% - ${markerSize / 2}px)`,
                        top: `calc(${markerY}% - ${markerSize / 2}px)`,
                      }}
                      animate={
                        isPlaying && !prefersReducedMotion
                          ? { scale: [1, 1.08, 1], y: [0, 6 * speed, 0] }
                          : undefined
                      }
                      transition={{
                        duration: 1.8 / speed,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    <div className="absolute inset-x-6 bottom-6 grid gap-3 md:grid-cols-3">
                      <div className="rounded-2xl border border-border/40 bg-background/80 p-4 hover:border-primary/50 transition-colors">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          Mass
                        </p>
                        <p className="mt-2 text-lg font-semibold text-foreground">
                          {mass[0].toFixed(1)} kg
                        </p>
                      </div>
                      <div className="rounded-2xl border border-border/40 bg-background/80 p-4 hover:border-accent/50 transition-colors">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          Gravity
                        </p>
                        <p className="mt-2 text-lg font-semibold text-foreground">
                          {gravity[0].toFixed(1)} m/s2
                        </p>
                      </div>
                      <div className="rounded-2xl border border-border/40 bg-background/80 p-4 hover:border-glow-cyan/50 transition-colors">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          Velocity
                        </p>
                        <p className="mt-2 text-lg font-semibold text-foreground">
                          {velocity[0].toFixed(1)} m/s
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/40 bg-background/45 p-4 font-mono text-sm text-muted-foreground">
                    <div>
                      F = m x g = {mass[0].toFixed(1)} x {gravity[0].toFixed(1)}{" "}
                      =
                      <span className="ml-1 text-foreground font-semibold">
                        {calculatedForce} N
                      </span>
                    </div>
                    <div className="mt-2">
                      KE = 0.5mv2 = 0.5 x {mass[0].toFixed(1)} x{" "}
                      {velocity[0].toFixed(1)}2 =
                      <span className="ml-1 text-foreground font-semibold">
                        {calculatedEnergy} J
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Additional Visualizations for other simulation types */}
                  <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-border/40 bg-background/45 p-6">
                    <motion.div
                      className="mb-3 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] text-foreground"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <activeSimulationData.icon className="h-8 w-8" />
                    </motion.div>
                    <p className="text-center text-sm text-muted-foreground mb-4">
                      {activeSimulationData.description}
                    </p>
                    <motion.div
                      className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {activeSimulationData.highlights.map((item, idx) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-2 rounded-2xl border border-border/40 bg-background/45 p-3 text-xs text-foreground hover:border-border/70 transition-colors"
                      >
                        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {simulations.map((simulation, index) => (
                  <button
                    key={simulation.id}
                    onClick={() => setActiveSimulation(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${
                      activeSimulation === index ? "bg-foreground" : "bg-muted"
                    }`}
                    aria-label={`View ${simulation.label}`}
                  />
                ))}
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                Use this block as the lightweight class demo before a live
                session or Google Meet handoff.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
