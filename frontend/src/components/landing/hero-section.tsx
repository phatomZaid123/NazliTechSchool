"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import SocialHub from "./social-media-section";
import { NebulaDriftBackground } from "./section-background-effects";
import {
  LANDING_OVERLAY_DIMNESS,
  createOverlayGradient,
} from "./section-overlay-dimness";
import HeroImage from "../../assets/Globalbackground.png";

export function HeroSection() {
  const sentences = [
    "Learn at Your Own Pace",
    "Master Code, Not Memorization",
    "Build Real-World Projects",
    "Join 10K+ Students Worldwide",
  ];

  const [displayText, setDisplayText] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentSentence = sentences[sentenceIndex];
    const typingDelay = 68;
    const deletingDelay = 40;
    const holdDelay = 1400;
    const restartDelay = 240;
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText !== currentSentence) {
      timer = setTimeout(() => {
        setDisplayText(currentSentence.slice(0, displayText.length + 1));
      }, typingDelay);
    } else if (!isDeleting && displayText === currentSentence) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, holdDelay);
    } else if (isDeleting && displayText !== "") {
      timer = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, deletingDelay);
    } else if (isDeleting && displayText === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setSentenceIndex((prev) => (prev + 1) % sentences.length);
      }, restartDelay);
    }

    return () => clearTimeout(timer);
  }, [displayText, sentenceIndex, isDeleting]);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-28 pb-16 md:py-28 scroll-mt-28 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${HeroImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for better text readability */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: createOverlayGradient(LANDING_OVERLAY_DIMNESS.hero),
        }}
      />

      <div className="container relative z-10 px-4 md:px-6 max-w-8xl min-h-[76vh] md:min-h-[78vh] flex items-start md:items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl mx-auto text-center space-y-8 pt-10 sm:pt-12 md:pt-0 flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="px-6 py-2 rounded-full border border-nazli-golden bg-nazli-golden/5 backdrop-blur-sm neon-glow-golden-box">
              <span className="text-xs md:text-sm font-semibold text-nazli-golden tracking-widest uppercase font-mono">
                &lt; Learn-the-Cognoscentia-Way /&gt;
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <div className="w-full space-y-4">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            >
              {/* <span className="text-nazli-purple neon-glow-golden">Nazli</span> */}

              <motion.span
                className="text-nazli-purple neon-glow-golden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Nazli Tech School
              </motion.span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full text-2xl md:text-3xl text-nazli-gray font-light h-16 md:h-20 flex items-center justify-center"
          >
            <span className="typewriter drop-shadow-[0_0_22px_rgba(168,85,247,0.35)]">
              {displayText}
            </span>
          </motion.p>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full space-y-4"
          >
            <p className="text-lg md:text-xl text-nazli-gray leading-relaxed max-w-3xl mx-auto text-center">
              Nazli Tech School's{" "}
              <span className="code-tag font-semibold text-nazli-white">
                Cognoscentia
              </span>{" "}
              curriculum is an educational journey that forges the next
              generation of tech experts. Join thousands of students learning to
              code from anywhere.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <motion.a
              href="#courses"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-nazli-purple text-nazli-white font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 neon-glow-purple-box hover:neon-glow-purple"
            >
              <span className="flex items-center justify-center gap-2">
                Explore Courses
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>

            <motion.a
              href="#curriculum"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border-2 border-nazli-golden text-nazli-golden font-semibold rounded-full hover:bg-nazli-golden/20 transition-all duration-300 neon-glow-golden-box"
            >
              Our Curriculum
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-full max-w-3xl mx-auto grid grid-cols-3 gap-6 md:gap-12 pt-12 md:pt-16"
          >
            {[
              { value: "10K+", label: "Students" },
              { value: "50+", label: "Courses" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="space-y-2 data-display text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-nazli-golden terminal-text">
                  {stat.value}
                </div>
                <div className="text-nazli-gray font-mono text-xs tracking-widest">
                  [<span className="text-nazli-golden/80">{stat.label}</span>]
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-nazli-golden/30 flex justify-center pt-2 backdrop-blur-sm">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-nazli-golden"
              animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10">
        <SocialHub />
      </div>
    </section>
  );
}
