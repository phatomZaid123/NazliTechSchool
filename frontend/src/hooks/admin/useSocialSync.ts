import { useState } from "react";
import {
  Youtube,
  Instagram,
  Linkedin,
  Globe,
  type LucideIcon,
} from "lucide-react";

export type SocialChannel = {
  id: string;
  label: string;
  handle: string;
  linked: boolean;
  syncEnabled: boolean;
  lastSync: string;
  icon: LucideIcon;
  accent: string;
};

const defaultChannels: SocialChannel[] = [
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
];

const defaultSyncTitle = "AI Coding Lab Cohort A";
const defaultSyncCaption =
  "Session reminder for AI Coding Lab Cohort A. Students can launch Google Meet from the dashboard and the landing page card.";
const defaultPublishAt = "March 26, 2026 · 3:30 PM";

export function useSocialSync() {
  const [channels, setChannels] = useState(defaultChannels);
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

  return {
    channels,
    syncTitle,
    syncCaption,
    publishAt,
    selectedTargets,
    lastQueuedAt,
    linkedChannels,
    activeTargets,
    setSyncTitle,
    setSyncCaption,
    setPublishAt,
    toggleLink,
    toggleSync,
    toggleTarget,
    resetSyncDraft,
    queueSynchronizedPost,
  };
}
