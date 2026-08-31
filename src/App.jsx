import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

// HomePage is the entry point for most visits and stays eager; the
// other routes are code-split so landing on "/" doesn't pull in
// service-page, blog-post and 404 code it never uses.
const ServicePage = lazy(() => import("./pages/ServicePage/ServicePage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage/BlogPostPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/insights/:slug" element={<BlogPostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
