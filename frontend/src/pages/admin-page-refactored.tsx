"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  Bell,
  Calendar,
  FileText,
  Globe,
  LayoutDashboard,
  Megaphone,
  Search,
  Settings,
  Video,
  X,
  type LucideIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminVideos } from "@/hooks/admin/useAdminVideos";
import { useAdminMeetings } from "@/hooks/admin/useAdminMeetings";
import { useSocialSync } from "@/hooks/admin/useSocialSync";
import { DashboardPanel } from "@/components/admin/panels/dashboard-panel";

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
    subtitle:
      "Schedule meetings from the website with Google Calendar-style host and attendee controls.",
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

export function AdminPage() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");

  // Use custom hooks for state management
  const videosActions = useAdminVideos();
  const meetingsActions = useAdminMeetings();
  const syncActions = useSocialSync();

  // Compute derived state
  const draftItems = useMemo(
    () =>
      videosActions.landingVideos.filter(
        (video) => video.workflowStatus === "draft",
      ).length +
      meetingsActions.meetings.filter(
        (meeting) => meeting.workflowStatus === "draft",
      ).length,
    [videosActions.landingVideos, meetingsActions.meetings],
  );

  const stats = [
    {
      label: "Videos",
      value: String(videosActions.landingVideos.length),
      detail: `${videosActions.featuredVideos.length} visible on homepage`,
      icon: Video,
      accent: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      label: "Social Posts",
      value: String(0), // Placeholder
      detail: "0 visible on homepage",
      icon: Megaphone,
      accent: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Meet Sessions",
      value: String(meetingsActions.meetings.length),
      detail: `${meetingsActions.scheduledMeetings.length} scheduled`,
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

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        {/* Sidebar */}
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

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-20 border-b border-border/50 bg-background/95 backdrop-blur">
            <div className="flex flex-col gap-4 px-4 py-4 md:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Nazli Tech admin
                </p>
                <h2 className="mt-1 truncate text-2xl font-semibold text-foreground">
                  {currentView.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {currentView.subtitle}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative min-w-0 sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="h-10 rounded-xl border-border/50 bg-card/60 pl-9"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-xl border-border/50 bg-card/60"
                >
                  <Bell className="h-4 w-4" />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-10 rounded-xl border-border/50 bg-card/60"
                >
                  <Link to="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Log out
                  </Link>
                </Button>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 px-4 pb-24 pt-6 md:px-6 lg:px-8">
            {/* Stats Grid */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl border border-border/50 bg-card/55 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="mt-3 text-3xl font-semibold text-foreground">
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

            {/* Panel Content */}
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
                    landingVideos={videosActions.landingVideos}
                    featuredPosts={[]}
                    scheduledMeetings={meetingsActions.scheduledMeetings}
                    totalVisible={videosActions.featuredVideos.length}
                  />
                )}

                {activeItem === "Landing Page" && (
                  <div className="rounded-2xl border border-border/50 bg-card/55 p-6">
                    <h3 className="text-lg font-semibold text-foreground">
                      Landing Page Management
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Landing page panel will be extracted soon
                    </p>
                  </div>
                )}

                {activeItem === "Meetings" && (
                  <div className="rounded-2xl border border-border/50 bg-card/55 p-6">
                    <h3 className="text-lg font-semibold text-foreground">
                      Meetings Management
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Meetings panel will be extracted soon
                    </p>
                  </div>
                )}

                {activeItem === "Content" && (
                  <div className="rounded-2xl border border-border/50 bg-card/55 p-6">
                    <h3 className="text-lg font-semibold text-foreground">
                      Content Management
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Content panel will be extracted soon
                    </p>
                  </div>
                )}

                {activeItem === "Analytics" && (
                  <div className="rounded-2xl border border-border/50 bg-card/55 p-6">
                    <h3 className="text-lg font-semibold text-foreground">
                      Analytics
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Analytics dashboard coming soon
                    </p>
                  </div>
                )}

                {activeItem === "Settings" && (
                  <div className="rounded-2xl border border-border/50 bg-card/55 p-6">
                    <h3 className="text-lg font-semibold text-foreground">
                      Settings
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Settings panel coming soon
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileAdminNav activeItem={activeItem} onNavigate={setActiveItem} />
    </main>
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
    <div className="fixed bottom-0 left-0 right-0 border-t border-border/50 bg-background/95 backdrop-blur lg:hidden">
      <div className="flex items-center justify-around">
        {mobileNavItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.label)}
            className={`flex flex-1 items-center justify-center gap-2 border-t-2 px-3 py-4 text-xs font-medium transition-colors ${
              activeItem === item.label
                ? "border-amber-500 text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
