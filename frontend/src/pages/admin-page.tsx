"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  Bell,
  Calendar,
  ExternalLink,
  FileText,
  Globe,
  Instagram,
  LayoutDashboard,
  Linkedin,
  Link2,
  Megaphone,
  MessageSquare,
  Pencil,
  RefreshCw,
  Save,
  Search,
  SendHorizontal,
  Settings,
  ShieldCheck,
  Trash2,
  Upload,
  Video,
  X,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

type LandingVideo = {
  id: number;
  title: string;
  section: string;
  views: string;
  publishDate: string;
  workflowStatus: "live" | "scheduled" | "draft";
  featured: boolean;
  thumbnail: string;
};

type LandingPost = {
  id: number;
  platform: string;
  handle: string;
  title: string;
  preview: string;
  destination: string;
  publishAt: string;
  workflowStatus: "live" | "scheduled" | "draft";
  featured: boolean;
};

type MeetingItem = {
  id: number;
  title: string;
  audience: string;
  host: string;
  hostEmail: string;
  invitees: string;
  calendarName: string;
  slot: string;
  meetUrl: string;
  workflowStatus: "scheduled" | "draft" | "sent";
  inviteState: string;
  note: string;
};

interface NavItem {
  icon: LucideIcon;
  label: string;
  description: string;
}

const sidebarItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", description: "Overview" },
  { icon: Globe, label: "Landing Page", description: "Homepage content" },
  { icon: Calendar, label: "Meetings", description: "Google Meet" },
  { icon: FileText, label: "Content", description: "Social sync" },
  { icon: BarChart3, label: "Analytics", description: "Performance" },
  { icon: Settings, label: "Settings", description: "Controls" },
];

const mobileNavItems = sidebarItems.slice(0, 4);

const videoGradients = [
  "from-slate-700 to-slate-900",
  "from-cyan-600 to-sky-800",
  "from-emerald-600 to-teal-800",
  "from-amber-500 to-orange-700",
  "from-fuchsia-600 to-rose-800",
];

const initialLandingVideos: LandingVideo[] = [
  {
    id: 1,
    title: "Girls in Robotics win regional challenge",
    section: "Student Achievements",
    views: "12.4K",
    publishDate: "March 26, 2026",
    workflowStatus: "live",
    featured: true,
    thumbnail: videoGradients[0],
  },
  {
    id: 2,
    title: "Hackathon 2026 highlights reel",
    section: "Student Achievements",
    views: "8.1K",
    publishDate: "March 28, 2026",
    workflowStatus: "scheduled",
    featured: true,
    thumbnail: videoGradients[1],
  },
  {
    id: 3,
    title: "AI Coding Lab demo day",
    section: "Student Achievements",
    views: "4.9K",
    publishDate: "March 30, 2026",
    workflowStatus: "draft",
    featured: false,
    thumbnail: videoGradients[2],
  },
  {
    id: 4,
    title: "Physics lab momentum challenge",
    section: "Student Achievements",
    views: "6.2K",
    publishDate: "April 2, 2026",
    workflowStatus: "scheduled",
    featured: false,
    thumbnail: videoGradients[3],
  },
];

const initialLandingPosts: LandingPost[] = [
  {
    id: 1,
    platform: "Instagram",
    handle: "@nazli.tech",
    title: "Achievement carousel for robotics winners",
    preview: "Students celebrate the robotics challenge win with a short caption and a landing-page card preview.",
    destination: "Social Wall",
    publishAt: "March 26, 2026 · 6:00 PM",
    workflowStatus: "live",
    featured: true,
  },
  {
    id: 2,
    platform: "LinkedIn",
    handle: "Nazli Tech School",
    title: "Partnership announcement with internship partners",
    preview: "A partnership post that can be featured on the landing page with the LinkedIn school handle.",
    destination: "Social Wall",
    publishAt: "March 27, 2026 · 9:00 AM",
    workflowStatus: "scheduled",
    featured: true,
  },
  {
    id: 3,
    platform: "YouTube",
    handle: "@nazlitechclassroom",
    title: "Student showcase teaser clip",
    preview: "A video teaser preview for the landing social wall before the full YouTube publish goes live.",
    destination: "Social Wall",
    publishAt: "March 29, 2026 · 2:00 PM",
    workflowStatus: "draft",
    featured: false,
  },
  {
    id: 4,
    platform: "X / Twitter",
    handle: "@nazlitech",
    title: "Daily classroom update",
    preview: "A short classroom update that can be featured quickly when you want a lighter social post on the homepage.",
    destination: "Social Wall",
    publishAt: "April 1, 2026 · 12:00 PM",
    workflowStatus: "draft",
    featured: false,
  },
];

const defaultMeetingDraft: Omit<MeetingItem, "id"> = {
  title: "AI Coding Lab Cohort A",
  audience: "Students",
  host: "Amina Yusuf",
  hostEmail: "amina.yusuf@nazlitech.com",
  invitees: "Cohort A students",
  calendarName: "Nazli Classes Calendar",
  slot: "March 26, 2026 · 4:00 PM",
  meetUrl: "meet.google.com/naz-ai-a1",
  workflowStatus: "scheduled",
  inviteState: "Invites ready",
  note: "Creates the calendar event, keeps the host and students attached, and shows the launch button on the student dashboard.",
};

const initialMeetings: MeetingItem[] = [
  {
    id: 1,
    ...defaultMeetingDraft,
  },
  {
    id: 2,
    title: "Physics Lab Instructor Prep",
    audience: "Instructors",
    host: "David Park",
    hostEmail: "david.park@nazlitech.com",
    invitees: "Physics instructors",
    calendarName: "Nazli Faculty Calendar",
    slot: "March 27, 2026 · 10:30 AM",
    meetUrl: "meet.google.com/naz-phy-prep",
    workflowStatus: "draft",
    inviteState: "Draft invite only",
    note: "Use this for teaching prep and experiment coordination before class.",
  },
  {
    id: 3,
    title: "Parent Progress Briefing",
    audience: "Families",
    host: "Nazli Admin Team",
    hostEmail: "admin@nazlitech.com",
    invitees: "Families mailing list",
    calendarName: "Nazli Families Calendar",
    slot: "March 29, 2026 · 2:00 PM",
    meetUrl: "meet.google.com/naz-parent-brief",
    workflowStatus: "sent",
    inviteState: "Invites sent",
    note: "Reminder has been sent with a clear external-Meet launch button.",
  },
];

const meetingChecklist = [
  "Class title and audience",
  "Host name and organizer email",
  "Invitees or student group",
  "Calendar destination and invite status",
  "Exact date and time",
  "Google Meet link and launch note",
];

const viewMeta: Record<string, { title: string; subtitle: string }> = {
  Dashboard: {
    title: "Admin Dashboard",
    subtitle: "Homepage content, meetings, and publishing status.",
  },
  "Landing Page": {
    title: "Landing Page",
    subtitle: "Manage videos, social blocks, and homepage visibility.",
  },
  Meetings: {
    title: "Google Meet Sessions",
    subtitle: "Schedule meetings from the website with Google Calendar-style host and attendee controls.",
  },
  Content: {
    title: "Channel Sync",
    subtitle: "Link YouTube and social accounts and queue synchronized posts.",
  },
  Analytics: {
    title: "Analytics",
    subtitle: "Prototype metrics for publishing and launch activity.",
  },
  Settings: {
    title: "Settings",
    subtitle: "Visibility and approval controls.",
  },
};

function getSocialPlatformMeta(platform: string): {
  handle: string;
  icon: LucideIcon;
  accent: string;
} {
  switch (platform) {
    case "Instagram":
      return {
        handle: "@nazli.tech",
        icon: Instagram,
        accent: "border-pink-500/20 bg-pink-500/10 text-pink-300",
      };
    case "LinkedIn":
      return {
        handle: "Nazli Tech School",
        icon: Linkedin,
        accent: "border-sky-500/20 bg-sky-500/10 text-sky-300",
      };
    case "YouTube":
      return {
        handle: "@nazlitechclassroom",
        icon: Youtube,
        accent: "border-red-500/20 bg-red-500/10 text-red-300",
      };
    case "X / Twitter":
      return {
        handle: "@nazlitech",
        icon: Globe,
        accent: "border-border/50 bg-background/70 text-muted-foreground",
      };
    default:
      return {
        handle: "@nazlitech",
        icon: Globe,
        accent: "border-border/50 bg-background/70 text-muted-foreground",
      };
  }
}

export function AdminPage() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [landingVideos, setLandingVideos] = useState(initialLandingVideos);
  const [landingPosts, setLandingPosts] = useState(initialLandingPosts);
  const [meetings, setMeetings] = useState(initialMeetings);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadFeatured, setUploadFeatured] = useState(true);
  const [editingVideoId, setEditingVideoId] = useState<number | null>(null);
  const [editingVideoTitle, setEditingVideoTitle] = useState("");
  const [meetingDraft, setMeetingDraft] = useState(defaultMeetingDraft);

  const featuredVideos = useMemo(
    () => landingVideos.filter((video) => video.featured),
    [landingVideos],
  );
  const featuredPosts = useMemo(
    () => landingPosts.filter((post) => post.featured),
    [landingPosts],
  );
  const scheduledMeetings = useMemo(
    () => meetings.filter((meeting) => meeting.workflowStatus === "scheduled"),
    [meetings],
  );
  const draftItems = useMemo(
    () =>
      landingVideos.filter((video) => video.workflowStatus === "draft").length +
      landingPosts.filter((post) => post.workflowStatus === "draft").length +
      meetings.filter((meeting) => meeting.workflowStatus === "draft").length,
    [landingPosts, landingVideos, meetings],
  );

  const stats = [
    {
      label: "Videos",
      value: String(landingVideos.length),
      detail: `${featuredVideos.length} visible on homepage`,
      icon: Video,
      accent: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      label: "Social Posts",
      value: String(landingPosts.length),
      detail: `${featuredPosts.length} visible on homepage`,
      icon: Megaphone,
      accent: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Meet Sessions",
      value: String(meetings.length),
      detail: `${scheduledMeetings.length} scheduled`,
      icon: Calendar,
      accent: "text-amber-300 bg-amber-500/10 border-amber-500/20",
    },
    {
      label: "Drafts",
      value: String(draftItems),
      detail: "need review",
      icon: FileText,
      accent: "text-rose-300 bg-rose-500/10 border-rose-500/20",
    },
  ];

  const currentView = viewMeta[activeItem] || viewMeta.Dashboard;

  const toggleLandingVideo = (id: number, checked: boolean) => {
    setLandingVideos((current) =>
      current.map((video) =>
        video.id === id ? { ...video, featured: checked } : video,
      ),
    );
  };

  const toggleLandingPost = (id: number, checked: boolean) => {
    setLandingPosts((current) =>
      current.map((post) =>
        post.id === id ? { ...post, featured: checked } : post,
      ),
    );
  };

  const addLandingVideo = () => {
    const title = uploadTitle.trim();

    if (!title) {
      return;
    }

    const nextId = Math.max(0, ...landingVideos.map((video) => video.id)) + 1;

    setLandingVideos((current) => [
      {
        id: nextId,
        title,
        section: "Student Achievements",
        views: "0",
        publishDate: "March 25, 2026",
        workflowStatus: uploadFeatured ? "live" : "draft",
        featured: uploadFeatured,
        thumbnail: videoGradients[nextId % videoGradients.length],
      },
      ...current,
    ]);

    setUploadTitle("");
    setUploadFeatured(true);
  };

  const startVideoTitleEdit = (id: number, title: string) => {
    setEditingVideoId(id);
    setEditingVideoTitle(title);
  };

  const cancelVideoTitleEdit = () => {
    setEditingVideoId(null);
    setEditingVideoTitle("");
  };

  const saveVideoTitle = (id: number) => {
    const title = editingVideoTitle.trim();

    if (!title) {
      return;
    }

    setLandingVideos((current) =>
      current.map((video) => (video.id === id ? { ...video, title } : video)),
    );
    cancelVideoTitleEdit();
  };

  const deleteLandingVideo = (id: number) => {
    setLandingVideos((current) => current.filter((video) => video.id !== id));

    if (editingVideoId === id) {
      cancelVideoTitleEdit();
    }
  };

  const loadMeetingTemplate = (meeting: MeetingItem) => {
    const { id: _id, ...template } = meeting;
    setMeetingDraft(template);
  };

  const updateMeetingDraft = <K extends keyof Omit<MeetingItem, "id">>(
    field: K,
    value: Omit<MeetingItem, "id">[K],
  ) => {
    setMeetingDraft((current) => ({ ...current, [field]: value }));
  };

  const createMeeting = () => {
    const title = meetingDraft.title.trim();
    const host = meetingDraft.host.trim();
    const hostEmail = meetingDraft.hostEmail.trim();
    const invitees = meetingDraft.invitees.trim();
    const calendarName = meetingDraft.calendarName.trim();
    const slot = meetingDraft.slot.trim();
    const meetUrl = meetingDraft.meetUrl.trim();

    if (!title || !host || !hostEmail || !invitees || !calendarName || !slot || !meetUrl) {
      return;
    }

    const nextId = Math.max(0, ...meetings.map((meeting) => meeting.id)) + 1;

    setMeetings((current) => [
      {
        id: nextId,
        title,
        audience: meetingDraft.audience,
        host,
        hostEmail,
        invitees,
        calendarName,
        slot,
        meetUrl,
        workflowStatus: meetingDraft.workflowStatus,
        inviteState: meetingDraft.inviteState.trim() || "Invites ready",
        note:
          meetingDraft.note.trim() ||
          "Creates the calendar event, keeps the host and attendees attached, and shows the launch button on the website.",
      },
      ...current,
    ]);
  };

  const resetMeetingDraft = () => {
    setMeetingDraft(defaultMeetingDraft);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 self-start overflow-y-auto border-r border-border/50 bg-card/35 lg:flex lg:flex-col">
          <div className="border-b border-border/50 px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-sm font-bold text-slate-950">
                NT
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Nazli Tech
                </p>
                <h1 className="text-lg font-semibold text-foreground">
                  Admin Portal
                </h1>
              </div>
            </div>
          </div>

          <div className="flex-1 px-4 py-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveItem(item.label)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                    activeItem === item.label
                      ? "border-amber-500/30 bg-amber-500/10 text-foreground"
                      : "border-transparent text-muted-foreground hover:border-border/50 hover:bg-background/70 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-inherit/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-border/50 bg-background/88 backdrop-blur-xl">
            <div className="grid gap-3 px-4 py-4 md:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-8">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.22em] text-amber-100/80">
                  Nazli Tech admin
                </p>
                <h2 className="mt-2 truncate bg-linear-to-r from-white via-slate-100 to-amber-100 bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
                  {currentView.title}
                </h2>
                <p className="mt-1 hidden max-w-xl text-sm text-muted-foreground md:block">
                  {currentView.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <div className="relative hidden min-w-0 xl:block xl:w-60">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="h-10 rounded-full border-border/50 bg-card/60 pl-9"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="hidden h-10 w-10 rounded-full border-border/50 bg-card/60 sm:inline-flex"
                >
                  <Bell className="h-4 w-4" />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-10 rounded-full border-border/50 bg-card/60"
                >
                  <Link to="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  Log out
                  </Link>
                </Button>
              </div>
            </div>
          </header>

          <div className="flex-1 px-4 pb-24 pt-6 md:px-6 lg:px-8">
            <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl border border-border/50 bg-card/65 p-5 shadow-[0_18px_50px_-38px_rgba(245,158,11,0.22)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="mt-3 bg-linear-to-r from-white to-slate-200 bg-clip-text text-3xl font-semibold text-transparent">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${stat.accent}`}
                    >
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {stat.detail}
                  </p>
                </motion.div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeItem === "Dashboard" && (
                  <DashboardPanel
                    landingVideos={landingVideos}
                    featuredPosts={featuredPosts}
                    scheduledMeetings={scheduledMeetings}
                    totalVisible={featuredVideos.length + featuredPosts.length}
                  />
                )}

                {activeItem === "Landing Page" && (
                  <LandingPagePanel
                    landingVideos={landingVideos}
                    landingPosts={landingPosts}
                    uploadTitle={uploadTitle}
                    uploadFeatured={uploadFeatured}
                    editingVideoId={editingVideoId}
                    editingVideoTitle={editingVideoTitle}
                    onUploadTitleChange={setUploadTitle}
                    onUploadFeaturedChange={setUploadFeatured}
                    onAddVideo={addLandingVideo}
                    onToggleVideo={toggleLandingVideo}
                    onTogglePost={toggleLandingPost}
                    onStartVideoTitleEdit={startVideoTitleEdit}
                    onEditVideoTitleChange={setEditingVideoTitle}
                    onSaveVideoTitle={saveVideoTitle}
                    onCancelVideoTitleEdit={cancelVideoTitleEdit}
                    onDeleteVideo={deleteLandingVideo}
                  />
                )}

                {activeItem === "Meetings" && (
                  <MeetingsPanel
                    meetings={meetings}
                    meetingDraft={meetingDraft}
                    meetingTemplates={initialMeetings}
                    onLoadTemplate={loadMeetingTemplate}
                    onMeetingDraftChange={updateMeetingDraft}
                    onCreateMeeting={createMeeting}
                    onResetDraft={resetMeetingDraft}
                  />
                )}

                {activeItem === "Content" && <ContentPanel />}
                {activeItem === "Analytics" && <AnalyticsPanel />}
                {activeItem === "Settings" && <SettingsPanel />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <MobileAdminNav activeItem={activeItem} onNavigate={setActiveItem} />
    </main>
  );
}

function DashboardPanel({
  landingVideos,
  featuredPosts,
  scheduledMeetings,
  totalVisible,
}: {
  landingVideos: LandingVideo[];
  featuredPosts: LandingPost[];
  scheduledMeetings: MeetingItem[];
  totalVisible: number;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="flex space-y-6 ">
        <section className=" flex-1 rounded-2xl border border-border/50 bg-card/55 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Homepage queue
            </h3>
            <Badge
              variant="outline"
              className="border-border/50 bg-background/60 text-foreground"
            >
              {landingVideos.length} videos
            </Badge>
          </div>
          <div className="space-y-3">
            {landingVideos.map((video) => (
              <div
                key={video.id}
                className="rounded-2xl border border-border/40 bg-background/60 p-4"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex min-w-0 items-center gap-4">
                    <div
                      className={`h-14 w-24 shrink-0 rounded-xl bg-linear-to-br ${video.thumbnail}`}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {video.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {video.section} · {video.publishDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <VisibilityPill visible={video.featured} />
                    <StatusPill status={video.workflowStatus} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex-1 rounded-2xl border border-border/50 bg-card/55 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Upcoming Google Meet Sessions
            </h3>
            <Badge
              variant="outline"
              className="border-border/50 bg-background/60 text-foreground"
            >
              {scheduledMeetings.length} scheduled
            </Badge>
          </div>
          <div className="space-y-3">
            {scheduledMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="rounded-2xl border border-border/40 bg-background/60 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {meeting.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {meeting.host} · {meeting.audience}
                    </p>
                  </div>
                  <StatusPill status={meeting.workflowStatus} />
                </div>
                <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <p className="text-sm text-muted-foreground">
                    {meeting.slot}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-border/50 bg-background/60"
                  >
                    <a
                      href={`https://${meeting.meetUrl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Preview launch button
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function LandingPagePanel({
  landingVideos,
  landingPosts,
  uploadTitle,
  uploadFeatured,
  editingVideoId,
  editingVideoTitle,
  onUploadTitleChange,
  onUploadFeaturedChange,
  onAddVideo,
  onToggleVideo,
  onTogglePost,
  onStartVideoTitleEdit,
  onEditVideoTitleChange,
  onSaveVideoTitle,
  onCancelVideoTitleEdit,
  onDeleteVideo,
}: {
  landingVideos: LandingVideo[];
  landingPosts: LandingPost[];
  uploadTitle: string;
  uploadFeatured: boolean;
  editingVideoId: number | null;
  editingVideoTitle: string;
  onUploadTitleChange: (value: string) => void;
  onUploadFeaturedChange: (value: boolean) => void;
  onAddVideo: () => void;
  onToggleVideo: (id: number, checked: boolean) => void;
  onTogglePost: (id: number, checked: boolean) => void;
  onStartVideoTitleEdit: (id: number, title: string) => void;
  onEditVideoTitleChange: (value: string) => void;
  onSaveVideoTitle: (id: number) => void;
  onCancelVideoTitleEdit: () => void;
  onDeleteVideo: (id: number) => void;
}) {
  const featuredSocialPosts = landingPosts.filter((post) => post.featured);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-6">
        <section className="rounded-2xl border border-border/50 bg-card/55 p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Quick Upload
            </h3>
            <Badge
              variant="outline"
              className="border-border/50 bg-background/60 text-foreground"
            >
              Student Achievements
            </Badge>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
            <div>
              <label className="text-sm font-medium text-foreground">
                Video title
              </label>
              <Input
                value={uploadTitle}
                onChange={(event) => onUploadTitleChange(event.target.value)}
                placeholder="New landing page video"
                className="mt-2 h-11 rounded-xl border-border/50 bg-background/60"
              />
            </div>

            <div className="rounded-2xl border border-border/40 bg-background/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Homepage visibility
              </p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Show after upload
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Turn off to keep the video in draft.
                  </p>
                </div>
                <Switch
                  checked={uploadFeatured}
                  onCheckedChange={onUploadFeaturedChange}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={onAddVideo} className="rounded-xl">
              <Upload className="mr-2 h-4 w-4" />
              Add video
            </Button>
            <Button
              variant="outline"
              className="rounded-xl border-border/50"
              onClick={() => {
                onUploadTitleChange("");
                onUploadFeaturedChange(true);
              }}
            >
              Clear
            </Button>
          </div>
        </section>

        <section className="rounded-2xl border border-border/50 bg-card/55 p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Homepage videos
            </h3>
            <Badge
              variant="outline"
              className="border-border/50 bg-background/60 text-foreground"
            >
              {landingVideos.length} items
            </Badge>
          </div>

          <div className="space-y-3">
            {landingVideos.map((video) => {
              const isEditing = editingVideoId === video.id;

              return (
                <div
                  key={video.id}
                  className="rounded-2xl border border-border/40 bg-background/60 p-4"
                >
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                    <div
                      className={"h-16 w-28 shrink-0 rounded-xl bg-linear-to-br " + video.thumbnail}
                    />

                    <div className="min-w-0 flex-1">
                      {isEditing ? (
                        <Input
                          value={editingVideoTitle}
                          onChange={(event) =>
                            onEditVideoTitleChange(event.target.value)
                          }
                          className="h-10 rounded-xl border-border/50 bg-card/70"
                        />
                      ) : (
                        <p className="truncate text-sm font-medium text-foreground">
                          {video.title}
                        </p>
                      )}

                      <p className="mt-2 text-xs text-muted-foreground">
                        {video.section} · {video.publishDate} · {video.views} views
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <VisibilityPill visible={video.featured} />
                      <StatusPill status={video.workflowStatus} />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        Show on homepage
                      </span>
                      <Switch
                        checked={video.featured}
                        onCheckedChange={(checked) =>
                          onToggleVideo(video.id, checked)
                        }
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {isEditing ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => onSaveVideoTitle(video.id)}
                            className="rounded-xl"
                          >
                            <Save className="mr-2 h-4 w-4" />
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={onCancelVideoTitleEdit}
                            className="rounded-xl border-border/50"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            onStartVideoTitleEdit(video.id, video.title)
                          }
                          className="rounded-xl border-border/50"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit title
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDeleteVideo(video.id)}
                        className="rounded-xl border-rose-500/30 bg-rose-500/5 text-rose-300 hover:bg-rose-500/10 hover:text-rose-200"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <section className="rounded-2xl border border-border/50 bg-card/55 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Featured social posts
            </h3>
            <Badge
              variant="outline"
              className="border-border/50 bg-background/60 text-foreground"
            >
              {featuredSocialPosts.length} on landing
            </Badge>
          </div>

          {featuredSocialPosts.length > 0 ? (
            <div className="space-y-3">
              {featuredSocialPosts.map((post) => {
                const meta = getSocialPlatformMeta(post.platform);
                return (
                  <div
                    key={post.id}
                    className="rounded-2xl border border-border/40 bg-background/60 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border " + meta.accent}>
                        <meta.icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">
                            {post.platform}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {post.handle || meta.handle}
                          </p>
                        </div>
                        <p className="mt-3 text-sm font-medium text-foreground">
                          {post.title}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {post.preview}
                        </p>
                        <p className="mt-3 text-xs text-muted-foreground">
                          {post.publishAt}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <VisibilityPill visible={post.featured} />
                      <StatusPill status={post.workflowStatus} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border/50 bg-background/60 p-6 text-sm text-muted-foreground">
              Feature a social post and it will show up here as the landing-page preview.
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-border/50 bg-card/55 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Feature social media posts
            </h3>
            <Badge
              variant="outline"
              className="border-border/50 bg-background/60 text-foreground"
            >
              {landingPosts.length} posts
            </Badge>
          </div>

          <div className="space-y-3">
            {landingPosts.map((post) => {
              const meta = getSocialPlatformMeta(post.platform);

              return (
                <div
                  key={post.id}
                  className="rounded-2xl border border-border/40 bg-background/60 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border " + meta.accent}>
                      <meta.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">
                          {post.platform}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {post.handle || meta.handle}
                        </p>
                      </div>
                      <p className="mt-3 text-sm font-medium text-foreground">
                        {post.title}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {post.preview}
                      </p>
                      <p className="mt-3 text-xs text-muted-foreground">
                        {post.publishAt} · {post.destination}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-border/40 bg-card/70 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Landing preview handle
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {post.handle || meta.handle}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {post.preview}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                      <VisibilityPill visible={post.featured} />
                      <StatusPill status={post.workflowStatus} />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        Feature on landing
                      </span>
                      <Switch
                        checked={post.featured}
                        onCheckedChange={(checked) =>
                          onTogglePost(post.id, checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

function MeetingsPanel({
  meetings,
  meetingDraft,
  meetingTemplates,
  onLoadTemplate,
  onMeetingDraftChange,
  onCreateMeeting,
  onResetDraft,
}: {
  meetings: MeetingItem[];
  meetingDraft: Omit<MeetingItem, "id">;
  meetingTemplates: MeetingItem[];
  onLoadTemplate: (meeting: MeetingItem) => void;
  onMeetingDraftChange: <K extends keyof Omit<MeetingItem, "id">>(
    field: K,
    value: Omit<MeetingItem, "id">[K],
  ) => void;
  onCreateMeeting: () => void;
  onResetDraft: () => void;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-6">
        <section className="rounded-2xl border border-border/50 bg-card/55 p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Schedule from website
            </h3>
            <Badge
              variant="outline"
              className="border-border/50 bg-background/60 text-foreground"
            >
              Google Calendar behavior
            </Badge>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            {meetingTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => onLoadTemplate(template)}
                className="rounded-2xl border border-border/40 bg-background/60 px-3 py-3 text-left text-sm text-foreground transition-colors hover:border-border/60 hover:bg-background"
              >
                <p className="truncate font-medium">{template.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {template.host} · {template.audience}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">
                Class title
              </label>
              <Input
                value={meetingDraft.title}
                onChange={(event) =>
                  onMeetingDraftChange("title", event.target.value)
                }
                className="mt-2 h-11 rounded-xl border-border/50 bg-background/60"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Host
                </label>
                <Input
                  value={meetingDraft.host}
                  onChange={(event) =>
                    onMeetingDraftChange("host", event.target.value)
                  }
                  className="mt-2 h-11 rounded-xl border-border/50 bg-background/60"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Host email
                </label>
                <Input
                  value={meetingDraft.hostEmail}
                  onChange={(event) =>
                    onMeetingDraftChange("hostEmail", event.target.value)
                  }
                  className="mt-2 h-11 rounded-xl border-border/50 bg-background/60"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Audience
                </label>
                <select
                  value={meetingDraft.audience}
                  onChange={(event) =>
                    onMeetingDraftChange("audience", event.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-border/50 bg-background/60 px-3 text-sm text-foreground outline-none"
                >
                  {["Students", "Instructors", "Families"].map((audience) => (
                    <option key={audience} value={audience}>
                      {audience}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Calendar
                </label>
                <Input
                  value={meetingDraft.calendarName}
                  onChange={(event) =>
                    onMeetingDraftChange("calendarName", event.target.value)
                  }
                  className="mt-2 h-11 rounded-xl border-border/50 bg-background/60"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Invitees
              </label>
              <Textarea
                value={meetingDraft.invitees}
                onChange={(event) =>
                  onMeetingDraftChange("invitees", event.target.value)
                }
                className="mt-2 min-h-24 rounded-xl border-border/50 bg-background/60"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Session time
              </label>
              <Input
                value={meetingDraft.slot}
                onChange={(event) =>
                  onMeetingDraftChange("slot", event.target.value)
                }
                className="mt-2 h-11 rounded-xl border-border/50 bg-background/60"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Google Meet link
              </label>
              <Input
                value={meetingDraft.meetUrl}
                onChange={(event) =>
                  onMeetingDraftChange("meetUrl", event.target.value)
                }
                className="mt-2 h-11 rounded-xl border-border/50 bg-background/60"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Event status
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(["scheduled", "draft", "sent"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        onMeetingDraftChange("workflowStatus", status)
                      }
                      className={
                        "rounded-xl border px-3 py-2 text-sm transition-colors " +
                        (meetingDraft.workflowStatus === status
                          ? "border-amber-500/30 bg-amber-500/10 text-foreground"
                          : "border-border/40 bg-background/60 text-muted-foreground hover:border-border/60 hover:text-foreground")
                      }
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Invite status
                </label>
                <Input
                  value={meetingDraft.inviteState}
                  onChange={(event) =>
                    onMeetingDraftChange("inviteState", event.target.value)
                  }
                  className="mt-2 h-11 rounded-xl border-border/50 bg-background/60"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Launch note
              </label>
              <Textarea
                value={meetingDraft.note}
                onChange={(event) =>
                  onMeetingDraftChange("note", event.target.value)
                }
                className="mt-2 min-h-28 rounded-xl border-border/50 bg-background/60"
              />
            </div>
          </div>

          <div className="mt-5 space-y-3 rounded-2xl border border-border/40 bg-background/60 p-4">
            {[
              "Create a Google Calendar event from this form",
              "Send invite emails to the selected attendee group",
              "Expose the meeting launch button on the website dashboard",
            ].map((item) => (
              <div key={item} className="flex items-center justify-between gap-4">
                <span className="text-sm text-foreground">{item}</span>
                <Switch checked />
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={onCreateMeeting} className="rounded-xl">
              <Calendar className="mr-2 h-4 w-4" />
              Create Meeting link
            </Button>
            <Button
              variant="outline"
              onClick={onResetDraft}
              className="rounded-xl border-border/50"
            >
              Reset
            </Button>
          </div>
        </section>

       
      </div>

      <div className="space-y-6">
        <section className="rounded-2xl border border-border/50 bg-card/55 p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Scheduled Google Meet Sessions
            </h3>
            <Badge
              variant="outline"
              className="border-border/50 bg-background/60 text-foreground"
            >
              Calendar synced demo
            </Badge>
          </div>

          <div className="space-y-4">
            {meetings.map((meeting) => (
              <div
                key={meeting.id}
                className="rounded-2xl border border-border/40 bg-background/60 p-5"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-base font-semibold text-foreground">
                      {meeting.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {meeting.host} · {meeting.hostEmail}
                    </p>
                  </div>
                  <StatusPill status={meeting.workflowStatus} />
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-border/40 bg-card/80 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Session Time
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {meeting.slot}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/40 bg-card/80 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Calendar
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {meeting.calendarName}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/40 bg-card/80 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Google Meet Link
                    </p>
                    <p className="mt-2 truncate text-sm font-medium text-foreground">
                      {meeting.meetUrl}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/40 bg-card/80 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Invitees
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {meeting.invitees}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {meeting.note}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-border/50 bg-background/70 text-foreground"
                  >
                    {meeting.audience}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                  >
                    {meeting.inviteState}
                  </Badge>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="mt-4 rounded-xl border-border/50 bg-background/60"
                >
                  <a href={"https://" + meeting.meetUrl} target="_blank" rel="noreferrer">
                    Preview calendar launch
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </section>

        
      </div>
    </div>
  );
}

function ContentPanel() {
  const defaultSyncTitle = "AI Coding Lab Cohort A";
  const defaultSyncCaption =
    "Session reminder for AI Coding Lab Cohort A. Students can launch Google Meet from the dashboard and the landing page card.";
  const defaultPublishAt = "March 26, 2026 · 3:30 PM";

  const [channels, setChannels] = useState([
    {
      id: "youtube",
      label: "YouTube",
      handle: "@nazlitechclassroom",
      linked: true,
      syncEnabled: true,
      lastSync: "March 25, 2026 · 9:12 AM",
      icon: Youtube,
      accent: "border-red-500/20 bg-red-500/10 text-red-300",
    },
    {
      id: "instagram",
      label: "Instagram",
      handle: "@nazli.tech",
      linked: true,
      syncEnabled: true,
      lastSync: "March 25, 2026 · 8:40 AM",
      icon: Instagram,
      accent: "border-pink-500/20 bg-pink-500/10 text-pink-300",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "Nazli Tech School",
      linked: true,
      syncEnabled: false,
      lastSync: "March 24, 2026 · 5:10 PM",
      icon: Linkedin,
      accent: "border-sky-500/20 bg-sky-500/10 text-sky-300",
    },
    {
      id: "x",
      label: "X / Twitter",
      handle: "@nazlitech",
      linked: false,
      syncEnabled: false,
      lastSync: "Not linked",
      icon: Globe,
      accent: "border-border/50 bg-background/70 text-muted-foreground",
    },
  ]);
  const [syncTitle, setSyncTitle] = useState(defaultSyncTitle);
  const [syncCaption, setSyncCaption] = useState(defaultSyncCaption);
  const [publishAt, setPublishAt] = useState(defaultPublishAt);
  const [selectedTargets, setSelectedTargets] = useState<
    Record<string, boolean>
  >({
    youtube: true,
    instagram: true,
    linkedin: true,
    x: false,
  });
  const [lastQueuedAt, setLastQueuedAt] = useState(defaultPublishAt);

  const linkedChannels = channels.filter((channel) => channel.linked);
  const activeTargets = channels.filter(
    (channel) =>
      channel.linked && channel.syncEnabled && selectedTargets[channel.id],
  );

  const toggleLink = (id: string) => {
    const currentlyLinked = channels.find(
      (channel) => channel.id === id,
    )?.linked;

    setChannels((current) =>
      current.map((channel) => {
        if (channel.id !== id) {
          return channel;
        }

        const nextLinked = !channel.linked;

        return {
          ...channel,
          linked: nextLinked,
          syncEnabled: nextLinked,
          lastSync: nextLinked ? "Ready to sync" : "Reconnect required",
        };
      }),
    );

    setSelectedTargets((current) => ({
      ...current,
      [id]: currentlyLinked ? false : true,
    }));
  };

  const toggleSync = (id: string) => {
    setChannels((current) =>
      current.map((channel) => {
        if (channel.id !== id || !channel.linked) {
          return channel;
        }

        return {
          ...channel,
          syncEnabled: !channel.syncEnabled,
        };
      }),
    );
  };

  const toggleTarget = (id: string) => {
    const channel = channels.find((item) => item.id === id);

    if (!channel?.linked) {
      return;
    }

    setSelectedTargets((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  const resetSyncDraft = () => {
    setSyncTitle(defaultSyncTitle);
    setSyncCaption(defaultSyncCaption);
    setPublishAt(defaultPublishAt);
    setSelectedTargets({
      youtube: true,
      instagram: true,
      linkedin: true,
      x: false,
    });
  };

  const queueSynchronizedPost = () => {
    setLastQueuedAt(publishAt.trim() || defaultPublishAt);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-6">
        <section className="rounded-2xl border border-border/50 bg-card/55 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Connected channels
            </h3>
            <Badge
              variant="outline"
              className="border-border/50 bg-background/60 text-foreground"
            >
              {linkedChannels.length + " linked"}
            </Badge>
          </div>

          <div className="space-y-3">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="rounded-2xl border border-border/40 bg-background/60 p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className={
                        "flex h-11 w-11 items-center justify-center rounded-xl border " +
                        channel.accent
                      }
                    >
                      <channel.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">
                          {channel.label}
                        </p>
                        <Badge
                          variant="outline"
                          className={
                            channel.linked
                              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                              : "border-border/50 bg-background/70 text-muted-foreground"
                          }
                        >
                          {channel.linked ? "linked" : "not linked"}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {channel.handle}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {channel.linked
                          ? "Last sync: " + channel.lastSync
                          : "Link this account to include it in synchronized posting."}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 rounded-xl border border-border/40 bg-background/70 px-3 py-2">
                      <span className="text-xs text-muted-foreground">
                        Sync
                      </span>
                      <Switch
                        checked={channel.syncEnabled}
                        onCheckedChange={() => toggleSync(channel.id)}
                        disabled={!channel.linked}
                      />
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleLink(channel.id)}
                      className="rounded-xl border-border/50"
                    >
                      {channel.linked ? (
                        <RefreshCw className="mr-2 h-4 w-4" />
                      ) : (
                        <Link2 className="mr-2 h-4 w-4" />
                      )}
                      {channel.linked ? "Reconnect" : "Link account"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border/50 bg-card/55 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Approval rules
            </h3>
            <Badge
              variant="outline"
              className="border-border/50 bg-background/60 text-foreground"
            >
              Posting controls
            </Badge>
          </div>

          <div className="space-y-3">
            {[
              "Use one caption across selected channels",
              "Reuse the landing video title for YouTube",
              "Queue synchronized posts after admin approval",
            ].map((rule) => (
              <div
                key={rule}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border/40 bg-background/60 px-4 py-3"
              >
                <span className="text-sm text-foreground">{rule}</span>
                <Switch checked />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <section className="rounded-2xl border border-border/50 bg-card/55 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Synchronized post
            </h3>
            <Badge
              variant="outline"
              className="border-border/50 bg-background/60 text-foreground"
            >
              Cross-channel publish
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">
                Post title
              </label>
              <Input
                value={syncTitle}
                onChange={(event) => setSyncTitle(event.target.value)}
                className="mt-2 h-11 rounded-xl border-border/50 bg-background/60"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Caption
              </label>
              <Textarea
                value={syncCaption}
                onChange={(event) => setSyncCaption(event.target.value)}
                className="mt-2 min-h-28 rounded-xl border-border/50 bg-background/60"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Publish time
              </label>
              <Input
                value={publishAt}
                onChange={(event) => setPublishAt(event.target.value)}
                className="mt-2 h-11 rounded-xl border-border/50 bg-background/60"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Publish targets
              </label>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => toggleTarget(channel.id)}
                    className={
                      "rounded-2xl border px-4 py-3 text-left transition-colors " +
                      (selectedTargets[channel.id]
                        ? "border-amber-500/30 bg-amber-500/10 text-foreground"
                        : "border-border/40 bg-background/60 text-muted-foreground hover:border-border/60 hover:text-foreground") +
                      (!channel.linked ? " opacity-50" : "")
                    }
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <channel.icon className="h-4 w-4" />
                        <div>
                          <p className="text-sm font-medium">{channel.label}</p>
                          <p className="text-xs text-inherit/70">
                            {channel.linked ? channel.handle : "Link required"}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs">
                        {selectedTargets[channel.id] && channel.linked
                          ? "selected"
                          : ""}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={queueSynchronizedPost} className="rounded-xl">
              <SendHorizontal className="mr-2 h-4 w-4" />
              Queue synchronized post
            </Button>
            <Button
              variant="outline"
              onClick={resetSyncDraft}
              className="rounded-xl border-border/50"
            >
              Reset draft
            </Button>
          </div>
        </section>

        <section className="rounded-2xl border border-border/50 bg-card/55 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              <h3 className="text-base font-semibold text-foreground">
                Sync summary
              </h3>
            </div>
            <Badge
              variant="outline"
              className="border-border/50 bg-background/60 text-foreground"
            >
              {activeTargets.length + " targets"}
            </Badge>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                label: "Linked accounts",
                value: String(linkedChannels.length),
              },
              { label: "Active targets", value: String(activeTargets.length) },
              { label: "Next queue", value: lastQueuedAt },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border/40 bg-background/60 p-4"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-3 text-sm font-medium text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-border/40 bg-background/60 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Ready to publish
            </p>
            <div className="mt-3 space-y-2">
              {activeTargets.length > 0 ? (
                activeTargets.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-center justify-between rounded-xl border border-border/30 bg-card/70 px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <channel.icon className="h-4 w-4 text-foreground" />
                      <span className="text-sm text-foreground">
                        {channel.label}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {channel.handle}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select at least one linked channel to queue a synchronized
                  post.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {[
        {
          label: "Homepage video views",
          value: "31.6K",
          hint: "Combined views for visible landing videos.",
        },
        {
          label: "Social wall clicks",
          value: "4.8K",
          hint: "Outbound actions from visible social posts.",
        },
        {
          label: "Meeting launches",
          value: "126",
          hint: "External Google Meet opens this week.",
        },
      ].map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-border/50 bg-card/55 p-5"
        >
          <p className="text-sm text-muted-foreground">{card.label}</p>
          <p className="mt-4 text-3xl font-semibold text-foreground">
            {card.value}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {card.hint}
          </p>
        </div>
      ))}
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-2xl border border-border/50 bg-card/55 p-5">
        <h3 className="text-base font-semibold text-foreground">
          Landing page rules
        </h3>
        <div className="mt-5 space-y-4">
          {[
            "Only featured videos appear in Student Achievements",
            "Only approved posts appear in the social wall",
            "Scheduled items wait for their publish date",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between gap-4 rounded-2xl border border-border/40 bg-background/60 px-4 py-3"
            >
              <span className="text-sm text-foreground">{item}</span>
              <Switch checked />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border/50 bg-card/55 p-5">
        <h3 className="text-base font-semibold text-foreground">
          Google Meet rules
        </h3>
        <div className="mt-5 space-y-4">
          {[
            "Show external launch label on every session button",
            "Display audience tag for students, instructors, or families",
            "Show reminder status before the session goes live",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between gap-4 rounded-2xl border border-border/40 bg-background/60 px-4 py-3"
            >
              <span className="text-sm text-foreground">{item}</span>
              <Switch checked />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const classes =
    status === "live"
      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
      : status === "scheduled"
        ? "border-blue-500/20 bg-blue-500/10 text-blue-300"
        : status === "sent"
          ? "border-violet-500/20 bg-violet-500/10 text-violet-300"
          : "border-amber-500/20 bg-amber-500/10 text-amber-300";

  return (
    <Badge variant="outline" className={classes}>
      {status}
    </Badge>
  );
}

function VisibilityPill({ visible }: { visible: boolean }) {
  return (
    <Badge
      variant="outline"
      className={
        visible
          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
          : "border-border/50 bg-background/60 text-muted-foreground"
      }
    >
      {visible ? "visible" : "hidden"}
    </Badge>
  );
}

function MobileAdminNav({
  activeItem,
  onNavigate,
}: {
  activeItem: string;
  onNavigate: (item: string) => void;
}) {
  return (
    <div className="fixed bottom-4 left-1/2 z-30 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 lg:hidden">
      <div className="grid grid-cols-4 gap-2 rounded-2xl border border-border/50 bg-background/95 p-2 shadow-xl shadow-black/20 backdrop-blur">
        {mobileNavItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.label)}
            className={`rounded-xl px-3 py-2 text-center transition-colors ${
              activeItem === item.label
                ? "bg-amber-500/15 text-foreground"
                : "text-muted-foreground hover:bg-card/80 hover:text-foreground"
            }`}
          >
            <item.icon className="mx-auto h-4 w-4" />
            <span className="mt-1 block text-[11px] font-medium">
              {item.label === "Landing Page" ? "Landing" : item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
