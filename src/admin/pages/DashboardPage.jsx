import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabaseAdmin } from "../lib/supabaseAdminClient";

const TILES = [
  { table: "services", label: "Services", to: "/admin/services" },
  { table: "projects", label: "Projects", to: "/admin/projects" },
  { table: "reviews", label: "Reviews", to: "/admin/reviews" },
  { table: "faqs", label: "FAQs", to: "/admin/faqs" },
  { table: "seo_pages", label: "SEO Pages", to: "/admin/seo-pages" },
  { table: "redirects", label: "Redirects", to: "/admin/redirects" },
  { table: "media_assets", label: "Media Assets", to: "/admin/media" },
];

function DashboardPage() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      TILES.map(async (tile) => {
        const { count } = await supabaseAdmin.from(tile.table).select("*", { count: "exact", head: true });
        return [tile.table, count ?? 0];
      }),
    ).then((entries) => {
      if (!cancelled) setCounts(Object.fromEntries(entries));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-subtitle">Everything here publishes straight to torontobuffing.com.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <Link to="/admin/pages" className="dashboard-tile">
          <div className="dashboard-tile__count">—</div>
          <div className="dashboard-tile__label">Homepage Content</div>
        </Link>
        {TILES.map((tile) => (
          <Link key={tile.table} to={tile.to} className="dashboard-tile">
            <div className="dashboard-tile__count">{counts[tile.table] ?? "…"}</div>
            <div className="dashboard-tile__label">{tile.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
