import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { UserButton, useAuth } from "@clerk/react";
import { TEMP_ADMIN_LOGIN_ENABLED, tempLogout } from "./tempAdminAuth";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/pages", label: "Pages" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/reviews", label: "Reviews" },
  { to: "/admin/faqs", label: "FAQs" },
  { to: "/admin/seo-pages", label: "SEO Pages" },
  { to: "/admin/redirects", label: "Redirects" },
  { to: "/admin/media", label: "Media" },
];

function AdminLayout() {
  // Below-tablet only (see admin.css) — the sidebar becomes an
  // off-canvas drawer instead of the always-visible 220px column,
  // opened by this button. Desktop never renders/uses this toggle at
  // all, so nothing here can affect the existing desktop layout.
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { pathname } = useLocation();
  const { isSignedIn } = useAuth();
  // Reaching this layout at all means RequireAdmin already accepted
  // either a real Clerk session or a temp one (see AdminApp.jsx) — if
  // Clerk doesn't recognize this visitor, it must be the temp session,
  // which has no Clerk UserButton to show.
  const isTempSession = TEMP_ADMIN_LOGIN_ENABLED && !isSignedIn;

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  // Prevents the page behind the open drawer from scrolling on touch.
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  return (
    <div className="admin-shell">
      <button
        type="button"
        className="admin-mobile-toggle"
        aria-expanded={isDrawerOpen}
        aria-controls="admin-sidebar"
        onClick={() => setIsDrawerOpen((open) => !open)}
      >
        <span className="visually-hidden">Toggle menu</span>
        <span className="admin-mobile-toggle__line" aria-hidden="true" />
        <span className="admin-mobile-toggle__line" aria-hidden="true" />
        <span className="admin-mobile-toggle__line" aria-hidden="true" />
      </button>

      {isDrawerOpen && (
        <div className="admin-sidebar-backdrop" onClick={() => setIsDrawerOpen(false)} aria-hidden="true" />
      )}

      <aside id="admin-sidebar" className={`admin-sidebar${isDrawerOpen ? " is-open" : ""}`}>
        <div className="admin-sidebar__brand">
          Toronto Buffing
          <span>Admin</span>
        </div>
        <nav className="admin-sidebar__nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-sidebar__link${isActive ? " is-active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          {isTempSession ? (
            <button
              type="button"
              className="btn btn--sm"
              onClick={async () => {
                await tempLogout();
                window.location.href = "/admin";
              }}
            >
              Sign out
            </button>
          ) : (
            <UserButton />
          )}
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
