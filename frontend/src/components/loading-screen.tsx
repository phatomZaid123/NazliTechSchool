import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import NLogo from "./NLogo";

type LoadingScreenProps = {
  onComplete?: () => void;
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!prefersReducedMotion) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + Math.random() * 25;
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    const delay = prefersReducedMotion ? 1000 : 4000;
    const timer = window.setTimeout(() => {
      setProgress(100);
      setLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!loading) {
      onComplete?.();
    }
  }, [loading, onComplete]);

  const bars = Array.from({ length: 12 });
  const circles = Array.from({ length: 6 });

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
        >
          {/* Animated grid background */}
          <div className="pointer-events-none absolute inset-0 opacity-30">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                style={{ top: `${i * 5}%` }}
                animate={prefersReducedMotion ? {} : { opacity: [0.1, 0.3, 0.1] }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>

          {/* Animated corner elements */}
          <motion.div
            className="pointer-events-none absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-purple-500/40"
            animate={prefersReducedMotion ? {} : { opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="pointer-events-none absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-yellow-500/40"
            animate={prefersReducedMotion ? {} : { opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Animated circular rings */}
            <div className="relative mb-12 w-32 h-32 flex items-center justify-center">
              {circles.map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border border-purple-400/30 rounded-full"
                  style={{
                    width: `${(i + 1) * 18}px`,
                    height: `${(i + 1) * 18}px`,
                  }}
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          rotate: [0, 360],
                          opacity: [0.2, 0.5, 0.2],
                        }
                  }
                  transition={{
                    rotate: {
                      duration: 8 + i * 1.2,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    opacity: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                />
              ))}

              {/* NLogo in center */}
              <NLogo className="h-20 w-auto relative z-10" interactive={false} loadingFx />
            </div>

            {/* Animated bars at bottom */}
            <div className="flex items-end gap-1.5 h-20 mb-8">
              {bars.map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 bg-gradient-to-t from-yellow-400 via-purple-500 to-transparent rounded-t-sm"
                  animate={
                    prefersReducedMotion
                      ? { height: "20px" }
                      : {
                          height: [8, 40, 12, 35, 20],
                        }
                  }
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.08,
                  }}
                />
              ))}
            </div>

            {/* Progress text */}
            <motion.div
              className="text-center mb-6"
              animate={
                prefersReducedMotion ? {} : { y: [0, -2, 0] }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="text-5xl font-light bg-gradient-to-r from-purple-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {Math.min(Math.round(progress), 100)}
              </div>
              <div className="text-xs font-medium uppercase tracking-widest text-purple-300/60">
                Initializing Nazli Engine...
              </div>
            </motion.div>

            {/* Loading indicator text */}
            <div className="flex gap-1">
              {["L", "O", "A", "D", "I", "N", "G"].map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-sm font-light text-purple-400/60"
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: [0.3, 1, 0.3] }
                  }
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
