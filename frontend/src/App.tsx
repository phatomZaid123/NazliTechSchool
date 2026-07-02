import { LandingPage } from "@/pages/landing-page";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingScreen from "@/components/loading-screen";
import { CustomCursor } from "@/components/custom-cursor";
import { ParticleContainer } from "@/components/particle-container";
import { AudioProvider } from "@/context/audio-context";
import { useState } from "react";
import { PausePlayButton } from "@/components/pause-play-button";
import { FloatingFeedback } from "@/components/floating-feedback";
export default function App() {
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      <CustomCursor />
      <ParticleContainer />

      <AudioProvider>
        <LoadingScreen onComplete={() => setIsReady(true)} />
        <PausePlayButton />
        <FloatingFeedback />
        {isReady && (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </AudioProvider>
    </>
  );
}
