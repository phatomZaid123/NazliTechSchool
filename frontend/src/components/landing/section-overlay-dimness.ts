type OverlayStops = {
  top: number;
  middle: number;
  bottom: number;
};

export const LANDING_OVERLAY_DIMNESS: Record<string, OverlayStops> = {
  globaloverlay: { top: 0.01 , middle: 0.01, bottom: 0.1 },
 
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
  )} 0%, ${shade(stops.bottom)} 0%)`;

export const getOverlayGradient = (sectionId: string): string =>
  createOverlayGradient(
    LANDING_OVERLAY_DIMNESS[sectionId] ?? LANDING_OVERLAY_DIMNESS.globaloverlay,
  );
