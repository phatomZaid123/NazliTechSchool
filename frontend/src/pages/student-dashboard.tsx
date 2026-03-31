"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  LayoutDashboard,
  Play,
  Sparkles,
  Star,
  Target,
  Video,
  Zap,
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

type UpcomingClass = {
  id: number;
  title: string;
  instructor: string;
  mode: "group" | "1-on-1" | "self-paced";
  startTime: string;
  duration: string;
  meetUrl: string;
  courseTitle: string;
  status: "upcoming" | "live" | "completed";
};

type Course = {
  id: number;
  title: string;
  category: string;
  progress: number;
  lessons: number;
  completedLessons: number;
  instructor: string;
  nextLesson: string;
  tier: "explorer" | "innovator" | "institution";
};

type Assignment = {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  grade?: number;
  submittedDate?: string;
};

type MentorSession = {
  id: number;
  mentor: string;
  course: string;
  date: string;
  topic: string;
};

type CertificationProgress = {
  name: string;
  progress: number;
  coursesCompleted: number;
  coursesRequired: number;
  earnedDate: string | null;
};

type StudentView = "overview" | "courses" | "schedule" | "assignments";

const studentNavItems: DashboardNavItem[] = [
  {
    to: "/student/overview",
    icon: LayoutDashboard,
    label: "Overview",
    description: "",
  },
  {
    to: "/student/courses",
    icon: BookOpen,
    label: "Courses",
    description: "Dedicated space for active learning tracks and progress.",
  },
  {
    to: "/student/schedule",
    icon: Calendar,
    label: "Schedule",
    description: "Classes, mentorship, and live learning sessions.",
  },
  {
    to: "/student/assignments",
    icon: FileText,
    label: "Assignments",
    description: "Deadlines, submissions, and certificate progress.",
  },
];

const upcomingClasses: UpcomingClass[] = [
  {
    id: 1,
    title: "AI Coding Lab - Cohort A",
    instructor: "Amina Yusuf",
    mode: "group",
    startTime: "March 31, 2026 · 4:00 PM",
    duration: "90 min",
    meetUrl: "meet.google.com/naz-ai-a1",
    courseTitle: "Python for AI",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Physics Lab Simulation",
    instructor: "David Park",
    mode: "self-paced",
    startTime: "Available now",
    duration: "45 min",
    meetUrl: "meet.google.com/naz-phy-lab",
    courseTitle: "Physics Fundamentals",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Advanced Robotics - Mentorship",
    instructor: "Sarah Chen",
    mode: "1-on-1",
    startTime: "April 1, 2026 · 2:00 PM",
    duration: "60 min",
    meetUrl: "meet.google.com/naz-robotics-mentor",
    courseTitle: "Robotics Engineering",
    status: "upcoming",
  },
];

const enrolledCourses: Course[] = [
  {
    id: 1,
    title: "Python for AI",
    category: "Programming",
    progress: 65,
    lessons: 24,
    completedLessons: 16,
    instructor: "Amina Yusuf",
    nextLesson: "Neural Networks Basics",
    tier: "innovator",
  },
  {
    id: 2,
    title: "Physics Fundamentals",
    category: "Sciences",
    progress: 42,
    lessons: 18,
    completedLessons: 7,
    instructor: "David Park",
    nextLesson: "Momentum & Energy",
    tier: "explorer",
  },
  {
    id: 3,
    title: "Robotics Engineering",
    category: "Programming",
    progress: 88,
    lessons: 20,
    completedLessons: 18,
    instructor: "Sarah Chen",
    nextLesson: "Final Capstone Project",
    tier: "innovator",
  },
  {
    id: 4,
    title: "Chemistry Lab & Simulations",
    category: "Sciences",
    progress: 51,
    lessons: 15,
    completedLessons: 8,
    instructor: "Dr. Lisa Wong",
    nextLesson: "Organic Chemistry Intro",
    tier: "innovator",
  },
];

const assignments: Assignment[] = [
  {
    id: 1,
    title: "Build Your First Neural Network",
    course: "Python for AI",
    dueDate: "April 1, 2026",
    status: "pending",
  },
  {
    id: 2,
    title: "Physics Lab Report - Motion",
    course: "Physics Fundamentals",
    dueDate: "March 29, 2026",
    status: "submitted",
    submittedDate: "March 29, 2026",
  },
  {
    id: 3,
    title: "Robotics Capstone - Final Demo",
    course: "Robotics Engineering",
    dueDate: "April 4, 2026",
    status: "pending",
  },
  {
    id: 4,
    title: "Chemistry Virtual Lab",
    course: "Chemistry Lab & Simulations",
    dueDate: "March 30, 2026",
    status: "graded",
    grade: 92,
    submittedDate: "March 30, 2026",
  },
];

const upcomingMentorSessions: MentorSession[] = [
  {
    id: 1,
    mentor: "Sarah Chen",
    course: "Robotics Engineering",
    date: "April 1, 2026 · 2:00 PM",
    topic: "Preparing for Capstone",
  },
];

const certificateProgress: CertificationProgress[] = [
  {
    name: "Innovator Certification",
    progress: 73,
    coursesCompleted: 3,
    coursesRequired: 4,
    earnedDate: null,
  },
];

const isStudentView = (value: string | undefined): value is StudentView =>
  value === "overview" ||
  value === "courses" ||
  value === "schedule" ||
  value === "assignments";

const getClassModeLabel = (mode: UpcomingClass["mode"]) => {
  if (mode === "1-on-1") {
    return "1-on-1";
  }

  if (mode === "self-paced") {
    return "Self-paced";
  }

  return "Group";
};

export function StudentDashboard() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentView = pathSegments[1];

  if (!currentView || pathSegments.length !== 2) {
    return <Navigate to="/student/overview" replace />;
  }

  if (!isStudentView(currentView)) {
    return <Navigate to="/student/overview" replace />;
  }

  const pendingAssignments = assignments.filter(
    (assignment) => assignment.status === "pending",
  );
  const completedAssignments = assignments.filter(
    (assignment) => assignment.status !== "pending",
  ).length;
  const totalProgress = Math.round(
    enrolledCourses.reduce((sum, course) => sum + course.progress, 0) /
      enrolledCourses.length,
  );
  const topCourse = enrolledCourses.reduce((best, course) =>
    course.progress > best.progress ? course : best,
  );
  const nextClass =
    upcomingClasses.find((classItem) => classItem.mode !== "self-paced") ??
    upcomingClasses[0];
  const mentorSession = upcomingMentorSessions[0];
  const primaryCertificate = certificateProgress[0];

  const openExternal = (url: string) => {
    const target = url.startsWith("http") ? url : `https://${url}`;
    window.open(target, "_blank", "noopener,noreferrer");
  };

  return (
    <DashboardWorkspaceLayout
      workspaceLabel="Student Workspace"
      workspaceName="Alex Johnson"
      workspaceDescription=""
      navItems={studentNavItems}
      actions={
        <>
          <Button
            asChild
            size="sm"
            className="rounded-full bg-linear-to-r from-white to-sky-100 text-slate-950 shadow-[0_18px_48px_-22px_rgba(56,189,248,0.72)] hover:shadow-[0_24px_55px_-24px_rgba(96,165,250,0.82)]"
          >
            <Link to="/student/courses">
              Continue Course
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="hidden rounded-full border-white/15 bg-white/[0.03] sm:inline-flex"
          >
            <Link to="/student/schedule">Open Schedule</Link>
          </Button>
        </>
      }
    >
      {currentView === "overview" ? (
        <StudentOverviewView
          courses={enrolledCourses}
          totalProgress={totalProgress}
          pendingAssignments={pendingAssignments}
          nextClass={nextClass}
          topCourse={topCourse}
          mentorSession={mentorSession}
          certificate={primaryCertificate}
          onOpenExternal={openExternal}
        />
      ) : null}

      {currentView === "courses" ? (
        <StudentCoursesView
          courses={enrolledCourses}
          totalProgress={totalProgress}
          certificate={primaryCertificate}
        />
      ) : null}

      {currentView === "schedule" ? (
        <StudentScheduleView
          upcomingClasses={upcomingClasses}
          mentorSession={mentorSession}
          onOpenExternal={openExternal}
        />
      ) : null}

      {currentView === "assignments" ? (
        <StudentAssignmentsView
          assignments={assignments}
          pendingAssignments={pendingAssignments.length}
          completedAssignments={completedAssignments}
          certificate={primaryCertificate}
        />
      ) : null}
    </DashboardWorkspaceLayout>
  );
}

function StudentOverviewView({
  courses,
  totalProgress,
  pendingAssignments,
  nextClass,
  topCourse,
  mentorSession,
  certificate,
  onOpenExternal,
}: {
  courses: Course[];
  totalProgress: number;
  pendingAssignments: Assignment[];
  nextClass: UpcomingClass;
  topCourse: Course;
  mentorSession?: MentorSession;
  certificate: CertificationProgress;
  onOpenExternal: (url: string) => void;
}) {
  const secondaryCourses = courses
    .filter((course) => course.id !== topCourse.id)
    .slice(0, 2);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardMetricCard
          icon={Target}
          label="Overall Progress"
          value={`${totalProgress}%`}
          detail="Across your current learning path"
          tone="emerald"
        />
        <DashboardMetricCard
          icon={BookOpen}
          label="Active Courses"
          value={courses.length}
          detail="Active courses"
          tone="sky"
        />
        <DashboardMetricCard
          icon={AlertCircle}
          label="Pending Tasks"
          value={pendingAssignments.length}
          detail="Assignments that need attention this week"
          tone="amber"
        />
        <DashboardMetricCard
          icon={Zap}
          label="Learning Streak"
          value="12 days"
          detail="Strong momentum"
          tone="rose"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
        <DashboardPanel className="p-5 sm:p-6">
          <SectionHeading
            icon={Sparkles}
            title="Learning Spotlight"
            description="Overview stays concise now, while deeper work lives in Courses, Schedule, and Assignments."
          />

          <div className="mt-6 rounded-[26px] border border-emerald-400/15 bg-emerald-500/[0.08] p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <Badge className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-100">
                  Best momentum
                </Badge>
                <h3 className="mt-3 text-2xl font-semibold text-foreground">
                  {topCourse.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {topCourse.instructor} • {topCourse.category} • Next up:{" "}
                  {topCourse.nextLesson}
                </p>
              </div>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-white/[0.03]"
              >
                <Link to="/student/courses">
                  Resume Course
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Course progress</span>
                <span className="font-semibold text-foreground">
                  {topCourse.progress}%
                </span>
              </div>
              <Progress
                value={topCourse.progress}
                className="h-2 bg-white/10"
              />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Lessons completed
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {topCourse.completedLessons}/{topCourse.lessons}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Next lesson
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {topCourse.nextLesson}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {secondaryCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      {course.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {course.instructor} • {course.category}
                    </p>
                  </div>
                  <Badge className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-foreground">
                    {course.tier === "innovator" ? "Innovator" : "Explorer"}
                  </Badge>
                </div>

                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-foreground">
                      {course.progress}%
                    </span>
                  </div>
                  <Progress
                    value={course.progress}
                    className="h-2 bg-white/10"
                  />
                </div>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <div className="space-y-6">
          <DashboardPanel className="p-5 sm:p-6">
            <SectionHeading
              icon={Calendar}
              title="Today"
              description="The next live session and mentorship touchpoint sit here instead of competing with every other module."
            />

            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-full border border-sky-400/20 bg-sky-500/10 px-2.5 py-1 text-[11px] text-sky-100">
                  {getClassModeLabel(nextClass.mode)}
                </Badge>
                <Badge className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-foreground">
                  {nextClass.status === "live" ? "Live now" : "Upcoming"}
                </Badge>
              </div>

              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {nextClass.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {nextClass.instructor} • {nextClass.courseTitle}
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1.5">
                  <Clock className="h-4 w-4" />
                  {nextClass.startTime}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1.5">
                  <Calendar className="h-4 w-4" />
                  {nextClass.duration}
                </span>
              </div>

              <Button
                className="mt-5 w-full rounded-full bg-sky-500 text-slate-950 hover:bg-sky-400"
                onClick={() => onOpenExternal(nextClass.meetUrl)}
              >
                <Play className="h-4 w-4" />
                Join Session
              </Button>
            </div>

            {mentorSession ? (
              <div className="mt-4 rounded-[24px] border border-violet-400/20 bg-violet-500/10 p-5">
                <p className="text-sm font-medium text-violet-100">
                  Mentorship
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {mentorSession.mentor}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {mentorSession.topic}
                </p>

                <Button
                  asChild
                  variant="outline"
                  className="mt-4 w-full rounded-full border-white/15 bg-white/[0.03]"
                >
                  <Link to="/student/schedule">Open Full Schedule</Link>
                </Button>
              </div>
            ) : null}
          </DashboardPanel>

          <DashboardPanel className="p-5 sm:p-6">
            <SectionHeading
              icon={Target}
              title="Immediate Tasks"
              description="Assignments now have their own page, so overview only shows what needs attention first."
            />

            <div className="mt-6 space-y-3">
              {pendingAssignments.slice(0, 3).map((assignment) => (
                <div
                  key={assignment.id}
                  className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 grid size-9 place-items-center rounded-2xl border border-amber-400/20 bg-amber-500/10 text-amber-100">
                      <AlertCircle className="h-4 w-4" />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        {assignment.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {assignment.course}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-amber-100">
                        Due {assignment.dueDate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              asChild
              variant="outline"
              className="mt-5 w-full rounded-full border-white/15 bg-white/[0.03]"
            >
              <Link to="/student/assignments">View All Assignments</Link>
            </Button>
          </DashboardPanel>

          <DashboardPanel className="p-5 sm:p-6">
            <SectionHeading
              icon={Award}
              title="Certification"
              description="Progress remains visible, but it no longer clutters daily learning tasks."
            />

            <div className="mt-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {certificate.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {certificate.coursesCompleted} of{" "}
                    {certificate.coursesRequired} courses completed
                  </p>
                </div>
                <Badge className="rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-xs text-amber-100">
                  {certificate.progress}% complete
                </Badge>
              </div>

              <div className="mt-4 space-y-2">
                <Progress
                  value={certificate.progress}
                  className="h-2 bg-white/10"
                />
                <p className="text-sm text-muted-foreground">
                  One more strong course finish unlocks the review step.
                </p>
              </div>
            </div>
          </DashboardPanel>
        </div>
      </div>
    </>
  );
}

function StudentCoursesView({
  courses,
  totalProgress,
  certificate,
}: {
  courses: Course[];
  totalProgress: number;
  certificate: CertificationProgress;
}) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <DashboardMetricCard
          icon={BookOpen}
          label="Active Courses"
          value={courses.length}
          detail="Each course now gets more room to breathe"
          tone="sky"
        />
        <DashboardMetricCard
          icon={Target}
          label="Average Progress"
          value={`${totalProgress}%`}
          detail="A cleaner read on your overall learning pace"
          tone="emerald"
        />
        <DashboardMetricCard
          icon={Award}
          label="Certification Track"
          value={`${certificate.progress}%`}
          detail="Progress toward your innovator badge"
          tone="amber"
        />
      </div>

      <DashboardPanel className="mt-6 p-5 sm:p-6">
        <SectionHeading
          icon={BookOpen}
          title="Course Library"
          description="This page focuses only on enrolled courses, so students are not forced to process schedule and assignments at the same time."
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course.id}
              className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {course.title}
                    </h3>
                    <Badge
                      className={`rounded-full border px-2.5 py-1 text-[11px] ${
                        course.tier === "innovator"
                          ? "border-violet-400/20 bg-violet-500/10 text-violet-100"
                          : "border-sky-400/20 bg-sky-500/10 text-sky-100"
                      }`}
                    >
                      {course.tier === "innovator" ? "Innovator" : "Explorer"}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {course.instructor} • {course.category}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-white/15 bg-white/[0.03]"
                >
                  Resume
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {course.completedLessons} of {course.lessons} lessons
                    complete
                  </span>
                  <span className="font-semibold text-foreground">
                    {course.progress}%
                  </span>
                </div>
                <Progress value={course.progress} className="h-2 bg-white/10" />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Next lesson
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {course.nextLesson}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Category
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {course.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardPanel>
    </>
  );
}

function StudentScheduleView({
  upcomingClasses,
  mentorSession,
  onOpenExternal,
}: {
  upcomingClasses: UpcomingClass[];
  mentorSession?: MentorSession;
  onOpenExternal: (url: string) => void;
}) {
  const [selectedMode, setSelectedMode] = useState<
    "all" | "group" | "1-on-1" | "self-paced"
  >("all");

  const filteredClasses =
    selectedMode === "all"
      ? upcomingClasses
      : upcomingClasses.filter((classItem) => classItem.mode === selectedMode);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_320px]">
      <DashboardPanel className="p-5 sm:p-6">
        <SectionHeading
          icon={Calendar}
          title="Class Schedule"
          description="Navigation lets schedule live on its own page, which makes this view feel much more intentional and less cramped."
        />

        <div className="mt-6 flex flex-wrap gap-2">
          {(["all", "group", "1-on-1", "self-paced"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setSelectedMode(mode)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                selectedMode === mode
                  ? "border-sky-400/20 bg-sky-500/10 text-sky-100"
                  : "border-white/10 bg-white/[0.03] text-muted-foreground hover:bg-white/[0.05]"
              }`}
            >
              {mode === "all"
                ? "All formats"
                : mode === "self-paced"
                  ? "Self-paced"
                  : mode}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {filteredClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full border border-sky-400/20 bg-sky-500/10 px-2.5 py-1 text-[11px] text-sky-100">
                      {getClassModeLabel(classItem.mode)}
                    </Badge>
                    <Badge className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-foreground">
                      {classItem.status === "live" ? "Live now" : "Upcoming"}
                    </Badge>
                  </div>

                  <h3 className="mt-3 text-lg font-semibold text-foreground">
                    {classItem.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {classItem.instructor} • {classItem.courseTitle}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1.5">
                      <Clock className="h-4 w-4" />
                      {classItem.startTime}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1.5">
                      <Calendar className="h-4 w-4" />
                      {classItem.duration}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    className="rounded-full border-white/15 bg-white/[0.03]"
                  >
                    Details
                  </Button>
                  <Button
                    className="rounded-full bg-sky-500 text-slate-950 hover:bg-sky-400"
                    onClick={() => onOpenExternal(classItem.meetUrl)}
                  >
                    <Video className="h-4 w-4" />
                    Join
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardPanel>

      <div className="space-y-6">
        {mentorSession ? (
          <DashboardPanel className="p-5 sm:p-6">
            <SectionHeading
              icon={Star}
              title="Mentorship"
              description="Dedicated space for coaching makes support feel more premium."
            />

            <div className="mt-6 rounded-[24px] border border-violet-400/20 bg-violet-500/10 p-5">
              <p className="text-sm font-medium text-violet-100">
                {mentorSession.topic}
              </p>
              <p className="mt-2 text-xl font-semibold text-foreground">
                {mentorSession.mentor}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {mentorSession.course}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {mentorSession.date}
              </p>
            </div>
          </DashboardPanel>
        ) : null}

        <DashboardPanel className="p-5 sm:p-6">
          <SectionHeading
            icon={Target}
            title="Weekly Rhythm"
            description="Simple summaries keep the prototype useful without becoming complex."
          />

          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Live sessions
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {
                  upcomingClasses.filter(
                    (classItem) => classItem.mode !== "self-paced",
                  ).length
                }
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Self-paced labs
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {
                  upcomingClasses.filter(
                    (classItem) => classItem.mode === "self-paced",
                  ).length
                }
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                1-on-1 support
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {
                  upcomingClasses.filter(
                    (classItem) => classItem.mode === "1-on-1",
                  ).length
                }
              </p>
            </div>
          </div>
        </DashboardPanel>
      </div>
    </div>
  );
}

function StudentAssignmentsView({
  assignments,
  pendingAssignments,
  completedAssignments,
  certificate,
}: {
  assignments: Assignment[];
  pendingAssignments: number;
  completedAssignments: number;
  certificate: CertificationProgress;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_320px]">
      <DashboardPanel className="p-5 sm:p-6">
        <SectionHeading
          icon={FileText}
          title="Assignment Center"
          description="This page now handles deadlines and submission status on its own, which keeps the dashboard cleaner."
        />

        <div className="mt-6 space-y-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-foreground">
                      {assignment.title}
                    </h3>
                    <Badge
                      className={`rounded-full border px-2.5 py-1 text-[11px] ${
                        assignment.status === "graded"
                          ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
                          : assignment.status === "submitted"
                            ? "border-sky-400/20 bg-sky-500/10 text-sky-100"
                            : "border-amber-400/20 bg-amber-500/10 text-amber-100"
                      }`}
                    >
                      {assignment.status}
                    </Badge>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {assignment.course}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Deadline
                  </p>
                  <p className="mt-2 font-medium text-foreground">
                    {assignment.dueDate}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                {assignment.submittedDate ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    Submitted {assignment.submittedDate}
                  </span>
                ) : null}
                {assignment.grade ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-emerald-100">
                    Grade {assignment.grade}%
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </DashboardPanel>

      <div className="space-y-6">
        <DashboardPanel className="p-5 sm:p-6">
          <SectionHeading
            icon={Target}
            title="Status"
            description="Quick counts keep students oriented before they dive into the list."
          />

          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Pending
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {pendingAssignments}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Submitted or graded
              </p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {completedAssignments}
              </p>
            </div>
          </div>
        </DashboardPanel>

        <DashboardPanel className="p-5 sm:p-6">
          <SectionHeading
            icon={Award}
            title="Certification Track"
            description="Certificate progress sits beside assignments instead of competing with the whole dashboard."
          />

          <div className="mt-6 rounded-[24px] border border-amber-400/20 bg-amber-500/10 p-5">
            <p className="text-lg font-semibold text-foreground">
              {certificate.name}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {certificate.coursesCompleted} of {certificate.coursesRequired}{" "}
              courses completed
            </p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold text-foreground">
                  {certificate.progress}%
                </span>
              </div>
              <Progress
                value={certificate.progress}
                className="h-2 bg-white/10"
              />
            </div>
          </div>
        </DashboardPanel>
      </div>
    </div>
  );
}
