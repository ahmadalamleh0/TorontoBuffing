// Netlify Function -> POST /api/admin-logout — clears the temporary
// admin session cookie. See admin-login.js for the login half.
import { buildClearCookie } from "../../server/tempAdminAuth.js";

function json(statusCode, body, extraHeaders = {}) {
  return { statusCode, headers: { "Content-Type": "application/json", ...extraHeaders }, body: JSON.stringify(body) };
}

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed." }, { Allow: "POST" });
  }
  return json(200, { ok: true }, { "Set-Cookie": buildClearCookie() });
}
