"use client";

import { useEffect, useRef, useCallback } from "react";
import { useParticleSpray, type Particle } from "@/hooks/use-particle-spray";

export function ParticleContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { triggerSpray, getParticles, cleanup } =
    useParticleSpray(containerRef);

  // Handle click events on buttons - don't interfere with navigation
  useEffect(() => {
    const handleButtonClick = (e: MouseEvent) => {
      // Only trigger spray for actual buttons and interactive elements
      const target = e.target as HTMLElement;
      const isButton = target.closest("button");
      const isLink = target.closest("a");
      const isRole = target.closest("[role='button']");

      if (isButton || isLink || isRole) {
        // Trigger spray at click location without preventing default
        triggerSpray(e.clientX, e.clientY);
      }
    };

    // Use capture phase to ensure we don't block clicks
    document.addEventListener("click", handleButtonClick, {
      passive: true,
      capture: false,
    });
    return () =>
      document.removeEventListener("click", handleButtonClick, {
        capture: false,
      });
  }, [triggerSpray]);

  // Render particles on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      const particles = getParticles();
      particles.forEach((particle: Particle) => {
        const opacity = particle.life / particle.maxLife;

        ctx.fillStyle = particle.color;
        ctx.globalAlpha = opacity * 0.8;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow
        ctx.strokeStyle = particle.color;
        ctx.globalAlpha = opacity * 0.3;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size + 2, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [getParticles]);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9998]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ touchAction: "none" }}
      />
    </div>
  );
}
