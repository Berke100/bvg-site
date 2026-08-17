"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from "@/components/icons";

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov"];

function isVideo(src: string) {
  return VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext));
}

/**
 * Büyütülebilir, aralarında gezilebilen genel amaçlı görsel/video lightbox'ı.
 * `index` null olunca kapalı sayılır — açık/kapalı state'i çağıran bileşende
 * tutulur, bu bileşen sadece görüntüler.
 */
export function MediaLightbox({
  items,
  index,
  onClose,
  onIndexChange,
  title,
}: {
  items: string[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  title?: string;
}) {
  const open = index !== null;

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onIndexChange(((index as number) - 1 + items.length) % items.length);
      if (e.key === "ArrowRight") onIndexChange(((index as number) + 1) % items.length);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, index, items.length, onClose, onIndexChange]);

  if (!open) return null;

  const src = items[index as number];
  const showNav = items.length > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} — galeri` : "Galeri"}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Kapat"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 bg-bg/70 text-cream transition-colors hover:border-gold/60 hover:text-gold sm:right-6 sm:top-6"
      >
        <CloseIcon className="h-5 w-5" />
      </button>

      {showNav ? (
        <>
          <button
            type="button"
            onClick={() =>
              onIndexChange(((index as number) - 1 + items.length) % items.length)
            }
            aria-label="Önceki"
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-bg/70 text-cream transition-colors hover:border-gold/60 hover:text-gold sm:left-6"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => onIndexChange(((index as number) + 1) % items.length)}
            aria-label="Sonraki"
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 bg-bg/70 text-cream transition-colors hover:border-gold/60 hover:text-gold sm:right-6"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </>
      ) : null}

      <div
        className="relative flex h-full max-h-[85vh] w-full max-w-4xl items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo(src) ? (
          <video
            key={src}
            src={src}
            controls
            autoPlay
            className="max-h-full max-w-full rounded-xl"
          />
        ) : (
          <div className="relative h-full w-full">
            <Image
              key={src}
              src={src}
              alt={title ? `${title} — ${(index as number) + 1}` : "Galeri görseli"}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        )}
      </div>

      {showNav ? (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-cream/20 bg-bg/70 px-3 py-1 text-xs text-cream-dim sm:bottom-6">
          {(index as number) + 1} / {items.length}
        </div>
      ) : null}
    </div>
  );
}
