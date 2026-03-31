import { useState } from "react";
import {
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  type LucideIcon,
} from "lucide-react";

export type LandingPost = {
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

export function getSocialPlatformMeta(platform: string): {
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

export const initialLandingPosts: LandingPost[] = [
  {
    id: 1,
    platform: "Instagram",
    handle: "@nazli.tech",
    title: "Achievement carousel for robotics winners",
    preview:
      "Students celebrate the robotics challenge win with a short caption and a landing-page card preview.",
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
    preview:
      "A partnership post that can be featured on the landing page with the LinkedIn school handle.",
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
    preview:
      "A video teaser preview for the landing social wall before the full YouTube publish goes live.",
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
    preview:
      "A short classroom update that can be featured quickly when you want a lighter social post on the homepage.",
    destination: "Social Wall",
    publishAt: "April 1, 2026 · 12:00 PM",
    workflowStatus: "draft",
    featured: false,
  },
];

export function useLandingPosts() {
  const [landingPosts, setLandingPosts] = useState(initialLandingPosts);

  const toggleLandingPost = (id: number, checked: boolean) => {
    setLandingPosts((current) =>
      current.map((post) =>
        post.id === id ? { ...post, featured: checked } : post,
      ),
    );
  };

  return { landingPosts, toggleLandingPost };
}
