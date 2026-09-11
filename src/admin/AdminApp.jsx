import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider, useAuth, RedirectToSignIn } from "@clerk/react";
import { setAdminTokenGetter } from "./lib/supabaseAdminClient";
import { SUPABASE_CONFIGURED } from "../lib/supabaseEnv";
import AdminLayout from "./AdminLayout";
import SignInPage from "./pages/SignInPage";
import DashboardPage from "./pages/DashboardPage";
import PagesEditor from "./pages/PagesEditor";
import ServicesListPage from "./pages/ServicesListPage";
import ServiceEditPage from "./pages/ServiceEditPage";
import ProjectsPage from "./pages/ProjectsPage";
import ReviewsPage from "./pages/ReviewsPage";
import FaqsPage from "./pages/FaqsPage";
import SeoPagesListPage from "./pages/SeoPagesListPage";
import SeoPageEditPage from "./pages/SeoPageEditPage";
import RedirectsPage from "./pages/RedirectsPage";
import MediaLibraryPage from "./pages/MediaLibraryPage";
import "./admin.css";

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Wires the signed-in Clerk user's session token into the admin
// Supabase client (see src/admin/lib/supabaseAdminClient.js) — every
// query issued after this effect runs carries it, which is what lets
// RLS's private.is_admin() recognize the one allow-listed admin user.
function AdminAuthBridge({ children }) {
  const { getToken } = useAuth();

  useEffect(() => {
    setAdminTokenGetter(getToken);
  }, [getToken]);

  return children;
}

function RequireAdmin({ children }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;
  if (!isSignedIn) return <RedirectToSignIn />;

  return children;
}

function AdminSetupNotice({ children }) {
  const missing = [];
  if (!CLERK_PUBLISHABLE_KEY) missing.push("VITE_CLERK_PUBLISHABLE_KEY");
  if (!SUPABASE_CONFIGURED) missing.push("VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY");

  if (missing.length === 0) return children;

  return (
    <div className="admin">
      <div className="admin-card" style={{ margin: 40, maxWidth: 520 }}>
        <h2>Admin isn't configured yet</h2>
        <p>Set the following in your .env file, then rebuild:</p>
        <ul>
          {missing.map((name) => (
            <li key={name}>
              <code>{name}</code>
            </li>
          ))}
        </ul>
        <p>See .env.example for the full list.</p>
      </div>
    </div>
  );
}

function AdminApp() {
  return (
    <AdminSetupNotice>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} signInUrl="/admin/sign-in">
        <div className="admin">
          <AdminAuthBridge>
            <Routes>
              <Route path="sign-in/*" element={<SignInPage />} />
              <Route
                path="/*"
                element={
                  <RequireAdmin>
                    <AdminLayout />
                  </RequireAdmin>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="pages" element={<PagesEditor />} />
                <Route path="services" element={<ServicesListPage />} />
                <Route path="services/:id" element={<ServiceEditPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="reviews" element={<ReviewsPage />} />
                <Route path="faqs" element={<FaqsPage />} />
                <Route path="seo-pages" element={<SeoPagesListPage />} />
                <Route path="seo-pages/new" element={<SeoPageEditPage />} />
                <Route path="seo-pages/:id" element={<SeoPageEditPage />} />
                <Route path="redirects" element={<RedirectsPage />} />
                <Route path="media" element={<MediaLibraryPage />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Route>
            </Routes>
          </AdminAuthBridge>
        </div>
      </ClerkProvider>
    </AdminSetupNotice>
  );
}

export default AdminApp;
