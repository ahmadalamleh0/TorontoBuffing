import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { servicesService } from "../services/services";

function ServicesListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    servicesService
      .listAll()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-page-title">Services</h1>
          <p className="admin-page-subtitle">
            Edit copy, images and SEO for each service page. New services aren't created here — that keeps every
            existing /services/:slug page's design intact; use SEO Pages for new pages.
          </p>
        </div>
      </div>

      {error && <p className="field__error">{error}</p>}

      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th></th>
              <th>Service</th>
              <th>Tier</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.card_image_url ? <img className="admin-table__thumb" src={item.card_image_url} alt="" /> : null}</td>
                <td data-label="Service">{item.title}</td>
                <td data-label="Tier" style={{ textTransform: "capitalize" }}>
                  {item.tier}
                </td>
                <td data-label="Status">
                  <span className={`badge ${item.published ? "badge--published" : "badge--draft"}`}>
                    {item.published ? "Published" : "Unpublished"}
                  </span>
                </td>
                <td>
                  <div className="admin-table__actions">
                    <Link className="btn btn--xs" to={`/admin/services/${item.id}`}>
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ServicesListPage;
