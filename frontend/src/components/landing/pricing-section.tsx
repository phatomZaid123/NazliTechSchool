"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Zap, Crown, Users } from "lucide-react";
import SocialHub from "./social-media-section";
import { BioluminescentReefBackground } from "./section-background-effects";

const pricingPlans = [
  {
    id: "starter",
    name: "Explorer",
    description: "Perfect for curious minds starting their journey",
    icon: Zap,
    color: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.3)",
    features: [
      "Access to 10+ foundational courses",
      "Basic physics & chemistry simulations",
      "Community forum access",
      "Weekly live Q&A sessions",
      "Progress tracking dashboard",
      "Mobile app access",
    ],
    highlighted: false,
  },
  {
    id: "pro",
    name: "Innovator",
    description: "For ambitious learners ready to excel",
    icon: Crown,
    color: "from-purple-500 to-pink-600",
    glowColor: "rgba(168, 85, 247, 0.4)",
    features: [
      "All Explorer features",
      "Access to 60+ premium courses",
      "Advanced lab simulations",
      "AI-powered personalized learning",
      "1-on-1 mentor sessions (2/month)",
      "Project-based certifications",
      "Priority support",
      "Offline downloads",
    ],
    highlighted: true,
   
  },
  {
    id: "enterprise",
    name: "Institution",
    description: "Complete solution for schools & organizations",
    icon: Users,
    color: "from-amber-500 to-orange-600",
    glowColor: "rgba(245, 158, 11, 0.3)",
    features: [
      "All Innovator features",
      "Unlimited team seats",
      "Custom curriculum builder",
      "White-label options",
      "Analytics & reporting dashboard",
      "Dedicated success manager",
      "API access",
      "SLA guarantee",
    ],
    highlighted: false,
  },
];

export function PricingSection() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <section
      id="pricing"
      className="relative py-32 overflow-hidden scroll-mt-28"
    >
      {/* <BioluminescentReefBackground /> */}

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="code-tag inline-flex mb-6"
          >
            // Flexible Plans for Everyone
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-5">
            Simple{" "}
            <span className="bg-gradient-to-r from-nazli-golden to-nazli-purple bg-clip-text text-transparent ">
              Pricing
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to unlock your potential. All plans include
            access to our global learning community.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24 md:mb-35">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative rounded-3xl p-8 transition-all duration-500 ${
                plan.highlighted
                  ? "bg-gradient-to-b from-purple-500/20 to-cyan-500/10 border-2 border-purple-500/50 scale-105"
                  : "bg-secondary/30 border border-border hover:border-purple-500/30"
              }`}
              style={{
                boxShadow:
                  hoveredPlan === plan.id
                    ? `0 0 60px ${plan.glowColor}`
                    : "none",
              }}
            >
             
              {/* Plan Icon */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center mb-6`}
              >
                <plan.icon className="w-8 h-8 text-white" />
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-foreground mb-2 function-call">
                {plan.name}
              </h3>
              <p className="text-muted-foreground mb-6 code-inline px-3 py-1 w-fit">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8 data-display">
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-baseline gap-2"
                  >
                    <span className="text-3xl font-bold text-foreground"> 
                      {plan.id === "starter"
                        ? "$9"
                        : plan.id === "pro"
                        ? "$29"
                        : "$99"}
                    </span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </motion.div>
                </AnimatePresence>
              </div>  
                

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-start gap-3 font-mono text-sm"
                  >
                    <span className="text-nazli-golden font-bold">✓</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-foreground text-background shadow-sm hover:shadow-md"
                    : "border border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5"
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <SocialHub />
    </section>
  );
}
