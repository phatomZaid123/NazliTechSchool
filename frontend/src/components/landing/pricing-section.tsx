"use client";

import { motion } from "framer-motion";
import { Check, Crown, Gem, Medal, Shield, Sparkles } from "lucide-react";
import { useSectionAudio } from "@/hooks/use-section-audio";
import pricingAudio from "@/assets/pricingaudio.mp3";
import SocialHub from "./social-media-section";

const pricingPlans = [
  {
    id: "silver",
    name: "Silver",
    duration: "1 month package",
    months: 1,
    price: 120,
    icon: Shield,
    color: "from-slate-300 via-slate-400 to-slate-500",
    cardTone:
      "from-nazli-purple/20 via-background/82 to-nazli-golden/10 border-nazli-gray/35",
    iconTint: "text-slate-200/70",
    features: [
      "Ideal for learners getting started",
      "Flexible and short commitment",
    
    ],
  },
  {
    id: "gold",
    name: "Gold",
    duration: "3 month package",
    months: 3,
    price: 345,
    icon: Medal,
    color: "from-amber-300 via-yellow-400 to-amber-500",
    cardTone:
      "from-nazli-golden/22 via-background/80 to-nazli-purple/12 border-nazli-golden/40",
    iconTint: "text-amber-300/65",
    features: [
      "Balanced pace for sustained growth",
      "Great for building consistency",
      
    ],
  },
  {
    id: "ruby",
    name: "Ruby",
    duration: "6 month package",
    months: 6,
    price: 660,
    icon: Gem,
    color: "from-rose-400 via-red-500 to-rose-600",
    cardTone:
      "from-rose-500/20 via-background/80 to-nazli-purple/10 border-rose-400/35",
    iconTint: "text-rose-300/65",
    features: [
      "Strong medium-term momentum",
      "Perfect for deeper skill building",
      
    ],
  },
  {
    id: "safire",
    name: "Sapphire",
    duration: "9 month package",
    months: 9,
    price: 945,
    icon: Sparkles,
    color: "from-sky-300 via-cyan-500 to-blue-600",
    cardTone:
      "from-cyan-500/18 via-background/80 to-nazli-purple/12 border-cyan-400/35",
    iconTint: "text-cyan-300/65",
    features: [
      "Extended track for long-term mastery",
      "Designed for steady advanced progress",
    
    ],
  },
  {
    id: "diamond",
    name: "Diamond",
    duration: "12 month package",
    months: 12,
    price: 1200,
    icon: Crown,
    color: "from-violet-400 via-fuchsia-500 to-pink-600",
    cardTone:
      "from-nazli-purple/28 via-background/75 to-nazli-golden/14 border-violet-400/45",
    iconTint: "text-violet-200/70",
    features: [
      "Full-year commitment package",
      "Best for complete learning journeys",
     
    ],
  },
];

function createPackageMailto(plan: (typeof pricingPlans)[number]) {
  const recipient = "admissions@nazlitech.org";
  const subject = `Package Request - ${plan.name} (${plan.months} ${plan.months === 1 ? "Month" : "Months"})`;
  const body = `Hello Nazli Tech Team,

I would like to enroll in this package:
- Package: ${plan.name}
- Duration: ${plan.duration}
- Currency: EUR (€)

My details:
- Full name:
- Student age:
- Preferred course:
- Country / Timezone:
- Preferred start date:

Thank you.`;

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function PricingSection() {
  const sectionRef = useSectionAudio({
    audioSrc: pricingAudio,
    sectionId: "pricing",
  });

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="pricing"
      className="relative overflow-hidden py-32 scroll-mt-28"
    >
      <div className="container relative z-10 mx-auto px-4 ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-5xl text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="code-tag mb-6 inline-flex"
          >
            // Packages Billed in Euro (EUR)
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-purple-400 to-amber-300 bg-clip-text text-transparent mb-6">
            Choose Your Learning Package
          </h2>

          <p className="text-lg text-white max-w-4xl mx-auto leading-[1.7]">
            Pick a package duration that fits your goals. All plans are billed
            in euro currency and designed for flexible learning paths. Each package will be tailored to fit your specific need instead of just dumped on you
          </p>
           
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5 mb-24 md:mb-35">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: plan.id === "diamond" ? -6 : -4, scale: plan.id === "diamond" ? 1.02 : 1.01 }}
              className={`group relative overflow-hidden rounded-2xl border bg-linear-to-br p-6 transition-all duration-250 hover:shadow-xl hover:shadow-nazli-purple/15 ${plan.id === "diamond" ? "ring-1 ring-nazli-golden/40 shadow-lg shadow-nazli-golden/20" : ""} ${plan.cardTone}`}
            >
              <motion.div
                aria-hidden="true"
                animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
                transition={{
                  duration: 5.5 + index * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className={`pointer-events-none absolute -right-7 -top-7 ${plan.iconTint} opacity-25`}
              >
                <plan.icon className="h-24 w-24" strokeWidth={1.4} />
              </motion.div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(219,172,52,0.18),transparent_45%),radial-gradient(circle_at_10%_100%,rgba(71,0,71,0.22),transparent_40%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="relative z-10 mb-5 flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${plan.color} shadow-sm ring-1 ring-white/20`}
                >
                  <plan.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {plan.name}
                </h3>
              </div>

              <div className="relative z-10 mb-5 rounded-2xl border border-border/40 bg-background/60 p-4 backdrop-blur-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      Duration
                    </p>
                    <p className="mt-2 text-3xl font-black leading-none text-foreground">
                      {plan.months}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-muted-foreground">
                      {plan.months === 1 ? "Month" : "Months"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      Total Price
                    </p>
                    <p className="mt-2 text-3xl font-black leading-none bg-gradient-to-r from-nazli-golden to-amber-300 bg-clip-text text-transparent">
                      €{plan.price}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-muted-foreground">
                      EUR
                    </p>
                  </div>
                </div>
              </div>

              <p className="relative z-10 mb-4 inline-flex rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold text-muted-foreground">
                {plan.duration}
              </p>

              <ul className="relative z-10 mb-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-nazli-golden" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={createPackageMailto(plan)}
                className="relative z-10 inline-flex w-full items-center justify-center rounded-xl border border-nazli-golden/40 bg-linear-to-r from-nazli-purple/85 to-nazli-golden/75 px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:from-nazli-purple hover:to-nazli-golden hover:shadow-lg hover:shadow-nazli-golden/20"
              >
                Get Package
              </a>
            </motion.div>
          ))}
        </div>
       
      </div>
      <SocialHub />
    </section>
  );
}
