"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Play,
  Heart,
  MessageCircle,
  Eye,
  Plus,
  X,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const videoTypes = [
  "Student Project",
  "Lab Session",
  "Tutorial",
  "Testimonial",
  "Event",
  "Achievement",
];
const gradients = [
  "from-primary/40 to-accent/40",
  "from-accent/40 to-glow-cyan/40",
  "from-glow-cyan/40 to-glow-blue/40",
  "from-glow-blue/40 to-primary/40",
  "from-purple-500/40 to-pink-500/40",
  "from-amber-500/40 to-orange-500/40",
];

interface VideoItem {
  id: string;
  title: string;
  author: string;
  views: string;
  likes: string;
  comments: string;
  thumbnail: string;
  type: string;
}

interface AdminVideoSectionProps {
  onVideoAdded?: (video: VideoItem) => void;
  publishedVideos?: VideoItem[];
}

export function AdminVideoSection({
  onVideoAdded,
  publishedVideos = [],
}: AdminVideoSectionProps) {
  const [title, setTitle] = useState("My First AI Project Demo");
  const [author, setAuthor] = useState("Demo Student");
  const [type, setType] = useState("Student Project");
  const [selectedGradient, setSelectedGradient] = useState(0);
  const [published, setPublished] = useState(false);
  const [videos, setVideos] = useState<VideoItem[]>(publishedVideos);

  const handlePublish = () => {
    if (!title || !author) {
      return;
    }

    const newVideo: VideoItem = {
      id: `video-${Date.now()}`,
      title,
      author,
      views: "0",
      likes: "0",
      comments: "0",
      thumbnail: gradients[selectedGradient],
      type,
    };

    setVideos([newVideo, ...videos]);
    setPublished(true);
    onVideoAdded?.(newVideo);

    setTimeout(() => setPublished(false), 2000);
  };

  const removeVideo = (id: string) => {
    setVideos(videos.filter((v) => v.id !== id));
  };

  const resetForm = () => {
    setTitle("My First AI Project Demo");
    setAuthor("Demo Student");
    setType("Student Project");
    setSelectedGradient(0);
  };

  return (
    <section className="container px-4 pb-12 md:px-6">
      <div className="mb-12">
        <Badge
          variant="outline"
          className="border-cyan-500/30 bg-cyan-500/10 text-cyan-300 mb-4"
        >
          Demo Feature: Video Management
        </Badge>
        <h3 className="text-3xl font-bold text-foreground mb-3">
          Upload & Publish Student Videos
        </h3>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Add student achievements and project showcases. Videos appear
          instantly on the landing page for visitors to see.
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
          <Card className="p-6 border-border/40 bg-card/65 backdrop-blur-xl rounded-2xl">
            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Video Title
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., My First AI Model"
                  className="rounded-xl border-border/40 bg-background/50"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Student/Author Name
                </label>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g., Sarah Chen"
                  className="rounded-xl border-border/40 bg-background/50"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  Content Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {videoTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        type === t
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 border"
                          : "bg-secondary/50 border border-border/40 text-muted-foreground hover:border-border/60"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  Thumbnail Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {gradients.map((gradient, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedGradient(idx)}
                      className={`h-12 rounded-lg border-2 transition-all ${
                        selectedGradient === idx
                          ? "border-cyan-400 ring-2 ring-cyan-500/50"
                          : "border-border/40"
                      }`}
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${gradient.split(" ").slice(1).join(" ")})`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                <p className="text-xs text-cyan-300 font-medium">
                  📱 Upload a 9:16 vertical video
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  In production, you'd upload an actual video file here
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    onClick={handlePublish}
                    className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Publish to Landing Page
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

              {published && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 flex items-center gap-2"
                >
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-300">
                    Published successfully!
                  </span>
                </motion.div>
              )}
            </div>
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
              Live Preview - Landing Page
            </p>

            <div className="space-y-3">
              {videos.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/50 p-8 text-center">
                  <Play className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Publish a video to see it appear here
                  </p>
                </div>
              ) : (
                videos.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative rounded-xl overflow-hidden border border-border/40 bg-background/50 hover:border-border/60 transition-all"
                  >
                    <div className="flex gap-3 p-3">
                      <div
                        className={`h-20 w-14 rounded-lg bg-linear-to-br ${video.thumbnail} shrink-0`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {video.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {video.author}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" /> {video.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" /> {video.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />{" "}
                            {video.comments}
                          </span>
                        </div>
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {video.type}
                        </Badge>
                      </div>
                      <button
                        onClick={() => removeVideo(video.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/20 rounded-lg"
                      >
                        <X className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
            <p className="text-xs font-semibold text-amber-300 mb-2">
              💡 Demo Insight
            </p>
            <p className="text-xs text-muted-foreground">
              Each video you publish appears instantly in the "Student
              Achievements" section on the landing page. Visitors will see your
              latest content without a page refresh.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
