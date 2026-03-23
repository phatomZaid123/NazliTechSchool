"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap } from "lucide-react"
import { useTypewriterOnce } from "@/hooks/use-typewriter"

export function CTASection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const { displayText: line1, isComplete: line1Complete } = useTypewriterOnce(
    "Don't just learn",
    40,
    isInView ? 200 : 99999
  )
  const { displayText: line2, isComplete: line2Complete } = useTypewriterOnce(
    "the future.",
    40,
    isInView && line1Complete ? 100 : 99999
  )
  const { displayText: line3 } = useTypewriterOnce(
    "Build it.",
    60,
    isInView && line2Complete ? 200 : 99999
  )

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Dynamic background with waves */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        
        {/* Animated wave patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          <motion.path
            d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 L1000,300 L0,300 Z"
            fill="url(#waveGradient1)"
            initial={{ d: "M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 L1000,300 L0,300 Z" }}
            animate={{ 
              d: [
                "M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 L1000,300 L0,300 Z",
                "M0,150 C150,50 350,150 500,50 C650,150 850,50 1000,150 L1000,300 L0,300 Z",
                "M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 L1000,300 L0,300 Z"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,150 C200,50 400,150 600,50 C800,150 900,50 1000,150 L1000,300 L0,300 Z"
            fill="url(#waveGradient2)"
            initial={{ d: "M0,150 C200,50 400,150 600,50 C800,150 900,50 1000,150 L1000,300 L0,300 Z" }}
            animate={{ 
              d: [
                "M0,150 C200,50 400,150 600,50 C800,150 900,50 1000,150 L1000,300 L0,300 Z",
                "M0,100 C200,150 400,50 600,150 C800,50 900,150 1000,100 L1000,300 L0,300 Z",
                "M0,150 C200,50 400,150 600,50 C800,150 900,50 1000,150 L1000,300 L0,300 Z"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
              <stop offset="50%" stopColor="rgba(6, 182, 212, 0.2)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.3)" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.2)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.15)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0.2)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px]"
        style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(6, 182, 212, 0.15))' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 2 === 0 ? "rgba(139, 92, 246, 0.6)" : "rgba(6, 182, 212, 0.6)",
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            boxShadow: `0 0 20px ${i % 2 === 0 ? "rgba(139, 92, 246, 0.5)" : "rgba(6, 182, 212, 0.5)"}`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, i % 2 === 0 ? 20 : -20, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 cursor-default"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm text-primary font-medium">Your Future Starts Here</span>
          </motion.div>

          {/* Main heading with typewriter effect */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 min-h-[280px] md:min-h-[320px]">
            <span className="text-foreground block">{line1}</span>
            <span className="text-foreground block">{line2}</span>
            <span className="bg-gradient-to-r from-primary via-accent to-glow-cyan bg-clip-text text-transparent block">
              {line3}
              {!line3.includes("Build it.") && (
                <motion.span
                  className="inline-block w-[4px] h-[0.9em] bg-primary ml-2 align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </span>
          </h2>

          {/* Description */}
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Join thousands of students worldwide who are already building the next generation of technology. 
            Your journey to mastery begins with a single step.
          </motion.p>

          {/* CTA buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="group rounded-lg px-10 py-7 text-lg shadow-sm hover:shadow-md">
                <Zap className="w-5 h-5 mr-2" />
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-lg px-10 py-7 text-lg"
              >
                Schedule a Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="mt-16 pt-16 border-t border-border/30"
          >
            <p className="text-sm text-muted-foreground mb-6">Trusted by learners from</p>
            <div className="flex flex-wrap justify-center gap-8">
              {['Google', 'Microsoft', 'Meta', 'Amazon', 'Apple'].map((company, i) => (
                <motion.span 
                  key={company} 
                  className="text-lg font-semibold text-muted-foreground/60 hover:text-primary transition-colors cursor-default"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + i * 0.1 }}
                  whileHover={{ scale: 1.1, color: "oklch(0.65 0.25 280)" }}
                >
                  {company}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
