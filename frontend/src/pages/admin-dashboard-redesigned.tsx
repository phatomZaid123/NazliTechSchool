"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Send,
  Calendar,
  Users,
  BarChart3,
  MessageSquare,
  Image,
  Link2,
  Search,
  Bell,
  ChevronDown,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Video,
  Globe,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Share2,
  Filter,
  Download,
  Settings2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

// Types
type Testimonial = {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar: string;
  rating: number;
  project: string;
  featured: boolean;
  createdAt: string;
};

type StudentProject = {
  id: number;
  title: string;
  description: string;
  studentName: string;
  category: string;
  thumbnail: string;
  visible: boolean;
  featured: boolean;
  createdAt: string;
};

type GoogleMeeting = {
  id: number;
  title: string;
  description: string;
  host: string;
  audience: "students" | "instructors" | "both" | "families";
  date: string;
  time: string;
  duration: number;
  meetUrl: string;
  status: "draft" | "scheduled" | "live" | "completed";
  invitesSent: boolean;
  recordingUrl?: string;
};

type SocialPost = {
  id: number;
  content: string;
  platforms: ("instagram" | "linkedin" | "youtube" | "twitter")[];
  scheduledTime: string;
  status: "draft" | "scheduled" | "published";
  media?: string;
  engagementMetrics?: {
    likes: number;
    comments: number;
    shares: number;
  };
};

type TestimonialFormData = {
  formType: "testimonials";
  name: string;
  role: string;
  text: string;
  avatar: string;
  rating: number;
  project: string;
};

type ProjectFormData = {
  formType: "projects";
  title: string;
  description: string;
  studentName: string;
  category: string;
  thumbnail: string;
};

type FormDataType = TestimonialFormData | ProjectFormData;

type AdminView =
  | "overview"
  | "content"
  | "meetings"
  | "social"
  | "analytics"
  | "settings";

// Sample data
const sampleTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sofia Rahman",
    role: "Grade 12 | AI & ML Track",
    text: "Nazli Tech transformed how I learn. The AI assistant understands exactly where I'm stuck.",
    avatar: "SR",
    rating: 5,
    project: "Climate Prediction AI",
    featured: true,
    createdAt: "2024-03-20",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Grade 11 | Web Development",
    text: "The real-world project approach actually keeps me motivated.",
    avatar: "MJ",
    rating: 5,
    project: "E-Commerce Platform",
    featured: true,
    createdAt: "2024-03-18",
  },
];

const sampleProjects: StudentProject[] = [
  {
    id: 1,
    title: "AI-Powered Recommendation Engine",
    description: "Machine learning system for personalized learning paths",
    studentName: "Amara Williams",
    category: "AI/ML",
    thumbnail: "from-purple-500 to-pink-500",
    visible: true,
    featured: true,
    createdAt: "2024-03-15",
  },
  {
    id: 2,
    title: "Quantum Physics Simulator",
    description: "Interactive 3D simulation of quantum mechanics concepts",
    studentName: "Chen Wei",
    category: "Physics",
    thumbnail: "from-blue-500 to-cyan-500",
    visible: true,
    featured: true,
    createdAt: "2024-03-16",
  },
];

const sampleMeetings: GoogleMeeting[] = [
  {
    id: 1,
    title: "AI Coding Lab - Cohort A",
    description: "Live coding session on neural networks",
    host: "Amina Yusuf",
    audience: "students",
    date: "2024-03-30",
    time: "16:00",
    duration: 90,
    meetUrl: "meet.google.com/naz-ai-001",
    status: "scheduled",
    invitesSent: true,
  },
  {
    id: 2,
    title: "Instructor Workshop",
    description: "Teaching best practices with AI tools",
    host: "David Park",
    audience: "instructors",
    date: "2024-04-02",
    time: "10:30",
    duration: 120,
    meetUrl: "meet.google.com/naz-teach-prep",
    status: "draft",
    invitesSent: false,
  },
];

const sampleSocialPosts: SocialPost[] = [
  {
    id: 1,
    content:
      "Excited to announce our new AI Coding Lab! 🚀 Students are building real ML models.",
    platforms: ["instagram", "linkedin", "twitter"],
    scheduledTime: "2024-03-31T10:00:00",
    status: "scheduled",
    engagementMetrics: { likes: 234, comments: 12, shares: 8 },
  },
];

// Component
export function AdminDashboardRedesigned() {
  const [activeView, setActiveView] = useState<AdminView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(sampleTestimonials);
  const [projects, setProjects] = useState<StudentProject[]>(sampleProjects);
  const [meetings, setMeetings] = useState<GoogleMeeting[]>(sampleMeetings);
  const [socialPosts, setSocialPosts] =
    useState<SocialPost[]>(sampleSocialPosts);

  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      description: "Dashboard & metrics",
    },
    {
      id: "content",
      label: "Content",
      icon: MessageSquare,
      description: "Testimonials & projects",
    },
    {
      id: "meetings",
      label: "Meetings",
      icon: Calendar,
      description: "Google Meet setup",
    },
    {
      id: "social",
      label: "Social Media",
      icon: Share2,
      description: "Multi-platform posts",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      description: "Performance metrics",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      description: "Configuration",
    },
  ] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/30 text-foreground">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-72 overflow-y-auto border-r border-border/50 bg-gradient-to-b from-card/60 to-background/60 backdrop-blur-xl transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="border-b border-border/50 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                Platform
              </p>
              <h1 className="text-lg font-bold text-foreground">Nazli Admin</h1>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                onClick={() => {
                  setActiveView(item.id as AdminView);
                  setSidebarOpen(false);
                }}
                className={`w-full rounded-xl border px-4 py-3 text-left transition-all ${
                  isActive
                    ? "border-primary/50 bg-gradient-to-r from-primary/20 to-accent/10 text-foreground shadow-lg shadow-primary/10"
                    : "border-transparent text-muted-foreground hover:border-border/50 hover:bg-card/50 hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="min-w-0 text-left">
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-xs text-inherit/70">
                      {item.description}
                    </p>
                  </div>
                  {isActive && (
                    <ArrowRight className="ml-auto h-4 w-4 flex-shrink-0" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border/50 bg-gradient-to-t from-card/80 to-transparent p-4">
          <Button
            asChild
            variant="outline"
            className="w-full rounded-xl border-border/50"
          >
            <Link to="/" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg border border-border/50 bg-card/50 p-2 lg:hidden"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                Management
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-foreground capitalize">
                {navItems.find((item) => item.id === activeView)?.label}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-lg border-border/50"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-lg border-border/50"
              >
                <Settings2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="px-4 py-6 md:px-6 lg:px-8 min-h-[calc(100vh-80px)]">
          {activeView === "overview" && (
            <OverviewContent
              meetings={meetings}
              testimonials={testimonials}
              projects={projects}
            />
          )}
          {activeView === "content" && (
            <ContentManagement
              testimonials={testimonials}
              setTestimonials={setTestimonials}
              projects={projects}
              setProjects={setProjects}
            />
          )}
          {activeView === "meetings" && (
            <MeetingsManager meetings={meetings} setMeetings={setMeetings} />
          )}
          {activeView === "social" && (
            <SocialMediaManager posts={socialPosts} setPosts={setSocialPosts} />
          )}
          {activeView === "analytics" && <AnalyticsContent />}
          {activeView === "settings" && <SettingsContent />}
        </main>
      </div>
    </div>
  );
}

// Overview Content
function OverviewContent({
  meetings,
  testimonials,
  projects,
}: {
  meetings: GoogleMeeting[];
  testimonials: Testimonial[];
  projects: StudentProject[];
}) {
  const stats = [
    {
      label: "Active Meetings",
      value: meetings.filter((m) => m.status === "scheduled").length,
      detail: "Scheduled this week",
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Testimonials",
      value: testimonials.filter((t) => t.featured).length,
      detail: "Featured on site",
      icon: MessageSquare,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Projects",
      value: projects.filter((p) => p.visible).length,
      detail: "Visible projects",
      icon: Video,
      color: "from-amber-500 to-orange-500",
    },
    {
      label: "Platform Health",
      value: "98%",
      detail: "System uptime",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      className="grid gap-6"
    >
      {/* Stat Cards */}
      <motion.div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 p-6 backdrop-blur-sm hover:border-primary/50 transition-all"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity ${stat.color}"></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {stat.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <QuickActionCard
          title="Upcoming Meetings"
          icon={Calendar}
          items={meetings.filter((m) => m.status === "scheduled").slice(0, 3)}
          type="meetings"
        />
        <QuickActionCard
          title="Featured Content"
          icon={Star}
          items={testimonials.filter((t) => t.featured).slice(0, 3)}
          type="testimonials"
        />
      </div>
    </motion.div>
  );
}

// Quick Action Card
function QuickActionCard({
  title,
  icon: Icon,
  items,
  type,
}: {
  title: string;
  icon: any;
  items: any[];
  type: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/20">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <Badge className="ml-auto">{items.length}</Badge>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-background/50 border border-border/30"
          >
            <p className="text-sm font-medium text-foreground truncate">
              {type === "meetings" ? item.title : item.name}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {type === "meetings"
                ? `${item.host} • ${item.date}`
                : item.project}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Star Icon (since it's not in lucide-react as Star for ratings)
function Star() {
  return <MessageSquare className="h-5 w-5" />;
}

// Content Management
function ContentManagement({
  testimonials,
  setTestimonials,
  projects,
  setProjects,
}: {
  testimonials: Testimonial[];
  setTestimonials: (t: Testimonial[]) => void;
  projects: StudentProject[];
  setProjects: (p: StudentProject[]) => void;
}) {
  const [activeTab, setActiveTab] = useState<"testimonials" | "projects">(
    "testimonials",
  );
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleFeatured = (id: number, type: "testimonials" | "projects") => {
    if (type === "testimonials") {
      setTestimonials(
        testimonials.map((t) =>
          t.id === id ? { ...t, featured: !t.featured } : t,
        ),
      );
    } else {
      setProjects(
        projects.map((p) =>
          p.id === id ? { ...p, featured: !p.featured } : p,
        ),
      );
    }
  };

  const toggleVisible = (id: number) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, visible: !p.visible } : p)),
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Tabs */}
      <div className="flex gap-4 border-b border-border/30">
        {[
          {
            id: "testimonials",
            label: "Student Testimonials",
            icon: MessageSquare,
          },
          { id: "projects", label: "Student Projects", icon: Video },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
                isActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Add New Button */}
      <div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="rounded-xl bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add {activeTab === "testimonials" ? "Testimonial" : "Project"}
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <AddContentForm
          type={activeTab}
          onClose={() => setShowAddForm(false)}
          onAdd={(data) => {
            if (activeTab === "testimonials") {
              setTestimonials([
                ...testimonials,
                {
                  ...data,
                  id: Date.now(),
                  featured: true,
                  createdAt: new Date().toISOString().split("T")[0],
                },
              ]);
            } else {
              setProjects([
                ...projects,
                {
                  ...data,
                  id: Date.now(),
                  featured: true,
                  createdAt: new Date().toISOString().split("T")[0],
                },
              ]);
            }
            setShowAddForm(false);
          }}
        />
      )}

      {/* Content List */}
      <div className="grid gap-4">
        {activeTab === "testimonials"
          ? testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                onToggleFeatured={() =>
                  toggleFeatured(testimonial.id, "testimonials")
                }
                onDelete={() =>
                  setTestimonials(
                    testimonials.filter((t) => t.id !== testimonial.id),
                  )
                }
              />
            ))
          : projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onToggleFeatured={() => toggleFeatured(project.id, "projects")}
                onToggleVisible={() => toggleVisible(project.id)}
                onDelete={() =>
                  setProjects(projects.filter((p) => p.id !== project.id))
                }
              />
            ))}
      </div>
    </motion.div>
  );
}

// Testimonial Card
function TestimonialCard({
  testimonial,
  onToggleFeatured,
  onDelete,
}: {
  testimonial: Testimonial;
  onToggleFeatured: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="group rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-background/60 p-6 hover:border-primary/50 transition-all"
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold">
                {testimonial.avatar}
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span key={i} className="text-amber-400">
                  ⭐
                </span>
              ))}
            </div>
          </div>
          <p className="text-foreground italic mb-4">"{testimonial.text}"</p>
          <Badge variant="outline" className="border-border/50">
            {testimonial.project}
          </Badge>
        </div>

        <div className="flex flex-col gap-2 lg:min-w-max">
          <Button
            onClick={onToggleFeatured}
            variant={testimonial.featured ? "default" : "outline"}
            size="sm"
            className="rounded-lg"
          >
            {testimonial.featured ? (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Featured
              </>
            ) : (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Hidden
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg border-border/50"
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            onClick={onDelete}
            variant="outline"
            size="sm"
            className="rounded-lg border-destructive/50 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Project Card
function ProjectCard({
  project,
  onToggleFeatured,
  onToggleVisible,
  onDelete,
}: {
  project: StudentProject;
  onToggleFeatured: () => void;
  onToggleVisible: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="group rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-background/60 p-6 hover:border-primary/50 transition-all"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Thumbnail */}
        <div
          className={`h-32 w-48 shrink-0 rounded-xl bg-gradient-to-br ${project.thumbnail} opacity-80 group-hover:opacity-100 transition-opacity`}
        />

        {/* Content */}
        <div className="flex-1">
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  By {project.studentName}
                </p>
              </div>
              <Badge className="ml-auto">{project.category}</Badge>
            </div>
            <p className="text-foreground text-sm">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="border-border/50">
              {project.createdAt}
            </Badge>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 lg:min-w-max">
          <Button
            onClick={onToggleVisible}
            variant={project.visible ? "default" : "outline"}
            size="sm"
            className="rounded-lg"
          >
            {project.visible ? (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Visible
              </>
            ) : (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Hidden
              </>
            )}
          </Button>
          <Button
            onClick={onToggleFeatured}
            variant={project.featured ? "default" : "outline"}
            size="sm"
            className="rounded-lg"
          >
            {project.featured ? "Featured" : "Not Featured"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg border-border/50"
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            onClick={onDelete}
            variant="outline"
            size="sm"
            className="rounded-lg border-destructive/50 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Add Content Form
function AddContentForm({
  type,
  onClose,
  onAdd,
}: {
  type: "testimonials" | "projects";
  onClose: () => void;
  onAdd: (data: any) => void;
}) {
  const [formData, setFormData] = useState<FormDataType>(
    type === "testimonials"
      ? ({
          formType: "testimonials",
          name: "",
          role: "",
          text: "",
          avatar: "",
          rating: 5,
          project: "",
        } as TestimonialFormData)
      : ({
          formType: "projects",
          title: "",
          description: "",
          studentName: "",
          category: "",
          thumbnail: "",
        } as ProjectFormData),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-background/60 p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "testimonials" ? (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Name
                </label>
                <Input
                  placeholder="Student name"
                  value={
                    formData.formType === "testimonials" ? formData.name : ""
                  }
                  onChange={(e) =>
                    formData.formType === "testimonials" &&
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-2 rounded-lg border-border/50 bg-background/60"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Role/Title
                </label>
                <Input
                  placeholder="Grade 12 | AI Track"
                  value={
                    formData.formType === "testimonials" ? formData.role : ""
                  }
                  onChange={(e) =>
                    formData.formType === "testimonials" &&
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="mt-2 rounded-lg border-border/50 bg-background/60"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Testimonial
              </label>
              <Textarea
                placeholder="What did the student say?"
                value={
                  formData.formType === "testimonials" ? formData.text : ""
                }
                onChange={(e) =>
                  formData.formType === "testimonials" &&
                  setFormData({ ...formData, text: e.target.value })
                }
                className="mt-2 rounded-lg border-border/50 bg-background/60"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Project
                </label>
                <Input
                  placeholder="Project name"
                  value={
                    formData.formType === "testimonials" ? formData.project : ""
                  }
                  onChange={(e) =>
                    formData.formType === "testimonials" &&
                    setFormData({ ...formData, project: e.target.value })
                  }
                  className="mt-2 rounded-lg border-border/50 bg-background/60"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Rating
                </label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={
                    formData.formType === "testimonials" ? formData.rating : 5
                  }
                  onChange={(e) =>
                    formData.formType === "testimonials" &&
                    setFormData({
                      ...formData,
                      rating: parseInt(e.target.value),
                    })
                  }
                  className="mt-2 rounded-lg border-border/50 bg-background/60"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="text-sm font-medium text-foreground">
                Project Title
              </label>
              <Input
                placeholder="Project name"
                value={formData.formType === "projects" ? formData.title : ""}
                onChange={(e) =>
                  formData.formType === "projects" &&
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-2 rounded-lg border-border/50 bg-background/60"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Description
              </label>
              <Textarea
                placeholder="Project description"
                value={
                  formData.formType === "projects" ? formData.description : ""
                }
                onChange={(e) =>
                  formData.formType === "projects" &&
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-2 rounded-lg border-border/50 bg-background/60"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Student Name
                </label>
                <Input
                  placeholder="Student name"
                  value={
                    formData.formType === "projects" ? formData.studentName : ""
                  }
                  onChange={(e) =>
                    formData.formType === "projects" &&
                    setFormData({ ...formData, studentName: e.target.value })
                  }
                  className="mt-2 rounded-lg border-border/50 bg-background/60"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Category
                </label>
                <Input
                  placeholder="AI/ML, Physics, etc."
                  value={
                    formData.formType === "projects" ? formData.category : ""
                  }
                  onChange={(e) =>
                    formData.formType === "projects" &&
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="mt-2 rounded-lg border-border/50 bg-background/60"
                />
              </div>
            </div>
          </>
        )}

        <div className="flex gap-2 pt-4">
          <Button
            type="submit"
            className="rounded-lg bg-gradient-to-r from-primary to-accent"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="rounded-lg border-border/50"
          >
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

// Meetings Manager
function MeetingsManager({
  meetings,
  setMeetings,
}: {
  meetings: GoogleMeeting[];
  setMeetings: (m: GoogleMeeting[]) => void;
}) {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Google Meet Sessions
        </h3>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="rounded-xl bg-gradient-to-r from-primary to-accent"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Meeting
        </Button>
      </div>

      {showAddForm && (
        <AddMeetingForm
          onClose={() => setShowAddForm(false)}
          onAdd={(data) => {
            setMeetings([...meetings, { ...data, id: Date.now() }]);
            setShowAddForm(false);
          }}
        />
      )}

      <div className="grid gap-4">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
            onDelete={() =>
              setMeetings(meetings.filter((m) => m.id !== meeting.id))
            }
          />
        ))}
      </div>
    </motion.div>
  );
}

// Meeting Card
function MeetingCard({
  meeting,
  onDelete,
}: {
  meeting: GoogleMeeting;
  onDelete: () => void;
}) {
  const statusColors = {
    draft: "bg-slate-500/10 text-slate-300 border-slate-500/20",
    scheduled: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    live: "bg-green-500/10 text-green-300 border-green-500/20",
    completed: "bg-gray-500/10 text-gray-300 border-gray-500/20",
  };

  const audienceEmoji = {
    students: "👨‍🎓",
    instructors: "👨‍🏫",
    both: "👥",
    families: "👨‍👩‍👧‍👦",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-background/60 p-6 hover:border-primary/50 transition-all"
    >
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-lg bg-primary/20">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground">
                {meeting.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {meeting.description}
              </p>
            </div>
          </div>

          <div className="grid gap-3 grid-cols-2 md:grid-cols-4 text-sm">
            <div>
              <p className="text-muted-foreground">Host</p>
              <p className="font-medium text-foreground">{meeting.host}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Audience</p>
              <p className="font-medium text-foreground">
                {audienceEmoji[meeting.audience]} {meeting.audience}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Date & Time</p>
              <p className="font-medium text-foreground">
                {meeting.date} {meeting.time}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Duration</p>
              <p className="font-medium text-foreground">
                {meeting.duration} min
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Badge className={statusColors[meeting.status]}>
              {meeting.status === "scheduled" && (
                <Clock className="mr-1 h-3 w-3" />
              )}
              {meeting.status}
            </Badge>
            {meeting.invitesSent && (
              <Badge
                variant="outline"
                className="border-green-500/50 bg-green-500/10"
              >
                ✓ Invites sent
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:min-w-max">
          <Button
            asChild
            variant="default"
            className="rounded-lg bg-gradient-to-r from-primary to-accent"
          >
            <a
              href={`https://${meeting.meetUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <Globe className="mr-2 h-4 w-4" />
              Join/View
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg border-border/50"
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            onClick={onDelete}
            variant="outline"
            size="sm"
            className="rounded-lg border-destructive/50 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Add Meeting Form
function AddMeetingForm({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (data: Omit<GoogleMeeting, "id">) => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    host: "",
    audience: "students" as const,
    date: "",
    time: "",
    duration: 60,
    meetUrl: "",
    status: "draft" as const,
    invitesSent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-background/60 p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-foreground">
              Meeting Title
            </label>
            <Input
              placeholder="e.g., AI Coding Lab - Cohort A"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-2 rounded-lg border-border/50 bg-background/60"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Host Name
            </label>
            <Input
              placeholder="Instructor name"
              value={formData.host}
              onChange={(e) =>
                setFormData({ ...formData, host: e.target.value })
              }
              className="mt-2 rounded-lg border-border/50 bg-background/60"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">
            Description
          </label>
          <Textarea
            placeholder="Meeting description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="mt-2 rounded-lg border-border/50 bg-background/60"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label className="text-sm font-medium text-foreground">
              Audience
            </label>
            <select
              value={formData.audience}
              onChange={(e) =>
                setFormData({ ...formData, audience: e.target.value as any })
              }
              className="mt-2 w-full rounded-lg border border-border/50 bg-background/60 px-3 py-2 text-foreground"
            >
              <option>students</option>
              <option>instructors</option>
              <option>both</option>
              <option>families</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Date</label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="mt-2 rounded-lg border-border/50 bg-background/60"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Time</label>
            <Input
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className="mt-2 rounded-lg border-border/50 bg-background/60"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Duration (min)
            </label>
            <Input
              type="number"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: parseInt(e.target.value) })
              }
              className="mt-2 rounded-lg border-border/50 bg-background/60"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">
            Google Meet URL
          </label>
          <Input
            placeholder="meet.google.com/naz-ai-001"
            value={formData.meetUrl}
            onChange={(e) =>
              setFormData({ ...formData, meetUrl: e.target.value })
            }
            className="mt-2 rounded-lg border-border/50 bg-background/60"
          />
        </div>

        <div className="flex items-center gap-3">
          <Switch
            checked={formData.invitesSent}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, invitesSent: checked })
            }
          />
          <label className="text-sm font-medium text-foreground">
            Send invites immediately
          </label>
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            type="submit"
            className="rounded-lg bg-gradient-to-r from-primary to-accent"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Meeting
          </Button>
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="rounded-lg border-border/50"
          >
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

// Social Media Manager
function SocialMediaManager({
  posts,
  setPosts,
}: {
  posts: SocialPost[];
  setPosts: (p: SocialPost[]) => void;
}) {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Social Media Posts
        </h3>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="rounded-xl bg-gradient-to-r from-primary to-accent"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      {showAddForm && (
        <AddSocialPostForm
          onClose={() => setShowAddForm(false)}
          onAdd={(data) => {
            setPosts([...posts, { ...data, id: Date.now() }]);
            setShowAddForm(false);
          }}
        />
      )}

      <div className="grid gap-4">
        {posts.map((post) => (
          <SocialPostCard
            key={post.id}
            post={post}
            onDelete={() => setPosts(posts.filter((p) => p.id !== post.id))}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Social Post Card
function SocialPostCard({
  post,
  onDelete,
}: {
  post: SocialPost;
  onDelete: () => void;
}) {
  const platformIcons = {
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
    twitter: Twitter,
  };

  const platformColors = {
    instagram: "from-pink-500 to-purple-500",
    linkedin: "from-blue-500 to-cyan-500",
    youtube: "from-red-500 to-pink-500",
    twitter: "from-blue-400 to-blue-600",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-background/60 p-6 hover:border-primary/50 transition-all"
    >
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="flex-1">
          <p className="text-foreground mb-4">{post.content}</p>

          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Platforms</p>
            <div className="flex flex-wrap gap-2">
              {post.platforms.map((platform) => {
                const Icon = platformIcons[platform];
                return (
                  <Badge
                    key={platform}
                    className={`bg-gradient-to-r ${platformColors[platform]}`}
                  >
                    <Icon className="mr-1 h-3 w-3" />
                    {platform}
                  </Badge>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Scheduled</p>
              <p className="font-medium text-foreground">
                {post.scheduledTime}
              </p>
            </div>
            <Badge
              className={
                post.status === "draft"
                  ? "bg-slate-500/10 text-slate-300"
                  : post.status === "scheduled"
                    ? "bg-blue-500/10 text-blue-300"
                    : "bg-green-500/10 text-green-300"
              }
            >
              {post.status}
            </Badge>
          </div>

          {post.engagementMetrics && (
            <div className="mt-4 flex gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Likes</p>
                <p className="font-semibold text-foreground">
                  {post.engagementMetrics.likes}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Comments</p>
                <p className="font-semibold text-foreground">
                  {post.engagementMetrics.comments}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Shares</p>
                <p className="font-semibold text-foreground">
                  {post.engagementMetrics.shares}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 lg:min-w-max">
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg border-border/50"
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            onClick={onDelete}
            variant="outline"
            size="sm"
            className="rounded-lg border-destructive/50 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Add Social Post Form
function AddSocialPostForm({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (data: Omit<SocialPost, "id">) => void;
}) {
  const [formData, setFormData] = useState({
    content: "",
    platforms: [] as ("instagram" | "linkedin" | "youtube" | "twitter")[],
    scheduledTime: "",
    status: "draft" as const,
  });

  const platforms = ["instagram", "linkedin", "youtube", "twitter"] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  const togglePlatform = (platform: (typeof platforms)[number]) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-background/60 p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">
            Post Content
          </label>
          <Textarea
            placeholder="What do you want to post?"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="mt-2 rounded-lg border-border/50 bg-background/60 min-h-24"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Select Platforms
          </label>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
            {platforms.map((platform) => (
              <button
                key={platform}
                type="button"
                onClick={() => togglePlatform(platform)}
                className={`rounded-lg border-2 p-3 text-center font-medium transition-all ${
                  formData.platforms.includes(platform)
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-border/50 bg-background/60 text-muted-foreground hover:border-border hover:bg-card/60"
                }`}
              >
                {platform === "instagram" && (
                  <Instagram className="mx-auto h-5 w-5 mb-1" />
                )}
                {platform === "linkedin" && (
                  <Linkedin className="mx-auto h-5 w-5 mb-1" />
                )}
                {platform === "youtube" && (
                  <Youtube className="mx-auto h-5 w-5 mb-1" />
                )}
                {platform === "twitter" && (
                  <Twitter className="mx-auto h-5 w-5 mb-1" />
                )}
                <span className="text-sm capitalize">{platform}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-foreground">
              Schedule Date & Time
            </label>
            <Input
              type="datetime-local"
              value={formData.scheduledTime}
              onChange={(e) =>
                setFormData({ ...formData, scheduledTime: e.target.value })
              }
              className="mt-2 rounded-lg border-border/50 bg-background/60"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as any })
              }
              className="mt-2 w-full rounded-lg border border-border/50 bg-background/60 px-3 py-2 text-foreground"
            >
              <option>draft</option>
              <option>scheduled</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            type="submit"
            className="rounded-lg bg-gradient-to-r from-primary to-accent"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Post
          </Button>
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="rounded-lg border-border/50"
          >
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

// Analytics Content
function AnalyticsContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Total Students", value: "5,234", growth: "+12%" },
          { label: "Active Sessions", value: "342", growth: "+5%" },
          { label: "Completion Rate", value: "87%", growth: "+3%" },
          { label: "Course Enrollments", value: "1,203", growth: "+18%" },
          { label: "Avg. Score", value: "8.2/10", growth: "+0.5" },
          { label: "Instructor Rating", value: "4.8/5", growth: "+0.2" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-background/60 p-6"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-3xl font-bold text-foreground mt-2">
              {stat.value}
            </p>
            <p className="text-sm text-green-400 mt-2">{stat.growth}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Settings Content
function SettingsContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl space-y-6"
    >
      <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-background/60 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Platform Settings
        </h3>

        <div className="space-y-4">
          {[
            {
              label: "Enable notifications",
              description: "Send system notifications to admins",
            },
            {
              label: "Auto-sync social media",
              description: "Automatically sync posts across platforms",
            },
            {
              label: "Enable student feedback",
              description: "Allow students to provide feedback",
            },
            {
              label: "Maintenance mode",
              description: "Temporarily disable platform access",
            },
          ].map((setting) => (
            <div
              key={setting.label}
              className="flex items-center justify-between p-4 border border-border/30 rounded-lg"
            >
              <div>
                <p className="font-medium text-foreground">{setting.label}</p>
                <p className="text-sm text-muted-foreground">
                  {setting.description}
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
