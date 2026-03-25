"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Twitter, Instagram, Linkedin, Youtube, Calendar, X, Check, Heart, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface SocialPost {
  id: string
  content: string
  platforms: string[]
  scheduledTime: string
  status: "scheduled" | "published"
  likes: string
  comments: string
  shares: string
}

interface AdminSocialSectionProps {
  onPostPublished?: (post: SocialPost) => void
  publishedPosts?: SocialPost[]
}

const platforms = [
  { id: "twitter", name: "Twitter", icon: Twitter, color: "from-sky-400 to-blue-500", handle: "@NazliTechSchool" },
  { id: "instagram", name: "Instagram", icon: Instagram, color: "from-pink-500 via-purple-500 to-orange-500", handle: "@nazlitechschool" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "from-blue-600 to-blue-700", handle: "Nazli Tech School" },
  { id: "youtube", name: "YouTube", icon: Youtube, color: "from-red-500 to-red-600", handle: "Nazli Tech School" },
]

export function AdminSocialSection({ onPostPublished, publishedPosts = [] }: AdminSocialSectionProps) {
  const [content, setContent] = useState("Just launched our new AI Coding Lab! Students are already building incredible projects. #EdTech #NazliTech")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["twitter", "instagram"])
  const [scheduledTime, setScheduledTime] = useState("2024-03-25T14:00")
  const [posts, setPosts] = useState<SocialPost[]>(publishedPosts)
  const [published, setPublished] = useState(false)
  const [charCount, setCharCount] = useState(content.length)

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((p) => p !== platformId) : [...prev, platformId]
    )
  }

  const handleContentChange = (text: string) => {
    setContent(text)
    setCharCount(text.length)
  }

  const handlePublish = () => {
    if (!content.trim() || selectedPlatforms.length === 0) {
      return
    }

    const newPost: SocialPost = {
      id: `post-${Date.now()}`,
      content,
      platforms: selectedPlatforms,
      scheduledTime,
      status: "published",
      likes: "0",
      comments: "0",
      shares: "0",
    }

    setPosts([newPost, ...posts])
    setPublished(true)
    onPostPublished?.(newPost)

    setTimeout(() => setPublished(false), 2000)
  }

  const removePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id))
  }

  const resetForm = () => {
    setContent("Just launched our new AI Coding Lab! Students are already building incredible projects. #EdTech #NazliTech")
    setSelectedPlatforms(["twitter", "instagram"])
    setCharCount(content.length)
  }

  return (
    <section className="container px-4 pb-12 md:px-6">
      <div className="mb-12">
        <Badge variant="outline" className="border-pink-500/30 bg-pink-500/10 text-pink-300 mb-4">
          Demo Feature: Social Publishing
        </Badge>
        <h3 className="text-3xl font-bold text-foreground mb-3">Compose & Publish Social Posts</h3>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Write once, publish everywhere. Schedule posts across Twitter, Instagram, LinkedIn, and YouTube simultaneously.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <Card className="p-6 border-border/40 bg-card/65 backdrop-blur-xl rounded-2xl space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-foreground">Post Content</label>
                <span className={`text-xs font-medium ${charCount > 280 ? "text-red-400" : "text-muted-foreground"}`}>
                  {charCount}/280
                </span>
              </div>
              <textarea
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="What's happening?!"
                className="w-full h-24 rounded-xl border border-border/40 bg-background/50 px-4 py-3 text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">Publish To</label>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => handlePlatformToggle(platform.id)}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                      selectedPlatforms.includes(platform.id)
                        ? "border-pink-500/50 bg-pink-500/10 text-pink-300"
                        : "border-border/40 bg-secondary/50 text-muted-foreground hover:border-border/60"
                    }`}
                  >
                    <platform.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Schedule Time</label>
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full rounded-xl border border-border/40 bg-background/50 px-4 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              />
            </div>

            <div className="rounded-xl border border-pink-500/20 bg-pink-500/10 p-4">
              <p className="text-xs font-semibold text-pink-300 mb-2">📢 Multi-Platform Strategy</p>
              <p className="text-xs text-muted-foreground">
                Customize content for each platform in production, or keep it consistent across all channels. Choose what works best for your audience.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                <Button
                  onClick={handlePublish}
                  disabled={!content.trim() || selectedPlatforms.length === 0}
                  className="w-full rounded-xl bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-50"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Publish Now
                </Button>
              </motion.div>
              <Button
                variant="outline"
                onClick={resetForm}
                className="rounded-xl border-border/40"
              >
                Reset
              </Button>
            </div>

            {published && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 flex items-center gap-2"
              >
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-300">Posted successfully!</span>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="rounded-2xl border border-border/40 bg-secondary/30 p-6 backdrop-blur-sm">
            <p className="text-sm font-semibold text-muted-foreground mb-4">Live Preview - Social Wall</p>

            <div className="space-y-3 max-h-150 overflow-y-auto">
              <AnimatePresence>
                {posts.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border/50 p-8 text-center">
                    <Youtube className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Publish a post to see it appear here</p>
                  </div>
                ) : (
                  posts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="group rounded-xl border border-border/40 bg-background/50 p-4 hover:border-border/60 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {post.platforms.map((platformId) => {
                            const platform = platforms.find((p) => p.id === platformId)
                            return platform ? (
                              <div
                                key={platformId}
                                className={`flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br ${platform.color}`}
                              >
                                <platform.icon className="h-3 w-3 text-white" />
                              </div>
                            ) : null
                          })}
                        </div>
                        <button
                          onClick={() => removePost(post.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded"
                        >
                          <X className="h-4 w-4 text-red-400" />
                        </button>
                      </div>

                      <p className="text-sm text-foreground mb-3">{post.content}</p>

                      <div className="flex flex-wrap items-center gap-4 mb-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" /> {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" /> {post.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Send className="h-3 w-3" /> {post.shares}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 pt-3 border-t border-border/40 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.scheduledTime).toLocaleString()}
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="rounded-2xl border border-pink-500/20 bg-pink-500/10 p-4">
            <p className="text-xs font-semibold text-pink-300 mb-2">💡 Demo Insight</p>
            <p className="text-xs text-muted-foreground">
              Posts appear on the "Social Wall" section of the landing page. Visitors see your latest social updates without leaving the site. Schedule posts to go live at optimal times.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
