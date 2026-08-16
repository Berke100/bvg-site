"use client";

import { useState, type FormEvent } from "react";
import {
  MEMBERSHIP_FORM_ACTION,
  MEMBERSHIP_FORM_FIELDS,
  SINIF_OPTIONS,
  UNIVERSITE_OPTIONS,
} from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Üyelik başvuru formu — site kendi tasarımıyla render eder.
 *
 * Gönderimde bir Google Apps Script Web App'ine POST atılır; script aynı
 * Google Sheet'e (Google Form'un yanıtlarının düştüğü sheet) satır ekler.
 * Apps Script Web App'leri CORS'a izin verdiği için (Google Form'un kendi
 * `formResponse` endpoint'inin aksine) gerçek yanıtı okuyup başarı/hata
 * durumunu doğru şekilde gösterebiliyoruz.
 *
 * Body JSON string olarak gönderiliyor (application/x-www-form-urlencoded
 * değil): Apps Script'in form-urlencoded body decoder'ı çok baytlı UTF-8'i
 * (Türkçe karakterler) bozuyor; fetch'in string body'de varsayılan attığı
 * `text/plain` content-type'ı bu decoder'ı devre dışı bırakıyor.
 */
export function MembershipEmbed() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, string> = {};
    for (const [field, entry] of Object.entries(MEMBERSHIP_FORM_FIELDS)) {
      payload[entry] = String(data.get(field) ?? "");
    }

    try {
      const res = await fetch(MEMBERSHIP_FORM_ACTION, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || json.result !== "success") {
        throw new Error("submit failed");
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-amber/40 bg-surface/40 p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber/40 bg-bg text-2xl">
          🎉
        </div>
        <h3 className="mt-5 text-2xl text-cream">Başvurun alındı</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-cream-dim">
          Teşekkürler! Ekibimiz en kısa sürede seninle iletişime geçecek.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-amber/40 bg-surface/60 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.75)]">
      {/* Marka başlık şeridi */}
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

      <form onSubmit={handleSubmit} className="grid gap-4 p-6 sm:p-8">
        <TextField label="Ad Soyad" name="adSoyad" required />
        <TextField label="E-posta" name="email" type="email" required />
        <TextField
          label="Telefon numarası (0 ile başlasın)"
          name="telefon"
          type="tel"
          required
        />
        <SelectField
          label="Üniversite"
          name="universite"
          options={UNIVERSITE_OPTIONS}
          required
        />
        <SelectField label="Sınıf" name="sinif" options={SINIF_OPTIONS} required />
        <TextField label="Bölüm" name="bolum" required />

        {status === "error" ? (
          <p className="text-sm text-red-400">
            Bir şeyler ters gitti — bağlantını kontrol edip tekrar dener misin?
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-amber disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Gönderiliyor…" : "Başvuruyu Gönder"}
        </button>
      </form>
    </div>
  );
}

function TextField({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="text-cream-dim">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-line bg-bg px-4 py-2.5 text-cream outline-none transition-colors focus:border-gold/60"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: readonly string[];
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="text-cream-dim">{label}</span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="mt-1.5 w-full rounded-xl border border-line bg-bg px-4 py-2.5 text-cream outline-none transition-colors focus:border-gold/60"
      >
        <option value="" disabled>
          Seç
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
