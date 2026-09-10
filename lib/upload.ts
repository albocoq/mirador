// lib/upload.ts
import { createClient } from "@/lib/supabase/client";

export const BUCKET = "altalaya-images";
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function extensionFor(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension && /^[a-z0-9]+$/.test(extension) ? extension : "jpg";
}

export async function uploadImageToSupabase(
  file: File,
  folder: string,
): Promise<string> {
  if (!ACCEPTED_TYPES.includes(file.type))
    throw new Error("Format non pris en charge.");
  if (file.size > MAX_FILE_SIZE)
    throw new Error("Fichier trop volumineux (10 Mo max).");

  const supabase = createClient();
  const { data: dataUser } = await supabase.auth.getClaims();
  const userId = dataUser?.claims?.sub;

  if (!userId) throw new Error("Utilisateur non authentifié.");

  const path = `${folder}/${userId}/${crypto.randomUUID()}.${extensionFor(file)}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  if (!data.publicUrl) throw new Error("URL publique indisponible.");

  return data.publicUrl;
}
