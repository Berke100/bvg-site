"use client";

import { useState } from "react";
import {
  GOOGLE_FORM_EMBED_URL,
  GOOGLE_FORM_HEIGHT,
  SITE,
} from "@/lib/site";
import { InstagramIcon, MailIcon } from "@/components/icons";

/**
 * Üyelik başvuru formu — Google Forms embed sarmalayıcısı.
 *
 * GOOGLE_FORM_EMBED_URL (lib/site.ts) doluysa: formu marka çerçevesiyle gömer.
 * Boşsa: "form yakında" yedek kartı + e-posta/Instagram alternatifi gösterir.
 */
export function MembershipEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (!GOOGLE_FORM_EMBED_URL) {
    return <FormFallback />;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-amber/40 bg-cream shadow-[0_24px_70px_-28px_rgba(0,0,0,0.75)]">
      {/* Marka başlık şeridi — açık formu siteyle bağlar */}
      <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-gold to-amber px-6 py-4">
        <div>
          <div className="font-display text-lg font-bold leading-tight text-bg">
            BVG Üyelik Başvurusu
          </div>
          <div className="text-xs font-medium text-bg/70">
            Bölüm fark etmez — birkaç saniyede doldur
          </div>
        </div>
        <span
          aria-hidden
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-bg/70 font-display text-lg font-bold text-bg sm:flex"
        >
          B
        </span>
      </div>
      <div className="coin-edge" aria-hidden />

      {/* Formu saran açık zemin — beyaz Google formu kasıtlı bir kart gibi durur */}
      <div className="relative bg-white p-1.5 sm:p-3">
        {/* Form yüklenene kadar açık iskelet */}
        {!loaded ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <span className="text-sm text-neutral-500">Form yükleniyor…</span>
          </div>
        ) : null}
        <iframe
          src={GOOGLE_FORM_EMBED_URL}
          title="BVG üyelik başvuru formu"
          onLoad={() => setLoaded(true)}
          height={GOOGLE_FORM_HEIGHT}
          className="w-full rounded-xl bg-white"
          style={{ border: 0 }}
        >
          Yükleniyor…
        </iframe>
      </div>
    </div>
  );
}

/** Form linki henüz girilmediğinde gösterilen yedek */
function FormFallback() {
  return (
    <div className="rounded-3xl border border-amber/30 bg-surface/40 p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber/40 bg-bg text-2xl">
        📝
      </div>
      <h3 className="mt-5 text-2xl text-cream">Başvuru formu yakında burada</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-cream-dim">
        Formu hazırlıyoruz. O zamana kadar bize doğrudan Instagram&apos;dan
        yazabilir ya da e-posta gönderebilirsin — seni memnuniyetle aramıza
        alırız.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-bg transition-colors hover:bg-amber"
        >
          <InstagramIcon className="h-4 w-4" />
          Instagram&apos;dan yaz
        </a>
        <a
          href={`mailto:${SITE.email}?subject=BVG%20Üyelik%20Başvurusu`}
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-cream transition-colors hover:border-gold/60 hover:text-gold"
        >
          <MailIcon className="h-4 w-4" />
          E-posta gönder
        </a>
      </div>
    </div>
  );
}
