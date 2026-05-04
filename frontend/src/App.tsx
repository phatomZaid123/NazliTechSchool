import { LandingPage } from "@/pages/landing-page";
// import { CommunityPage } from "@/pages/community-page";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingScreen from "@/components/loading-screen";

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<Navigate to="/" replace />} />
        {/* <Route path="/community" element={<CommunityPage />} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
