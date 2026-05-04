import { motion } from "framer-motion";

interface NLogoProps {
  className?: string;
  interactive?: boolean;
}

export default function NLogo({ className, interactive = true }: NLogoProps) {
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
        <div className="flex flex-col justify-center ml-1">
          <div className="flex items-baseline">
            <span className="text-3xl md:text-5xl font-serif font-light tracking-widest text-[#9333ea] leading-none">
              AZLI
            </span>
          </div>
          <div className="flex mt-1">
            <div className="bg-[#b8860b] px-2 py-0.5 flex items-center">
              <span className="text-[10px] md:text-xs font-bold text-white tracking-[0.2em] uppercase">
                TECH
              </span>
            </div>
            <div className="bg-white px-2 py-0.5 flex items-center">
              <span className="text-[10px] md:text-xs font-bold text-[#b8860b] tracking-[0.2em] uppercase">
                SCHOOL
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
