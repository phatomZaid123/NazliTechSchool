"use client";

import { motion } from "framer-motion";
import { useSectionAudio } from "@/hooks/use-section-audio";
import testimonialAudio from "@/assets/testimonialaudio.mp3";
import SocialHub from "./social-media-section";
import { ArrowUpRight, Code, Cpu, Puzzle } from "lucide-react";
const testimonials = [
  {
    name: "Abu Khadijah",
    country: "🇸🇦",
    rating: 5,
    title: "Best decision!",
    text: "She is always excited about her lessons and walks you through every step. Best investment in my tech education journey.",
    initial: "A",
  },
  {
    name: "Shubham",
    country: "🇮🇳",
    rating: 5,
    title: "Better than college",
    text: "Hello I am Shubham from India. I am pursuing my tech career and Nazli Tech School has been transformative for my learning.",
    initial: "S",
  },
  {
    name: "Aadvik",
    country: "🇺🇸",
    rating: 5,
    title: "Enticing and fun",
    text: "Very enticing and fun. If it had been a book, a real textbook couldn't have done it better. Highly recommended!",
    initial: "A",
  },
  {
    name: "Sarah Chen",
    country: "🇨🇳",
    rating: 5,
    title: "Life-changing experience",
    text: "The Cognoscentia curriculum is unlike anything I've seen. The AI courses are cutting-edge and the instructor is phenomenal.",
    initial: "S",
  },
  {
    name: "Marco Rossi",
    country: "🇮🇹",
    rating: 5,
    title: "Worth every penny",
    text: "I went from zero coding knowledge to landing a software engineering job in 8 months. Nazli's teaching style is magical.",
    initial: "M",
  },
  {
    name: "Fatima Al-Zahra",
    country: "🇲🇦",
    rating: 5,
    title: "Incredible quality",
    text: "The 1-on-1 sessions are fantastic. I've never had a teacher who adapts so well to my learning pace.",
    initial: "F",
  },
];

const learningFormats = [
  {
    icon: "👥",
    title: "Group Lessons",
    subtitle:
      "Strengthen comprehension through collaborative learning online school classes and online school programs",
    features: [
      "Live group sessions",
      "Peer learning",
      "Community support",
      "Affordable pricing",
    ],
  },
  {
    icon: "🎯",
    title: "1-on-1 Lessons",
    subtitle:
      "A truly immersive and more personalized experience tailored to your goals and learning style",
    features: [
      "Personal attention",
      "Custom pace",
      "Direct feedback",
      "Flexible scheduling",
    ],
  },
  {
    icon: "📅",
    title: "Self-Paced",
    subtitle:
      "Learn on your own schedule with recorded lessons, exercises, and lifetime access to all materials",
    features: ["24/7 access", "Lifetime content", "Self-paced", "No deadlines"],
  },
];

const stats = [
  { label: "Average Rating", value: "4.9/5" },
  { label: "Total Reviews", value: "2,847" },
  { label: "Countries", value: "68+" },
  { label: "5-Star Reviews", value: "96%" },
];

export function TestimonialsSection() {
  const sectionRef = useSectionAudio({
    audioSrc: testimonialAudio,
    sectionId: "testimonials",
  });

  return (
    <div ref={sectionRef as React.RefObject<HTMLDivElement>}>
      {/* Reviews Section */}
      <section
        id="reviews"
        className="py-32 relative overflow-x-hidden scroll-mt-28"
      >
        <div className="section-glass-wrap relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.45em] text-purple-300">
              STUDENT REVIEWS
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              What Our{" "}
              <span className="bg-gradient-to-r from-purple-200 via-purple-400 to-amber-300 bg-clip-text text-transparent">
                Students Say
              </span>
            </h2>
            <p className="mt-5 text-base md:text-lg text-nazli-white max-w-2xl mx-auto leading-relaxed">
              Real voices from learners building confidence, projects, and
              careers through Nazli Tech School.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
              {[
                "Verified learners",
                "Global community",
                "Mentor-led support",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-purple-300/40 bg-purple-500/15 px-4 py-2 font-semibold text-white/85 backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-nazli-purple/[0.6] hover:bg-nazli-purple/[0.7] border border-nazli-golden/70 rounded-3xl p-8 hover:border-purple-400/60 transition-all duration-300 "
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-700 flex items-center justify-center font-bold text-white shadow-[0_8px_20px_-8px_rgba(168,85,247,0.8)]">
                    {testimonial.initial}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white tracking-tight">
                        {testimonial.name}
                      </h4>
                      <span className="text-xl">{testimonial.country}</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <h5 className="font-bold text-white mb-3 text-lg tracking-tight">
                  {testimonial.title}
                </h5>
                <p className="text-white/75 leading-relaxed text-sm md:text-[0.94rem]">
                  <span className="mr-1 text-purple-300">“</span>
                  {testimonial.text}
                  <span className="ml-1 text-purple-300">”</span>
                </p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 border-t border-white/10"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center bg-nazli-purple/[0.6] hover:bg-nazli-purple/[0.7] border border-white/10 rounded-3xl p-8 hover:border-purple-400/60 transition-all duration-300 backdrop-blur-xs shadow-sm"
              >
                <p className="mb-2 text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-purple-300 to-cyan-200 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-white/60 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
          <SocialHub />
        </div>
      </section>

      {/* Flexibility Section */}
      <section
        id="flexibility"
        className="py-32 relative overflow-x-hidden scroll-mt-28"
      >
        <div className="section-glass-wrap max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="rounded-lg p-1 text-center text-lg neon-glow-golden font-bold bg-nazli-golden uppercase tracking-[0.45em] text-nazli-purple/90 mb-4">
              FLEXIBILITY
            </span>
            <h2 className="text-nazli-golden text-4xl md:text-5xl font-bold tracking-tighter">
              Choose What Works For You
            </h2>
            <p className="text-xl text-nazli-white mt-6 max-w-2xl mx-auto">
              We offer multiple learning formats to fit your lifestyle, budget,
              and learning preferences.
            </p>
          </motion.div>

          {/* Learning Formats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 ">
            {learningFormats.map((format, index) => (
              <motion.div
                key={format.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-nazli-purple/[0.6] hover:bg-nazli-purple/[0.7] border border-white/10 rounded-3xl p-8 hover:border-purple-400/60 transition-all duration-300  shadow-sm"
              >
                <div className="text-5xl mb-6">{format.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {format.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-8">
                  {format.subtitle}
                </p>

                <ul className="space-y-3">
                  {format.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-purple-500 font-bold mt-1">✓</span>
                      <span className="text-white/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <SocialHub />
        </div>
      </section>
    </div>
  );
}
