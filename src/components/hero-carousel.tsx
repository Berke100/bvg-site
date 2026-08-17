"use client";

import { useEffect, useRef, useState, type ReactNode, type TouchEvent } from "react";

/**
 * Hero bölümündeki slayt geçişi. Belli aralıklarla otomatik ilerler;
 * noktalara tıklayarak veya (dokunmatikte) sağa/sola kaydırarak manuel de
 * değiştirilebilir. Manuel geçiş sonrası otomatik sayaç sıfırlanır — az
 * önce baktığın slayt hemen elinden alınmasın diye.
 */
export function HeroCarousel({
  slides,
  intervalMs = 7000,
}: {
  slides: ReactNode[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [index, slides.length, intervalMs]);

  function goTo(i: number) {
    setIndex((i + slides.length) % slides.length);
  }

  function handleTouchStart(e: TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta > 50) goTo(index - 1);
    else if (delta < -50) goTo(index + 1);
  }

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="w-full shrink-0">
              {slide}
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 ? (
        <div className="mt-8 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${i + 1}. slayda git`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-gold"
                  : "w-2 bg-line hover:bg-amber/50"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
