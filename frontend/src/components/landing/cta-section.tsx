import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { ArrowRight, Sparkles, Zap, CheckCircle2 } from "lucide-react";

export function CTASection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const line1 = "Don't just learn";
  const line2 = "the future.";
  const line3 = "Build it.";

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-linear-to-br from-primary/30 via-accent/20 to-transparent rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05)_0%,transparent_100%)]"></div>
      </div>

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-linear-to-r from-primary/10 to-accent/5 mb-8 cursor-default"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm text-primary font-medium">
              Your Future Starts Here
            </span>
          </motion.div>

          {/* Main heading with typewriter effect */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 min-h-70 md:min-h-80 leading-tight">
            <span className="text-foreground block">{line1}</span>
            <span className="text-foreground block">{line2}</span>
            <span className="bg-linear-to-r from-primary via-accent to-cyan-400 bg-clip-text text-transparent block animate-pulse">
              {line3}
              {!line3.includes("Build it.") && (
                <motion.span
                  className="inline-block w-1 h-[0.9em] bg-primary ml-2 align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </span>
          </h2>

          {/* Description */}
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Join thousands of students worldwide who are already building the
            next generation of technology. Your journey to mastery begins with a
            single step.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button className="group rounded-xl bg-linear-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/50 px-8 py-6 text-base font-semibold transition-all text-white flex items-center justify-center">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="rounded-xl border border-border/50 hover:bg-card/80 px-8 py-6 text-base font-semibold transition-all flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              See Demo
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-border/30"
          >
            {[
              {
                icon: CheckCircle2,
                title: "5,000+ Students",
                description: "Learning every day",
              },
              {
                icon: Sparkles,
                title: "98% Satisfaction",
                description: "Completely satisfied",
              },
              {
                icon: Zap,
                title: "Lifetime Access",
                description: "Learn at your pace",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="text-center">
                  <Icon className="w-6 h-6 text-accent mx-auto mb-3" />
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
