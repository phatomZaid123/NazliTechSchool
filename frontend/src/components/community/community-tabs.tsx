import { motion } from "framer-motion";

type TabType = "blogs" | "videos" | "events";

interface CommunityTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function CommunityTabs({ activeTab, onTabChange }: CommunityTabsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-12 justify-center sm:justify-start">
      {[
        { id: "blogs" as const, label: "📚 Blogs" },
        { id: "videos" as const, label: "🎬 Videos" },
        { id: "events" as const, label: "🎆 Events" },
      ].map((tab) => (
        <motion.button
          key={tab.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === tab.id
              ? "bg-linear-to-r from-primary to-accent text-white shadow-lg"
              : "bg-background border border-border/50 text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
}
