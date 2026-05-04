"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Sparkles,
  Zap,
  Crown,
  Users,
  BookOpen,
  Video,
  Code,
  FlaskConical,
  ChefHat,
} from "lucide-react";


const pricingPlans = [
  {
    id: "starter",
    name: "Explorer",
    description: "Perfect for curious minds starting their journey",
    price: { monthly: 29, yearly: 290 },
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
    price: { monthly: 79, yearly: 790 },
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
    badge: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Institution",
    description: "Complete solution for schools & organizations",
    price: { monthly: 199, yearly: 1990 },
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

const courseCategories = [
  {
    id: "programming",
    name: "Programming",
    icon: Code,
    color: "from-emerald-500 to-teal-600",
    courses: 25,
    students: "12K+",
    description: "Python, JavaScript, AI/ML, Web Dev",
  },
  {
    id: "sciences",
    name: "Sciences",
    icon: FlaskConical,
    color: "from-blue-500 to-indigo-600",
    courses: 18,
    students: "8K+",
    description: "Physics, Chemistry, Biology Labs",
  },
  {
    id: "video",
    name: "Video Production",
    icon: Video,
    color: "from-pink-500 to-rose-600",
    courses: 12,
    students: "5K+",
    description: "Editing, Animation, VFX",
  },
  {
    id: "culinary",
    name: "Culinary Arts",
    icon: ChefHat,
    color: "from-amber-500 to-orange-600",
    courses: 8,
    students: "3K+",
    description: "Cooking, Baking, Nutrition",
  },
];

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("programming");
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">
              Flexible Plans for Everyone
            </span>
          </motion.div>

         

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to unlock your potential. All plans include
            access to our global learning community.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-4 p-2 rounded-2xl bg-secondary/50 border border-border">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 relative ${
                billingCycle === "yearly"
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-xs font-bold text-white">
                -17%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
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
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Icon */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center mb-6`}
              >
                <plan.icon className="w-8 h-8 text-white" />
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {plan.name}
              </h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={billingCycle}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-baseline gap-2"
                  >
                    <span className="text-5xl font-bold text-foreground">
                      $
                      {billingCycle === "monthly"
                        ? plan.price.monthly
                        : Math.round(plan.price.yearly / 12)}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </motion.div>
                </AnimatePresence>
                {billingCycle === "yearly" && (
                  <p className="text-sm text-emerald-400 mt-2">
                    Billed ${plan.price.yearly}/year
                  </p>
                )}
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
                    className="flex items-start gap-3"
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </div>
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

        {/* Course Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Our Course Portals
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Themed learning experiences designed for different passions and
              career paths
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {courseCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                <category.icon className="w-5 h-5" />
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Category Content */}
          <AnimatePresence mode="wait">
            {courseCategories.map(
              (category) =>
                selectedCategory === category.id && (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`relative rounded-3xl p-8 md:p-12 bg-gradient-to-br ${category.color} overflow-hidden`}
                  >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <category.icon className="w-10 h-10 text-white" />
                          <h4 className="text-3xl font-bold text-white">
                            {category.name}
                          </h4>
                        </div>
                        <p className="text-white/80 text-lg mb-6">
                          {category.description}
                        </p>
                        <div className="flex gap-6 mb-8">
                          <div>
                            <p className="text-3xl font-bold text-white">
                              {category.courses}
                            </p>
                            <p className="text-white/70">Courses</p>
                          </div>
                          <div>
                            <p className="text-3xl font-bold text-white">
                              {category.students}
                            </p>
                            <p className="text-white/70">Students</p>
                          </div>
                        </div>
                        <button className="rounded-lg px-8 py-6 font-semibold">
                          Explore {category.name}
                        </button>
                      </div>

                      {/* Preview Cards */}
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((item) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: item * 0.1 }}
                            className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                          >
                            <div className="w-full aspect-video bg-white/30 rounded-xl mb-3" />
                            <div className="h-3 bg-white/30 rounded w-3/4 mb-2" />
                            <div className="h-2 bg-white/20 rounded w-1/2" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-3xl bg-secondary/30 border border-border"
        >
          {[
            { value: "2,800+", label: "Active Students" },
            { value: "60+", label: "Expert Courses" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "15+", label: "Countries" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
