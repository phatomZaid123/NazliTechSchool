import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Play,
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Film,
  Star,
  Rocket,
} from "lucide-react";

// Types
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

interface Mouse {
  x: number | null;
  y: number | null;
  radius: number;
}

type VideoFilter = "all" | "testimony" | "project" | "event";

type VideoItem = {
  id: string;
  title: string;
  author: string;
  views: string;
  likes: string;
  comments: string;
  thumbnail: string;
  type: "testimony" | "project" | "event";
  glowClass: string;
  badgeBg: string;
  badgeText: string;
  url: string;
};

// Static Data with YouTube URLs
const staticVideoData: VideoItem[] = [
  {
    id: "1",
    title: "Cognoscentia Curriculum Teaser",
    author: "Nazli Tech",
    views: "12.5K",
    likes: "1.2K",
    comments: "89",
    thumbnail: "from-purple-600/60 to-blue-500/40",
    type: "project",
    glowClass: "shadow-purple-500/20",
    badgeBg: "bg-purple-500/20 border-purple-500/40",
    badgeText: "text-purple-400",
    url: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY", // Real YouTube tech video link
  },
  {
    id: "2",
    title: "Chemistry Simulation Preview",
    author: "Nazli Lab",
    views: "8.3K",
    likes: "945",
    comments: "67",
    thumbnail: "from-blue-500/45 to-purple-600/50",
    type: "project",
    glowClass: "shadow-blue-500/20",
    badgeBg: "bg-blue-500/20 border-blue-500/40",
    badgeText: "text-blue-400",
    url: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
  },
  {
    id: "3",
    title: "Student Testimonial Reel",
    author: "Nazli Tech",
    views: "25.1K",
    likes: "3.4K",
    comments: "234",
    thumbnail: "from-white/20 to-purple-500/55",
    type: "testimony",
    glowClass: "shadow-purple-500/20",
    badgeBg: "bg-purple-500/20 border-purple-500/40",
    badgeText: "text-purple-400",
    url: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
  },
  {
    id: "4",
    title: "Python Lesson Trailer",
    author: "Nazli Tutors",
    views: "18.7K",
    likes: "2.1K",
    comments: "156",
    thumbnail: "from-purple-600/50 to-blue-500/35",
    type: "project",
    glowClass: "shadow-blue-500/20",
    badgeBg: "bg-blue-500/20 border-blue-500/40",
    badgeText: "text-blue-400",
    url: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
  },
  {
    id: "5",
    title: "Group Learning Highlights",
    author: "Nazli Community",
    views: "6.2K",
    likes: "578",
    comments: "42",
    thumbnail: "from-blue-500/40 to-white/20",
    type: "event",
    glowClass: "shadow-purple-500/20",
    badgeBg: "bg-purple-500/20 border-purple-500/40",
    badgeText: "text-purple-400",
    url: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
  },
];

const getYouTubeVideoId = (videoUrl: string): string | null => {
  try {
    const parsedUrl = new URL(videoUrl);
    const host = parsedUrl.hostname.replace("www.", "");

    if (host === "youtu.be") {
      return parsedUrl.pathname.split("/").filter(Boolean)[0] || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v");
      }

      const pathParts = parsedUrl.pathname.split("/").filter(Boolean);
      if (pathParts[0] === "embed" || pathParts[0] === "shorts") {
        return pathParts[1] || null;
      }
    }
  } catch {
    return null;
  }

  return null;
};

const getYouTubeThumbnail = (videoUrl: string): string | null => {
  const videoId = getYouTubeVideoId(videoUrl);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
};

export default function VideoFeedSection() {
  const [filter, setFilter] = useState<VideoFilter>("all");
  const [isMuted, setIsMuted] = useState(true);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isInView, setIsInView] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<Mouse>({ x: null, y: null, radius: 150 });
  const shouldReduceMotion = useReducedMotion();
  const navWithHardwareHints = navigator as Navigator & {
    deviceMemory?: number;
  };
  const lowPowerDevice =
    (typeof navWithHardwareHints.deviceMemory === "number" &&
      navWithHardwareHints.deviceMemory <= 4) ||
    (typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 4);
  const enableParticleEffects =
    !shouldReduceMotion && !lowPowerDevice && isInView && isPageVisible;

  // Filtered Data
  const filteredVideos =
    filter === "all"
      ? staticVideoData
      : staticVideoData.filter((v) => v.type === filter);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { root: null, threshold: 0.01, rootMargin: "200px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", onVisibilityChange, {
      passive: true,
    });

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // Background Particles Engine (Optimized)
  useEffect(() => {
    if (!enableParticleEffects) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let lastFrameTime = 0;
    const frameInterval = 1000 / 24;

    const handleResize = () => {
      canvas.width = Math.min(window.innerWidth, 1920);
      canvas.height = Math.min(window.innerHeight, 1080);

      const numberOfParticles = Math.max(
        12,
        Math.floor((canvas.width * canvas.height) / 42000),
      );
      particlesRef.current = [];

      for (let i = 0; i < numberOfParticles; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1 + 0.3,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: Math.random() > 0.5 ? "#dfb7ff" : "#e9c349",
        });
      }
    };

    handleResize();

    const animateParticles = (currentTime: number) => {
      if (currentTime - lastFrameTime < frameInterval) {
        animationId = requestAnimationFrame(animateParticles);
        return;
      }
      lastFrameTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > canvas.width) p.x = 0;
        else if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        else if (p.y < 0) p.y = canvas.height;

        if (mouseRef.current.x && mouseRef.current.y) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const distSq = dx * dx + dy * dy;
          const radiusSq = mouseRef.current.radius * mouseRef.current.radius;
          if (distSq < radiusSq) {
            p.x -= dx * 0.02;
            p.y -= dy * 0.02;
          }
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < Math.min(i + 8, particles.length); j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = 8100;

          if (distSq < maxDistSq) {
            const distance = Math.sqrt(distSq);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = Math.max(0, 1 - distance / 90);
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(animateParticles);
    };

    window.addEventListener("resize", handleResize);
    animationId = requestAnimationFrame(animateParticles);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [enableParticleEffects]);

  // Throttle mouse movements for particles
  useEffect(() => {
    if (!enableParticleEffects) return;

    let lastMouseUpdate = 0;
    const mouseThrottle = 100;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseUpdate > mouseThrottle) {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
        lastMouseUpdate = now;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [enableParticleEffects]);

  // Smooth Auto-scroll carousel
  useEffect(() => {
    if (
      !scrollRef.current ||
      !isAutoScrolling ||
      shouldReduceMotion ||
      !isInView ||
      !isPageVisible
    )
      return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const maxScroll =
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

        // If at the end, smoothly scroll back to the start
        if (scrollRef.current.scrollLeft >= maxScroll - 5) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Smoothly slide by the width of one card (~260px)
          scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoScrolling, shouldReduceMotion, isInView, isPageVisible]);

  // Smooth manual scroll
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden text-white"
    >
      <div className="container max-w-7xl mx-auto relative z-10 px-6">
        {/* Header and Filter Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-purple-500 flex items-center gap-2">
              <Film size={16} /> Student Showcase
            </h4>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              <span className="text-white">The</span>{" "}
              <span className="text-purple-500">Vision</span>{" "}
              <span className="text-white">
                in
              </span>
              <br />
              <span className="text-nazli-golden">Motion</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {["all", "testimony", "project", "event"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as VideoFilter)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  filter === f
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                    : "bg-white/5 text-white/50 hover:bg-white/10 border border-white/5"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        {/* Video Carousel Container */}
        <div className="relative group" id="carousel-wrapper">
          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("left")}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/80 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-purple-600/20 hover:border-purple-500/40 backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("right")}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/80 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-purple-600/20 hover:border-purple-500/40 backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Scrollable Track */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-12 pt-4 px-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
          >
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="shrink-0 snap-center"
                  onMouseEnter={() => setHoveredVideo(video.id)}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  <VideoCard
                    video={video}
                    isHovered={hoveredVideo === video.id}
                    isMuted={isMuted}
                    onToggleMute={() => setIsMuted(!isMuted)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty State when filter yields 0 results */}
            {filteredVideos.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full text-center py-20 border-2 border-dashed border-white/5 rounded-[2rem]"
              >
                <p className="text-white/30 font-medium uppercase tracking-widest">
                  No videos found in this category.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Child Component
interface VideoCardProps {
  video: VideoItem;
  isHovered: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
}

const VideoCard = React.memo(function VideoCard({
  video,
  isHovered,
  isMuted,
  onToggleMute,
}: VideoCardProps) {
  const thumbnailUrl = getYouTubeThumbnail(video.url);

  return (
    <motion.div
      // Reduced size: using w-60/w-64 instead of w-72/w-80
      className={`relative w-60 md:w-64 aspect-[9/16] rounded-3xl overflow-hidden group/card bg-black/40 border border-white/10 transition-all duration-700 shadow-xl ${
        isHovered ? video.glowClass : ""
      }`}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* YouTube thumbnail background */}
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={`${video.title} thumbnail`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${video.thumbnail} opacity-70`}
        />
      )}

      {/* Color tint + dark overlay for legibility */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${video.thumbnail} opacity-40`}
      />
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]"></div>

      {/* Shimmer effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.5 }}
        />
      )}

      {/* Main content container */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 p-6 flex flex-col justify-between">
        {/* Top section: Badge and mute button */}
        <div className="flex justify-between items-start">
          <motion.span
            className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase border flex items-center gap-1 bg-black/40 backdrop-blur-md ${video.badgeText}`}
            animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {video.type === "testimony" && <Star size={10} />}
            {video.type === "project" && <Rocket size={10} />}
            {video.type === "event" && <Film size={10} />}
            {video.type}
          </motion.span>

          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleMute();
            }}
            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-white" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-white" />
            )}
          </motion.button>
        </div>

        {/* Center: Play button wrapping the redirect */}
        <div className="flex flex-col items-center">
          <motion.a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover/card:bg-purple-600/50 group-hover/card:border-purple-400 transition-all duration-500 cursor-pointer z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </motion.a>
        </div>

        {/* Bottom section: Title, author, and engagement */}
        <div>
          <h3 className="font-bold text-base mb-1 leading-tight text-white line-clamp-2">
            {video.title}
          </h3>
          <p className="text-[9px] uppercase tracking-[0.2em] text-purple-400/80 font-bold mb-3">
            // {video.author}
          </p>

          {/* Engagement stats */}
          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-bold text-gray-400">
            <div className="flex gap-3">
              <span className="flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer">
                <Heart className="w-3 h-3" />
                {video.likes}
              </span>
              <span className="flex items-center gap-1 hover:text-purple-400 transition-colors cursor-pointer">
                <MessageCircle className="w-3 h-3" />
                {video.comments}
              </span>
            </div>
            <span className="hover:text-white transition-colors cursor-pointer">
              <Share2 className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
});
