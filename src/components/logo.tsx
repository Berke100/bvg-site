/**
 * BVG logo işareti — coin/madalyon formunda basit bir SVG.
 * Tırtıklı sikke kenarı + ortada "B" harfi. Marka imzasının çekirdeği.
 */
export function CoinMark({
  className,
  title = "BVG",
}: {
  className?: string;
  title?: string;
}) {
  // Sikke kenarındaki tırtıkları üret
  const teeth = Array.from({ length: 36 }, (_, i) => {
    const angle = (i * 360) / 36;
    return (
      <rect
        key={i}
        x="49"
        y="1.5"
        width="2"
        height="6"
        rx="1"
        fill="currentColor"
        transform={`rotate(${angle} 50 50)`}
      />
    );
  });

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <g className="text-amber" style={{ color: "var(--color-amber)" }}>
        {teeth}
      </g>
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="4"
      />
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="none"
        stroke="var(--color-amber)"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-display), sans-serif"
        fontSize="40"
        fontWeight="700"
        fill="var(--color-gold)"
        letterSpacing="-1"
      >
        B
      </text>
    </svg>
  );
}

/** Yatay logo: coin işareti + "BVG" kelime markası */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <CoinMark className="h-9 w-9 shrink-0" />
      <span className="font-display text-xl font-bold tracking-tight text-cream">
        BVG
      </span>
    </span>
  );
}
