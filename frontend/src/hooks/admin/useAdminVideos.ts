import { useState, useMemo } from "react";

export type LandingVideo = {
  id: number;
  title: string;
  section: string;
  views: string;
  publishDate: string;
  workflowStatus: "live" | "scheduled" | "draft";
  featured: boolean;
  thumbnail: string;
};

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

export function useAdminVideos() {
  const [landingVideos, setLandingVideos] = useState(initialLandingVideos);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadFeatured, setUploadFeatured] = useState(true);
  const [editingVideoId, setEditingVideoId] = useState<number | null>(null);
  const [editingVideoTitle, setEditingVideoTitle] = useState("");

  const featuredVideos = useMemo(
    () => landingVideos.filter((video) => video.featured),
    [landingVideos],
  );

  const toggleLandingVideo = (id: number, checked: boolean) => {
    setLandingVideos((current) =>
      current.map((video) =>
        video.id === id ? { ...video, featured: checked } : video,
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

  return {
    landingVideos,
    uploadTitle,
    uploadFeatured,
    editingVideoId,
    editingVideoTitle,
    featuredVideos,
    setUploadTitle,
    setUploadFeatured,
    setEditingVideoTitle,
    toggleLandingVideo,
    addLandingVideo,
    startVideoTitleEdit,
    cancelVideoTitleEdit,
    saveVideoTitle,
    deleteLandingVideo,
  };
}
