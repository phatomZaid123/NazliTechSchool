"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Zap, Atom, Code2, Sparkles, Bot, FlaskConical, ChevronLeft, ChevronRight } from "lucide-react"
import { useTypewriterOnce } from "@/hooks/use-typewriter"

const simulations = [
  {
    id: "physics",
    label: "Physics Lab",
    description: "Manipulate gravity, mass, and velocity in real time.",
    icon: Atom,
    tag: "Mechanics",
  },
  {
    id: "coding",
    label: "Coding Studio",
    description: "Build algorithms and see results instantly with live feedback.",
    icon: Code2,
    tag: "Programming",
  },
  {
    id: "chemistry",
    label: "Chemistry Lab",
    description: "Explore reactions and molecular behavior through safe simulations.",
    icon: FlaskConical,
    tag: "Science",
  },
  {
    id: "robotics",
    label: "Robotics Studio",
    description: "Design motion systems and test robotic workflows virtually.",
    icon: Bot,
    tag: "Engineering",
  },
]

export function SimulationSection() {
  const [isPlaying, setIsPlaying] = useState(true)
  const prefersReducedMotion = useReducedMotion()
  const [activeSimulation, setActiveSimulation] = useState(0)
  const [gravity, setGravity] = useState([9.8])
  const [mass, setMass] = useState([1])
  const [velocity, setVelocity] = useState([5])
  const [hoveredSlider, setHoveredSlider] = useState<string | null>(null)
  
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const { displayText: headingText } = useTypewriterOnce(
    "Real Physics",
    60,
    isInView ? 300 : 99999
  )

  const calculatedForce = (mass[0] * gravity[0]).toFixed(2)
  const calculatedEnergy = (0.5 * mass[0] * velocity[0] * velocity[0]).toFixed(2)

  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return

    const interval = setInterval(() => {
      setActiveSimulation((prev) => (prev + 1) % simulations.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPlaying, prefersReducedMotion])

  const activeSimulationData = simulations[activeSimulation]

  return (
    <section id="simulation" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      {/* Animated orbital rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-[100px] rounded-full border border-accent/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-[200px] rounded-full border border-glow-cyan/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-25"
        style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.2))' }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-6"
            whileHover={{ scale: 1.05, borderColor: "rgba(6, 182, 212, 0.5)" }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-4 h-4 text-accent" />
            </motion.div>
            <span className="text-sm text-accent font-medium">Interactive Learning</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            <span className="text-foreground">Experience </span>
            <span className="bg-gradient-to-r from-accent to-glow-cyan bg-clip-text text-transparent">
              {headingText}
              {headingText !== "Real Physics" && (
                <motion.span
                  className="inline-block w-[3px] h-[0.8em] bg-accent ml-1 align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our interactive simulations let you manipulate real-world physics parameters in real-time
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 space-y-8"
            whileHover={{ borderColor: "rgba(139, 92, 246, 0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                >
                  <Atom className="w-5 h-5 text-primary" />
                </motion.div>
                Physics Simulation
              </h3>
              <div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-xl hover:border-primary/50 hover:bg-primary/10"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-xl hover:border-accent/50 hover:bg-accent/10"
                    onClick={() => {
                      setGravity([9.8])
                      setMass([1])
                      setVelocity([5])
                    }}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Gravity Slider */}
            <motion.div 
              className="space-y-4 p-4 rounded-2xl transition-colors"
              style={{ 
                backgroundColor: hoveredSlider === 'gravity' ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
              }}
              onMouseEnter={() => setHoveredSlider('gravity')}
              onMouseLeave={() => setHoveredSlider(null)}
            >
              <div className="flex justify-between">
                <label className="text-sm font-medium text-foreground">Gravity (m/s²)</label>
                <motion.span 
                  className="text-sm text-primary font-mono"
                  animate={hoveredSlider === 'gravity' ? { scale: 1.1 } : { scale: 1 }}
                >
                  {gravity[0].toFixed(1)}
                </motion.span>
              </div>
              <Slider
                value={gravity}
                onValueChange={setGravity}
                min={0}
                max={25}
                step={0.1}
                className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_.relative]:bg-secondary [&_[data-disabled]]:bg-muted"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Moon (1.6)</span>
                <span>Earth (9.8)</span>
                <span>Jupiter (24.8)</span>
              </div>
            </motion.div>

            {/* Mass Slider */}
            <motion.div 
              className="space-y-4 p-4 rounded-2xl transition-colors"
              style={{ 
                backgroundColor: hoveredSlider === 'mass' ? 'rgba(6, 182, 212, 0.05)' : 'transparent',
              }}
              onMouseEnter={() => setHoveredSlider('mass')}
              onMouseLeave={() => setHoveredSlider(null)}
            >
              <div className="flex justify-between">
                <label className="text-sm font-medium text-foreground">Mass (kg)</label>
                <motion.span 
                  className="text-sm text-accent font-mono"
                  animate={hoveredSlider === 'mass' ? { scale: 1.1 } : { scale: 1 }}
                >
                  {mass[0].toFixed(1)}
                </motion.span>
              </div>
              <Slider
                value={mass}
                onValueChange={setMass}
                min={0.1}
                max={10}
                step={0.1}
                className="[&_[role=slider]]:bg-accent [&_[role=slider]]:border-accent"
              />
            </motion.div>

            {/* Velocity Slider */}
            <motion.div 
              className="space-y-4 p-4 rounded-2xl transition-colors"
              style={{ 
                backgroundColor: hoveredSlider === 'velocity' ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
              }}
              onMouseEnter={() => setHoveredSlider('velocity')}
              onMouseLeave={() => setHoveredSlider(null)}
            >
              <div className="flex justify-between">
                <label className="text-sm font-medium text-foreground">Initial Velocity (m/s)</label>
                <motion.span 
                  className="text-sm text-glow-cyan font-mono"
                  animate={hoveredSlider === 'velocity' ? { scale: 1.1 } : { scale: 1 }}
                >
                  {velocity[0].toFixed(1)}
                </motion.span>
              </div>
              <Slider
                value={velocity}
                onValueChange={setVelocity}
                min={0}
                max={20}
                step={0.5}
                className="[&_[role=slider]]:bg-glow-cyan [&_[role=slider]]:border-glow-cyan"
              />
            </motion.div>

            {/* Calculated Values */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
              <motion.div 
                className="bg-secondary/50 rounded-2xl p-4 border border-transparent hover:border-primary/30 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Gravitational Force
                </div>
                <motion.div 
                  className="text-2xl font-bold text-primary font-mono"
                  key={calculatedForce}
                  initial={{ scale: 1.2, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {calculatedForce} N
                </motion.div>
              </motion.div>
              <motion.div 
                className="bg-secondary/50 rounded-2xl p-4 border border-transparent hover:border-accent/30 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Kinetic Energy
                </div>
                <motion.div 
                  className="text-2xl font-bold text-accent font-mono"
                  key={calculatedEnergy}
                  initial={{ scale: 1.2, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {calculatedEnergy} J
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Simulation Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 h-[500px] relative overflow-hidden"
          >
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 55%)",
                }}
              />
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl border border-border/50 flex items-center justify-center">
                    <activeSimulationData.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{activeSimulationData.tag}</p>
                    <h3 className="text-lg font-semibold text-foreground">{activeSimulationData.label}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-lg"
                    onClick={() =>
                      setActiveSimulation((prev) => (prev - 1 + simulations.length) % simulations.length)
                    }
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-lg"
                    onClick={() => setActiveSimulation((prev) => (prev + 1) % simulations.length)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSimulationData.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 flex-1 rounded-2xl border border-border/40 bg-background/60 p-6 relative overflow-hidden"
                >
                  {activeSimulationData.id === "physics" ? (
                    <div className="relative h-full">
                      {isPlaying && !prefersReducedMotion && (
                        <>
                          <motion.div
                            className="absolute"
                            style={{
                              width: (20 + mass[0] * 8) + "px",
                              height: (20 + mass[0] * 8) + "px",
                            }}
                            animate={{
                              y: [40, 320 - velocity[0] * 10, 40],
                              x: [80, 180, 80],
                            }}
                            transition={{
                              duration: 3 - gravity[0] / 15,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <motion.div
                              className="w-full h-full rounded-full"
                              style={{
                                background: "linear-gradient(135deg, oklch(0.65 0.25 280), oklch(0.75 0.15 200))",
                                boxShadow:
                                  "0 0 " + (18 + velocity[0] * 2) + "px oklch(0.65 0.25 280 / 0.6)",
                              }}
                              animate={{
                                boxShadow: [
                                  "0 0 " + (18 + velocity[0] * 2) + "px oklch(0.65 0.25 280 / 0.6)",
                                  "0 0 " + (28 + velocity[0] * 2) + "px oklch(0.65 0.25 280 / 0.7)",
                                  "0 0 " + (18 + velocity[0] * 2) + "px oklch(0.65 0.25 280 / 0.6)",
                                ],
                              }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          </motion.div>
                        </>
                      )}

                      {!isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center">
                            <Pause className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Simulation Paused</p>
                          </div>
                        </div>
                      )}

                      <div className="absolute bottom-6 left-6 right-6 bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Code2 className="w-4 h-4 text-foreground" />
                          <span className="text-sm font-medium text-foreground">Live Equations</span>
                        </div>
                        <div className="font-mono text-sm text-muted-foreground space-y-1">
                          <div>
                            F = m x g = {mass[0].toFixed(1)} x {gravity[0].toFixed(1)} =
                            <span className="text-foreground ml-1">{calculatedForce} N</span>
                          </div>
                          <div>
                            KE = 0.5mv² = 0.5 x {mass[0].toFixed(1)} x {velocity[0].toFixed(1)}² =
                            <span className="text-foreground ml-1">{calculatedEnergy} J</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col justify-between">
                      <p className="text-sm text-muted-foreground">{activeSimulationData.description}</p>
                      <div className="mt-6 grid gap-4">
                        {[
                          "Interactive checkpoints",
                          "Guided by the Nazli AI mascot",
                          "Projects across multiple topics",
                        ].map((item) => (
                          <div
                            key={item}
                            className="rounded-xl border border-border/40 bg-card/60 p-4 text-sm text-foreground"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {simulations.map((sim, index) => (
                    <button
                      key={sim.id}
                      onClick={() => setActiveSimulation(index)}
                      className={
                        "h-2.5 w-2.5 rounded-full transition-colors " +
                        (activeSimulation === index ? "bg-foreground" : "bg-muted")
                      }
                      aria-label={"View " + sim.label}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">Auto-swaps every 6s</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
