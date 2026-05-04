import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
// import { SimulationSection } from "@/components/landing/simulation-section";
import { VideoFeedSection } from "@/components/landing/video-feed-section";
import { CurriculumSection } from "@/components/landing/curriculum-section";
import { LearningModesSection } from "@/components/landing/learning-modes-section";
import { CoursesSection } from "@/components/landing/courses-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { GlobalLearningSection } from "@/components/landing/global-learning-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { SocialMediaSection } from "@/components/landing/social-media-section";
import { QuestionsSection } from "@/components/landing/questions-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

import { ParticleBackground } from "@/components/landing/particle-background";

export function LandingPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <ParticleBackground />

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        {/* <SimulationSection /> */}
        <CurriculumSection />
        <LearningModesSection />
        <CoursesSection />
        <VideoFeedSection />
        <TestimonialsSection />
        <GlobalLearningSection />
        <PricingSection />
        <SocialMediaSection />
        <QuestionsSection />
        <CTASection />
        <Footer />
      </div>

     
    </main>
  );
}
