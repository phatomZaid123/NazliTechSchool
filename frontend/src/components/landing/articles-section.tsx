import { motion } from "framer-motion";
import { Search, Sparkles, Clock, ArrowRight } from "lucide-react";
import SocialHub from "./social-media-section";
// import { SolarWindBandsBackground } from "./section-background-effects";
import {
  LANDING_OVERLAY_DIMNESS,
  createOverlayGradient,
} from "./section-overlay-dimness";
import ArticlesBackground from "../../assets/Globalbackground.png";

const ARTICLES = [
  {
    title: "The Future of AI in Education: Beyond the Classroom",
    excerpt:
      "How generative AI is personalizing learning paths for millions of students worldwide.",
    date: "March 15, 2026",
    category: "AI & Tech",
    image: "https://picsum.photos/seed/ai-edu/800/600",
    url: "https://blog.example.com/ai-education-future",
  },
  {
    title: "Mastering Python: Why it's still the King of Languages",
    excerpt:
      "A deep dive into the ecosystem that keeps Python at the top of the developer charts.",
    date: "March 12, 2026",
    category: "Programming",
    image: "https://picsum.photos/seed/python-king/800/600",
    url: "https://blog.example.com/python-mastery-guide",
  },
  {
    title: "Web3 and the Decentralized Learning Revolution",
    excerpt:
      "Exploring how blockchain technology can verify credentials and empower learners.",
    date: "March 10, 2026",
    category: "Blockchain",
    image: "https://picsum.photos/seed/web3-edu/800/600",
    url: "https://blog.example.com/web3-learning-revolution",
  },
];

export default function Articles() {
  return (
    <section
      id="articles"
      className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden scroll-mt-28"
      style={{
        backgroundImage: `url(${ArticlesBackground})`,
        backgroundAttachment: "fixed",
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

      {/* <SolarWindBandsBackground /> */}

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        >
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-5xl font-bold tracking-tighter mb-6 uppercase">
              <span className="text-purple-600">&lt;News /&gt;</span>{" "}
              <span className="text-gray-300">&amp;</span>{" "}
              <span className="text-nazli-golden">&lt;Insights /&gt;</span>
            </h1>
            <p className="text-white/50 text-xl code-inline px-4 py-2">
              // The latest updates from tech, education & AI
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition-colors pl-12 font-mono"
            />
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article, i) => (
            <motion.a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer block"
            >
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/10 mb-8 relative scanlines">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 code-tag">
                  #{article.category}
                </div>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4 font-mono">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {article.date}
                </span>
                <span className="flex items-center gap-1 text-nazli-golden">
                  AI_Summary
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-nazli-golden transition-colors leading-tight">
                {article.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:gap-4 transition-all font-mono method-highlight">
                → read_article() <ArrowRight size={14} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <SocialHub />
      </div>
    </section>
  );
}
