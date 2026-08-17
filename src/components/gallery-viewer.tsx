"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov"];

function isVideo(src: string) {
  return VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext));
}

/**
 * Etkinlik detay sayfasındaki galeri görüntüleyici.
 *
 * Önceki sürüm ok butonlarını görselin üstüne mutlak konumlu bindiriyordu;
 * `fill` ile büyüyen görsel kapsayıcısı DOM'da butonlardan sonra geldiği
 * için üstlerine biniyor, mouse tıklamalarını yutuyordu (klavye oku
 * document düzeyinde dinlendiği için o çalışıyordu). Bu sürümde ok
 * butonları görselin ALTINDA, normal akışta ayrı bir satırda — üst üste
 * binme ihtimali yok.
 */
export function GalleryViewer({
  items,
  title,
}: {
  items: string[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const hasMultiple = items.length > 1;

  const goPrev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const goNext = () => setIndex((i) => (i + 1) % items.length);

  useEffect(() => {
    if (!hasMultiple) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMultiple, items.length]);

  if (items.length === 0) return null;

  const src = items[index];

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-bg">
        {isVideo(src) ? (
          <video
            key={src}
            src={src}
            controls
            className="h-full w-full object-contain"
          />
        ) : (
          <Image
            key={src}
            src={src}
            alt={`${title} — ${index + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-contain"
            priority={index === 0}
          />
        )}
      </div>

      {hasMultiple ? (
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Önceki görsel"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/60 text-cream transition-colors hover:border-gold/60 hover:text-gold"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <span className="min-w-14 text-center text-xs text-cream-dim">
            {index + 1} / {items.length}
          </span>
          <button
            type="button"
            onClick={goNext}
            aria-label="Sonraki görsel"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/60 text-cream transition-colors hover:border-gold/60 hover:text-gold"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      ) : null}

      {hasMultiple ? (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${i + 1}. görsele git`}
              aria-current={i === index}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition-colors ${
                i === index
                  ? "border-gold"
                  : "border-line hover:border-amber/50"
              }`}
            >
              {isVideo(item) ? (
                <span className="flex h-full w-full items-center justify-center bg-surface text-xs text-cream-dim">
                  ▶
                </span>
              ) : (
                <Image
                  src={item}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
