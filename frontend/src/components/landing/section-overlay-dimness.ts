type OverlayStops = {
  top: number;
  middle: number;
  bottom: number;
};

export const LANDING_OVERLAY_DIMNESS: Record<string, OverlayStops> = {
  hero: { top:0.10, middle: 0.10, bottom: 0.10 },
  video: { top: 0.10, middle: 0.10, bottom: 0.10 },
  courses: { top: 0.10, middle: 0.10, bottom: 0.10 },
  curriculum: { top: 0.10, middle: 0.10, bottom: 0.10 },
  simulation: { top: 0.10, middle: 0.10, bottom: 0.10 },
};

const clampOpacity = (value: number): number => {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
};

const shade = (opacity: number): string => {
  const alpha = clampOpacity(opacity).toFixed(2);
  return `rgba(5, 5, 5, ${alpha})`;
};

export const createOverlayGradient = (stops: OverlayStops): string =>
  `linear-gradient(to bottom, ${shade(stops.top)} 0%, ${shade(
    stops.middle,
  )} 50%, ${shade(stops.bottom)} 100%)`;
