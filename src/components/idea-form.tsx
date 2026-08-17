"use client";

import { useState, type FormEvent } from "react";
import { IDEA_FORM_ACTION, IDEA_FORM_FIELDS } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error" | "not-configured";

/**
 * Girişim sayfasındaki fikir paylaşım formu.
 *
 * IDEA_FORM_ACTION henüz boş (bkz. site.ts) — bağlanana kadar gönderim
 * denenmiyor, kullanıcıya "yakında aktif olacak" mesajı gösteriliyor.
 * Böylece gerçek bir ziyaretçi formu doldurup gönderse bile verisi
 * sessizce kaybolmuyor; ne olduğu açıkça söyleniyor.
 */
export function IdeaForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!IDEA_FORM_ACTION) {
      setStatus("not-configured");
      return;
    }

    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, string> = {};
    for (const [field, entry] of Object.entries(IDEA_FORM_FIELDS)) {
      payload[entry] = String(data.get(field) ?? "");
    }

    try {
      const res = await fetch(IDEA_FORM_ACTION, {
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
          💡
        </div>
        <h3 className="mt-5 text-2xl text-cream">Fikrin bize ulaştı</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-cream-dim">
          Teşekkürler! Ekibimiz inceleyip en kısa sürede seninle iletişime
          geçecek.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-3xl border border-line bg-surface/60 p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Ad Soyad" name="adSoyad" required />
        <TextField label="E-posta" name="email" type="email" required />
      </div>
      <TextField
        label="Telefon numarası (0 ile başlasın)"
        name="telefon"
        type="tel"
        required
      />
      <label className="block text-sm">
        <span className="text-cream-dim">Fikrin</span>
        <textarea
          name="fikir"
          required
          rows={4}
          className="mt-1.5 w-full resize-y rounded-xl border border-line bg-bg px-4 py-2.5 text-cream outline-none transition-colors focus:border-gold/60"
        />
      </label>

      {status === "not-configured" ? (
        <p className="text-sm text-amber">
          Bu form yakında aktif olacak. Fikrini şimdiden paylaşmak istersen{" "}
          bize Instagram ya da e-posta üzerinden ulaşabilirsin.
        </p>
      ) : null}
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
        {status === "submitting" ? "Gönderiliyor…" : "Fikrini Gönder"}
      </button>
    </form>
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
