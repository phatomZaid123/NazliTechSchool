import { Navbar } from "@/components/landing/navbar";
import { AnnouncementBar } from "@/components/landing/announcement-bar";
import { UdemyCoursesModal } from "@/components/landing/udemy-courses-modal";
import { HeroSection } from "@/components/landing/hero-section";
import { GlobalBackground } from "@/components/landing/global-background";
import { Suspense, lazy, useEffect, useState, useRef } from "react";
type SectionId = "video-feed" | "courses" | "worksheets" | "curriculum" | "simulation" | "apps" | "pricing" | "testimonials" | "articles" | "about" | "contact";

const SECTION_CONFIGS: Record<SectionId, { component: () => Promise<any>; name: string }> = {
  "video-feed": { component: () => import("@/components/landing/video-feed-section"), name: "VideoFeedSection" },
  "courses": { component: () => import("@/components/landing/courses-section"), name: "Courses" },
  "worksheets": { component: () => import("@/components/landing/worksheets-section"), name: "Worksheets" },
  "curriculum": { component: () => import("@/components/landing/curriculum-section").then((m) => ({ default: m.CurriculumSection })), name: "CurriculumSection" },
  "simulation": { component: () => import("@/components/landing/simulation-section"), name: "SimulationSection" },
  "apps": { component: () => import("@/components/landing/apps-section").then((m) => ({ default: m.AppsSection })), name: "AppsSection" },
  "pricing": { component: () => import("@/components/landing/pricing-section").then((m) => ({ default: m.PricingSection })), name: "PricingSection" },
  "testimonials": { component: () => import("@/components/landing/testimonials-section").then((m) => ({ default: m.TestimonialsSection })), name: "TestimonialsSection" },
  "articles": { component: () => import("@/components/landing/articles-section"), name: "Articles" },
  "about": { component: () => import("@/components/landing/about-section").then((m) => ({ default: m.AboutSection })), name: "AboutSection" },
  "contact": { component: () => import("@/components/landing/questions-section").then((m) => ({ default: m.QuestionsSection })), name: "QuestionsSection" },
};

const SECTION_ORDER: SectionId[] = ["video-feed", "courses", "worksheets", "curriculum", "simulation", "apps", "pricing", "testimonials", "articles", "about", "contact"];

// Lazy load components that appear below the fold
const VideoFeedSection = lazy(() => import("@/components/landing/video-feed-section"));
const Courses = lazy(() => import("@/components/landing/courses-section"));
const Worksheets = lazy(() => import("@/components/landing/worksheets-section"));
const SimulationSection = lazy(() => import("@/components/landing/simulation-section"));
const AppsSection = lazy(() =>
  import("@/components/landing/apps-section").then((m) => ({
    default: m.AppsSection,
  })),
);
const TestimonialsSection = lazy(() =>
  import("@/components/landing/testimonials-section").then((m) => ({
    default: m.TestimonialsSection,
  })),
);

const CurriculumSection = lazy(() =>
  import("@/components/landing/curriculum-section").then((m) => ({
    default: m.CurriculumSection,
  })),
);

const Articles = lazy(() => import("@/components/landing/articles-section"));
const AboutSection = lazy(() =>
  import("@/components/landing/about-section").then((m) => ({
    default: m.AboutSection,
  })),
);

const PricingSection = lazy(() =>
  import("@/components/landing/pricing-section").then((m) => ({
    default: m.PricingSection,
  })),
);

const QuestionsSection = lazy(() =>
  import("@/components/landing/questions-section").then((m) => ({
    default: m.QuestionsSection,
  })),
);

export function LandingPage() {
  const [showUdemyModal, setShowUdemyModal] = useState(false);
  const [preloadedSections, setPreloadedSections] = useState<Set<SectionId>>(new Set());
  const preloadTimeoutRef = useRef<number | null>(null);
  const lastScrollPositionRef = useRef(0);
  const scrollDirectionRef = useRef<"down" | "up" | null>(null);

  // Preload specific section (e.g., on navbar click)
  const preloadSection = (sectionId: SectionId) => {
    if (preloadedSections.has(sectionId)) return;

    // Trigger the import to start loading
    SECTION_CONFIGS[sectionId].component();
    setPreloadedSections(prev => new Set(prev).add(sectionId));
  };

  // Preload sections ahead of current section
  const preloadSectionsAhead = (sectionId: SectionId, count = 2) => {
    const currentIndex = SECTION_ORDER.indexOf(sectionId);
    if (currentIndex === -1) return;

    for (let i = 1; i <= count; i++) {
      const nextSection = SECTION_ORDER[currentIndex + i];
      if (nextSection && !preloadedSections.has(nextSection)) {
        preloadSection(nextSection);
      }
    }
  };

  // Detect which section user is scrolling toward
  const detectAndPreloadNextSections = () => {
    const currentScroll = window.scrollY;
    const direction = currentScroll > lastScrollPositionRef.current ? "down" : "up";

    if (direction !== scrollDirectionRef.current) {
      scrollDirectionRef.current = direction;

      if (direction === "down") {
        // User is scrolling down, preload next sections
        const viewportMiddle = window.innerHeight / 2;

        // Check which section is in view
        SECTION_ORDER.forEach((sectionId) => {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            // If section is coming into view soon (within next viewport)
            if (rect.top < window.innerHeight * 1.5 && rect.top > -window.innerHeight) {
              preloadSectionsAhead(sectionId, 2);
            }
          }
        });
      }
    }

    lastScrollPositionRef.current = currentScroll;
  };

  // Setup scroll listener for predictive preloading
  useEffect(() => {
    const handleScroll = () => {
      if (preloadTimeoutRef.current) {
        clearTimeout(preloadTimeoutRef.current);
      }
      preloadTimeoutRef.current = setTimeout(detectAndPreloadNextSections, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (preloadTimeoutRef.current) {
        clearTimeout(preloadTimeoutRef.current);
      }
    };
  }, [preloadedSections]);

  // Expose preload function globally for navbar access
  useEffect(() => {
    (window as any).__preloadLandingSection = preloadSection;
    (window as any).__preloadLandingSectionsAhead = preloadSectionsAhead;

    return () => {
      delete (window as any).__preloadLandingSection;
      delete (window as any).__preloadLandingSectionsAhead;
    };
  }, [preloadedSections]);

  useEffect(() => {
    // Let the page settle before showing the modal.
    const timer = window.setTimeout(() => {
      setShowUdemyModal(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("landing-snap");
    document.body.classList.add("landing-snap-body");

    return () => {
      document.documentElement.classList.remove("landing-snap");
      document.body.classList.remove("landing-snap-body");
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const keyboardScrollKeys = new Set([
      "ArrowUp",
      "ArrowDown",
      "PageUp",
      "PageDown",
      "Home",
      "End",
      " ",
    ]);
    let releaseTimer: number | undefined;

    const isEditableTarget = () => {
      const active = document.activeElement;
      if (!(active instanceof HTMLElement)) return false;
      if (active.isContentEditable) return true;

      const tag = active.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
    };

    const releaseKeyboardScroll = () => {
      if (releaseTimer) {
        window.clearTimeout(releaseTimer);
      }

      releaseTimer = window.setTimeout(() => {
        root.classList.remove("landing-keyboard-scroll");
      }, 140);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!keyboardScrollKeys.has(event.key)) return;
      if (isEditableTarget()) return;

      if (event.repeat) {
        root.classList.add("landing-keyboard-scroll");
      } else {
        releaseKeyboardScroll();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!keyboardScrollKeys.has(event.key)) return;
      releaseKeyboardScroll();
    };

    window.addEventListener("keydown", handleKeyDown, { passive: true });
    window.addEventListener("keyup", handleKeyUp, { passive: true });

    return () => {
      if (releaseTimer) {
        window.clearTimeout(releaseTimer);
      }
      root.classList.remove("landing-keyboard-scroll");
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <main data-landing-page="true" className="relative min-h-screen">
      <GlobalBackground>
        <AnnouncementBar />
        <UdemyCoursesModal
          isOpen={showUdemyModal}
          onClose={() => setShowUdemyModal(false)}
        />

        <div className="relative z-10 pt-28">
          <Navbar onNavigate={preloadSectionsAhead} />

          <div id="home">
            <HeroSection />
          </div>
          <Suspense fallback={null}>
            <div id="video-feed">
              <VideoFeedSection />
            </div>
            <div id="courses">
              <Courses />
            </div>
            <div id="curriculum">
              <CurriculumSection />
            </div>
            <div id="simulation">
              <SimulationSection />
            </div>
            <div id="apps">
              <AppsSection />
            </div>
            <div id="pricing">
              <PricingSection />
            </div>
            <div id="testimonials">
              <TestimonialsSection />
            </div>
            <div id="articles">
              <Articles />
            </div>
            <div id="about">
              <AboutSection />
            </div>
            <div id="contact">
              <QuestionsSection />
            </div>
          </Suspense>
        </div>
      </GlobalBackground>
    </main>
  );
}
