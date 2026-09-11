import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ClerkProvider, useAuth, RedirectToSignIn } from "@clerk/react";
import NovaNavbar from "../../components/NovaNavbar/NovaNavbar";
import Footer from "../../components/Footer/Footer";
import Seo from "../../components/Seo/Seo";
import InsightArticle from "../BlogPostPage/InsightArticle";
import { supabaseAdmin, setAdminTokenGetter } from "../../admin/lib/supabaseAdminClient";
import "../ServicePage/ServicePage.css";
import "../BlogPostPage/BlogPostPage.css";

// Dev-only draft preview for Insights that aren't published yet.
// Unlike PreviewGeoPages (which renders from a static local data file
// with zero Supabase connection), Insight drafts already live in
// Supabase — so previewing them for real means reading rows RLS
// normally hides from the public ("published = true or is_admin()",
// see supabase/schema.sql). Rather than ever shipping a secret capable
// of bypassing that (a service-role key in client code would be a
// severe vulnerability, dev-only or not), this reuses the exact same
// Clerk-authenticated admin client /admin already relies on: it's a
// read-only query, running as the one allow-listed admin user, subject
// to the same RLS as everywhere else in this app. Signing in is
// required — this is intentionally not an anonymous preview.
//
// Kept out of production by construction: the only route that mounts
// this (see App.jsx) is wrapped in `if (import.meta.env.DEV)`, so this
// whole module — page, route, admin-client import, Clerk provider — is
// dead code a production build strips entirely. Seo still forces
// noIndex on every branch below as a second, redundant layer.
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function AdminAuthBridge({ children }) {
  const { getToken } = useAuth();

  useEffect(() => {
    setAdminTokenGetter(getToken);
  }, [getToken]);

  return children;
}

function RequireSignedIn({ children }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;
  if (!isSignedIn) return <RedirectToSignIn />;

  return children;
}

// No .eq("published", true) — RLS decides what's actually returned;
// signed in as the admin, that's every Insight, draft or not.
async function fetchAllInsightDrafts() {
  const { data, error } = await supabaseAdmin
    .from("seo_pages")
    .select("slug, title, category, published")
    .eq("path_prefix", "insights")
    .order("display_order", { ascending: true })
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("[PreviewInsights] fetchAllInsightDrafts failed:", error);
    return [];
  }

  return data ?? [];
}

async function fetchInsightDraftBySlug(slug) {
  const { data, error } = await supabaseAdmin
    .from("seo_pages")
    .select("*")
    .eq("slug", slug)
    .eq("path_prefix", "insights")
    .maybeSingle();

  if (error) {
    console.error("[PreviewInsights] fetchInsightDraftBySlug failed:", error);
    return null;
  }

  return data;
}

function DevPreviewBanner({ children }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#111",
        color: "#fff",
        fontFamily: "monospace",
        fontSize: "12px",
        padding: "6px 14px",
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}

function PreviewInsightsIndex() {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchAllInsightDrafts().then((data) => {
      if (!cancelled) setRows(data);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Seo title="Insights Preview (Dev Only)" description="" path="/preview/insights" noIndex />
      <NovaNavbar />
      <main>
        <section className="service-page section" style={{ minHeight: "60svh" }}>
          <div className="container service-page__inner">
            <span className="eyebrow">Dev Preview — Not Published</span>
            <h1 className="service-page__title">Insight Drafts</h1>
            <p className="service-page__status">
              {rows === null
                ? "Loading..."
                : `${rows.length} Insight${rows.length === 1 ? "" : "s"} in the CMS (path_prefix "insights").`}
            </p>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "24px", display: "grid", gap: "12px" }}>
              {(rows ?? []).map((row) => (
                <li key={row.slug}>
                  <Link to={`/preview/insights/${row.slug}`} className="btn-text">
                    {row.title} — {row.category || "Uncategorized"} ({row.published ? "published" : "draft"}) &rarr;
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function PreviewInsightDetail() {
  const { slug } = useParams();
  const [insight, setInsight] = useState(undefined);

  useEffect(() => {
    let cancelled = false;
    setInsight(undefined);

    fetchInsightDraftBySlug(slug).then((row) => {
      if (!cancelled) setInsight(row ?? null);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (insight === undefined) return null;

  if (insight === null) {
    return (
      <>
        <Seo title="Preview Not Found" description="" path={`/preview/insights/${slug}`} noIndex />
        <NovaNavbar />
        <main>
          <section className="service-page section">
            <div className="container service-page__inner">
              <span className="eyebrow">Dev Preview</span>
              <h1 className="service-page__title">No Insight found for &ldquo;{slug}&rdquo;</h1>
              <p className="service-page__status">
                <Link to="/preview/insights" className="btn-text">
                  Back to preview index
                </Link>
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <DevPreviewBanner>
        DEV PREVIEW — {insight.published ? "PUBLISHED" : "NOT PUBLISHED"} — will live at /insights/{insight.slug}
      </DevPreviewBanner>
      <InsightArticle
        insight={insight}
        slug={slug}
        path={`/preview/insights/${slug}`}
        backHref="/preview/insights"
        forceNoIndex
      />
    </>
  );
}

function PreviewInsightsInner() {
  const { slug } = useParams();
  return slug ? <PreviewInsightDetail /> : <PreviewInsightsIndex />;
}

export function PreviewInsights() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} signInUrl="/admin/sign-in">
      <AdminAuthBridge>
        <RequireSignedIn>
          <PreviewInsightsInner />
        </RequireSignedIn>
      </AdminAuthBridge>
    </ClerkProvider>
  );
}

export default PreviewInsights;
