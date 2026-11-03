"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
  title: string;
};

export function SpotGallery({ images, title }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const columns = images.length === 3 ? 3 : images.length === 1 ? 1 : 2;
  const rows = Math.ceil(images.length / columns);

  useEffect(() => {
    if (active == null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") {
        setActive((current) =>
          current == null ? current : (current + 1) % images.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActive((current) =>
          current == null
            ? current
            : (current - 1 + images.length) % images.length,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, images.length]);

  if (images.length === 0) return null;

  return (
    <>
      <ul
        className="grid h-full min-h-0 gap-1"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {images.map((src, index) => (
          <li key={src} className="relative min-h-0">
            <button
              type="button"
              className="absolute inset-0 overflow-hidden"
              onClick={() => setActive(index)}
              aria-label={`Agrandir la photo ${index + 1}`}
            >
              <Image
                src={src}
                alt={title}
                fill
                priority={index === 0}
                className="object-cover transition duration-300 hover:scale-[1.03]"
                sizes="240px"
              />
            </button>
          </li>
        ))}
      </ul>
      {active != null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 px-3 py-2 text-sm font-semibold text-white"
            onClick={() => setActive(null)}
          >
            Fermer
          </button>
          {images.length > 1 ? (
            <>
              <button
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 px-3 py-2 text-2xl text-white"
                aria-label="Photo précédente"
                onClick={(event) => {
                  event.stopPropagation();
                  setActive((current) =>
                    current == null
                      ? current
                      : (current - 1 + images.length) % images.length,
                  );
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-2 text-2xl text-white"
                aria-label="Photo suivante"
                onClick={(event) => {
                  event.stopPropagation();
                  setActive((current) =>
                    current == null ? current : (current + 1) % images.length,
                  );
                }}
              >
                ›
              </button>
            </>
          ) : null}
          <div
            className="relative h-[85dvh] w-[min(1100px,92vw)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt={title}
              fill
              className="object-contain"
              sizes="92vw"
            />
          </div>
          <p className="absolute bottom-4 text-xs text-white/70">
            {active + 1} / {images.length}
          </p>
        </div>
      ) : null}
    </>
  );
}
