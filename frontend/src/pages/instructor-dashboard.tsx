"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  LayoutDashboard,
  Plus,
  Settings,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";
import { Link, Navigate, useLocation } from "react-router-dom";

import {
  DashboardMetricCard,
  DashboardPanel,
  SectionHeading,
} from "@/components/dashboard/prototype-dashboard-shell";
import {
  DashboardWorkspaceLayout,
  type DashboardNavItem,
} from "@/components/dashboard/dashboard-workspace-layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type ScheduledSession = {
  id: number;
  title: string;
  cohort: string;
  studentsCount: number;
  startTime: string;
  duration: string;
  meetUrl: string;
  mode: "group" | "1-on-1" | "class";
  sessionType: "live" | "scheduled" | "completed";
  notes?: string;
};

type Course = {
  id: number;
  title: string;
  category: string;
  students: number;
  averageProgress: number;
  sessionsCompleted: number;
  totalSessions: number;
  lastUpdated: string;
};

type StudentPerformance = {
  id: number;
  name: string;
  course: string;
  progress: number;
  submissions: number;
  averageGrade: number;
  status: "excellent" | "good" | "needs-attention" | "at-risk";
};

type PendingGrading = {
  id: number;
  studentName: string;
  assignmentTitle: string;
  submittedDate: string;
  course: string;
};

type InstructorView = "overview" | "courses" | "sessions" | "learners";

const instructorNavItems: DashboardNavItem[] = [
  {
    to: "/instructor/overview",
    icon: LayoutDashboard,
    label: "Overview",
    description: "A cleaner control-room view for teaching activity.",
  },
  {
    to: "/instructor/courses",
    icon: BookOpen,
    label: "Courses",
    description: "Focused course portfolio and class progress tracking.",
  },
  {
    to: "/instructor/sessions",
    icon: Video,
    label: "Sessions",
    description: "Upcoming teaching blocks and recent class history.",
  },
  {
    to: "/instructor/learners",
    icon: Users,
    label: "Learners",
    description: "Student progress, grading, and follow-up signals.",
  },
];

const scheduledSessions: ScheduledSession[] = [
  {
    id: 1,
    title: "AI Coding Lab - Cohort A",
    cohort: "Cohort A",
    studentsCount: 24,
    startTime: "March 31, 2026 · 4:00 PM",
    duration: "90 min",
    meetUrl: "meet.google.com/naz-ai-a1",
    mode: "group",
    sessionType: "scheduled",
    notes: "Review neural networks assignment",
  },
  {
    id: 2,
    title: "Physics Lab Prep Meeting",
    cohort: "Instructors",
    studentsCount: 3,
    startTime: "April 1, 2026 · 10:30 AM",
    duration: "60 min",
    meetUrl: "meet.google.com/naz-phy-prep",
    mode: "group",
    sessionType: "scheduled",
  },
  {
    id: 3,
    title: "1-on-1 Mentorship - Sarah M.",
    cohort: "Individual",
    studentsCount: 1,
    startTime: "April 1, 2026 · 2:00 PM",
    duration: "60 min",
    meetUrl: "meet.google.com/naz-mentor-1",
    mode: "1-on-1",
    sessionType: "scheduled",
  },
  {
    id: 4,
    title: "Robotics Capstone Reviews",
    cohort: "Cohort A",
    studentsCount: 24,
    startTime: "March 29, 2026 · 3:30 PM",
    duration: "120 min",
    meetUrl: "meet.google.com/naz-robot-review",
    mode: "group",
    sessionType: "completed",
  },
];

const teachingCourses: Course[] = [
  {
    id: 1,
    title: "Python for AI",
    category: "Programming",
    students: 48,
    averageProgress: 58,
    sessionsCompleted: 12,
    totalSessions: 24,
    lastUpdated: "March 30, 2026",
  },
  {
    id: 2,
    title: "Robotics Engineering",
    category: "Engineering",
    students: 32,
    averageProgress: 72,
    sessionsCompleted: 18,
    totalSessions: 20,
    lastUpdated: "March 29, 2026",
  },
  {
    id: 3,
    title: "Physics Fundamentals",
    category: "Sciences",
    students: 56,
    averageProgress: 43,
    sessionsCompleted: 8,
    totalSessions: 18,
    lastUpdated: "March 30, 2026",
  },
];

const studentPerformance: StudentPerformance[] = [
  {
    id: 1,
    name: "Alex Johnson",
    course: "Python for AI",
    progress: 78,
    submissions: 8,
    averageGrade: 92,
    status: "excellent",
  },
  {
    id: 2,
    name: "Jordan Lee",
    course: "Robotics Engineering",
    progress: 85,
    submissions: 12,
    averageGrade: 88,
    status: "excellent",
  },
  {
    id: 3,
    name: "Casey White",
    course: "Python for AI",
    progress: 52,
    submissions: 5,
    averageGrade: 75,
    status: "good",
  },
  {
    id: 4,
    name: "Morgan Davis",
    course: "Physics Fundamentals",
    progress: 35,
    submissions: 2,
    averageGrade: 62,
    status: "needs-attention",
  },
  {
    id: 5,
    name: "Taylor Brown",
    course: "Python for AI",
    progress: 18,
    submissions: 1,
    averageGrade: 45,
    status: "at-risk",
  },
];

const pendingGrading: PendingGrading[] = [
  {
    id: 1,
    studentName: "Alex Johnson",
    assignmentTitle: "Neural Network Implementation",
    submittedDate: "March 30, 2026",
    course: "Python for AI",
  },
  {
    id: 2,
    studentName: "Jordan Lee",
    assignmentTitle: "Robotics Capstone Demo",
    submittedDate: "March 29, 2026",
    course: "Robotics Engineering",
  },
  {
    id: 3,
    studentName: "Casey White",
    assignmentTitle: "ML Model Training",
    submittedDate: "March 28, 2026",
    course: "Python for AI",
  },
];

const isInstructorView = (value: string | undefined): value is InstructorView =>
  value === "overview" ||
  value === "courses" ||
  value === "sessions" ||
  value === "learners";

const getStatusColor = (status: StudentPerformance["status"]) => {
  switch (status) {
    case "excellent":
      return "border-emerald-500/20 bg-emerald-500/10";
    case "good":
      return "border-blue-500/20 bg-blue-500/10";
    case "needs-attention":
      return "border-amber-500/20 bg-amber-500/10";
    case "at-risk":
      return "border-rose-500/20 bg-rose-500/10";
    default:
      return "border-white/10 bg-white/[0.03]";
  }
};

const getSessionModeLabel = (mode: ScheduledSession["mode"]) => {
  if (mode === "1-on-1") {
    return "1-on-1";
  }

  if (mode === "class") {
    return "Class";
  }

  return "Group";
};

export function InstructorDashboard() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentView = pathSegments[1];
  const [selectedCourse, setSelectedCourse] = useState(teachingCourses[0].id);

  if (!currentView || pathSegments.length !== 2) {
    return <Navigate to="/instructor/overview" replace />;
  }

  if (!isInstructorView(currentView)) {
    return <Navigate to="/instructor/overview" replace />;
  }

  const upcomingSessions = scheduledSessions.filter(
    (session) => session.sessionType !== "completed",
  );
  const completedSessions = scheduledSessions.filter(
    (session) => session.sessionType === "completed",
  );
  const totalStudents = teachingCourses.reduce(
    (sum, course) => sum + course.students,
    0,
  );
  const averageCourseProgress = Math.round(
    teachingCourses.reduce((sum, course) => sum + course.averageProgress, 0) /
      teachingCourses.length,
  );
  const atRiskStudents = studentPerformance.filter(
    (student) =>
      student.status === "at-risk" || student.status === "needs-attention",
  ).length;
  const excellentStudents = studentPerformance.filter(
    (student) => student.status === "excellent",
  ).length;
  const activeCourse =
    teachingCourses.find((course) => course.id === selectedCourse) ??
    teachingCourses[0];
  const nextSession = upcomingSessions[0] ?? scheduledSessions[0]!;

  const openExternal = (url: string) => {
    const target = url.startsWith("http") ? url : `https://${url}`;
    window.open(target, "_blank", "noopener,noreferrer");
  };

  return (
    <DashboardWorkspaceLayout
      workspaceLabel="Instructor Workspace"
      workspaceName="Amina Yusuf"
      workspaceDescription=""
      navItems={instructorNavItems}
      actions={
        <>
          <Button
            asChild
            size="sm"
            className="rounded-full bg-linear-to-r from-white to-emerald-100 text-slate-950 shadow-[0_18px_48px_-22px_rgba(16,185,129,0.72)] hover:shadow-[0_24px_55px_-24px_rgba(52,211,153,0.82)]"
          >
            <Link to="/instructor/sessions">
              <Plus className="h-4 w-4" />
              Schedule Session
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="hidden rounded-full border-white/15 bg-white/[0.03] sm:inline-flex"
          >
            <Link to="/instructor/learners">
              <Users className="h-4 w-4" />
              View Learners
            </Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="hidden rounded-full border-white/15 bg-white/[0.03] lg:inline-flex"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </>
      }
    >
      {currentView === "overview" ? (
        <InstructorOverviewView
          teachingCourses={teachingCourses}
          selectedCourse={selectedCourse}
          onSelectCourse={setSelectedCourse}
          activeCourse={activeCourse}
          totalStudents={totalStudents}
          averageCourseProgress={averageCourseProgress}
          atRiskStudents={atRiskStudents}
          excellentStudents={excellentStudents}
          nextSession={nextSession}
          pendingGrading={pendingGrading}
          onOpenExternal={openExternal}
        />
      ) : null}

      {currentView === "courses" ? (
        <InstructorCoursesView
          teachingCourses={teachingCourses}
          selectedCourse={selectedCourse}
          onSelectCourse={setSelectedCourse}
          activeCourse={activeCourse}
          totalStudents={totalStudents}
          averageCourseProgress={averageCourseProgress}
        />
      ) : null}

      {currentView === "sessions" ? (
        <InstructorSessionsView
          upcomingSessions={upcomingSessions}
          completedSessions={completedSessions}
          onOpenExternal={openExternal}
        />
      ) : null}

      {currentView === "learners" ? (
        <InstructorLearnersView
          pendingGrading={pendingGrading}
          studentPerformance={studentPerformance}
          atRiskStudents={atRiskStudents}
          excellentStudents={excellentStudents}
        />
      ) : null}
    </DashboardWorkspaceLayout>
  );
}

function InstructorOverviewView({
  teachingCourses,
  selectedCourse,
  onSelectCourse,
  activeCourse,
  totalStudents,
  averageCourseProgress,
  atRiskStudents,
  excellentStudents,
  nextSession,
  pendingGrading,
  onOpenExternal,
}: {
  teachingCourses: Course[];
  selectedCourse: number;
  onSelectCourse: (courseId: number) => void;
  activeCourse: Course;
  totalStudents: number;
  averageCourseProgress: number;
  atRiskStudents: number;
  excellentStudents: number;
  nextSession: ScheduledSession;
  pendingGrading: PendingGrading[];
  onOpenExternal: (url: string) => void;
}) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardMetricCard
          icon={Users}
          label="Total Students"
          value={totalStudents}
          detail="Across active teaching cohorts"
          tone="sky"
        />
        <DashboardMetricCard
          icon={BookOpen}
          label="Active Courses"
          value={teachingCourses.length}
          detail="Each course now has a dedicated view"
          tone="violet"
        />
        <DashboardMetricCard
          icon={TrendingUp}
          label="Average Progress"
          value={`${averageCourseProgress}%`}
          detail="A cleaner signal for overall momentum"
          tone="emerald"
        />
        <DashboardMetricCard
          icon={AlertCircle}
          label="Needs Attention"
          value={atRiskStudents}
          detail="Students who may need support soon"
          tone="rose"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
        <DashboardPanel className="p-5 sm:p-6">
          <SectionHeading
            icon={BookOpen}
            title="Course Spotlight"
            description="Overview now highlights one teaching track, while the full portfolio lives on the Courses page."
          />

          <div className="mt-6 rounded-[26px] border border-violet-400/15 bg-violet-500/[0.08] p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <Badge className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-[11px] text-violet-100">
                  Active focus
                </Badge>
                <h3 className="mt-3 text-2xl font-semibold text-foreground">
                  {activeCourse.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {activeCourse.students} learners are active in this{" "}
                  {activeCourse.category.toLowerCase()} track, with{" "}
                  {activeCourse.sessionsCompleted} of{" "}
                  {activeCourse.totalSessions} live sessions completed so far.
                </p>
              </div>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/[0.03]"
              >
                <Link to="/instructor/courses">
                  Open Course View
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Average progress</span>
                <span className="font-semibold text-foreground">
                  {activeCourse.averageProgress}%
                </span>
              </div>
              <Progress
                value={activeCourse.averageProgress}
                className="h-2 bg-white/10"
              />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Learners
                </p>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                  {activeCourse.students}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Sessions done
                </p>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                  {activeCourse.sessionsCompleted}/{activeCourse.totalSessions}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Last update
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {activeCourse.lastUpdated}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {teachingCourses.map((course) => (
              <button
                key={course.id}
                type="button"
                onClick={() => onSelectCourse(course.id)}
                className={`rounded-[24px] border p-5 text-left transition-colors ${
                  selectedCourse === course.id
                    ? "border-violet-400/20 bg-violet-500/10"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      {course.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {course.category}
                    </p>
                  </div>
                  <Badge className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-foreground">
                    {course.students} learners
                  </Badge>
                </div>

                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Average progress
                    </span>
                    <span className="font-semibold text-foreground">
                      {course.averageProgress}%
                    </span>
                  </div>
                  <Progress
                    value={course.averageProgress}
                    className="h-2 bg-white/10"
                  />
                </div>
              </button>
            ))}
          </div>
        </DashboardPanel>

        <div className="space-y-6">
          <DashboardPanel className="p-5 sm:p-6">
            <SectionHeading
              icon={Video}
              title="Next Session"
              description="Upcoming teaching work gets a dedicated spotlight instead of living deep in a long page."
            />

            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-full border border-sky-400/20 bg-sky-500/10 px-2.5 py-1 text-[11px] text-sky-100">
                  {getSessionModeLabel(nextSession.mode)}
                </Badge>
                <Badge className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-foreground">
                  {nextSession.sessionType}
                </Badge>
              </div>

              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {nextSession.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {nextSession.cohort} • {nextSession.studentsCount} learners
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1.5">
                  <Clock className="h-4 w-4" />
                  {nextSession.startTime}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1.5">
                  <Calendar className="h-4 w-4" />
                  {nextSession.duration}
                </span>
              </div>

              <Button
                className="mt-5 w-full rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                onClick={() => onOpenExternal(nextSession.meetUrl)}
              >
                <Video className="h-4 w-4" />
                Start Session
              </Button>
            </div>
          </DashboardPanel>

          <DashboardPanel className="p-5 sm:p-6">
            <SectionHeading
              icon={FileText}
              title="Action Center"
              description="Operational work stays here, while learner detail lives on its own page."
            />

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Pending grading
                </p>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                  {pendingGrading.length}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Excellent learners
                </p>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                  {excellentStudents}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {pendingGrading.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="rounded-[22px] border border-white/10 bg-black/10 p-4"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {item.studentName}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.assignmentTitle}
                  </p>
                </div>
              ))}
            </div>

            <Button
              asChild
              variant="outline"
              className="mt-5 w-full rounded-full border-white/15 bg-white/[0.03]"
            >
              <Link to="/instructor/learners">Open Learner View</Link>
            </Button>
          </DashboardPanel>
        </div>
      </div>
    </>
  );
}

function InstructorCoursesView({
  teachingCourses,
  selectedCourse,
  onSelectCourse,
  activeCourse,
  totalStudents,
  averageCourseProgress,
}: {
  teachingCourses: Course[];
  selectedCourse: number;
  onSelectCourse: (courseId: number) => void;
  activeCourse: Course;
  totalStudents: number;
  averageCourseProgress: number;
}) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <DashboardMetricCard
          icon={BookOpen}
          label="Courses"
          value={teachingCourses.length}
          detail="Split cleanly from sessions and learner triage"
          tone="violet"
        />
        <DashboardMetricCard
          icon={Users}
          label="Learners"
          value={totalStudents}
          detail="Total active learners across teaching tracks"
          tone="sky"
        />
        <DashboardMetricCard
          icon={TrendingUp}
          label="Average Progress"
          value={`${averageCourseProgress}%`}
          detail="Overall course health at a glance"
          tone="emerald"
        />
      </div>

      <DashboardPanel className="mt-6 p-5 sm:p-6">
        <SectionHeading
          icon={BookOpen}
          title="Course Portfolio"
          description="This page focuses on curriculum health and class performance without mixing in session management."
        />

        <div className="mt-6 rounded-[26px] border border-violet-400/15 bg-violet-500/[0.08] p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <Badge className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-[11px] text-violet-100">
                Selected course
              </Badge>
              <h3 className="mt-3 text-2xl font-semibold text-foreground">
                {activeCourse.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {activeCourse.students} learners are currently enrolled.
                Progress averages {activeCourse.averageProgress}% and the last
                course update was {activeCourse.lastUpdated}.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="rounded-full bg-white text-slate-950 hover:bg-white/90">
                Update Lesson Plan
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white/15 bg-white/[0.03]"
              >
                Message Cohort
              </Button>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Average progress</span>
              <span className="font-semibold text-foreground">
                {activeCourse.averageProgress}%
              </span>
            </div>
            <Progress
              value={activeCourse.averageProgress}
              className="h-2 bg-white/10"
            />
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {teachingCourses.map((course) => (
            <button
              key={course.id}
              type="button"
              onClick={() => onSelectCourse(course.id)}
              className={`rounded-[24px] border p-5 text-left transition-colors ${
                selectedCourse === course.id
                  ? "border-violet-400/20 bg-violet-500/10"
                  : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {course.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {course.category}
                  </p>
                </div>
                <Badge className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-foreground">
                  {course.students} learners
                </Badge>
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Average progress
                  </span>
                  <span className="font-semibold text-foreground">
                    {course.averageProgress}%
                  </span>
                </div>
                <Progress
                  value={course.averageProgress}
                  className="h-2 bg-white/10"
                />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Sessions
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {course.sessionsCompleted}/{course.totalSessions}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Updated
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {course.lastUpdated}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </DashboardPanel>
    </>
  );
}

function InstructorSessionsView({
  upcomingSessions,
  completedSessions,
  onOpenExternal,
}: {
  upcomingSessions: ScheduledSession[];
  completedSessions: ScheduledSession[];
  onOpenExternal: (url: string) => void;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_320px]">
      <DashboardPanel className="p-5 sm:p-6">
        <SectionHeading
          icon={Video}
          title="Teaching Agenda"
          description="Live teaching now has its own page, so session planning is no longer squeezed beside courses and grading."
        />

        <div className="mt-6 space-y-4">
          {upcomingSessions.map((session) => (
            <div
              key={session.id}
              className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      className={`rounded-full border px-2.5 py-1 text-[11px] ${
                        session.mode === "group"
                          ? "border-sky-400/20 bg-sky-500/10 text-sky-100"
                          : "border-violet-400/20 bg-violet-500/10 text-violet-100"
                      }`}
                    >
                      {getSessionModeLabel(session.mode)}
                    </Badge>
                    <Badge className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-foreground">
                      {session.sessionType}
                    </Badge>
                  </div>

                  <h3 className="mt-3 text-lg font-semibold text-foreground">
                    {session.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {session.cohort} • {session.studentsCount} participant
                    {session.studentsCount === 1 ? "" : "s"}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1.5">
                      <Clock className="h-4 w-4" />
                      {session.startTime}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1.5">
                      <Calendar className="h-4 w-4" />
                      {session.duration}
                    </span>
                  </div>

                  {session.notes ? (
                    <p className="mt-4 text-sm text-muted-foreground">
                      Note: {session.notes}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    className="rounded-full border-white/15 bg-white/[0.03]"
                  >
                    Edit Session
                  </Button>
                  <Button
                    className="rounded-full bg-sky-500 text-slate-950 hover:bg-sky-400"
                    onClick={() => onOpenExternal(session.meetUrl)}
                  >
                    <Video className="h-4 w-4" />
                    Start
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button className="mt-5 w-full rounded-full bg-foreground text-background hover:bg-foreground/90">
          <Plus className="h-4 w-4" />
          Schedule Another Session
        </Button>
      </DashboardPanel>

      <div className="space-y-6">
        <DashboardPanel className="p-5 sm:p-6">
          <SectionHeading
            icon={Calendar}
            title="Recent History"
            description="Completed sessions stay visible, but no longer crowd the teaching overview."
          />

          <div className="mt-6 space-y-3">
            {completedSessions.map((session) => (
              <div
                key={session.id}
                className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="text-sm font-semibold text-foreground">
                  {session.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {session.cohort} • {session.startTime}
                </p>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <DashboardPanel className="p-5 sm:p-6">
          <SectionHeading
            icon={TrendingUp}
            title="Session Snapshot"
            description="A few focused numbers are enough for the prototype."
          />

          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Upcoming
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {upcomingSessions.length}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Completed
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {completedSessions.length}
              </p>
            </div>
          </div>
        </DashboardPanel>
      </div>
    </div>
  );
}

function InstructorLearnersView({
  pendingGrading,
  studentPerformance,
  atRiskStudents,
  excellentStudents,
}: {
  pendingGrading: PendingGrading[];
  studentPerformance: StudentPerformance[];
  atRiskStudents: number;
  excellentStudents: number;
}) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <DashboardMetricCard
          icon={FileText}
          label="Pending Grading"
          value={pendingGrading.length}
          detail="Submissions waiting for instructor review"
          tone="amber"
        />
        <DashboardMetricCard
          icon={Users}
          label="Excellent"
          value={excellentStudents}
          detail="Learners currently leading their cohorts"
          tone="emerald"
        />
        <DashboardMetricCard
          icon={AlertCircle}
          label="Needs Follow-up"
          value={atRiskStudents}
          detail="Students who may need outreach or coaching"
          tone="rose"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_360px]">
        <DashboardPanel className="p-5 sm:p-6">
          <SectionHeading
            icon={FileText}
            title="Grading Queue"
            description="This page lets learner support and grading live away from course setup and session planning."
          />

          <div className="mt-6 space-y-4">
            {pendingGrading.map((item) => (
              <div
                key={item.id}
                className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid size-10 place-items-center rounded-2xl border border-amber-400/20 bg-amber-500/10 text-amber-100">
                    <FileText className="h-4 w-4" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {item.studentName}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.assignmentTitle}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {item.course} • Submitted {item.submittedDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <div className="space-y-6">
          <DashboardPanel className="p-5 sm:p-6">
            <SectionHeading
              icon={Users}
              title="Learner Signals"
              description="A quick pulse on who is thriving and who needs intervention."
            />

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100">
                {excellentStudents} excellent
              </Badge>
              <Badge className="rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-xs text-amber-100">
                {
                  studentPerformance.filter(
                    (student) => student.status === "good",
                  ).length
                }{" "}
                good
              </Badge>
              <Badge className="rounded-full border border-rose-400/20 bg-rose-500/10 px-3 py-1 text-xs text-rose-100">
                {atRiskStudents} need follow-up
              </Badge>
            </div>

            <div className="mt-5 space-y-3">
              {studentPerformance.map((student) => (
                <div
                  key={student.id}
                  className={`rounded-[22px] border p-4 ${getStatusColor(student.status)}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {student.name}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {student.course}
                      </p>
                    </div>
                    <Badge className="rounded-full border border-white/10 bg-black/10 px-2.5 py-1 text-[11px] capitalize text-foreground">
                      {student.status.replace("-", " ")}
                    </Badge>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span>Grade {student.averageGrade}%</span>
                    <span>Progress {student.progress}%</span>
                    <span>{student.submissions} submissions</span>
                  </div>
                </div>
              ))}
            </div>
          </DashboardPanel>
        </div>
      </div>
    </>
  );
}
