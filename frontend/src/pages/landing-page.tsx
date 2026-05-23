import { Navbar } from "@/components/landing/navbar";
import { AnnouncementBar } from "@/components/landing/announcement-bar";
import { UdemyCoursesModal } from "@/components/landing/udemy-courses-modal";
import { MascotGuide } from "@/components/landing/mascot-guide";
import { HeroSection } from "@/components/landing/hero-section";
import { Suspense, lazy, useEffect, useState } from "react";

// Lazy load components that appear below the fold
const VideoFeedSection = lazy(() => import("@/components/landing/video-feed-section"));
const Courses = lazy(() => import("@/components/landing/courses-section"));
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

// const Footer = lazy(() =>
//   import("@/components/landing/footer").then((m) => ({
//     default: m.Footer,
//   })),
// );

export function LandingPage() {
  const [showUdemyModal, setShowUdemyModal] = useState(false);

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
      <AnnouncementBar />
      <UdemyCoursesModal
        isOpen={showUdemyModal}
        onClose={() => setShowUdemyModal(false)}
      />

      <div className="relative z-10 pt-28">
        <Navbar />
      
        <HeroSection />
        <Suspense fallback={null}>
          <VideoFeedSection />
          <Courses />
          <CurriculumSection />
          <SimulationSection />
          <AppsSection />
          <PricingSection />
          <TestimonialsSection />
          <Articles />
          <AboutSection />
          <QuestionsSection />
          {/* <CTASection /> */}
          {/* <Footer /> */}
        </Suspense>

        {/* <MascotGuide /> */}
      </div>
    </main>
  );
}
