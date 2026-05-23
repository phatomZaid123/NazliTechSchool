"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Point = {
  x: number;
  y: number;
  size?: number;
};

type Link = [number, number];

type Particle = {
  x: number;
  rise: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  drift: number;
};

type MousePosition = {
  x: number;
  y: number;
  active: boolean;
};

type CityBlock = {
  x: number;
  w: number;
  h: number;
  base: number;
  depth: number;
  delay: number;
};

type PrismShard = {
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  duration: number;
  delay: number;
};

type ReefStem = {
  x: number;
  width: number;
  height: number;
  blur: number;
  delay: number;
};

const SHARED_PURPLE_SPACE = `
  radial-gradient(circle at 78% 84%, rgba(122, 56, 244, 0.24) 0%, rgba(122, 56, 244, 0) 42%),
  radial-gradient(circle at 18% 16%, rgba(78, 26, 168, 0.32) 0%, rgba(78, 26, 168, 0) 38%),
  linear-gradient(145deg, #080013 0%, #130028 46%, #1f0340 100%)
`;

const BASE_VIGNETTE = `
  radial-gradient(ellipse at center, rgba(11, 2, 30, 0) 36%, rgba(4, 0, 10, 0.58) 100%)
`;

const NEBULA_NODES: Point[] = [
  { x: 6, y: 15, size: 1.8 },
  { x: 13, y: 23, size: 2.4 },
  { x: 19, y: 12, size: 1.7 },
  { x: 28, y: 20, size: 2.2 },
  { x: 37, y: 14, size: 1.9 },
  { x: 44, y: 26, size: 2.8 },
  { x: 51, y: 18, size: 2.1 },
  { x: 60, y: 24, size: 2.3 },
  { x: 68, y: 16, size: 2.6 },
  { x: 75, y: 25, size: 1.9 },
  { x: 84, y: 14, size: 1.6 },
  { x: 90, y: 22, size: 2.2 },
  { x: 24, y: 40, size: 2.4 },
  { x: 35, y: 48, size: 1.9 },
  { x: 47, y: 39, size: 2.6 },
  { x: 58, y: 46, size: 2.2 },
  { x: 70, y: 41, size: 2.5 },
  { x: 82, y: 47, size: 1.8 },
  { x: 18, y: 62, size: 1.7 },
  { x: 30, y: 69, size: 2.1 },
  { x: 45, y: 64, size: 2.7 },
  { x: 59, y: 72, size: 2.2 },
  { x: 74, y: 67, size: 2.3 },
  { x: 88, y: 74, size: 2.0 },
];

const NEBULA_LINKS: Link[] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [3, 12],
  [12, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [16, 17],
  [12, 18],
  [18, 19],
  [19, 20],
  [20, 21],
  [21, 22],
  [22, 23],
  [5, 14],
  [8, 16],
  [14, 20],
  [16, 22],
];

const ROOT_NODES: Point[] = [
  { x: 50, y: 93, size: 2.8 },
  { x: 46, y: 84, size: 2.3 },
  { x: 54, y: 84, size: 2.3 },
  { x: 40, y: 75, size: 2.2 },
  { x: 48, y: 72, size: 2.0 },
  { x: 60, y: 75, size: 2.2 },
  { x: 52, y: 70, size: 2.0 },
  { x: 34, y: 64, size: 2.0 },
  { x: 42, y: 61, size: 1.8 },
  { x: 50, y: 58, size: 1.9 },
  { x: 58, y: 61, size: 1.8 },
  { x: 66, y: 64, size: 2.0 },
  { x: 30, y: 51, size: 1.6 },
  { x: 38, y: 49, size: 1.6 },
  { x: 46, y: 46, size: 1.7 },
  { x: 54, y: 46, size: 1.7 },
  { x: 62, y: 49, size: 1.6 },
  { x: 70, y: 51, size: 1.6 },
  { x: 44, y: 36, size: 1.4 },
  { x: 56, y: 36, size: 1.4 },
  { x: 50, y: 27, size: 1.6 },
];

const ROOT_LINKS: Link[] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [2, 6],
  [3, 7],
  [3, 8],
  [4, 9],
  [5, 10],
  [5, 11],
  [7, 12],
  [8, 13],
  [9, 14],
  [9, 15],
  [10, 15],
  [10, 16],
  [11, 17],
  [14, 18],
  [15, 19],
  [18, 20],
  [19, 20],
];

function seededValue(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function createParticles(
  count: number,
  seed: number,
  options: {
    minRise: number;
    maxRise: number;
    minSize: number;
    maxSize: number;
    minDuration: number;
    maxDuration: number;
    maxDrift: number;
    opacityMin: number;
    opacityMax: number;
  },
): Particle[] {
  const {
    minRise,
    maxRise,
    minSize,
    maxSize,
    minDuration,
    maxDuration,
    maxDrift,
    opacityMin,
    opacityMax,
  } = options;

  return Array.from({ length: count }, (_, index) => {
    const x = seededValue(seed + index * 1.3) * 100;
    const rise = minRise + seededValue(seed + index * 2.2) * (maxRise - minRise);
    const size = minSize + seededValue(seed + index * 3.1) * (maxSize - minSize);
    const delay = seededValue(seed + index * 0.7) * 8;
    const duration =
      minDuration + seededValue(seed + index * 2.9) * (maxDuration - minDuration);
    const opacity =
      opacityMin + seededValue(seed + index * 4.7) * (opacityMax - opacityMin);
    const drift = (seededValue(seed + index * 5.9) - 0.5) * maxDrift;

    return {
      x,
      rise,
      size,
      delay,
      duration,
      opacity,
      drift,
    };
  });
}

function buildAuroraMesh() {
  const points: Point[] = [];
  const links: Link[] = [];
  const rows = 6;
  const cols = 9;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = 8 + col * 10 + (row % 2 === 0 ? 0 : 2.6);
      const y = 12 + row * 13 + (col % 2 === 0 ? 0 : 1.6);
      points.push({ x, y, size: 1.1 + ((row + col) % 3) * 0.45 });
    }
  }

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const index = row * cols + col;

      if (col < cols - 1) {
        links.push([index, index + 1]);
      }
      if (row < rows - 1) {
        links.push([index, index + cols]);
      }
      if (row < rows - 1 && col < cols - 1 && (row + col) % 3 === 0) {
        links.push([index, index + cols + 1]);
      }
    }
  }

  return { points, links };
}

function createCityBlocks(count: number, seed: number): CityBlock[] {
  return Array.from({ length: count }, (_, index) => {
    const lane = index % 8;
    const row = Math.floor(index / 8);
    const jitter = (seededValue(seed + index * 1.4) - 0.5) * 2.8;
    return {
      x: 6 + lane * 11.4 + jitter,
      w: 5.2 + seededValue(seed + index * 2.3) * 2.4,
      h: 10 + seededValue(seed + index * 3.1) * 30,
      base: 6 + row * 4.8 + seededValue(seed + index * 4.1) * 2.3,
      depth: 2 + seededValue(seed + index * 5.1) * 1.8,
      delay: seededValue(seed + index * 7.4) * 4.5,
    };
  });
}

function createPrismShards(count: number, seed: number): PrismShard[] {
  return Array.from({ length: count }, (_, index) => ({
    x: 5 + seededValue(seed + index * 1.8) * 88,
    y: 8 + seededValue(seed + index * 2.4) * 78,
    w: 46 + seededValue(seed + index * 3.6) * 120,
    h: 32 + seededValue(seed + index * 4.2) * 90,
    rotate: -22 + seededValue(seed + index * 5.8) * 44,
    duration: 9 + seededValue(seed + index * 6.1) * 8,
    delay: seededValue(seed + index * 7.3) * 3.5,
  }));
}

function createReefStems(count: number, seed: number): ReefStem[] {
  return Array.from({ length: count }, (_, index) => ({
    x: seededValue(seed + index * 1.2) * 100,
    width: 22 + seededValue(seed + index * 2.4) * 42,
    height: 22 + seededValue(seed + index * 3.5) * 54,
    blur: 1 + seededValue(seed + index * 4.6) * 4,
    delay: seededValue(seed + index * 5.2) * 3.2,
  }));
}

const NEBULA_PARTICLES = createParticles(36, 11, {
  minRise: 220,
  maxRise: 520,
  minSize: 1.3,
  maxSize: 4.4,
  minDuration: 5.6,
  maxDuration: 9.8,
  maxDrift: 54,
  opacityMin: 0.25,
  opacityMax: 0.95,
});

const ROOT_PARTICLES = createParticles(44, 29, {
  minRise: 180,
  maxRise: 420,
  minSize: 1.0,
  maxSize: 2.6,
  minDuration: 4.8,
  maxDuration: 8.6,
  maxDrift: 30,
  opacityMin: 0.24,
  opacityMax: 0.86,
});

const AURORA_PARTICLES = createParticles(34, 53, {
  minRise: 240,
  maxRise: 500,
  minSize: 1.2,
  maxSize: 3.4,
  minDuration: 6.2,
  maxDuration: 10.4,
  maxDrift: 70,
  opacityMin: 0.22,
  opacityMax: 0.82,
});

const CITY_BLOCKS = createCityBlocks(24, 67);
const CITY_TRAFFIC_LINES = Array.from({ length: 9 }, (_, index) => ({
  y: 64 + index * 3.9,
  delay: index * 0.55,
  duration: 6.8 + (index % 4) * 1.2,
  width: 16 + (index % 3) * 10,
  left: 8 + (index % 5) * 16,
}));

const PRISM_SHARDS = createPrismShards(18, 83);
const REEF_STEMS = createReefStems(14, 97);
const REEF_PLANKTON = createParticles(72, 113, {
  minRise: 180,
  maxRise: 380,
  minSize: 0.9,
  maxSize: 2.7,
  minDuration: 5.8,
  maxDuration: 10.2,
  maxDrift: 44,
  opacityMin: 0.2,
  opacityMax: 0.92,
});

const { points: AURORA_POINTS, links: AURORA_LINKS } = buildAuroraMesh();

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function useLowPerformanceMode() {
  const prefersReducedMotion = useReducedMotion();
  const [isLowPowerHardware, setIsLowPowerHardware] = useState(false);

  useEffect(() => {
    const navWithHints = navigator as Navigator & { deviceMemory?: number };

    const lowMemory =
      typeof navWithHints.deviceMemory === "number" &&
      navWithHints.deviceMemory <= 4;
    const lowCpuCores =
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 4;
    const updateSlow = window.matchMedia("(update: slow)").matches;

    setIsLowPowerHardware(lowMemory || lowCpuCores || updateSlow);
  }, []);

  return prefersReducedMotion || isLowPowerHardware;
}

function useSectionMousePosition(enabled = true) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nextStateRef = useRef<MousePosition>({
    x: 50,
    y: 50,
    active: false,
  });
  const [mouse, setMouse] = useState<MousePosition>({
    x: 50,
    y: 50,
    active: false,
  });

  useEffect(() => {
    if (!enabled) return;

    let frameId: number | null = null;

    const flushFrame = () => {
      frameId = null;
      setMouse(nextStateRef.current);
    };

    const queueFrame = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(flushFrame);
    };

    const handleMove = (event: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        if (!nextStateRef.current.active) return;
        nextStateRef.current = { ...nextStateRef.current, active: false };
        queueFrame();
        return;
      }

      const nextX = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
      const nextY = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);

      nextStateRef.current = { x: nextX, y: nextY, active: true };
      queueFrame();
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [enabled]);

  return { containerRef, mouse };
}

export function NebulaDriftBackground() {
  const lowPerformanceMode = useLowPerformanceMode();
  const { containerRef, mouse } = useSectionMousePosition(!lowPerformanceMode);
  const lineShiftX = mouse.active ? ((mouse.x - 50) / 50) * 7 : 0;
  const lineShiftY = mouse.active ? ((mouse.y - 50) / 50) * 5 : 0;

  if (lowPerformanceMode) {
    return (
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{ background: SHARED_PURPLE_SPACE }}
      >
        <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ background: SHARED_PURPLE_SPACE }}
    >
      <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />

      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        <g style={{ transform: `translate(${lineShiftX}px, ${lineShiftY}px)` }}>
          {NEBULA_LINKS.map(([from, to], index) => {
            const a = NEBULA_NODES[from];
            const b = NEBULA_NODES[to];
            return (
              <motion.line
                key={`nebula-link-${from}-${to}`}
                x1={`${a.x}%`}
                y1={`${a.y}%`}
                x2={`${b.x}%`}
                y2={`${b.y}%`}
                stroke="rgba(165, 132, 255, 0.24)"
                strokeWidth={index % 3 === 0 ? 1.15 : 0.9}
                animate={{ opacity: [0.24, 0.52, 0.24] }}
                transition={{
                  duration: 4.2 + (index % 5) * 0.8,
                  delay: (index % 7) * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </g>

        {NEBULA_NODES.map((node, index) => (
          <motion.circle
            key={`nebula-node-${index}`}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size ?? 2}
            fill={index % 4 === 0 ? "rgba(246, 189, 255, 0.9)" : "rgba(169, 140, 255, 0.9)"}
            animate={{
              opacity: [0.45, 1, 0.45],
              r: [node.size ?? 2, (node.size ?? 2) + 0.7, node.size ?? 2],
            }}
            transition={{
              duration: 3 + (index % 6) * 0.45,
              delay: index * 0.12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              filter:
                index % 2 === 0
                  ? "drop-shadow(0 0 8px rgba(172, 111, 255, 0.62))"
                  : "drop-shadow(0 0 6px rgba(210, 153, 255, 0.55))",
            }}
          />
        ))}
      </svg>

      {NEBULA_PARTICLES.map((particle, index) => (
        <motion.span
          key={`nebula-particle-${index}`}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            bottom: "-10%",
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background:
              index % 5 === 0 ? "rgba(243, 174, 255, 0.92)" : "rgba(169, 120, 255, 0.88)",
            boxShadow:
              index % 5 === 0
                ? "0 0 12px rgba(243, 174, 255, 0.5)"
                : "0 0 10px rgba(150, 99, 255, 0.48)",
          }}
          animate={{
            y: [0, -particle.rise],
            x: [0, particle.drift, particle.drift * -0.35],
            opacity: [0, particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      <motion.div
        className="absolute h-72 w-72 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[72px] mix-blend-screen"
        style={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
          background:
            "radial-gradient(circle at center, rgba(198, 149, 255, 0.56) 0%, rgba(128, 72, 238, 0.23) 45%, rgba(48, 14, 116, 0) 100%)",
        }}
        animate={{ opacity: mouse.active ? 0.8 : 0 }}
        transition={{ duration: 0.18 }}
      />
    </div>
  );
}

export function ElectricRootfieldBackground() {
  const lowPerformanceMode = useLowPerformanceMode();
  const { containerRef, mouse } = useSectionMousePosition(!lowPerformanceMode);

  if (lowPerformanceMode) {
    return (
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{ background: SHARED_PURPLE_SPACE }}
      >
        <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ background: SHARED_PURPLE_SPACE }}
    >
      <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />

      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        {ROOT_LINKS.map(([from, to], index) => {
          const a = ROOT_NODES[from];
          const b = ROOT_NODES[to];
          return (
            <g key={`root-link-${from}-${to}`}>
              <motion.line
                x1={`${a.x}%`}
                y1={`${a.y}%`}
                x2={`${b.x}%`}
                y2={`${b.y}%`}
                stroke={index % 4 === 0 ? "rgba(239, 194, 255, 0.28)" : "rgba(171, 128, 255, 0.33)"}
                strokeWidth={1.1}
                animate={{ opacity: [0.26, 0.55, 0.26] }}
                transition={{
                  duration: 3.4 + (index % 5) * 0.6,
                  delay: (index % 6) * 0.22,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.circle
                r={1.8}
                fill="rgba(232, 196, 255, 0.95)"
                initial={{ cx: `${a.x}%`, cy: `${a.y}%`, opacity: 0 }}
                animate={{
                  cx: [`${a.x}%`, `${b.x}%`],
                  cy: [`${a.y}%`, `${b.y}%`],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.5 + (index % 4) * 0.35,
                  delay: index * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ filter: "drop-shadow(0 0 6px rgba(232, 196, 255, 0.86))" }}
              />
            </g>
          );
        })}

        {ROOT_NODES.map((node, index) => (
          <motion.circle
            key={`root-node-${index}`}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size ?? 1.8}
            fill="rgba(195, 152, 255, 0.9)"
            animate={{ opacity: [0.35, 0.92, 0.35] }}
            transition={{
              duration: 2.8 + (index % 4) * 0.45,
              delay: index * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ filter: "drop-shadow(0 0 7px rgba(171, 128, 255, 0.6))" }}
          />
        ))}
      </svg>

      {ROOT_PARTICLES.map((particle, index) => (
        <motion.span
          key={`root-particle-${index}`}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            bottom: "-8%",
            width: `${particle.size}px`,
            height: `${Math.max(8, particle.size * 5)}px`,
            background: "linear-gradient(to top, rgba(179, 135, 255, 0), rgba(179, 135, 255, 0.92))",
            borderRadius: "999px",
            boxShadow: "0 0 8px rgba(179, 135, 255, 0.45)",
          }}
          animate={{
            y: [0, -particle.rise],
            x: [0, particle.drift * 0.35],
            opacity: [0, particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      <motion.div
        className="absolute h-[22rem] w-[22rem] rounded-full -translate-x-1/2 -translate-y-1/2 border border-violet-200/30 blur-sm"
        style={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
          background:
            "radial-gradient(circle at center, rgba(214, 178, 255, 0.28) 0%, rgba(145, 87, 240, 0.12) 42%, rgba(39, 10, 101, 0) 74%)",
        }}
        animate={{
          opacity: mouse.active ? 0.95 : 0,
          scale: mouse.active ? 1 : 0.85,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}

export function AuroraMeshBackground() {
  const lowPerformanceMode = useLowPerformanceMode();
  const { containerRef, mouse } = useSectionMousePosition(!lowPerformanceMode);

  if (lowPerformanceMode) {
    return (
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{ background: SHARED_PURPLE_SPACE }}
      >
        <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ background: SHARED_PURPLE_SPACE }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(99, 75, 240, 0.24) 0%, rgba(82, 175, 235, 0.14) 40%, rgba(223, 119, 255, 0.18) 100%)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />

      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
        {AURORA_LINKS.map(([from, to], index) => {
          const a = AURORA_POINTS[from];
          const b = AURORA_POINTS[to];
          return (
            <motion.line
              key={`aurora-link-${from}-${to}`}
              x1={`${a.x}%`}
              y1={`${a.y}%`}
              x2={`${b.x}%`}
              y2={`${b.y}%`}
              stroke="rgba(132, 131, 255, 0.24)"
              strokeWidth={index % 3 === 0 ? 1.05 : 0.85}
              animate={{
                opacity: [0.2, 0.52, 0.2],
                stroke: [
                  "rgba(132, 131, 255, 0.22)",
                  "rgba(93, 198, 255, 0.38)",
                  "rgba(214, 129, 255, 0.3)",
                  "rgba(132, 131, 255, 0.22)",
                ],
              }}
              transition={{
                duration: 8 + (index % 7) * 0.85,
                delay: (index % 10) * 0.18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {AURORA_POINTS.map((point, index) => (
          <motion.circle
            key={`aurora-point-${index}`}
            cx={`${point.x}%`}
            cy={`${point.y}%`}
            r={point.size ?? 1.3}
            fill={index % 4 === 0 ? "rgba(203, 150, 255, 0.76)" : "rgba(130, 186, 255, 0.76)"}
            animate={{ opacity: [0.28, 0.78, 0.28] }}
            transition={{
              duration: 4.4 + (index % 6) * 0.45,
              delay: index * 0.06,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {AURORA_PARTICLES.map((particle, index) => (
        <motion.span
          key={`aurora-particle-${index}`}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            bottom: "-9%",
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background:
              index % 3 === 0 ? "rgba(168, 221, 255, 0.9)" : "rgba(196, 150, 255, 0.85)",
            boxShadow:
              index % 3 === 0
                ? "0 0 10px rgba(168, 221, 255, 0.48)"
                : "0 0 10px rgba(196, 150, 255, 0.45)",
          }}
          animate={{
            y: [0, -particle.rise],
            x: [0, particle.drift, particle.drift * -0.25],
            opacity: [0, particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="absolute h-[17rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 blur-[80px] rounded-full mix-blend-screen"
        style={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
          background:
            "linear-gradient(95deg, rgba(192, 147, 255, 0.34) 0%, rgba(137, 205, 255, 0.27) 52%, rgba(244, 156, 255, 0.25) 100%)",
        }}
        animate={{
          opacity: mouse.active ? 0.75 : 0,
          scale: mouse.active ? 1 : 0.88,
        }}
        transition={{ duration: 0.24 }}
      />
    </div>
  );
}

export function IsometricNeonCityBackground() {
  const lowPerformanceMode = useLowPerformanceMode();
  const { containerRef, mouse } = useSectionMousePosition(!lowPerformanceMode);
  const glowX = mouse.active ? mouse.x : 58;
  const glowY = mouse.active ? mouse.y : 42;

  if (lowPerformanceMode) {
    return (
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{ background: SHARED_PURPLE_SPACE }}
      >
        <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ background: SHARED_PURPLE_SPACE }}
    >
      <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />

      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(97,51,187,0.28),rgba(8,2,18,0.08)_45%,rgba(8,2,18,0.4))]" />

      {CITY_BLOCKS.map((block, index) => (
        <motion.div
          key={`city-block-${index}`}
          className="absolute"
          style={{
            left: `${block.x}%`,
            bottom: `${block.base}%`,
            width: `${block.w}%`,
            height: `${block.h}%`,
            transform: "skewY(-12deg)",
            transformOrigin: "bottom left",
          }}
          animate={{
            opacity: [0.5, 0.92, 0.5],
            scaleY: [0.96, 1, 0.96],
          }}
          transition={{
            duration: 5.2 + (index % 4) * 0.7,
            delay: block.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 rounded-t-[0.7rem] border border-violet-200/20 bg-[linear-gradient(160deg,rgba(117,87,255,0.3),rgba(42,20,103,0.48))]" />
          <div
            className="absolute top-0 h-full rounded-t-[0.5rem] border border-violet-100/20 bg-[linear-gradient(180deg,rgba(120,219,255,0.3),rgba(55,84,168,0.12)_42%,rgba(26,8,61,0.4)_100%)]"
            style={{
              right: `${-block.depth}%`,
              width: `${block.depth}%`,
              transform: "skewY(24deg)",
              transformOrigin: "top left",
            }}
          />
        </motion.div>
      ))}

      {CITY_TRAFFIC_LINES.map((line, index) => (
        <div
          key={`traffic-line-${index}`}
          className="absolute h-px rounded-full bg-violet-200/20"
          style={{
            left: `${line.left}%`,
            top: `${line.y}%`,
            width: `${line.width}%`,
          }}
        >
          <motion.span
            className="absolute -top-[2px] h-[5px] w-[5px] rounded-full bg-cyan-200"
            style={{
              boxShadow: "0 0 10px rgba(168, 239, 255, 0.8)",
            }}
            animate={{ x: ["0%", "95%"] }}
            transition={{
              duration: line.duration,
              delay: line.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      ))}

      <motion.div
        className="absolute h-[22rem] w-[22rem] rounded-full -translate-x-1/2 -translate-y-1/2 blur-[85px] mix-blend-screen"
        style={{
          left: `${glowX}%`,
          top: `${glowY}%`,
          background:
            "radial-gradient(circle at center, rgba(184, 159, 255, 0.5) 0%, rgba(116, 71, 233, 0.16) 48%, rgba(51, 15, 130, 0) 100%)",
        }}
        animate={{ opacity: mouse.active ? 0.88 : 0.52 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}

export function MagneticSandFieldBackground() {
  const lowPerformanceMode = useLowPerformanceMode();
  const { containerRef, mouse } = useSectionMousePosition(!lowPerformanceMode);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef(mouse);

  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  useEffect(() => {
    if (lowPerformanceMode) return;

    const canvas = canvasRef.current;
    const host = containerRef.current;
    if (!canvas || !host) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    type SandParticle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      seed: number;
      size: number;
    };

    const particles: SandParticle[] = Array.from({ length: 1100 }, (_, index) => ({
      x: seededValue(190 + index * 0.37) * host.clientWidth,
      y: seededValue(230 + index * 0.49) * host.clientHeight,
      vx: 0,
      vy: 0,
      seed: seededValue(260 + index * 1.13),
      size: 0.7 + seededValue(310 + index * 0.87) * 1.2,
    }));

    let rafId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      width = host.clientWidth;
      height = host.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (now: number) => {
      const t = now * 0.001;
      context.clearRect(0, 0, width, height);

      const magnets = [
        {
          x: width * 0.26 + Math.sin(t * 0.42) * width * 0.08,
          y: height * 0.38 + Math.cos(t * 0.55) * height * 0.06,
          strength: 0.095,
        },
        {
          x: width * 0.63 + Math.cos(t * 0.36 + 1.4) * width * 0.09,
          y: height * 0.56 + Math.sin(t * 0.48 + 0.7) * height * 0.07,
          strength: -0.11,
        },
        {
          x: width * 0.5 + Math.sin(t * 0.31 + 2.2) * width * 0.1,
          y: height * 0.68 + Math.cos(t * 0.43 + 1.2) * height * 0.07,
          strength: 0.082,
        },
      ];

      const currentMouse = mouseRef.current;
      const mouseX = (currentMouse.x / 100) * width;
      const mouseY = (currentMouse.y / 100) * height;
      const mouseRadius = Math.min(width, height) * 0.26;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        let ax = 0;
        let ay = 0;

        for (let j = 0; j < magnets.length; j += 1) {
          const magnet = magnets[j];
          const dx = magnet.x - p.x;
          const dy = magnet.y - p.y;
          const distSq = dx * dx + dy * dy + 120;
          const force = (magnet.strength * 2600) / distSq;
          ax += dx * force;
          ay += dy * force;
        }

        const swirlA = (p.x * 0.008 + p.y * 0.011 + t + p.seed * 10) * 0.8;
        ax += Math.cos(swirlA) * 0.014;
        ay += Math.sin(swirlA) * 0.014;

        if (currentMouse.active) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.hypot(dx, dy) + 0.001;
          if (dist < mouseRadius) {
            const influence = ((mouseRadius - dist) / mouseRadius) ** 2;
            ax -= (dx / dist) * influence * 0.32;
            ay -= (dy / dist) * influence * 0.32;
            ax += (-dy / dist) * influence * 0.16;
            ay += (dx / dist) * influence * 0.16;
          }
        }

        p.vx = (p.vx + ax) * 0.94;
        p.vy = (p.vy + ay) * 0.94;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;
        if (p.y < -4) p.y = height + 4;
        if (p.y > height + 4) p.y = -4;

        const alpha = 0.18 + p.seed * 0.5;
        context.fillStyle =
          i % 5 === 0
            ? `rgba(183, 209, 255, ${alpha})`
            : `rgba(199, 153, 255, ${alpha * 0.88})`;
        context.fillRect(p.x, p.y, p.size, p.size);
      }

      rafId = window.requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();
    rafId = window.requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(rafId);
    };
  }, [containerRef, lowPerformanceMode]);

  if (lowPerformanceMode) {
    return (
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{ background: SHARED_PURPLE_SPACE }}
      >
        <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ background: SHARED_PURPLE_SPACE }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 35%, rgba(126, 92, 250, 0.18), transparent 44%), radial-gradient(circle at 69% 70%, rgba(187, 133, 250, 0.18), transparent 42%)",
        }}
      />
      <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />

      <motion.div
        className="absolute h-80 w-80 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[80px] mix-blend-screen"
        style={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
          background:
            "radial-gradient(circle at center, rgba(200, 160, 255, 0.36) 0%, rgba(130, 84, 236, 0.14) 47%, rgba(58, 16, 138, 0) 100%)",
        }}
        animate={{ opacity: mouse.active ? 0.76 : 0 }}
        transition={{ duration: 0.22 }}
      />
    </div>
  );
}

export function PrismGlassShardsBackground() {
  const lowPerformanceMode = useLowPerformanceMode();
  const containerRef = useRef<HTMLDivElement>(null);

  if (lowPerformanceMode) {
    return (
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{ background: SHARED_PURPLE_SPACE }}
      >
        <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ background: SHARED_PURPLE_SPACE }}
    >
      <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "conic-gradient(from 220deg at 30% 40%, rgba(134, 117, 255, 0.1), rgba(132, 203, 255, 0.16), rgba(229, 146, 255, 0.14), rgba(134, 117, 255, 0.1))",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: [0.35, 0.58, 0.35] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {PRISM_SHARDS.map((shard, index) => (
        <motion.div
          key={`prism-shard-${index}`}
          className="absolute border border-violet-100/20"
          style={{
            left: `${shard.x}%`,
            top: `${shard.y}%`,
            width: `${shard.w}px`,
            height: `${shard.h}px`,
            clipPath: "polygon(0% 28%, 26% 0%, 100% 18%, 78% 100%, 12% 90%)",
            background:
              index % 3 === 0
                ? "linear-gradient(140deg, rgba(174, 226, 255, 0.28), rgba(130, 91, 255, 0.12))"
                : "linear-gradient(140deg, rgba(230, 166, 255, 0.24), rgba(90, 110, 255, 0.12))",
            transform: `rotate(${shard.rotate}deg)`,
            backdropFilter: "blur(2px)",
          }}
          animate={{
            y: [0, -14, 0],
            x: [0, 8, -5, 0],
            rotate: [shard.rotate, shard.rotate + 6, shard.rotate - 3, shard.rotate],
            opacity: [0.22, 0.66, 0.3],
          }}
          transition={{
            duration: shard.duration,
            delay: shard.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function BioluminescentReefBackground() {
  const lowPerformanceMode = useLowPerformanceMode();
  const { containerRef, mouse } = useSectionMousePosition(!lowPerformanceMode);

  if (lowPerformanceMode) {
    return (
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{ background: SHARED_PURPLE_SPACE }}
      >
        <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ background: SHARED_PURPLE_SPACE }}
    >
      <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />

      <div className="absolute bottom-[-18%] left-[-10%] h-[62%] w-[130%] rounded-[45%] bg-[radial-gradient(ellipse_at_top,rgba(118,96,248,0.38),rgba(37,11,89,0.1)_60%,rgba(6,2,18,0)_100%)] blur-[30px]" />

      {REEF_STEMS.map((stem, index) => (
        <motion.div
          key={`reef-stem-${index}`}
          className="absolute bottom-[-10%] rounded-t-[999px]"
          style={{
            left: `${stem.x}%`,
            width: `${stem.width}px`,
            height: `${stem.height}%`,
            filter: `blur(${stem.blur}px)`,
            background:
              index % 4 === 0
                ? "linear-gradient(to top, rgba(47, 18, 104, 0.2), rgba(110, 219, 255, 0.44))"
                : "linear-gradient(to top, rgba(35, 12, 82, 0.2), rgba(215, 132, 255, 0.46))",
          }}
          animate={{
            opacity: [0.34, 0.86, 0.34],
            scaleY: [0.95, 1.06, 0.95],
          }}
          transition={{
            duration: 6.2 + (index % 5) * 0.8,
            delay: stem.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {REEF_PLANKTON.map((particle, index) => {
        const deltaX = Math.abs(particle.x - mouse.x);
        const proximity = mouse.active ? clamp((34 - deltaX) / 34, 0, 1) : 0;
        const scatter =
          (particle.x < mouse.x ? -1 : 1) * proximity * (16 + (index % 7) * 2.5);

        return (
          <motion.span
            key={`reef-plankton-${index}`}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              bottom: "-8%",
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background:
                index % 3 === 0
                  ? "rgba(171, 236, 255, 0.9)"
                  : index % 3 === 1
                    ? "rgba(217, 161, 255, 0.88)"
                    : "rgba(153, 210, 255, 0.85)",
              boxShadow:
                index % 3 === 0
                  ? "0 0 10px rgba(171, 236, 255, 0.56)"
                  : "0 0 10px rgba(202, 152, 255, 0.52)",
            }}
            animate={{
              y: [0, -particle.rise],
              x: [0, scatter, particle.drift * 0.25],
              opacity: [0, particle.opacity, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        );
      })}

      <motion.div
        className="absolute h-64 w-64 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[65px] mix-blend-screen"
        style={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
          background:
            "radial-gradient(circle at center, rgba(168, 234, 255, 0.3) 0%, rgba(196, 153, 255, 0.24) 45%, rgba(30, 10, 88, 0) 100%)",
        }}
        animate={{ opacity: mouse.active ? 0.84 : 0.24 }}
        transition={{ duration: 0.16 }}
      />
    </div>
  );
}

export function CircuitPulseMatrixBackground() {
  const lowPerformanceMode = useLowPerformanceMode();
  const { containerRef, mouse } = useSectionMousePosition(!lowPerformanceMode);
  const cols = 12;
  const rows = 8;
  const pulseTracks = Array.from({ length: 18 }, (_, index) => {
    const fromCol = index % (cols - 2);
    const fromRow = index % rows;
    const toCol = Math.min(cols - 1, fromCol + 2 + (index % 4));
    return {
      fromX: 8 + fromCol * 7.4,
      fromY: 12 + fromRow * 10.8,
      toX: 8 + toCol * 7.4,
      toY: 12 + fromRow * 10.8,
      delay: index * 0.28,
      duration: 2.6 + (index % 4) * 0.5,
    };
  });

  if (lowPerformanceMode) {
    return (
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{ background: SHARED_PURPLE_SPACE }}
      >
        <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ background: SHARED_PURPLE_SPACE }}
    >
      <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(166,137,255,0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(166,137,255,0.24) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
        }}
      />

      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => {
            const x = 8 + col * 7.4;
            const y = 12 + row * 10.8;

            return (
              <g key={`matrix-node-${row}-${col}`}>
                {col < cols - 1 && (
                  <line
                    x1={`${x}%`}
                    y1={`${y}%`}
                    x2={`${x + 7.4}%`}
                    y2={`${y}%`}
                    stroke="rgba(145, 147, 255, 0.26)"
                    strokeWidth="0.9"
                  />
                )}
                {row < rows - 1 && (
                  <line
                    x1={`${x}%`}
                    y1={`${y}%`}
                    x2={`${x}%`}
                    y2={`${y + 10.8}%`}
                    stroke="rgba(145, 147, 255, 0.2)"
                    strokeWidth="0.8"
                  />
                )}
                <motion.circle
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="1.7"
                  fill="rgba(200, 173, 255, 0.75)"
                  animate={{ opacity: [0.26, 0.76, 0.26] }}
                  transition={{
                    duration: 3.8 + ((row + col) % 4) * 0.4,
                    delay: (row * cols + col) * 0.02,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </g>
            );
          }),
        )}

        {pulseTracks.map((track, index) => (
          <motion.circle
            key={`matrix-pulse-${index}`}
            r="2.4"
            fill="rgba(167, 233, 255, 0.95)"
            initial={{ cx: `${track.fromX}%`, cy: `${track.fromY}%` }}
            animate={{
              cx: [`${track.fromX}%`, `${track.toX}%`],
              cy: [`${track.fromY}%`, `${track.toY}%`],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: track.duration,
              delay: track.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ filter: "drop-shadow(0 0 7px rgba(167, 233, 255, 0.86))" }}
          />
        ))}
      </svg>

      <motion.div
        className="absolute h-[22rem] w-[22rem] rounded-full -translate-x-1/2 -translate-y-1/2 blur-[70px] mix-blend-screen"
        style={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
          background:
            "radial-gradient(circle at center, rgba(182, 236, 255, 0.3) 0%, rgba(198, 151, 255, 0.24) 42%, rgba(54, 17, 130, 0) 100%)",
        }}
        animate={{
          opacity: mouse.active ? 0.9 : 0.2,
          scale: mouse.active ? 1.08 : 0.94,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}

export function SolarWindBandsBackground() {
  const lowPerformanceMode = useLowPerformanceMode();
  const { containerRef, mouse } = useSectionMousePosition(!lowPerformanceMode);
  const bands = Array.from({ length: 8 }, (_, index) => ({
    y: 10 + index * 11.6,
    height: 8 + (index % 3) * 2,
    delay: index * 0.45,
    duration: 8 + (index % 4) * 1.4,
    opacity: 0.15 + (index % 4) * 0.06,
  }));

  if (lowPerformanceMode) {
    return (
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{ background: SHARED_PURPLE_SPACE }}
      >
        <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ background: SHARED_PURPLE_SPACE }}
    >
      <div className="absolute inset-0" style={{ background: BASE_VIGNETTE }} />

      {bands.map((band, index) => (
        <motion.div
          key={`solar-band-${index}`}
          className="absolute left-[-12%] w-[124%] rounded-full"
          style={{
            top: `${band.y}%`,
            height: `${band.height}%`,
            opacity: band.opacity,
            background:
              index % 2 === 0
                ? "linear-gradient(90deg, rgba(122,106,255,0), rgba(150,205,255,0.72), rgba(227,152,255,0.62), rgba(122,106,255,0))"
                : "linear-gradient(90deg, rgba(122,106,255,0), rgba(227,152,255,0.66), rgba(150,205,255,0.6), rgba(122,106,255,0))",
            filter: "blur(12px)",
          }}
          animate={{
            x: ["-3%", "3%", "-3%"],
            scaleX: [0.96, 1.03, 0.96],
          }}
          transition={{
            duration: band.duration,
            delay: band.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {Array.from({ length: 10 }).map((_, index) => (
        <motion.span
          key={`solar-flare-${index}`}
          className="absolute h-[2px] rounded-full"
          style={{
            top: `${14 + (index % 8) * 10.5}%`,
            left: `${-15 - index * 6}%`,
            width: `${120 + (index % 4) * 40}px`,
            background:
              "linear-gradient(90deg, rgba(148,216,255,0), rgba(148,216,255,0.95), rgba(223,158,255,0))",
            opacity: 0.5,
            filter: "blur(1px)",
          }}
          animate={{
            x: ["0%", "135%"],
            opacity: [0, 0.85, 0],
          }}
          transition={{
            duration: 3.2 + (index % 4) * 0.7,
            delay: index * 0.35,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <motion.div
        className="absolute h-[20rem] w-[28rem] rounded-full -translate-x-1/2 -translate-y-1/2 blur-[85px] mix-blend-screen"
        style={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
          background:
            "linear-gradient(90deg, rgba(157,218,255,0.25), rgba(204,152,255,0.26), rgba(157,218,255,0.25))",
        }}
        animate={{
          opacity: mouse.active ? 0.88 : 0.3,
          rotate: mouse.active ? [0, 6, -4, 0] : 0,
          scale: mouse.active ? 1.1 : 0.92,
        }}
        transition={{ duration: 0.28 }}
      />
    </div>
  );
}
