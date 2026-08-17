"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

const GMAIL_ANDROID_PACKAGE = "com.google.android.gm";

/**
 * mailto: linki masaüstünde/Android'de "uygulama seç" istemine düşüyor.
 * Apple cihazlarda (Mac/iPhone/iPad) varsayılan Mail uygulaması net olduğu
 * için mailto: davranışı korunuyor. Android'de Chrome'un `intent://` şeması
 * ile Gmail uygulaması yüklüyse doğrudan açılıyor (yoksa web compose'a
 * düşüyor); masaüstünde uygulama diye bir şey olmadığından Gmail web
 * compose doğrudan yeni sekmede açılıyor.
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

    if (platform === "android") {
      window.location.href = `intent://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        email,
      )}#Intent;scheme=https;package=${GMAIL_ANDROID_PACKAGE};S.browser_fallback_url=${encodeURIComponent(
        composeUrl,
      )};end`;
      return;
    }

    window.open(composeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <a href={`mailto:${email}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
