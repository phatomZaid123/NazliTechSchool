"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  Video,
  Clock,
  MapPin,
  X,
  Check,
  ExternalLink,
  Lock,
  Presentation,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Meeting {
  id: string;
  title: string;
  instructor: string;
  datetime: string;
  audience: "Students" | "Instructors" | "Families";
  meetLink: string;
  status: "scheduled" | "live" | "completed";
}

interface AdminMeetingsSectionProps {
  onMeetingScheduled?: (meeting: Meeting) => void;
  scheduledMeetings?: Meeting[];
}

const instructors = [
  { id: "1", name: "Instructor Amina Yusuf", department: "AI & Coding" },
  { id: "2", name: "Mentor David Park", department: "Physics Lab" },
  { id: "3", name: "Prof. Maria García", department: "Digital Arts" },
  { id: "4", name: "Dr. James Chen", department: "Biology" },
  { id: "5", name: "Sarah Mitchell", department: "Engineering" },
];

const audiences = ["Students", "Instructors", "Families"] as const;

export function AdminMeetingSection({
  onMeetingScheduled,
  scheduledMeetings = [],
}: AdminMeetingsSectionProps) {
  const [title, setTitle] = useState("AI Coding Lab - Live Session");
  const [instructor, setInstructor] = useState("Instructor Amina Yusuf");
  const [datetime, setDatetime] = useState("2024-03-25T15:00");
  const [audience, setAudience] = useState<
    "Students" | "Instructors" | "Families"
  >("Students");
  const [meetings, setMeetings] = useState<Meeting[]>(scheduledMeetings);
  const [scheduled, setScheduled] = useState(false);

  const generateMeetLink = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    return (
      "meet.google.com/" +
      Array.from(
        { length: 10 },
        () => chars[Math.floor(Math.random() * chars.length)],
      ).join("")
    );
  };

  const handleSchedule = () => {
    if (!title.trim() || !instructor) {
      return;
    }

    const newMeeting: Meeting = {
      id: `meet-${Date.now()}`,
      title,
      instructor,
      datetime,
      audience,
      meetLink: generateMeetLink(),
      status: "scheduled",
    };

    setMeetings([newMeeting, ...meetings]);
    setScheduled(true);
    onMeetingScheduled?.(newMeeting);

    setTimeout(() => setScheduled(false), 2000);
  };

  const removeMeeting = (id: string) => {
    setMeetings(meetings.filter((m) => m.id !== id));
  };

  const resetForm = () => {
    setTitle("AI Coding Lab - Live Session");
    setInstructor("Instructor Amina Yusuf");
    setDatetime("2024-03-25T15:00");
    setAudience("Students");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500/20 border-red-500/30 text-red-300";
      case "scheduled":
        return "bg-blue-500/20 border-blue-500/30 text-blue-300";
      case "completed":
        return "bg-gray-500/20 border-gray-500/30 text-gray-300";
      default:
        return "bg-gray-500/20 border-gray-500/30 text-gray-300";
    }
  };

  return (
    <section className="container px-4 pb-12 md:px-6">
      <div className="mb-12">
        <Badge
          variant="outline"
          className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300 mb-4"
        >
          Demo Feature: Meeting Scheduler
        </Badge>
        <h3 className="text-3xl font-bold text-foreground mb-3">
          Schedule Instructor Sessions
        </h3>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Create Google Meet sessions and schedule classes for students,
          instructors, or families. Meeting links are generated automatically.
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
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Session Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Physics Lab Prep"
                className="rounded-xl border-border/40 bg-background/50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Instructor
              </label>
              <select
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="w-full rounded-xl border border-border/40 bg-background/50 px-4 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                {instructors.map((inst) => (
                  <option key={inst.id} value={inst.name}>
                    {inst.name} ({inst.department})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Date & Time
              </label>
              <input
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                className="w-full rounded-xl border border-border/40 bg-background/50 px-4 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                Audience
              </label>
              <div className="grid grid-cols-3 gap-2">
                {audiences.map((aud) => (
                  <button
                    key={aud}
                    onClick={() => setAudience(aud)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      audience === aud
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 border"
                        : "bg-secondary/50 border border-border/40 text-muted-foreground hover:border-border/60"
                    }`}
                  >
                    {aud}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <p className="text-xs font-semibold text-emerald-300 mb-2">
                🔗 Google Meet Link
              </p>
              <p className="text-xs text-muted-foreground">
                A unique Google Meet link is automatically generated when you
                schedule. Students and instructors see this link in their
                respective dashboard views.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  onClick={handleSchedule}
                  className="w-full rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Session
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

            {scheduled && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 flex items-center gap-2"
              >
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-300">
                  Session scheduled!
                </span>
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
            <p className="text-sm font-semibold text-muted-foreground mb-4">
              Live Preview - Student Dashboard
            </p>

            <div className="space-y-3 max-h-150 overflow-y-auto">
              <AnimatePresence>
                {meetings.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border/50 p-8 text-center">
                    <Presentation className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Schedule a session to see it appear here
                    </p>
                  </div>
                ) : (
                  meetings.map((meeting) => (
                    <motion.div
                      key={meeting.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="group rounded-xl border border-border/40 bg-background/50 p-4 hover:border-border/60 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-1">
                            {meeting.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {meeting.instructor}
                          </p>
                        </div>
                        <button
                          onClick={() => removeMeeting(meeting.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded"
                        >
                          <X className="h-4 w-4 text-red-400" />
                        </button>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {new Date(meeting.datetime).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          For {meeting.audience}
                        </div>
                      </div>

                      <div className="rounded-lg bg-secondary/50 border border-border/40 p-3 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs font-medium text-muted-foreground">
                            Google Meet Link
                          </span>
                        </div>
                        <p className="text-xs font-mono text-cyan-400 truncate">
                          {meeting.meetLink}
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full rounded-lg border-border/40 text-xs"
                      >
                        <Video className="mr-2 h-3 w-3" />
                        Open Google Meet
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>

                      <Badge
                        variant="outline"
                        className={`mt-3 text-xs ${getStatusColor(meeting.status)}`}
                      >
                        {meeting.status.charAt(0).toUpperCase() +
                          meeting.status.slice(1)}
                      </Badge>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
            <p className="text-xs font-semibold text-emerald-300 mb-2">
              💡 Demo Insight
            </p>
            <p className="text-xs text-muted-foreground">
              Each scheduled session appears on the landing page and in
              student/instructor dashboards. The "Open Google Meet" button takes
              them to the actual video conference. Perfect for organizing
              classes, office hours, and special events.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
