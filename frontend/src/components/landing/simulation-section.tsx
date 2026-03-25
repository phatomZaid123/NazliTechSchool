"use client"

import { useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
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
} from "lucide-react"
import { useTypewriterOnce } from "@/hooks/use-typewriter"

const simulations = [
  {
    id: "physics",
    label: "Physics Lab",
    description: "Manipulate gravity, mass, and velocity in real time.",
    icon: Atom,
    tag: "Mechanics",
    highlights: ["Force and energy update instantly", "Perfect for class walkthroughs", "Great for landing-page demos"],
  },
  {
    id: "coding",
    label: "Coding Studio",
    description: "Build logic paths and preview algorithm outcomes without leaving the browser.",
    icon: Code2,
    tag: "Programming",
    highlights: ["Step-by-step problem solving", "Instant AI feedback prompts", "Project checkpoints for students"],
  },
  {
    id: "chemistry",
    label: "Chemistry Lab",
    description: "Explore reactions safely with visual experiment guides and result summaries.",
    icon: FlaskConical,
    tag: "Science",
    highlights: ["Reaction setup previews", "Lab safety callouts", "Results ready for instructor review"],
  },
  {
    id: "robotics",
    label: "Robotics Studio",
    description: "Test motion logic and workflow planning before students build the physical prototype.",
    icon: Bot,
    tag: "Engineering",
    highlights: ["Motion checkpoints", "Sensor workflow planning", "Mentor review snapshots"],
  },
]

export function SimulationSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeSimulation, setActiveSimulation] = useState(0)
  const [gravity, setGravity] = useState([9.8])
  const [mass, setMass] = useState([1])
  const [velocity, setVelocity] = useState([5])

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()

  const { displayText: headingText } = useTypewriterOnce(
    "Real Physics",
    60,
    isInView ? 300 : 99999
  )

  const calculatedForce = (mass[0] * gravity[0]).toFixed(2)
  const calculatedEnergy = (0.5 * mass[0] * velocity[0] * velocity[0]).toFixed(2)
  const activeSimulationData = simulations[activeSimulation]

  const markerSize = 30 + mass[0] * 6
  const markerX = Math.min(80, 18 + velocity[0] * 2.8)
  const markerY = Math.max(16, 72 - gravity[0] * 1.7 - velocity[0] * 0.7)

  return (
    <section id="simulation" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/60 px-4 py-2">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Interactive Learning</span>
          </div>
          <h2 className="mb-6 text-4xl font-bold text-balance md:text-5xl">
            <span className="text-foreground">Experience </span>
            <span className="bg-gradient-to-r from-accent to-glow-cyan bg-clip-text text-transparent">
              {headingText}
              {headingText !== "Real Physics" && (
                <span className="ml-1 inline-block h-[0.8em] w-[3px] animate-pulse bg-accent align-middle" />
              )}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            A lighter simulation demo that still shows live controls, clear outcomes, and how the product could be
            presented in class or on the landing page.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 rounded-3xl border border-border/50 bg-card/70 p-8 backdrop-blur-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/50 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  Simulation Controls
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">Live parameter preview</h3>
              </div>

              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-xl border-border/40"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-xl border-border/40"
                  onClick={() => {
                    setGravity([9.8])
                    setMass([1])
                    setVelocity([5])
                    setIsPlaying(false)
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
                      <p className="text-sm font-semibold text-foreground">{simulation.label}</p>
                      <p className="text-xs text-muted-foreground">{simulation.tag}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-sm leading-6 text-muted-foreground">{activeSimulationData.description}</p>

            <div className="space-y-6">
              <div className="space-y-3 rounded-2xl border border-border/40 bg-background/45 p-4">
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-foreground">Gravity</label>
                  <span className="font-mono text-primary">{gravity[0].toFixed(1)} m/s2</span>
                </div>
                <Slider value={gravity} onValueChange={setGravity} min={0} max={25} step={0.1} />
              </div>

              <div className="space-y-3 rounded-2xl border border-border/40 bg-background/45 p-4">
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-foreground">Mass</label>
                  <span className="font-mono text-accent">{mass[0].toFixed(1)} kg</span>
                </div>
                <Slider value={mass} onValueChange={setMass} min={0.1} max={10} step={0.1} />
              </div>

              <div className="space-y-3 rounded-2xl border border-border/40 bg-background/45 p-4">
                <div className="flex items-center justify-between text-sm">
                  <label className="font-medium text-foreground">Velocity</label>
                  <span className="font-mono text-glow-cyan">{velocity[0].toFixed(1)} m/s</span>
                </div>
                <Slider value={velocity} onValueChange={setVelocity} min={0} max={20} step={0.5} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-border/30 pt-4">
              <div className="rounded-2xl border border-border/40 bg-background/45 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Force</p>
                <p className="mt-2 text-2xl font-bold text-primary">{calculatedForce} N</p>
              </div>
              <div className="rounded-2xl border border-border/40 bg-background/45 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Kinetic Energy</p>
                <p className="mt-2 text-2xl font-bold text-accent">{calculatedEnergy} J</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border/50 bg-card/70 p-8 backdrop-blur-md"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/40 bg-background/50">
                  <activeSimulationData.icon className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{activeSimulationData.tag}</p>
                  <h3 className="text-xl font-semibold text-foreground">{activeSimulationData.label}</h3>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-xl border-border/40"
                  onClick={() => setActiveSimulation((prev) => (prev - 1 + simulations.length) % simulations.length)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-xl border-border/40"
                  onClick={() => setActiveSimulation((prev) => (prev + 1) % simulations.length)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-border/40 bg-background/60 p-6">
              {activeSimulationData.id === "physics" ? (
                <div className="space-y-6">
                  <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-dashed border-border/40 bg-secondary/10">
                    <div className="absolute left-6 right-6 top-8 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      <span>Launch Preview</span>
                      <span>{isPlaying ? "Animating" : "Static Preview"}</span>
                    </div>
                    <div className="absolute bottom-14 left-6 right-6 h-px bg-border/50" />
                    <div className="absolute bottom-14 left-6 text-xs text-muted-foreground">Start</div>
                    <div className="absolute bottom-14 right-6 text-xs text-muted-foreground">Outcome</div>

                    <motion.div
                      className="absolute rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/35"
                      style={{
                        width: markerSize,
                        height: markerSize,
                        left: `calc(${markerX}% - ${markerSize / 2}px)`,
                        top: `calc(${markerY}% - ${markerSize / 2}px)`,
                      }}
                      animate={isPlaying && !prefersReducedMotion ? { scale: [1, 1.08, 1], y: [0, 6, 0] } : undefined}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <div className="absolute inset-x-6 bottom-6 grid gap-3 md:grid-cols-3">
                      <div className="rounded-2xl border border-border/40 bg-background/80 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Mass</p>
                        <p className="mt-2 text-lg font-semibold text-foreground">{mass[0].toFixed(1)} kg</p>
                      </div>
                      <div className="rounded-2xl border border-border/40 bg-background/80 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Gravity</p>
                        <p className="mt-2 text-lg font-semibold text-foreground">{gravity[0].toFixed(1)} m/s2</p>
                      </div>
                      <div className="rounded-2xl border border-border/40 bg-background/80 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Velocity</p>
                        <p className="mt-2 text-lg font-semibold text-foreground">{velocity[0].toFixed(1)} m/s</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/40 bg-background/45 p-4 font-mono text-sm text-muted-foreground">
                    <div>
                      F = m x g = {mass[0].toFixed(1)} x {gravity[0].toFixed(1)} =
                      <span className="ml-1 text-foreground">{calculatedForce} N</span>
                    </div>
                    <div className="mt-2">
                      KE = 0.5mv2 = 0.5 x {mass[0].toFixed(1)} x {velocity[0].toFixed(1)}2 =
                      <span className="ml-1 text-foreground">{calculatedEnergy} J</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm leading-6 text-muted-foreground">{activeSimulationData.description}</p>
                  {activeSimulationData.highlights.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-border/40 bg-background/45 p-4 text-sm text-foreground"
                    >
                      {item}
                    </div>
                  ))}
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
              <p className="text-sm text-muted-foreground">
                Use this block as the lightweight class demo before a live session or Google Meet handoff.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
