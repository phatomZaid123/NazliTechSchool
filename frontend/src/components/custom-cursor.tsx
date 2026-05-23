"use client";

import { useEffect, useRef } from "react";
import PerfumeIcon from "@/assets/perfumeicon.png";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const displayX = useRef(0);
  const displayY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const updateCursorPosition = () => {
      // Smooth easing for cursor follow
      displayX.current += (mouseX.current - displayX.current) * 0.2;
      displayY.current += (mouseY.current - displayY.current) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${displayX.current - 20}px, ${displayY.current - 20}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateCursorPosition);
    };

    animationFrameId = requestAnimationFrame(updateCursorPosition);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-10 h-10"
      >
        <img
          src={PerfumeIcon}
          alt="Perfume cursor"
          className="w-full h-full object-contain"
          style={{
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
            mixBlendMode: "darken",
          }}
        />

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-xl animate-pulse" />
      </div>
    </>
  );
}
