"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  Atom,
  Code2,
  Rocket,
  Database,
  Palette,
  ChevronRight,
  Clock,
  Users,
  Star,
  Play,
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "AI Coding Lab",
    description:
      "Build intelligent applications with machine learning, neural networks, and cutting-edge AI tools.",
    icon: Brain,
    color: "from-primary to-accent",
    glowColor: "rgba(139, 92, 246, 0.3)",
    duration: "12 weeks",
    students: "2.4K",
    rating: 4.9,
    modules: ["Neural Networks", "Computer Vision", "NLP", "Deployment"],
    featured: true,
  },
  {
    id: 2,
    title: "Physics Simulation",
    description:
      "Master physics through interactive simulations covering mechanics, thermodynamics, and quantum physics.",
    icon: Atom,
    color: "from-accent to-glow-cyan",
    glowColor: "rgba(6, 182, 212, 0.3)",
    duration: "10 weeks",
    students: "1.8K",
    rating: 4.8,
    modules: ["Mechanics", "Thermodynamics", "Waves", "Quantum"],
    featured: false,
  },
  {
    id: 3,
    title: "Full-Stack Development",
    description:
      "End-to-end web development with React, Node.js, databases, and cloud deployment.",
    icon: Code2,
    color: "from-glow-cyan to-glow-blue",
    glowColor: "rgba(59, 130, 246, 0.3)",
    duration: "16 weeks",
    students: "3.1K",
    rating: 4.9,
    modules: ["Frontend", "Backend", "Databases", "DevOps"],
    featured: true,
  },
  {
    id: 4,
    title: "Project-Based Learning",
    description:
      "Build real-world projects from scratch with mentorship from industry professionals.",
    icon: Rocket,
    color: "from-glow-blue to-primary",
    glowColor: "rgba(139, 92, 246, 0.25)",
    duration: "8 weeks",
    students: "1.5K",
    rating: 4.7,
    modules: ["Planning", "Development", "Testing", "Launch"],
    featured: false,
  },
  {
    id: 5,
    title: "Data Engineering",
    description:
      "Learn to build scalable data pipelines, warehouses, and analytics platforms.",
    icon: Database,
    color: "from-primary to-glow-blue",
    glowColor: "rgba(59, 130, 246, 0.25)",
    duration: "14 weeks",
    students: "1.2K",
    rating: 4.8,
    modules: ["ETL Pipelines", "Data Lakes", "Analytics", "ML Ops"],
    featured: false,
  },
  {
    id: 6,
    title: "UI/UX Design Lab",
    description:
      "Create stunning user interfaces with modern design principles and prototyping tools.",
    icon: Palette,
    color: "from-accent to-primary",
    glowColor: "rgba(6, 182, 212, 0.25)",
    duration: "10 weeks",
    students: "2.0K",
    rating: 4.9,
    modules: ["Design Systems", "Prototyping", "User Research", "Motion"],
    featured: true,
  },
];

export function CoursesSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  
  return (
    <section
      id="courses"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Rocket className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm text-primary font-medium">
              Interactive Courses
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            <span className="text-foreground">Learn Through </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Hands-On Projects
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hands-on courses designed to transform you into a skilled
            professional
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {courses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              isExpanded={expandedId === course.id}
              isHovered={hoveredId === course.id}
              onToggle={() =>
                setExpandedId(expandedId === course.id ? null : course.id)
              }
              onHover={(hovered) => setHoveredId(hovered ? course.id : null)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <button className="rounded-lg px-8">
              View All Courses
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface CourseCardProps {
  course: (typeof courses)[0];
  index: number;
  isExpanded: boolean;
  isHovered: boolean;
  onToggle: () => void;
  onHover: (hovered: boolean) => void;
}

function CourseCard({
  course,
  index,
  isExpanded,
  isHovered,
  onToggle,
  onHover,
}: CourseCardProps) {
  const Icon = course.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      layout
      onClick={onToggle}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={`relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-6 cursor-pointer transition-all duration-500 ${
        isExpanded ? "md:col-span-2 lg:col-span-2" : ""
      }`}
      style={{
        boxShadow: isHovered ? `0 0 40px ${course.glowColor}` : "none",
      }}
      whileHover={{ y: -5 }}
    >
      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${course.glowColor}, transparent)`,
          opacity: isHovered ? 0.3 : 0,
        }}
      />

      {/* Featured badge */}
      {course.featured && (
        <motion.div
          className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-xs font-medium text-primary-foreground"
          animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          Featured
        </motion.div>
      )}

      <div
        className={`relative z-10 flex ${isExpanded ? "flex-row gap-8" : "flex-col"}`}
      >
        {/* Main content */}
        <div className={isExpanded ? "flex-1" : ""}>
          {/* Icon with animation */}
          <motion.div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-4`}
            animate={isHovered ? { rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-7 h-7 text-primary-foreground" />
          </motion.div>

          {/* Title and description */}
          <h3 className="text-xl font-bold text-foreground mb-2">
            {course.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {course.description}
          </p>

          {/* Stats with hover effects */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <motion.span
              className="flex items-center gap-1"
              whileHover={{ scale: 1.1, color: "oklch(0.65 0.25 280)" }}
            >
              <Clock className="w-4 h-4" />
              {course.duration}
            </motion.span>
            <motion.span
              className="flex items-center gap-1"
              whileHover={{ scale: 1.1, color: "oklch(0.7 0.18 200)" }}
            >
              <Users className="w-4 h-4" />
              {course.students}
            </motion.span>
            <motion.span
              className="flex items-center gap-1"
              whileHover={{ scale: 1.1 }}
            >
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              {course.rating}
            </motion.span>
          </div>
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Course Modules
            </h4>
            <div className="space-y-3">
              {course.modules.map((module, i) => (
                <motion.div
                  key={module}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${course.color} flex items-center justify-center text-xs font-bold text-primary-foreground`}
                  >
                    {i + 1}
                  </div>
                  <span className="text-sm text-foreground">{module}</span>
                  <Play className="w-4 h-4 ml-auto text-muted-foreground" />
                </motion.div>
              ))}
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                className={`mt-6 w-full rounded-xl bg-gradient-to-r ${course.color} text-primary-foreground hover:opacity-90 transition-opacity`}
                onClick={(e) => e.stopPropagation()}
              >
                Enroll Now
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Subtle corner accents */}
      <div
        className={`absolute top-0 right-0 w-20 h-20 rounded-tr-3xl opacity-20 bg-gradient-to-bl ${course.color}`}
      />
    </motion.div>
  );
}
