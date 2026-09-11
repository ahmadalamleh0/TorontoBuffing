import crypto from "node:crypto";

/**
 * Portable core (see server/supabaseRest.js's own note on this — zero
 * hosting-platform imports, just Node's built-in `crypto`) for the
 * temporary, non-Clerk /admin login. Netlify Functions are the only
 * adapter today (netlify/functions/admin-login.js,
 * admin-logout.js, admin-session.js, admin-db-proxy.js); another host's
 * adapter would just read that platform's env vars/cookies and call
 * these same functions.
 *
 * Design: password hashes use Node's built-in scrypt (no extra
 * dependency) as `salt:hashHex`. Sessions are a small HMAC-signed,
 * base64url payload — `payload.signature` — verified with a
 * timing-safe comparison, not a database-backed session store, so
 * there's nothing to provision beyond the two secrets below.
 */

const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

export function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  const [salt, hashHex] = String(storedHash ?? "").split(":");
  if (!salt || !hashHex) return false;

  const candidate = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(hashHex, "hex");
  if (candidate.length !== expected.length) return false;

  return crypto.timingSafeEqual(candidate, expected);
}

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

function signPayload(payloadB64, secret) {
  return crypto.createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

/** @returns {string} a signed session token: "<payload-b64url>.<signature>" */
export function createSessionToken(secret, { ttlSeconds = SESSION_TTL_SECONDS } = {}) {
  const payload = { sub: "temp-admin", exp: Date.now() + ttlSeconds * 1000 };
  const payloadB64 = base64url(JSON.stringify(payload));
  const signature = signPayload(payloadB64, secret);
  return { token: `${payloadB64}.${signature}`, ttlSeconds };
}

/** @returns {boolean} true only if the token's signature is valid AND it hasn't expired. */
export function verifySessionToken(token, secret) {
  if (!token || typeof token !== "string" || !token.includes(".")) return false;

  const [payloadB64, signature] = token.split(".");
  const expectedSignature = signPayload(payloadB64, secret);

  const a = Buffer.from(signature ?? "");
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
    return payload.sub === "temp-admin" && typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

const COOKIE_NAME = "tb_temp_admin_session";

export function buildSessionCookie(token, ttlSeconds) {
  const parts = [
    `${COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Strict",
    `Max-Age=${ttlSeconds}`,
  ];
  return parts.join("; ");
}

export function buildClearCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export function readSessionCookie(cookieHeader) {
  if (!cookieHeader) return null;
  const match = cookieHeader.split(";").map((c) => c.trim()).find((c) => c.startsWith(`${COOKIE_NAME}=`));
  return match ? match.slice(COOKIE_NAME.length + 1) : null;
}

export { COOKIE_NAME };
