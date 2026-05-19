/**
 * Performance monitoring utilities
 * Help track and optimize component rendering
 */

export const reportPerformanceMetrics = () => {
  if (typeof window === "undefined") return;

  try {
    // Get Core Web Vitals
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType("paint");
    const resources = performance.getEntriesByType("resource");

    const metrics = {
      FCP: paint.find(p => p.name === "first-contentful-paint")?.startTime,
      LCP: null as number | null,
      CLS: 0,
      FID: null as number | null,
      TTFB: navigation?.responseStart,
      domContentLoaded: navigation?.domContentLoadedEventEnd,
      loadComplete: navigation?.loadEventEnd,
      resourceCount: resources.length,
      totalResourceSize: resources.reduce((acc, r) => acc + (r as PerformanceResourceTiming).transferSize ?? 0, 0),
    };

    console.table(metrics);
    return metrics;
  } catch (error) {
    console.warn("Performance metrics unavailable:", error);
  }
};

/**
 * Monitor component render time
 */
export const withPerformanceMonitoring = (componentName: string) => {
  const startTime = performance.now();
  return () => {
    const endTime = performance.now();
    if (endTime - startTime > 50) {
      console.warn(
        `${componentName} took ${(endTime - startTime).toFixed(2)}ms to render`
      );
    }
  };
};

/**
 * Detect slow 3G or lower
 */
export const isSlowNetwork = () => {
  if (typeof navigator === "undefined") return false;
  const connection = (navigator as any).connection;
  if (!connection) return false;
  return (
    connection.effectiveType === "3g" ||
    connection.effectiveType === "4g" ||
    connection.saveData === true
  );
};

/**
 * Check if device is in low power mode
 */
export const isLowPowerMode = () => {
  if (typeof navigator === "undefined") return false;
  return (navigator as any).getBattery?.() || false;
};
