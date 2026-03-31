"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { StatusPill } from "../components/status-pill";
import { VisibilityPill } from "../components/visibility-pill";
import type { LandingVideo } from "@/hooks/admin/useAdminVideos";
import type { LandingPost } from "@/hooks/admin/useLandingPosts";
import type { MeetingItem } from "@/hooks/admin/useAdminMeetings";

interface DashboardPanelProps {
  landingVideos: LandingVideo[];
  featuredPosts: LandingPost[];
  scheduledMeetings: MeetingItem[];
  totalVisible: number;
}

export function DashboardPanel({
  landingVideos,
  featuredPosts,
  scheduledMeetings,
  totalVisible,
}: DashboardPanelProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="flex space-y-6">
        <section className="flex-1 rounded-2xl border border-border/50 bg-card/55 p-5">
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
