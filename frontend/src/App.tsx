import { LandingPage } from "@/pages/landing-page";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingScreen from "@/components/loading-screen";
import { CustomCursor } from "@/components/custom-cursor";
import { ParticleContainer } from "@/components/particle-container";
import { useState } from "react";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      <CustomCursor />
      <ParticleContainer />
      <LoadingScreen onComplete={() => setIsReady(true)} />
      {isReady && (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  );
}
