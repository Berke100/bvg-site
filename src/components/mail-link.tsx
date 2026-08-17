"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

/**
 * mailto: linki masaüstünde/Android'de "uygulama seç" istemine düşüyor.
 * Apple cihazlarda (Mac/iPhone/iPad) varsayılan Mail uygulaması net olduğu
 * için mailto: davranışı korunuyor; diğerlerinde Gmail web compose açılıyor.
 */
function isApplePlatform() {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
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
    if (isApplePlatform()) return;
    event.preventDefault();
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <a href={`mailto:${email}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
