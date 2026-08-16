"use client";

import Image from "next/image";
import { useState } from "react";
import type { SponsorItem } from "@/lib/site";

/**
 * Sponsor logosu; dosya yoksa (veya yüklenemezse) marka renkli isim rozetine
 * düşer — Photo bileşenindeki "kırık görsel gösterme" mantığının küçük
 * ölçekli hâli.
 */
function SponsorMark({ sponsor }: { sponsor: SponsorItem }) {
  const [failed, setFailed] = useState(false);
  const showLogo = Boolean(sponsor.logo) && !failed;

  if (showLogo) {
    return (
      <Image
        src={sponsor.logo as string}
        alt={sponsor.name}
        width={160}
        height={56}
        className="h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-12"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span className="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm font-medium text-cream-dim transition-colors duration-300 hover:border-amber/50 hover:text-cream">
      {sponsor.name}
    </span>
  );
}

export function SponsorStrip({ sponsors }: { sponsors: SponsorItem[] }) {
  if (sponsors.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
      {sponsors.map((s) => (
        <SponsorMark key={s.name} sponsor={s} />
      ))}
    </div>
  );
}
