import { motion } from "framer-motion";
import { Search, Sparkles, Clock, ArrowRight } from "lucide-react";
import { useSectionAudio } from "@/hooks/use-section-audio";
import articlesAudio from "@/assets/articlesaudio.mp3";
import SocialHub from "./social-media-section";
// import { SolarWindBandsBackground } from "./section-background-effects";

const ARTICLES = [
  {
    title: "The Future of AI in Education: Beyond the Classroom",
    excerpt:
      "How generative AI is personalizing learning paths for millions of students worldwide.",
    date: "March 15, 2026",
    category: "AI & Tech",
    image: "https://picsum.photos/seed/ai-edu/800/600",
    url: "https://sites.google.com/nazlitechschool.org/nazli-tech-school-news/home",
  },
  {
    title: "Mastering Python: Why it's still the King of Languages",
    excerpt:
      "A deep dive into the ecosystem that keeps Python at the top of the developer charts.",
    date: "March 12, 2026",
    category: "Programming",
    image: "https://picsum.photos/seed/python-king/800/600",
    url: "https://sites.google.com/nazlitechschool.org/nazli-tech-school-news/home",
  },
  {
    title: "Web3 and the Decentralized Learning Revolution",
    excerpt:
      "Exploring how blockchain technology can verify credentials and empower learners.",
    date: "March 10, 2026",
    category: "Blockchain",
    image: "https://picsum.photos/seed/web3-edu/800/600",
    url: "https://sites.google.com/nazlitechschool.org/nazli-tech-school-news/home",
  },
];

export default function Articles() {
  const sectionRef = useSectionAudio({
    audioSrc: articlesAudio,
    sectionId: "articles",
  });

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="articles"
      className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden scroll-mt-28"
    >
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group cursor-pointer block"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/8 hover:border-white/15 mb-8 relative scanlines shadow-lg shadow-black/20 hover:shadow-black/40 transition-all duration-250">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-250" />
                <div className="absolute top-6 left-6 code-tag">
                  #{article.category}
                </div>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4 font-mono">
                <span className="flex items-center gap-1 text-nazli-white">
                  <Clock size={12} /> {article.date}
                </span>
                <span className="flex items-center gap-1 text-nazli-golden">
                  AI_Summary
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-nazli-golden transition-colors duration-250 leading-tight tracking-tight">
                {article.title}
              </h3>
              <p className="text-white text-sm leading-[1.65] mb-6 line-clamp-2">
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
