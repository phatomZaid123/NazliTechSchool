import type { ReactNode } from "react";
import GlobalBackgroundImage from "@/assets/Globalbackground.png";

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
      {children}
    </div>
  );
}
