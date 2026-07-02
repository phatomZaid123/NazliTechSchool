import { motion } from "framer-motion";
import { useState } from "react";
import { Play, Download, User, BookOpen, Globe, ArrowLeft } from "lucide-react";
import { useSectionAudio } from "@/hooks/use-section-audio";
import simulationAudio from "@/assets/simulationaudio.mp3";
import SocialHub from "./social-media-section";

// Mock data structure: Subjects -> Topics with YouTube links
const SUBJECT_DATA = {
  "Computer Science": [
    {
      name: "AI Prompt Engineering",
      youtubeLink: "https://youtu.be/_DKbZW7BdqA?si=6ZCmGQxwgQHqBLax",
    },
    {
      name: "AI and Machine Learning",
      youtubeLink: "https://youtu.be/aircAruvnKk?si=6ZCmGQxwgQHqBLax",
    },
    {
      name: "High Level Programming",
      youtubeLink: "https://youtu.be/kqtZrmDm4A8?si=6ZCmGQxwgQHqBLax",
    },
    {
      name: "Software Engineering",
      youtubeLink: "https://youtu.be/_DKbZW7BdqA?si=6ZCmGQxwgQHqBLax",
    },
  ],
  Mathematics: [
    {
      name: "AI Prompt Engineering",
      youtubeLink: "https://youtu.be/jNgP6d9HraI?si=6ZCmGQxwgQHqBLax",
    },
    {
      name: "AI and Machine Learning",
      youtubeLink: "https://youtu.be/RowM3UbWGpI?si=6ZCmGQxwgQHqBLax",
    },
    {
      name: "Calculus Derivatives",
      youtubeLink: "https://youtu.be/_DKbZW7BdqA?si=6ZCmGQxwgQHqBLax",
    },
    {
      name: "Linear Algebra",
      youtubeLink: "https://youtu.be/_DKbZW7BdqA?si=6ZCmGQxwgQHqBLax",
    },
  ],
  Physics: [
    {
      name: "Newton's Laws",
      youtubeLink: "https://youtu.be/_DKbZW7BdqA?si=6ZCmGQxwgQHqBLax",
    },
  ],
  Chemistry: [
    {
      name: "Chemical Equations",
      youtubeLink: "https://youtu.be/_DKbZW7BdqA?si=6ZCmGQxwgQHqBLax",
    },
    {
      name: "Organic Chemistry",
      youtubeLink: "https://youtu.be/_DKbZW7BdqA?si=6ZCmGQxwgQHqBLax",
    },
  ],
  Biology: [
    {
      name: "Human Anatomy",
      youtubeLink: "https://youtu.be/_DKbZW7BdqA?si=6ZCmGQxwgQHqBLax",
    },
  ],
} as const;

type SubjectKey = keyof typeof SUBJECT_DATA;
const SUBJECTS = Object.keys(SUBJECT_DATA) as SubjectKey[];

export default function Simulation() {
  const [filters, setFilters] = useState({
    subjects: "Computer Science",
    topics: "",
    youtubeLink: "",
  });

  const sectionRef = useSectionAudio({
    audioSrc: simulationAudio,
    sectionId: "simulation",
  });

  // Get available topics for selected subject
  const availableTopics = (SUBJECT_DATA[filters.subjects as SubjectKey] || []);

  // Handle subject change - reset topic
  const handleSubjectChange = (subject: string) => {
    setFilters({
      subjects: subject,
      topics: "",
      youtubeLink: "",
    });
  };
  

  // Handle topic change - set youtube link
  const handleTopicChange = (topicName: string) => {
    const selectedTopic = availableTopics.find(
      (t: any) => t.name === topicName,
    );
    setFilters({
      ...filters,
      topics: topicName,
      youtubeLink: selectedTopic?.youtubeLink || "",
    });
  };

  // Launch Engine - open YouTube link in new tab
  const handleLaunchEngine = () => {
    if (filters.youtubeLink) {
      window.open(filters.youtubeLink, "_blank");
    }
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    try {
      if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (url.includes("youtube.com/watch?v=")) {
        const videoId = url.split("v=")[1].split("&")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url;
    } catch (e) {
      return url;
    }
  };

  return (
    <section
      id="simulation"
      className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden scroll-mt-28"
    >
      <div className="section-glass-wrap relative z-10 max-w-7xl mx-auto">
        <div className="flex p-3 justify-center text-3xl lg:text-5xl gap-3">
          <h1 className="text-nazli-purple/70">SIMULATION</h1>{" "}
          <h1 className="text-nazli-golden">VIDEOS</h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Controls Panel */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-full lg:w-80 shrink-0 space-y-8"
          >
            <div className="p-8 bg-nazli-purple/[0.6] hover:bg-nazli-purple/[0.7] border border-white/10 rounded-4xl backdrop-blur-xl">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-purple-500">
                Simulation Filters
              </h4>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-white/40 uppercase mb-2 block">
                    Subjects
                  </label>
                  <select
                    value={filters.subjects}
                    onChange={(e) => handleSubjectChange(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500 transition-colors font-bold"
                  >
                    {SUBJECTS.map((subject) => (
                      <option
                        key={subject}
                        value={subject}
                        className="bg-[#050505] font-bold"
                      >
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-white/40 uppercase mb-2 block">
                    Topics
                  </label>
                  <select
                    value={filters.topics}
                    onChange={(e) => handleTopicChange(e.target.value)}
                    disabled={!filters.subjects}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500 transition-colors font-bold disabled:opacity-50"
                  >
                    <option value="" className="bg-[#050505] font-bold">
                      Select Topic
                    </option>
                    {availableTopics.map((topic: any) => (
                      <option
                        key={topic.name}
                        value={topic.name}
                        className="bg-[#050505] font-bold"
                      >
                        {topic.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Simulation Viewport */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 space-y-8"
          >
            <div className="aspect-video bg-black rounded-[2.5rem] border border-white/10 overflow-hidden relative group shadow-2xl">
              {filters.youtubeLink ? (
                <iframe
                  width="560"
                  height="315"
                  src={getEmbedUrl(filters.youtubeLink)}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full object-cover"
                ></iframe>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-black/80">
                  <Play className="w-12 h-12 text-white/20 mb-4" />
                  <span className="text-white/50 text-xl font-bold uppercase tracking-widest">
                    {filters.topics ? "Coming Soon" : "Select a Topic"}
                  </span>
                </div>
              )}

              {/* HUD Elements */}
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />{" "}
                  Live Simulation
                </div>
                <div className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <Globe size={10} /> {filters.topics}
                </div>
              </div>
            </div>

            {/* Materials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[

                { title: "Lab Video", type: "Video", free: false },
                { title: "Worksheet", type: "PDF", free: true },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-nazli-purple/70 border border-white/10 rounded-3xl flex items-center justify-between group hover:bg-nazli-purple/80 transition-all"
                >
                  <div>
                    <h5 className="font-bold mb-1">{item.title}</h5>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                      {item.type} • {item.free ? "Free" : "Paid"}
                    </span>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                    {item.free ? <Download size={16} /> : <Play size={16} />}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <SocialHub />
      </div>
    </section>
  );
}
