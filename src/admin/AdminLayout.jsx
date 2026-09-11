import { NavLink, Outlet } from "react-router-dom";
import { UserButton } from "@clerk/react";

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
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
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
          <UserButton />
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
