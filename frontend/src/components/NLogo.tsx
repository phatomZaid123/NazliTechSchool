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
  const letters = ["N", "A", "Z", "L", "I"];

  return (
    <motion.div
      className={`${className} flex flex-col items-center justify-center gap-2`}
      initial={interactive ? { scale: 0.8, opacity: 0 } : {}}
      animate={interactive ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Logo text - NAZLI */}
      <div className="flex items-center cursor-pointer select-none">
        {/* Letters spelling NAZLI */}
        <div className="flex items-baseline gap-0">
          {letters.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              className="text-3xl md:text-5xl font-bold leading-none"
              style={{
                background:
                  index === 0
                    ? "linear-gradient(135deg, #d946ef 0%, #9333ea 50%, #4f46e5 100%)"
                    : index === 1
                      ? "linear-gradient(135deg, #7f4ea9 0%, #dbac34 50%, #7f4ea9 100%)"
                      : index === 2
                        ? "linear-gradient(135deg, #9333ea 0%, #dbac34 100%)"
                        : index === 3
                          ? "linear-gradient(135deg, #4f46e5 0%, #d946ef 100%)"
                          : "linear-gradient(135deg, #dbac34 0%, #9333ea 100%)",
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
      </div>

      {/* Text Part - TECH SCHOOL */}
      <div className="flex flex-col items-center justify-center">
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
    </motion.div>
  );
}
