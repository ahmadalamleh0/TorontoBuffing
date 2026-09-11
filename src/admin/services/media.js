import { supabaseAdmin } from "../lib/supabaseAdminClient";

const BUCKET = "media";

function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/-+/g, "-");
}

/** Lists every uploaded asset, newest first — the source of truth for the Media Library grid and every <ImagePicker>. */
export async function listMediaAssets() {
  const { data, error } = await supabaseAdmin.from("media_assets").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

/**
 * Uploads a File to Storage, then records it in `media_assets` so it
 * shows up for reuse everywhere (Projects, Reviews, Services, Pages,
 * SEO Pages) without re-uploading.
 */
export async function uploadMediaAsset(file, { altText = "" } = {}) {
  const storagePath = `${crypto.randomUUID()}-${sanitizeFilename(file.name)}`;

  const { error: uploadError } = await supabaseAdmin.storage.from(BUCKET).upload(storagePath, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(storagePath);

  const { data, error } = await supabaseAdmin
    .from("media_assets")
    .insert({ storage_path: storagePath, public_url: publicUrl, alt_text: altText })
    .select()
    .single();
  if (error) throw error;

  return data;
}

/** Deletes both the stored file and its media_assets row. */
export async function deleteMediaAsset(asset) {
  const { error: storageError } = await supabaseAdmin.storage.from(BUCKET).remove([asset.storage_path]);
  if (storageError) throw storageError;

  const { error } = await supabaseAdmin.from("media_assets").delete().eq("id", asset.id);
  if (error) throw error;
}

export async function updateMediaAssetAltText(id, altText) {
  const { data, error } = await supabaseAdmin
    .from("media_assets")
    .update({ alt_text: altText })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
