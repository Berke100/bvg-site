"use client";

import Image from "next/image";
import { useState } from "react";
import { CoinMark } from "@/components/logo";

/**
 * Akıllı görsel bileşeni.
 *
 * - `src` verilir VE dosya varsa: fotoğrafı next/image ile gösterir (kırpılmış, optimize).
 * - `src` yoksa ya da dosya bulunamazsa: marka renkli yer tutucuya düşer.
 *   Böylece yanlış/eksik dosyada "kırık görsel" görünmez.
 *
 * FOTOĞRAF EKLEME (ekip için — kod bilmeye gerek yok):
 *   1) Fotoğrafı public/ altındaki uygun klasöre koy:
 *        - Hero görseli:      public/hero/...
 *        - Etkinlik görseli:  public/events/...
 *   2) Dosya adını lib/site.ts içindeki ilgili `image` alanına yaz
 *      (örn. image: "/events/spor-zirvesi.jpg").
 *   Kaydet — görsel otomatik görünür.
 */
export function Photo({
  src,
  alt,
  label,
  ratio = "aspect-[4/3]",
  className,
  priority,
}: {
  src?: string;
  alt: string;
  label?: string;
  ratio?: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      role={showImage ? undefined : "img"}
      aria-label={showImage ? undefined : label ? `${label} — görsel yakında` : "Görsel yakında"}
      className={`relative overflow-hidden rounded-2xl border border-line ${ratio} ${className ?? ""}`}
      style={
        showImage
          ? undefined
          : {
              background:
                "radial-gradient(120% 120% at 20% 10%, #4a2e1c 0%, #17110b 55%, #0d0b08 100%)",
            }
      }
    >
      {showImage ? (
        <Image
          src={src as string}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          {/* Sikke deseni dokusu */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle at 50% 50%, #f2b705 0 1px, transparent 1px 14px)",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
            <CoinMark className="h-14 w-14 opacity-90" />
            {label ? (
              <span className="px-4 text-xs font-medium uppercase tracking-[0.18em] text-cream-dim">
                {label}
              </span>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
