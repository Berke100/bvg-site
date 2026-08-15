import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site";
import { CoinMark } from "@/components/logo";
import { InstagramIcon, MailIcon } from "@/components/icons";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-surface/30">
      <div className="coin-edge" aria-hidden />
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marka + açıklama */}
          <div>
            <span className="inline-flex items-center gap-2.5">
              <CoinMark className="h-9 w-9" />
              <span className="font-display text-xl font-bold text-cream">
                BVG
              </span>
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-dim">
              {SITE.university} çatısı altında, bölüm fark etmeksizin herkese
              açık öğrenci topluluğu. Kampüsün en güçlü network&apos;ü burada.
            </p>
          </div>

          {/* Sayfa linkleri */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-amber">
              Sayfalar
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-dim transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-amber">
              İletişim
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-cream-dim transition-colors hover:text-gold"
                >
                  <InstagramIcon className="h-4 w-4" />
                  {SITE.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2.5 text-sm text-cream-dim transition-colors hover:text-gold"
                >
                  <MailIcon className="h-4 w-4" />
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-cream-dim sm:flex-row">
          <p>
            © {year} BVG · {SITE.university}
          </p>
          <p>Bölüm fark etmez — herkese açık topluluk.</p>
        </div>
      </div>
    </footer>
  );
}
