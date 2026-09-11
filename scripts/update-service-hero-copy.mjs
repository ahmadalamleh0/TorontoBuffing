#!/usr/bin/env node
/**
 * Shortens each service's hero title/copy for the new left-aligned,
 * bottom-anchored hero treatment (ServiceHero variant="service"), and
 * removes the reveal-intro section's eyebrow — it just repeated the
 * service name a second time immediately below a hero that now has
 * its own eyebrow + large title. Nothing else in `sections` or `hero`
 * (image, alt text, dimensions, centered, titleNoWrap) is touched.
 *
 * Requires .env with VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 * Usage: node scripts/update-service-hero-copy.mjs
 * Safe to re-run: each row is a targeted update by slug.
 */
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";

process.loadEnvFile?.(path.join(path.dirname(fileURLToPath(import.meta.url)), "..", ".env"));

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// title/copy derived directly from each service's existing hero copy,
// just shortened to one sentence — nothing invented.
const UPDATES = {
  ppf: {
    title: "Paint Protection Film",
    copy: "Invisible protection against rock chips, scratches and everyday road wear.",
  },
  "paint-correction": {
    title: "Paint Correction",
    copy: "Machine polishing that removes swirl marks and restores true paint clarity.",
  },
  "ceramic-coating": {
    title: "Ceramic Coating",
    copy: "A durable, glossy layer that protects paint and makes it easier to maintain.",
  },
  "panel-refinishing": {
    title: "Panel Refinishing",
    copy: "Careful repair and refinishing that restores damaged panels to a true factory finish.",
  },
  "paint-chip-repair": {
    title: "Paint Chip Repair",
    copy: "Chips and stone damage repaired and blended into the surrounding finish.",
  },
  "headlight-restoration": {
    title: "Headlight Restoration",
    copy: "Hazy, yellowed headlights restored to true clarity without a parts order.",
  },
  "classic-restoration": {
    title: "Classic Restoration",
    copy: "Careful restoration that preserves original paint while correcting decades of wear.",
  },
};

const { data: rows, error: fetchError } = await supabase
  .from("services")
  .select("slug, hero, sections")
  .in("slug", Object.keys(UPDATES));

if (fetchError) throw fetchError;

for (const row of rows) {
  const update = UPDATES[row.slug];
  if (!update) continue;

  const newHero = { ...row.hero, title: update.title, copy: update.copy };
  const newSections = (row.sections ?? []).map((section) => {
    if (section.type !== "reveal-intro") return section;
    const { eyebrow, ...rest } = section;
    return rest;
  });

  const { error } = await supabase.from("services").update({ hero: newHero, sections: newSections }).eq("slug", row.slug);
  if (error) throw error;
  console.log(`Updated ${row.slug}: title="${update.title}", copy shortened, reveal-intro eyebrow removed`);
}

console.log(`\nDone — ${rows.length} services updated.`);
