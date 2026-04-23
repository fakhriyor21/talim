import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { isAuthenticated } from "./auth/session";
import { AppShell } from "./layout/AppShell";
import { AuthPage } from "./pages/AuthPage";
import { HomePage } from "./pages/HomePage";
import { LabsIndexPage } from "./pages/labs/LabsIndexPage";
import { LabEmbedPage } from "./pages/labs/LabEmbedPage";
import { LabPracticePage } from "./pages/labs/LabPracticePage";
import { LabsModulePage } from "./pages/labs/LabsModulePage";

function RequireAuth() {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}

function RedirectIfAuthed() {
  if (isAuthenticated()) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<RedirectIfAuthed />}>
        <Route path="auth" element={<AuthPage />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="labs" element={<LabsIndexPage />} />
          <Route path="labs/module/:moduleId" element={<LabsModulePage />} />
          <Route path="labs/view/:slug" element={<LabEmbedPage />} />
          <Route path="labs/practice/:labId" element={<LabPracticePage />} />
          <Route path="kurslar" element={<Navigate to="/labs" replace />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
