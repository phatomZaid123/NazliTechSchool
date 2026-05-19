/**
 * Motion configuration utility
 * Provides optimized animation settings based on device capabilities
 */

export const prefersReducedMotion = () => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const isLowEndDevice = () => {
  // Check if device has limited processing power
  const cores = navigator.hardwareConcurrency || 2;
  const memory = (navigator.deviceMemory as number) || 4;
  return cores <= 2 || memory <= 2;
};

export const shouldReduceMotion = () => {
  return prefersReducedMotion() || isLowEndDevice();
};

/**
 * Get optimized animation config
 * Returns reduced animations for low-end devices
 */
export const getMotionConfig = (intensive = false) => {
  const reduced = shouldReduceMotion();

  if (intensive) {
    return {
      initial: reduced ? undefined : "hidden",
      whileInView: reduced ? undefined : "visible",
      viewport: reduced ? undefined : { once: true, margin: "-100px" },
      transition: reduced
        ? { duration: 0 }
        : { duration: 0.5, ease: "easeOut" },
    };
  }

  return {
    initial: reduced ? undefined : { opacity: 0, y: 20 },
    whileInView: reduced ? undefined : { opacity: 1, y: 0 },
    viewport: reduced ? undefined : { once: true, margin: "-100px" },
    transition: reduced ? { duration: 0 } : { duration: 0.6 },
  };
};

/**
 * Disable animations in dev/slow networks
 */
export const disableExpensiveAnimations =
  shouldReduceMotion() ||
  (typeof navigator !== "undefined" &&
    (navigator.connection as any)?.effectiveType === "4g");
