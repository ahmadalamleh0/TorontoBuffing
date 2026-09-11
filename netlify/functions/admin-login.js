// Netlify Function -> POST /api/admin-login (rewritten from
// /.netlify/functions/admin-login via netlify.toml's generic /api/*
// rule). Temporary, non-Clerk /admin login — see
// server/tempAdminAuth.js for the actual verify/sign logic (portable,
// no hosting-platform imports) and src/admin/tempAdminAuth.js for the
// frontend half. Gated end-to-end by TEMP_ADMIN_LOGIN_ENABLED: with
// that unset/false, this always 404s regardless of credentials.
import { verifyPassword, createSessionToken, buildSessionCookie } from "../../server/tempAdminAuth.js";

function json(statusCode, body, extraHeaders = {}) {
  return { statusCode, headers: { "Content-Type": "application/json", ...extraHeaders }, body: JSON.stringify(body) };
}

export async function handler(event) {
  if (process.env.TEMP_ADMIN_LOGIN_ENABLED !== "true") {
    return json(404, { error: "Not found." });
  }
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed." }, { Allow: "POST" });
  }

  const email = process.env.TEMP_ADMIN_EMAIL;
  const passwordHash = process.env.TEMP_ADMIN_PASSWORD_HASH;
  const sessionSecret = process.env.TEMP_ADMIN_SESSION_SECRET;
  if (!email || !passwordHash || !sessionSecret) {
    console.error(
      "[netlify/functions/admin-login] Missing TEMP_ADMIN_EMAIL / TEMP_ADMIN_PASSWORD_HASH / TEMP_ADMIN_SESSION_SECRET.",
    );
    return json(500, { error: "Temporary login isn't configured." });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid request body." });
  }

  const submittedEmail = String(body.email ?? "").trim().toLowerCase();
  const submittedPassword = String(body.password ?? "");

  // Constant-shape check — always run verifyPassword (which is itself
  // timing-safe) even on an email mismatch, so a wrong email doesn't
  // return measurably faster than a wrong password.
  const emailMatches = submittedEmail === email.trim().toLowerCase();
  const passwordMatches = verifyPassword(submittedPassword, passwordHash);

  if (!emailMatches || !passwordMatches) {
    return json(401, { error: "Incorrect email or password." });
  }

  const { token, ttlSeconds } = createSessionToken(sessionSecret);
  return json(200, { ok: true }, { "Set-Cookie": buildSessionCookie(token, ttlSeconds) });
}
