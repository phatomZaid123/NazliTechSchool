import { AdminPage } from "@/pages/admin-page";
import { AdminDashboardRedesigned } from "@/pages/admin-dashboard-redesigned";
import { LandingPage } from "@/pages/landing-page";
import { StudentDashboardRedesigned } from "@/pages/student-dashboard-redesigned";
import { InstructorDashboardRedesigned } from "@/pages/instructor-dashboard-redesigned";
import { CommunityPage } from "@/pages/community-page";
import { Navigate, Route, Routes } from "react-router-dom";
import { StudentDashboard } from "./pages/student-dashboard";
import { InstructorDashboard } from "./pages/instructor-dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/admin" element={<AdminPage />} /> */}
      <Route path="/admin" element={<AdminDashboardRedesigned />} />

      <Route path="/student/*" element={<StudentDashboardRedesigned />} />

      {/* <Route path="/student/*" element={<StudentDashboard />} /> */}
      <Route path="/instructor/*" element={<InstructorDashboardRedesigned />} /
      >
      <Route path="/community" element={<CommunityPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
