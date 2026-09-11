// Netlify Edge Function adapter — this file's only job is Netlify/
// Deno-specific glue: read the request + Deno's env vars, hand off to
// the portable decision logic in server/resolveRedirect.js, translate
// the result into a Deno `Response`. No redirect/business logic lives
// here — moving to a different host means rewriting this ~20-line
// file (in that host's idiom) and NOTHING in server/.
//
// Scope: netlify.toml triggers this for every request except the
// homepage, /admin/*, /api/*, and static assets (see that file) — so
// arbitrary legacy paths are covered, not just /services/* and
// /pages/*, without spending a lookup on routes that can never have
// moved.
import { resolveRedirect } from "../../server/resolveRedirect.js";

export default async (request, context) => {
  const url = new URL(request.url);
  const supabaseUrl = Deno.env.get("VITE_SUPABASE_URL");
  const anonKey = Deno.env.get("VITE_SUPABASE_ANON_KEY");

  try {
    const match = await resolveRedirect({ supabaseUrl, anonKey }, url.hostname, url.pathname);
    if (!match) return context.next();

    const destination = match.to.startsWith("http") ? match.to : new URL(match.to, url.origin).toString();
    return Response.redirect(destination, match.type);
  } catch (error) {
    console.error("[edge-functions/redirects] lookup failed, continuing without redirect:", error);
    return context.next();
  }
};
