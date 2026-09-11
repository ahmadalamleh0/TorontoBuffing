// Netlify Function -> GET /api/admin-session — tells the frontend
// whether the current visitor has a valid temporary admin session, so
// AdminApp.jsx knows whether to render the CMS or the temp login form.
// Always reports unauthenticated when TEMP_ADMIN_LOGIN_ENABLED isn't
// "true", regardless of any cookie a caller presents — this is what
// makes turning the flag off immediately stop the custom login from
// working, without needing to also clear anyone's cookie.
import { readSessionCookie, verifySessionToken } from "../../server/tempAdminAuth.js";

function json(statusCode, body) {
  return { statusCode, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) };
}

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return json(405, { error: "Method not allowed." });
  }
  if (process.env.TEMP_ADMIN_LOGIN_ENABLED !== "true") {
    return json(200, { authenticated: false });
  }

  const sessionSecret = process.env.TEMP_ADMIN_SESSION_SECRET;
  if (!sessionSecret) {
    return json(200, { authenticated: false });
  }

  const token = readSessionCookie(event.headers?.cookie);
  const authenticated = verifySessionToken(token, sessionSecret);
  return json(200, { authenticated });
}
