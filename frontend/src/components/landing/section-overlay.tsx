import { getOverlayGradient } from "./section-overlay-dimness";

type SectionOverlayProps = {
  sectionId: string;
  className?: string;
};

export function SectionOverlay({
  sectionId,
  className = "",
}: SectionOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{ background: getOverlayGradient(sectionId) }}
    />
  );
}
