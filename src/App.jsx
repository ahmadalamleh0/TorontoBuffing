import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

// HomePage is the entry point for most visits and stays eager; the
// other routes are code-split so landing on "/" doesn't pull in
// service-page, blog-post and 404 code it never uses.
const ServicePage = lazy(() => import("./pages/ServicePage/ServicePage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage/BlogPostPage"));
const InsightsHubPage = lazy(() => import("./pages/InsightsHubPage/InsightsHubPage"));
const SeoPage = lazy(() => import("./pages/SeoPage/SeoPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

// The entire admin dashboard (Clerk + the Supabase-authenticated admin
// client + every CMS editor) lives behind this one lazy boundary, so
// none of it — or its dependencies — ever reaches the public bundle.
const AdminApp = lazy(() => import("./admin/AdminApp"));

// Dev-only visual QA harness for content not published yet (see
// pages/PreviewGeoPages). import.meta.env.DEV is inlined to a literal
// `false` by Vite in a production build, so this branch — Route,
// lazy import, and the whole PreviewGeoPages chunk — is dead code a
// production build strips entirely. It cannot ship, be indexed, or be
// reached on the live site; it only exists under `npm run dev`.
const PreviewGeoPages = import.meta.env.DEV ? lazy(() => import("./pages/PreviewGeoPages/PreviewGeoPages")) : null;

// Same dev-only contract as PreviewGeoPages above, but for Insight
// drafts (see src/pages/PreviewInsights/PreviewInsights.jsx for why
// this one needs a signed-in admin session rather than static data).
const PreviewInsights = import.meta.env.DEV ? lazy(() => import("./pages/PreviewInsights/PreviewInsights")) : null;

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/insights" element={<InsightsHubPage />} />
        <Route path="/insights/:slug" element={<BlogPostPage />} />
        <Route path="/pages/:slug" element={<SeoPage pathPrefix="pages" />} />
        <Route path="/service-areas/:slug" element={<SeoPage pathPrefix="service-areas" />} />
        <Route path="/admin/*" element={<AdminApp />} />
        {import.meta.env.DEV && (
          <>
            <Route path="/preview/geo" element={<PreviewGeoPages />} />
            <Route path="/preview/geo/:slug" element={<PreviewGeoPages />} />
            <Route path="/preview/insights" element={<PreviewInsights />} />
            <Route path="/preview/insights/:slug" element={<PreviewInsights />} />
          </>
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
