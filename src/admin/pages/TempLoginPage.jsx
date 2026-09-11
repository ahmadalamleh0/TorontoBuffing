import { useState } from "react";
import { tempLogin } from "../tempAdminAuth";

function TempLoginPage({ onSignedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const result = await tempLogin(email, password);
    setSubmitting(false);
    if (result.ok) {
      onSignedIn();
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="admin">
      <div className="admin-card" style={{ margin: "80px auto", maxWidth: 360 }}>
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field__label">Email</label>
            <input
              className="input"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label className="field__label">Password</label>
            <input
              className="input"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="field__error">{error}</p>}
          <div className="form-actions">
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TempLoginPage;
