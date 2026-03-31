"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Star,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sofia Rahman",
    title: "Grade 12 | AI & ML Track",
    text: "Nazli Tech transformed how I learn. The AI assistant understands exactly where I'm stuck, and the curriculum feels like it was built just for me. I went from struggling with Python to building ML models!",
    avatar: "SR",
    rating: 5,
    project: "Climate Prediction AI",
    color: "from-purple-500 via-pink-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    title: "Grade 11 | Web Development",
    text: "The real-world project approach actually keeps me motivated. Unlike traditional tuition, we're building things that matter. My portfolio got me noticed by tech companies at 16!",
    avatar: "MJ",
    rating: 5,
    project: "E-Commerce Platform",
    color: "from-blue-500 via-purple-500 to-pink-500",
  },
  {
    id: 3,
    name: "Amina Al-Mansouri",
    title: "Grade 10 | Data Science",
    text: "The flexibility is incredible. I can learn at my own pace, but when I need help, the mentors and community are there instantly. This is education for the modern generation.",
    avatar: "AM",
    rating: 5,
    project: "Mental Health Analytics",
    color: "from-cyan-500 via-blue-500 to-purple-500",
  },
  {
    id: 4,
    name: "Chen Wei",
    title: "IB Student | Full Stack",
    text: "The IB-aligned curriculum actually helped me prepare for the exam while building real skills. My IA became a legitimate tech portfolio piece. Best decision ever.",
    avatar: "CW",
    rating: 5,
    project: "Educational Dashboard",
    color: "from-pink-500 via-cyan-500 to-blue-500",
  },
  {
    id: 5,
    name: "Zara Patel",
    title: "Grade 12 Dropout → Tech Founder",
    text: "I left traditional school, joined Nazli Tech, and built my first startup within 8 months. The personalized learning and mentor network made all the difference.",
    avatar: "ZP",
    rating: 5,
    project: "SaaS EdTech",
    color: "from-blue-500 via-pink-500 to-cyan-500",
  },
];

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-20 -right-40 w-80 h-80 bg-gradient-to-l from-accent/20 to-primary/20 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/60 backdrop-blur-sm mb-6">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-sm text-foreground font-medium">
              Community Love
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              What Students Say
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from students who transformed their learning journey
            with Nazli Tech
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <motion.div
            ref={scrollRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory hide-scrollbar"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                className="flex-shrink-0 w-full sm:w-96 group"
              >
                <div className="relative h-full">
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg`}
                  ></div>

                  {/* Card */}
                  <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/80 to-background/80 backdrop-blur-xl p-8 h-full flex flex-col transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-2xl group-hover:shadow-accent/20">
                    {/* Top Section - Stars */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-accent text-accent"
                            />
                          ),
                        )}
                      </div>
                      <MessageCircle className="w-5 h-5 text-accent/50" />
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-foreground text-lg leading-relaxed mb-8 flex-grow font-light">
                      "{testimonial.text}"
                    </p>

                    {/* Avatar & Info */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center font-bold text-white shadow-lg`}
                        >
                          {testimonial.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-base">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>

                      {/* Project Badge */}
                      <div className="pt-2 border-t border-border/30">
                        <p className="text-xs text-muted-foreground mb-2">
                          Featured Project:
                        </p>
                        <div className="inline-block px-3 py-1.5 rounded-full bg-accent/20 border border-accent/50 text-sm text-accent font-medium">
                          {testimonial.project}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={() => scroll("left")}
              size="icon"
              className="rounded-full bg-primary/20 hover:bg-primary/40 border border-primary/50 text-foreground transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => scroll("right")}
              size="icon"
              className="rounded-full bg-primary/20 hover:bg-primary/40 border border-primary/50 text-foreground transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 md:gap-8 mt-20 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              5,000+
            </p>
            <p className="text-muted-foreground mt-2">Active Students</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              4.9★
            </p>
            <p className="text-muted-foreground mt-2">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              98%
            </p>
            <p className="text-muted-foreground mt-2">Satisfaction Rate</p>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
