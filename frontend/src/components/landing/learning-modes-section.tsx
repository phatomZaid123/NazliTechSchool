"use client"

import { motion } from "framer-motion"
import { Users, Star, Clock, Play, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LearningModesSection() {
  return (
    <section className="relative py-24 overflow-hidden">

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border/40 bg-card/40 backdrop-blur-xl p-8"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Users className="w-4 h-4" />
              Choose What Works For You
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-3">
              Group lessons, 1-on-1 mentoring, or self-paced mastery
            </h3>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Flexible learning formats built around your schedule, with our AI mascot guiding each step.
            </p>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-border/40 bg-background/60 p-5">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-foreground" />
                  <span className="text-sm font-semibold text-foreground">Group Lessons</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Collaborate with peers, build accountability, and learn faster together.
                </p>
              </div>

              <div className="rounded-2xl border border-border/40 bg-background/60 p-5">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-foreground" />
                  <span className="text-sm font-semibold text-foreground">1-on-1 Mentorship</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Personalized guidance with expert tutors tailored to your goals.
                </p>
              </div>

              <div className="rounded-2xl border border-border/40 bg-background/60 p-5">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-foreground" />
                  <span className="text-sm font-semibold text-foreground">Self-Paced</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Learn anytime, anywhere with bite-size lessons and flexible deadlines.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border/40 bg-background/70 p-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-card/60 text-xs font-semibold text-foreground">
              Coursera Partnership
            </div>
            <h3 className="text-2xl font-bold text-foreground mt-4">Coursera-powered courses</h3>
            <p className="text-sm text-muted-foreground mt-3">
              We integrate Coursera pathways so learners can earn globally recognized certificates alongside Nazli Tech School projects.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-foreground" />
                Industry-recognized certificates
              </li>
              <li className="flex items-center gap-2">
                <Users className="w-4 h-4 text-foreground" />
                Expert-led specializations
              </li>
              <li className="flex items-center gap-2">
                <Play className="w-4 h-4 text-foreground" />
                Project-based assessments
              </li>
            </ul>

            <div className="mt-6">
              <Button className="rounded-lg px-6">
                Explore Partner Courses
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
