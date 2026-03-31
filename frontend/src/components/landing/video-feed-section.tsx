"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Play, Heart, MessageCircle, Share2, Volume2, VolumeX, ChevronLeft, ChevronRight, Eye, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTypewriterOnce } from "@/hooks/use-typewriter"
import { API_BASE } from "@/lib/api"

const fallbackVideoData = [
  {
    id: 1,
    title: "Building My First AI Model",
    author: "Sarah Chen",
    views: "12.5K",
    likes: "1.2K",
    comments: "89",
    thumbnail: "from-primary/40 to-accent/40",
    type: "Student Project",
  },
  {
    id: 2,
    title: "Physics Lab: Quantum Entanglement",
    author: "James Okafor",
    views: "8.3K",
    likes: "945",
    comments: "67",
    thumbnail: "from-accent/40 to-glow-cyan/40",
    type: "Lab Session",
  },
  {
    id: 3,
    title: "Hackathon 2024 Highlights",
    author: "Nazli Tech",
    views: "25.1K",
    likes: "3.4K",
    comments: "234",
    thumbnail: "from-glow-cyan/40 to-glow-blue/40",
    type: "Event",
  },
  {
    id: 4,
    title: "My Journey from Beginner to Pro",
    author: "Amara Williams",
    views: "18.7K",
    likes: "2.1K",
    comments: "156",
    thumbnail: "from-glow-blue/40 to-primary/40",
    type: "Testimonial",
  },
  {
    id: 5,
    title: "Live Coding: React Components",
    author: "David Park",
    views: "6.2K",
    likes: "578",
    comments: "42",
    thumbnail: "from-primary/40 to-glow-blue/40",
    type: "Tutorial",
  },
]

type VideoItem = {
  id: number
  title: string
  author: string
  views: string
  likes: string
  comments: string
  thumbnail: string
  type: string
}

export function VideoFeedSection() {
  const [videos, setVideos] = useState<VideoItem[]>(fallbackVideoData)
  const [activeVideo, setActiveVideo] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  useEffect(() => {
    let isMounted = true
    fetch(`${API_BASE}/videos`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: VideoItem[]) => {
        if (isMounted && Array.isArray(data) && data.length) {
          setVideos(data)
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (activeVideo >= videos.length) {
      setActiveVideo(0)
    }
  }, [activeVideo, videos.length])

  const { displayText: headingText } = useTypewriterOnce(
    "Are Building",
    60,
    isInView ? 300 : 99999
  )

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6"
            whileHover={{ scale: 1.05, borderColor: "rgba(139, 92, 246, 0.5)" }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Play className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm text-primary font-medium">Student Achievements</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            <span className="text-foreground">See What Students </span>
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              {headingText}
              {headingText !== "Are Building" && (
                <motion.span
                  className="inline-block w-0.75 h-[0.8em] bg-primary ml-1 align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Admin-curated wins, showcases, and project highlights.
          </p>
        </motion.div>

        {/* Video carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation arrows */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="icon"
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm border-border/50 hidden md:flex hover:border-primary/50 hover:bg-primary/10"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm border-border/50 hidden md:flex hover:border-primary/50 hover:bg-primary/10"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="shrink-0 snap-center"
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                <VideoCard
                  video={video}
                  isActive={activeVideo === index}
                  isHovered={hoveredVideo === video.id}
                  isMuted={isMuted}
                  onToggleMute={() => setIsMuted(!isMuted)}
                  onClick={() => setActiveVideo(index)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="bg-card/60 backdrop-blur-xl border border-border/30 rounded-2xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Eye, value: "125K+", label: "Total Views", color: "text-primary" },
                { icon: Heart, value: "15K+", label: "Total Likes", color: "text-red-400" },
                { icon: MessageCircle, value: "3.2K+", label: "Comments", color: "text-accent" },
                { icon: TrendingUp, value: "+24%", label: "Growth", color: "text-green-400" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface VideoCardProps {
  video: VideoItem
  isActive: boolean
  isHovered: boolean
  isMuted: boolean
  onToggleMute: () => void
  onClick: () => void
}

function VideoCard({ video, isActive, isHovered, isMuted, onToggleMute, onClick }: VideoCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`relative w-[260px] aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${
        isActive ? 'ring-2 ring-primary' : ''
      }`}
      style={{
        boxShadow: isHovered || isActive 
          ? '0 0 40px rgba(139, 92, 246, 0.3)' 
          : '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-linear-to-br ${video.thumbnail}`} />
      
      {/* Shimmer effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
        />
      )}
      
      {/* Animated content preview */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={isActive || isHovered ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center border border-foreground/20"
        >
          <Play className="w-8 h-8 text-foreground fill-foreground" />
        </motion.div>
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      
      {/* Type badge with pulse */}
      <div className="absolute top-4 left-4">
        <motion.span 
          className="px-3 py-1 rounded-full text-xs font-medium bg-foreground/20 backdrop-blur-sm text-foreground"
          animate={isActive ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {video.type}
        </motion.span>
      </div>
      
      {/* Mute button */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          onToggleMute()
        }}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center hover:bg-foreground/30 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-foreground" />
        ) : (
          <Volume2 className="w-4 h-4 text-foreground" />
        )}
      </motion.button>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{video.title}</h3>
        <p className="text-sm text-foreground/70 mb-3">@{video.author}</p>
        
        {/* Engagement with hover effects */}
        <div className="flex items-center gap-4 text-xs text-foreground/70">
          <motion.span 
            className="flex items-center gap-1"
            whileHover={{ scale: 1.1, color: "#ef4444" }}
          >
            <Heart className="w-3.5 h-3.5" />
            {video.likes}
          </motion.span>
          <motion.span 
            className="flex items-center gap-1"
            whileHover={{ scale: 1.1, color: "#06b6d4" }}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            {video.comments}
          </motion.span>
          <motion.span 
            className="flex items-center gap-1"
            whileHover={{ scale: 1.1, color: "#8b5cf6" }}
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </motion.span>
        </div>
      </div>
      
      {/* Progress bar (when active) */}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-foreground/20">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
      )}
    </motion.div>
  )
}
