import { Camera, LoaderCircle, Plus } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "./SectionHeading";

type CreateSpotMediaProps = {
  imagePreviews: string[];
  isUploading: boolean;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CreateSpotMedia({
  imagePreviews,
  isUploading,
  onImageChange,
}: CreateSpotMediaProps) {
  return (
    <section className="flex flex-col gap-2">
      <SectionHeading label="Horizon & sunset captures" trailing="Raw / JPEG" />

      <label
        className={`relative flex min-h-44 flex-col items-center justify-center gap-2 overflow-hidden rounded-4xl bg-altalaya-surface p-6 text-center ${isUploading ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(255,122,0,0.12),transparent_35%),radial-gradient(circle_at_0%_100%,rgba(255,185,85,0.1),transparent_35%)]" />

        <span className="relative flex size-14 items-center justify-center rounded-full bg-[#2a2a2a] text-altalaya-peach">
          {isUploading ? (
            <LoaderCircle className="size-6 animate-spin" />
          ) : (
            <Camera className="size-6" />
          )}
        </span>

        <span className="relative text-lg font-semibold">
          {isUploading ? "Uploading photos..." : "Drop sunset photos"}
        </span>
        <span className="relative text-[13px] text-altalaya-muted">
          {isUploading ? "Please wait" : "or tap to browse your gallery"}
        </span>

        <div className="relative flex gap-2 pt-3">
          {imagePreviews.map((preview, index) => (
            <Image
              key={preview}
              alt={`Added spot photo ${index + 1}`}
              className="size-14 rounded-lg object-cover"
              height={56}
              src={preview}
              width={56}
              unoptimized
            />
          ))}
          {!imagePreviews.length && (
            <>
              <span className="flex size-14 flex-col items-center justify-center bg-[#2a2a2a] text-altalaya-peach">
                <Plus className="size-4" />
              </span>
              <span className="flex size-14 flex-col items-center justify-center bg-[#2a2a2a] text-altalaya-peach">
                <Plus className="size-4" />
              </span>
            </>
          )}
          {imagePreviews.length > 0 && imagePreviews.length < 5 && (
            <span className="flex size-14 flex-col items-center justify-center bg-[#2a2a2a] text-altalaya-peach">
              <Plus className="size-4" />
              <span className="font-mono text-[9px]">Add</span>
            </span>
          )}
        </div>
        <span className="relative font-mono text-[10px] text-altalaya-muted">
          {imagePreviews.length}/5 photos
        </span>
        <input
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          id="spot-image"
          name="image"
          multiple
          onChange={onImageChange}
          type="file"
          disabled={isUploading}
        />
      </label>

      {imagePreviews.map((url, index) => (
        <input key={index} type="hidden" name="image_urls" value={url} />
      ))}
    </section>
  );
}
