import { motion, useReducedMotion } from "framer-motion";
import { useState, type CSSProperties } from "react";
import { ExternalLink, Video, Calendar, ArrowLeft } from "lucide-react";
import type { IconType } from "react-icons";
import SocialHub from "./social-media-section";
import { ElectricRootfieldBackground } from "./section-background-effects";
import {
  FaBrain,
  FaRobot,
  FaCode,
  FaCubesStacked,
  FaGraduationCap,
  FaEarthAmericas,
  FaMicrochip,
  FaSquareRootVariable,
  FaFileLines,
  FaLanguage,
  FaFlaskVial,
  FaChartLine,
  FaDatabase,
  FaDiagramProject,
  FaLaptopCode,
  FaGamepad,
  FaUserSecret,
  FaPenNib,
  FaWandMagicSparkles,
} from "react-icons/fa6";

type CoursePricing = {
  "3m": string;
  "6m": string;
  "9m": string;
  "12m": string;
};

type CoursePattern =
  | "grid"
  | "dots"
  | "scan"
  | "circuit"
  | "hex"
  | "waves"
  | "stripes"
  | "cross";

type CourseHoverFx = "tilt" | "float" | "pulse" | "orbit" | "bounce" | "twist";

type CourseTheme = {
  pattern: CoursePattern;
  hoverFx: CourseHoverFx;
  iconTint: string;
  surfaceGlow: string;
};

type Course = {
  id: string;
  name: string;
  icon: IconType;
  color: string;
  bio: string;
  video: string;
  udemy: string;
  pricing: CoursePricing;
  theme: CourseTheme;
};

type IconMotionPreset = {
  hover: Record<string, number>;
};

const PATTERN_STYLES: Record<CoursePattern, CSSProperties> = {
  grid: {
    backgroundImage:
      "radial-gradient(circle at 18% 24%, rgba(255,255,255,0.18) 0%, transparent 42%), radial-gradient(circle at 82% 72%, rgba(255,255,255,0.14) 0%, transparent 48%)",
  },
  dots: {
    backgroundImage:
      "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.2) 0%, transparent 38%), radial-gradient(circle at 72% 66%, rgba(255,255,255,0.16) 0%, transparent 43%)",
  },
  scan: {
    backgroundImage:
      "linear-gradient(120deg, rgba(255,255,255,0.12) 0%, transparent 58%), radial-gradient(circle at 84% 22%, rgba(255,255,255,0.16) 0%, transparent 42%)",
  },
  circuit: {
    backgroundImage:
      "radial-gradient(circle at 14% 78%, rgba(255,255,255,0.16) 0%, transparent 34%), radial-gradient(circle at 78% 20%, rgba(255,255,255,0.18) 0%, transparent 36%), linear-gradient(160deg, rgba(255,255,255,0.1) 0%, transparent 60%)",
  },
  hex: {
    backgroundImage:
      "radial-gradient(circle at 12% 20%, rgba(255,255,255,0.17) 0%, transparent 38%), radial-gradient(circle at 88% 84%, rgba(255,255,255,0.14) 0%, transparent 44%)",
  },
  waves: {
    backgroundImage:
      "radial-gradient(circle at 35% 15%, rgba(255,255,255,0.2) 0%, transparent 38%), radial-gradient(circle at 66% 86%, rgba(255,255,255,0.15) 0%, transparent 45%)",
  },
  stripes: {
    backgroundImage:
      "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, transparent 55%), radial-gradient(circle at 76% 76%, rgba(255,255,255,0.15) 0%, transparent 42%)",
  },
  cross: {
    backgroundImage:
      "radial-gradient(circle at 24% 76%, rgba(255,255,255,0.16) 0%, transparent 36%), radial-gradient(circle at 74% 24%, rgba(255,255,255,0.16) 0%, transparent 38%), linear-gradient(110deg, rgba(255,255,255,0.1) 0%, transparent 58%)",
  },
};

const ICON_MOTION_PRESETS: Record<CourseHoverFx, IconMotionPreset> = {
  tilt: {
    hover: { rotate: -9, scale: 1.08, y: -3, x: 0 },
  },
  float: {
    hover: { y: -7, scale: 1.09, x: 1, rotate: 0 },
  },
  pulse: {
    hover: { scale: 1.12, y: -2, x: 0, rotate: 0 },
  },
  orbit: {
    hover: { rotate: 8, scale: 1.08, x: 2, y: -3 },
  },
  bounce: {
    hover: { y: -8, scale: 1.1, x: 0, rotate: 0 },
  },
  twist: {
    hover: { rotate: 11, scale: 1.08, y: -3, x: 1 },
  },
};

const COURSES: Course[] = [
  {
    id: "ai-prompt",
    name: "AI Prompt Engineering",
    icon: FaBrain,
    color: "from-fuchsia-500 via-purple-500 to-blue-500",
    bio: "Master the art of communicating with AI. Learn to craft precise prompts that unlock the full potential of LLMs.",
    video: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
    udemy:
      "https://www.udemy.com/user/alisia-habibi/?__cf_chl_tk=Xvb1Pw6t8vnhmdoKS_B2.pzr2kSqGRvprrE6jAMsO4o-1777195037-1.0.1.1-4oMIJpy4AhKaCOfATFC5IzxPrJlftuh_kmU2FCERVO0",
    pricing: { "3m": "$299", "6m": "$549", "9m": "$799", "12m": "$999" },
    theme: {
      pattern: "grid",
      hoverFx: "tilt",
      iconTint: "text-fuchsia-200",
      surfaceGlow: "rgba(217, 70, 239, 0.35)",
    },
  },
  {
    id: "ai-ml",
    name: "AI and Machine Learning",
    icon: FaRobot,
    color: "from-indigo-500 via-violet-500 to-purple-600",
    bio: "Dive deep into neural networks, deep learning, and predictive modeling. Build the intelligence of tomorrow.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    udemy:
      "https://www.udemy.com/user/alisia-habibi/?__cf_chl_tk=Xvb1Pw6t8vnhmdoKS_B2.pzr2kSqGRvprrE6jAMsO4o-1777195037-1.0.1.1-4oMIJpy4AhKaCOfATFC5IzxPrJlftuh_kmU2FCERVO0",
    pricing: { "3m": "$399", "6m": "$699", "9m": "$999", "12m": "$1299" },
    theme: {
      pattern: "circuit",
      hoverFx: "orbit",
      iconTint: "text-violet-200",
      surfaceGlow: "rgba(129, 140, 248, 0.35)",
    },
  },
  {
    id: "high-prog",
    name: "High Level Programming",
    icon: FaCode,
    color: "from-cyan-500 via-blue-500 to-indigo-600",
    bio: "Master Python, Java, JavaScript, HTML, CSS, PHP, SQL, C++, C#, and more. The ultimate developer foundation.",
    video: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
    udemy:
      "https://www.udemy.com/user/alisia-habibi/?__cf_chl_tk=Xvb1Pw6t8vnhmdoKS_B2.pzr2kSqGRvprrE6jAMsO4o-1777195037-1.0.1.1-4oMIJpy4AhKaCOfATFC5IzxPrJlftuh_kmU2FCERVO0",
    pricing: { "3m": "$349", "6m": "$599", "9m": "$849", "12m": "$1099" },
    theme: {
      pattern: "scan",
      hoverFx: "twist",
      iconTint: "text-cyan-100",
      surfaceGlow: "rgba(34, 211, 238, 0.36)",
    },
  },
  {
    id: "soft-ai-eng",
    name: "Software and AI Engineering",
    icon: FaCubesStacked,
    color: "from-slate-600 via-slate-700 to-slate-900",
    bio: "University-level engineering principles applied to software and AI systems. Professional grade development.",
    video: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
    udemy:
      "https://www.udemy.com/user/alisia-habibi/?__cf_chl_tk=Xvb1Pw6t8vnhmdoKS_B2.pzr2kSqGRvprrE6jAMsO4o-1777195037-1.0.1.1-4oMIJpy4AhKaCOfATFC5IzxPrJlftuh_kmU2FCERVO0",
    pricing: { "3m": "$449", "6m": "$799", "9m": "$1099", "12m": "$1399" },
    theme: {
      pattern: "hex",
      hoverFx: "pulse",
      iconTint: "text-slate-100",
      surfaceGlow: "rgba(148, 163, 184, 0.32)",
    },
  },
  {
    id: "ap-cs",
    name: "AP Computer Science",
    icon: FaGraduationCap,
    color: "from-red-500 via-orange-500 to-amber-500",
    bio: "Comprehensive preparation for AP exams. Master Java and object-oriented programming fundamentals.",
    video: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
    udemy:
      "https://www.udemy.com/user/alisia-habibi/?__cf_chl_tk=Xvb1Pw6t8vnhmdoKS_B2.pzr2kSqGRvprrE6jAMsO4o-1777195037-1.0.1.1-4oMIJpy4AhKaCOfATFC5IzxPrJlftuh_kmU2FCERVO0",
    pricing: { "3m": "$249", "6m": "$449", "9m": "$649", "12m": "$799" },
    theme: {
      pattern: "dots",
      hoverFx: "bounce",
      iconTint: "text-orange-100",
      surfaceGlow: "rgba(249, 115, 22, 0.35)",
    },
  },
  {
    id: "ib-cs",
    name: "IB Computer Science",
    icon: FaEarthAmericas,
    color: "from-blue-600 via-indigo-600 to-violet-700",
    bio: "Rigorous IB curriculum coverage. From system fundamentals to computational thinking and problem solving.",
    video: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
    udemy: "https://www.udemy.com",
    pricing: { "3m": "$249", "6m": "$449", "9m": "$649", "12m": "$799" },
    theme: {
      pattern: "grid",
      hoverFx: "float",
      iconTint: "text-blue-100",
      surfaceGlow: "rgba(59, 130, 246, 0.34)",
    },
  },
  {
    id: "igcse-cs",
    name: "IGCSE Computer Science",
    icon: FaMicrochip,
    color: "from-emerald-500 via-teal-500 to-cyan-600",
    bio: "Foundational computer science for IGCSE students. Binary logic, hardware, and basic programming.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    udemy:
      "https://www.udemy.com/user/alisia-habibi/?__cf_chl_tk=Xvb1Pw6t8vnhmdoKS_B2.pzr2kSqGRvprrE6jAMsO4o-1777195037-1.0.1.1-4oMIJpy4AhKaCOfATFC5IzxPrJlftuh_kmU2FCERVO0",
    pricing: { "3m": "$249", "6m": "$449", "9m": "$649", "12m": "$799" },
    theme: {
      pattern: "circuit",
      hoverFx: "tilt",
      iconTint: "text-emerald-100",
      surfaceGlow: "rgba(16, 185, 129, 0.34)",
    },
  },
  {
    id: "math",
    name: "Intensive Mathematics",
    icon: FaSquareRootVariable,
    color: "from-amber-400 via-orange-500 to-rose-500",
    bio: "Singapore, Asian, and North American curricula. Advanced IB/IGCSE/A-Level math mastery.",
    video: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
    udemy:
      "https://www.udemy.com/user/alisia-habibi/?__cf_chl_tk=Xvb1Pw6t8vnhmdoKS_B2.pzr2kSqGRvprrE6jAMsO4o-1777195037-1.0.1.1-4oMIJpy4AhKaCOfATFC5IzxPrJlftuh_kmU2FCERVO0",
    pricing: { "3m": "$299", "6m": "$549", "9m": "$799", "12m": "$999" },
    theme: {
      pattern: "waves",
      hoverFx: "pulse",
      iconTint: "text-amber-100",
      surfaceGlow: "rgba(251, 146, 60, 0.34)",
    },
  },
  {
    id: "exams",
    name: "IELTS, TOEFL, EIKEN",
    icon: FaFileLines,
    color: "from-pink-500 via-rose-500 to-red-500",
    bio: "Expert preparation for international English proficiency exams. Achieve your target scores.",
    video: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
    udemy: "https://www.udemy.com",
    pricing: { "3m": "$249", "6m": "$449", "9m": "$649", "12m": "$799" },
    theme: {
      pattern: "scan",
      hoverFx: "bounce",
      iconTint: "text-rose-100",
      surfaceGlow: "rgba(244, 63, 94, 0.33)",
    },
  },
  {
    id: "english",
    name: "Bespoke English Language",
    icon: FaLanguage,
    color: "from-sky-500 via-blue-500 to-indigo-500",
    bio: "Tailored English language instruction for all levels. Focus on communication and fluency.",
    video: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
    udemy:
      "https://www.udemy.com/user/alisia-habibi/?__cf_chl_tk=Xvb1Pw6t8vnhmdoKS_B2.pzr2kSqGRvprrE6jAMsO4o-1777195037-1.0.1.1-4oMIJpy4AhKaCOfATFC5IzxPrJlftuh_kmU2FCERVO0",
    pricing: { "3m": "$199", "6m": "$349", "9m": "$499", "12m": "$599" },
    theme: {
      pattern: "dots",
      hoverFx: "float",
      iconTint: "text-sky-100",
      surfaceGlow: "rgba(56, 189, 248, 0.34)",
    },
  },
  {
    id: "science",
    name: "Science Lab Genius",
    icon: FaFlaskVial,
    color: "from-green-500 via-emerald-500 to-teal-600",
    bio: "Theory and practical science mastery. Hands-on lab experience and deep scientific inquiry.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    udemy:
      "https://www.udemy.com/user/alisia-habibi/?__cf_chl_tk=Xvb1Pw6t8vnhmdoKS_B2.pzr2kSqGRvprrE6jAMsO4o-1777195037-1.0.1.1-4oMIJpy4AhKaCOfATFC5IzxPrJlftuh_kmU2FCERVO0",
    pricing: { "3m": "$299", "6m": "$549", "9m": "$799", "12m": "$999" },
    theme: {
      pattern: "hex",
      hoverFx: "orbit",
      iconTint: "text-green-100",
      surfaceGlow: "rgba(34, 197, 94, 0.34)",
    },
  },
  {
    id: "data-sci",
    name: "Data Science and Modelling",
    icon: FaChartLine,
    color: "from-violet-500 via-purple-500 to-fuchsia-600",
    bio: "Extract insights from data. Learn statistical modeling, data visualization, and big data analysis.",
    video: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
    udemy: "https://www.udemy.com",
    pricing: { "3m": "$349", "6m": "$599", "9m": "$849", "12m": "$1099" },
    theme: {
      pattern: "grid",
      hoverFx: "pulse",
      iconTint: "text-violet-100",
      surfaceGlow: "rgba(168, 85, 247, 0.35)",
    },
  },
  {
    id: "dbms",
    name: "Database Management",
    icon: FaDatabase,
    color: "from-amber-500 via-yellow-500 to-lime-600",
    bio: "Master the storage and retrieval of data. SQL, NoSQL, and database architecture design.",
    video: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
    udemy:
      "https://www.udemy.com/user/alisia-habibi/?__cf_chl_tk=Xvb1Pw6t8vnhmdoKS_B2.pzr2kSqGRvprrE6jAMsO4o-1777195037-1.0.1.1-4oMIJpy4AhKaCOfATFC5IzxPrJlftuh_kmU2FCERVO0",
    pricing: { "3m": "$299", "6m": "$549", "9m": "$799", "12m": "$999" },
    theme: {
      pattern: "circuit",
      hoverFx: "twist",
      iconTint: "text-yellow-100",
      surfaceGlow: "rgba(234, 179, 8, 0.34)",
    },
  },
  {
    id: "sys-design",
    name: "System Analysis and Design",
    icon: FaDiagramProject,
    color: "from-cyan-500 via-sky-500 to-blue-600",
    bio: "Learn to create official software development proposals. Architect complex digital systems.",
    video: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
    udemy:
      "https://www.udemy.com/user/alisia-habibi/?__cf_chl_tk=Xvb1Pw6t8vnhmdoKS_B2.pzr2kSqGRvprrE6jAMsO4o-1777195037-1.0.1.1-4oMIJpy4AhKaCOfATFC5IzxPrJlftuh_kmU2FCERVO0",
    pricing: { "3m": "$349", "6m": "$599", "9m": "$849", "12m": "$1099" },
    theme: {
      pattern: "scan",
      hoverFx: "orbit",
      iconTint: "text-cyan-100",
      surfaceGlow: "rgba(14, 165, 233, 0.35)",
    },
  },
  {
    id: "web-dev",
    name: "Website Design & Dev",
    icon: FaLaptopCode,
    color: "from-orange-500 via-red-500 to-pink-600",
    bio: "Modern web development from scratch. Master frontend and backend technologies.",
    video: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
    udemy:
      "https://www.udemy.com/user/alisia-habibi/?__cf_chl_tk=Xvb1Pw6t8vnhmdoKS_B2.pzr2kSqGRvprrE6jAMsO4o-1777195037-1.0.1.1-4oMIJpy4AhKaCOfATFC5IzxPrJlftuh_kmU2FCERVO0",
    pricing: { "3m": "$249", "6m": "$449", "9m": "$649", "12m": "$799" },
    theme: {
      pattern: "waves",
      hoverFx: "tilt",
      iconTint: "text-orange-100",
      surfaceGlow: "rgba(249, 115, 22, 0.35)",
    },
  },
  {
    id: "game-dev",
    name: "Game Design & Dev",
    icon: FaGamepad,
    color: "from-emerald-500 via-teal-500 to-cyan-500",
    bio: "Create your own interactive worlds. Game mechanics, level design, and engine mastery.",
    video: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
    udemy:
      "https://www.udemy.com/user/alisia-habibi/?__cf_chl_tk=Xvb1Pw6t8vnhmdoKS_B2.pzr2kSqGRvprrE6jAMsO4o-1777195037-1.0.1.1-4oMIJpy4AhKaCOfATFC5IzxPrJlftuh_kmU2FCERVO0",
    pricing: { "3m": "$349", "6m": "$599", "9m": "$849", "12m": "$1099" },
    theme: {
      pattern: "hex",
      hoverFx: "bounce",
      iconTint: "text-teal-100",
      surfaceGlow: "rgba(20, 184, 166, 0.35)",
    },
  },
  {
    id: "expert-sys",
    name: "Expert System Design",
    icon: FaUserSecret,
    color: "from-fuchsia-500 via-pink-500 to-rose-600",
    bio: "Build AI systems that mimic human expertise. Knowledge representation and inference engines.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    udemy:
      "https://www.udemy.com/user/alisia-habibi/?__cf_chl_tk=Xvb1Pw6t8vnhmdoKS_B2.pzr2kSqGRvprrE6jAMsO4o-1777195037-1.0.1.1-4oMIJpy4AhKaCOfATFC5IzxPrJlftuh_kmU2FCERVO0",
    pricing: { "3m": "$399", "6m": "$699", "9m": "$999", "12m": "$1299" },
    theme: {
      pattern: "dots",
      hoverFx: "twist",
      iconTint: "text-pink-100",
      surfaceGlow: "rgba(236, 72, 153, 0.35)",
    },
  },
  {
    id: "3d-pen",
    name: "3D Pen Printing",
    icon: FaPenNib,
    color: "from-rose-500 via-orange-500 to-amber-500",
    bio: "Bring your drawings to life in 3D. Master the art of spatial creation and physical modeling.",
    video: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
    udemy:
      "https://www.udemy.com/user/alisia-habibi/?__cf_chl_tk=Xvb1Pw6t8vnhmdoKS_B2.pzr2kSqGRvprrE6jAMsO4o-1777195037-1.0.1.1-4oMIJpy4AhKaCOfATFC5IzxPrJlftuh_kmU2FCERVO0",
    pricing: { "3m": "$149", "6m": "$249", "9m": "$349", "12m": "$449" },
    theme: {
      pattern: "stripes",
      hoverFx: "float",
      iconTint: "text-rose-100",
      surfaceGlow: "rgba(251, 113, 133, 0.34)",
    },
  },
  {
    id: "ai-visual",
    name: "AI Visual Alchemy",
    icon: FaWandMagicSparkles,
    color: "from-purple-600 via-indigo-600 to-sky-500",
    bio: "Next-gen content creation. Mastering Gemini Pro 3.0, Nano Banana, and AI-driven visual arts.",
    video: "https://www.youtube.com/embed/nfgLp0YYEZU?si=GmM37tml2z7ImfVY",
    udemy:
      "https://www.udemy.com/user/alisia-habibi/?__cf_chl_tk=Xvb1Pw6t8vnhmdoKS_B2.pzr2kSqGRvprrE6jAMsO4o-1777195037-1.0.1.1-4oMIJpy4AhKaCOfATFC5IzxPrJlftuh_kmU2FCERVO0",
    pricing: { "3m": "$299", "6m": "$549", "9m": "$799", "12m": "$999" },
    theme: {
      pattern: "cross",
      hoverFx: "pulse",
      iconTint: "text-indigo-100",
      surfaceGlow: "rgba(129, 140, 248, 0.35)",
    },
  },
];

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const activeGlow = selectedCourse
    ? selectedCourse.theme.surfaceGlow
    : "rgba(147, 51, 234, 0.22)";

  return (
    <section
      id="courses"
      className="min-h-screen pt-32 pb-20 px-6 relative overflow-x-hidden scroll-mt-28"
    >
      <ElectricRootfieldBackground />

      <motion.div
        className="absolute inset-0 opacity-45 blur-[120px] pointer-events-none z-[1]"
        animate={{
          background: `radial-gradient(circle at 50% 45%, ${activeGlow}, transparent 72%)`,
        }}
        transition={{ duration: 0.28 }}
      />

      <div className="max-w-[90rem] mx-auto relative z-10">
        {!selectedCourse ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-20"
            >
              <p className="mx-auto mb-4 inline-flex rounded-full border border-nazli-golden/45 bg-nazli-golden/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-nazli-golden">
                Program Catalog
              </p>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 uppercase leading-none">
                <span className="text-white">Our </span>
                <span
                  className="relative inline-block bg-gradient-to-r from-purple-300 via-purple-400 to-amber-300 bg-clip-text pr-8 text-transparent"
                  style={{ clipPath: "polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%)" }}
                >
                  Courses
                </span>
              </h1>
              <p className="text-white/70 text-xl max-w-2xl mx-auto font-medium">
                <span className="code-tag">Select a path to begin your journey</span>
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {COURSES.map((course, i) => {
                const Icon = course.icon;
                const motionPreset = ICON_MOTION_PRESETS[course.theme.hoverFx];
                const isHovered = hoveredCourse === course.id;

                return (
                  <motion.button
                    key={course.id}
                    type="button"
                    initial={{ opacity: 0, y: 26, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.028, duration: 0.32 }}
                    whileHover={{
                      y: -6,
                      scale: 1.008,
                      transition: { duration: 0.16 },
                    }}
                    whileTap={{ scale: 0.995 }}
                    onMouseEnter={() => setHoveredCourse(course.id)}
                    onMouseLeave={() => setHoveredCourse(null)}
                    onFocus={() => setHoveredCourse(course.id)}
                    onBlur={() => setHoveredCourse(null)}
                    onClick={() => setSelectedCourse(course)}
                    className="group relative min-h-[19rem] sm:min-h-[20rem] rounded-[2rem] p-7 sm:p-8 border border-white/10 bg-white/[0.03] text-left overflow-hidden backdrop-blur-md flex flex-col justify-between transition-all duration-150"
                    style={{
                      boxShadow: isHovered
                        ? `0 20px 36px -24px ${course.theme.surfaceGlow}`
                        : "0 0 0 0 transparent",
                    }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-[0.14] transition-opacity duration-150 ${
                        isHovered ? "opacity-[0.2]" : ""
                      }`}
                    />
                    <div
                      className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-150"
                      style={PATTERN_STYLES[course.theme.pattern]}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-black/55" />

                    <div className="relative z-10 flex items-start justify-between">
                      <div
                        className={`relative w-16 h-16 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl flex items-center justify-center ${course.theme.iconTint}`}
                      >
                        <motion.span
                          animate={
                            isHovered
                              ? motionPreset.hover
                              : { rotate: 0, scale: 1, y: 0, x: 0 }
                          }
                          transition={
                            prefersReducedMotion
                              ? { duration: 0.12 }
                              : {
                                  duration: 0.16,
                                  ease: "easeOut",
                                }
                          }
                          className="text-[1.75rem] leading-none"
                        >
                          <Icon />
                        </motion.span>
                      </div>

                      <span className="text-[11px] tracking-[0.2em] uppercase text-white/40 font-semibold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="relative z-10 space-y-4">
                      <h3 className="text-2xl font-bold leading-tight text-white group-hover:text-amber-200 transition-colors duration-150">
                        {course.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/70 max-h-[4.6rem] overflow-hidden">
                        {course.bio}
                      </p>
                    </div>

                    <div className="relative z-10 pt-2 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-purple-100/80">
                      <span className="text-amber-200/90">Explore Path</span>
                      <span className="transition-transform duration-150 group-hover:translate-x-1 text-white/85">
                        →
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <button
              onClick={() => setSelectedCourse(null)}
              className="flex items-center gap-2 text-white/55 hover:text-amber-200 mb-10 transition-colors duration-150 uppercase text-sm font-bold tracking-widest group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform duration-150"
              />
              Back to Courses
            </button>

            <div className="relative rounded-[2.7rem] border border-white/10 bg-white/[0.025] p-6 md:p-10 overflow-hidden">
              <div className="pointer-events-none absolute inset-0">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${selectedCourse.color} opacity-[0.14]`}
                />
                <div
                  className="absolute inset-0 opacity-[0.15]"
                  style={PATTERN_STYLES[selectedCourse.theme.pattern]}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/52 via-black/34 to-black/56" />
                <div className="absolute -top-16 -left-12 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl" />
                <div className="absolute -bottom-20 -right-16 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl" />

                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[14rem] md:text-[22rem] ${selectedCourse.theme.iconTint}`}
                  style={{
                    opacity: 0.11,
                    filter: `drop-shadow(0 0 28px ${selectedCourse.theme.surfaceGlow})`,
                  }}
                >
                  <selectedCourse.icon />
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <div>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    <div
                      className={`inline-flex items-center justify-center p-6 rounded-[2rem] bg-gradient-to-br ${selectedCourse.color} mb-8 border border-white/20`}
                      style={{
                        boxShadow: `0 10px 30px -18px ${selectedCourse.theme.surfaceGlow}`,
                      }}
                    >
                      <selectedCourse.icon className="text-5xl text-white" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none bg-gradient-to-r from-white via-purple-200 to-amber-200 text-transparent bg-clip-text">
                      {selectedCourse.name}
                    </h2>
                    <p className="text-xl text-white/78 leading-relaxed mb-12 font-medium max-w-2xl">
                      {selectedCourse.bio}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-12">
                      <a 
                      className="bg-nazli-purple text-nazli-golden px-10 py-5 rounded-2xl font-bold flex items-center gap-2 hover:brightness-110 transition-all duration-150 hover:scale-[1.02] active:scale-95"
                      href="https://calendar.app.google/eq7krfDvWy73Gk8o9" target="_blank" rel="noopener noreferrer"> 
                        <Calendar size={18} /> Book Consultation
                        
                      </a>
                      <a
                        href={selectedCourse.udemy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/5 border border-white/15 px-10 py-5 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/10 hover:border-amber-300/50 transition-all duration-150 hover:scale-[1.02] active:scale-95"
                      >
                        <ExternalLink size={18} /> View on Udemy
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-amber-300">
                      In-House Pricing
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {Object.entries(selectedCourse.pricing).map(
                        ([duration, price]) => (
                          <div
                            key={duration}
                            className="bg-white/[0.07] border border-white/[0.14] p-5 rounded-2xl text-center backdrop-blur-md"
                          >
                            <span className="block text-[10px] text-white/40 uppercase font-black mb-1 tracking-wider">
                              {duration}
                            </span>
                            <span className="text-xl font-bold">{price}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="aspect-video bg-black rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl relative group">
                    <iframe
                      src={selectedCourse.video}
                      className="w-full h-full"
                      title="Course Teaser"
                      allowFullScreen
                    />
                  </div>

                  <div className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-md relative overflow-hidden">
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${selectedCourse.color} opacity-14 blur-3xl`}
                    />
                    <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Video size={20} className="text-amber-300" /> Course
                      Highlights
                    </h4>
                    <ul className="space-y-4 text-white/78 text-sm font-medium">
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                        Interactive Lab Simulations
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                        Industry-Standard Projects
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                        1-on-1 Mentorship Available
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                        Certification upon Completion
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="relative z-10 mx-auto max-w-[90rem]">
        <SocialHub />
      </div>
    </section>
  );
}
