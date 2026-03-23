"use client"

import { motion } from "framer-motion"
import { Mail, MessageCircle, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function QuestionsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border/40 bg-card/40 backdrop-blur-xl p-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-card/60 text-sm font-semibold text-foreground">
              <MessageCircle className="w-4 h-4" />
              We Love Questions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-5">
              Ask us anything about courses, pricing, or partnerships
            </h2>
            <p className="text-muted-foreground mt-3">
              Our team will reply quickly with the guidance you need to choose the best learning path.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-foreground" />
                hello@nazlitechschool.org
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <PhoneCall className="w-4 h-4 text-foreground" />
                +1 (555) 123-4567
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border/40 bg-background/70 p-8"
          >
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Name" />
                <Input type="email" placeholder="Email" />
              </div>
              <Input placeholder="Subject" />
              <Textarea placeholder="Message" className="min-h-[140px]" />

              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" className="accent-foreground" />
                Sign up for our email list for updates and promotions.
              </label>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <Button className="rounded-lg px-6">Send Message</Button>
                <span className="text-xs text-muted-foreground">
                  We reply within 24 hours.
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
