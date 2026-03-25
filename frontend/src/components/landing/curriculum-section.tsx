"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { BookOpen, CheckCircle2, Sparkles, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

const pillars = [
  {
    title: "Structured Progression",
    description: "A guided path from fundamentals to advanced mastery with clear checkpoints.",
  },
  {
    title: "Real-World Projects",
    description: "Every module ends with a portfolio-ready build to prove real skill.",
  },
  {
    title: "AI-Enhanced Guidance",
    description: "Your Nazli AI mascot supports you with hints, feedback, and next steps.",
  },
  {
    title: "Global Standards",
    description: "Aligned with international curricula (IB, AP, IGCSE) and industry needs.",
  },
]

export function CurriculumSection() {
  const sectionRef = useRef(null)

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/60 mb-5">
            <BookOpen className="w-4 h-4 text-foreground" />
            <span className="text-sm text-foreground font-medium">Our Curriculum</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">The Cognoscentia Method</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-3">
            A learning journey that blends rigorous fundamentals with hands-on practice and real-world impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border/50 bg-card/70 backdrop-blur-xl p-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nazli Tech School</p>
                <h3 className="text-xl font-semibold text-foreground">Learning Blueprint</h3>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="flex gap-4">
                  <CheckCircle2 className="w-5 h-5 text-foreground mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">{pillar.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border/50 bg-background/70 p-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border border-border/50 flex items-center justify-center">
                <Layers className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Curriculum Tracks</p>
                <h3 className="text-xl font-semibold text-foreground">Built for Global Success</h3>
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              {[
                "IB, AP, and IGCSE-aligned pathways",
                "Project portfolios that prove skill and creativity",
                "Mentor feedback loops after every module",
                "Live cohort options and self-paced flexibility",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-border/40 bg-card/40 p-4">
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button className="rounded-lg px-6">Explore Curriculum</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
