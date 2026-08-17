import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { InstagramIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { MailLink } from "@/components/mail-link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim",
  description: "BVG ile iletişime geç: Instagram, LinkedIn ve e-posta.",
};

export default function IletisimPage() {
  return (
    <>
      <PageHeader
        kicker="İletişim"
        title="Bize ulaş"
        description="En hızlı yanıt için Instagram'dan yazabilir ya da e-posta gönderebilirsin."
      />

      <Container className="py-16 sm:py-20">
        <Reveal>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface/40 p-6 text-center transition-colors hover:border-gold/50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber/30 bg-bg text-gold">
                <InstagramIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-cream-dim">
                  Instagram
                </span>
                <span className="mt-1 block text-sm font-medium text-cream group-hover:text-gold">
                  {SITE.instagramHandle}
                </span>
              </span>
            </a>

            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface/40 p-6 text-center transition-colors hover:border-gold/50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber/30 bg-bg text-gold">
                <LinkedInIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-cream-dim">
                  LinkedIn
                </span>
                <span className="mt-1 block text-sm font-medium text-cream group-hover:text-gold">
                  {SITE.linkedinHandle}
                </span>
              </span>
            </a>

            <MailLink
              email={SITE.email}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface/40 p-6 text-center transition-colors hover:border-gold/50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber/30 bg-bg text-gold">
                <MailIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-cream-dim">
                  E-posta
                </span>
                <span className="mt-1 block text-sm font-medium text-cream group-hover:text-gold">
                  {SITE.email}
                </span>
              </span>
            </MailLink>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
