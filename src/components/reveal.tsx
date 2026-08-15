"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Ölçülü giriş animasyonu: öğe görünüme girince yumuşakça belirir.
 * Azaltılmış hareket tercihi globals.css içindeki media query ile saygı görür.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error — ref türü Tag'e göre değişiyor, çalışma zamanında güvenli
      ref={ref}
      className={`${shown ? "reveal" : "opacity-0"} ${className ?? ""}`}
      style={shown ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
