"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Settings, 
  LayoutDashboard, 
  Video, 
  Users, 
  BarChart3, 
  FileText,
  Upload,
  Plus,
  Search,
  Bell,
  ChevronRight,
  TrendingUp,
  Eye,
  Heart,
  MessageSquare,
  Edit2,
  Trash2,
  Check,
  Lock,
  Globe,
  Calendar,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTypewriterOnce } from "@/hooks/use-typewriter"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Video, label: "Videos", active: false },
  { icon: Users, label: "Students", active: false },
  { icon: FileText, label: "Content", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Globe, label: "Regions", active: false },
  { icon: Settings, label: "Settings", active: false },
]

const recentVideos = [
  { id: 1, title: "AI Fundamentals: Getting Started", views: "2.4K", status: "published", thumbnail: "from-purple-500/60 to-cyan-500/60", date: "Mar 20" },
  { id: 2, title: "Physics Lab: Momentum Demo", views: "1.8K", status: "published", thumbnail: "from-cyan-500/60 to-blue-500/60", date: "Mar 18" },
  { id: 3, title: "Student Showcase 2024", views: "890", status: "draft", thumbnail: "from-pink-500/60 to-orange-500/60", date: "Mar 15" },
  { id: 4, title: "Culinary Arts: Basics", views: "1.2K", status: "scheduled", thumbnail: "from-amber-500/60 to-red-500/60", date: "Mar 25" },
]

const stats = [
  { label: "Total Views", value: "125.4K", change: "+12.5%", icon: Eye, color: "from-purple-500 to-pink-500" },
  { label: "Engagement", value: "89%", change: "+5.2%", icon: Heart, color: "from-pink-500 to-rose-500" },
  { label: "Comments", value: "3.2K", change: "+8.7%", icon: MessageSquare, color: "from-cyan-500 to-blue-500" },
  { label: "Growth", value: "+24%", change: "+3.1%", icon: TrendingUp, color: "from-emerald-500 to-teal-500" },
]

export function AdminDashboardPreview() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null)
  
  const { displayText: titleText, ref: titleRef, hasStarted: titleStarted } = useTypewriterOnce(
    "Content Management",
    40
  )

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Distinct visual separator - Admin Zone */}
      <div className="absolute inset-0">
        {/* Top border decoration */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/10 via-background to-background" />
        
        {/* Grid overlay for admin feel */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245, 158, 11, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245, 158, 11, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        {/* Admin Zone Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
            <Lock className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">Admin Zone</span>
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-foreground">Powerful </span>
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {titleStarted ? titleText : "Content Management"}
              {titleStarted && <span className="animate-pulse">|</span>}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Upload 9:16 videos, manage courses, track analytics, and engage with students globally
          </p>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded-lg px-8 py-6 text-lg shadow-sm hover:shadow-md"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {isExpanded ? "Collapse Preview" : "Explore Dashboard"}
              <ChevronRight className={`w-5 h-5 ml-2 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
            </Button>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-7xl mx-auto"
            >
              {/* Browser Chrome */}
              <div className="bg-secondary/80 backdrop-blur-sm rounded-t-2xl border border-border/50 border-b-0 p-3 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1.5 rounded-lg bg-background/50 text-xs text-muted-foreground flex items-center gap-2">
                    <Lock className="w-3 h-3" />
                    admin.nazlitechschool.org/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="bg-card/95 backdrop-blur-xl border border-border/50 border-t-0 rounded-b-3xl overflow-hidden shadow-2xl shadow-amber-500/10">
                <div className="flex">
                  {/* Sidebar */}
                  <div className="w-64 border-r border-border/30 p-4 hidden lg:block bg-secondary/20">
                    <div className="flex items-center gap-3 mb-8 px-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">NT</span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">Nazli Tech</div>
                        <div className="text-xs text-amber-400">Admin Panel</div>
                      </div>
                    </div>

                    <nav className="space-y-1">
                      {sidebarItems.map((item) => (
                        <motion.button
                          key={item.label}
                          onClick={() => setActiveItem(item.label)}
                          whileHover={{ x: 4 }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                            activeItem === item.label
                              ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30" 
                              : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </motion.button>
                      ))}
                    </nav>

                    {/* Quick Stats Mini */}
                    <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                      <p className="text-xs text-amber-400 mb-2 font-medium">Today{"'"}s Overview</p>
                      <p className="text-2xl font-bold text-foreground">2,847</p>
                      <p className="text-xs text-muted-foreground">Active Students</p>
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <h3 className="text-xl font-semibold text-foreground">Dashboard Overview</h3>
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          Live
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="relative hidden md:block">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Search..."
                            className="pl-9 w-48 bg-secondary/30 border-border/30 rounded-lg"
                          />
                        </div>
                        <Button variant="outline" size="icon" className="rounded-lg border-border/30 relative">
                          <Bell className="w-4 h-4" />
                          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
                        </Button>
                        <Button className="rounded-lg">
                          <Plus className="w-4 h-4 mr-2" />
                          New Video
                        </Button>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {stats.map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -4, scale: 1.02 }}
                          className="bg-secondary/30 rounded-2xl p-4 border border-border/20 hover:border-amber-500/30 transition-all cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                              <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">
                              {stat.change}
                            </span>
                          </div>
                          <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                          <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Content area */}
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Recent Videos */}
                      <div className="bg-secondary/20 rounded-2xl p-5 border border-border/20">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-foreground flex items-center gap-2">
                            <Video className="w-4 h-4 text-amber-400" />
                            Recent Videos
                          </h3>
                          <Button variant="ghost" size="sm" className="text-amber-400 text-xs hover:text-amber-300">
                            View All
                          </Button>
                        </div>
                        <div className="space-y-3">
                          {recentVideos.map((video, index) => (
                            <motion.div
                              key={video.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + index * 0.1 }}
                              onMouseEnter={() => setHoveredVideo(video.id)}
                              onMouseLeave={() => setHoveredVideo(null)}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/40 transition-all group cursor-pointer border border-transparent hover:border-amber-500/20"
                            >
                              <div className={`w-20 h-12 rounded-lg bg-gradient-to-br ${video.thumbnail} flex items-center justify-center relative overflow-hidden`}>
                                <Video className="w-5 h-5 text-white/80" />
                                <div className="absolute bottom-1 right-1 text-[10px] bg-black/60 px-1 rounded text-white">
                                  9:16
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-foreground truncate">{video.title}</div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Eye className="w-3 h-3" />
                                  {video.views}
                                  <span className="text-border">|</span>
                                  <Calendar className="w-3 h-3" />
                                  {video.date}
                                </div>
                              </div>
                              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                video.status === "published" 
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                  : video.status === "scheduled"
                                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              }`}>
                                {video.status}
                              </span>
                              <AnimatePresence>
                                {hoveredVideo === video.id && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex gap-1"
                                  >
                                    <button className="p-1.5 rounded-lg hover:bg-secondary/60 text-muted-foreground hover:text-foreground">
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400">
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Upload Area */}
                      <div className="bg-secondary/20 rounded-2xl p-5 border border-border/20">
                        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Upload className="w-4 h-4 text-amber-400" />
                          Quick Upload
                        </h3>
                        <motion.div
                          whileHover={{ scale: 1.02, borderColor: "rgba(245, 158, 11, 0.5)" }}
                          className="border-2 border-dashed border-border/50 rounded-2xl p-8 text-center transition-colors cursor-pointer group"
                        >
                          <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center"
                          >
                            <Upload className="w-8 h-8 text-amber-400" />
                          </motion.div>
                          <p className="text-sm font-medium text-foreground mb-2">Drag and drop your video</p>
                          <p className="text-xs text-muted-foreground mb-4">or click to browse files</p>
                          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-lg">
                              <Check className="w-3 h-3 text-emerald-400" />
                              9:16 aspect ratio
                            </span>
                            <span className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-lg">
                              <Check className="w-3 h-3 text-emerald-400" />
                              MP4, MOV
                            </span>
                            <span className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-lg">
                              <Check className="w-3 h-3 text-emerald-400" />
                              Max 500MB
                            </span>
                          </div>
                        </motion.div>

                        {/* Quick actions */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          <Button variant="outline" className="rounded-lg border-border/30 justify-start hover:border-amber-500/30 hover:bg-amber-500/5">
                            <FileText className="w-4 h-4 mr-2 text-amber-400" />
                            Add Post
                          </Button>
                          <Button variant="outline" className="rounded-lg border-border/30 justify-start hover:border-amber-500/30 hover:bg-amber-500/5">
                            <Users className="w-4 h-4 mr-2 text-amber-400" />
                            Invite User
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer note */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 border border-border/30">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span className="text-xs text-muted-foreground">
                    Interactive Preview - Full access available for administrators
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
