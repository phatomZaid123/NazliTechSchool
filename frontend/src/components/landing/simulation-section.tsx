import { motion } from "framer-motion";
import { useState } from "react";
import {
  Play,
  Download,
  User,
  BookOpen,
  Globe,
  ArrowLeft,
} from "lucide-react";
import {
  IsometricNeonCityBackground,
  PrismGlassShardsBackground,
} from "./section-background-effects";
import SocialHub from "./social-media-section";
import {
  LANDING_OVERLAY_DIMNESS,
  createOverlayGradient,
} from "./section-overlay-dimness";
import SimulationImage from "../../assets/Globalbackground.png";

// Mock data structure: Courses -> Subjects -> Topics with YouTube links
const COURSE_DATA = {
  "AI Prompt Engineering": {
    "Computer Science": [
      { name: "Introduction to Prompting", youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { name: "Advanced Prompt Techniques", youtubeLink: "https://www.youtube.com/watch?v=9bZkp7q19f0" },
    ],
    Mathematics: [
      { name: "Math in AI", youtubeLink: "https://www.youtube.com/watch?v=jNgP6d9HraI" },
    ],
  },
  "AI and Machine Learning": {
    "Computer Science": [
      { name: "ML Basics", youtubeLink: "https://www.youtube.com/watch?v=aircAruvnKk" },
      { name: "Neural Networks", youtubeLink: "https://www.youtube.com/watch?v=aircAruvnKk" },
    ],
    Mathematics: [
      { name: "Linear Algebra for ML", youtubeLink: "https://www.youtube.com/watch?v=RowM3UbWGpI" },
    ],
  },
  "High Level Programming": {
    "Computer Science": [
      { name: "Python Basics", youtubeLink: "https://www.youtube.com/watch?v=kqtZrmDm4A8" },
      { name: "Object Oriented Programming", youtubeLink: "https://www.youtube.com/watch?v=JeznW_7DlrQ" },
    ],
  },
  "Software Engineering": {
    "Computer Science": [
      { name: "Design Patterns", youtubeLink: "https://www.youtube.com/watch?v=LAP2A80Ajrg" },
      { name: "System Design", youtubeLink: "https://www.youtube.com/watch?v=UzLMhqg3_Gw" },
    ],
  },
  Mathematics: {
    Mathematics: [
      { name: "Calculus Derivatives", youtubeLink: "https://www.youtube.com/watch?v=9vKqVkMQHKk" },
      { name: "Linear Algebra", youtubeLink: "https://www.youtube.com/watch?v=RowM3UbWGpI" },
    ],
  },
  Science: {
    Physics: [
      { name: "Newton's Laws", youtubeLink: "https://www.youtube.com/watch?v=kKKM8Y-u7f4" },
    ],
    Chemistry: [
      { name: "Chemical Equations", youtubeLink: "https://www.youtube.com/watch?v=D_JEsQjKjBQ" },
      { name: "Organic Chemistry", youtubeLink: "https://www.youtube.com/watch?v=1U14qDCk4KM" },
    ],
    Biology: [
      { name: "Human Anatomy", youtubeLink: "https://www.youtube.com/watch?v=uBGl2BujkPQ" },
    ],
  },
} as const;

type CourseKey = keyof typeof COURSE_DATA;

const COURSES = Object.keys(COURSE_DATA) as CourseKey[];

export default function Simulation() {
  const [role, setRole] = useState<"student" | "educator" | null>(null);
  const [filters, setFilters] = useState({
    courses: "AI Prompt Engineering",
    subjects: "",
    topics: "",
    youtubeLink: "",
  });

  // Get available subjects for selected course
  const availableSubjects = Object.keys(
    COURSE_DATA[filters.courses as CourseKey] || {}
  );

  // Get available topics for selected course and subject
  const availableTopics = (filters.subjects && filters.courses
    ? (COURSE_DATA[filters.courses as CourseKey] as any)[filters.subjects] || []
    : []) as any[];

  // Handle course change - reset subject and topic
  const handleCourseChange = (course: string) => {
    const subjects = Object.keys(COURSE_DATA[course as CourseKey] || {});
    setFilters({
      courses: course,
      subjects: subjects[0] || "",
      topics: "",
      youtubeLink: "",
    });
  };

  // Handle subject change - reset topic
  const handleSubjectChange = (subject: string) => {
    setFilters({
      ...filters,
      subjects: subject,
      topics: "",
      youtubeLink: "",
    });
  };

  // Handle topic change - set youtube link
  const handleTopicChange = (topicName: string) => {
    const selectedTopic = availableTopics.find((t: any) => t.name === topicName);
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

  if (!role) {
    return (
      <section
        id="simulation"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden scroll-mt-28 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${SimulationImage})`,
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay for better text readability */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: createOverlayGradient(
              LANDING_OVERLAY_DIMNESS.simulation,
            ),
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 uppercase">
            <span className="text-nazli-purple">Launch</span>  <span className="text-nazli-golden">Simulation</span>
          </h1>
          <p className="text-white/50 text-xl mb-12">
           Select your role to initialize a personalized learning simulation with lessons, labs, and guided content paths.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button
              onClick={() => setRole("educator")}
              className="p-10 bg-purple-600 border border-white/10 rounded-[2.5rem] text-left"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <BookOpen size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Educator</h3>
              <p className="text-white/80">
                Access teaching simulations and lesson planning tools.
              </p>
            </button>

            <button
              onClick={() => setRole("student")}
              className="p-10 bg-indigo-600 border border-white/10 rounded-[2.5rem] text-left"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <User size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Student</h3>
              <p className="text-white/80">
                Access study simulations and interactive revision materials.
              </p>
            </button>
          </div>
        </motion.div>
        <SocialHub/>
      </section>
    );
  }

  return (
    <section
      id="simulation"
      className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden scroll-mt-28 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${SimulationImage})`,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better text readability */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: createOverlayGradient(
            LANDING_OVERLAY_DIMNESS.simulation,
          ),
        }}
      />
      <PrismGlassShardsBackground />

      <div className="relative z-10 max-w-7xl mx-auto">
        <button
          onClick={() => setRole(null)}
          className="mb-8 inline-flex items-center gap-2 text-white/65 hover:text-amber-200 transition-colors uppercase text-sm font-bold tracking-widest group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform duration-150"
          />
          Back to Role Selection
        </button>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Controls Panel */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-full lg:w-80 shrink-0 space-y-8"
          >
            <div className="p-8 bg-white/5 border border-white/10 rounded-4xl backdrop-blur-xl">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-purple-500">
                Simulation Filters
              </h4>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-white/40 uppercase mb-2 block">
                    Courses
                  </label>
                  <select
                    value={filters.courses}
                    onChange={(e) => handleCourseChange(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500 transition-colors font-bold"
                  >
                    {COURSES.map((course) => (
                      <option
                        key={course}
                        value={course}
                        className="bg-[#050505] font-bold"
                      >
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-white/40 uppercase mb-2 block">
                    Subjects
                  </label>
                  <select
                    value={filters.subjects}
                    onChange={(e) => handleSubjectChange(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500 transition-colors font-bold"
                  >
                    <option value="" className="bg-[#050505] font-bold">
                      Select Subject
                    </option>
                    {availableSubjects.map((subject) => (
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

              <button 
                onClick={handleLaunchEngine}
                disabled={!filters.youtubeLink}
                className="w-full mt-8 bg-white text-black py-4 rounded-2xl font-bold hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play size={16} className="fill-current" /> Launch Engine
              </button>
            </div>

            <div className="p-8 bg-purple-600/10 border border-purple-500/20 rounded-4xl">
              <h5 className="text-sm font-bold mb-2">Simulation Mode</h5>
              <p className="text-xs text-white/60 leading-relaxed">
                Currently viewing as{" "}
                <span className="text-white font-bold uppercase">{role}</span>.
              </p>
            </div>
          </motion.div>

          {/* Simulation Viewport */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 space-y-8"
          >
            <div className="aspect-video bg-black rounded-[2.5rem] border border-white/10 overflow-hidden relative group shadow-2xl">
              <img
                src={`https://picsum.photos/seed/${filters.topics}/1280/720`}
                alt="Simulation Environment"
                className="w-full h-full object-cover opacity-40"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
                  <Play size={40} className="ml-2" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
                  {role === "educator"
                    ? "Virtual Classroom Simulation"
                    : "Interactive Study Desk"}
                </h2>
                <p className="text-white/60 max-w-lg">
                  {role === "educator"
                    ? `Simulating teaching "${filters.topics || "Topic"}" in ${filters.topics} using ${filters.subjects} curriculum.`
                    : `Simulating revision for "${filters.topics || "Topic"}" in ${filters.topics} for ${filters.subjects} exams.`}
                </p>
              </div>

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
                { title: "Movie Video", type: "Video", free: true },
                { title: "Lab Video", type: "Video", free: false },
                { title: "Worksheet", type: "PDF", free: true },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all"
                >
                  <div>
                    <h5 className="font-bold mb-1">{item.title}</h5>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
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
    
      </div>
     <SocialHub />
    </section>
  );
}
