import Link from "next/link";
import type { ReactNode } from "react";

/** Sayfa içeriğini ortalayan genişlik sınırlı kapsayıcı */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className ?? ""}`}>
      {children}
    </div>
  );
}

/**
 * İmza öğesi: sikke kenarı ayracı.
 * Bölümler arasında ince, tırtıklı bir çizgi olarak kullanılır.
 */
export function CoinEdge({ className }: { className?: string }) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`coin-edge ${className ?? ""}`}
    />
  );
}

/** Bölüm üstü küçük etiket (kicker) */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </span>
  );
}

/** Standart bölüm başlığı bloğu */
export function SectionHeading({
  kicker,
  title,
  children,
  center,
}: {
  kicker?: string;
  title: ReactNode;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl text-cream">
        {title}
      </h2>
      {children ? (
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-cream-dim">
          {children}
        </p>
      ) : null}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-0.5 active:translate-y-0";

const buttonVariants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-gold text-bg shadow-[0_8px_30px_-8px_rgba(242,183,5,0.5)] hover:bg-amber",
  outline:
    "border border-line text-cream hover:border-gold/60 hover:text-gold bg-surface/40",
  ghost: "text-cream hover:text-gold",
};

/** Buton — href verilirse Link, yoksa <button> olarak render edilir */
export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
}: ButtonProps) {
  const classes = `${buttonBase} ${buttonVariants[variant]} ${className ?? ""}`;
  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}

/** İstatistik kutusu */
export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-4xl sm:text-5xl font-bold text-gold-gradient">
        {value}
      </div>
      <div className="mt-2 text-sm text-cream-dim">{label}</div>
    </div>
  );
}

/** İç sayfa başlığı — üstte kicker, büyük başlık, açıklama */
export function PageHeader({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(242,183,5,0.35), transparent 65%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Kicker>{kicker}</Kicker>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-cream sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream-dim">
            {description}
          </p>
        ) : null}
      </div>
      <div className="coin-edge" aria-hidden />
    </section>
  );
}

/** İçe göçük kart yüzeyi */
export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface/60 p-6 transition-colors duration-300 hover:border-amber/50 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
