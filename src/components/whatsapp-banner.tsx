import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";
import { SITE } from "@/lib/site";

/** Sitenin en üstünde, header'ın da üstünde — her sayfada ilk görünen şerit. */
export function WhatsAppBanner() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 bg-gold px-4 py-2.5 text-center text-sm font-semibold text-bg transition-colors hover:bg-amber"
    >
      <WhatsAppIcon className="h-4 w-4 shrink-0" />
      <span>WhatsApp Grubumuza Katılın</span>
      <ArrowRightIcon className="h-3.5 w-3.5 shrink-0" />
    </a>
  );
}
