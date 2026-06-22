import type { ReactNode } from "react";
import GlobalBackgroundImage from "@/assets/Globalbackground.png";
import { getOverlayGradient } from "./section-overlay-dimness";

interface GlobalBackgroundProps {
  children: ReactNode;
  className?: string;
}

export function GlobalBackground({
  children,
  className = "",
}: GlobalBackgroundProps) {
  return (
    <div className={`relative isolate ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${GlobalBackgroundImage})` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: getOverlayGradient("globaloverlay") }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(71,0,71,0.18),transparent_58%)]"
      />
      {children}
    </div>
  );
}
