import { motion } from "framer-motion";

interface NLogoProps {
  className?: string;
  interactive?: boolean;
  loadingFx?: boolean;
}

export default function NLogo({
  className,
  interactive = true,
  loadingFx = false,
}: NLogoProps) {
  const letters = ["A", "Z", "L", "I"];

  return (
    <motion.div
      className={`${className} flex items-center gap-2`}
      initial={interactive ? { scale: 0.8, opacity: 0 } : {}}
      animate={interactive ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="relative flex items-center cursor-pointer select-none">
        {/* Stylized 'N' */}
        <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]"
          >
            <defs>
              <linearGradient
                id="n-grad-main"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#d946ef" />
                <stop offset="50%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient
                id="n-grad-overlay"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {/* Left Vertical Pillar (Rounded) */}
            <rect
              x="15"
              y="15"
              width="18"
              height="70"
              rx="9"
              fill="url(#n-grad-main)"
            />
            {/* Right Vertical Pillar (Rounded) */}
            <rect
              x="67"
              y="15"
              width="18"
              height="70"
              rx="9"
              fill="url(#n-grad-main)"
            />
            {/* Diagonal Connecting Path (Rounded) */}
            <path
              d="M24 15 L76 85"
              stroke="url(#n-grad-main)"
              strokeWidth="18"
              strokeLinecap="round"
            />
            {/* Glossy overlay */}
            <rect
              x="15"
              y="15"
              width="18"
              height="35"
              rx="9"
              fill="url(#n-grad-overlay)"
            />
          </svg>
        </div>

        {/* Text Part */}
        <div className="ml-2 md:ml-3 flex flex-col justify-center">
          <div className="flex items-baseline gap-0">
            {letters.map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                className="text-2xl md:text-3xl font-serif font-light"
                style={{
                  background:
                    "linear-gradient(135deg, #7f4ea9 0%, #dbac34 50%, #7f4ea9 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                animate={
                  loadingFx
                    ? {
                        y: [0, -2.5, 0],
                        opacity: [0.8, 1, 0.8],
                      }
                    : {}
                }
                transition={
                  loadingFx
                    ? {
                        duration: 1.1,
                        delay: index * 0.08,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : {}
                }
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <div className="relative mt-1 overflow-hidden rounded-[2px]">
            <div className="flex">
              <div className="flex items-center bg-[#b8860b] px-2 py-0.5">
                <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase md:text-xs">
                  TECH
                </span>
              </div>
              <div className="flex items-center bg-white px-2 py-0.5">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#b8860b] uppercase md:text-xs">
                  SCHOOL
                </span>
              </div>
            </div>

            {loadingFx && (
              <motion.div
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                animate={{ x: ["0%", "460%"] }}
                transition={{
                  duration: 1.35,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
