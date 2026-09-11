// Netlify Function -> /api/admin/* (rewritten via netlify.toml to
// /.netlify/functions/admin-db-proxy/:splat, so the sub-path after
// /api/admin/ survives in event.path). Session-gated reverse proxy in
// front of Supabase's own REST (/rest/v1/*) and Storage (/storage/v1/*)
// APIs — the ONLY place the Supabase service-role key is ever read or
// used. It never reaches the browser: this function injects it
// server-side on every forwarded request, after verifying the caller's
// signed temp-admin session cookie.
//
// Why a raw passthrough rather than bespoke per-table endpoints: the
// frontend's existing admin services (src/admin/services/*.js) already
// speak plain @supabase/supabase-js against /rest/v1 and /storage/v1 —
// see src/admin/tempAdminAuth.js, which points a second supabase-js
// client at this proxy's base URL when a temp session is active. Every
// existing create/edit/publish/delete/upload code path in the admin
// works unchanged against either backend; nothing in
// src/admin/services or src/admin/pages needed to change for this.
//
// Gated end-to-end by TEMP_ADMIN_LOGIN_ENABLED: with that unset/false,
// this always 404s, independent of whether a caller still holds an
// old session cookie.
import { readSessionCookie, verifySessionToken } from "../../server/tempAdminAuth.js";

const FUNCTION_PREFIX = "/.netlify/functions/admin-db-proxy";
// Only these two Supabase API surfaces are ever forwarded to — nothing
// else on the Supabase host (auth admin endpoints, arbitrary paths) is
// reachable through this proxy no matter what path is requested.
const ALLOWED_PREFIXES = ["rest/v1/", "storage/v1/"];

function json(statusCode, body) {
  return { statusCode, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) };
}

function resolveSupabasePath(event) {
  let path = event.path || "";
  if (path.startsWith(FUNCTION_PREFIX)) path = path.slice(FUNCTION_PREFIX.length);
  path = path.replace(/^\/+/, "");
  return ALLOWED_PREFIXES.some((p) => path.startsWith(p)) ? path : null;
}

function resolveQueryString(event) {
  if (event.rawUrl) {
    try {
      return new URL(event.rawUrl).search;
    } catch {
      // fall through to the reconstructed version below
    }
  }
  const params = event.queryStringParameters;
  if (!params || Object.keys(params).length === 0) return "";
  return `?${new URLSearchParams(params).toString()}`;
}

const FORWARD_REQUEST_HEADERS = ["content-type", "prefer", "accept", "range", "x-upsert", "cache-control"];
const FORWARD_RESPONSE_HEADERS = ["content-type", "content-range"];

export async function handler(event) {
  if (process.env.TEMP_ADMIN_LOGIN_ENABLED !== "true") {
    return json(404, { error: "Not found." });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const sessionSecret = process.env.TEMP_ADMIN_SESSION_SECRET;
  if (!supabaseUrl || !serviceRoleKey || !sessionSecret) {
    console.error("[netlify/functions/admin-db-proxy] Missing VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / TEMP_ADMIN_SESSION_SECRET.");
    return json(500, { error: "Temporary admin access isn't configured." });
  }

  const token = readSessionCookie(event.headers?.cookie);
  if (!verifySessionToken(token, sessionSecret)) {
    return json(401, { error: "Not authenticated." });
  }

  const supabasePath = resolveSupabasePath(event);
  if (!supabasePath) {
    return json(404, { error: "Not found." });
  }

  const targetUrl = `${supabaseUrl.replace(/\/$/, "")}/${supabasePath}${resolveQueryString(event)}`;

  const forwardHeaders = { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` };
  for (const name of FORWARD_REQUEST_HEADERS) {
    const value = event.headers?.[name];
    if (value) forwardHeaders[name] = value;
  }

  const hasBody = !["GET", "HEAD"].includes(event.httpMethod);
  const body = hasBody && event.body ? (event.isBase64Encoded ? Buffer.from(event.body, "base64") : event.body) : undefined;

  let upstreamResponse;
  try {
    upstreamResponse = await fetch(targetUrl, { method: event.httpMethod, headers: forwardHeaders, body });
  } catch (error) {
    console.error("[netlify/functions/admin-db-proxy] Upstream request failed:", error);
    return json(502, { error: "Upstream request failed." });
  }

  const responseHeaders = { "Content-Type": "application/json" };
  for (const name of FORWARD_RESPONSE_HEADERS) {
    const value = upstreamResponse.headers.get(name);
    if (value) responseHeaders[name.replace(/(^|-)./g, (m) => m.toUpperCase())] = value;
  }

  const responseBuffer = Buffer.from(await upstreamResponse.arrayBuffer());
  const isBinary = !(responseHeaders["Content-Type"] || "").includes("json") && !(responseHeaders["Content-Type"] || "").includes("text");

  return {
    statusCode: upstreamResponse.status,
    headers: responseHeaders,
    body: isBinary ? responseBuffer.toString("base64") : responseBuffer.toString("utf8"),
    isBase64Encoded: isBinary,
  };
}
