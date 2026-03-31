"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Target,
  Settings,
  LogOut,
  Menu,
  X,
  PlayCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  MessageSquare,
  Star,
  Zap,
  Calendar,
  Users,
  ArrowRight,
  Award,
  Flame,
  Sparkles,
  Bell,
  Settings2,
  Search,
  Filter,
  MoreVertical,
  Lock,
  AlertCircle,
  Video,
  Download,
  Send,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type Course = {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  lessons: number;
  completedLessons: number;
  nextLesson: string;
  dueDate?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
};

type Assignment = {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  grade?: number;
};

type Achievement = {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  locked: boolean;
};

type StudentView = "overview" | "courses" | "assignments" | "achievements";

const sampleCourses: Course[] = [
  {
    id: 1,
    title: "AI Coding Lab",
    instructor: "Amina Yusuf",
    progress: 75,
    lessons: 12,
    completedLessons: 9,
    nextLesson: "Building Neural Networks",
    difficulty: "advanced",
  },
  {
    id: 2,
    title: "Full-Stack Development",
    instructor: "David Park",
    progress: 45,
    lessons: 16,
    completedLessons: 7,
    nextLesson: "React Hooks Deep Dive",
    difficulty: "intermediate",
  },
  {
    id: 3,
    title: "Physics Lab",
    instructor: "Sarah Chen",
    progress: 60,
    lessons: 10,
    completedLessons: 6,
    nextLesson: "Quantum Mechanics",
    difficulty: "advanced",
  },
];

const sampleAssignments: Assignment[] = [
  {
    id: 1,
    title: "ML Project: Image Classification",
    course: "AI Coding Lab",
    dueDate: "2024-04-05",
    status: "pending",
  },
  {
    id: 2,
    title: "Build a Todo App",
    course: "Full-Stack Development",
    dueDate: "2024-03-31",
    status: "submitted",
  },
  {
    id: 3,
    title: "Physics Simulation Report",
    course: "Physics Lab",
    dueDate: "2024-03-28",
    status: "graded",
    grade: 95,
  },
];

const sampleAchievements: Achievement[] = [
  {
    id: 1,
    title: "Quick Learner",
    description: "Complete 3 lessons in one day",
    icon: "🚀",
    unlockedAt: "2024-03-20",
    locked: false,
  },
  {
    id: 2,
    title: "Streak Master",
    description: "7-day learning streak",
    icon: "🔥",
    unlockedAt: "2024-03-25",
    locked: false,
  },
  {
    id: 3,
    title: "Perfect Score",
    description: "Get 100% on an assignment",
    icon: "⭐",
    locked: false,
  },
  {
    id: 4,
    title: "Mentor",
    description: "Help 5 classmates",
    icon: "👨‍🏫",
    locked: true,
  },
];

export function StudentDashboardRedesigned() {
  const [activeView, setActiveView] = useState<StudentView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [courses, setCourses] = useState<Course[]>(sampleCourses);
  const [assignments, setAssignments] =
    useState<Assignment[]>(sampleAssignments);
  const [streak, setStreak] = useState(7);

  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      description: "Your dashboard",
    },
    {
      id: "courses",
      label: "Courses",
      icon: BookOpen,
      description: "Active learning",
    },
    {
      id: "assignments",
      label: "Assignments",
      icon: Target,
      description: "Your tasks",
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Trophy,
      description: "Badges & milestones",
    },
  ] as const;

  const overallProgress = Math.round(
    courses.reduce((acc, course) => acc + course.progress, 0) / courses.length,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/30 text-foreground">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-72 overflow-y-auto border-r border-border/50 bg-gradient-to-b from-card/60 to-background/60 backdrop-blur-xl transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* User Profile */}
        <div className="border-b border-border/50 px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <span className="text-lg font-bold text-white">AR</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">Amara Rahman</p>
              <p className="text-xs text-muted-foreground">
                Grade 12 • AI Track
              </p>
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
                  setActiveView(item.id as StudentView);
                  setSidebarOpen(false);
                }}
                className={`w-full rounded-xl border px-4 py-3 text-left transition-all ${
                  isActive
                    ? "border-primary/50 bg-gradient-to-r from-primary/20 to-accent/10 text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border/50 hover:bg-card/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-xs text-inherit/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border/50 bg-gradient-to-t from-card/80 to-transparent p-4 space-y-2">
          <Button
            variant="outline"
            className="w-full rounded-xl border-border/50 justify-start"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full rounded-xl border-border/50 justify-start"
          >
            <Link to="/">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
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
              <h2 className="text-xl md:text-2xl font-bold text-foreground capitalize">
                {activeView === "overview"
                  ? "Welcome back, Amara! 👋"
                  : navItems.find((item) => item.id === activeView)?.label}
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
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="px-4 py-6 md:px-6 lg:px-8 min-h-[calc(100vh-80px)]">
          {activeView === "overview" && (
            <OverviewContent
              courses={courses}
              assignments={assignments}
              overallProgress={overallProgress}
              streak={streak}
            />
          )}
          {activeView === "courses" && <CoursesContent courses={courses} />}
          {activeView === "assignments" && (
            <AssignmentsContent assignments={assignments} />
          )}
          {activeView === "achievements" && (
            <AchievementsContent achievements={sampleAchievements} />
          )}
        </main>
      </div>
    </div>
  );
}

// Overview Content
function OverviewContent({
  courses,
  assignments,
  overallProgress,
  streak,
}: {
  courses: Course[];
  assignments: Assignment[];
  overallProgress: number;
  streak: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Hero Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Learning Streak",
            value: `${streak} days`,
            icon: Flame,
            color: "from-orange-500 to-red-500",
            detail: "Keep it up!",
          },
          {
            label: "Overall Progress",
            value: `${overallProgress}%`,
            icon: TrendingUp,
            color: "from-green-500 to-emerald-500",
            detail: "Across all courses",
          },
          {
            label: "Active Courses",
            value: courses.length,
            icon: BookOpen,
            color: "from-blue-500 to-cyan-500",
            detail: "In progress",
          },
          {
            label: "XP Points",
            value: "2,450",
            icon: Zap,
            color: "from-purple-500 to-pink-500",
            detail: "This month",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {stat.detail}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Courses */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/30 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Active Courses
            </h3>
            <div className="space-y-4">
              {courses.slice(0, 2).map((course) => (
                <div
                  key={course.id}
                  className="rounded-xl border border-border/30 bg-background/50 p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">
                        {course.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {course.instructor}
                      </p>
                    </div>
                    <Badge className="bg-gradient-to-r from-primary to-accent">
                      {course.progress}%
                    </Badge>
                  </div>
                  <Progress value={course.progress} className="mb-3" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {course.completedLessons}/{course.lessons} lessons
                    </span>
                    <span>Next: {course.nextLesson}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button
              asChild
              className="mt-4 w-full rounded-lg bg-gradient-to-r from-primary to-accent"
            >
              <Link to="#courses">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Upcom ing Assignments */}
        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/30 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Upcoming
          </h3>
          <div className="space-y-3">
            {assignments
              .filter((a) => a.status === "pending")
              .map((assignment) => (
                <div
                  key={assignment.id}
                  className="rounded-lg border border-border/30 bg-background/50 p-3"
                >
                  <p className="text-sm font-medium text-foreground truncate">
                    {assignment.title}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Due: {assignment.dueDate}
                  </div>
                </div>
              ))}
          </div>
          <Button
            variant="outline"
            className="mt-4 w-full rounded-lg border-border/50"
          >
            View All
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Courses Content
function CoursesContent({ courses }: { courses: Course[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Your Courses</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg border-border/50"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/30 p-6 hover:border-primary/50 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  {course.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {course.instructor}
                </p>
              </div>
              <Badge
                className={
                  course.difficulty === "advanced"
                    ? "bg-red-500/20 text-red-300"
                    : course.difficulty === "intermediate"
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-green-500/20 text-green-300"
                }
              >
                {course.difficulty}
              </Badge>
            </div>

            <div className="mb-4">
              <Progress value={course.progress} />
              <p className="text-xs text-muted-foreground mt-2">
                {course.completedLessons}/{course.lessons} lessons
              </p>
            </div>

            <Button
              asChild
              className="w-full rounded-lg bg-gradient-to-r from-primary to-accent"
            >
              <Link to="/student/courses">
                <PlayCircle className="mr-2 h-4 w-4" />
                Continue Learning
              </Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Assignments Content
function AssignmentsContent({ assignments }: { assignments: Assignment[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="grid gap-6">
        {assignments.map((assignment) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/30 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-lg font-semibold text-foreground">
                    {assignment.title}
                  </h4>
                  {assignment.status === "graded" && (
                    <Badge className="bg-green-500/20 text-green-300">
                      ✓ Graded
                    </Badge>
                  )}
                  {assignment.status === "submitted" && (
                    <Badge className="bg-blue-500/20 text-blue-300">
                      Submitted
                    </Badge>
                  )}
                  {assignment.status === "pending" && (
                    <Badge className="bg-amber-500/20 text-amber-300">
                      Pending
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {assignment.course}
                </p>
              </div>
              {assignment.grade && (
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-400">
                    {assignment.grade}%
                  </p>
                  <p className="text-xs text-muted-foreground">Your score</p>
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Due: {assignment.dueDate}
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                {assignment.status === "pending" && (
                  <>
                    <Button className="flex-1 md:flex-none rounded-lg bg-gradient-to-r from-primary to-accent">
                      <Send className="mr-2 h-4 w-4" />
                      Submit
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 md:flex-none rounded-lg border-border/50"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </>
                )}
                {assignment.status === "submitted" && (
                  <Button
                    variant="outline"
                    className="w-full md:w-auto rounded-lg border-border/50"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Submission
                  </Button>
                )}
                {assignment.status === "graded" && (
                  <Button
                    variant="outline"
                    className="w-full md:w-auto rounded-lg border-border/50"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Instructor Feedback
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Achievements Content
function AchievementsContent({
  achievements,
}: {
  achievements: Achievement[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl border p-6 text-center transition-all ${
              achievement.locked
                ? "border-border/30 bg-card/30 opacity-50"
                : "border-border/50 bg-gradient-to-br from-card/60 to-card/30 hover:border-primary/50"
            }`}
          >
            <div className="text-4xl mb-3">{achievement.icon}</div>
            <h4 className="font-semibold text-foreground">
              {achievement.title}
            </h4>
            <p className="text-xs text-muted-foreground mt-2">
              {achievement.description}
            </p>
            {!achievement.locked && achievement.unlockedAt && (
              <p className="text-xs text-green-400 mt-3">
                ✓ Unlocked {achievement.unlockedAt}
              </p>
            )}
            {achievement.locked && (
              <div className="flex items-center justify-center gap-1 mt-3 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                Locked
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
