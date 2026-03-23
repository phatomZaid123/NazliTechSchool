import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { SimulationSection } from "@/components/landing/simulation-section"
import { VideoFeedSection } from "@/components/landing/video-feed-section"
import { GlobalLearningSection } from "@/components/landing/global-learning-section"
import { CoursesSection } from "@/components/landing/courses-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { SocialMediaSection } from "@/components/landing/social-media-section"
import { AdminDashboardPreview } from "@/components/landing/admin-dashboard-preview"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"
import { AIAssistant } from "@/components/landing/ai-assistant"
import { ParticleBackground } from "@/components/landing/particle-background"
import { SocialSidebar } from "@/components/landing/social-sidebar"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Animated particle background */}
      <ParticleBackground />
      
      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <SimulationSection />
        <VideoFeedSection />
        <GlobalLearningSection />
        <CoursesSection />
        <PricingSection />
        <SocialMediaSection />
        <AdminDashboardPreview />
        <CTASection />
        <Footer />
      </div>
      
      {/* Floating AI Assistant */}
      <AIAssistant />
      
      {/* Floating Social Sidebar */}
      <SocialSidebar />
    </main>
  )
}
