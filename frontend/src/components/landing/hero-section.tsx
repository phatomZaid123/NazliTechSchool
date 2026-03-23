"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, Globe, Cpu, Sparkles } from "lucide-react"
import { useTypewriter } from "@/hooks/use-typewriter"

export function HeroSection() {
  const { text: typedWord, isTyping } = useTypewriter({
    words: ["Doing.", "Building.", "Creating.", "Experimenting."],
    typeSpeed: 120,
    deleteSpeed: 80,
    delayBetweenWords: 2500,
  })

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated mesh gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/5" />
        
        {/* Animated gradient mesh */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(at 40% 20%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
              radial-gradient(at 80% 0%, rgba(6, 182, 212, 0.1) 0px, transparent 50%),
              radial-gradient(at 0% 50%, rgba(59, 130, 246, 0.1) 0px, transparent 50%),
              radial-gradient(at 80% 50%, rgba(139, 92, 246, 0.08) 0px, transparent 50%),
              radial-gradient(at 0% 100%, rgba(6, 182, 212, 0.12) 0px, transparent 50%),
              radial-gradient(at 80% 100%, rgba(59, 130, 246, 0.08) 0px, transparent 50%)
            `,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Animated grid pattern with glow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.15) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139, 92, 246, 0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
          animate={{
            backgroundPosition: ["0px 0px", "60px 60px"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        {/* Horizontal scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"
          animate={{
            top: ["-5%", "105%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Floating orbs with enhanced glow */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]"
        style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.2))' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[100px]"
        style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(139, 92, 246, 0.2))' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.25, 0.45, 0.25],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-[80px]"
        style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.15))' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: "rgba(139, 92, 246, 0.5)" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm text-primary font-medium">The Future of Learning</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-foreground">Learn by </span>
              <br />
              <span className="relative bg-linear-to-r from-primary via-accent to-glow-cyan bg-clip-text text-transparent">
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
              className="text-xl text-muted-foreground max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Interactive simulations, AI-powered guidance, and hands-on projects. 
              Experience education that prepares you for the real world.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="group rounded-lg px-8 py-6 text-lg shadow-sm hover:shadow-md">
                  Explore the Experience
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="rounded-lg px-8 py-6 text-lg"
                >
                  Watch Demo
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
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
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
                <div className="flex items-center gap-3 mb-3">
                  <motion.div 
                    className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-foreground">AI Assistant</div>
                    <div className="text-xs text-muted-foreground">Always here to help</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <motion.div 
                    className="bg-secondary/50 rounded-lg p-3 text-sm text-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    {"How can I solve this physics equation?"}
                  </motion.div>
                  <motion.div 
                    className="bg-primary/10 rounded-lg p-3 text-sm text-foreground border border-primary/20"
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
                    className="w-10 h-10 rounded-xl bg-linear-to-br from-accent to-glow-cyan flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Cpu className="w-5 h-5 text-accent-foreground" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-foreground">Live Simulation</div>
                    <div className="text-xs text-muted-foreground">Physics Engine</div>
                  </div>
                </div>
                <div className="h-24 rounded-lg bg-linear-to-br from-secondary to-muted flex items-center justify-center relative overflow-hidden">
                  {/* Multiple orbiting particles */}
                  <motion.div
                    className="absolute w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/50"
                    animate={{
                      x: [0, 30, 0, -30, 0],
                      y: [-25, 0, 25, 0, -25],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50"
                    animate={{
                      x: [20, -20, 20],
                      y: [0, 20, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute w-1.5 h-1.5 rounded-full bg-glow-cyan shadow-lg shadow-glow-cyan/50"
                    animate={{
                      x: [-15, 15, -15],
                      y: [15, -15, 15],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                  {/* Center glow */}
                  <motion.div
                    className="w-6 h-6 rounded-full bg-accent/30 blur-sm"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
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
                    className="w-10 h-10 rounded-xl bg-linear-to-br from-glow-cyan to-glow-blue flex items-center justify-center"
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Globe className="w-5 h-5 text-foreground" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-foreground">Global Learning</div>
                    <div className="text-xs text-muted-foreground">Connect worldwide</div>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {[
                    'bg-gradient-to-br from-primary to-accent',
                    'bg-gradient-to-br from-accent to-glow-cyan',
                    'bg-gradient-to-br from-glow-cyan to-glow-blue',
                    'bg-gradient-to-br from-glow-blue to-primary',
                  ].map((bg, i) => (
                    <motion.div
                      key={i}
                      className={`w-8 h-8 rounded-full ${bg} border-2 border-card flex items-center justify-center text-xs font-bold text-primary-foreground`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + i * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                    >
                      {['NG', 'UK', 'US', 'CA'][i]}
                    </motion.div>
                  ))}
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-xs font-medium text-muted-foreground"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.4, type: "spring" }}
                    whileHover={{ scale: 1.2 }}
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
  )
}

function FloatingCard({ 
  children, 
  delay = 0, 
  glowColor = "primary" 
}: { 
  children: React.ReactNode
  delay?: number
  glowColor?: "primary" | "accent" | "cyan"
}) {
  const glowColors = {
    primary: "rgba(139, 92, 246, 0.15)",
    accent: "rgba(6, 182, 212, 0.15)",
    cyan: "rgba(59, 130, 246, 0.15)",
  }

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
      whileHover={{ scale: 1.02, y: -15 }}
      className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-xl shadow-black/20 transition-shadow duration-300 hover:shadow-2xl"
      style={{
        boxShadow: `0 0 40px ${glowColors[glowColor]}`,
      }}
    >
      {/* Subtle gradient border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${glowColors[glowColor]}, transparent)`,
        }}
        whileHover={{ opacity: 1 }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1">
      <span className="text-foreground/80">{"Let me break it down"}</span>
      <motion.span
        className="flex gap-0.5"
        initial="hidden"
        animate="visible"
      >
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
  )
}
