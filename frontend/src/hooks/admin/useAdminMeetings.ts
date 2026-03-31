import { useState, useMemo } from "react";

export type MeetingItem = {
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

export function useAdminMeetings() {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [meetingDraft, setMeetingDraft] = useState(defaultMeetingDraft);

  const scheduledMeetings = useMemo(
    () => meetings.filter((meeting) => meeting.workflowStatus === "scheduled"),
    [meetings],
  );

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

    if (
      !title ||
      !host ||
      !hostEmail ||
      !invitees ||
      !calendarName ||
      !slot ||
      !meetUrl
    ) {
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

    resetMeetingDraft();
  };

  const resetMeetingDraft = () => {
    setMeetingDraft(defaultMeetingDraft);
  };

  return {
    meetings,
    meetingDraft,
    scheduledMeetings,
    initialMeetings,
    loadMeetingTemplate,
    updateMeetingDraft,
    createMeeting,
    resetMeetingDraft,
  };
}
