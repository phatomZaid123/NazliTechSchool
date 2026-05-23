import { useCallback, useRef, useEffect } from "react";

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface UseParticleSprayOptions {
  particleCount?: number;
  colors?: string[];
  velocity?: number;
  gravity?: number;
  friction?: number;
}

export function useParticleSpray(
  containerRef: React.RefObject<HTMLDivElement>,
  options: UseParticleSprayOptions = {},
) {
  const {
    particleCount = 12,
    colors = ["#fbbf24", "#f59e0b", "#f97316", "#fca5a5"],
    velocity = 6,
    gravity = 0.15,
    friction = 0.98,
  } = options;

  const particlesRef = useRef<Map<number, Particle>>(new Map());
  const particleIdRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const isAnimatingRef = useRef(false);

  const createParticles = useCallback(
    (x: number, y: number) => {
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const randomAngle = angle + (Math.random() - 0.5) * 0.6;

        const particle: Particle = {
          id: particleIdRef.current++,
          x,
          y,
          vx: Math.cos(randomAngle) * velocity * (0.7 + Math.random() * 0.6),
          vy: Math.sin(randomAngle) * velocity * (0.7 + Math.random() * 0.6),
          life: 1,
          maxLife: 0.8 + Math.random() * 0.4,
          size: 3 + Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)],
        };

        particlesRef.current.set(particle.id, particle);
      }
    },
    [particleCount, colors, velocity],
  );

  const updateParticles = useCallback(() => {
    const particles = particlesRef.current;
    const idsToRemove: number[] = [];

    particles.forEach((particle) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Apply gravity
      particle.vy += gravity;

      // Apply friction
      particle.vx *= friction;
      particle.vy *= friction;

      // Update life
      particle.life -= 1 / 60;

      if (particle.life <= 0) {
        idsToRemove.push(particle.id);
      }
    });

    // Remove dead particles
    idsToRemove.forEach((id) => particles.delete(id));

    // Continue animation if particles exist
    if (particles.size > 0) {
      animationFrameRef.current = requestAnimationFrame(updateParticles);
    } else {
      isAnimatingRef.current = false;
      animationFrameRef.current = undefined;
    }
  }, [gravity, friction]);

  const triggerSpray = useCallback(
    (x: number, y: number) => {
      createParticles(x, y);

      // Always start/continue animation when spray is triggered
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        animationFrameRef.current = requestAnimationFrame(updateParticles);
      }
    },
    [createParticles, updateParticles],
  );

  const getParticles = useCallback(() => {
    return Array.from(particlesRef.current.values());
  }, []);

  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    particlesRef.current.clear();
  }, []);

  return {
    triggerSpray,
    getParticles,
    cleanup,
  };
}
