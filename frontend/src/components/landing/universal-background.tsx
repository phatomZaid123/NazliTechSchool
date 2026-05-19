"use client";

import { useEffect, useRef, useState } from "react";

interface UniversalBackgroundProps {
  opacity?: number;
  interactive?: boolean;
  className?: string;
  intensity?: "heavy" | "moderate";
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  trainOffsetX?: number;
  trainOffsetY?: number;
}

interface Mouse {
  x: number | null;
  y: number | null;
  radius: number;
}

export function UniversalBackground({
  opacity = 1,
  interactive = true,
  className = "",
  intensity = "heavy",
}: UniversalBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<Mouse>({ x: null, y: null, radius: 200 });
  const scrollRef = useRef(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const particleCount = intensity === "heavy" ? 40 : 25;
  const primaryColor = "rgb(139, 92, 246)"; // Nazli Purple (70%)
  const accentColor = "rgb(212, 175, 55)"; // Nazli Golden (30%)

  // Initialize neural network animation
  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const particles: Particle[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particles.length = 0;
      // Create neural network nodes distributed across screen
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = Math.random() * 300 + 100;
        particles.push({
          x: canvas.width / 2 + Math.cos(angle) * radius,
          y: canvas.height / 2 + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.8,
          color: Math.random() > 0.3 ? primaryColor : accentColor,
        });
      }
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (interactive) {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
      }
    };

    // Scroll tracking
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    // Neural network animation
    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update particle positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Base movement - INCREASED SPEED (2x faster)
        p.x += p.vx * 2;
        p.y += p.vy * 2;

        // Scroll influence - particles drift down
        p.y += (scrollRef.current % 360) * 0.0002;

        // Enhanced wave motion for more dynamic feel
        const wave = Math.sin(time * 1.2 + i) * 1.2;
        const wave2 = Math.cos(time * 0.8 + i * 0.5) * 0.8;
        p.x += wave * 0.2 + wave2 * 0.1;
        p.y += Math.cos(time * 1.2 + i) * 0.2 + Math.sin(time * 0.6 + i) * 0.15;

        // Mouse interaction - particles repel from cursor
        if (interactive && mouseRef.current.x && mouseRef.current.y) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const distSq = dx * dx + dy * dy;
          const radiusSq = mouseRef.current.radius * mouseRef.current.radius;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / mouseRef.current.radius) * 2;
            p.vx -= (dx / dist) * force * 0.3;
            p.vy -= (dy / dist) * force * 0.3;
          }
        }

        // Boundary wrapping
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.y > canvas.height + 50) p.y = -50;
        if (p.y < -50) p.y = canvas.height + 50;

        // Damping for smooth motion (adjusted for higher speed)
        p.vx *= 0.95;
        p.vy *= 0.95;
      }

      // Draw flowing wave patterns - additional blended animation
      ctx.strokeStyle = `rgba(139, 92, 246, 0.08)`;
      ctx.lineWidth = 1.5;

      for (let waveIndex = 0; waveIndex < 3; waveIndex++) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 20) {
          const y =
            canvas.height / 2 +
            Math.sin(time * 0.8 + x * 0.005 + waveIndex * 2) *
              (80 + waveIndex * 30) +
            waveIndex * 60;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Draw aurora-like flowing ribbons
      for (let ribbonIndex = 0; ribbonIndex < 2; ribbonIndex++) {
        ctx.globalAlpha = 0.06;
        ctx.fillStyle =
          ribbonIndex === 0
            ? "rgba(212, 175, 55, 0.3)"
            : "rgba(139, 92, 246, 0.3)";

        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 15) {
          const y =
            canvas.height / 3 +
            Math.sin(time * 0.6 + x * 0.003 + ribbonIndex * 3.14) *
              (100 + ribbonIndex * 50);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      // Draw neural network connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Connect to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 250;

          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const opacity = Math.max(0, 1 - dist / maxDist) * 0.4;

            // Alternate colors for neural network effect
            ctx.strokeStyle =
              Math.random() > 0.4
                ? `rgba(139, 92, 246, ${opacity})`
                : `rgba(212, 175, 55, ${opacity * 0.6})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulseIntensity = Math.sin(time * 2 + i) * 0.5 + 0.5;

        // Glow effect
        ctx.fillStyle =
          p.color === primaryColor
            ? `rgba(139, 92, 246, ${0.2 * pulseIntensity})`
            : `rgba(212, 175, 55, ${0.15 * pulseIntensity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.8 + pulseIntensity * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    handleResize();
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, [isMounted, interactive, particleCount, primaryColor, accentColor]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        opacity,
        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(212, 175, 55, 0.05) 100%)",
      }}
    >
      {/* Neural network canvas */}
      {isMounted && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: interactive ? "auto" : "none" }}
        />
      )}

      {/* Subtle vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 150% 50% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 100%)",
        }}
      />
    </div>
  );
}
