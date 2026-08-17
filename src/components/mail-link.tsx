"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

/**
 * mailto: linki masaüstünde/Android'de "uygulama seç" istemine düşüyor.
 * Apple cihazlarda (Mac/iPhone/iPad) varsayılan Mail uygulaması net olduğu
 * için mailto: davranışı korunuyor.
 *
 * Android'de Chrome'un `intent://` şeması denendi ama Gmail bu path için
 * app-link doğrulaması yapmadığından Chrome doğrudan https'e düşüyordu
 * (uygulamayı hiç tetiklemiyordu). Onun yerine Gmail'in kendi özel URI
 * şeması (`googlegmail://co`) kullanılıyor — uygulama yüklüyse sayfa
 * arka plana geçer (visibilitychange), geçmezse ~1.2sn sonra web
 * compose'a düşülüyor.
 */
function getPlatform(): "apple" | "android" | "other" {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod|Macintosh/.test(ua)) return "apple";
  if (/Android/.test(ua)) return "android";
  return "other";
}

type MailLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
> & {
  email: string;
  children: ReactNode;
};

export function MailLink({ email, children, ...props }: MailLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const platform = getPlatform();
    if (platform === "apple") return;

    event.preventDefault();
    const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

    if (platform !== "android") {
      window.open(composeUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const timer = window.setTimeout(() => {
      window.location.href = composeUrl;
    }, 1200);

    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) window.clearTimeout(timer);
      },
      { once: true },
    );

    window.location.href = `googlegmail://co?to=${encodeURIComponent(email)}`;
  };

  return (
    <a href={`mailto:${email}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
