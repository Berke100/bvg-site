import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { MembershipEmbed } from "@/components/membership-embed";
import { InstagramIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { MailLink } from "@/components/mail-link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "BVG ile iletişime geç: Instagram, e-posta ve üyelik başvuru formu. Bölüm fark etmez, aramıza katıl.",
};

export default function IletisimPage() {
  return (
    <>
      <PageHeader
        kicker="İletişim"
        title="Aramıza katıl"
        description="Bir soru sor ya da doğrudan başvur. Bölüm fark etmez — kapımız herkese açık."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          {/* İletişim kanalları */}
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <h2 className="text-2xl text-cream">Bize ulaş</h2>
              <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                En hızlı yanıt için Instagram&apos;dan yazabilir ya da e-posta
                gönderebilirsin.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/40 p-4 transition-colors hover:border-gold/50"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber/30 bg-bg text-gold">
                    <InstagramIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-cream-dim">
                      Instagram
                    </span>
                    <span className="block text-sm font-medium text-cream group-hover:text-gold">
                      {SITE.instagramHandle}
                    </span>
                  </span>
                </a>

                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/40 p-4 transition-colors hover:border-gold/50"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber/30 bg-bg text-gold">
                    <LinkedInIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-cream-dim">
                      LinkedIn
                    </span>
                    <span className="block text-sm font-medium text-cream group-hover:text-gold">
                      {SITE.linkedinHandle}
                    </span>
                  </span>
                </a>

                <MailLink
                  email={SITE.email}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/40 p-4 transition-colors hover:border-gold/50"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber/30 bg-bg text-gold">
                    <MailIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-cream-dim">
                      E-posta
                    </span>
                    <span className="block text-sm font-medium text-cream group-hover:text-gold">
                      {SITE.email}
                    </span>
                  </span>
                </MailLink>
              </div>
            </div>
          </Reveal>

          {/* Üyelik formu — id="katil" ankraj hedefi */}
          <Reveal delay={100}>
            <div id="katil" className="scroll-mt-24">
              <h2 className="text-2xl text-cream">Üyelik başvuru formu</h2>
              <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                Formu doldur, gerisini biz halledelim. Alanları eksiksiz
                bırakırsan sana daha hızlı dönüş yapabiliriz.
              </p>
              <div className="mt-6">
                <MembershipEmbed />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
