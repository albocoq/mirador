"use client";

import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "altalaya-images";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type ImageUploadProps = {
  onUploadComplete: (url: string) => void;
  value?: string | null;
  values?: string[];
  onRemove?: (url: string) => void;
  multiple?: boolean;
  maxFiles?: number;
  folder?: string;
  label?: string;
  hint?: string;
  className?: string;
  onUploadingChange?: (isUploading: boolean) => void;
};

function extensionFor(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension && /^[a-z0-9]+$/.test(extension) ? extension : "jpg";
}

export function ImageUpload({
  onUploadComplete,
  value,
  values = [],
  onRemove,
  multiple = false,
  maxFiles = 5,
  folder = "uploads",
  label = "Ajouter une image",
  hint = "PNG, JPEG ou WebP · 10 Mo maximum",
  className = "",
  onUploadingChange,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadedValues = multiple ? values : value ? [value] : [];
  const canUpload = multiple ? uploadedValues.length < maxFiles : true;

  async function uploadFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList);
    if (!files.length || !canUpload) return;

    const selectedFiles = files.slice(
      0,
      multiple ? maxFiles - uploadedValues.length : 1,
    );
    const invalidFile = selectedFiles.find(
      (file) =>
        !ACCEPTED_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE,
    );

    if (invalidFile) {
      setError(
        invalidFile.size > MAX_FILE_SIZE
          ? `« ${invalidFile.name} » est trop volumineux (10 Mo maximum).`
          : "Format non pris en charge. Utilisez un fichier PNG, JPEG ou WebP.",
      );
      return;
    }

    setError(null);
    setIsUploading(true);
    onUploadingChange?.(true);

    try {
      const supabase = createClient();
      const { data } = await supabase.auth.getClaims();
      const userId = data?.claims?.sub;

      if (!userId) throw new Error("Utilisateur non authentifié.");

      for (const file of selectedFiles) {
        const path = `${folder.replace(/^\/+|\/+$/g, "")}/${userId}/${crypto.randomUUID()}.${extensionFor(file)}`;
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, { cacheControl: "3600", upsert: false });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
        if (!data.publicUrl) throw new Error("URL publique indisponible.");
        onUploadComplete(data.publicUrl);
      }
    } catch (uploadError) {
      console.error("Image upload failed", uploadError);
      setError("L’envoi a échoué. Vérifiez votre connexion puis réessayez.");
    } finally {
      setIsUploading(false);
      onUploadingChange?.(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    void uploadFiles(event.dataTransfer.files);
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex flex-wrap gap-2">
        {uploadedValues.map((url) => (
          <div className="group relative" key={url}>
            <Image
              src={url}
              alt="Image envoyée"
              className={
                multiple
                  ? "size-16 rounded-xl object-cover"
                  : "size-24 rounded-full object-cover"
              }
              width={multiple ? 64 : 96}
              height={multiple ? 64 : 96}
              unoptimized
            />
            {onRemove && (
              <button
                type="button"
                aria-label="Supprimer cette image"
                className="absolute -right-1 -top-1 rounded-full bg-black/80 p-1 text-white transition hover:bg-red-500"
                onClick={() => onRemove(url)}
              >
                <X className="size-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {canUpload && (
        <label
          className="flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 bg-[#1a1a1a] px-5 py-6 text-center text-neutral-400 transition hover:border-amber-400/60 hover:text-amber-300"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <LoaderCircle className="size-7 animate-spin text-amber-400" />
          ) : (
            <span className="flex size-10 items-center justify-center rounded-full bg-amber-400/10 text-amber-400">
              {multiple ? (
                <ImagePlus className="size-5" />
              ) : (
                <UploadCloud className="size-5" />
              )}
            </span>
          )}
          <span className="text-sm font-medium text-white">
            {isUploading ? "Envoi en cours…" : label}
          </span>
          {!isUploading && <span className="text-xs">{hint}</span>}
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            multiple={multiple}
            className="sr-only"
            disabled={isUploading}
            onChange={(event) => void uploadFiles(event.target.files ?? [])}
          />
        </label>
      )}

      {error && (
        <p className="text-sm text-red-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
