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

  // Generate particles
  const particles = Array.from({ length: 40 });
  // Generate crystal layers
  const crystalLayers = Array.from({ length: 5 });

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(88, 28, 135, 0.3) 0%, rgba(20, 8, 40, 0.8) 50%, rgba(10, 4, 20, 1) 100%)",
          }}
        >
          {/* Floating particle background */}
          {particles.map((_, i) => {
            const angle = (i / particles.length) * Math.PI * 2;
            const distance = 80 + Math.random() * 60;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background:
                    i % 2 === 0
                      ? "rgba(168, 85, 247, 0.6)"
                      : "rgba(217, 119, 215, 0.4)",
                  boxShadow:
                    i % 2 === 0
                      ? "0 0 8px rgba(168, 85, 247, 0.8)"
                      : "0 0 6px rgba(217, 119, 215, 0.6)",
                  left: "50%",
                  top: "50%",
                }}
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        x: [x, x * 1.3, x],
                        y: [y, y * 1.3, y],
                        opacity: [0.3, 0.8, 0.3],
                      }
                }
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i / particles.length) * 0.5,
                }}
              />
            );
          })}

          {/* Rotating crystal layers */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {crystalLayers.map((_, layerIdx) => {
              const radius = 30 + layerIdx * 20;
              const direction = layerIdx % 2 === 0 ? 1 : -1;

              return (
                <motion.div
                  key={`layer-${layerIdx}`}
                  className="absolute border-2 rounded-full"
                  style={{
                    width: radius * 2,
                    height: radius * 2,
                    borderColor:
                      layerIdx % 2 === 0
                        ? `rgba(168, 85, 247, ${0.6 - layerIdx * 0.1})`
                        : `rgba(217, 119, 215, ${0.6 - layerIdx * 0.1})`,
                  }}
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          rotate: [0, 360 * direction],
                        }
                  }
                  transition={{
                    duration: 8 + layerIdx * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {/* Hexagon points on each ring */}
                  {Array.from({ length: 6 }).map((_, pointIdx) => {
                    const pointAngle =
                      (pointIdx / 6) * Math.PI * 2 - Math.PI / 2;
                    const px = Math.cos(pointAngle) * radius;
                    const py = Math.sin(pointAngle) * radius;

                    return (
                      <motion.div
                        key={`point-${layerIdx}-${pointIdx}`}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          background:
                            layerIdx % 2 === 0
                              ? "rgba(168, 85, 247, 0.8)"
                              : "rgba(217, 119, 215, 0.8)",
                          left: "50%",
                          top: "50%",
                          transform: `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`,
                          boxShadow:
                            layerIdx % 2 === 0
                              ? "0 0 12px rgba(168, 85, 247, 1), 0 0 24px rgba(168, 85, 247, 0.5)"
                              : "0 0 12px rgba(217, 119, 215, 1), 0 0 24px rgba(217, 119, 215, 0.5)",
                        }}
                        animate={
                          prefersReducedMotion ? {} : { scale: [1, 1.3, 1] }
                        }
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: pointIdx * 0.1,
                        }}
                      />
                    );
                  })}
                </motion.div>
              );
            })}

            {/* Center logo container */}
            <motion.div
              className="absolute z-10 flex flex-col items-center"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: [1, 1.08, 1],
                    }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <NLogo className="h-16 w-auto" interactive={false} loadingFx />
            </motion.div>

            {/* Center glow */}
            <motion.div
              className="absolute w-40 h-40 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }
              }
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Progress indicator and text */}
          <motion.div
            className="absolute bottom-20 flex flex-col items-center gap-4"
            animate={prefersReducedMotion ? {} : { y: [0, -4, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Progress ring */}
            <svg className="w-16 h-16" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(168, 85, 247, 0.2)"
                strokeWidth="2"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#progressGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={282.7}
                strokeDashoffset={282.7 * (1 - progress / 100)}
                style={{ transform: "rotate(-90deg)", transformOrigin: "50px 50px" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#d977d7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Progress text */}
            <div className="text-center">
              <motion.div
                className="text-3xl font-light bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 bg-clip-text text-transparent"
                animate={
                  prefersReducedMotion ? {} : { opacity: [0.6, 1, 0.6] }
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {Math.min(Math.round(progress), 100)}%
              </motion.div>
              <motion.p
                className="text-xs tracking-widest text-purple-300/50 mt-2 uppercase"
                animate={
                  prefersReducedMotion ? {} : { opacity: [0.4, 0.8, 0.4] }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Crystallizing
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
