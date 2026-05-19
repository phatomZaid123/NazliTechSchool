import { Navbar } from "@/components/landing/navbar";
import { AnnouncementBar } from "@/components/landing/announcement-bar";
import { UdemyCoursesModal } from "@/components/landing/udemy-courses-modal";
import { MascotGuide } from "@/components/landing/mascot-guide";
import { HeroSection } from "@/components/landing/hero-section";
import { Suspense, lazy, useEffect, useState } from "react";
import VideoFeedSection from "@/components/landing/video-feed-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { AppsSection } from "@/components/landing/apps-section";
import  Courses  from "@/components/landing/courses-section";
import SimulationSection from "@/components/landing/simulation-section";

// Lazy load components that appear below the fold

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

// const GlobalLearningSection = lazy(() =>
//   import("@/components/landing/global-learning-section").then((m) => ({
//     default: m.GlobalLearningSection,
//   })),
// );
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
// const CTASection = lazy(() =>
//   import("@/components/landing/cta-section").then((m) => ({
//     default: m.CTASection,
//   })),
// );
const Footer = lazy(() =>
  import("@/components/landing/footer").then((m) => ({
    default: m.Footer,
  })),
);

export function LandingPage() {
  const [showUdemyModal, setShowUdemyModal] = useState(false);

  useEffect(() => {
    // Show modal after loading screen finishes (4 seconds)
    const timer = setTimeout(() => {
      setShowUdemyModal(true);
    }, 4000);

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

  return (
    <main data-landing-page="true" className="relative min-h-screen">
      <AnnouncementBar />
      <UdemyCoursesModal
        isOpen={showUdemyModal}
        onClose={() => setShowUdemyModal(false)}
      />

      <div className="relative z-10 pt-28">
        <Navbar />
        {/* <BackgroundPreview /> */}
        <HeroSection />
        <VideoFeedSection />
        <Courses />
        <CurriculumSection />

        {/* Lazy loaded sections */}
        {/* <Suspense fallback={null}> */}
      
       
        
          <SimulationSection />
          <AppsSection />

          <PricingSection />
          <TestimonialsSection />

          <Articles />
          <AboutSection />
          <QuestionsSection />
          {/* <CTASection /> */}
          <Footer />
        {/* </Suspense> */}

        {/* <MascotGuide /> */}
      </div>
    </main>
  );
}
