"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

/**
 * mailto: bilgisayarda "uygulama seç" istemine düşüyor (Windows/Linux'ta
 * genelde varsayılan mail istemcisi yok). Telefonlarda ise (Android/iOS)
 * mailto: doğrudan yüklü mail uygulamasını açıyor — Android'de Gmail hemen
 * her cihazda tek/varsayılan mail uygulaması olduğundan sorunsuz.
 *
 * Denendi ve platform kısıtı yüzünden vazgeçildi: web'den Chrome'un
 * `intent://` şeması Gmail'in autoVerify app-link deklare etmemesi
 * yüzünden direkt https'e düşüyor; Gmail'in eski özel şeması
 * (`googlegmail://co`) de güncel uygulamada artık tetiklenmiyor. Web
 * sitesinden native Android Intent (setPackage ile belirli bir uygulamayı
 * zorlama) çağırmanın bir yolu yok — o yalnızca native uygulama kodunda
 * mümkün. Bu yüzden telefonlarda sadece mailto: bırakılıyor; yalnızca
 * masaüstünde Gmail web compose'a yönlendiriliyor.
 */
function isMobilePlatform() {
  if (typeof navigator === "undefined") return true;
  return /iPhone|iPad|iPod|Android/.test(navigator.userAgent);
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
    if (isMobilePlatform()) return;

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
