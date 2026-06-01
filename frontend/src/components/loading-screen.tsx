import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import NLogo from "./NLogo";
import { useAudioContext } from "@/context/audio-context";
import introVideo from "@/assets/WEBSITE INTRO.mp4";

type LoadingScreenProps = {
  onComplete?: () => void;
  onVideoStateChange?: (playing: boolean) => void;
};

const FULLTEXT = `The map to abundance is logic. Acquire the skill. Claim the gold.`;

const SEGMENT_COUNT = 72;
const SEGMENT_HIGHLIGHT = 10;
const LOADER_EXIT_DELAY = 260;
const DRAG_MARGIN = 12;

export default function LoadingScreen({
  onComplete,
  onVideoStateChange,
}: LoadingScreenProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [userAction, setUserAction] = useState<"skip" | "continue" | null>(
    null,
  );
  const [introStarted, setIntroStarted] = useState(false);
  const [floatingVideo, setFloatingVideo] = useState(false);
  const [videoVisible, setVideoVisible] = useState(true);
  const [dragBounds, setDragBounds] = useState({
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  });
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { setIsMuted } = useAudioContext();

  const segments = useMemo(() => Array.from({ length: SEGMENT_COUNT }), []);
  const boundedProgress = Math.min(Math.round(progress), 100);
  const highlightIndex = Math.floor((boundedProgress / 100) * SEGMENT_COUNT);

  // Typewriter effect
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(FULLTEXT);
      return;
    }

    const typeText = async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));

      for (let i = 0; i <= FULLTEXT.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 30));
        setDisplayedText(FULLTEXT.substring(0, i));
      }
    };

    typeText();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 96) return prev;
        const step = 2 + Math.random() * 7;
        return Math.min(prev + step, 96);
      });
    }, 170);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const delay = prefersReducedMotion ? 1100 : 3800;
    const timer = window.setTimeout(() => {
      setLoadingComplete(true);
      setProgress(100);
    }, delay);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  // Keep the media timeline parked at frame zero until a trusted click can start sound.
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  }, []);

  const handleEnterWithSound = () => {
    const videoElement = videoRef.current;
    if (!videoElement || introStarted) return;

    setIntroStarted(true);
    setIsMuted(true);
    onVideoStateChange?.(true);

    videoElement.currentTime = 0;
    videoElement.muted = false;
    videoElement.play().catch((err) => {
      console.warn("Intro video playback failed:", err);
      setIntroStarted(false);
      setIsMuted(false);
      onVideoStateChange?.(false);
    });
  };

  const handleSkipVideo = () => {
    if (userAction) return;

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.pause();
    }

    setUserAction("skip");
    setIsMuted(false);
    setVideoVisible(false);
    onVideoStateChange?.(false);
    window.setTimeout(() => setLoading(false), LOADER_EXIT_DELAY);
  };

  const handleContinueVideo = () => {
    if (userAction) return;

    setUserAction("continue");
    setIsMuted(true);
    onVideoStateChange?.(true);
    setFloatingVideo(true);
    window.setTimeout(() => setLoading(false), LOADER_EXIT_DELAY);

    const videoElement = videoRef.current;
    if (videoElement?.ended) {
      setVideoVisible(false);
      setIsMuted(false);
      onVideoStateChange?.(false);
      return;
    }

    if (videoElement) {
      videoElement.muted = false;
      videoElement.play().catch((err) => {
        console.warn("Video play failed:", err);
      });
    }
  };

  // Closing the intro releases section audio, including any section that requested playback while muted.
  useEffect(() => {
    if (!videoVisible) {
      setIsMuted(false);
      onVideoStateChange?.(false);
    }
  }, [videoVisible, setIsMuted, onVideoStateChange]);

  // A completed intro either closes the floating player or advances past loading on its own.
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleVideoEnd = () => {
        setVideoVisible(false);
        setIsMuted(false);
        onVideoStateChange?.(false);
        if (!floatingVideo) {
          window.setTimeout(() => setLoading(false), LOADER_EXIT_DELAY);
        }
      };
      videoElement.addEventListener("ended", handleVideoEnd);
      return () => {
        videoElement.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [floatingVideo, onVideoStateChange, setIsMuted]);

  useEffect(() => {
    if (!loading) onComplete?.();
  }, [loading, onComplete]);

  // Recalculate the floating window limits so drag stays inside the visible page.
  useEffect(() => {
    if (!floatingVideo || !videoVisible) return;

    const updateDragBounds = () => {
      const frame = videoFrameRef.current;
      if (!frame) return;

      const rect = frame.getBoundingClientRect();
      setDragBounds({
        bottom: window.innerHeight - rect.bottom - DRAG_MARGIN,
        left: DRAG_MARGIN - rect.left,
        right: window.innerWidth - rect.right - DRAG_MARGIN,
        top: DRAG_MARGIN - rect.top,
      });
    };

    const frameId = window.requestAnimationFrame(updateDragBounds);
    window.addEventListener("resize", updateDragBounds);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateDragBounds);
    };
  }, [floatingVideo, videoVisible]);

  // Manual close mirrors the natural video end so the current landing section can speak next.
  const closeFloatingVideo = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.pause();
    }
    setVideoVisible(false);
  };

  return (
    <>
      {/* Preserve one video element so Continue can float the active intro without restarting. */}
      <AnimatePresence>
        {videoVisible && (
          <motion.div
            ref={videoFrameRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            drag={floatingVideo}
            dragConstraints={dragBounds}
            dragElastic={0.04}
            dragMomentum={false}
            whileDrag={{ scale: 1.02 }}
            className={`fixed rounded-lg overflow-hidden shadow-2xl ${
              floatingVideo
                ? "left-4 top-4 z-[1100] cursor-grab touch-none pointer-events-auto active:cursor-grabbing md:left-6 md:top-6"
                : `left-4 top-4 z-[1100] md:left-6 md:top-6 ${
                    introStarted || userAction
                      ? "pointer-events-none"
                      : "pointer-events-auto"
                  }`
            }`}
            style={{
              width: "min(360px, calc(100vw - 3rem))",
              height: "auto",
              boxShadow:
                "0 0 40px rgba(219, 172, 52, 0.6), inset 0 0 20px rgba(219, 172, 52, 0.2)",
            }}
          >
            <div className="relative h-full w-full">
              <video
                ref={videoRef}
                src={introVideo}
                className="w-full h-auto"
                muted={false}
                playsInline
                preload="metadata"
              />

              {!introStarted && !userAction && (
                <button
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={handleEnterWithSound}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/20"
                  aria-label="Play intro video with sound"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-nazli-golden/60 bg-black/70 text-nazli-golden shadow-lg shadow-nazli-golden/30 backdrop-blur-sm transition-transform hover:scale-105">
                    <Play size={30} fill="currentColor" className="ml-1" />
                  </span>
                </button>
              )}

              {floatingVideo && videoVisible && (
                <button
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={closeFloatingVideo}
                  className="absolute top-2 right-2 z-10 rounded bg-black/60 p-1 transition-colors hover:bg-black/80"
                  aria-label="Close video"
                >
                  <X size={20} className="text-white" />
                </button>
              )}
            </div>

            <span className="code-tag">Letting you in on a secret</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The loading shell stays up only until the user skips, continues, or the intro finishes. */}
      <AnimatePresence>
        {loading && !floatingVideo && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden"
            style={{
              background:
                "radial-gradient(circle at 50% 35%, rgba(71, 0, 71, 0.38) 0%, rgba(14, 9, 24, 0.94) 48%, rgba(6, 5, 10, 1) 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(219,172,52,0.18), transparent 30%), radial-gradient(circle at 80% 70%, rgba(71,0,71,0.42), transparent 36%)",
              }}
            />

            <div className="relative z-10 flex flex-col items-center gap-9">
              <div className="relative flex h-[18rem] w-[18rem] items-center justify-center md:h-[21rem] md:w-[21rem]">
                <motion.div
                  className="absolute inset-0"
                  animate={prefersReducedMotion ? {} : { rotate: 360 }}
                  transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {segments.map((_, index) => {
                    const angle = (360 / SEGMENT_COUNT) * index;
                    const distance = 144;
                    const delta =
                      (index - highlightIndex + SEGMENT_COUNT) % SEGMENT_COUNT;
                    const isHot = delta < SEGMENT_HIGHLIGHT;

                    return (
                      <span
                        key={`segment-${index}`}
                        className="absolute left-1/2 top-1/2 h-[11px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${distance}px)`,
                          backgroundColor: isHot
                            ? "rgba(219, 172, 52, 0.95)"
                            : "rgba(160, 133, 182, 0.34)",
                          boxShadow: isHot
                            ? "0 0 12px rgba(219,172,52,0.78)"
                            : "none",
                        }}
                      />
                    );
                  })}
                </motion.div>

                <motion.svg
                  viewBox="0 0 320 320"
                  className="absolute h-[16.4rem] w-[16.4rem] md:h-[18.8rem] md:w-[18.8rem]"
                  animate={prefersReducedMotion ? {} : { rotate: -360 }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <defs>
                    <linearGradient
                      id="nazli-loader-ring"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#470047" />
                      <stop offset="55%" stopColor="#dbac34" />
                      <stop offset="100%" stopColor="#470047" />
                    </linearGradient>
                  </defs>

                  <circle
                    cx="160"
                    cy="160"
                    r="118"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="2.2"
                  />
                  <circle
                    cx="160"
                    cy="160"
                    r="118"
                    fill="none"
                    stroke="url(#nazli-loader-ring)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="595"
                    strokeDashoffset={595 - (595 * boundedProgress) / 100}
                    style={{
                      filter: "drop-shadow(0 0 12px rgba(219,172,52,0.36))",
                    }}
                  />
                  <circle
                    cx="160"
                    cy="160"
                    r="104"
                    fill="none"
                    stroke="rgba(71,0,71,0.95)"
                    strokeWidth="2.8"
                    style={{
                      filter: "drop-shadow(0 0 10px rgba(71,0,71,0.55))",
                    }}
                  />
                </motion.svg>

                <div
                  className="absolute flex h-[10.8rem] w-[10.8rem] items-center justify-center rounded-full border border-nazli-golden/30 bg-black/55 backdrop-blur-md md:h-[12.2rem] md:w-[12.2rem]"
                  style={{
                    boxShadow:
                      "inset 0 0 28px rgba(71,0,71,0.32), 0 0 30px rgba(219,172,52,0.18)",
                  }}
                >
                  <NLogo
                    className="h-12 w-auto md:h-20 lg:h-36"
                    interactive={false}
                    loadingFx
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 text-center max-w-2xl px-4">
                <motion.p className="text-xs md:text-sm leading-relaxed tracking-wide text-nazli-golden/75 font-light whitespace-pre-wrap">
                  {displayedText}
                  {displayedText.length > 0 &&
                    displayedText.length < FULLTEXT.length && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                        }}
                        className="ml-1"
                      >
                        |
                      </motion.span>
                    )}
                </motion.p>
                <p className="text-3xl font-semibold text-nazli-gray">
                  {boundedProgress}%
                </p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-nazli-purple/75">
                  Initializing Nazli Tech
                </p>
              </div>

              {loadingComplete && introStarted && !userAction && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex gap-4 mt-6"
                >
                  <button
                    onClick={handleSkipVideo}
                    className="px-6 py-2 rounded-lg bg-nazli-purple/80 hover:bg-nazli-purple text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-nazli-purple/40"
                  >
                    Skip Video
                  </button>
                  <button
                    onClick={handleContinueVideo}
                    className="px-6 py-2 rounded-lg bg-nazli-golden/80 hover:bg-nazli-golden text-black font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-nazli-golden/40"
                  >
                    Continue
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
