import type { Metadata } from "next";
import {
  Button,
  Card,
  Container,
  PageHeader,
  Stat,
} from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ArrowRightIcon, TrophyIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Teknofest",
  description:
    "Son üç yıldır Teknofest'te yer alıyor, 10+ finalist takım çıkarıyoruz. Takıma katıl.",
};

const STEPS = [
  {
    title: "Fikir",
    text: "Bir problemi seç, ekibinle birlikte çözüm fikrini olgunlaştır.",
  },
  {
    title: "Geliştirme",
    text: "Mentorluk ve kaynak desteğiyle prototipini hayata geçir.",
  },
  {
    title: "Sahne",
    text: "Teknofest sahnesinde projeni jüriye ve binlerce kişiye sun.",
  },
];

export default function TeknofestPage() {
  return (
    <>
      <PageHeader
        kicker="Teknofest"
        title="Fikirden finale"
        description="Türkiye'nin en büyük teknoloji yarışmasında son üç yıldır sahadayız. Rekabetin en üst seviyesinde deneyim kazanan takımlar çıkarıyoruz."
      />

      <Container className="py-16 sm:py-20">
        {/* İstatistik bandı */}
        <Reveal>
          <Card className="relative overflow-hidden">
            <TrophyIcon className="absolute -right-8 -top-8 h-40 w-40 text-gold/10" />
            <div className="relative grid gap-8 sm:grid-cols-3">
              <Stat value="3 yıl" label="Üst üste katılım" />
              <Stat value="10+" label="Finalist takım" />
              <Stat value="∞" label="Kazanılan deneyim" />
            </div>
          </Card>
        </Reveal>

        {/* Süreç */}
        <div className="mt-16">
          <Reveal>
            <h2 className="text-3xl text-cream sm:text-4xl">Yolculuk nasıl işliyor?</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 90}>
                <Card className="h-full">
                  <div className="font-display text-5xl font-bold text-gold/30">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 text-xl text-cream">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream-dim">
                    {step.text}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Sonuç bekleyen takımlar notu */}
        <Reveal>
          <div className="mt-16 rounded-2xl border border-amber/30 bg-surface/40 p-8 text-center">
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-cream-dim">
              Şu anda{" "}
              <span className="font-semibold text-cream">
                sonuç bekleyen takımlarımız
              </span>{" "}
              var. Değerlendirme süreci sürüyor — gelişmeleri yakında
              paylaşacağız.
            </p>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-2xl border border-line bg-gradient-to-br from-surface-2/50 via-surface to-bg px-6 py-10 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="text-2xl text-cream">Takıma katılmak istiyorum</h3>
              <p className="mt-1 text-sm text-cream-dim">
                Deneyim şart değil; merak ve emek yeter. Gerisini birlikte
                öğreniriz.
              </p>
            </div>
            <Button href="/uyelik">
              Başvur
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
