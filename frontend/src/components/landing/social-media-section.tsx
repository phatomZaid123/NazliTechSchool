"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ExternalLink,
  Heart,
  MessageCircle,
  Repeat2,
  Play,
  TrendingUp,
  Users,
  Globe,
} from "lucide-react";

import { API_BASE } from "@/lib/api";

const fallbackPlatforms = [
  {
    id: "twitter",
    name: "Twitter",
    icon: Twitter,
    handle: "@NazliTechSchool",
    followers: "45K",
    color: "from-sky-400 to-blue-500",
    hoverGlow: "rgba(56, 189, 248, 0.3)",
    posts: [
      {
        content:
          "Just launched our new AI Coding Lab! Students are already building incredible projects. Join the future of education. #EdTech #AILearning",
        likes: "2.4K",
        comments: "189",
        shares: "456",
        time: "2h ago",
        hasMedia: false,
      },
      {
        content:
          "Congratulations to our Physics students who just won the National Science Olympiad! Proud moment for Nazli Tech School!",
        likes: "5.1K",
        comments: "312",
        shares: "789",
        time: "1d ago",
        hasMedia: true,
      },
    ],
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    handle: "@nazlitechschool",
    followers: "62K",
    color: "from-pink-500 via-purple-500 to-orange-500",
    hoverGlow: "rgba(236, 72, 153, 0.3)",
    posts: [
      {
        content:
          "Behind the scenes of our Hackathon 2024! Amazing innovations from our talented students! #NazliTech #StudentLife",
        likes: "5.8K",
        comments: "324",
        shares: "890",
        time: "5h ago",
        hasMedia: true,
      },
      {
        content:
          "New campus tour video is up! Come see where the magic happens. Link in bio!",
        likes: "3.2K",
        comments: "156",
        shares: "423",
        time: "2d ago",
        hasMedia: true,
      },
    ],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    handle: "Nazli Tech School",
    followers: "28K",
    color: "from-blue-600 to-blue-700",
    hoverGlow: "rgba(37, 99, 235, 0.3)",
    posts: [
      {
        content:
          "We're proud to announce partnerships with 10 new Fortune 500 companies for our internship program. #EdTech #FutureOfWork #CareerSuccess",
        likes: "1.2K",
        comments: "89",
        shares: "234",
        time: "1d ago",
        hasMedia: false,
      },
      {
        content:
          "98% of our graduates land jobs within 3 months of completion. Here's how we prepare students for success.",
        likes: "2.8K",
        comments: "156",
        shares: "567",
        time: "3d ago",
        hasMedia: true,
      },
    ],
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    handle: "Nazli Tech School",
    followers: "125K",
    color: "from-red-500 to-red-600",
    hoverGlow: "rgba(239, 68, 68, 0.3)",
    posts: [
      {
        content:
          "NEW VIDEO: Building a Neural Network from Scratch - Complete Tutorial",
        likes: "12K",
        comments: "567",
        shares: "1.2K",
        time: "3d ago",
        hasMedia: true,
        isVideo: true,
        views: "156K",
      },
      {
        content: "Student Showcase: AI Projects That Will Blow Your Mind",
        likes: "8.5K",
        comments: "423",
        shares: "892",
        time: "1w ago",
        hasMedia: true,
        isVideo: true,
        views: "89K",
      },
    ],
  },
];

type SocialPost = {
  content: string;
  likes: string;
  comments: string;
  shares: string;
  time: string;
  hasMedia: boolean;
  isVideo?: boolean;
  views?: string;
};

type SocialPlatform = {
  id: string;
  name: string;
  icon: typeof Twitter;
  handle: string;
  followers: string;
  color: string;
  hoverGlow: string;
  posts: SocialPost[];
};

const iconMap: Record<string, typeof Twitter> = {
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

const normalizePlatforms = (
  platforms: Omit<SocialPlatform, "icon">[],
): SocialPlatform[] =>
  platforms.map((platform) => ({
    ...platform,
    icon: iconMap[platform.id] || Globe,
  }));

export function SocialMediaSection() {
  const [platforms, setPlatforms] =
    useState<SocialPlatform[]>(fallbackPlatforms);
  const [activePlatform, setActivePlatform] = useState("twitter");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch(API_BASE + "/social")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length) {
          setPlatforms(normalizePlatforms(data));
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!platforms.find((platform) => platform.id === activePlatform)) {
      setActivePlatform(platforms[0]?.id || "twitter");
    }
  }, [activePlatform, platforms]);

  const currentPlatform = platforms.find((p) => p.id === activePlatform)!;

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-pink-500/30 mb-6"
          >
            <Globe className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-pink-300">
              Stay Connected
            </span>
          </motion.div>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Posts approved by the admin team appear here as the public social
            wall.
          </p>
        </motion.div>

        {/* Platform Tabs */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {platforms.map((platform) => (
            <motion.button
              key={platform.id}
              onClick={() => setActivePlatform(platform.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all duration-300 ${
                activePlatform === platform.id
                  ? `bg-gradient-to-r ${platform.color} text-white shadow-lg`
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              <platform.icon className="w-5 h-5" />
              <span className="hidden sm:inline">{platform.name}</span>
              <span className="text-xs opacity-70">{platform.followers}</span>
            </motion.button>
          ))}
        </div>

        {/* Platform Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlatform}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-5xl mx-auto"
          >
            {/* Platform Header Card */}
            <div
              className={`relative rounded-3xl p-6 md:p-8 mb-8 bg-gradient-to-br ${currentPlatform.color} overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <currentPlatform.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {currentPlatform.handle}
                    </h3>
                    <p className="text-white/80">
                      {currentPlatform.followers} followers
                    </p>
                  </div>
                </div>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold hover:bg-white/90 transition-colors"
                >
                  Follow
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {currentPlatform.posts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() =>
                    setHoveredCard(`${activePlatform}-${index}`)
                  }
                  onMouseLeave={() => setHoveredCard(null)}
                  className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-6 hover:border-primary/30 transition-all duration-300"
                  style={{
                    boxShadow:
                      hoveredCard === `${activePlatform}-${index}`
                        ? `0 0 40px ${currentPlatform.hoverGlow}`
                        : "none",
                  }}
                >
                  {/* Post Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentPlatform.color} flex items-center justify-center`}
                    >
                      <currentPlatform.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {currentPlatform.handle}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {post.time}
                      </p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.content}
                  </p>

                  {/* Media Preview */}
                  {post.hasMedia && (
                    <div className="relative mb-4 rounded-2xl overflow-hidden bg-secondary/50 aspect-video">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {"isVideo" in post && post.isVideo ? (
                          <div className="flex flex-col items-center gap-2">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                            >
                              <Play className="w-6 h-6 text-white fill-white ml-1" />
                            </motion.div>
                            {"views" in post && (
                              <span className="text-sm text-white/80">
                                {post.views} views
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-secondary to-muted animate-pulse" />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Engagement */}
                  <div className="flex items-center gap-6 pt-4 border-t border-border/30">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-pink-400 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-cyan-400 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
                    >
                      <Repeat2 className="w-4 h-4" />
                      {post.shares}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              label: "Total Followers",
              value: "260K+",
              icon: Users,
              color: "text-purple-400",
            },
            {
              label: "Daily Engagement",
              value: "15K+",
              icon: TrendingUp,
              color: "text-cyan-400",
            },
            {
              label: "Content Pieces",
              value: "2.5K",
              icon: MessageCircle,
              color: "text-pink-400",
            },
            {
              label: "Countries Reached",
              value: "50+",
              icon: Globe,
              color: "text-emerald-400",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center p-6 rounded-2xl bg-card/50 border border-border/30 hover:border-primary/30 transition-all"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
