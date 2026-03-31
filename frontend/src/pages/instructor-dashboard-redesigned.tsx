"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  CheckCircle2,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Clock,
  AlertCircle,
  GraduationCap,
  MessageSquare,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Plus,
  Edit,
  Trash,
  Eye,
  Download,
  Send,
  AwardIcon,
  Activity,
  PieChart,
  Zap,
  Target,
  ArrowRight,
  Lock,
  Unlock,
  Mail,
  Video,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type StudentGrade = {
  id: number;
  name: string;
  email: string;
  classId: string;
  attendance: number;
  assignments: number;
  tests: number;
  overall: number;
  status: "excellent" | "good" | "average" | "needs-improvement";
};

type Class = {
  id: number;
  name: string;
  studentCount: number;
  averageScore: number;
  schedule: string;
  assignments: number;
};

type Session = {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: number;
  attendees: number;
  totalStudents: number;
  recordUrl?: string;
};

type InstructorView =
  | "overview"
  | "students"
  | "classes"
  | "sessions"
  | "analytics";

const sampleStudents: StudentGrade[] = [
  {
    id: 1,
    name: "Ahmed Ibrahim",
    email: "ahmed@email.com",
    classId: "AI-101",
    attendance: 95,
    assignments: 88,
    tests: 92,
    overall: 91,
    status: "excellent",
  },
  {
    id: 2,
    name: "Zainab Hassan",
    email: "zainab@email.com",
    classId: "AI-101",
    attendance: 85,
    assignments: 76,
    tests: 78,
    overall: 79,
    status: "good",
  },
  {
    id: 3,
    name: "Karim Akram",
    email: "karim@email.com",
    classId: "AI-101",
    attendance: 70,
    assignments: 65,
    tests: 62,
    overall: 65,
    status: "average",
  },
  {
    id: 4,
    name: "Noor Ali",
    email: "noor@email.com",
    classId: "AI-101",
    attendance: 55,
    assignments: 45,
    tests: 48,
    overall: 49,
    status: "needs-improvement",
  },
];

const sampleClasses: Class[] = [
  {
    id: 1,
    name: "AI Coding Lab",
    studentCount: 32,
    averageScore: 82,
    schedule: "Mon, Wed, Fri - 2:00 PM",
    assignments: 8,
  },
  {
    id: 2,
    name: "Physics Lab",
    studentCount: 28,
    averageScore: 77,
    schedule: "Tue, Thu - 3:00 PM",
    assignments: 5,
  },
];

const sampleSessions: Session[] = [
  {
    id: 1,
    title: "Introduction to Neural Networks",
    date: "2024-03-28",
    time: "14:00",
    duration: 90,
    attendees: 30,
    totalStudents: 32,
    recordUrl: "#",
  },
  {
    id: 2,
    title: "Advanced Quantum Mechanics",
    date: "2024-03-29",
    time: "15:00",
    duration: 120,
    attendees: 26,
    totalStudents: 28,
    recordUrl: "#",
  },
];

export function InstructorDashboardRedesigned() {
  const [activeView, setActiveView] = useState<InstructorView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [students, setStudents] = useState<StudentGrade[]>(sampleStudents);
  const [classes, setClasses] = useState<Class[]>(sampleClasses);
  const [sessions, setSessions] = useState<Session[]>(sampleSessions);
  const [showGradeForm, setShowGradeForm] = useState(false);

  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      description: "Your dashboard",
    },
    {
      id: "students",
      label: "Students",
      icon: Users,
      description: "Manage students",
    },
    {
      id: "classes",
      label: "Classes",
      icon: GraduationCap,
      description: "Your classes",
    },
    {
      id: "sessions",
      label: "Live Sessions",
      icon: Video,
      description: "Track sessions",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      description: "Performance data",
    },
  ] as const;

  const avgScore = Math.round(
    students.reduce((acc, s) => acc + s.overall, 0) / students.length,
  );
  const attendanceRate = Math.round(
    students.reduce((acc, s) => acc + s.attendance, 0) / students.length,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/30 text-foreground">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-72 overflow-y-auto border-r border-border/50 bg-gradient-to-b from-card/60 to-background/60 backdrop-blur-xl transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Instructor Profile */}
        <div className="border-b border-border/50 px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <span className="text-lg font-bold text-white">AD</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">Amndy Davis</p>
              <p className="text-xs text-muted-foreground">AI Instructor</p>
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
                  setActiveView(item.id as InstructorView);
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
                  ? "Welcome back, Amndy! 👋"
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
              students={students}
              classes={classes}
              sessions={sessions}
              avgScore={avgScore}
              attendanceRate={attendanceRate}
            />
          )}
          {activeView === "students" && (
            <StudentsContent students={students} setStudents={setStudents} />
          )}
          {activeView === "classes" && <ClassesContent classes={classes} />}
          {activeView === "sessions" && <SessionsContent sessions={sessions} />}
          {activeView === "analytics" && (
            <AnalyticsContent students={students} classes={classes} />
          )}
        </main>
      </div>
    </div>
  );
}

// Overview Content
function OverviewContent({
  students,
  classes,
  sessions,
  avgScore,
  attendanceRate,
}: {
  students: StudentGrade[];
  classes: Class[];
  sessions: Session[];
  avgScore: number;
  attendanceRate: number;
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
            label: "Total Students",
            value: students.length,
            icon: Users,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "Average Score",
            value: `${avgScore}%`,
            icon: TrendingUp,
            color: "from-green-500 to-emerald-500",
          },
          {
            label: "Attendance Rate",
            value: `${attendanceRate}%`,
            icon: Activity,
            color: "from-purple-500 to-pink-500",
          },
          {
            label: "Active Classes",
            value: classes.length,
            icon: GraduationCap,
            color: "from-orange-500 to-red-500",
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

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Class Overview */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                Your Classes
              </h3>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg border-border/50"
              >
                <Plus className="h-4 w-4 mr-1" />
                New Class
              </Button>
            </div>
            <div className="space-y-4">
              {classes.map((classItem) => (
                <div
                  key={classItem.id}
                  className="rounded-xl border border-border/30 bg-background/50 p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">
                        {classItem.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {classItem.schedule}
                      </p>
                    </div>
                    <Badge className="bg-gradient-to-r from-primary to-accent">
                      {classItem.studentCount} students
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Class Performance</span>
                    <span className="font-semibold text-foreground">
                      {classItem.averageScore}%
                    </span>
                  </div>
                  <Progress value={classItem.averageScore} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/30 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Sessions</h3>
            <Badge variant="outline" className="border-border/50">
              {sessions.length}
            </Badge>
          </div>
          <div className="space-y-3">
            {sessions.slice(0, 2).map((session) => (
              <div
                key={session.id}
                className="rounded-lg border border-border/30 bg-background/50 p-3"
              >
                <p className="text-sm font-medium text-foreground truncate">
                  {session.title}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {session.date} • {session.time}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {session.attendees}/{session.totalStudents} present
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/30 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Top Performers
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {students
            .sort((a, b) => b.overall - a.overall)
            .slice(0, 4)
            .map((student) => (
              <div
                key={student.id}
                className="rounded-xl border border-border/30 bg-background/50 p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {student.name}
                    </p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {student.overall}%
                </p>
                <p className="text-xs text-muted-foreground">Overall score</p>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

// Students Content
function StudentsContent({
  students,
  setStudents,
}: {
  students: StudentGrade[];
  setStudents: (students: StudentGrade[]) => void;
}) {
  const [selectedStudent, setSelectedStudent] = useState<StudentGrade | null>(
    null,
  );

  const handleUpdateGrade = (
    studentId: number,
    field: string,
    value: number,
  ) => {
    setStudents(
      students.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            [field]: value,
            overall: Math.round(
              (s.attendance +
                (field === "attendance" ? value : s.attendance) +
                (s.assignments +
                  (field === "assignments" ? value : s.assignments)) +
                (s.tests + (field === "tests" ? value : s.tests))) /
                3,
            ),
          };
        }
        return s;
      }),
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Student Management
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg border-border/50"
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg border-border/50"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/30 p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left font-semibold text-foreground pb-3">
                  Student
                </th>
                <th className="text-center font-semibold text-foreground pb-3">
                  Attendance
                </th>
                <th className="text-center font-semibold text-foreground pb-3">
                  Assignments
                </th>
                <th className="text-center font-semibold text-foreground pb-3">
                  Tests
                </th>
                <th className="text-center font-semibold text-foreground pb-3">
                  Overall
                </th>
                <th className="text-center font-semibold text-foreground pb-3">
                  Status
                </th>
                <th className="text-center font-semibold text-foreground pb-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-background/40 transition-colors"
                >
                  <td className="py-4">
                    <div>
                      <p className="font-medium text-foreground">
                        {student.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {student.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <Badge variant="outline" className="border-border/30">
                      {student.attendance}%
                    </Badge>
                  </td>
                  <td className="py-4 text-center">
                    <Badge variant="outline" className="border-border/30">
                      {student.assignments}%
                    </Badge>
                  </td>
                  <td className="py-4 text-center">
                    <Badge variant="outline" className="border-border/30">
                      {student.tests}%
                    </Badge>
                  </td>
                  <td className="py-4 text-center">
                    <Badge className="bg-gradient-to-r from-primary to-accent">
                      {student.overall}%
                    </Badge>
                  </td>
                  <td className="py-4 text-center">
                    <Badge
                      className={
                        student.status === "excellent"
                          ? "bg-green-500/20 text-green-300"
                          : student.status === "good"
                            ? "bg-blue-500/20 text-blue-300"
                            : student.status === "average"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-red-500/20 text-red-300"
                      }
                    >
                      {student.status}
                    </Badge>
                  </td>
                  <td className="py-4 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg border-border/30"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Detail Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/30 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-foreground">
                  {selectedStudent.name}
                </h4>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="rounded-lg hover:bg-card/50 p-1 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "Attendance",
                    key: "attendance",
                    value: selectedStudent.attendance,
                  },
                  {
                    label: "Assignments",
                    key: "assignments",
                    value: selectedStudent.assignments,
                  },
                  {
                    label: "Tests",
                    key: "tests",
                    value: selectedStudent.tests,
                  },
                ].map((item) => (
                  <div key={item.key}>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-foreground">
                        {item.label}
                      </label>
                      <span className="text-sm text-muted-foreground">
                        {item.value}%
                      </span>
                    </div>
                    <Progress value={item.value} />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-2">
                <Button
                  asChild
                  className="flex-1 rounded-lg bg-gradient-to-r from-primary to-accent"
                >
                  <Link to="#send-message">
                    <Mail className="mr-2 h-4 w-4" />
                    Message
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-lg border-border/50"
                  onClick={() => setSelectedStudent(null)}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Classes Content
function ClassesContent({ classes }: { classes: Class[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Your Classes</h3>
        <Button className="rounded-lg bg-gradient-to-r from-primary to-accent">
          <Plus className="mr-2 h-4 w-4" />
          Create Class
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {classes.map((classItem) => (
          <motion.div
            key={classItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/30 p-6"
          >
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-foreground mb-2">
                {classItem.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {classItem.schedule}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg bg-background/50 p-3">
                <p className="text-xs text-muted-foreground">Students</p>
                <p className="text-2xl font-bold text-foreground">
                  {classItem.studentCount}
                </p>
              </div>
              <div className="rounded-lg bg-background/50 p-3">
                <p className="text-xs text-muted-foreground">Avg Score</p>
                <p className="text-2xl font-bold text-foreground">
                  {classItem.averageScore}%
                </p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">
                  Performance
                </p>
                <Badge variant="outline" className="border-border/30">
                  {classItem.assignments} assignments
                </Badge>
              </div>
              <Progress value={classItem.averageScore} />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 rounded-lg border-border/50"
              >
                <Users className="mr-2 h-4 w-4" />
                Students
              </Button>
              <Button
                asChild
                className="flex-1 rounded-lg bg-gradient-to-r from-primary to-accent"
              >
                <Link to="#class-details">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Manage
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Sessions Content
function SessionsContent({ sessions }: { sessions: Session[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Live Sessions</h3>
        <Button className="rounded-lg bg-gradient-to-r from-primary to-accent">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Session
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sessions.map((session) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/30 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  {session.title}
                </h4>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {session.date}
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-primary to-accent">
                Live
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg bg-background/50 p-3">
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-lg font-semibold text-foreground">
                  {session.duration} min
                </p>
              </div>
              <div className="rounded-lg bg-background/50 p-3">
                <p className="text-xs text-muted-foreground">Attendance</p>
                <p className="text-lg font-semibold text-foreground">
                  {session.attendees}/{session.totalStudents}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <div className="relative h-2 rounded-full bg-background/50 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${(session.attendees / session.totalStudents) * 100}%`,
                  }}
                  transition={{ duration: 1 }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round((session.attendees / session.totalStudents) * 100)}%
                attendance
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 rounded-lg border-border/50"
              >
                <Download className="mr-2 h-4 w-4" />
                Recording
              </Button>
              <Button
                asChild
                className="flex-1 rounded-lg bg-gradient-to-r from-primary to-accent"
              >
                <Link to="#session-details">
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Analytics Content
function AnalyticsContent({
  students,
  classes,
}: {
  students: StudentGrade[];
  classes: Class[];
}) {
  const excellentCount = students.filter(
    (s) => s.status === "excellent",
  ).length;
  const goodCount = students.filter((s) => s.status === "good").length;
  const averageCount = students.filter((s) => s.status === "average").length;
  const needsImprovementCount = students.filter(
    (s) => s.status === "needs-improvement",
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Performance Distribution */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/30 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Performance Distribution
          </h3>
          <div className="space-y-4">
            {[
              {
                label: "Excellence",
                count: excellentCount,
                color: "from-green-500 to-emerald-500",
                percentage: Math.round(
                  (excellentCount / students.length) * 100,
                ),
              },
              {
                label: "Good",
                count: goodCount,
                color: "from-blue-500 to-cyan-500",
                percentage: Math.round((goodCount / students.length) * 100),
              },
              {
                label: "Average",
                count: averageCount,
                color: "from-amber-500 to-orange-500",
                percentage: Math.round((averageCount / students.length) * 100),
              },
              {
                label: "Needs Improvement",
                count: needsImprovementCount,
                color: "from-red-500 to-rose-500",
                percentage: Math.round(
                  (needsImprovementCount / students.length) * 100,
                ),
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                  <Badge className={`bg-gradient-to-r ${item.color}`}>
                    {item.count} ({item.percentage}%)
                  </Badge>
                </div>
                <Progress value={item.percentage} />
              </div>
            ))}
          </div>
        </div>

        {/* Class Comparison */}
        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/30 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Class Performance
          </h3>
          <div className="space-y-4">
            {classes.map((cls) => (
              <div key={cls.id}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">
                    {cls.name}
                  </p>
                  <span className="text-sm font-bold text-foreground">
                    {cls.averageScore}%
                  </span>
                </div>
                <Progress value={cls.averageScore} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/30 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Assessment Breakdown
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              label: "Attendance",
              avg: Math.round(
                students.reduce((acc, s) => acc + s.attendance, 0) /
                  students.length,
              ),
              icon: Activity,
            },
            {
              label: "Assignments",
              avg: Math.round(
                students.reduce((acc, s) => acc + s.assignments, 0) /
                  students.length,
              ),
              icon: Target,
            },
            {
              label: "Tests",
              avg: Math.round(
                students.reduce((acc, s) => acc + s.tests, 0) / students.length,
              ),
              icon: CheckCircle2,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-xl border border-border/30 bg-background/50 p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {item.avg}%
                </p>
                <p className="text-xs text-muted-foreground">Class average</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
