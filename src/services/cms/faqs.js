import { supabase } from "../../lib/supabaseClient";
import { SUPABASE_CONFIGURED } from "../../lib/supabaseEnv";

/**
 * Fetches every published FAQ in display order and derives the tab
 * category list (order = each category's first, lowest sort_order
 * appearance — no separate "category order" field to manage). Returns
 * null on failure/not-configured so FaqSection falls back to the
 * bundled faqData.js instead of rendering an empty accordion.
 *
 * @returns {Promise<{ items: {question:string, answer:string, category:string}[], categories: string[] } | null>}
 */
export async function fetchPublishedFaqs() {
  if (!SUPABASE_CONFIGURED) return null;

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[cms/faqs] fetchPublishedFaqs failed:", error);
    return null;
  }

  const items = data.map((row) => ({
    question: row.question,
    answer: row.answer,
    category: row.category,
  }));

  const categories = [...new Set(items.map((item) => item.category))];

  return { items, categories };
}

/**
 * Every published FAQ tagged with the given service slug (the
 * `services` text[] column — see supabase/schema.sql), in display
 * order. This is a filtered view of the exact same `faqs` rows the
 * homepage FAQ reads, not a separate copy: editing a question's text
 * in the CMS updates both places, and a service with no tagged
 * question correctly gets [] back (ServiceFaqSection renders nothing
 * in that case) rather than any kind of forced/unrelated content.
 * Returns null on failure/not-configured so the caller can fall back
 * to the bundled faqData.js the same way FaqSection does.
 *
 * @returns {Promise<{question:string, answer:string, category:string}[] | null>}
 */
export async function fetchFaqsForService(serviceSlug) {
  if (!SUPABASE_CONFIGURED || !serviceSlug) return null;

  const { data, error } = await supabase
    .from("faqs")
    .select("question, answer, category")
    .eq("published", true)
    .contains("services", [serviceSlug])
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[cms/faqs] fetchFaqsForService failed:", error);
    return null;
  }

  return data ?? [];
}
