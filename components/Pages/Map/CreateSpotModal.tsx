"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { createSpot, type SpotActionResult } from "@/app/actions/spots";
import { MapCoordinates } from "@/types/database";
import HeaderCreateSpot from "./CreateSpotModal/HeaderCreateSpot";
import { CreateSpotDetails } from "./CreateSpotModal/CreateSpotDetails";
import { CreateSpotFooter } from "./CreateSpotModal/CreateSpotFooter";
import { CreateSpotIntro } from "./CreateSpotModal/CreateSpotIntro";
import { CreateSpotLocation } from "./CreateSpotModal/CreateSpotLocation";
import { CreateSpotMedia } from "./CreateSpotModal/CreateSpotMedia";
import { CreateSpotTags } from "./CreateSpotModal/CreateSpotTags";

type CreateSpotModalProps = {
  onClose: () => void;
  onCreated: () => void;
};

const DEFAULT_COORDINATES: MapCoordinates = {
  latitude: 36.72016,
  longitude: -4.42034,
};

const initialState: SpotActionResult = { data: null, error: null };

export function CreateSpotModal({ onClose, onCreated }: CreateSpotModalProps) {
  const [spotCoordinates, setSpotCoordinates] =
    useState<MapCoordinates>(DEFAULT_COORDINATES);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Sunset view",
    "Quiet",
  ]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const imagePreviewsRef = useRef<string[]>([]);
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [state, formAction, isPending] = useActionState(
    createSpot,
    initialState,
  );

  useEffect(() => {
    if (state.data) {
      onCreated();
      onClose();
    }
  }, [onClose, onCreated, state.data]);

  useEffect(() => {
    return () => {
      imagePreviewsRef.current.forEach((preview) =>
        URL.revokeObjectURL(preview),
      );
    };
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).slice(
      0,
      5 - imagePreviewsRef.current.length,
    );
    if (!files.length) return;

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    const nextPreviews = [...imagePreviewsRef.current, ...newPreviews];
    imagePreviewsRef.current = nextPreviews;
    setImagePreviews(nextPreviews);
    event.target.value = "";
  };

  return (
    <div
      aria-labelledby="create-spot-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center rounded-t-4xl bg-black/65 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
    >
      <form
        action={formAction}
        className="flex max-h-dvh w-full max-w-lg flex-col overflow-hidden rounded-t-4xl bg-altalaya-night text-altalaya-text shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:rounded-2xl"
      >
        <HeaderCreateSpot onClose={onClose} />

        <div className="min-h-0 flex-1 flex flex-col gap-6 overflow-y-auto px-4 pb-28 pt-2">
          <CreateSpotIntro />
          <CreateSpotDetails
            descriptionLength={descriptionLength}
            onDescriptionChange={(value) => setDescriptionLength(value.length)}
          />
          <CreateSpotMedia
            imagePreviews={imagePreviews}
            onImageChange={handleImageChange}
          />
          <CreateSpotLocation
            coordinates={spotCoordinates}
            onCoordinatesChange={setSpotCoordinates}
          />
          <CreateSpotTags onToggleTag={toggleTag} selectedTags={selectedTags} />
          {/* <CreateSpotVisibility /> */}

          <input
            name="latitude"
            type="hidden"
            value={spotCoordinates.latitude}
          />
          <input
            name="longitude"
            type="hidden"
            value={spotCoordinates.longitude}
          />
          <input name="rating" type="hidden" value="5" />
          {state.error && (
            <p
              className="rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200"
              role="alert"
            >
              {state.error}
            </p>
          )}
        </div>

        <CreateSpotFooter isPending={isPending} onClose={onClose} />
      </form>
    </div>
  );
}
