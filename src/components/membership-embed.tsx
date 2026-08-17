"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ChevronDownIcon } from "@/components/icons";
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
  const [universite, setUniversite] = useState("");
  const [sinif, setSinif] = useState("");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!universite || !sinif) {
      setAttemptedSubmit(true);
      return;
    }

    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    const customValues: Record<string, string> = { universite, sinif };
    const payload: Record<string, string> = {};
    for (const [field, entry] of Object.entries(MEMBERSHIP_FORM_FIELDS)) {
      payload[entry] =
        field in customValues
          ? customValues[field]
          : String(data.get(field) ?? "");
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
      setUniversite("");
      setSinif("");
      setAttemptedSubmit(false);
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
    <div className="rounded-3xl border border-amber/40 bg-surface/60 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.75)]">
      {/* Marka başlık şeridi */}
      <div className="flex items-center justify-between gap-3 rounded-t-3xl bg-gradient-to-r from-gold to-amber px-6 py-4">
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
          options={UNIVERSITE_OPTIONS}
          value={universite}
          onChange={setUniversite}
          error={attemptedSubmit && !universite}
        />
        <SelectField
          label="Sınıf"
          options={SINIF_OPTIONS}
          value={sinif}
          onChange={setSinif}
          error={attemptedSubmit && !sinif}
        />
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

/**
 * Native <select> Android'de OS'un kendi gri/eski dropdown menüsünü açıyor
 * ve CSS ile stillenemiyor — bu yüzden tamamen özel, temaya uyan bir
 * buton + liste menüsü ile değiştirildi.
 */
function SelectField({
  label,
  options,
  value,
  onChange,
  error,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <label className="block text-sm">
      <span className="text-cream-dim">{label}</span>
      <div ref={rootRef} className="relative mt-1.5">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`flex w-full items-center justify-between rounded-xl border bg-bg px-4 py-2.5 text-left outline-none transition-colors focus:border-gold/60 ${
            error ? "border-red-400/70" : "border-line"
          } ${value ? "text-cream" : "text-cream-dim"}`}
        >
          <span>{value || "Seç"}</span>
          <ChevronDownIcon
            className={`h-4 w-4 shrink-0 text-cream-dim transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open ? (
          <ul
            role="listbox"
            className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-line bg-surface p-1.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.75)]"
          >
            {options.map((opt) => (
              <li key={opt} role="option" aria-selected={value === opt}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-bg ${
                    value === opt ? "text-gold" : "text-cream"
                  }`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {error ? (
        <span className="mt-1 block text-xs text-red-400">
          Bu alan zorunlu
        </span>
      ) : null}
    </label>
  );
}
