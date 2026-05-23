import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import NLogo from "./NLogo";

type LoadingScreenProps = {
  onComplete?: () => void;
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const delay = prefersReducedMotion ? 1000 : 4000;
    const timer = window.setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!loading) {
      onComplete?.();
    }
  }, [loading, onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 78% 84%, rgba(122, 56, 244, 0.24) 0%, rgba(122, 56, 244, 0) 42%), radial-gradient(circle at 18% 16%, rgba(78, 26, 168, 0.32) 0%, rgba(78, 26, 168, 0) 38%), linear-gradient(145deg, #080013 0%, #130028 46%, #1f0340 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(11, 2, 30, 0) 36%, rgba(4, 0, 10, 0.58) 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.08),transparent_52%),radial-gradient(circle_at_72%_76%,rgba(219,172,52,0.16),transparent_44%)]" />

          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative z-10 flex w-[min(92vw,26rem)] flex-col items-center rounded-3xl border border-white/10 bg-black/35 px-6 py-8 backdrop-blur-lg"
          >
            <div className="relative mb-6">
              <motion.div
                className="absolute -inset-5 rounded-full border border-nazli-purple/35"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 10, repeat: Infinity, ease: "linear" }
                }
              />
              <NLogo className="h-24 w-auto md:h-28" interactive={false} loadingFx />
            </div>

            <div className="w-full max-w-[16rem]">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-nazli-purple via-nazli-golden to-nazli-purple"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: prefersReducedMotion ? 0.6 : 1.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </div>

            <motion.p
              className="mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45"
              animate={prefersReducedMotion ? undefined : { opacity: [0.45, 0.9, 0.45] }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
              }
            >
              Initializing Nazli Engine
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
